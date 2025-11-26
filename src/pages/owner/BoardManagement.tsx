import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageSquare, Trash2, AlertTriangle, ThumbsUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// 테스트용 데이터 - 백엔드 연동 시 API로 대체 예정
const tipsBoard = [
  {
    id: 1,
    title: '유통기한 임박 상품 할인 판매 팁',
    author: '김알바',
    date: '2024-01-15',
    likes: 8,
    comments: 3,
    content: '유통기한 3일 이내 상품은 30% 할인하면 대부분 판매됩니다!',
  },
  {
    id: 2,
    title: '청소 시간 단축하는 방법',
    author: '이알바',
    date: '2024-01-14',
    likes: 12,
    comments: 5,
    content: '순서대로 하면 10분 절약 가능해요',
  },
  {
    id: 3,
    title: '고객 응대 노하우',
    author: '박알바',
    date: '2024-01-13',
    likes: 15,
    comments: 7,
    content: '친절하게 대하면 단골이 늘어요',
  },
]

const suggestionBoard = [
  {
    id: 1,
    title: 'POS 시스템 개선 건의',
    author: '김알바',
    date: '2024-01-15',
    likes: 6,
    comments: 2,
    content: '환불 처리 절차를 간소화했으면 좋겠습니다',
  },
  {
    id: 2,
    title: '휴게 공간 필요합니다',
    author: '이알바',
    date: '2024-01-14',
    likes: 10,
    comments: 4,
    content: '직원 전용 휴게 공간이 있으면 좋을 것 같아요',
  },
]

const BoardManagement = () => {
  const { toast } = useToast()
  const [selectedBoard, setSelectedBoard] = useState('tips')

  const handleDeletePost = (postId: number, boardType: string) => {
    // 백엔드 API 연동 예정
    toast({
      title: '게시글 삭제',
      description: '문제가 되는 게시글이 삭제되었습니다.',
    })
  }

  const handleDeleteComment = (commentId: number) => {
    // 백엔드 API 연동 예정
    toast({
      title: '댓글 삭제',
      description: '부적절한 댓글이 삭제되었습니다.',
    })
  }

  const currentBoard = selectedBoard === 'tips' ? tipsBoard : suggestionBoard

  return (
    <div className="space-y-6">
      {/* ======= 2.f) 익명 게시판 관리 - 문제게시글/댓글 삭제 ======= */}
      <div>
        <h1 className="text-3xl font-bold">익명 게시판 관리</h1>
        <p className="text-muted-foreground mt-1">
          문제가 되는 게시글과 댓글을 관리하세요
        </p>
      </div>

      {/* 통계 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">꿀팁 게시글</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tipsBoard.length}개</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">건의사항</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suggestionBoard.length}개</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">전체 댓글</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {[...tipsBoard, ...suggestionBoard].reduce(
                (acc, post) => acc + post.comments,
                0
              )}
              개
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              신고 접수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">0건</div>
          </CardContent>
        </Card>
      </div>

      {/* 게시판 탭 */}
      <Tabs
        value={selectedBoard}
        onValueChange={setSelectedBoard}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="tips">꿀팁 게시판</TabsTrigger>
          <TabsTrigger value="suggestions">건의사항 게시판</TabsTrigger>
        </TabsList>

        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>꿀팁 게시판</CardTitle>
              <CardDescription>직원들이 공유한 업무 노하우</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tipsBoard.map((post) => (
                  <div key={post.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{post.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePost(post.id, 'tips')}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>건의사항 게시판</CardTitle>
              <CardDescription>직원들의 개선 아이디어와 건의</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestionBoard.map((post) => (
                  <div key={post.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{post.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePost(post.id, 'suggestions')}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 관리 가이드 */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-sm">게시판 관리 가이드</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• 욕설, 비방, 개인정보 노출 게시물은 즉시 삭제</p>
          <p>• 건의사항은 검토 후 개선 여부 피드백</p>
          <p>• 유용한 꿀팁은 공지사항으로 전환 가능</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default BoardManagement
