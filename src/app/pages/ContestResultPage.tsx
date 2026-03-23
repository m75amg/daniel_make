import { Link, useParams } from 'react-router';
import {
  Trophy, ChevronRight, Star, Medal, Award, Users,
  Eye, Heart, Calendar, ArrowRight, Sparkles,
  Crown, Gift, ExternalLink, TrendingUp, CheckCircle2,
  Rocket, MessageCircle, Share2, Download,
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';

// 콘테스트 결과 데이터 (실제로는 API에서 가져올 데이터)
const contestResultsData: Record<string, ContestResultData> = {
  'arduino-beginner-2025': {
    id: 'arduino-beginner-2025',
    title: '아두이노 입문자 대회 2025',
    subtitle: '초보 메이커들의 열정이 빛난 대회',
    category: '아두이노',
    gradient: 'from-blue-600 via-purple-600 to-pink-600',
    announcedDate: '2026년 1월 10일',
    contestPeriod: '2025년 10월 1일 ~ 12월 31일',
    heroImage: 'https://images.unsplash.com/photo-1764408721535-2dcb912db83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwdHJvcGh5JTIwd2lubmVyJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczOTY5NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    stats: {
      totalParticipants: 342,
      submittedProjects: 289,
      totalPrize: '₩300만',
      countries: 1,
    },
    winners: [
      {
        rank: 1,
        prize: '대상',
        prizeAmount: '₩150만',
        projectTitle: '스마트 수경재배 자동화 시스템',
        projectDescription: '아두이노와 센서를 활용한 완전 자동화된 수경재배 시스템. 온도·습도·pH를 실시간 모니터링하고 스마트폰으로 원격 제어 가능.',
        author: '김민준',
        authorId: 'kimminjun',
        authorAvatar: '김',
        team: '솔로',
        image: 'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwZWxlY3Ryb25pY3MlMjBiZWdpbm5lciUyMHByb2plY3QlMjBtYWtlcnxlbnwxfHx8fDE3NzM5Njk1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        likes: 1240,
        views: 15800,
        tags: ['Arduino', 'IoT', 'Agriculture'],
        projectId: 1,
        judgeComment: '완성도와 실용성이 뛰어나며, 초보자임에도 불구하고 시스템 설계와 코드 품질이 매우 훌륭합니다.',
      },
      {
        rank: 2,
        prize: '최우수상',
        prizeAmount: '₩80만',
        projectTitle: '장애인을 위한 음성제어 휠체어 조이스틱',
        projectDescription: '음성 명령으로 전동 휠체어 조이스틱을 제어하는 아두이노 기반 보조기기.',
        author: '이수현',
        authorId: 'leesuhyun',
        authorAvatar: '이',
        team: '2인팀',
        image: 'https://images.unsplash.com/photo-1537151028327-9ab072f24b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMExFRCUyMHNtYXJ0JTIwaG9tZSUyMGNpcmN1aXQlMjBwcm9qZWN0fGVufDF8fHx8MTc3Mzk2OTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        likes: 890,
        views: 9300,
        tags: ['Arduino', 'Accessibility', 'Voice'],
        projectId: 2,
        judgeComment: '사회적 가치와 기술적 완성도를 동시에 갖춘 뛰어난 프로젝트입니다.',
      },
      {
        rank: 3,
        prize: '우수상',
        prizeAmount: '₩50만',
        projectTitle: 'DIY 포터블 기상관측 스테이션',
        projectDescription: '배터리로 동작하는 소형 기상관측 장치. 기압·온도·습도를 측정하고 e-ink 디스플레이에 표시.',
        author: '박지훈',
        authorId: 'parkjihun',
        authorAvatar: '박',
        team: '솔로',
        image: 'https://images.unsplash.com/photo-1630856713958-ba0c27a4ac8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2NvbnRyb2xsZXIlMjBzZW5zb3IlMjB3ZWFyYWJsZSUyMGhhcmR3YXJlJTIwcHJvamVjdHxlbnwxfHx8fDE3NzM5Njk1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        likes: 620,
        views: 6700,
        tags: ['Arduino', 'Sensor', 'Weather'],
        projectId: 3,
        judgeComment: '하드웨어와 소프트웨어의 균형 잡힌 구현이 인상적입니다.',
      },
    ],
    honorableMentions: [
      { rank: 4, projectTitle: 'RFID 출석 관리 시스템', author: '최동현', projectId: 4, likes: 340 },
      { rank: 5, projectTitle: '초음파 주차 보조 센서', author: '정유진', projectId: 5, likes: 290 },
      { rank: 6, projectTitle: '솔라 충전 스마트 화분', author: '강민서', projectId: 6, likes: 260 },
      { rank: 7, projectTitle: 'Bluetooth 스마트 자전거 라이트', author: '윤재원', projectId: 7, likes: 210 },
      { rank: 8, projectTitle: '자동 고양이 먹이 급식기', author: '임지수', projectId: 8, likes: 195 },
    ],
    timeline: [
      { label: '참가 신청', date: '2025년 10월 1일', done: true },
      { label: 'Quest 1 마감', date: '2025년 11월 1일', done: true },
      { label: 'Quest 2 마감', date: '2025년 12월 1일', done: true },
      { label: '최종 마감', date: '2025년 12월 31일', done: true },
      { label: '심사 기간', date: '2026년 1월 1일 ~ 9일', done: true },
      { label: '수상자 발표', date: '2026년 1월 10일', done: true },
    ],
    judgeMessage: '이번 대회에서 초보 메이커들의 놀라운 잠재력과 창의성을 확인할 수 있었습니다. 289개의 프로젝트 모두가 수상자입니다. 계속 만들어 나가세요!',
    judgeName: 'Make 2.0 심사위원단',
  },
  'ai-vision-2025': {
    id: 'ai-vision-2025',
    title: 'AI 비전 프로젝트 2025',
    subtitle: '컴퓨터 비전으로 세상을 바꾼 메이커들',
    category: 'AI',
    gradient: 'from-violet-600 via-purple-600 to-blue-600',
    announcedDate: '2026년 2월 20일',
    contestPeriod: '2025년 10월 15일 ~ 2026년 1월 15일',
    heroImage: 'https://images.unsplash.com/photo-1764408721535-2dcb912db83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255JTIwdHJvcGh5JTIwd2lubmVyJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczOTY5NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    stats: {
      totalParticipants: 278,
      submittedProjects: 231,
      totalPrize: '₩700만',
      countries: 1,
    },
    winners: [
      {
        rank: 1,
        prize: '대상',
        prizeAmount: '₩350만',
        projectTitle: '실시간 수어 번역 AI 카메라',
        projectDescription: 'OpenCV와 MediaPipe를 활용해 수어를 실시간으로 텍스트와 음성으로 번역하는 라즈베리파이 기반 장치.',
        author: '한소영',
        authorId: 'hansoyoung',
        authorAvatar: '한',
        team: '3인팀',
        image: 'https://images.unsplash.com/photo-1755053757912-a63da9d6e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtlciUyMHdvcmtzaG9wJTIwZWxlY3Ryb25pY3MlMjBwcm9qZWN0JTIwdGVhbXxlbnwxfHx8fDE3NzM5Njk1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        likes: 2100,
        views: 28500,
        tags: ['AI', 'OpenCV', 'Accessibility', 'RaspberryPi'],
        projectId: 10,
        judgeComment: '기술적 완성도와 사회적 임팩트 모두 최고 수준. AI 비전 기술을 접근성 문제 해결에 연결한 탁월한 통찰력.',
      },
      {
        rank: 2,
        prize: '최우수상',
        prizeAmount: '₩200만',
        projectTitle: '식물 질병 자동 진단 카메라',
        projectDescription: 'TensorFlow Lite 기반의 식물 질병 분류 모델을 라즈베리파이에 탑재한 현장용 진단 도구.',
        author: '오태준',
        authorId: 'otaejun',
        authorAvatar: '오',
        team: '2인팀',
        image: 'https://images.unsplash.com/photo-1630856713958-ba0c27a4ac8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2NvbnRyb2xsZXIlMjBzZW5zb3IlMjB3ZWFyYWJsZSUyMGhhcmR3YXJlJTIwcHJvamVjdHxlbnwxfHx8fDE3NzM5Njk1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        likes: 1450,
        views: 17200,
        tags: ['TensorFlow', 'Agriculture', 'Classification'],
        projectId: 11,
        judgeComment: '실용적 농업 문제를 엣지 AI로 해결한 완성도 높은 프로젝트.',
      },
      {
        rank: 3,
        prize: '우수상',
        prizeAmount: '₩100만',
        projectTitle: 'AR 기반 실내 네비게이션 시스템',
        projectDescription: 'SLAM 알고리즘과 컴퓨터 비전을 결합해 건물 내 AR 길 안내를 구현한 모바일 앱.',
        author: '신예린',
        authorId: 'shinyerin',
        authorAvatar: '신',
        team: '솔로',
        image: 'https://images.unsplash.com/photo-1537151028327-9ab072f24b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMExFRCUyMHNtYXJ0JTIwaG9tZSUyMGNpcmN1aXQlMjBwcm9qZWN0fGVufDF8fHx8MTc3Mzk2OTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        likes: 980,
        views: 11400,
        tags: ['SLAM', 'AR', 'Navigation', 'CV'],
        projectId: 12,
        judgeComment: '솔로 참가자로서 복잡한 SLAM 알고리즘을 구현해낸 점이 대단합니다.',
      },
    ],
    honorableMentions: [
      { rank: 4, projectTitle: '실시간 마스크 착용 감지 카메라', author: '류민호', projectId: 13, likes: 540 },
      { rank: 5, projectTitle: '감정 인식 미러 디스플레이', author: '배수진', projectId: 14, likes: 460 },
      { rank: 6, projectTitle: '주차장 빈자리 실시간 감지', author: '천지우', projectId: 15, likes: 380 },
    ],
    timeline: [
      { label: '참가 신청', date: '2025년 10월 15일', done: true },
      { label: 'Quest 1 마감', date: '2025년 11월 15일', done: true },
      { label: 'Quest 2 마감', date: '2025년 12월 15일', done: true },
      { label: '최종 마감', date: '2026년 1월 15일', done: true },
      { label: '심사 기간', date: '2026년 1월 16일 ~ 2월 15일', done: true },
      { label: '수상자 발표', date: '2026년 2월 20일', done: true },
    ],
    judgeMessage: '참가자 모두가 AI 비전이라는 도전적인 주제에 진지하게 임해주었습니다. 기술 수준과 창의성 모두 기대 이상이었으며, 한국 메이커 씬의 밝은 미래를 확인할 수 있었습니다.',
    judgeName: 'Make 2.0 AI 분야 심사위원단',
  },
};

