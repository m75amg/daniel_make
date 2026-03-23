import { ArrowRight, Sparkles, Trophy, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ProjectCreationModal } from './ProjectCreationModal';
import { useState } from 'react';

export function PlatformHero() {
  const [isProjectCreationModalOpen, setIsProjectCreationModalOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Main Content - Compact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-white border-blue-200 text-blue-700 px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1.5" />
                메이커 프로젝트 & 콘테스트
              </Badge>
              <Badge variant="outline" className="bg-white border-purple-200 text-purple-700 px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1.5" />
                12개 진행중
              </Badge>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                나만의 엔지니어링 프로젝트를 만들고 공유하세요
              </h1>
              <p className="text-gray-600 leading-relaxed">
                프로젝트 기록부터 콘테스트 참가, 커뮤니티 소통까지. e4ds Maker's Zone에서 여러분의 아이디어를 실현하세요.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                size="default" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setIsProjectCreationModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                프로젝트 시작하기
              </Button>
              <Link to="/projects">
                <Button size="default" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  프로젝트 둘러보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contests">
                <Button size="default" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  <Trophy className="w-4 h-4 mr-2" />
                  콘테스트 보기
                </Button>
              </Link>
            </div>

            {/* Quick Stats - Compact */}
            <div className="flex items-center gap-6 pt-3 border-t border-gray-200">
              <div>
                <div className="text-xl font-bold text-gray-900">2,341</div>
                <div className="text-xs text-gray-500">진행 프로젝트</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-xl font-bold text-gray-900">5,678</div>
                <div className="text-xs text-gray-500">활동 메이커</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-xl font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-500">진행 콘테스트</div>
              </div>
            </div>
          </div>

          {/* Featured Project Card - Compact */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <Badge className="bg-red-500 text-white text-xs">🔥 HOT</Badge>
              </div>
              <img
                src="https://images.unsplash.com/photo-1581092333203-42374bcf7d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzIyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Featured project"
                className="w-full h-36 object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-xs text-blue-600 font-medium mb-1">AI & 로봇공학</div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">자율주행 배송 로봇 프로젝트</h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                실내외 자율주행이 가능한 배송 로봇을 제작했습니다. LIDAR 센서와 AI 비전을 활용한...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>👁 1,234</span>
                  <span>❤️ 89</span>
                </div>
                <Link to="/project/1" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  자세히 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 프로젝트 생성 모달 */}
      <ProjectCreationModal
        isOpen={isProjectCreationModalOpen}
        onClose={() => setIsProjectCreationModalOpen(false)}
      />
    </section>
  );
}