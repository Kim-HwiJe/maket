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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MessageSquare, ThumbsUp, Plus, Search } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Mock Data
const initialTips = [
  {
    id: 1,
    title: '진상 손님 대처법 공유합니다',
    author: '익명1',
    date: '2024-01-20',
    likes: 15,
    comments: 4,
    content: '무조건 죄송하다고 하지 말고...',
  },
  {
    id: 2,
    title: '폐기 시간 꿀팁',
    author: '익명3',
    date: '2024-01-19',
    likes: 8,
    comments: 2,
    content: '도시락은 30분 전에 미리 빼두면...',
  },
]

const initialSuggestions = [
  {
    id: 1,
    title: '사장님 에어컨 좀 고쳐주세요',
    author: '익명2',
    date: '2024-01-18',
    likes: 20,
    comments: 5,
    content: '창고 쪽 너무 더워요 ㅠㅠ',
  },
]

const Community = () => {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('tips')
  const [isWriteOpen, setIsWriteOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  const handleWrite = () => {
    if (!newTitle || !newContent) {
      toast({
        title: '입력 오류',
        description: '제목과 내용을 모두 입력해주세요.',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: '등록 완료',
      description: '게시글이 익명으로 등록되었습니다.',
    })
    setIsWriteOpen(false)
    setNewTitle('')
    setNewContent('')
  }

  const PostList = ({ posts }: { posts: typeof initialTips }) => (
    <div className="space-y-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-sm md:text-base">{post.title}</h4>
              <Badge variant="secondary" className="text-xs">
                {post.date}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {post.content}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> {post.comments}
              </span>
              <span>{post.author}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* ======= 1.c) 익명 커뮤니티 - 꿀팁/건의사항 게시판 (글쓰기 버튼, 댓글기능) ======= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">익명 커뮤니티</h1>
          <p className="text-muted-foreground mt-1">
            자유롭게 소통하고 건의하는 공간입니다 (100% 익명 보장)
          </p>
        </div>
        <Dialog open={isWriteOpen} onOpenChange={setIsWriteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> 글쓰기
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>게시글 작성</DialogTitle>
              <DialogDescription>
                작성된 글은 익명으로 게시됩니다.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>카테고리</Label>
                <div className="flex gap-2">
                  <Badge
                    variant={activeTab === 'tips' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setActiveTab('tips')}
                  >
                    꿀팁
                  </Badge>
                  <Badge
                    variant={
                      activeTab === 'suggestions' ? 'default' : 'outline'
                    }
                    className="cursor-pointer"
                    onClick={() => setActiveTab('suggestions')}
                  >
                    건의사항
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="내용을 입력하세요"
                  rows={5}
                />
              </div>
              <Button onClick={handleWrite} className="w-full">
                등록하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="tips">꿀팁 게시판</TabsTrigger>
            <TabsTrigger value="suggestions">건의사항 게시판</TabsTrigger>
          </TabsList>
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="검색..." className="pl-8 w-[200px] h-9" />
          </div>
        </div>

        <TabsContent value="tips">
          <PostList posts={initialTips} />
        </TabsContent>
        <TabsContent value="suggestions">
          <PostList posts={initialSuggestions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Community
