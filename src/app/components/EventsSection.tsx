import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const events = [
  {
    id: 1,
    title: '메이커 밋업 2026 서울',
    date: '2026년 3월 25일',
    time: '14:00 - 18:00',
    location: '강남구 테헤란로',
    attendees: 156,
    type: '오프라인',
    status: '모집중',
    tags: ['네트워킹', '전시'],
  },
  {
    id: 2,
    title: 'IoT 워크샵: ESP32 실전',
    date: '2026년 4월 5일',
    time: '10:00 - 17:00',
    location: '온라인 (Zoom)',
    attendees: 234,
    type: '온라인',
    status: '모집중',
    tags: ['교육', 'IoT'],
  },
  {
    id: 3,
    title: '3D 프린팅 해커톤',
    date: '2026년 4월 12일',
    time: '09:00 - 18:00',
    location: '판교 스타트업캠퍼스',
    attendees: 89,
    type: '오프라인',
    status: '마감임박',
    tags: ['해커톤', '3D프린팅'],
  },
];

export function EventsSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">다가오는 이벤트</h2>
            <p className="text-sm text-gray-600 mt-1">메이커 커뮤니티의 이벤트에 참여하세요</p>
          </div>
          <Link to="/events">
            <Button variant="outline" size="sm">
              전체 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
                    {event.title}
                  </h3>
                  <Badge 
                    variant="outline"
                    className={
                      event.status === '마감임박' 
                        ? 'bg-red-50 text-red-700 border-red-200 text-xs flex-shrink-0' 
                        : 'bg-green-50 text-green-700 border-green-200 text-xs flex-shrink-0'
                    }
                  >
                    {event.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>{event.attendees}명 참가</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100">
                  <Badge 
                    variant="outline" 
                    className={event.type === '온라인' ? 'text-xs border-blue-200 text-blue-700' : 'text-xs border-purple-200 text-purple-700'}
                  >
                    {event.type}
                  </Badge>
                  {event.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}