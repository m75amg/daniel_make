import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useActivity } from '../context/ActivityContext';
import {
  Target, Zap, MessageCircle, TrendingUp, Github, FileText, Code,
  ChevronRight, ChevronUp, ChevronDown, Trophy, CheckCircle, Clock,
  Users, Calendar, Play, Cpu, Heart, Bookmark, Share2, Download,
  Settings, GitBranch, BookOpen, Rocket, ThumbsUp,
  Sparkles, User, Image as ImageIcon, Video,
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const { toggleLike, toggleSave, isLiked, isSaved } = useActivity();
  const [showAllGallery, setShowAllGallery] = useState(false);

  // Mock project database
  const projectDatabase: { [key: string]: any } = {
    '1': {
      id: '1',
      title: 'AI 음성인식 자율주행 로봇',
      subtitle: '라즈베리파이와 OpenCV로 실내 자율주행이 가능한 배송 로봇',
      description: '실내 환경에서 자율주행이 가능한 배송 로봇 프로젝트입니다.',
      author: '김메이커',
      authorId: 'kimmaker',
      teamName: 'AI 로봇팀',
      authorInitial: '김',
      startDate: '2026년 3월 5일',
      completedDate: '2026년 3월 13일',
      likes: 567,
      views: 8930,
      comments: 142,
      projectType: 'contest',
      status: 'completed',
      award: '최우수상',
      contestId: 'ai-robot-2026',
      contestName: 'AI 로봇 챌린지 2026',
      category: '로봇공학',
      tags: ['AI', '라즈베리파이', 'OpenCV', '자율주행', 'Python', 'ROS'],
      mainImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920',
      demoVideo: 'https://youtube.com/watch?v=demo',
    },
    '2': {
      id: '2',
      title: '오픈소스 자율주행 로봇',
      subtitle: '라즈베리파이와 AI 비전을 활용한 실내 자율주행 로봇 프로젝트',
      description: '콘테스트 참가중인 자율주행 로봇 프로젝트입니다.',
      author: '김메이커',
      authorId: 'kimmaker',
      teamName: null,
      authorInitial: '김',
      startDate: '2026년 3월 5일',
      completedDate: null,
      likes: 432,
      views: 5420,
      comments: 89,
      projectType: 'contest',
      status: 'in-progress',
      award: null,
      contestId: 'ai-robot-2026',
      contestName: 'AI 로봇 챌린지 2026',
      questProgress: 2, // Quest 진행도 추가
      totalQuests: 3,
      category: '로봇공학',
      tags: ['AI', '라즈베리파이', 'OpenCV', '자율주행', 'Python'],
      mainImage: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=1920',
      demoVideo: null,
    },
    '3': {
      id: '3',
      title: 'ESP32 기반 스마트 화분',
      subtitle: '토양 수분, 온도, 조도를 모니터링하고 자동으로 물을 주는 IoT 화분',
      description: '개인 프로젝트로 제작한 스마트 화분입니다.',
      author: '이개발',
      authorId: 'leedev',
      teamName: null,
      authorInitial: '이',
      startDate: '2026년 2월 1일',
      completedDate: '2026년 2월 28일',
      likes: 289,
      views: 3210,
      comments: 54,
      projectType: 'personal',
      status: 'completed',
      award: null,
      contestId: null,
      contestName: null,
      category: 'IoT',
      tags: ['ESP32', 'IoT', 'Arduino', '스마트홈', '자동화'],
      mainImage: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?w=1920',
      demoVideo: 'https://youtube.com/watch?v=demo-plant',
    },
    '4': {
      id: '4',
      title: '3D 프린터 자동 레벨링 시스템',
      subtitle: 'AI 기반 자동 베드 레벨링으로 완벽한 첫 레이어를 만드는 시스템',
      description: '개인 프로젝트로 진행중인 3D 프린터 개선 작업입니다.',
      author: '박엔지니어',
      authorId: 'parkengineer',
      teamName: null,
      authorInitial: '박',
      startDate: '2026년 3월 10일',
      completedDate: null,
      likes: 267,
      views: 2890,
      comments: 41,
      projectType: 'personal',
      status: 'in-progress',
      award: null,
      contestId: null,
      contestName: null,
      category: '3D프린팅',
      tags: ['3D프린팅', 'Arduino', 'AI', '자동화', '센서'],
      mainImage: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?w=1920',
      demoVideo: null,
    },
    '5': {
      id: '5',
      title: 'AI 음성인식 스마트 미러',
      subtitle: '거울에 날씨, 일정, 뉴스를 표시하고 음성으로 제어하는 스마트홈 디스플레이',
      description: '콘테스트 참가 중인 스마트 미러 프로젝트입니다.',
      author: '최개발',
      authorId: 'choidev',
      teamName: null,
      authorInitial: '최',
      startDate: '2026년 2월 15일',
      completedDate: '2026년 3월 10일',
      likes: 345,
      views: 4120,
      comments: 67,
      projectType: 'contest',
      status: 'completed',
      award: '우수상',
      contestId: 'smarthome-2026',
      contestName: '스마트홈 챌린지',
      questProgress: 3,
      totalQuests: 3,
      category: 'AI',
      tags: ['AI', '음성인식', 'Raspberry Pi', 'Python', 'TensorFlow'],
      mainImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920',
      demoVideo: 'https://youtube.com/watch?v=demo-mirror',
    },
    '6': {
      id: '6',
      title: '아두이노 기반 날씨 관측소',
      subtitle: '온습도, 기압, 풍향풍속을 측정하고 실시간으로 데이터를 시각화하는 관측 시스템',
      description: '작성중인 개인 프로젝트입니다. 아직 초안 단계로 기본 아이디어와 설계만 완료했습니다.',
      author: '정코더',
      authorId: 'jungcoder',
      teamName: null,
      authorInitial: '정',
      startDate: '2026년 3월 15일',
      completedDate: null,
      likes: 45,
      views: 234,
      comments: 8,
      projectType: 'personal',
      status: 'draft',
      award: null,
      contestId: null,
      contestName: null,
      category: 'IoT',
      tags: ['Arduino', 'IoT', '센서', '날씨', '데이터시각화'],
      mainImage: 'https://images.unsplash.com/photo-1553408226-42ecf81a214c?w=1920',
      demoVideo: null,
    },
  };

  const project = projectDatabase[projectId || '1'] || projectDatabase['1'];
  const isContestProject = project.projectType === 'contest';
  const isCompletedProject = project.status === 'completed';

  const quests = [
    {
      id: 1,
      title: 'Quest 1: 프로젝트 기획 및 설계',
      completed: true,
      completedDate: '2026년 3월 5일',
      summary: '라즈베리파이 기반 자율주행 로봇 설계. OpenCV를 활용한 장애물 인식 시스템 구상.',
      content: `실내 환경에서 자율주행이 가능한 배송 로봇을 개발하기로 결정했습니다. 
      
주요 설계 목표:
- 실시간 장애물 감지 및 회피
- 음성 명령을 통한 목적지 설정
- 안정적인 경로 탐색 알고리즘
- 웹 기반 모니터링 시스템

기술 스택 선정:
- 메인 컨트롤러: 라즈베리파이 4 (4GB RAM)
- 비전 처리: OpenCV + TensorFlow Lite
- 센서: 초음파 센서, Pi Camera v2
- 통신: Wi-Fi, MQTT 프로토콜`,
      images: [
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
      ],
    },
    {
      id: 2,
      title: 'Quest 2: 프로토타입 제작',
      completed: true,
      completedDate: '2026년 3월 10일',
      summary: '하드웨어 조립 완료. 초음파 센서와 카메라 모듈 통합. 기본 모터 제어 구현.',
      content: `하드웨어 조립을 완료하고 기본 동작을 검증했습니다.

조립 과정:
1. 로봇 섀시 조립 및 모터 장착
2. 라즈베리파이 및 센서 모듈 연결
3. 배터리 및 전원 관리 시스템 구성
4. 배선 정리 및 케이블 관리

소프트웨어 프로토타입:
- 기본 모터 제어 프로그램 작성
- 초음파 센서 데이터 수집 및 처리
- 카메라 영상 실시간 스트리밍
- 웹 인터페이스 초기 버전 구현`,
      images: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
        'https://images.unsplash.com/photo-1581092160607-ee67e4e89ed6?w=800',
      ],
    },
    {
      id: 3,
      title: 'Quest 3: 최종 프로젝트 완성',
      completed: isCompletedProject,
      completedDate: isCompletedProject ? '2026년 3월 13일' : null,
      summary: isCompletedProject 
        ? 'AI 비전 시스템 통합 완료. 자율주행 알고리즘 최적화. 실제 환경 테스트 성공.'
        : 'AI 비전 시스템 통합 진행중. 자율주행 알고리즘 개발 중.',
      content: isCompletedProject ? `최종 시스템 통합 및 최적화를 완료했습니다.

AI 비전 시스템:
- YOLOv5 기반 시간 객체 인식
- 장애물 분류 및 거리 측정
- 동적 환경 대응 알고리즘

자율주행 알고리즘:
- A* 경로 탐색 알고리즘 구현
- 동적 장애물 회피 로직
- PID 제어를 통한 정밀한 모터 제어

음성 인식 시스템:
- Google Speech API 연동
- 한국어 명령어 인식
- 목적지 설정 및 제어 명령 처리

최종 테스트:
- 실내 환경 10회 주행 테스트
- 평균 성공률 92%
- 장애물 회피 정확도 95%` : 'AI 비전 시스템 통합 진행중.',
      images: isCompletedProject ? [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
      ] : [],
    },
  ];

  const questsCompleted = quests.filter(q => q.completed).length;
  const totalQuests = quests.length;
  const projectComplete = questsCompleted === totalQuests;

  const features = [
    {
      icon: Target,
      title: '실시간 장애물 감지 및 회피',
      description: '초음파 센서와 AI 비전을 결합한 360도 장애물 감지',
    },
    {
      icon: Zap,
      title: 'A* 경로 최적',
      description: '목적지까지 최단 경로를 실시간으로 계산',
    },
    {
      icon: MessageCircle,
      title: '음성 명령 제어',
      description: '한국어 음성으로 목적지 설정 및 로봇 제어',
    },
    {
      icon: TrendingUp,
      title: '웹 모니터링',
      description: '실시간 영상 스트리밍 및 상태 모니터링',
    },
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', title: '완성된 로봇 전면' },
    { url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800', title: '로봇 측면 디테일' },
    { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', title: '센서 모듈 구성' },
    { url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800', title: '내부 회로 구성' },
    { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800', title: '실제 주행 테스트' },
    { url: 'https://images.unsplash.com/photo-1581092160607-ee67e4e89ed6?w=800', title: '장애물 회피 시연' },
  ];

  const resources = [
    { icon: Github, title: 'GitHub 저장소', url: 'https://github.com/example/robot', description: '전체 소스코드 및 회로도' },
    { icon: Video, title: '데모 영상', url: 'https://youtube.com/demo', description: '실제 동작 시연 영상' },
    { icon: FileText, title: '기술 문서', url: '#', description: '상세한 제작 가이드 (PDF)' },
    { icon: Code, title: '회로도', url: '#', description: 'Fritzing 회로도 파일' },
  ];

  const relatedProjects = [
    {
      id: '3',
      title: 'ESP32 기반 스마트 화분',
      author: '이개발',
      image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?w=400',
      likes: 289,
      category: 'IoT',
    },
    {
      id: '4',
      title: '3D 프린터 자동 레벨링 시스템',
      author: '박엔지니어',
      image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?w=400',
      likes: 267,
      category: '3D프린팅',
    },
    {
      id: '5',
      title: 'AI 음성인식 스마트 미러',
      author: '최개발',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400',
      likes: 345,
      category: 'AI',
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
            <Link to="/projects" className="hover:text-blue-600 transition-colors">프로젝트</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Contest Project Banner */}
      {isContestProject && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">콘테스트 프로젝트</h3>
                    {projectComplete ? (
                      <Badge className="bg-green-500 text-white border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        완성
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500 text-white border-0">
                        <Clock className="w-3 h-3 mr-1" />
                        진행중
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-purple-100">
                    {project.contestName} • Quest {questsCompleted}/{totalQuests} 완료
                  </p>
                </div>
              </div>
              <Link to={`/contest/${project.contestId}`}>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  콘테스트 페이지 →
                </Button>
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(questsCompleted / totalQuests) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Badges */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Project Type Badge */}
                  {project.projectType === 'personal' ? (
                    <Badge className="bg-blue-600 text-white border-0 text-base px-4 py-1.5">
                      <User className="w-4 h-4 mr-1" />
                      개인 프로젝트
                    </Badge>
                  ) : (
                    <Badge className="bg-purple-600 text-white border-0 text-base px-4 py-1.5">
                      <Trophy className="w-4 h-4 mr-1" />
                      콘테스트 프로젝트
                    </Badge>
                  )}
                  
                  {/* Status Badge */}
                  {project.status === 'completed' ? (
                    <Badge className="bg-green-600 text-white border-0 text-base px-4 py-1.5">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      완료
                    </Badge>
                  ) : project.status === 'in-progress' ? (
                    <Badge className="bg-yellow-600 text-white border-0 text-base px-4 py-1.5">
                      <Clock className="w-4 h-4 mr-1" />
                      진행중
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-500 text-white border-0 text-base px-4 py-1.5">
                      <FileText className="w-4 h-4 mr-1" />
                      초안
                    </Badge>
                  )}
                  
                  {/* Award Badge */}
                  {project.award && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-base px-4 py-1.5">
                      <Trophy className="w-4 h-4 mr-1" />
                      🏆 {project.award}
                    </Badge>
                  )}
                  
                  <Badge variant="outline" className="text-base px-4 py-1.5">{project.category}</Badge>
                </div>

                <h1 className="text-4xl font-bold text-gray-900">
                  {project.title}
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Team and Completion Info for Completed Projects */}
                {isCompletedProject && (
                  <div className="flex flex-wrap gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    {project.teamName && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">팀: {project.teamName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-gray-900">완료: {project.completedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-900">{project.contestName}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Author and Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <Link to={`/maker/${project.authorId}`} onClick={e => e.stopPropagation()} className="flex-shrink-0">
                    <Avatar className="w-12 h-12 ring-2 ring-transparent hover:ring-blue-400 transition-all cursor-pointer">
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                        {project.authorInitial}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{project.author}</h3>
                      <Link
                        to={`/maker/${project.authorId}`}
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full px-2.5 py-0.5 transition-all font-medium"
                      >
                        <User className="w-3 h-3" />
                        마이메이크 방문
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">{project.startDate}에 시작</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{project.likes}</div>
                    <div className="text-xs text-gray-600">좋아요</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{(project.views / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-600">조회</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{project.comments}</div>
                    <div className="text-xs text-gray-600">댓글</div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 mt-6" style={{ aspectRatio: '16/9' }}>
                <ImageWithFallback
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {isCompletedProject && (
                  <div className="absolute top-4 right-4">
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
                      onClick={() => window.open(project.demoVideo, '_blank')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      데모 영상 보기
                    </Button>
                  </div>
                )}
              </div>

              {/* Features Section - Only for Completed Projects */}
              {isCompletedProject && (
                <Card className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    주요 기능
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
                            <p className="text-xs text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Technology Stack - Only for Completed Projects */}
              {isCompletedProject && (
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-purple-600" />
                    사용 기술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} className="bg-purple-100 text-purple-700 border-purple-200 text-sm px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Action Sidebar */}
            <div className="space-y-4">
              <Card className="p-6 space-y-3">
                <Button
                  className={`w-full ${isLiked(project.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                  onClick={() => toggleLike({
                    id: project.id,
                    type: 'project',
                    title: project.title,
                    authorName: project.author,
                    authorInitial: project.authorInitial,
                    contestName: project.contestName,
                    thumbnail: project.mainImage,
                    likedAt: '방금 전',
                  })}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked(project.id) ? 'fill-white' : ''}`} />
                  {isLiked(project.id) ? '좋아요 취소' : '좋아요'}
                </Button>
                <Button
                  variant="outline"
                  className={`w-full ${isSaved(project.id) ? 'bg-yellow-50 border-yellow-400 text-yellow-700 hover:bg-yellow-100' : ''}`}
                  onClick={() => toggleSave({
                    id: project.id,
                    type: 'project',
                    title: project.title,
                    authorName: project.author,
                    authorInitial: project.authorInitial,
                    contestName: project.contestName,
                    thumbnail: project.mainImage,
                    savedAt: '방금 전',
                  })}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isSaved(project.id) ? 'fill-yellow-500' : ''}`} />
                  {isSaved(project.id) ? '저장됨' : '저장하기'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                      .then(() => alert('링크가 복사되었습니다!'))
                      .catch(() => alert('링크: ' + window.location.href));
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  공유하기
                </Button>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-gray-900">프로젝트 링크</h3>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open('https://github.com/example/project', '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub 저장소
                </Button>
                {project.demoVideo && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(project.demoVideo, '_blank')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    시연 영상
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => alert('문서 다운로드 준비 중입니다.')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  문서 다운로드
                </Button>
              </Card>

              {isContestProject && !projectComplete && (
                <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">진행중인 프로젝트</h4>
                        <p className="text-sm text-gray-700 mb-3">
                          Quest {questsCompleted}/{totalQuests} 완료. 
                          다음 단계를 진행하세요.
                        </p>
                      </div>
                    </div>
                    
                    {/* Next Quest Button */}
                    {project.questProgress && project.questProgress < project.totalQuests && (
                      <Link to={`/project/${projectId}/quest/${project.questProgress + 1}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                          <Rocket className="w-4 h-4 mr-2" />
                          Quest {project.questProgress + 1} 진행하기
                        </Button>
                      </Link>
                    )}
                    
                    {/* Edit Project Button */}
                    <Link to={`/project/${projectId}/edit`} className="block">
                      <Button variant="outline" className="w-full border-yellow-300 hover:bg-yellow-100">
                        <Settings className="w-4 h-4 mr-2" />
                        프로젝트 수정
                      </Button>
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue={isContestProject ? "quest-progress" : "story"} className="space-y-8">
          <TabsList className="bg-white border border-gray-200 p-1">
            {isContestProject && (
              <TabsTrigger value="quest-progress" className="px-6">
                <GitBranch className="w-4 h-4 mr-2" />
                Quest 진행 기록
              </TabsTrigger>
            )}
            {isCompletedProject && (
              <TabsTrigger value="gallery" className="px-6">
                <ImageIcon className="w-4 h-4 mr-2" />
                갤러리
              </TabsTrigger>
            )}
            {isCompletedProject && (
              <TabsTrigger value="resources" className="px-6">
                <BookOpen className="w-4 h-4 mr-2" />
                자료실
              </TabsTrigger>
            )}
            <TabsTrigger value="story" className="px-6">프로젝트 스토리</TabsTrigger>
            <TabsTrigger value="build" className="px-6">제작 과정</TabsTrigger>
            <TabsTrigger value="code" className="px-6">코드 & 회로</TabsTrigger>
            <TabsTrigger value="comments" className="px-6">
              댓글
              <Badge className="ml-2 bg-blue-600 text-white">{project.comments}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab - Only for Completed Projects */}
          {isCompletedProject && (
            <TabsContent value="gallery" className="space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-blue-600" />
                  프로젝트 갤러리
                </h2>
                <p className="text-gray-600 mb-6">
                  프로젝트 제작 과정과 최종 결과물을 담은 이미지 갤러리입니다.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {(showAllGallery ? galleryImages : galleryImages.slice(0, 6)).map((img, index) => (
                    <div key={index} className="group relative aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:shadow-xl transition-all">
                      <ImageWithFallback
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-semibold text-sm">{img.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {galleryImages.length > 6 && (
                  <div className="flex justify-center mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAllGallery(!showAllGallery)}
                      className="gap-2"
                    >
                      {showAllGallery ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          접기
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          보기 ({galleryImages.length - 6}개 더)
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </Card>
            </TabsContent>
          )}

          {/* Resources Tab - Only for Completed Projects */}
          {isCompletedProject && (
            <TabsContent value="resources" className="space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  프로젝트 자료실
                </h2>
                <p className="text-gray-600 mb-8">
                  프로젝트를 재현하거나 학습하는데 필요한 모든 자료를 제공합니다.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {resources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                      <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{resource.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                            <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                              <span>다운로드</span>
                              <Download className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Additional Resources */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">오픈소스 프로젝트</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        이 프로젝트는 MIT 라이선스로 공개되어 있어 누구나 자유롭게 사용, 수정, 배포할 수 있습니다.
                        커뮤니티의 기여를 환영합니다!
                      </p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Github className="w-4 h-4 mr-2" />
                        기여하기
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}

          {/* Quest Progress Tab */}
          {isContestProject && (
            <TabsContent value="quest-progress" className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      콘테스트 프로젝트 진행 상황
                    </h3>
                    <p className="text-gray-700 mb-4">
                      이 프로젝트는 <strong>{project.contestName}</strong>을 통해 단계적으로 완성되고 있습니다.
                      각 Quest를 통해 프로젝트가 발전하는 과정을 확인하세요.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-white rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full h-3 transition-all"
                          style={{ width: `${(questsCompleted / totalQuests) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-purple-700">
                        {questsCompleted}/{totalQuests} 완료
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {quests.map((quest, index) => (
                <Card key={quest.id} className={`overflow-hidden ${quest.completed ? 'border-green-300' : 'border-gray-200'}`}>
                  <div className={`p-6 border-b ${quest.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        quest.completed ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        {quest.completed ? <CheckCircle className="w-7 h-7" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{quest.title}</h3>
                        {quest.completed && quest.completedDate && (
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {quest.completedDate}에 완료
                          </p>
                        )}
                      </div>
                      {quest.completed ? (
                        <Badge className="bg-green-600 text-white">완료</Badge>
                      ) : (
                        <Badge className="bg-yellow-500 text-white">진행중</Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">{quest.content}</p>
                    
                    {quest.completed && (
                      <div className="mt-6 grid md:grid-cols-2 gap-4">
                        {quest.images.map((img, i) => (
                          <div key={i} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={img}
                              alt={`Quest ${quest.id} 결과`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              {projectComplete && (
                <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 text-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    🎉 모든 Quest 완료!
                  </h3>
                  <p className="text-gray-700 mb-6">
                    축하합니다! 콘테스트의 모든 단계를 완료하여 프로젝트가 완성되었습니다. 
                    이제 이 프로젝트는 플랫폼의 영구 자산으로 등록되어 다른 메이커들과 공유됩니다.
                  </p>
                  <Link to={`/contest/${project.contestId}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Trophy className="w-4 h-4 mr-2" />
                      콘테스트 페이지로 이동
                    </Button>
                  </Link>
                </Card>
              )}
            </TabsContent>
          )}

          {/* Project Story Tab */}
          <TabsContent value="story">
            <Card className="p-8">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">프로젝트 소개</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  �� 프로젝트는 라즈베리파이 4를 메인 컨트롤러로 사용하는 자율주행 로봇입니다. 
                  OpenCV 라이브러리를 활용하여 실시간 영상 처리를 통한 장애물 인식과 경로 계획을 수행합니.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3">주요 기능</h3>
                <ul className="space-y-2 mb-6 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>실시간 장애물 감지 및 회피</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>A* 알고리즘을 활용한 최적 경로 탐색</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>음성 명령을 통한 목적지 설정</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>웹 인터페이스를 통한 원격 모니터링</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3">사용 기술</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge>Python</Badge>
                  <Badge>OpenCV</Badge>
                  <Badge>TensorFlow</Badge>
                  <Badge>Raspberry Pi</Badge>
                  <Badge>Arduino</Badge>
                  <Badge>ROS</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Build Process Tab */}
          <TabsContent value="build">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">제작 과정</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">1. 하드웨어 조립</h3>
                  <p className="text-gray-700 mb-4">
                    로봇 섀시에 라즈베리파이, 모터 드라이버, 배터리를 장착하고 배선을 정리했습니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="aspect-video bg-gray-100 rounded-lg"></div>
                    <div className="aspect-video bg-gray-100 rounded-lg"></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">2. 센서 통합</h3>
                  <p className="text-gray-700 mb-4">
                    초파 센서와 카메라 모듈을 연결하고 테스트했습니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="aspect-video bg-gray-100 rounded-lg"></div>
                    <div className="aspect-video bg-gray-100 rounded-lg"></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">3. 소프트웨어 개</h3>
                  <p className="text-gray-700 mb-4">
                    장애물 인식 알고리즘과 경로 계획 시스템을 구현했습니다.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">코드 & 회로도</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">주요 코드 스니펫</h3>
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`import cv2
import numpy as np

def detect_obstacles(frame):
    # 장애물 감지 로직
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    return edges

def plan_path(obstacles, target):
    # A* 경로 계획
    # ...
    return path`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">회로도</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg"></div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">댓글 {project.comments}개</h2>
              
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 pb-6 border-b border-gray-200 last:border-0">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        댓
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900">댓글작성자{i}</span>
                        <span className="text-sm text-gray-500">2일 전</span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        정말 멋진 프로젝트네요! 특히 장애물 회피 알고리즘이 인상적입니다.
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4" />
                          좋아요 {12 + i}
                        </button>
                        <button className="text-gray-600 hover:text-blue-600">
                          답글
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="댓글을 입력하세요..."
                  rows={4}
                ></textarea>
                <div className="flex justify-end mt-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    댓글 작성
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Projects Section - Only for Completed Projects */}
      {isCompletedProject && (
        <section className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">관련 프로젝트</h2>
                <p className="text-gray-600">비슷한 기술 스택과 주제의 다른 프로젝트를 둘러보세요</p>
              </div>
              <Link to="/projects">
                <Button variant="outline" className="gap-2">
                  모든 프로젝트 보기
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relProject) => (
                <Link key={relProject.id} to={`/project/${relProject.id}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300">
                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                      <ImageWithFallback
                        src={relProject.image}
                        alt={relProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge className="bg-white text-gray-900 mb-2">{relProject.category}</Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relProject.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                              {relProject.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span>{relProject.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Heart className="w-4 h-4" />
                          <span>{relProject.likes}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}