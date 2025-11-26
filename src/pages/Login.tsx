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

const Login = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // ======= 1.a) 로그인 페이지 - 아이디/비밀번호 입력 및 로그인 버튼 =======
    // 백엔드 DB 연결 예정
    setTimeout(() => {
      if (username && password) {
        // 로그인 성공 - 역할에 따라 사용자 구분
        const userRole = username === '사장님' ? 'owner' : 'staff'

        // 사용자 정보 저장 (실제로는 인증 토큰으로 대체 예정)
        localStorage.setItem('userRole', userRole)
        localStorage.setItem('username', username)

        toast({
          title: '로그인 성공',
          description: `환영합니다, ${username}님!`,
        })

        // 역할에 따라 다른 대시보드로 이동
        if (userRole === 'owner') {
          navigate('/owner/dashboard')
        } else {
          navigate('/staff/dashboard')
        }
      } else {
        toast({
          title: '로그인 실패',
          description: '아이디와 비밀번호를 입력해주세요.',
          variant: 'destructive',
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
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
              <Label htmlFor="username" className="text-sm font-medium">
                아이디
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
              <Label htmlFor="password" className="text-sm font-medium">
                비밀번호
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
                onClick={() =>
                  toast({
                    title: '준비 중',
                    description: '백엔드 연동 후 사용 가능합니다.',
                  })
                }
              >
                비밀번호 찾기
              </button>
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>테스트: 사장님(owner) / 기타(staff)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
