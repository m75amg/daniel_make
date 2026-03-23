import { Trophy, Calendar, Users, Award, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const challenges = [
  {
    id: 'ai-robot-2026',
    title: 'AI 로봇 자율주행',
    organizer: '로보틱스 연구소',
    participants: 456,
    endDate: '2026년 5월 1일',
    daysLeft: 51,
    prize: '₩20,000,000',
    difficulty: '고급',
    tags: ['AI', '로봇', '자율주행'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'arduino-2026',
    title: '초보자를 위한 아두이노',
    organizer: 'Make Academy',
    participants: 678,
    endDate: '2026년 4월 30일',
    daysLeft: 50,
    prize: '₩2,000,000',
    difficulty: '초급',
    tags: ['아두이노', '초보자', '교육'],
    gradient: 'from-orange-500 to-red-500',
  },
];

export function ActiveChallenges() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">진행중인 콘테스트</h2>
            <p className="text-sm text-gray-600 mt-1">프로젝트로 참가하고 상금 기회를 얻으세요</p>
          </div>
          <Link to="/contests">
            <Button variant="outline" size="sm">
              전체 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {challenges.map((challenge) => (
            <Link key={challenge.id} to={`/contest/${challenge.id}`}>
              <Card className="group cursor-pointer overflow-hidden border-gray-200 hover:shadow-lg transition-all">
                {/* Gradient Header */}
                <div className={`bg-gradient-to-br ${challenge.gradient} p-4 text-white relative`}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white text-xs border-0">
                      {challenge.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-bold">D-{challenge.daysLeft}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-base leading-tight line-clamp-2">
                    {challenge.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">주최</span>
                      <span className="font-medium text-gray-900">{challenge.organizer}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">상금</span>
                      <span className="font-bold text-blue-600">{challenge.prize}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{challenge.participants}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{challenge.endDate.split('년 ')[1]}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {challenge.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}