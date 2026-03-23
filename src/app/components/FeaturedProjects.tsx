import { Heart, Eye, MessageCircle, Award } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

const featuredProjects = [
  {
    id: 1,
    title: '오픈소스 자율주행 로봇',
    description: '라즈베리파이와 AI 비전을 활용한 실내 자율주행 로봇 프로젝트',
    author: '김메이커',
    authorInitial: '김',
    category: '로봇공학',
    likes: 432,
    views: 5420,
    comments: 89,
    featured: true,
    image: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzIyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: '3D 프린터 자동 레벨링 시스템',
    description: 'AI 기반 자동 베드 레벨링으로 완벽한 첫 레이어를 만드는 시스템',
    author: '이엔지니어',
    authorInitial: '이',
    category: '3D프린팅',
    likes: 298,
    views: 3210,
    comments: 54,
    featured: false,
    image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzEzMDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'IoT 스마트 홈 허브',
    description: 'ESP32 기반 통합 스마트홈 제어 시스템',
    author: '박개발',
    authorInitial: '박',
    category: 'IoT',
    likes: 267,
    views: 2890,
    comments: 41,
    featured: false,
    image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBJb1QlMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">특집 프로젝트</h2>
            <p className="text-gray-600">커뮤니티가 주목하는 혁신적인 프로젝트</p>
          </div>
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            전체보기 →
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Featured Project */}
          <div className="lg:row-span-2 group cursor-pointer">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
              <div className="relative h-80">
                <ImageWithFallback
                  src={featuredProjects[0].image}
                  alt={featuredProjects[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                <Badge className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600 text-white border-0">
                  <Award className="w-3 h-3 mr-1" />
                  주목
                </Badge>

                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-0">
                    {featuredProjects[0].category}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {featuredProjects[0].title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {featuredProjects[0].description}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-sm bg-blue-100 text-blue-700">
                        {featuredProjects[0].authorInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">{featuredProjects[0].author}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {featuredProjects[0].likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {featuredProjects[0].views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {featuredProjects[0].comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Featured Projects */}
          {featuredProjects.slice(1).map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative sm:w-2/5 h-48 sm:h-auto">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-20"></div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <Badge variant="outline" className="mb-3 text-xs">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-gray-100 text-gray-700">
                              {project.authorInitial}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-700">{project.author}</span>
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}