import { Link, useNavigate } from 'react-router';
import {
  Plus, Heart, Eye, MessageCircle, Trophy, Settings,
  Bell, CheckCircle, Rocket, FileText, Users,
  Target, HelpCircle, UserPlus, FolderOpen,
  MessageSquare, Share2, Zap, ChevronRight,
  Clock, XCircle, Handshake, Bookmark,
  UserCheck, Rss, BookOpen, Award, ExternalLink,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ProjectCreationModal } from '../components/ProjectCreationModal';
import { ProfileEditDrawer } from '../components/ProfileEditDrawer';
import { AskQuestionDialog } from '../components/AskQuestionDialog';
import { ShareProgressDialog } from '../components/ShareProgressDialog';
import { FindTeammateDialog } from '../components/FindTeammateDialog';
import { ShareResourceDialog } from '../components/ShareResourceDialog';
import { ApplicantManagementDrawer } from '../components/ApplicantManagementDrawer';
import { useTeammate } from '../context/TeammateContext';
import { useActivity } from '../context/ActivityContext';
import { useFollow } from '../context/FollowContext';
import { SummaryCard } from '../components/SummaryCard';
import { ActivityHistoryCard } from '../components/ActivityHistoryCard';
import { useState, useRef } from 'react';

type ProjectTab = 'all' | 'inprogress' | 'completed' | 'personal' | 'contest';
type CommunityTab = 'all' | 'question' | 'progress' | 'teammate' | 'resource' | 'applied';
type ActivityHistoryTab = 'liked' | 'saved';

