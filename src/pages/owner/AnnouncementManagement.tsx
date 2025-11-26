import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Bell, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Mock data - 백엔드 연동 시 API로 대체
const mockAnnouncements = [
  {
    id: 1,
    title: '새로운 POS 시스템 교육 안내',
    content:
      '이번 주 금요일 오후 2시에 새로운 POS 시스템 교육이 있을 예정입니다. 모든 직원 참석 필수입니다.',
    date: '2024-01-15',
    important: true,
    views: 12,
  },
  {
    id: 2,
    title: '프로모션 상품 진열 변경',
    content:
      '1+1 행사 상품을 입구 앞 진열대로 이동해주세요. 고객 눈에 잘 띄는 위치입니다.',
    date: '2024-01-14',
    important: true,
    views: 15,
  },
  {
    id: 3,
    title: '월말 재고 조사 안내',
    content:
      '이번 달 말일에 전체 재고 조사를 실시합니다. 정확한 재고 파악 부탁드립니다.',
    date: '2024-01-12',
    important: false,
    views: 8,
  },
  {
    id: 4,
    title: '근무 시간 변경 안내',
    content:
      '다음 주부터 일부 근무 시간이 조정됩니다. 개인별 스케줄을 확인해주세요.',
    date: '2024-01-10',
    important: false,
    views: 18,
  },
]

const AnnouncementManagement = () => {
  const { toast } = useToast()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isImportant, setIsImportant] = useState(false)

  const handleCreate = () => {
    // 백엔드 API 연동 예정
    toast({
      title: '공지사항 작성 완료',
      description: '새로운 공지사항이 등록되었습니다.',
    })
    setTitle('')
    setContent('')
    setIsImportant(false)
    setIsCreateDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    // 백엔드 API 연동 예정
    toast({
      title: '공지사항 삭제',
      description: '공지사항이 삭제되었습니다.',
    })
  }

  return (
    <div className="space-y-6">
      {/* ======= 2.e) 공지사항 관리 - 작성/수정/삭제 ======= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">공지사항 관리</h1>
          <p className="text-muted-foreground mt-1">
            공지사항을 작성하고 관리하세요
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              공지 작성
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>새 공지사항 작성</DialogTitle>
              <DialogDescription>
                전체 직원에게 전달할 공지사항을 작성하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  placeholder="공지사항 제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  placeholder="공지사항 내용을 입력하세요..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="important"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <Label htmlFor="important" className="cursor-pointer">
                  중요 공지로 표시 (상단 고정)
                </Label>
              </div>
              <Button onClick={handleCreate} className="w-full">
                공지사항 등록
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="w-4 h-4" />
              전체 공지
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAnnouncements.length}개
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">중요 공지</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {mockAnnouncements.filter((a) => a.important).length}개
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              평균 조회수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockAnnouncements.reduce((acc, a) => acc + a.views, 0) /
                  mockAnnouncements.length
              )}
              회
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 공지사항 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>공지사항 목록</CardTitle>
          <CardDescription>작성된 전체 공지사항</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{announcement.title}</h4>
                      {announcement.important && (
                        <Badge
                          variant="outline"
                          className="border-warning text-warning"
                        >
                          중요
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{announcement.date}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {announcement.views}회 조회
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(announcement.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnnouncementManagement
