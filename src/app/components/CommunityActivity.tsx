import { MessageCircle, HelpCircle, Lightbulb, CheckCircle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

const discussions = [
  {
    id: 1,
    title: '라즈베리파이 5 vs 4: 실사용 비교 후기',
    author: '김메이커',
    authorInitial: '김',
    replies: 23,
    views: 456,
    timeAgo: '15분 전',
    category: '토론',
    isHot: true,
  },
  {
    id: 2,
    title: 'ESP32-C6 신제품 출시 소식',
    author: '이개발',
    authorInitial: '이',
    replies: 12,
    views: 234,
    timeAgo: '1시간 전',
    category: '뉴스',
    isHot: true,
  },
  {
    id: 3,
    title: '3D 프린터 필라멘트 보관 방법',
    author: '박엔지니어',
    authorInitial: '박',
    replies: 8,
    views: 189,
    timeAgo: '2시간 전',
    category: '팁',
    isHot: false,
  },
  {
    id: 4,
    title: 'PCB 제작 업체 추천 부탁드립니다',
    author: '최메이커',
    authorInitial: '최',
    replies: 15,
    views: 321,
    timeAgo: '3시간 전',
    category: '추천',
    isHot: false,
  },
];

const questions = [
  {
    id: 1,
    question: '아두이노에서 센서 값이 계속 튀는 문제',
    author: '정초보',
    authorInitial: '정',
    answers: 5,
    views: 234,
    isAnswered: true,
    tags: ['아두이노', '센서'],
  },
  {
    id: 2,
    question: '3D 프린팅 첫 레이어가 안 붙어요',
    author: '한메이커',
    authorInitial: '한',
    answers: 8,
    views: 456,
    isAnswered: true,
    tags: ['3D프린팅'],
  },
  {
    id: 3,
    question: 'MQTT 브로커 설정 질문',
    author: '강개발',
    authorInitial: '강',
    answers: 3,
    views: 123,
    isAnswered: false,
    tags: ['IoT', 'MQTT'],
  },
  {
    id: 4,
    question: '납땜 온도 설정이 궁금합니다',
    author: '송엔지니어',
    authorInitial: '송',
    answers: 12,
    views: 567,
    isAnswered: true,
    tags: ['전자공학'],
  },
];

export function CommunityActivity() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-3xl font-bold text-gray-900">커뮤니티 활동</h2>
          </div>
          <p className="text-gray-600">메이커들과 함께 지식을 공유하고 문제를 해결하세요</p>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              토론
            </TabsTrigger>
            <TabsTrigger value="qa" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Q&A
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4">
              {discussions.map((discussion) => (
                <Card
                  key={discussion.id}
                  className="p-5 hover:shadow-lg transition-shadow cursor-pointer border-gray-200 bg-white"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {discussion.category}
                          </Badge>
                          {discussion.isHot && (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              인기
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                          {discussion.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-gray-100 text-gray-700">
                            {discussion.authorInitial}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{discussion.author}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {discussion.replies}
                        </span>
                        <span className="text-xs">{discussion.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="qa" className="mt-0">
            <div className="grid md:grid-cols-2 gap-4">
              {questions.map((qa) => (
                <Card
                  key={qa.id}
                  className="p-5 hover:shadow-lg transition-shadow cursor-pointer border-gray-200 bg-white"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        {qa.isAnswered && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-2 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            해결됨
                          </Badge>
                        )}
                        <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                          {qa.question}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {qa.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-gray-100 text-gray-700">
                            {qa.authorInitial}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{qa.author}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-blue-600">{qa.answers}</span>
                        <span className="text-gray-500"> 답변</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-10">
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            커뮤니티 전체보기 →
          </button>
        </div>
      </div>
    </section>
  );
}
