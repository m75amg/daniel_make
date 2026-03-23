import { Heart, Eye, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

const projects = [
  {
    id: 1,
    title: '오픈소스 자율주행 로봇',
    description: '라즈베리파이와 AI 비전을 활용한 실내 자율주행 로봇 프로젝트. 장애물 회피와 경로 최적화 알고리즘 구현',
    author: '김메이커',
    authorInitial: '김',
    category: '로봇공학',
    likes: 432,
    views: 5420,
    comments: 89,
    isContest: true,
    contestName: 'AI 로봇 챌린지',
    image: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzIyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
  },
  {
    id: 2,
    title: 'ESP32 기반 스마트 화분',
    description: '토양 수분, 온도, 조도를 모니터링하고 자동으로 물을 주는 IoT 화분',
    author: '이개발',
    authorInitial: '이',
    category: 'IoT',
    likes: 289,
    views: 3210,
    comments: 54,
    isContest: false,
    image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBJb1QlMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
  },
  {
    id: 3,
    title: '3D 프린터 자동 레벨링 시스템',
    description: 'AI 기반 자동 베드 레벨링으로 완벽한 첫 레이어를 만드는 시스템',
    author: '박엔지니어',
    authorInitial: '박',
    category: '3D프린팅',
    likes: 267,
    views: 2890,
    comments: 41,
    isContest: false,
    image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzEzMDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
  },
  {
    id: 4,
    title: '태양광 추적 시스템',
    description: '태양의 위치를 자동으로 추적하는 듀얼 축 솔라 트래커',
    author: '최메이커',
    authorInitial: '최',
    category: '에너지',
    likes: 345,
    views: 4120,
    comments: 67,
    isContest: true,
    contestName: '지속가능 에너지 챌린지',
    image: 'https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwcmVuZXdhYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc3MzE4MDg0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
  },
  {
    id: 5,
    title: 'LED 매트릭스 디스플레이',
    description: 'WS2812B LED를 활용한 32x32 프로그래밍 가능한 디스플레이',
    author: '정개발자',
    authorInitial: '정',
    category: '전자공학',
    likes: 198,
    views: 2340,
    comments: 32,
    isContest: false,
    image: 'https://images.unsplash.com/photo-1587569087747-addba755bda6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMRUQlMjBsaWdodHMlMjBlbGVjdHJvbmljcyUyMHByb2plY3R8ZW58MXx8fHwxNzczMjI4NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
  },
  {
    id: 6,
    title: '웨어러블 헬스 트래커',
    description: 'ESP32 기반 심박수, 걸음 수, 수면 패턴을 추적하는 웨어러블 디바이스',
    author: '한메이커',
    authorInitial: '한',
    category: '웨어러블',
    likes: 412,
    views: 5120,
    comments: 78,
    isContest: false,
    image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZSUyMHRlY2hub2xvZ3klMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
  },
];

export function ProjectsShowcase() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">인기 프로젝트</h2>
            <p className="text-sm text-gray-600 mt-1">메이커들의 최신 프로젝트를 확인하세요</p>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm">
              전체 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 6).map((project) => (
            <Link 
              key={project.id} 
              to={`/project/${project.id}`}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                <div className="relative">
                  {project.featured && (
                    <div className="absolute top-2 left-2 z-10">
                      <Badge className="bg-red-500 text-white text-xs">🔥 인기</Badge>
                    </div>
                  )}
                  {project.isContest && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="secondary" className="bg-purple-500 text-white text-xs">
                        🏆 콘테스트
                      </Badge>
                    </div>
                  )}
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                          {project.authorInitial}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-700 font-medium">{project.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {project.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        {project.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}