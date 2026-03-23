import { Heart, MessageCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

const projects = [
  {
    id: 1,
    title: '3D 프린터 자동 레벨링 시스템',
    author: '김메이커',
    authorInitial: '김',
    likes: 234,
    views: 1520,
    comments: 45,
    tags: ['3D프린팅', '자동화'],
    image: 'from-purple-100 to-pink-100',
  },
  {
    id: 2,
    title: '라즈베리파이 기반 홈 서버',
    author: '이개발',
    authorInitial: '이',
    likes: 189,
    views: 2340,
    comments: 67,
    tags: ['라즈베리파이', 'DIY'],
    image: 'from-blue-100 to-cyan-100',
  },
  {
    id: 3,
    title: '아두이노 스마트 화분',
    author: '박엔지니어',
    authorInitial: '박',
    likes: 156,
    views: 890,
    comments: 32,
    tags: ['아두이노', 'IoT'],
    image: 'from-green-100 to-emerald-100',
  },
  {
    id: 4,
    title: 'CNC 머신 제어 소프트웨어',
    author: '최메이커',
    authorInitial: '최',
    likes: 298,
    views: 1780,
    comments: 54,
    tags: ['CNC', '소프트웨어'],
    image: 'from-orange-100 to-amber-100',
  },
  {
    id: 5,
    title: '오픈소스 드론 컨트롤러',
    author: '정개발자',
    authorInitial: '정',
    likes: 421,
    views: 3200,
    comments: 89,
    tags: ['드론', '오픈소스'],
    image: 'from-indigo-100 to-purple-100',
  },
  {
    id: 6,
    title: '웨어러블 건강 모니터링',
    author: '윤메이커',
    authorInitial: '윤',
    likes: 267,
    views: 1450,
    comments: 43,
    tags: ['웨어러블', '헬스케어'],
    image: 'from-rose-100 to-red-100',
  },
];

export function PopularProjects() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">인기 프로젝트</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            전체보기 →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-gray-200 group">
              {/* Image Placeholder */}
              <div className={`aspect-video bg-gradient-to-br ${project.image} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                <div className="text-6xl opacity-20">📦</div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[3rem]">{project.title}</h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                        {project.authorInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{project.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {project.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {project.comments}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}