import { Link } from 'react-router';
import { ChevronRight, Calendar, MapPin, Users, Clock, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">이벤트</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Make 2.0 이벤트</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            메이커 커뮤니티 이벤트
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            워크숍, 밋업, 해커톤 등 다양한 오프라인/온라인 이벤트에 참여하세요
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">다가오는 이벤트</h2>
          <p className="text-gray-600">메이커들과 함께 배우고 성장하는 시간</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'AI 로봇공학 워크숍',
              date: '2026년 3월 25일',
              time: '14:00 - 18:00',
              location: '서울 강남구 테헤란로',
              participants: 45,
              maxParticipants: 50,
              type: '워크숍',
              status: '모집중',
              image: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzIyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            },
            {
              title: '메이커 밋업: 3D 프린팅',
              date: '2026년 4월 5일',
              time: '19:00 - 21:00',
              location: '온라인 (Zoom)',
              participants: 234,
              maxParticipants: 300,
              type: '밋업',
              status: '모집중',
              image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzEzMDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            },
            {
              title: 'IoT 해커톤 2026',
              date: '2026년 4월 15-16일',
              time: '09:00 - 18:00 (2일)',
              location: '부산 해운대구',
              participants: 89,
              maxParticipants: 100,
              type: '해커톤',
              status: '모집중',
              image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBJb1QlMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            },
            {
              title: '아두이노 입문 워크숍',
              date: '2026년 4월 20일',
              time: '10:00 - 16:00',
              location: '대전 유성구',
              participants: 28,
              maxParticipants: 30,
              type: '워크숍',
              status: '마감임박',
              image: 'https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwYm9hcmQlMjBlbGVjdHJvbmljc3xlbnwxfHx8fDE3NzMyMTQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            },
          ].map((event, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative aspect-video">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <Badge className={`absolute top-4 right-4 ${
                  event.status === '마감임박' 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white border-0`}>
                  {event.status}
                </Badge>
                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900 border-0">
                  {event.type}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{event.participants}/{event.maxParticipants}명 참가</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    신청하기
                  </Button>
                  <Button variant="outline" className="flex-1">
                    상세보기
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}