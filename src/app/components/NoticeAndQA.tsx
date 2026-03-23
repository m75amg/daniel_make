import { Megaphone, MessageSquare, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';

const notices = [
  { id: 1, title: 'Make 2.0 플랫폼 업데이트', date: '03.10', isNew: true },
  { id: 2, title: '3월 프로젝트 업로드 이벤트', date: '03.08', isNew: true },
  { id: 3, title: '개인정보 처리방침 개정', date: '03.05', isNew: false },
  { id: 4, title: '시스템 정기점검 안내', date: '03.01', isNew: false },
];

const qaList = [
  { id: 1, title: '3D 프린터 필라멘트 추천', author: '메이커A', replies: 12, isAnswered: true },
  { id: 2, title: '아두이노 센서 연결 오류', author: '초보개발자', replies: 8, isAnswered: true },
  { id: 3, title: 'PCB 설계 툴 추천', author: '엔지니어B', replies: 15, isAnswered: false },
  { id: 4, title: '라즈베리파이 vs ESP32', author: '메이커C', replies: 23, isAnswered: true },
];

export function NoticeAndQA() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="notice" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-80 grid-cols-2">
              <TabsTrigger value="notice" className="text-sm">
                <Megaphone className="w-4 h-4 mr-2" />
                공지사항
              </TabsTrigger>
              <TabsTrigger value="qa" className="text-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Q&A
              </TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="sm" className="text-blue-600">
              전체보기 →
            </Button>
          </div>

          <TabsContent value="notice" className="mt-0">
            <Card className="border-gray-200">
              <div className="divide-y divide-gray-100">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {notice.isNew && (
                          <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded font-medium">
                            NEW
                          </span>
                        )}
                        <h3 className="text-gray-900 font-medium text-sm">{notice.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <span className="text-sm">{notice.date}</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="qa" className="mt-0">
            <Card className="border-gray-200">
              <div className="divide-y divide-gray-100">
                {qaList.map((qa) => (
                  <div
                    key={qa.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {qa.isAnswered && (
                          <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded font-medium">
                            답변
                          </span>
                        )}
                        <h3 className="text-gray-900 font-medium text-sm">{qa.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                        <span className="text-sm">{qa.author}</span>
                        <span className="flex items-center gap-1 text-sm">
                          <MessageSquare className="w-4 h-4" />
                          {qa.replies}
                        </span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}