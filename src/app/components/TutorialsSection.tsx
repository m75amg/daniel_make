import { BookOpen, Video, Code, Wrench, Clock, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

const tutorials = [
  {
    id: 1,
    title: '아두이노 시작하기: LED 제어부터 센서까지',
    type: 'video',
    duration: '45분',
    difficulty: '초급',
    author: '김튜토리얼',
    authorInitial: '김',
    rating: 4.8,
    students: 1234,
    image: 'https://images.unsplash.com/photo-1682971829405-42b40b5f0895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwbWljcm9jb250cm9sbGVyJTIwcHJvamVjdHxlbnwxfHx8fDE3NzMyMTc2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: '3D 프린팅 완벽 가이드',
    type: 'article',
    duration: '20분',
    difficulty: '중급',
    author: '이3D',
    authorInitial: '이',
    rating: 4.9,
    students: 890,
    image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzEzMDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'PCB 설계 기초: KiCad 활용법',
    type: 'code',
    duration: '1시간',
    difficulty: '중급',
    author: '박회로',
    authorInitial: '박',
    rating: 4.7,
    students: 567,
    image: 'https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwYm9hcmQlMjBlbGVjdHJvbmljc3xlbnwxfHx8fDE3NzMyMTQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'IoT 스마트홈 만들기',
    type: 'workshop',
    duration: '2시간',
    difficulty: '고급',
    author: '최IoT',
    authorInitial: '최',
    rating: 5.0,
    students: 432,
    image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBJb1QlMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

const typeIcons = {
  video: Video,
  article: BookOpen,
  code: Code,
  workshop: Wrench,
};

const typeLabels = {
  video: '비디오',
  article: '아티클',
  code: '코드',
  workshop: '워크샵',
};

const difficultyColors = {
  '초급': 'bg-green-100 text-green-700',
  '중급': 'bg-yellow-100 text-yellow-700',
  '고급': 'bg-red-100 text-red-700',
};

export function TutorialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-purple-500" />
              <h2 className="text-3xl font-bold text-gray-900">학습 리소스</h2>
            </div>
            <p className="text-gray-600">단계별 튜토리얼과 가이드로 빠르게 배우세요</p>
          </div>
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            전체보기 →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial) => {
            const TypeIcon = typeIcons[tutorial.type as keyof typeof typeIcons];
            return (
              <Card
                key={tutorial.id}
                className="group cursor-pointer overflow-hidden border-gray-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {typeLabels[tutorial.type as keyof typeof typeLabels]}
                    </Badge>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                      <Clock className="w-3 h-3" />
                      {tutorial.duration}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${difficultyColors[tutorial.difficulty as keyof typeof difficultyColors]}`}>
                      {tutorial.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tutorial.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors">
                    {tutorial.title}
                  </h3>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                          {tutorial.authorInitial}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{tutorial.author}</span>
                    </div>
                    <span className="text-xs text-gray-500">{tutorial.students}명 수강</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}