interface Winner {
  rank: number;
  prize: string;
  prizeAmount: string;
  projectTitle: string;
  projectDescription: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  team: string;
  image: string;
  likes: number;
  views: number;
  tags: string[];
  projectId: number;
  judgeComment: string;
}

interface HonorableMention {
  rank: number;
  projectTitle: string;
  author: string;
  projectId: number;
  likes: number;
}

interface ContestResultData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  gradient: string;
  announcedDate: string;
  contestPeriod: string;
  heroImage: string;
  stats: {
    totalParticipants: number;
    submittedProjects: number;
    totalPrize: string;
    countries: number;
  };
  winners: Winner[];
  honorableMentions: HonorableMention[];
  timeline: { label: string; date: string; done: boolean }[];
  judgeMessage: string;
  judgeName: string;
}

const rankConfig = [
  {
    bg: 'from-yellow-400 to-amber-500',
    border: 'border-yellow-400',
    glow: 'shadow-yellow-200',
    icon: Crown,
    iconColor: 'text-yellow-500',
    badge: 'bg-yellow-500',
    ring: 'ring-4 ring-yellow-400 ring-offset-4',
    size: 'lg:col-span-1 order-first lg:order-none',
  },
  {
    bg: 'from-gray-300 to-slate-400',
    border: 'border-gray-300',
    glow: 'shadow-gray-200',
    icon: Medal,
    iconColor: 'text-gray-400',
    badge: 'bg-gray-400',
    ring: 'ring-2 ring-gray-300 ring-offset-2',
    size: '',
  },
  {
    bg: 'from-orange-400 to-amber-600',
    border: 'border-orange-400',
    glow: 'shadow-orange-200',
    icon: Award,
    iconColor: 'text-orange-500',
    badge: 'bg-orange-500',
    ring: 'ring-2 ring-orange-400 ring-offset-2',
    size: '',
  },
];