export function MyMakePage() {
  const navigate = useNavigate();
  const { notifications, unreadCount, markNotificationRead, markAllRead, posts, myApplications, myAppUnreadCount, markMyAppRead, markAllMyAppsRead } = useTeammate();
  const { likedItems, savedItems, toggleLike, toggleSave, isLiked, isSaved, likeCount, saveCount } = useActivity();
  const { followedMakers, unfollowMaker, followCount, totalNewUpdates, markUpdatesRead, markAllUpdatesRead } = useFollow();
  const [activityHistoryTab, setActivityHistoryTab] = useState<ActivityHistoryTab>('liked');
  const [selectedProjectTab, setSelectedProjectTab] = useState<ProjectTab>('all');
  const [selectedCommunityTab, setSelectedCommunityTab] = useState<CommunityTab>('all');
  const [isProjectCreationModalOpen, setIsProjectCreationModalOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [highlightQuest, setHighlightQuest] = useState(false);
  const [highlightNotifications, setHighlightNotifications] = useState(false);
  const [highlightTeammate, setHighlightTeammate] = useState(false);

  // 커뮤니티 다이얼로그 상태
  const [isAskQuestionOpen, setIsAskQuestionOpen] = useState(false);
  const [isShareProgressOpen, setIsShareProgressOpen] = useState(false);
  const [isFindTeammateOpen, setIsFindTeammateOpen] = useState(false);
  const [isShareResourceOpen, setIsShareResourceOpen] = useState(false);

  // 지원자 관리 드로어 상태
  const [applicantDrawer, setApplicantDrawer] = useState<{
    open: boolean;
    postId: string;
    postTitle: string;
  }>({ open: false, postId: '', postTitle: '' });

  // ── 새 반응 (커뮤니티 답변/댓글) 상태 ─────────────────────────
  const [newReactions, setNewReactions] = useState([
    {
      id: 'react-1',
      type: 'answer' as const,
      message: '내 질문에 새 답변이 달렸습니다',
      activityTitle: 'ESP32에서 MQTT 연결이 계속 끊기는데...',
      projectName: 'IoT 스마트 화분 시스템',
      questNumber: 2,
      author: '박엔지니어',
      time: '10분 전',
      isUnread: true,
      activityId: '1',
    },
    {
      id: 'react-2',
      type: 'comment' as const,
      message: '내 진행공유에 새 댓글이 달렸습니다',
      activityTitle: 'Quest 2 완료! 음성 인식 모듈 통합 성공',
      projectName: 'AI 스마트 미러',
      questNumber: 2,
      author: '이메이커',
      time: '1시간 전',
      isUnread: true,
      activityId: '4',
    },
  ]);

  const markReactionRead = (id: string) => {
    setNewReactions(prev => prev.map(r => r.id === id ? { ...r, isUnread: false } : r));
  };

  const markAllReactionsRead = () => {
    setNewReactions(prev => prev.map(r => ({ ...r, isUnread: false })));
  };

  const unreadReactions = newReactions.filter(r => r.isUnread);
  const unreadMyApps = myApplications.filter(a => !a.isStatusRead);

  // 섹션 ref
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const communitySectionRef = useRef<HTMLDivElement>(null);
  const notificationSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const triggerHighlight = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    duration = 2000
  ) => {
    setter(true);
    setTimeout(() => setter(false), duration);
  };

  // 버튼 클릭 핸들러
  const handleInProgressClick = () => {
    setSelectedProjectTab('inprogress');
    setTimeout(() => scrollToSection(projectSectionRef), 50);
  };

  const handleQuestClick = () => {
    setSelectedProjectTab('inprogress');
    triggerHighlight(setHighlightQuest, 2500);
    setTimeout(() => scrollToSection(projectSectionRef), 50);
  };

  const handleNewAnswerClick = () => {
    triggerHighlight(setHighlightNotifications, 2500);
    setTimeout(() => scrollToSection(notificationSectionRef), 50);
  };

  const handleApplicantClick = () => {
    setSelectedCommunityTab('teammate');
    triggerHighlight(setHighlightTeammate, 2500);
    setTimeout(() => scrollToSection(communitySectionRef), 50);
  };

  const handleOpenApplicantDrawer = (postId: string, postTitle: string) => {
    const relatedNotifs = notifications.filter(n => n.postId === postId && !n.isRead);
    relatedNotifs.forEach(n => markNotificationRead(n.id));
    setApplicantDrawer({ open: true, postId, postTitle });
  };

  // 내 프로젝트 Mock Data
  const myProjects = [
    {
      id: 1,
      title: 'AI 음성인식 자율주행 로봇',
      type: 'contest' as const,
      status: 'completed' as const,
      contestName: 'AI 로봇 챌린지 2026',
      contestId: 'ai-robot-2026',
      questProgress: 3,
      totalQuests: 3,
      likes: 567,
      views: 8930,
      comments: 142,
      lastModified: '2일 전',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    },
    {
      id: 2,
      title: '오픈소스 자율주행 로봇',
      type: 'contest' as const,
      status: 'inprogress' as const,
      contestName: 'AI 로봇 챌린지 2026',
      contestId: 'ai-robot-2026',
      questProgress: 2,
      totalQuests: 3,
      nextQuestNumber: 3,
      likes: 432,
      views: 5420,
      comments: 89,
      lastModified: '5시간 전',
      image: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzIyODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'ESP32 기반 스마트 화분',
      type: 'personal' as const,
      status: 'completed' as const,
      questProgress: 3,
      totalQuests: 3,
      likes: 289,
      views: 3210,
      comments: 54,
      lastModified: '1주 전',
      image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBJb1QlMjBkZXZpY2V8ZW58MXx8fHwxNzczMjI4NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      title: '3D 프린터 자동 레벨링 시스템',
      type: 'personal' as const,
      status: 'inprogress' as const,
      questProgress: 1,
      totalQuests: 3,
      nextQuestNumber: 2,
      likes: 267,
      views: 2890,
      comments: 41,
      lastModified: '3일 전',
      image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzEzMDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // 내 커뮤니티 활동 Mock Data
  const myCommunityActivities = [
    {
      id: '1',
      type: 'question' as const,
      title: 'ESP32에서 MQTT 연결이 계속 끊기는데 해결 방법 있나요?',
      projectName: 'IoT 스마트 화분 시스템',
      projectId: '1',
      questNumber: 2,
      status: 'open' as const,
      answers: 8,
      views: 145,
      likes: 23,
      lastActivity: '2시간 전',
      hasNewReplies: true,
      newRepliesCount: 2,
    },
    {
      id: '4',
      type: 'progress' as const,
      title: 'Quest 2 완료! 음성 인식 모듈 통합 성공 🎉',
      projectName: 'AI 음성인식 스마트 미러',
      projectId: '5',
      questNumber: 2,
      status: 'completed' as const,
      likes: 56,
      comments: 18,
      lastActivity: '5시간 전',
      hasNewReplies: true,
      newRepliesCount: 3,
    },
    {
      id: '7',
      type: 'teammate' as const,
      title: '드론 자율비행 프로젝트 - 하드웨어 엔지니어 구합니다',
      projectName: 'AI 기반 농업용 드론',
      projectId: '2',
      questNumber: 2,
      status: 'recruiting' as const,
      deadline: 'D-15',
      applicants: 5,
      lastActivity: '1일 전',
      hasNewReplies: true,
      newRepliesCount: 2,
    },
    {
      id: '10',
      type: 'resource' as const,
      title: 'ESP32 개발 완벽 가이드 - 공식 문서부터 실전 예제까지',
      projectName: 'IoT 스마트 화분 시스템',
      projectId: '1',
      questNumber: 2,
      status: 'recommended' as const,
      likes: 89,
      comments: 24,
      lastActivity: '3일 전',
      hasNewReplies: false,
    },
  ];

  // 새 반응 Mock Data
  const newNotifications = [
    {
      id: '1',
      type: 'answer' as const,
      message: '내 질문에 새 답변이 달렸습니다',
      activityTitle: 'ESP32에서 MQTT 연결이 계속 끊기는데...',
      projectName: 'IoT 스마트 화 시스템',
      questNumber: 2,
      author: '박엔지니어',
      time: '10분 전',
      isUnread: true,
      activityId: '1',
    },
    {
      id: '2',
      type: 'comment' as const,
      message: '내 진행공유에 새 댓글이 달렸습니다',
      activityTitle: 'Quest 2 완료! 음성 인식 모듈 통합 성공',
      projectName: 'AI 스마트 미러',
      questNumber: 2,
      author: '이메이커',
      time: '1시간 전',
      isUnread: true,
      activityId: '4',
    },
    {
      id: '3',
      type: 'applicant' as const,
      message: '내 팀원찾기 글에 참여 요청이 등록되었습니다',
      activityTitle: '드론 자율비행 프로젝트 - 하드웨어 엔지니어...',
      projectName: 'AI 기반 농업용 드론',
      questNumber: 2,
      author: '김엔지니어',
      time: '3시간 전',
      isUnread: true,
      activityId: '7',
    },
  ];

  const getProjectTypeConfig = (type: string) => {
    switch (type) {
      case 'contest':
        return { label: '콘테스트', bgColor: 'bg-purple-100', textColor: 'text-purple-700' };
      case 'personal':
        return { label: '개인 프로젝트', bgColor: 'bg-blue-100', textColor: 'text-blue-700' };
      default:
        return { label: '프로젝트', bgColor: 'bg-gray-100', textColor: 'text-gray-700' };
    }
  };

  const getProjectStatusConfig = (status: string, questProgress?: number, totalQuests?: number) => {
    switch (status) {
      case 'draft':
        return { label: '초안', bgColor: 'bg-gray-100', textColor: 'text-gray-700' };
      case 'inprogress':
        if (questProgress && totalQuests) {
          return { label: `Quest ${questProgress}/${totalQuests}`, bgColor: 'bg-orange-100', textColor: 'text-orange-700' };
        }
        return { label: '진행중', bgColor: 'bg-orange-100', textColor: 'text-orange-700' };
      case 'completed':
        return { label: '완료', bgColor: 'bg-green-100', textColor: 'text-green-700' };
      default:
        return { label: '상태 없음', bgColor: 'bg-gray-100', textColor: 'text-gray-700' };
    }
  };

  const getCommunityTypeConfig = (type: string) => {
    switch (type) {
      case 'question':
        return { label: '질문', icon: HelpCircle, bgColor: 'bg-blue-100', textColor: 'text-blue-700' };
      case 'progress':
        return { label: '진행공유', icon: Rocket, bgColor: 'bg-purple-100', textColor: 'text-purple-700' };
      case 'teammate':
        return { label: '팀원찾기', icon: UserPlus, bgColor: 'bg-green-100', textColor: 'text-green-700' };
      case 'resource':
        return { label: '자료공유', icon: FolderOpen, bgColor: 'bg-orange-100', textColor: 'text-orange-700' };
      default:
        return { label: '동', icon: Bell, bgColor: 'bg-gray-100', textColor: 'text-gray-700' };
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'answer':
        return { icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'comment':
        return { icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-100' };
      case 'applicant':
        return { icon: UserPlus, color: 'text-green-600', bg: 'bg-green-100' };
      case 'like':
        return { icon: Heart, color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { icon: Bell, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const filteredProjects = selectedProjectTab === 'all'
    ? myProjects
    : myProjects.filter(project => {
        if (selectedProjectTab === 'inprogress') return project.status === 'inprogress' || project.status === 'draft';
        if (selectedProjectTab === 'completed') return project.status === 'completed';
        if (selectedProjectTab === 'personal') return project.type === 'personal';
        if (selectedProjectTab === 'contest') return project.type === 'contest';
        return true;
      });

  const filteredActivities = selectedCommunityTab === 'all'
    ? myCommunityActivities
    : myCommunityActivities.filter(activity => activity.type === selectedCommunityTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-2xl">
                <AvatarFallback className="text-3xl bg-white text-blue-600 font-bold">
                  김
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-bold mb-2">김메이커</h1>
                <p className="text-xl text-blue-100 mb-3">
                  로봇공학과 AI를 좋아하는 메이커입니다
                </p>
                <div className="flex items-center gap-6 text-sm flex-wrap">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    프로젝트 12개
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    팔로워 1,234명
                  </span>
                  {/* 팔로잉 수 — FollowContext에서 실시간 반영 */}
                  <button
                    onClick={() => {
                      const el = document.getElementById('following-section');
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                  >
                    <UserCheck className="w-4 h-4" />
                    팔로잉 {followCount}명
                    {totalNewUpdates > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold rounded-full bg-red-500 text-white animate-pulse">
                        {totalNewUpdates}
                      </span>
                    )}
                  </button>
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    총 좋아요 5,678
                  </span>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={() => setIsProfileEditOpen(true)}>
              <Settings className="w-5 h-5 mr-2" />
              프로필 편집
            </Button>
          </div>
        </div>
      </section>

      {/* Summary Cards - 클릭 가능 */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* 1. 진행 중 프로젝트 */}
            <SummaryCard
              icon={Rocket}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              hoverBorder="hover:border-blue-300"
              hoverIconBg="group-hover:bg-blue-100"
              hoverChevron="group-hover:text-blue-400"
              count={myProjects.filter(p => p.status === 'inprogress' || p.status === 'draft').length}
              label="진행 중 프로젝트"
              subLeft={(() => {
                const next = myProjects.find(p => (p.status === 'inprogress' || p.status === 'draft') && p.nextQuestNumber);
                return next
                  ? <><span className="text-blue-600 font-medium">Quest {next.nextQuestNumber}</span> 이어하기 대기중</>
                  : <span className="text-gray-400">모든 Quest 완료</span>;
              })()}
              onClick={handleInProgressClick}
            />

            {/* 2. 미완료 Quest */}
            <SummaryCard
              icon={Target}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              hoverBorder="hover:border-purple-300"
              hoverIconBg="group-hover:bg-purple-100"
              hoverChevron="group-hover:text-purple-400"
              count={myProjects.filter(p => p.status !== 'completed' && p.nextQuestNumber).reduce((acc, p) => acc + ((p.totalQuests ?? 0) - (p.questProgress ?? 0)), 0)}
              label="미완료 Quest"
              subLeft={(() => {
                const next = myProjects.find(p => (p.status === 'inprogress' || p.status === 'draft') && p.nextQuestNumber);
                return next
                  ? <><span className="text-purple-600 font-medium">{next.title.slice(0, 8)}…</span><span className="text-gray-400"> Quest {next.nextQuestNumber} 대기</span></>
                  : <span className="text-gray-400">미완료 Quest 없음</span>;
              })()}
              onClick={handleQuestClick}
            />

            {/* 3. 새 답변 */}
            <SummaryCard
              icon={MessageCircle}
              iconBg="bg-green-50"
              iconColor="text-green-600"
              hoverBorder="hover:border-green-300"
              hoverIconBg="group-hover:bg-green-100"
              hoverChevron="group-hover:text-green-400"
              count={8}
              label="새 답변"
              badge={2}
              subLeft={<><span className="text-green-600 font-medium">박엔지니어</span><span className="text-gray-400"> 등 2명이 답변함</span></>}
              onClick={handleNewAnswerClick}
            />

            {/* 4. 새 참여 요청 */}
            <SummaryCard
              icon={UserPlus}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
              hoverBorder="hover:border-orange-300"
              hoverIconBg="group-hover:bg-orange-100"
              hoverChevron="group-hover:text-orange-400"
              count={unreadCount + myAppUnreadCount || 5}
              label="새 참여 요청"
              badge={unreadCount + myAppUnreadCount || 5}
              subLeft={notifications[0]
                ? <><span className="text-orange-500 font-medium">{notifications[0].applicantName}</span><span className="text-gray-400">님 외 {Math.max(unreadCount - 1, 0)}명 검토 필요</span></>
                : <><span className="text-orange-500 font-medium">김엔지니어</span><span className="text-gray-400">님 외 4명 검토 필요</span></>
              }
              onClick={handleApplicantClick}
            />

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - 내 프로젝트 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 내 프로젝트 섹션 */}
            <div ref={projectSectionRef}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">내 프로젝트</h2>
                  <p className="text-sm text-gray-600 mt-1">프로젝트 중심으로 활동을 관리하세요</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsProjectCreationModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  새 프로젝트
                </Button>
              </div>

              {/* 프로젝트 탭 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { value: 'all', label: '전체', count: myProjects.length },
                    { value: 'inprogress', label: '진행중', count: myProjects.filter(p => p.status === 'inprogress' || p.status === 'draft').length },
                    { value: 'completed', label: '완료', count: myProjects.filter(p => p.status === 'completed').length },
                    { value: 'personal', label: '개인 프로젝트', count: myProjects.filter(p => p.type === 'personal').length },
                    { value: 'contest', label: '콘테스트', count: myProjects.filter(p => p.type === 'contest').length },
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setSelectedProjectTab(tab.value as ProjectTab)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedProjectTab === tab.value
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {tab.label} <span className="ml-1 opacity-70">({tab.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 프로젝트 카드 그리드 */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => {
                  const typeConfig = getProjectTypeConfig(project.type);
                  const statusConfig = getProjectStatusConfig(project.status, project.questProgress, project.totalQuests);

                  return (
                    <Card key={project.id} className="group overflow-hidden border-gray-200 bg-white hover:shadow-xl transition-all duration-300">
                      <div className="relative aspect-video overflow-hidden">
                        <Link to={`/project/${project.id}`}>
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </Link>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                          <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0`}>
                            {project.type === 'contest' && <Trophy className="w-3 h-3 mr-1" />}
                            {typeConfig.label}
                          </Badge>
                          <Badge className={`${statusConfig.bgColor} ${statusConfig.textColor} border-0`}>
                            {project.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <Link to={`/project/${project.id}`}>
                          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                        </Link>

                        {project.contestName && (
                          <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border border-purple-100">
                            <Trophy className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <Link
                              to={`/contest/${project.contestId}`}
                              className="text-sm font-semibold text-purple-600 hover:underline truncate"
                            >
                              {project.contestName}
                            </Link>
                          </div>
                        )}

                        {project.questProgress === project.totalQuests && project.status === 'completed' && (
                          <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-xs font-semibold text-gray-900">
                              모든 Quest 완료! 플랫폼에 공개됨
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {project.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {project.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {project.comments}
                          </span>
                          <span className="text-xs text-gray-500">{project.lastModified}</span>
                        </div>

                        <div className="pt-3 border-t border-gray-100 space-y-2">
                          {project.status !== 'completed' && project.nextQuestNumber && (
                            <Link to={`/project/${project.id}/quest/${project.nextQuestNumber}`} className="block">
                              <Button className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 ${
                                highlightQuest ? 'ring-4 ring-yellow-400 ring-offset-2 scale-105 shadow-xl shadow-purple-300' : ''
                              }`}>
                                <Rocket className="w-4 h-4 mr-2" />
                                Quest {project.nextQuestNumber} 이어하기
                                {highlightQuest && <span className="ml-2 animate-bounce">👆</span>}
                              </Button>
                            </Link>
                          )}

                          {project.status === 'completed' && (
                            <Link to={`/project/${project.id}`} className="block">
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                <Eye className="w-4 h-4 mr-2" />
                                프로젝트 보기
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* 내 커뮤니티 활동 섹션 */}
            <div className="pt-8 border-t border-gray-200" ref={communitySectionRef}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    프로젝트 관련 커뮤니티 활동
                    {highlightTeammate && <span className="animate-bounce text-orange-500 text-xl">👇</span>}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">프로젝트를 진행하며 나눈 대화와 협업</p>
                </div>
              </div>

              {/* 커뮤니티 활동 탭 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { value: 'all', label: '전체', count: myCommunityActivities.length, badge: null },
                    { value: 'question', label: '질문', count: myCommunityActivities.filter(a => a.type === 'question').length, badge: null },
                    { value: 'progress', label: '진행공유', count: myCommunityActivities.filter(a => a.type === 'progress').length, badge: null },
                    { value: 'teammate', label: '팀원찾기', count: myCommunityActivities.filter(a => a.type === 'teammate').length, badge: null },
                    { value: 'resource', label: '자료공유', count: myCommunityActivities.filter(a => a.type === 'resource').length, badge: null },
                    { value: 'applied', label: '팀원 신청', count: myApplications.length, badge: myAppUnreadCount > 0 ? myAppUnreadCount : null },
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setSelectedCommunityTab(tab.value as CommunityTab)}
                      className={`relative px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                        selectedCommunityTab === tab.value
                          ? tab.value === 'applied' ? 'bg-blue-600 text-white shadow-lg' : 'bg-purple-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      } ${
                        highlightTeammate && tab.value === 'teammate'
                          ? 'ring-4 ring-orange-400 ring-offset-2 scale-110'
                          : ''
                      }`}
                    >
                      {tab.label} <span className="ml-1 opacity-70">({tab.count})</span>
                      {tab.badge !== null && (
                        <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 bg-red-500 text-white text-xs rounded-full font-bold">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 팀원 신청 탭 콘텐츠 */}
              {selectedCommunityTab === 'applied' ? (
                <div className="space-y-3">
                  {myApplications.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                      <Handshake className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">아직 신청한 팀원 모집이 없습니다</p>
                      <Link to="/community" className="text-xs text-blue-600 hover:underline mt-1 block">
                        커뮤니티에서 팀원 찾기 →
                      </Link>
                    </div>
                  ) : myApplications.map(app => {
                    const isNew = !app.isStatusRead && app.status !== 'pending';
                    const statusConfig = {
                      pending: { label: '검토중', bg: 'bg-yellow-50', border: 'border-yellow-200', badgeBg: 'bg-yellow-100', badgeText: 'text-yellow-700', icon: Clock, iconColor: 'text-yellow-500' },
                      accepted: { label: '수락됨', bg: 'bg-green-50', border: 'border-green-200', badgeBg: 'bg-green-100', badgeText: 'text-green-700', icon: CheckCircle, iconColor: 'text-green-600' },
                      rejected: { label: '거절됨', bg: 'bg-red-50', border: 'border-red-100', badgeBg: 'bg-red-100', badgeText: 'text-red-600', icon: XCircle, iconColor: 'text-red-400' },
                    }[app.status];
                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={app.id}
                        className={`p-4 rounded-xl border transition-all ${statusConfig.bg} ${statusConfig.border}`}
                        onClick={() => markMyAppRead(app.id)}
                      >
                        {/* 상단: 상태 뱃지 + NEW + 날짜 */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.iconColor}`} />
                            <span className={`text-xs font-semibold ${statusConfig.badgeText}`}>{statusConfig.label}</span>
                            {isNew && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">NEW</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">{app.appliedAt} 신청</span>
                        </div>

                        {/* 모집 글 제목 → 링크 */}
                        <Link
                          to={`/community/${app.postId}`}
                          className="block mb-2 group/link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover/link:text-blue-600 transition-colors leading-relaxed">
                            {app.postTitle}
                          </p>
                          <span className="text-xs text-blue-500 group-hover/link:underline flex items-center gap-0.5 mt-0.5">
                            모집 글 보기 <ChevronRight className="w-3 h-3" />
                          </span>
                        </Link>

                        {/* 프로젝트 / 콘테스트 */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {app.projectTitle && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{app.projectTitle}</span>
                          )}
                          {app.contestName && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full flex items-center gap-1">
                              <Trophy className="w-2.5 h-2.5" />{app.contestName}
                            </span>
                          )}
                        </div>

                        {/* 모집자 + 역할 */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                              {app.recruiterInitial}
                            </div>
                            <span className="text-xs text-gray-600">{app.recruiterName}</span>
                          </div>
                          <div className="flex gap-1 flex-wrap justify-end">
                            {app.roles.slice(0, 2).map(role => (
                              <span key={role} className="px-1.5 py-0.5 bg-white/70 text-gray-600 text-xs rounded border border-gray-200/60">{role}</span>
                            ))}
                          </div>
                        </div>

                        {/* 수락/거절 안내 */}
                        {app.status === 'accepted' && (
                          <div className="mt-2 pt-2 border-t border-green-200 flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                            <p className="text-xs text-green-700 font-medium">수락되었습니다! 모집자에게 연락하여 팀 합류를 진행하세요.</p>
                          </div>
                        )}
                        {app.status === 'rejected' && (
                          <div className="mt-2 pt-2 border-t border-red-100 flex items-center gap-2">
                            <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                            <p className="text-xs text-red-500">이번에는 아쉽게도 선정되지 않았습니다.</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
              <div className="space-y-3">
                {filteredActivities.map((activity) => {
                  const typeConfig = getCommunityTypeConfig(activity.type);
                  const TypeIcon = typeConfig.icon;

                  return (
                    <Card
                      key={activity.id}
                      className="p-4 hover:shadow-lg transition-all cursor-pointer border-l-4"
                      style={{ borderLeftColor: activity.hasNewReplies ? '#8b5cf6' : 'transparent' }}
                      onClick={() => navigate(`/community/${activity.id}`)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${typeConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <TypeIcon className={`w-5 h-5 ${typeConfig.textColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0 text-xs`}>
                              {typeConfig.label}
                            </Badge>
                            {activity.hasNewReplies && (
                              <Badge className="bg-red-500 text-white border-0 text-xs">
                                {activity.newRepliesCount}개 새 알림
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 text-sm">
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Link
                              to={`/project/${activity.projectId}`}
                              className="text-blue-600 hover:underline font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {activity.projectName}
                            </Link>
                            <span>•</span>
                            <span>{activity.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              )}
            </div>

            {/* 좋아요 & 저장 내역 섹션 */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">좋아요 & 저장 내역</h2>
                  <p className="text-sm text-gray-600 mt-1">관심 있는 프로젝트와 커뮤니티 글을 모아봐요</p>
                </div>
              </div>

              {/* 탭 */}
              <div className="flex gap-2 mb-6">
                {[
                  { value: 'liked' as const, label: '좋아요', Icon: Heart, count: likeCount, activeColor: 'bg-red-500' as const },
                  { value: 'saved' as const, label: '저장', Icon: Bookmark, count: saveCount, activeColor: 'bg-yellow-500' as const },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActivityHistoryTab(tab.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activityHistoryTab === tab.value
                        ? 'bg-gray-900 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <tab.Icon className="w-4 h-4" />
                    {tab.label}
                    <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold rounded-full ${
                      activityHistoryTab === tab.value
                        ? 'bg-white/20 text-white'
                        : `${tab.activeColor} text-white`
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* 좋아요 목록 */}
              {activityHistoryTab === 'liked' && (
                likedItems.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <Heart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">아직 좋아요한 항목이 없습니다</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {likedItems.map((item) => (
                      <ActivityHistoryCard
                        key={item.id}
                        item={item}
                        mode="liked"
                        isActive={isLiked(item.id)}
                        onToggle={() => toggleLike(item)}
                      />
                    ))}
                  </div>
                )
              )}

              {/* 저장 목록 */}
              {activityHistoryTab === 'saved' && (
                savedItems.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <Bookmark className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">아직 저장한 항목이 없습니다</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {savedItems.map((item) => (
                      <ActivityHistoryCard
                        key={item.id}
                        item={item}
                        mode="saved"
                        isActive={isSaved(item.id)}
                        onToggle={() => toggleSave(item)}
                      />
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Column - 새 반응 / 알림 */}
          <div className="space-y-6">
            {/* 커뮤니티 빠른 액션 카드 */}
            <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-900">커뮤니티 빠른 액션</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                막히는 부분이 있거나 공유하고 싶은 내용이 있으신가요?
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => setIsAskQuestionOpen(true)}
                  className="w-full justify-start bg-white hover:bg-purple-50 text-gray-900 border border-purple-300 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="font-semibold">질문하기</span>
                </Button>
                <Button
                  onClick={() => setIsShareProgressOpen(true)}
                  className="w-full justify-start bg-white hover:bg-blue-50 text-gray-900 border border-gray-200 shadow-sm"
                >
                  <Rocket className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">진행 상황 공유</span>
                </Button>
                <Button
                  onClick={() => setIsFindTeammateOpen(true)}
                  className="w-full justify-start bg-white hover:bg-green-50 text-gray-900 border border-gray-200 shadow-sm"
                >
                  <UserPlus className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium">팀원 모집</span>
                </Button>
                <Button
                  onClick={() => setIsShareResourceOpen(true)}
                  className="w-full justify-start bg-white hover:bg-orange-50 text-gray-900 border border-gray-200 shadow-sm"
                >
                  <Share2 className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-sm font-medium">자료 공유</span>
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                내 프로젝트를 선택하면 자동으로 연결됩니다
              </p>
            </Card>

            <div ref={notificationSectionRef}>
              <Card className={`p-6 transition-all duration-500 ${highlightNotifications ? 'ring-4 ring-green-400 ring-offset-2 shadow-xl shadow-green-100' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    새 반응
                    {highlightNotifications && <span className="animate-bounce text-green-500">👈</span>}
                  </h3>
                  <div className="flex items-center gap-2">
                    {unreadReactions.length > 0 && (
                      <>
                        <Badge className="bg-red-100 text-red-700 border-0">
                          {unreadReactions.length}개
                        </Badge>
                        <button
                          onClick={markAllReactionsRead}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          모두 확인
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {unreadReactions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">모두 확인했습니다!</p>
                    <p className="text-xs text-gray-400">새로운 반응이 오면 여기에 표시됩니다</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {unreadReactions.map((notification) => {
                      const iconConfig = getNotificationIcon(notification.type);
                      const Icon = iconConfig.icon;
                      return (
                        <div
                          key={notification.id}
                          className="p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg ${iconConfig.bg} flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-4 h-4 ${iconConfig.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 mb-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-blue-600 font-medium mb-1 line-clamp-1">
                                {notification.activityTitle}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{notification.projectName}</span>
                                {notification.questNumber && (
                                  <>
                                    <span>·</span>
                                    <span>Quest {notification.questNumber}</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">{notification.author} · {notification.time}</span>
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 확인 / 이동 버튼 */}
                          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-blue-200">
                            <button
                              onClick={() => navigate(`/community/${notification.activityId}`)}
                              className="flex-1 text-xs text-blue-600 font-medium hover:underline text-left flex items-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3" />
                              답변 보러가기
                            </button>
                            <button
                              onClick={() => markReactionRead(notification.id)}
                              className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                              <CheckCircle className="w-3 h-3" />
                              확인
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>

            {/* 내 팀원 모집 현황 */}
            {posts.length > 0 && (
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    내 팀원 모집 현황
                  </h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <>
                        <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                          새 지원 {unreadCount}건
                        </Badge>
                        <button
                          onClick={markAllRead}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          모두 확인
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  {posts.map(post => {
                    const allApps = notifications.filter(n => n.postId === post.id);
                    const unread = allApps.filter(n => !n.isRead).length;
                    const totalApplicants = allApps.length;

                    return (
                      <div key={post.id}>
                        {/* 새 지원 알림 카드들 (미확인 알림만) */}
                        {allApps.filter(n => !n.isRead).length > 0 && (
                          <div className="mb-2 space-y-2">
                            {allApps.filter(n => !n.isRead).map(notif => (
                              <div
                                key={notif.id}
                                className="p-3 bg-amber-50 border border-amber-200 rounded-xl"
                              >
                                <div className="flex items-start gap-2 mb-2">
                                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700 flex-shrink-0">
                                    {notif.applicantInitial}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                      <span className="text-xs font-semibold text-gray-900">{notif.applicantName}</span>
                                      <span className="inline-flex items-center px-1 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">NEW</span>
                                    </div>
                                    <p className="text-xs text-gray-600 line-clamp-1">님이 팀원 참여를 신청했습니다</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{notif.createdAt}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleOpenApplicantDrawer(post.id, post.title)}
                                    className="flex-1 text-xs text-amber-700 font-medium hover:underline flex items-center gap-0.5"
                                  >
                                    지원서 확인하기 <ChevronRight className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => markNotificationRead(notif.id)}
                                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white text-xs rounded-lg hover:bg-amber-600 transition-colors font-medium"
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                    확인
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 모집 글 요약 버튼 */}
                        <button
                          onClick={() => handleOpenApplicantDrawer(post.id, post.title)}
                          className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-green-700 flex-1">
                              {post.title}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {post.roles.map(role => (
                              <span key={role} className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                {role}
                              </span>
                            ))}
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                              {post.deadline} 마감
                            </span>
                          </div>
                          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <UserPlus className="w-3.5 h-3.5 text-gray-400" />
                              <span>총 <span className="font-semibold text-gray-900">{totalApplicants}</span>명 지원</span>
                            </div>
                            {unread > 0 && (
                              <div className="flex items-center gap-1 text-xs text-amber-600">
                                <Bell className="w-3.5 h-3.5" />
                                <span><span className="font-semibold">{unread}</span>명 미검토</span>
                              </div>
                            )}
                            <span className="ml-auto text-xs text-green-600 font-medium group-hover:underline flex items-center gap-0.5">
                              전체 관리 <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* 내가 신청한 팀원 참여 */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-blue-600" />
                  내가 신청한 팀원 참여
                </h3>
                <div className="flex items-center gap-2">
                  {unreadMyApps.length > 0 && (
                    <>
                      <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                        새 소식 {unreadMyApps.length}건
                      </Badge>
                      <button
                        onClick={markAllMyAppsRead}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        모두 확인
                      </button>
                    </>
                  )}
                </div>
              </div>

              {unreadMyApps.length === 0 ? (
                <div className="text-center py-6">
                  {myApplications.length === 0 ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                        <Handshake className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">아직 신청한 팀원 모집이 없습니다</p>
                      <Link to="/community" className="text-xs text-blue-600 hover:underline mt-1 block">
                        커뮤니티에서 팀원 찾기 →
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">모두 확인했습니다!</p>
                      <p className="text-xs text-gray-400 mb-3">새로운 합격/불합격 소식이 오면 여기에 표시됩니다</p>
                      <Link
                        to="/community"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                      >
                        신청 내역 전체 보기 <ChevronRight className="w-3 h-3" />
                      </Link>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {unreadMyApps.map(app => {
                    const statusConfig = {
                      pending: {
                        label: '검토중',
                        bg: 'bg-yellow-50',
                        border: 'border-yellow-200',
                        badgeBg: 'bg-yellow-100',
                        badgeText: 'text-yellow-700',
                        icon: Clock,
                        iconColor: 'text-yellow-500',
                        actionBg: 'bg-yellow-500 hover:bg-yellow-600',
                      },
                      accepted: {
                        label: '수락됨 🎉',
                        bg: 'bg-green-50',
                        border: 'border-green-300',
                        badgeBg: 'bg-green-100',
                        badgeText: 'text-green-700',
                        icon: CheckCircle,
                        iconColor: 'text-green-600',
                        actionBg: 'bg-green-600 hover:bg-green-700',
                      },
                      rejected: {
                        label: '아쉽게도 미선정',
                        bg: 'bg-red-50',
                        border: 'border-red-200',
                        badgeBg: 'bg-red-100',
                        badgeText: 'text-red-600',
                        icon: XCircle,
                        iconColor: 'text-red-400',
                        actionBg: 'bg-red-500 hover:bg-red-600',
                      },
                    }[app.status];

                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={app.id}
                        className={`p-3 rounded-xl border transition-all ${statusConfig.bg} ${statusConfig.border}`}
                      >
                        {/* 헤더: 상태 + NEW 뱃지 */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.iconColor}`} />
                            <span className={`text-xs font-semibold ${statusConfig.badgeText}`}>
                              {statusConfig.label}
                            </span>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                              NEW
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">{app.appliedAt} 신청</span>
                        </div>

                        {/* 모집 글 제목 */}
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 leading-relaxed">
                          {app.postTitle}
                        </p>

                        {/* 프로젝트 / 콘테스트 태그 */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {app.projectTitle && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {app.projectTitle}
                            </span>
                          )}
                          {app.contestName && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full flex items-center gap-1">
                              <Trophy className="w-2.5 h-2.5" />{app.contestName}
                            </span>
                          )}
                        </div>

                        {/* 수락/거절 안내 메시지 */}
                        {app.status === 'accepted' && (
                          <div className="mb-3 p-2 bg-green-100 rounded-lg flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-green-800 font-medium">
                              수락되었습니다! 모집자에게 연락하여 팀 합류를 진행하세요.
                            </p>
                          </div>
                        )}
                        {app.status === 'rejected' && (
                          <div className="mb-3 p-2 bg-red-50 rounded-lg flex items-start gap-2">
                            <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-red-600">
                              이번에는 아쉽게도 선정되지 않았습니다.
                            </p>
                          </div>
                        )}

                        {/* 모집자 정보 */}
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                            {app.recruiterInitial}
                          </div>
                          <span className="text-xs text-gray-600">{app.recruiterName}</span>
                          <span className="text-gray-300 mx-1">·</span>
                          {app.roles.slice(0, 2).map(role => (
                            <span key={role} className="px-1.5 py-0.5 bg-white/80 text-gray-600 text-xs rounded border border-gray-200/60">
                              {role}
                            </span>
                          ))}
                        </div>

                        {/* 확인 / 모집 글 보기 버튼 */}
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-200/60">
                          <Link
                            to={`/community/${app.postId}`}
                            className="flex-1 text-xs text-blue-600 font-medium hover:underline flex items-center gap-0.5"
                          >
                            모집 글 보기 <ChevronRight className="w-3 h-3" />
                          </Link>
                          <button
                            onClick={() => markMyAppRead(app.id)}
                            className={`flex items-center gap-1 px-3 py-1.5 text-white text-xs rounded-lg transition-colors font-medium ${statusConfig.actionBg}`}
                          >
                            <CheckCircle className="w-3 h-3" />
                            확인
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <Link
                    to="/community"
                    className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:underline pt-1"
                  >
                    신청 내역 전체 보기
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </Card>

            {/* ── 팔로잉 업데이트 섹션 ── */}
            <div id="following-section">
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Rss className="w-4 h-4 text-blue-600" />
                    팔로잉 업데이트
                    {/* 읽지 않은 총 업데이트 수 뱃지 */}
                    {totalNewUpdates > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-red-500 text-white animate-pulse">
                        {totalNewUpdates}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2">
                    {totalNewUpdates > 0 && (
                      <button
                        onClick={markAllUpdatesRead}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        모두 확인
                      </button>
                    )}
                  </div>
                </div>

                {/* 팔로잉한 메이커가 없을 때 */}
                {followedMakers.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-blue-300" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">팔로잉한 메이커가 없습니다</p>
                    <p className="text-xs text-gray-400">프로젝트 페이지에서 관심 메이커를 팔로우해보세요</p>
                    <Link
                      to="/projects"
                      className="text-xs text-blue-600 hover:underline mt-2 block"
                    >
                      프로젝트 탐색하기 →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {followedMakers.map((maker) => {
                      const newCount = maker.updates.filter(u => u.isNew).length;
                      const latestUpdates = maker.updates.slice(0, 2);

                      // 업데이트 타입별 아이콘·색상
                      const updateTypeConfig = {
                        project: { icon: Rocket, color: 'text-blue-600', bg: 'bg-blue-50' },
                        progress: { icon: Share2, color: 'text-blue-600', bg: 'bg-blue-50' },
                        question: { icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
                        resource: { icon: BookOpen, color: 'text-green-600', bg: 'bg-green-50' },
                        award: { icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                      };

                      return (
                        <div
                          key={maker.id}
                          className={`rounded-xl border transition-all ${
                            newCount > 0 ? 'border-blue-200 bg-blue-50/40' : 'border-gray-200 bg-white'
                          }`}
                        >
                          {/* 메이커 헤더 */}
                          <div className="flex items-center gap-3 p-3 pb-2">
                            <Link to={`/maker/${maker.id}`} className="flex-shrink-0">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold hover:scale-105 transition-transform">
                                {maker.initial}
                              </div>
                            </Link>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <Link
                                  to={`/maker/${maker.id}`}
                                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                  {maker.name}
                                </Link>
                                {newCount > 0 && (
                                  <span className="inline-flex items-center justify-center min-w-[16px] h-4 px-1 text-xs font-bold rounded-full bg-red-500 text-white">
                                    {newCount}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">{maker.role}</p>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <Link
                                to={`/maker/${maker.id}`}
                                className="text-xs text-blue-600 hover:underline flex items-center gap-0.5"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                              <button
                                onClick={() => unfollowMaker(maker.id)}
                                className="text-xs text-gray-400 hover:text-red-500 transition-colors px-1.5 py-0.5 rounded hover:bg-red-50"
                              >
                                언팔
                              </button>
                            </div>
                          </div>

                          {/* 최신 업데이트 목록 (최대 2개) */}
                          {latestUpdates.length > 0 && (
                            <div className="px-3 pb-3 space-y-1.5">
                              {latestUpdates.map((update) => {
                                const cfg = updateTypeConfig[update.type] || updateTypeConfig.progress;
                                const UIcon = cfg.icon;
                                return (
                                  <div
                                    key={update.id}
                                    onClick={() => markUpdatesRead(maker.id)}
                                    className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                                      update.isNew
                                        ? 'bg-white border border-blue-200 hover:border-blue-300'
                                        : 'hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                                      <UIcon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs text-gray-800 line-clamp-1 font-medium">
                                        {update.isNew && (
                                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1 mb-0.5 align-middle flex-shrink-0"></span>
                                        )}
                                        {update.title}
                                      </p>
                                      {update.projectName && (
                                        <p className="text-xs text-gray-400 truncate">{update.projectName} · {update.time}</p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* 전체 보기 링크 */}
                    <Link
                      to="/projects"
                      className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:underline pt-1"
                    >
                      팔로잉 메이커 프로젝트 탐색
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </Card>
            </div>

            {/* 활동 통계 */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">이번 주 활동</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    진행 중 프로젝트
                  </span>
                  <span className="font-semibold text-blue-600">2개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    작성한 질문
                  </span>
                  <span className="font-semibold text-gray-900">3개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    받은 답변
                  </span>
                  <span className="font-semibold text-green-600">8개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    받은 참여 요청
                  </span>
                  <span className="font-semibold text-orange-600">5개</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* 프로젝트 생성 모달 */}
      <ProjectCreationModal
        isOpen={isProjectCreationModalOpen}
        onClose={() => setIsProjectCreationModalOpen(false)}
      />

      {/* 프로필 편집 드로어 */}
      <ProfileEditDrawer
        open={isProfileEditOpen}
        onOpenChange={setIsProfileEditOpen}
      />

      {/* 커뮤니티 다이얼로그 */}
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

      {/* 지원자 관리 드로어 */}
      <ApplicantManagementDrawer
        open={applicantDrawer.open}
        onClose={() => setApplicantDrawer(prev => ({ ...prev, open: false }))}
        postId={applicantDrawer.postId}
        postTitle={applicantDrawer.postTitle}
        notifications={notifications.filter(n => n.postId === applicantDrawer.postId)}
      />
    </div>
  );
}