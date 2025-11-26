import { useLocation } from 'react-router-dom'
import { NavLink } from '@/components/NavLink'
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  MessageSquare,
  Bell,
  ClipboardList,
  Calendar,
  QrCode,
  Store,
  FileText,
  Settings,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'

// ======= 2. 사장님 전용 페이지 라우팅 =======
const ownerMenuItems = [
  { title: '대시보드', url: '/owner/dashboard', icon: LayoutDashboard }, // 2.a)
  { title: '재고/발주 관리', url: '/owner/inventory', icon: Package }, // 2.b)
  { title: '근무자 관리', url: '/owner/staff', icon: Users }, // 2.c)
  { title: '데이터 분석', url: '/owner/analytics', icon: BarChart3 }, // 2.d)
  { title: '공지사항 관리', url: '/owner/announcements', icon: Bell }, // 2.e)
  { title: '게시판 관리', url: '/owner/boards', icon: MessageSquare }, // 2.f)
]

// ======= 3. 알바생 전용 페이지 라우팅 =======
const staffMenuItems = [
  { title: '대시보드', url: '/staff/dashboard', icon: LayoutDashboard }, // 3.a)
  { title: '업무 인수인계', url: '/staff/handover', icon: ClipboardList }, // 3.b)
  { title: '재고 & 폐기', url: '/staff/inventory', icon: QrCode }, // 3.c)
  { title: '근무 스케줄', url: '/staff/schedule', icon: Calendar }, // 3.d)
]

// ======= 1. 공통 페이지 라우팅 (사장/알바생 모두 접근 가능) =======
const commonMenuItems = [
  { title: '공지사항', url: '/announcements', icon: FileText }, // 1.b)
  { title: '익명 커뮤니티', url: '/community', icon: MessageSquare }, // 1.c)
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const [userRole, setUserRole] = useState<string>('')

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    setUserRole(role || '')
  }, [])

  const currentPath = location.pathname
  const isOwner = userRole === 'owner'
  const roleMenuItems = isOwner ? ownerMenuItems : staffMenuItems
  const collapsed = state === 'collapsed'

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent>
        {/* Header */}
        <div className={`p-4 border-b ${collapsed ? 'px-2' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-sm">편의점 관리</h2>
                <p className="text-xs text-muted-foreground">
                  {isOwner ? '관리자 모드' : '근무자 모드'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Role-specific Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {!collapsed && (isOwner ? '관리 메뉴' : '업무 메뉴')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {roleMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Common Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && '공통 메뉴'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commonMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
