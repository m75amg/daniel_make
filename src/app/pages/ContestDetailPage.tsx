import { useParams, Link, useNavigate } from 'react-router';
import { 
  Trophy, Calendar, Users, Award, Clock, ArrowRight, 
  ChevronRight, HelpCircle, MessageCircle, FileText,
  CheckCircle2, Target, Zap, Upload, ExternalLink,
  TrendingUp, Sparkles, Eye, Heart, Star, Bell,
  Play, Download, Code, AlertCircle, Lightbulb,
  UserPlus, GitBranch, Activity, Rocket, CheckCircle,
  Timer, Ban, AlertTriangle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { LoginModal } from '../components/LoginModal';
import { useState, useRef } from 'react';

// Quest 제출 상태 타입
type QuestSubmissionStatus = 'not-started' | 'normal' | 'late' | 'closed';

// Quest 데이터 인터페이스
interface Quest {
  id: number;
  title: string;
  description: string;
  points: number;
  startDate: string;
  normalDeadline: string;
  finalDeadline: string;
  penaltyRate: number; // 감점 비율 (예: 0.2 = 20% 감점)
  requirements: string[];
  completed: boolean;
}

// 날짜 비교 및 상태 계산 헬퍼 함수
function getQuestStatus(quest: Quest, currentDate: Date): QuestSubmissionStatus {
  const start = new Date(quest.startDate);
  const normal = new Date(quest.normalDeadline);
  const final = new Date(quest.finalDeadline);

  if (currentDate < start) {
    return 'not-started';
  } else if (currentDate <= normal) {
    return 'normal';
  } else if (currentDate <= final) {
    return 'late';
  } else {
    return 'closed';
  }
}

// 남은 시간 계산
function getDaysRemaining(targetDate: string, currentDate: Date): number {
  const target = new Date(targetDate);
  const diffTime = target.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function ContestDetailPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();

  // Mock user participation status - 참가 전 상태로 기본 설정
  const userParticipating = false;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollToProjectsTab = () => {
    setActiveTab('projects');
    setTimeout(() => {
      tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // 현재 날짜 (테스트를 위해 조정 가능)
  const currentDate = new Date('2026-03-11'); // 오늘 날짜

  const projectStatus = {
    created: true,
    projectId: 1,
    questsCompleted: [true, true, false], // Quest 1, 2 완료, Quest 3 진행중
    status: 'in-progress', // 'not-started' | 'in-progress' | 'completed'
  };

  const questsCompleted = projectStatus.questsCompleted.filter(Boolean).length;

  const handleJoinContest = () => {
    if (!isLoggedIn) {
      // 로그인이 안 되어 있으면 로그인 모달 표시
      setIsLoginModalOpen(true);
    } else {
      // 로그인 되어 있으면 프로젝트 등록 페이지로 이동
      navigate(`/contest/${contestId}/create-project`);
    }
  };

  const handleLogin = () => {
    // 로그인 처리 (실제로는 API 호출)
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    // 로그인 후 프로젝트 등록 페이지로 이동
    navigate(`/contest/${contestId}/create-project`);
  };

  const quests: Quest[] = [
    {
      id: 1,
      title: 'Quest 1: 프로젝트 기획 및 설계',
      description: '로봇의 컨셉과 기능을 정의하고 설계도를 작성하세요',
      points: 100,
      startDate: '2026-03-01',
      normalDeadline: '2026-03-25',
      finalDeadline: '2026-03-30',
      penaltyRate: 0.15, // 15% 감점
      requirements: [
        '프로젝트 목표 및 컨셉 정의',
        '하드웨어 구성도 작성',
        '소프트웨어 아키텍처 설계',
        '예상 타임라인 작성',
      ],
      completed: true,
    },
    {
      id: 2,
      title: 'Quest 2: 프로토타입 제작',
      description: '설계한 로봇의 초기 프로토타입을 제작하고 기본 동작을 구현하세요',
      points: 150,
      startDate: '2026-03-26',
      normalDeadline: '2026-04-10',
      finalDeadline: '2026-04-13',
      penaltyRate: 0.20, // 20% 감점
      requirements: [
        '하드웨어 조립 및 배선',
        '기본 센서 테스트',
        '모터 제어 구현',
        '프로토타입 영상 촬영',
      ],
      completed: false,
    },
    {
      id: 3,
      title: 'Quest 3: 최종 프로젝트 완성',
      description: 'AI 기능을 통합하고 최종 테스트를 완료하여 프로젝트를 완성하세요',
      points: 200,
      startDate: '2026-04-11',
      normalDeadline: '2026-04-25',
      finalDeadline: '2026-04-27',
      penaltyRate: 0.30, // 30% 감점
      requirements: [
        'AI 비전 또는 음성인식 통합',
        '자율주행 또는 장애물 회피 구현',
        '최종 테스트 및 디버깅',
        '완성된 프로젝트 문서화',
        '시연 영상 제작',
      ],
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/contests" className="hover:text-blue-600 transition-colors">콘테스트</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">AI 로봇 챌린지 2026</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-sm px-4 py-1.5">
                  <Activity className="w-4 h-4 mr-2" />
                  진행중
                </Badge>
                <Badge className="bg-yellow-500 text-yellow-900 border-0 text-sm px-4 py-1.5 font-bold">
                  마감 D-45
                </Badge>
                <Badge className="bg-green-500 text-white border-0 text-sm px-4 py-1.5">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  234명 참가중
                </Badge>
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                AI 로봇 챌린지 2026
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                인공지능과 로봇공학을 결합한 혁신적인 프로젝트를 만들고 플랫폼에 영구 등록하세요. 
                실내 자율주행, 물체 인식, 음성 제어 등 다양한 AI 기술을 활용한 로봇을 제작하고 커뮤니티와 공유합니다.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {!userParticipating ? (
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-base px-8 shadow-xl" onClick={handleJoinContest}>
                    <Rocket className="w-5 h-5 mr-2" />
                    참가하고 프로젝트 시작하기
                  </Button>
                ) : (
                  <Link to={`/project/${projectStatus.projectId}`}>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-base px-8 shadow-xl">
                      <Eye className="w-5 h-5 mr-2" />
                      내 프로젝트 보기
                    </Button>
                  </Link>
                )}
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-base px-8"
                  onClick={scrollToProjectsTab}
                >
                  <Users className="w-5 h-5 mr-2" />
                  참가자 프로젝트 둘러보기
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">₩3,500만</div>
                  <div className="text-sm text-blue-100">총 상금</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold">89개</div>
                  <div className="text-sm text-blue-100">제출 프로젝트</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold">2026.04.25</div>
                  <div className="text-sm text-blue-100">최종 마감일</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581092333203-42374bcf7d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzIyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="AI 로봇 챌린지"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Participation Status Banner */}
      {userParticipating && (
        <section className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    참가중인 콘테스트 - 프로젝트 진행중
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quest {questsCompleted}/3 완료 • 
                    {projectStatus.status === 'completed' ? ' 프로젝트 완성!' : ' 다음 단계를 진행하세요'}
                  </p>
                </div>
              </div>
              <Link to={`/project/${projectStatus.projectId}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Eye className="w-4 h-4 mr-2" />
                  내 프로젝트 확인하기
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div ref={tabsRef}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="overview" className="px-6">개요</TabsTrigger>
            <TabsTrigger value="quests" className="px-6">
              프로젝트 완성 단계
              {userParticipating && (
                <Badge className="ml-2 bg-blue-600 text-white">
                  {questsCompleted}/3
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="projects" className="px-6">참가 프로젝트 (89)</TabsTrigger>
            <TabsTrigger value="prizes" className="px-6">시상</TabsTrigger>
            <TabsTrigger value="faq" className="px-6">FAQ</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* How it Works - Contest as Project Builder */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">콘테스트 참가 = 프로젝트 생성</h2>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                이 콘테스트는 단순한 공모전이 아닙니다. <strong>참가 신청과 동시에 하나의 프로젝트가 생성되며</strong>, 
                3개의 Quest를 완료하면서 점진적으로 프로젝트를 완성해 나갑니다. 
                완성된 프로젝트는 <strong>콘테스트 종료 후에도 플랫폼에 영구 보관</strong>되어 여러분의 포트폴리오가 됩니다.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Rocket className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">1. 참가 신청</h3>
                  <p className="text-sm text-gray-600">
                    참가 버튼을 누르면 여러분의 콘테스트 프로젝트가 자동으로 생성됩니다
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <GitBranch className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">2. 단계별 완성</h3>
                  <p className="text-sm text-gray-600">
                    Quest 1, 2, 3을 순차적으로 완료하며 같은 프로젝트를 발전시킵니다
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">3. 영구 자산화</h3>
                  <p className="text-sm text-gray-600">
                    완성된 프로젝트는 플랫폼의 영구 자산으로 남아 포트폴리오가 됩니다
                  </p>
                </div>
              </div>
            </Card>

            {/* Contest Description */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">콘테스트 소개</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  AI 로봇 챌린지 2026은 인공지능과 로봇공학의 융합을 통해 미래 기술을 선도할 메이커들을 위한 대회입니다.
                </p>
                <p>
                  참가자들은 라즈베리파이, Arduino, ESP32 등의 플랫폼과 다양한 AI 라이브러리를 활용하여
                  실내 자율주행, 물체 인식, 음성 제 등의 기능을 가진 로봇을 제작합니다.
                </p>
                <p>
                  이 콘테스트의 핵심은 <strong>프로젝트 중심의 학습과 성장</strong>입니다. 
                  3개의 Quest를 통해 기획부터 설계, 프로토타입 제작, 최종 완성까지 전체 개발 프로세스를 경험하며,
                  하나의 완성된 프로젝트를 만들어 갑니다.
                </p>
              </div>
            </Card>

            {/* Requirements */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">참가 조건</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    필수 요구사항
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>로봇공학 또는 프로그래밍 기초 지식</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>라즈베리파이, Arduino 등 개발 보드 보유</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Make 2.0 플랫폼 계정 (프로젝트 생성용)</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                    권장 사항
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Python 또는 C++ 프로그래밍 경험</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>OpenCV, TensorFlow 등 AI 라이브러리 경험</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>3D 프린터 또는 레이저 커터 사용 가능</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">진행 일정</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">참가 청</h3>
                    <p className="text-sm text-gray-600">2026년 3월 1일 ~ 3월 20일</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Quest 1 제출</h3>
                    <p className="text-sm text-gray-600">프로젝트 기획 및 설계 ~ 3월 25일</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Quest 2 제출</h3>
                    <p className="text-sm text-gray-600">프로토타입 제작 ~ 4월 5일</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Quest 3 제출 (최종 마감)</h3>
                    <p className="text-sm text-gray-600">최종 프로젝트 완성 ~ 4월 25일</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">결과 발표</h3>
                    <p className="text-sm text-gray-600">2026년 5월 1일</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Quests Tab - Project Building Stages */}
          <TabsContent value="quests" className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Quest는 프로젝트를 완성하는 단계별 여정입니다
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    각 Quest는 독립된 제출물이 아닌, <strong>하나의 프로젝트를 발전시키는 과정</strong>입니다. 
                    Quest 1에서 시작한 프로젝트가 Quest 2, 3를 거치며 점점 완성되어 갑니다. 
                    모든 Quest를 완료하면 플랫폼에 등록된 완성된 프로젝트 하나가 탄생합니다.
                  </p>
                </div>
              </div>
            </div>

            {quests.map((quest, index) => {
              const status = getQuestStatus(quest, currentDate);
              const daysRemaining = getDaysRemaining(quest.finalDeadline, currentDate);
              const normalDaysRemaining = getDaysRemaining(quest.normalDeadline, currentDate);
              const penaltyPoints = Math.round(quest.points * quest.penaltyRate);
              
              return (
                <Card key={quest.id} className={`overflow-hidden ${
                  quest.completed ? 'border-green-300 bg-green-50' : 
                  status === 'closed' ? 'border-gray-300 opacity-75' : ''
                }`}>
                  <div className={`p-6 ${
                    quest.completed ? 'bg-green-100' : 
                    status === 'closed' ? 'bg-gray-100' :
                    'bg-gray-50'
                  } border-b`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${
                          quest.completed ? 'bg-green-500' : 
                          status === 'closed' ? 'bg-gray-400' :
                          'bg-blue-600'
                        }`}>
                          {quest.completed ? <CheckCircle className="w-8 h-8" /> : 
                           status === 'closed' ? <Ban className="w-8 h-8" /> :
                           index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{quest.title}</h3>
                          <p className="text-gray-600 mb-3">{quest.description}</p>
                          
                          {/* 기간 정보 */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">시작일:</span>
                              <span>{quest.startDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="font-medium">정상 마감:</span>
                              <span>{quest.normalDeadline}</span>
                              {status === 'normal' && normalDaysRemaining >= 0 && (
                                <Badge className="bg-green-100 text-green-700 border-green-300">
                                  {normalDaysRemaining}일 남음
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <AlertTriangle className="w-4 h-4 text-orange-600" />
                              <span className="font-medium">지각 제출 가능:</span>
                              <span>{quest.finalDeadline}까지</span>
                              {status === 'late' && (
                                <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                                  지각 제출 {daysRemaining}일 남음
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="flex flex-col gap-2 items-end">
                          {/* 상태 배지 - 시스템 상태 표시용 (클릭 불가) */}
                          {quest.completed ? (
                            <Badge className="bg-green-600 text-white text-sm px-3 py-1 cursor-default">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              완료
                            </Badge>
                          ) : status === 'not-started' ? (
                            <Badge className="bg-gray-400 text-white text-sm px-3 py-1 cursor-default">
                              <Timer className="w-3 h-3 mr-1" />
                              시작 전
                            </Badge>
                          ) : status === 'normal' ? (
                            <Badge className="bg-blue-600 text-white text-sm px-3 py-1 cursor-default">
                              <Clock className="w-3 h-3 mr-1" />
                              정상 제출 가능
                            </Badge>
                          ) : status === 'late' ? (
                            <Badge className="bg-orange-600 text-white text-sm px-3 py-1 cursor-default">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              지각 제출 가능
                            </Badge>
                          ) : (
                            <Badge className="bg-red-600 text-white text-sm px-3 py-1 cursor-default">
                              <Ban className="w-3 h-3 mr-1" />
                              제출 마감
                            </Badge>
                          )}
                          
                          {/* 점수 정보 */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">{quest.points}점</div>
                            {status === 'late' && !quest.completed && (
                              <div className="text-xs text-orange-600 mt-1">
                                지각 시 -{penaltyPoints}점 ({quest.penaltyRate * 100}% 감점)
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 mb-4">제출 요구사항</h4>
                    <ul className="space-y-3 mb-6">
                      {quest.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            quest.completed ? 'text-green-600' : 'text-gray-400'
                          }`} />
                          <span className={quest.completed ? 'text-gray-700' : 'text-gray-600'}>{req}</span>
                        </li>
                      ))}
                    </ul>

                    {/* 지각 제출 경고 */}
                    {status === 'late' && !quest.completed && (
                      <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-bold text-orange-900 mb-1">지각 제출 기간입니다</h5>
                            <p className="text-sm text-orange-700">
                              정상 마감일이 지나 제출 시 <strong>{penaltyPoints}점({quest.penaltyRate * 100}%)</strong>이 감점됩니다. 
                              최종 마감일인 <strong>{quest.finalDeadline}</strong>까지만 제출 가능합니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 제출 마감 안내 */}
                    {status === 'closed' && !quest.completed && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Ban className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-bold text-red-900 mb-1">제출 기간이 종료되었습니다</h5>
                            <p className="text-sm text-red-700">
                              최종 마감일({quest.finalDeadline})이 지나 더 이상 제출할 수 없습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {userParticipating && (
                      <div className="flex items-center gap-3">
                        {quest.completed ? (
                          <Link to={`/project/${projectStatus.projectId}`} className="flex-1">
                            <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                              <Eye className="w-4 h-4 mr-2" />
                              프로젝트에서 확인하기
                            </Button>
                          </Link>
                        ) : status === 'closed' ? (
                          <Button disabled className="w-full bg-gray-300 cursor-not-allowed">
                            <Ban className="w-4 h-4 mr-2" />
                            제출 마감
                          </Button>
                        ) : status === 'not-started' ? (
                          <Button disabled className="w-full bg-gray-300 cursor-not-allowed">
                            <Timer className="w-4 h-4 mr-2" />
                            아직 시작 전입니다
                          </Button>
                        ) : status === 'late' ? (
                          <Link to={`/project/${projectStatus.projectId}/quest/${quest.id}`} className="flex-1">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              지각 제출하기 ({quest.penaltyRate * 100}% 감점)
                            </Button>
                          </Link>
                        ) : (index === 0 || quests[index - 1].completed) ? (
                          <Link to={`/project/${projectStatus.projectId}/quest/${quest.id}`} className="flex-1">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              <Upload className="w-4 h-4 mr-2" />
                              제출하기
                            </Button>
                          </Link>
                        ) : (
                          <Button disabled className="w-full bg-gray-300 cursor-not-allowed">
                            이전 Quest를 먼저 완료하세요
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}

            {userParticipating && projectStatus.status === 'completed' && (
              <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    🎉 프로젝트 완성을 축하합니다!
                  </h3>
                  <p className="text-gray-700 mb-6">
                    모든 Quest를 완료하여 콘테스트 프로젝트가 완성되었습니다. 
                    이제 이 프로젝트는 플랫폼의 영구 자산으로 등록되어 다른 메이커들에게 공유됩니다.
                  </p>
                  <Link to={`/project/${projectStatus.projectId}`}>
                    <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                      <Sparkles className="w-5 h-5 mr-2" />
                      완성된 프로젝트 보기
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Link key={i} to={`/project/${i}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative aspect-video bg-gray-200">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/photo-${1580000000000 + i * 1000000}?w=600&h=400&fit=crop`}
                        alt={`프로젝트 ${i}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-purple-600 text-white">
                          <Trophy className="w-3 h-3 mr-1" />
                          콘테스트
                        </Badge>
                        <Badge className="bg-green-600 text-white">
                          완성
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        AI 음성인식 자율주행 로봇 {i}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            김
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">김메이커</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {120 + i * 10}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {1500 + i * 100}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Prizes Tab */}
          <TabsContent value="prizes">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">시상 내역</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300">
                  <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">대상 (1팀)</h3>
                    <p className="text-gray-600">₩15,000,000 + 후원사 특별상</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">최우수상 (2팀)</h3>
                    <p className="text-gray-600">₩8,000,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">우수상 (3팀)</h3>
                    <p className="text-gray-600">₩4,000,000</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    Quest와 프로젝트는 어떤 관계인가요?
                  </h3>
                  <p className="text-gray-700 pl-7">
                    참가 신청 시 하나의 프로젝트가 생성됩니다. Quest 1, 2, 3은 이 프로젝트를 완성하는 단계별 과정이며,
                    각 Quest 제출은 동일한 프로젝트에 누적 기록됩니다. 최종적으로 하나의 성된 프로젝트가 만들어집니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    Quest 제출 기간은 어떻게 구성되나요?
                  </h3>
                  <div className="text-gray-700 pl-7 space-y-2">
                    <p>각 Quest는 3단계 제출 기간을 가집니다:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>정상 제출 기간:</strong> 시작일 ~ 정상 마감일. 이 기간 안에 제출하면 정상 점수를 받습니다.</li>
                      <li><strong>지각 제출 기간:</strong> 정상 마감일 ~ 최종 제출 종료일. 제출은 가능하지만 감점이 적용됩니다 (Quest별로 15~30% 감점).</li>
                      <li><strong>제출 종료:</strong> 최종 제출 종료일 이후에는 제출 자체가 불가능합니다.</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    콘테스트가 끝나면 프로젝트는 어떻게 되나요?
                  </h3>
                  <p className="text-gray-700 pl-7">
                    완성된 프로젝트는 콘테스트 종료 후에도 플랫폼에 영구히 보관됩니다. 
                    프로젝트 리스트에서 계속 공개되며, 여러분의 포트폴리오로 활용할 수 있습니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    모든 Quest를 완료해야 하나요?
                  </h3>
                  <p className="text-gray-700 pl-7">
                    최종 심사 대상이 되려면 Quest 1, 2, 3를 모두 완료하여 프로젝트�� 완성해야 합니다.
                    부분 완성된 프로젝트는 심사 대상에서 제외됩니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    팀으로 참가할 수 있나요?
                  </h3>
                  <p className="text-gray-700 pl-7">
                    네, 1~4인 팀으로 참가 가능합니다. 팀 대표가 프로젝트를 생성하고 팀원을 초대할 수 있습니다.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}