export function ContestResultPage() {
  const { contestId } = useParams();
  const [shareToast, setShareToast] = useState(false);

  const data = contestId ? contestResultsData[contestId] : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">결과 정보를 찾을 수 없습니다</h2>
          <Link to="/contests" className="text-blue-600 hover:underline">콘테스트 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Share Toast */}
      {shareToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          링크가 복사되었습니다!
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/contests" className="hover:text-blue-600 transition-colors">콘테스트</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/contest/${data.id}`} className="hover:text-blue-600 transition-colors">{data.title}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">수상자 발표</span>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className={`relative bg-gradient-to-br ${data.gradient} text-white overflow-hidden`}>
        {/* Decorative confetti dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                width: `${8 + (i % 5) * 6}px`,
                height: `${8 + (i % 5) * 6}px`,
                background: ['#fff', '#fde68a', '#a5f3fc', '#f9a8d4', '#86efac'][i % 5],
                top: `${(i * 37) % 100}%`,
                left: `${(i * 43) % 100}%`,
                animationDelay: `${(i * 0.3) % 3}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Announced badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold">수상자 발표 · {data.announcedDate}</span>
            </div>

            {/* Trophy icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  <Trophy className="w-14 h-14 text-yellow-300 drop-shadow-lg" />
                </div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-20 blur-xl scale-150" />
              </div>
            </div>

            <Badge className="bg-white/20 text-white border-0 mb-4 text-sm px-4 py-1">
              {data.category}
            </Badge>
            <h1 className="text-5xl font-bold mb-3 drop-shadow-md">{data.title}</h1>
            <p className="text-2xl text-white/90 mb-8">{data.subtitle}</p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="bg-white rounded-2xl px-8 py-4 text-center shadow-lg" style={{backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)'}}>
                <div className="text-3xl font-bold text-white drop-shadow">{data.stats.totalParticipants}</div>
                <div className="text-sm text-white mt-1 opacity-90">총 참가자</div>
              </div>
              <div className="rounded-2xl px-8 py-4 text-center shadow-lg" style={{backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)'}}>
                <div className="text-3xl font-bold text-white drop-shadow">{data.stats.submittedProjects}</div>
                <div className="text-sm text-white mt-1 opacity-90">제출 프로젝트</div>
              </div>
              <div className="rounded-2xl px-8 py-4 text-center shadow-lg" style={{backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)'}}>
                <div className="text-3xl font-bold text-white drop-shadow">{data.stats.totalPrize}</div>
                <div className="text-sm text-white mt-1 opacity-90">총 상금</div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all border-2 border-white text-white hover:text-white"
                style={{backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)'}}
              >
                <Share2 className="w-4 h-4" />
                결과 공유하기
              </button>
              <Link to="/contests">
                <button className="flex items-center gap-2 bg-white text-purple-700 hover:bg-gray-100 rounded-xl px-6 py-3 font-medium transition-all shadow-lg">
                  <Rocket className="w-4 h-4" />
                  다음 콘테스트 참가하기
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* ── WINNERS PODIUM ── */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-5 py-2 mb-4">
              <Crown className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-700">수상자 발표</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">🏆 최종 수상자</h2>
            <p className="text-gray-600">심사위원단의 치열한 심사 끝에 선정된 최고의 메이커들</p>
          </div>

          {/* 1st place - full width spotlight */}
          {data.winners[0] && (() => {
            const w = data.winners[0];
            const cfg = rankConfig[0];
            const Icon = cfg.icon;
            return (
              <div className="mb-8">
                <Card className={`overflow-hidden border-2 ${cfg.border} shadow-2xl ${cfg.glow} relative`}>
                  {/* Gold shimmer bar */}
                  <div className={`h-2 bg-gradient-to-r ${cfg.bg}`} />
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-72 lg:h-auto overflow-hidden">
                      <ImageWithFallback
                        src={w.image}
                        alt={w.projectTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-30 lg:opacity-0" />
                      {/* Rank badge */}
                      <div className={`absolute top-4 left-4 w-14 h-14 rounded-full bg-gradient-to-br ${cfg.bg} flex items-center justify-center shadow-xl ${cfg.ring}`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-8 flex flex-col justify-between bg-gradient-to-br from-yellow-50 to-white">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className={`${cfg.badge} text-white text-sm px-4 py-1`}>
                            🥇 {w.prize}
                          </Badge>
                          <span className="text-2xl font-bold text-yellow-600">{w.prizeAmount}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{w.projectTitle}</h3>
                        <p className="text-gray-600 mb-5 leading-relaxed">{w.projectDescription}</p>

                        {/* Judge comment */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-4 mb-5">
                          <p className="text-sm text-yellow-800 italic">"{w.judgeComment}"</p>
                          <p className="text-xs text-yellow-600 mt-1 font-medium">— 심사위원 총평</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {w.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Link to={`/maker/${w.authorId}`} onClick={e => e.stopPropagation()}>
                            <Avatar className={`w-10 h-10 ${cfg.ring} hover:scale-110 transition-transform cursor-pointer`}>
                              <AvatarFallback className="bg-yellow-100 text-yellow-700 font-bold">
                                {w.authorAvatar}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-gray-900">{w.author}</p>
                              <Link
                                to={`/maker/${w.authorId}`}
                                onClick={e => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full px-2 py-0.5 transition-all font-medium"
                              >
                                <Users className="w-3 h-3" />
                                방문
                              </Link>
                            </div>
                            <p className="text-xs text-gray-500">{w.team}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-400" />{w.likes.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{w.views.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Link to={`/project/${w.projectId}`}>
                          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 transition-all">
                            <ExternalLink className="w-4 h-4" />
                            수상 프로젝트 보기
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })()}

          {/* 2nd & 3rd place */}
          <div className="grid md:grid-cols-2 gap-6">
            {data.winners.slice(1).map((w, idx) => {
              const cfg = rankConfig[idx + 1];
              const Icon = cfg.icon;
              return (
                <Card key={w.rank} className={`overflow-hidden border-2 ${cfg.border} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className={`h-1.5 bg-gradient-to-r ${cfg.bg}`} />
                  <div className="relative h-52 overflow-hidden">
                    <ImageWithFallback
                      src={w.image}
                      alt={w.projectTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br ${cfg.bg} flex items-center justify-center shadow-xl ${cfg.ring}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <Badge className={`${cfg.badge} text-white text-xs`}>
                        {w.rank === 2 ? '🥈' : '🥉'} {w.prize}
                      </Badge>
                      <span className="text-white font-bold text-lg">{w.prizeAmount}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{w.projectTitle}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{w.projectDescription}</p>

                    {/* Judge comment */}
                    <div className={`border-l-4 ${idx === 0 ? 'border-gray-300' : 'border-orange-400'} bg-gray-50 rounded-r-lg p-3 mb-4`}>
                      <p className="text-xs text-gray-600 italic line-clamp-2">"{w.judgeComment}"</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {w.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/maker/${w.authorId}`} onClick={e => e.stopPropagation()}>
                          <Avatar className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer">
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-bold">
                              {w.authorAvatar}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-bold text-gray-900">{w.author}</p>
                            <Link
                              to={`/maker/${w.authorId}`}
                              onClick={e => e.stopPropagation()}
                              className="inline-flex items-center gap-0.5 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full px-1.5 py-0.5 transition-all font-medium"
                            >
                              <Users className="w-2.5 h-2.5" />
                              방문
                            </Link>
                          </div>
                          <p className="text-xs text-gray-500">{w.team}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400" />{w.likes.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{w.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <Link to={`/project/${w.projectId}`}>
                      <button className={`w-full ${idx === 0 ? 'bg-gray-600 hover:bg-gray-700' : 'bg-orange-500 hover:bg-orange-600'} text-white rounded-xl py-2.5 font-bold flex items-center justify-center gap-2 transition-all text-sm`}>
                        <ExternalLink className="w-3.5 h-3.5" />
                        프로젝트 보기
                      </button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── HONORABLE MENTIONS ── */}
        {data.honorableMentions.length > 0 && (
          <section>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-5 py-2 mb-4">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">장려상 & 특별상</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">⭐ 장려상 수상 프로젝트</h2>
              <p className="text-gray-600">심사위원의 눈에 띈 특별한 아이디어들</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.honorableMentions.map((m) => (
                <Link key={m.projectId} to={`/project/${m.projectId}`}>
                  <Card className="group p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">{m.rank}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                          {m.projectTitle}
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                {m.author[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-600">{m.author}</span>
                          </div>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Heart className="w-3 h-3 text-red-400" />{m.likes}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── JUDGE MESSAGE ── */}
        <section>
          <Card className="p-10 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full -translate-y-32 translate-x-32 opacity-40" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">심사위원 총평</h2>
                  <p className="text-sm text-gray-600">{data.judgeName}</p>
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-purple-400 pl-6">
                "{data.judgeMessage}"
              </blockquote>
            </div>
          </Card>
        </section>

        {/* ── CONTEST TIMELINE RECAP ── */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-5 py-2 mb-4">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">대회 히스토리</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">콘테스트 여정</h2>
            <p className="text-gray-600">{data.contestPeriod}</p>
          </div>

          <Card className="p-8">
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-green-400 to-green-200" />
              <div className="space-y-6">
                {data.timeline.map((step, i) => (
                  <div key={i} className="flex items-center gap-5 pl-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md z-10">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{step.label}</span>
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* ── ALL PROJECTS CTA ── */}
        <section>
          <Card className={`p-10 bg-gradient-to-br ${data.gradient} text-white relative overflow-hidden`}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white opacity-10 animate-pulse"
                  style={{ width: `${30 + i * 20}px`, height: `${30 + i * 20}px`, top: `${(i * 40) % 100}%`, left: `${(i * 30 + 10) % 100}%`, animationDelay: `${i * 0.4}s` }} />
              ))}
            </div>
            <div className="relative text-center max-w-2xl mx-auto">
              <Sparkles className="w-10 h-10 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">모든 참가 프로젝트 둘러보기</h2>
              <p className="text-white/80 mb-8">
                {data.stats.submittedProjects}개의 메이커 프로젝트가 모두 여기 있습니다.
                수상자뿐 아니라 모든 참가자의 열정을 확인해보세요.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to={`/contest/${data.id}`}>
                  <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl px-6 py-3 font-medium transition-all backdrop-blur-sm">
                    <Users className="w-4 h-4" />
                    참가 프로젝트 전체보기
                  </button>
                </Link>
                <Link to="/projects">
                  <button className="flex items-center gap-2 bg-white text-purple-700 hover:bg-gray-100 rounded-xl px-6 py-3 font-medium transition-all shadow-lg">
                    <TrendingUp className="w-4 h-4" />
                    전체 프로젝트 둘러보기
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* ── NEXT CONTEST CTA ── */}
        <section className="pb-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">다음 도전을 준비하세요</h2>
            <p className="text-gray-600">지금 진행중인 콘테스트에 참가해 새로운 프로젝트를 시작하세요</p>
          </div>
          <div className="flex justify-center">
            <Link to="/contests">
              <button className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-10 py-4 font-bold shadow-xl transition-all hover:scale-105">
                <Rocket className="w-5 h-5" />
                진행중인 콘테스트 보기
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}