import { ReactNode, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { Button } from '@/components/ui/button'
import { Bell, LogOut, AlertTriangle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const [username, setUsername] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    const userRole = localStorage.getItem('userRole')

    if (!storedUsername || !userRole) {
      navigate('/')
    } else {
      setUsername(storedUsername)
    }

    // 폐기 임박 알림 - 페이지 진입 3초 후 발생
    // 실제로는 백엔드 소켓이나 타이머 로직이 들어갈 곳
    const timer = setTimeout(() => {
      setIsAlertOpen(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('userRole')
    toast({
      title: '로그아웃 완료',
      description: '안전하게 로그아웃되었습니다.',
    })
    navigate('/')
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="-ml-2" />

              {/* ======= 1.b) 최신 공지 배너 - 모든 페이지 맨 위에 공지 제목 링크 표시 ======= */}
              <div className="flex-1 items-center justify-center hidden md:flex">
                <div
                  className="px-4 py-1.5 bg-warning/10 border border-warning/20 rounded-full text-sm cursor-pointer hover:bg-warning/20 transition-colors"
                  onClick={() => navigate('/announcements')}
                >
                  <span className="font-medium text-warning mr-2">
                    📢 최신 공지:
                  </span>
                  <span className="text-muted-foreground">
                    새로운 POS 시스템 교육 예정
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
                <div className="flex items-center gap-3 pl-3 border-l">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{username}</p>
                    <p className="text-xs text-muted-foreground">
                      {location.pathname.includes('owner')
                        ? '관리자'
                        : '근무자'}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>

          {/* Footer */}
          <footer className="border-t py-4 px-6 hidden md:block">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
              <p>© 2024 편의점 관리 시스템. All rights reserved.</p>
              <p>시스템 상태: 정상</p>
            </div>
          </footer>
        </div>
      </div>

      {/* ======= 1.d) 팝업 - 폐기 임박 물품 알람 (폐기 30분전, 10분전, 5분전 알람) ======= */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="border-destructive/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              폐기 임박 알림 (30분 전)
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                다음 품목의 폐기 시간이 30분 남았습니다. 확인 후 조치해주세요.
              </p>
              <div className="bg-muted p-3 rounded-md text-sm font-medium text-foreground">
                • 삼각김밥 참치마요 (3개)
                <br />• 샌드위치 햄치즈 (2개)
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>나중에 보기</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => navigate('/staff/inventory')}
            >
              확인하러 가기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  )
}

export default DashboardLayout
