import { ArrowRight, Trophy, Users, Calendar, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FeaturedHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 text-sm px-3 py-1">
              <Trophy className="w-4 h-4 mr-1.5" />
              특집 공모전
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                2026 AI 로봇 챌린지
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                인공지능과 로봇공학이 만나는 혁신적인 프로젝트를 만들어보세요. 
                최대 2,000만원의 상금과 투자 기회가 기다립니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-gray-400">마감일</div>
                  <div className="font-semibold">2026년 5월 15일</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-gray-400">참여자</div>
                  <div className="font-semibold">342명</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-gray-400">총 상금</div>
                  <div className="font-semibold">₩20,000,000</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                지금 참여하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                자세히 보기
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581092333203-42374bcf7d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzIyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI 로봇 챌린지"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                <div className="bg-white/90 backdrop-blur-md rounded-lg px-4 py-3 flex-1">
                  <div className="text-2xl font-bold text-gray-900">51</div>
                  <div className="text-sm text-gray-700">일 남음</div>
                </div>
                <div className="bg-white/90 backdrop-blur-md rounded-lg px-4 py-3 flex-1">
                  <div className="text-2xl font-bold text-gray-900">89</div>
                  <div className="text-sm text-gray-700">제출 프로젝트</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}