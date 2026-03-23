import { Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

const latestProjects = [
  {
    id: 1,
    title: '오픈소스 소형 풍력발전기',
    author: '강메이커',
    authorInitial: '강',
    timeAgo: '5분',
    category: '에너지',
    gradient: 'from-yellow-100 to-orange-100',
  },
  {
    id: 2,
    title: 'ESP32 기반 날씨 측정 스테이션',
    author: '송개발',
    authorInitial: '송',
    timeAgo: '23분',
    category: 'IoT',
    gradient: 'from-blue-100 to-indigo-100',
  },
  {
    id: 3,
    title: '자동 물주기 시스템 v2.0',
    author: '한엔지니어',
    authorInitial: '한',
    timeAgo: '1시간',
    category: '자동화',
    gradient: 'from-green-100 to-teal-100',
  },
  {
    id: 4,
    title: '블루투스 기타 이펙터',
    author: '임메이커',
    authorInitial: '임',
    timeAgo: '2시간',
    category: '오디오',
    gradient: 'from-purple-100 to-pink-100',
  },
  {
    id: 5,
    title: 'LED 매트릭스 디스플레이',
    author: '조테크',
    authorInitial: '조',
    timeAgo: '3시간',
    category: '전자공학',
    gradient: 'from-red-100 to-rose-100',
  },
  {
    id: 6,
    title: '로봇 팔 제어 시스템',
    author: '신메이커',
    authorInitial: '신',
    timeAgo: '4시간',
    category: '로봇',
    gradient: 'from-cyan-100 to-blue-100',
  },
  {
    id: 7,
    title: 'PCB 설계 자동화 도구',
    author: '유개발자',
    authorInitial: '유',
    timeAgo: '5시간',
    category: '소프트웨어',
    gradient: 'from-violet-100 to-purple-100',
  },
  {
    id: 8,
    title: '태양광 패널 모니터링',
    author: '하엔지니어',
    authorInitial: '하',
    timeAgo: '6시간',
    category: '에너지',
    gradient: 'from-amber-100 to-yellow-100',
  },
];

export function LatestProjects() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">최신 프로젝트</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            전체보기 →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            >
              {/* Image Placeholder */}
              <div className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all"></div>
                <div className="text-4xl opacity-30">🔧</div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2.5">
                <span className="text-xs text-blue-600 font-medium">{project.category}</span>
                <h3 className="font-bold text-sm text-gray-900 line-clamp-2 min-h-[2.5rem]">
                  {project.title}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                        {project.authorInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">{project.author}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {project.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}