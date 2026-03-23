import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/50 text-white rounded-full text-sm">
              <Sparkles className="w-4 h-4" />
              엔지니어링 메이커 플랫폼
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              아이디어를 현실로
            </h1>
            <div className="flex gap-3">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                공모전 참여하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-blue-500">
                프로젝트 보기
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-8 text-white">
            <div>
              <div className="text-3xl font-bold">24</div>
              <div className="text-sm text-blue-200">진행중</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1.8K</div>
              <div className="text-sm text-blue-200">프로젝트</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5.2K</div>
              <div className="text-sm text-blue-200">메이커</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}