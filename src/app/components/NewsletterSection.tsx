import { Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function NewsletterSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-gray-200">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative px-6 py-12 md:px-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  메이커 뉴스레터 구독
                </h2>
                <p className="text-lg text-blue-100">
                  최신 프로젝트, 튜토리얼, 공모전 소식을 매주 받아보세요
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-4">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="flex-1 px-5 py-3 rounded-lg border-0 outline-none text-gray-900 placeholder:text-gray-400"
                />
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white whitespace-nowrap">
                  구독하기
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <p className="text-sm text-blue-100">
                매주 수요일 발송 • 언제든 구독 취소 가능
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 pt-6 text-white">
                <div>
                  <div className="text-2xl font-bold">5,234</div>
                  <div className="text-sm text-blue-200">구독자</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-2xl font-bold">152</div>
                  <div className="text-sm text-blue-200">발행호</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-sm text-blue-200">만족도</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}