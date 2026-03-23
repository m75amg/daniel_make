import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { 
  ChevronRight, MessageSquare, Rocket, Users, FileText, 
  Bell, Plus, Sparkles, Zap, HelpCircle, AlertCircle, UserPlus
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CommunityActivityCard, type CommunityActivity } from '../components/CommunityActivityCard';
import { AskQuestionDialog } from '../components/AskQuestionDialog';
import { ShareProgressDialog } from '../components/ShareProgressDialog';
import { FindTeammateDialog } from '../components/FindTeammateDialog';
import { ShareResourceDialog } from '../components/ShareResourceDialog';

export function CommunityPage() {
  const navigate = useNavigate();
  const [isAskQuestionOpen, setIsAskQuestionOpen] = useState(false);
  const [isShareProgressOpen, setIsShareProgressOpen] = useState(false);
  const [isFindTeammateOpen, setIsFindTeammateOpen] = useState(false);
  const [isShareResourceOpen, setIsShareResourceOpen] = useState(false);

  // Mock data - transformed to CommunityActivity type
  const recentQuestions: CommunityActivity[] = [
    {
      id: '1',
      type: 'question',
      title: 'ESP32에서 MQTT 연결이 계속 끊기는데 해결 방법 있나요?',
      content: 'WiFi는 안정적으로 연결되는데 MQTT 브로커 연결이 5-10분마다 끊어집니다. Keep-alive 설정도 해봤는데 여전히 문제가 발생합니다.',
      author: {
        name: '김메이커',
        initial: '김',
      },
      project: {
        id: '1',
        name: 'IoT 스마트 화분 시스템',
      },
      questNumber: 2,
      status: 'solved',
      tags: ['ESP32', 'MQTT', 'IoT'],
      answers: 8,
      views: 145,
      likes: 23,
      createdAt: '15분 전',
    },
    {
      id: '2',
      type: 'question',
      title: 'OpenCV로 객체 추적 시 fps가 너무 낮아요',
      content: 'Python에서 OpenCV를 사용하는데 실시간 처리 속도가 너무 느립니다. 최적화 방법이 있을까요?',
      author: {
        name: '이개발',
        initial: '이',
      },
      project: {
        id: '2',
        name: 'AI 음성인식 자율주행 로봇',
      },
      questNumber: 2,
      status: 'open',
      tags: ['OpenCV', 'Python', '최적화'],
      answers: 3,
      views: 28,
      createdAt: '1시간 전',
    },
    {
      id: '3',
      type: 'question',
      title: 'TensorFlow Lite 모델을 라즈베리파이에 배포하는 방법',
      content: '학습한 모델을 TFLite로 변환했는데 라즈베리파이에서 실행하는 방법을 모르겠습니다.',
      author: {
        name: '박엔지니어',
        initial: '박',
      },
      project: {
        id: '3',
        name: '얼굴 인식 출입 시스템',
      },
      contest: {
        id: '1',
        name: 'AI 로봇 챌린지 2026',
      },
      questNumber: 3,
      status: 'solved',
      tags: ['TensorFlow', '라즈베리파이', 'AI'],
      answers: 12,
      views: 156,
      likes: 34,
      createdAt: '3시간 전',
    },
  ];

  const recentProgress: CommunityActivity[] = [
    {
      id: '4',
      type: 'progress',
      title: 'Quest 2 완료! 음성 인식 모듈 통합 성공 🎉',
      content: '구글 Speech API 연동하고 한국어 인식률을 90%까지 끌어올렸습니다. 마이크 위치 조정이 핵심이었어요...',
      author: {
        name: '최메이커',
        initial: '최',
      },
      project: {
        id: '4',
        name: 'AI 스마트 미러',
      },
      questNumber: 2,
      questTotal: 3,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMG1pcnJvciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMjI5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 34,
      comments: 12,
      createdAt: '30분 전',
    },
    {
      id: '5',
      type: 'progress',
      title: '자율주행 알고리즘 1차 테스트 결과 공유',
      content: 'SLAM 알고리즘 적용 후 실내 지도 생성에 성공했습니다. 장애물 회피 성공률 85%...',
      author: {
        name: '정개발',
        initial: '정',
      },
      project: {
        id: '5',
        name: '실내 배달 로봇',
      },
      contest: {
        id: '2',
        name: '스마트 로봇 콘테스트',
      },
      questNumber: 2,
      questTotal: 3,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzMzMTgwODI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 28,
      comments: 8,
      createdAt: '2시간 전',
    },
    {
      id: '6',
      type: 'progress',
      title: '3D 프린팅 케이스 제작 과정과 실패담',
      content: '5번의 실패 끝에 완벽한 케이스를 만들었습니다. 서포트 구조가 관건이었어요...',
      author: {
        name: '강메이커',
        initial: '강',
      },
      project: {
        id: '6',
        name: '웨어러블 헬스케어 디바이스',
      },
      questNumber: 1,
      questTotal: 3,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50aW5nfGVufDF8fHx8MTczMzE4MDg0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 45,
      comments: 15,
      createdAt: '5시간 전',
    },
  ];

  const recentTeamFinding: CommunityActivity[] = [
    {
      id: '7',
      type: 'teammate',
      title: '드론 자율비행 프로젝트 - 하드웨어 엔지니어 구합니다',
      content: '농업용 드론 프로젝트를 진행 중입니다. 비행 제어 시스템 설계 경험이 있으신 분을 찾습니다.',
      author: {
        name: '임메이커',
        initial: '임',
      },
      project: {
        id: '7',
        name: 'AI 기반 농업용 드론',
      },
      skills: ['하드웨어', '회로 설계', '드론'],
      deadline: 'D-15',
      status: 'recruiting',
      applicants: 3,
      createdAt: '1시간 전',
    },
    {
      id: '8',
      type: 'teammate',
      title: 'IoT 프로젝트 함께할 백엔드 개발자 찾아요',
      content: '스마트 홈 시스템의 서버 개발을 함께할 분을 찾습니다. MQTT와 실시간 데이터 처리 경험 우대합니다.',
      author: {
        name: '한개발',
        initial: '한',
      },
      project: {
        id: '8',
        name: '스마트 홈 자동화 시스템',
      },
      contest: {
        id: '1',
        name: 'IoT 혁신 챌린지 2026',
      },
      skills: ['Node.js', 'MQTT', 'AWS'],
      deadline: 'D-7',
      status: 'recruiting',
      applicants: 5,
      createdAt: '4시간 전',
    },
    {
      id: '9',
      type: 'teammate',
      title: '3D 모델링 도와주실 분 찾습니다 (단기)',
      content: '로봇 팔의 구조 설계를 위한 3D 모델링이 필요합니다. Fusion360 사용 가능하신 분 환영합니다.',
      author: {
        name: '윤메이커',
        initial: '윤',
      },
      project: {
        id: '9',
        name: '로봇 팔 제어 시스템',
      },
      skills: ['Fusion360', 'SolidWorks', '3D 모델링'],
      deadline: 'D-3',
      status: 'recruiting',
      applicants: 2,
      createdAt: '1일 전',
    },
  ];

  const recentResources: CommunityActivity[] = [
    {
      id: '10',
      type: 'resource',
      title: 'ESP32 + 센서 연동 회로도 템플릿 (Fritzing)',
      content: '자주 사용하는 센서들의 연결 회로도를 Fritzing 파일로 정리했습니다.',
      author: {
        name: '조메이커',
        initial: '조',
      },
      project: {
        id: '10',
        name: 'IoT 환경 모니터링',
      },
      resourceType: '회로도',
      resourceFormat: 'Fritzing',
      status: 'active',
      downloads: 234,
      likes: 89,
      createdAt: '2시간 전',
    },
    {
      id: '11',
      type: 'resource',
      title: 'Quest 제출용 프로젝트 문서 템플릿 (Notion)',
      content: 'Quest 제출 시 필요한 항목들을 정리한 Notion 템플릿입니다. 복사해서 바로 사용하세요.',
      author: {
        name: '신개발',
        initial: '신',
      },
      resourceType: '템플릿',
      resourceFormat: 'Notion',
      status: 'active',
      downloads: 567,
      likes: 156,
      createdAt: '1일 전',
    },
    {
      id: '12',
      type: 'resource',
      title: 'OpenCV 객체 추적 예제 코드 (Python)',
      content: '보안 카메라 프로젝트에서 사용한 객체 추적 알고리즘 코드입니다. 주석과 함께 공유합니다.',
      author: {
        name: '서메이커',
        initial: '서',
      },
      project: {
        id: '11',
        name: '보안 카메라 시스템',
      },
      resourceType: '소스코드',
      resourceFormat: 'GitHub',
      status: 'active',
      downloads: 423,
      likes: 178,
      createdAt: '2일 전',
    },
  ];

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: 'AI 로봇 챌린지 2026 Quest 1 마감일 연장 안내',
      category: '공지',
      isImportant: true,
      time: '1일 전',
    },
    {
      id: 2,
      title: 'Quest 제출 시 자주 하는 실수 TOP 5',
      category: 'FAQ',
      isImportant: false,
      time: '3일 전',
    },
  ];

  const handleActivityClick = (activityId: string) => {
    navigate(`/community/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">커뮤니티</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-medium text-blue-100">실시간 활동 허브</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              메이커들이 함께 만드는 커뮤니티
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              프로젝트를 진행하며 질문하고, 경험을 공유하고, 함께 협업하세요
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsAskQuestionOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                질문하기
              </button>
              <button
                onClick={() => setIsShareProgressOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 text-white rounded-lg font-semibold border border-white/60 hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <Rocket className="w-4 h-4" />
                진행 공유하기
              </button>
              <button
                onClick={() => setIsFindTeammateOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 text-white rounded-lg font-semibold border border-white/60 hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <UserPlus className="w-4 h-4" />
                팀원 모집
              </button>
              <button
                onClick={() => setIsShareResourceOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 text-white rounded-lg font-semibold border border-white/60 hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <FileText className="w-4 h-4" />
                자료 공유
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">324</div>
              <div className="text-sm text-gray-600 mt-1">오늘의 질문</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600 mt-1">진행 공유</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">89</div>
              <div className="text-sm text-gray-600 mt-1">팀원 모집</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">567</div>
              <div className="text-sm text-gray-600 mt-1">공유 자료</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Area - 2 columns */}
          <div className="lg:col-span-2 space-y-12">
            {/* 1. Recent Questions */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">최근 질문</h2>
                    <p className="text-sm text-gray-600">프로젝트 진행 중 생긴 질문들</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsAskQuestionOpen(true)}>
                  질문 전체 보기
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {recentQuestions.map((question) => (
                  <CommunityActivityCard
                    key={question.id}
                    activity={question}
                    onClick={() => handleActivityClick(question.id)}
                  />
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsAskQuestionOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  내 질문 올리기
                </Button>
              </div>
            </section>

            {/* 2. Recent Progress Sharing */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">최근 진행 공유</h2>
                    <p className="text-sm text-gray-600">제작 과정과 노하우 공유</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsShareProgressOpen(true)}>
                  공유 전체 보기
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {recentProgress.map((progress) => (
                  <CommunityActivityCard
                    key={progress.id}
                    activity={progress}
                    onClick={() => handleActivityClick(progress.id)}
                  />
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsShareProgressOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  내 진행 상황 공유하기
                </Button>
              </div>
            </section>

            {/* 3. Team Finding */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">최근 팀원 찾기</h2>
                    <p className="text-sm text-gray-600">프로젝트 협업 요청</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsFindTeammateOpen(true)}>
                  팀원찾기 전체 보기
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {recentTeamFinding.map((team) => (
                  <CommunityActivityCard
                    key={team.id}
                    activity={team}
                    onClick={() => handleActivityClick(team.id)}
                  />
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsFindTeammateOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  팀원 모집하기
                </Button>
              </div>
            </section>

            {/* 4. Resource Sharing */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">최근 자료 공유</h2>
                    <p className="text-sm text-gray-600">코드, 회로도, 템플릿 등</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  전체 보기
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-3">
                {recentResources.map((resource) => (
                  <CommunityActivityCard
                    key={resource.id}
                    activity={resource}
                    onClick={() => handleActivityClick(resource.id)}
                  />
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsShareResourceOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  자료 공유하기
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Actions */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  빠른 액션
                </h3>
                <div className="space-y-2">
                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" onClick={() => setIsAskQuestionOpen(true)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    질문 올리기
                  </Button>
                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" onClick={() => setIsShareProgressOpen(true)}>
                    <Rocket className="w-4 h-4 mr-2" />
                    진행 상황 공유
                  </Button>
                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" onClick={() => setIsFindTeammateOpen(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    팀원 모집
                  </Button>
                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" onClick={() => setIsShareResourceOpen(true)}>
                    <FileText className="w-4 h-4 mr-2" />
                    자료 업로드
                  </Button>
                </div>
              </Card>

              {/* Announcements & FAQ */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gray-700" />
                  공지 / FAQ
                </h3>
                <div className="space-y-3">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start gap-2 mb-1">
                        {announcement.isImportant && (
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {announcement.category}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
                        {announcement.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{announcement.time}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  전체 공지 보기
                </Button>
              </Card>

              {/* Popular Tags */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">인기 태그</h3>
                <div className="flex flex-wrap gap-2">
                  {['라즈베리파이', 'Arduino', 'AI', 'OpenCV', 'ESP32', 'IoT', '3D프린팅', 'ROS', 'Python', 'TensorFlow'].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AskQuestionDialog
        isOpen={isAskQuestionOpen}
        onClose={() => setIsAskQuestionOpen(false)}
      />
      <ShareProgressDialog
        isOpen={isShareProgressOpen}
        onClose={() => setIsShareProgressOpen(false)}
      />
      <FindTeammateDialog
        isOpen={isFindTeammateOpen}
        onClose={() => setIsFindTeammateOpen(false)}
      />
      <ShareResourceDialog
        isOpen={isShareResourceOpen}
        onClose={() => setIsShareResourceOpen(false)}
      />
    </div>
  );
}