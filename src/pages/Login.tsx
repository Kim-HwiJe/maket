import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Store, Lock, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import api from '@/lib/api'

// 백엔드 응답 타입 명확히 선언
interface LoginResponse {
  token: string
  role: string
  username: string
}

const Login = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await api.post<LoginResponse>('/auth/login', {
        username,
        password,
      })

      const { token, role, username: userNameFromDB } = res.data

      // 저장
      localStorage.setItem('token', token)
      localStorage.setItem('userRole', role)
      localStorage.setItem('username', userNameFromDB)

      toast({
        title: '로그인 성공',
        description: `${userNameFromDB}님 환영합니다.`,
      })

      // 이동
      if (role === 'owner') {
        navigate('/owner/dashboard')
      } else {
        navigate('/staff/dashboard')
      }
    } catch (err: any) {
      toast({
        title: '로그인 실패',
        description:
          err?.response?.data?.message ||
          '아이디 또는 비밀번호가 올바르지 않습니다.',
        variant: 'destructive',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Store className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold">
                편의점 관리 시스템
              </CardTitle>
              <CardDescription className="text-base mt-2">
                로그인하여 시작하세요
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">아이디</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </form>

            {/* 회원가입 & 비밀번호 찾기 */}
            <div className="mt-6 flex items-center justify-between text-sm text-primary">
              <button
                type="button"
                className="hover:underline"
                onClick={() => navigate('/register')}
              >
                회원가입
              </button>

              <button
                type="button"
                className="hover:underline"
                onClick={() => navigate('/forgot-password')}
              >
                비밀번호 찾기
              </button>
            </div>

            <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
              테스트: 사장님(owner) / 기타(staff)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
