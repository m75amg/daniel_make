import { BookOpen, Video, FileText, Play } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const resources = [
  {
    id: 1,
    title: '아두이노 시작하기',
    type: 'guide',
    duration: '15분',
    image: 'https://images.unsplash.com/photo-1682971829405-42b40b5f0895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwbWljcm9jb250cm9sbGVyJTIwcHJvamVjdHxlbnwxfHx8fDE3NzMyMTc2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: '3D 프린팅 완벽 가이드',
    type: 'guide',
    duration: '20분',
    image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzEzMDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'IoT 스마트홈 만들기',
    type: 'video',
    duration: '45분',
    image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBJb1QlMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'PCB 설계 기초',
    type: 'video',
    duration: '1시간',
    image: 'https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwYm9hcmQlMjBlbGVjdHJvbmljc3xlbnwxfHx8fDE3NzMyMTQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function LearningResources() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-purple-500" />
              <h2 className="text-3xl font-bold text-gray-900">개발 가이드 & 테크비디오</h2>
            </div>
            <p className="text-gray-600">단계별 튜토리얼로 빠르게 배우고 시작하세요</p>
          </div>
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            전체보기 →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="group cursor-pointer overflow-hidden border-gray-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                    {resource.type === 'video' ? (
                      <>
                        <Video className="w-3 h-3 mr-1" />
                        테크비디오
                      </>
                    ) : (
                      <>
                        <FileText className="w-3 h-3 mr-1" />
                        개발가이드
                      </>
                    )}
                  </Badge>
                </div>

                {/* Play button for videos */}
                {resource.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </div>
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                    {resource.duration}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}