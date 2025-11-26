import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  Package,
  AlertTriangle,
  ShoppingCart,
  Plus,
  Filter,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// 테스트용 데이터 - 백엔드 연동 시 API로 대체 예정
const mockInventory = [
  {
    id: 1,
    name: '삼각김밥 참치',
    category: '식품',
    stock: 45,
    minStock: 20,
    expiryDays: 2,
    price: 1500,
  },
  {
    id: 2,
    name: '컵라면 신라면',
    category: '식품',
    stock: 8,
    minStock: 15,
    expiryDays: 45,
    price: 1200,
  },
  {
    id: 3,
    name: '생수 2L',
    category: '음료',
    stock: 120,
    minStock: 50,
    expiryDays: 180,
    price: 1000,
  },
  {
    id: 4,
    name: '바나나우유',
    category: '음료',
    stock: 25,
    minStock: 30,
    expiryDays: 3,
    price: 1800,
  },
  {
    id: 5,
    name: '도시락 김치볶음밥',
    category: '식품',
    stock: 12,
    minStock: 10,
    expiryDays: 1,
    price: 4500,
  },
]

const mockOrderRequests = [
  {
    id: 1,
    item: '컵라면 신라면',
    quantity: 30,
    requestedBy: '김알바',
    date: '2024-01-15',
    status: '대기',
  },
  {
    id: 2,
    item: '바나나우유',
    quantity: 20,
    requestedBy: '이알바',
    date: '2024-01-14',
    status: '대기',
  },
  {
    id: 3,
    item: '삼각김밥 참치',
    quantity: 50,
    requestedBy: '박알바',
    date: '2024-01-14',
    status: '승인',
  },
]

const InventoryManagement = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === '전체' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const lowStockItems = mockInventory.filter(
    (item) => item.stock < item.minStock
  )
  const expiringItems = mockInventory.filter((item) => item.expiryDays <= 7)

  const handleOrderApproval = (
    orderId: number,
    action: 'approve' | 'reject'
  ) => {
    // 백엔드 API 연동 예정
    toast({
      title: action === 'approve' ? '발주 승인 완료' : '발주 거절',
      description: `발주 요청이 ${
        action === 'approve' ? '승인' : '거절'
      }되었습니다.`,
    })
  }

  const handleAutoRecommend = () => {
    // 백엔드 AI 추천 로직 연동 예정
    toast({
      title: '자동 발주 추천',
      description: '부족한 재고 기준으로 발주 품목을 추천했습니다.',
    })
  }

  return (
    <div className="space-y-6">
      {/* ======= 2.b) 재고/발주 관리 - DB목록, 검색/필터링, 발주요청 알림, 자동추천 및 신청, 유통기한임박 상품 ======= */}
      <div>
        <h1 className="text-3xl font-bold">재고/발주 관리</h1>
        <p className="text-muted-foreground mt-1">
          재고 현황을 확인하고 발주를 관리하세요
        </p>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">재고 목록</TabsTrigger>
          <TabsTrigger value="orders">발주 요청</TabsTrigger>
          <TabsTrigger value="expiring">유통기한 임박</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* ======= 2.b-1) 물품 검색 및 필터링, 2.b-4) 발주 품목 자동 추천 및 발주 신청 ======= */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="물품 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="식품">식품</SelectItem>
                <SelectItem value="음료">음료</SelectItem>
                <SelectItem value="생활용품">생활용품</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAutoRecommend}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              자동 발주 추천
            </Button>
          </div>

          {/* 알림 카드 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-warning">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  재고 부족 알림
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {lowStockItems.length}개
                </div>
                <p className="text-xs text-muted-foreground">
                  최소 재고 미달 품목
                </p>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  유통기한 임박
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {expiringItems.length}개
                </div>
                <p className="text-xs text-muted-foreground">
                  7일 이내 유통기한
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 재고 목록 */}
          <Card>
            <CardHeader>
              <CardTitle>재고 목록</CardTitle>
              <CardDescription>
                전체 {filteredInventory.length}개 품목
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredInventory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.category} • ₩{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">재고</p>
                        <p
                          className={`font-medium ${
                            item.stock < item.minStock ? 'text-warning' : ''
                          }`}
                        >
                          {item.stock}개
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          유통기한
                        </p>
                        <p
                          className={`font-medium ${
                            item.expiryDays <= 3 ? 'text-destructive' : ''
                          }`}
                        >
                          D-{item.expiryDays}
                        </p>
                      </div>
                      {item.stock < item.minStock && (
                        <Badge
                          variant="outline"
                          className="border-warning text-warning"
                        >
                          부족
                        </Badge>
                      )}
                      {item.expiryDays <= 3 && (
                        <Badge
                          variant="outline"
                          className="border-destructive text-destructive"
                        >
                          임박
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ======= 2.b-3) 발주 요청 알림 목록 ======= */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>발주 요청 목록</CardTitle>
              <CardDescription>
                알바생들의 발주 요청을 승인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOrderRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{request.item}</h4>
                      <p className="text-sm text-muted-foreground">
                        {request.quantity}개 • 요청자: {request.requestedBy} •{' '}
                        {request.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === '대기' ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleOrderApproval(request.id, 'approve')
                            }
                          >
                            승인
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleOrderApproval(request.id, 'reject')
                            }
                          >
                            거절
                          </Button>
                        </>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-success text-success"
                        >
                          승인됨
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ======= 2.b-5) 유통기한 임박 상품 목록 ======= */}
        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>유통기한 임박 상품</CardTitle>
              <CardDescription>
                7일 이내 유통기한이 도래하는 상품
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-destructive/20 bg-destructive/5 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          재고: {item.stock}개
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className="border-destructive text-destructive"
                      >
                        D-{item.expiryDays}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default InventoryManagement
