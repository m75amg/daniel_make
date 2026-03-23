import { Link } from 'react-router';
import { ChevronRight, Trophy, Clock, Users, Gift, TrendingUp, Calendar, Target, Plus } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';

const contests = [
  {
    id: 'ai-robot-2026',
    title: 'AI 로봇공학 챌린지 2026',
    description: '인공지능과 로봇공학을 결합한 혁신적인 프로젝트를 만들어보세요',
    prize: '총 상금 1,000만원',
    participants: 234,
    daysLeft: 15,
    deadline: '2026년 3월 31일',
    difficulty: '중급',
    category: 'AI/로봇',
    status: 'active',
    gradient: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzIyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'iot-smart-home',
    title: '스마트홈 IoT 콘테스트',
    description: '일상을 더 편리하게 만드는 스마트홈 IoT 솔루션 개발',
    prize: '총 상금 800만원',
    participants: 189,
    daysLeft: 22,
    deadline: '2026년 4월 7일',
    difficulty: '초급',
    category: 'IoT',
    status: 'active',
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBJb1QlMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'renewable-energy',
    title: '지속가능 에너지 챌린지',
    description: '재생에너지를 활용한 창의적인 프로젝트로 미래를 만드세요',
    prize: '총 상금 1,200만원',
    participants: 156,
    daysLeft: 30,
    deadline: '2026년 4월 15일',
    difficulty: '고급',
    category: '에너지',
    status: 'active',
    gradient: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwcmVuZXdhYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc3MzE4MDg0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '3d-printing-innovation',
    title: '3D 프린팅 혁신 대회',
    description: '3D 프린팅 기술로 세상을 바꿀 혁신적인 제품 설계',
    prize: '총 상금 600만원',
    participants: 98,
    daysLeft: 8,
    deadline: '2026년 3월 23일',
    difficulty: '중급',
    category: '3D프린팅',
    status: 'active',
    gradient: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzEzMDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'wearable-tech-future',
    title: '웨어러블 기술의 미래',
    description: '차세대 웨어러블 디바이스 아이디어 공모전',
    prize: '총 상금 500만원',
    participants: 45,
    daysLeft: 45,
    deadline: '2026년 4월 30일',
    difficulty: '초급',
    category: '웨어러블',
    status: 'upcoming',
    gradient: 'from-indigo-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZSUyMHRlY2hub2xvZ3klMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'drone-innovation',
    title: '드론 혁신 챌린지',
    description: '드론 기술을 활용한 실용적이고 창의적인 솔루션',
    prize: '총 상금 900만원',
    participants: 67,
    daysLeft: 60,
    deadline: '2026년 5월 15일',
    difficulty: '중급',
    category: '드론',
    status: 'upcoming',
    gradient: 'from-teal-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMjI4NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'arduino-beginner-2025',
    title: '아두이노 입문자 대회 2025',
    description: '아두이노로 만드는 첫 프로젝트 경진대회',
    prize: '총 상금 300만원',
    participants: 342,
    daysLeft: 0,
    deadline: '2025년 12월 31일',
    difficulty: '초급',
    category: '아두이노',
    status: 'ended',
    gradient: 'from-gray-500 to-slate-500',
    image: 'https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwYm9hcmQlMjBlbGVjdHJvbmljc3xlbnwxfHx8fDE3NzMyMTQ3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'ai-vision-2025',
    title: 'AI 비전 프로젝트 2025',
    description: '컴퓨터 비전을 활용한 실생활 문제 해결',
    prize: '총 상금 700만원',
    participants: 278,
    daysLeft: 0,
    deadline: '2026년 1월 15일',
    difficulty: '고급',
    category: 'AI',
    status: 'ended',
    gradient: 'from-gray-500 to-slate-500',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGVuZ2luZWVyaW5nJTIwcHJvamVjdHxlbnwxfHx8fDE3NzMyMTQ3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

type TabType = 'active' | 'upcoming' | 'ended';

export function ContestListPage() {
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [visibleCount, setVisibleCount] = useState(6); // 초기 6개 표시
  const ITEMS_PER_LOAD = 6; // 더보기 클릭 시 6개씩 추가

  const filteredContests = contests.filter(contest => contest.status === activeTab);
  const displayedContests = filteredContests.slice(0, visibleCount);
  const hasMore = visibleCount < filteredContests.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_LOAD);
  };

  // 탭 변경 시 visibleCount 리셋
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setVisibleCount(6);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return { label: '진행중', className: 'bg-green-500 hover:bg-green-600' };
      case 'upcoming':
        return { label: '예정', className: 'bg-blue-500 hover:bg-blue-600' };
      case 'ended':
        return { label: '종료', className: 'bg-gray-500 hover:bg-gray-600' };
      default:
        return { label: '진행중', className: 'bg-green-500 hover:bg-green-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">홈</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-semibold">콘테스트</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-medium">Make 2.0 콘테스트</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              창의력을 발휘할 기회
            </h1>
            <p className="text-xl text-blue-100">
              다양한 주제의 공모전에 참가하고 여러분의 아이디어를 현실로 만드세요
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1 text-gray-900">24</div>
              <div className="text-sm text-gray-700">진행중인 대회</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1 text-gray-900">1,234</div>
              <div className="text-sm text-gray-700">참가자</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1 text-gray-900">5,670</div>
              <div className="text-sm text-gray-700">제출된 프로젝트</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1 text-gray-900">2.3억</div>
              <div className="text-sm text-gray-700">총 상금</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => handleTabChange('active')}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === 'active'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                진행중
                <Badge className="bg-green-100 text-green-700 border-0 ml-1">
                  {contests.filter(c => c.status === 'active').length}
                </Badge>
              </span>
            </button>
            <button
              onClick={() => handleTabChange('upcoming')}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                예정
                <Badge className="bg-blue-100 text-blue-700 border-0 ml-1">
                  {contests.filter(c => c.status === 'upcoming').length}
                </Badge>
              </span>
            </button>
            <button
              onClick={() => handleTabChange('ended')}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === 'ended'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                종료
                <Badge className="bg-gray-100 text-gray-700 border-0 ml-1">
                  {contests.filter(c => c.status === 'ended').length}
                </Badge>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Contest Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {activeTab === 'active' && '진행중인 콘테스트'}
            {activeTab === 'upcoming' && '곧 시작될 콘테스트'}
            {activeTab === 'ended' && '종료된 콘테스트'}
          </h2>
          <p className="text-gray-600">
            {filteredContests.length}개의 콘테스트
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedContests.map((contest) => {
            const statusBadge = getStatusBadge(contest.status);
            
            return (
              <Link key={contest.id} to={contest.status === 'ended' ? `/contest/${contest.id}/results` : `/contest/${contest.id}`}>
                <Card className="group cursor-pointer overflow-hidden border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Gradient Header with Image Overlay */}
                  <div className={`relative bg-gradient-to-br ${contest.gradient} h-48 overflow-hidden`}>
                    <ImageWithFallback
                      src={contest.image}
                      alt={contest.title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <Badge className={`${statusBadge.className} text-white border-0 text-xs`}>
                        {statusBadge.label}
                      </Badge>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/20 border-0 text-xs">
                        {contest.difficulty}
                      </Badge>
                    </div>

                    {/* Days Left (only for active contests) */}
                    {contest.status === 'active' && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-bold text-gray-900">D-{contest.daysLeft}</span>
                      </div>
                    )}

                    {/* Trophy icon for ended contests */}
                    {contest.status === 'ended' && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-yellow-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Trophy className="w-4 h-4 text-white" />
                        <span className="text-sm font-bold text-white">수상자 발표</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <Badge variant="outline" className="text-xs mb-2">
                        {contest.category}
                      </Badge>
                      <h3 className="font-bold text-lg leading-tight text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {contest.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {contest.description}
                    </p>

                    {/* Info Grid */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <Gift className="w-4 h-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-700">{contest.prize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{contest.participants}명 참가중</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>마감: {contest.deadline}</span>
                      </div>
                    </div>

                    <Button 
                      className={`w-full ${
                        contest.status === 'ended' 
                          ? 'bg-yellow-500 hover:bg-yellow-600' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {contest.status === 'ended' ? (
                        <span className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          수상자 결과 보기
                        </span>
                      ) : '자세히 보기'}
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Load More Button / End Message */}
        {filteredContests.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            {hasMore ? (
              <>
                <Button 
                  size="lg"
                  variant="outline" 
                  onClick={handleLoadMore}
                  className="px-8 py-6 text-base font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  더 많은 콘테스트 보기
                </Button>
                {/* Progress indicator */}
                <p className="text-sm text-gray-500">
                  {visibleCount}개 / 총 {filteredContests.length}개
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
                  <Trophy className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-600 font-medium mb-1">
                  모든 콘테스트를 확인했습니다
                </p>
                <p className="text-sm text-gray-500">
                  총 {filteredContests.length}개의 콘테스트를 둘러보셨습니다
                </p>
              </div>
            )}
          </div>
        )}

        {filteredContests.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              해당하는 콘테스트가 없습니다
            </h3>
            <p className="text-gray-500">
              다른 탭을 확인해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}