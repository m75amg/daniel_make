import { TrendingUp, Heart, Eye, Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const trendingProjects = [
  {
    id: 1,
    title: 'LED 매트릭스 디스플레이',
    author: '최메이커',
    authorInitial: '최',
    category: '전자공학',
    likes: 342,
    views: 4230,
    image: 'https://images.unsplash.com/photo-1587569087747-addba755bda6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMRUQlMjBsaWdodHMlMjBlbGVjdHJvbmljcyUyMHByb2plY3R8ZW58MXx8fHwxNzczMjI4NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: '라즈베리파이 미디어 센터',
    author: '정개발자',
    authorInitial: '정',
    category: '임베디드',
    likes: 289,
    views: 3890,
    image: 'https://images.unsplash.com/photo-1638734255266-7597abac8571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNwYmVycnklMjBwaSUyMGNvbXB1dGVyJTIwcHJvamVjdHxlbnwxfHx8fDE3NzMyMjg3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: '정밀 기계부품 설계',
    author: '한엔지니어',
    authorInitial: '한',
    category: '기계공학',
    likes: 256,
    views: 2940,
    image: 'https://images.unsplash.com/photo-1763836223247-e44e2753883e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwZW5naW5lZXJpbmclMjBwYXJ0c3xlbnwxfHx8fDE3NzMyMjg3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'CNC 라우터 DIY',
    author: '강메이커',
    authorInitial: '강',
    category: 'CNC',
    likes: 298,
    views: 3560,
    image: 'https://images.unsplash.com/photo-1652888510609-ed2d2ad64d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDTkMlMjBtYWNoaW5lJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NzMyMDkyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    title: '웨어러블 헬스 트래커',
    author: '송개발',
    authorInitial: '송',
    category: '웨어러블',
    likes: 412,
    views: 5120,
    image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZSUyMHRlY2hub2xvZ3klMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    title: '친환경 에너지 솔루션',
    author: '윤메이커',
    authorInitial: '윤',
    category: '에너지',
    likes: 367,
    views: 4780,
    image: 'https://images.unsplash.com/photo-1761815139336-40b16b4cb8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVuZXJneSUyMHN1c3RhaW5hYmxlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzMyMjg3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function TrendingProjects() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">트렌딩 프로젝트</h2>
            </div>
            <p className="text-gray-600">지금 가장 인기있는 프로젝트</p>
          </div>
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            전체보기 →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProjects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                {/* Trending Badge */}
                {index < 3 && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 font-bold">
                      #{index + 1}
                    </Badge>
                  </div>
                )}

                {/* Bookmark */}
                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Bookmark className="w-4 h-4 text-gray-700" />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs">
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {project.title}
                </h3>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                        {project.authorInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">{project.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {project.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {project.views}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" className="border-gray-300 hover:border-blue-600 hover:text-blue-600">
            더 많은 프로젝트 보기
          </Button>
        </div>
      </div>
    </section>
  );
}