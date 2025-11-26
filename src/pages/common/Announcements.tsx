import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Bell, Pin } from 'lucide-react'

const announcements = [
  {
    id: 1,
    title: '📢 [필독] 새로운 POS 시스템 교육 안내',
    date: '2024-01-15',
    author: '사장님',
    important: true,
    content:
      '이번 주 금요일 오후 2시에 새로운 POS 시스템 교육이 있을 예정입니다.\n모든 직원 참석 필수입니다.\n\n일시: 2024.01.19 (금) 14:00\n장소: 매장 내 창고 앞',
  },
  {
    id: 2,
    title: '프로모션 상품 진열 변경',
    date: '2024-01-14',
    author: '매니저',
    important: false,
    content:
      '1+1 행사 상품을 입구 앞 진열대로 이동해주세요. 고객 눈에 잘 띄는 위치입니다.',
  },
  {
    id: 3,
    title: '1월 월말 재고 조사 안내',
    date: '2024-01-12',
    author: '사장님',
    important: false,
    content:
      '이번 달 말일에 전체 재고 조사를 실시합니다. 야간 근무자는 재고표 출력해두세요.',
  },
]

const Announcements = () => {
  return (
    <div className="space-y-6">
      {/* ======= 1.b) 공지사항 - 사장님이 작성한 공지 목록 및 상세 보기 ======= */}
      <div>
        <h1 className="text-3xl font-bold">공지사항</h1>
        <p className="text-muted-foreground mt-1">
          매장 운영 관련 주요 소식을 확인하세요
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            공지 목록
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {announcements.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 text-left w-full pr-4">
                    <div className="flex items-center gap-2">
                      {item.important && (
                        <Pin className="w-4 h-4 text-warning fill-warning" />
                      )}
                      <span
                        className={
                          item.important
                            ? 'font-bold text-foreground'
                            : 'font-medium text-muted-foreground'
                        }
                      >
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 md:ml-auto text-xs font-normal text-muted-foreground">
                      <Badge variant="outline">{item.author}</Badge>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm whitespace-pre-line p-4 bg-muted/30 rounded-md">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

export default Announcements
