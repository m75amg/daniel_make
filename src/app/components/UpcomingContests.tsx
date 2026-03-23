import { Calendar, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const upcomingContests = [
  {
    id: 1,
    title: 'AI 기반 헬스케어 솔루션',
    startDate: '04.01',
    category: 'AI/ML',
  },
  {
    id: 2,
    title: '스마트 시티 인프라 설계',
    startDate: '04.10',
    category: '도시공학',
  },
  {
    id: 3,
    title: '친환경 모빌리티 챌린지',
    startDate: '04.20',
    category: '모빌리티',
  },
  {
    id: 4,
    title: '교육 EdTech 혁신',
    startDate: '05.05',
    category: '교육',
  },
];

export function UpcomingContests() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">예정된 공모전</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            전체보기 →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingContests.map((contest) => (
            <Card key={contest.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer border-gray-200 bg-white group">
              <div className="space-y-3">
                <Badge variant="outline" className="text-gray-600 border-gray-300 text-xs">
                  {contest.category}
                </Badge>
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 min-h-[2.5rem]">{contest.title}</h3>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {contest.startDate}
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Bell className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}