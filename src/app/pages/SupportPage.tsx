import { Link } from 'react-router';
import { ChevronRight, Heart, Coffee, DollarSign, Gift, Users, Sparkles, Trophy, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">후원하기</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Make 2.0 후원하기</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            메이커 커뮤니티를 함께 만들어가요
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Make 2.0은 메이커들이 자유롭게 창작하고 공유할 수 있는 플랫폼입니다.
            여러분의 후원이 더 나은 메이커 문화를 만듭니다.
          </p>
        </div>
      </section>

      {/* Support Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">후원 방법</h2>
          <p className="text-lg text-gray-600">
            Make 2.0을 후원하는 다양한 방법을 선택하실 수 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* One-time Support */}
          <Card className="p-8 border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Coffee className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">커피 한 잔</h3>
              <p className="text-gray-600">일회성 후원</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>플랫폼 운영 지원</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>후원자 명단 등재</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>감사 메시지 전달</span>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              5,000원 후원하기
            </Button>
          </Card>

          {/* Monthly Support */}
          <Card className="p-8 border-2 border-purple-500 hover:border-purple-600 transition-all hover:shadow-xl relative">
            <Badge className="absolute top-4 right-4 bg-purple-500 text-white border-0">
              인기
            </Badge>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">정기 후원</h3>
              <p className="text-gray-600">매월 자동 결제</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>모든 일회성 후원 혜택</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>후원자 전용 배지</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>콘테스트 조기 참가</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>월간 리포트 수신</span>
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              월 10,000원 후원하기
            </Button>
          </Card>

          {/* Corporate Support */}
          <Card className="p-8 border-2 border-gray-200 hover:border-yellow-500 transition-all hover:shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">기업 후원</h3>
              <p className="text-gray-600">맞춤형 협력</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>모든 정기 후원 혜택</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>기업 로고 노출</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>콘테스트 공동 주최</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>전담 매니저 배정</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-2">
              문의하기
            </Button>
          </Card>
        </div>

        {/* Why Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">후원금은 이렇게 사용됩니다</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: '플랫폼 개선',
                description: '더 나은 사용자 경험을 위한 기능 개발',
                color: 'text-blue-600',
                bg: 'bg-blue-100',
              },
              {
                icon: Trophy,
                title: '콘테스트 상금',
                description: '메이커들의 창작 활동 지원',
                color: 'text-purple-600',
                bg: 'bg-purple-100',
              },
              {
                icon: Users,
                title: '커뮤니티 운영',
                description: '오프라인 밋업 및 워크샵 개최',
                color: 'text-green-600',
                bg: 'bg-green-100',
              },
              {
                icon: Gift,
                title: '교육 자료',
                description: '무료 튜토리얼 및 강의 제작',
                color: 'text-yellow-600',
                bg: 'bg-yellow-100',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-6 text-center border-gray-200">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-full ${item.bg} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Supporters */}
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">후원자 명단</h2>
            <p className="text-gray-600">Make 2.0을 후원해주신 분들께 감사드립니다</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            {[
              '김메이커', '이개발자', '박엔지니어', '정코더',
              '최프로그래머', '한창작자', '윤디자이너', '장기획자',
              '조분석가', '신연구원', '오실험자', '권발명가'
            ].map((name, index) => (
              <div key={index} className="p-3 bg-white rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                  {name[0]}
                </div>
                <p className="text-sm font-medium text-gray-900">{name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}