import { Calendar, Users, Trophy, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const contests = [
  {
    id: 1,
    title: 'IoT 스마트홈 해커톤',
    organizer: 'Make Lab',
    participants: 156,
    endDate: '2026-04-15',
    prize: '500만원',
    category: 'IoT',
    daysLeft: 34,
  },
  {
    id: 2,
    title: '지속가능한 에너지 솔루션',
    organizer: '그린테크',
    participants: 89,
    endDate: '2026-03-28',
    prize: '1,000만원',
    category: '환경',
    daysLeft: 17,
  },
  {
    id: 3,
    title: '로봇 자율주행 챌린지',
    organizer: '로보틱스 코리아',
    participants: 234,
    endDate: '2026-05-01',
    prize: '2,000만원',
    category: '로봇',
    daysLeft: 51,
  },
];

export function ActiveContests() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">진행중인 공모전</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600">
            전체보기 →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contests.map((contest) => (
            <Card key={contest.id} className="p-0 overflow-hidden hover:shadow-lg transition-all cursor-pointer border-gray-200 group">
              {/* Header with colored background */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-white/20 text-white hover:bg-white/20 border-0">
                    {contest.category}
                  </Badge>
                  <div className="flex items-center bg-red-500/90 px-2 py-1 rounded text-sm font-bold">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    D-{contest.daysLeft}
                  </div>
                </div>
                <h3 className="font-bold text-lg">{contest.title}</h3>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Trophy className="w-4 h-4 mr-1.5 text-yellow-500" />
                    {contest.prize}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1.5 text-blue-500" />
                    {contest.participants}명
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{contest.organizer}</span>
                    <span className="text-gray-400">{contest.endDate}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700">
                  참여하기
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}