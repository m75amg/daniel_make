import { useParams, Link } from 'react-router';
import {
  Trophy, Heart, Eye, Rocket, Github, Globe, MapPin,
  ChevronRight, Star, Award, Medal, Crown,
  MessageCircle, Users, Calendar, Cpu, CheckCircle,
  Code, Zap, ArrowRight, Mail, Briefcase, Clock,
  Twitter, Linkedin, Instagram, Youtube, Tag,
  Lock, MessageSquare, ThumbsUp, BookOpen, Share2,
  UserCheck,
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useFollow } from '../context/FollowContext';
import { useState } from 'react';

// ── 공개 설정 타입 (ProfileEditDrawer의 privacy state와 1:1 대응) ──────
interface PrivacySettings {
  profilePublic: boolean;   // 프로필 공개
  showProjects: boolean;    // 프로젝트 목록 공개
  showSkills: boolean;      // 기술 스택 공개
  showActivity: boolean;    // 활동 내역 공개
  showLocation: boolean;    // 위치 정보 공개
  showEmail: boolean;       // 이메일 공개
}

// ── 링크 타입 (ProfileEditDrawer의 links state와 1:1 대응) ──────────────
interface SocialLinks {
  github: string;
  linkedin: string;
  website: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

interface MakerProfile {
  id: string;
  name: string;
  initial: string;
  tagline: string;      // 한 줄 소개
  bio: string;          // 상세 소개
  role: string;         // 역할/직군
  experience: string;   // 경력
  location: string;
  email: string;
  joinDate: string;
  links: SocialLinks;
  stats: {
    projects: number;
    totalLikes: number;
    totalViews: number;
    contestsEntered: number;
    awards: number;
  };
  skills: string[];       // 기술 스택
  interests: string[];    // 관심 분야
  badges: { icon: any; label: string; color: string }[];
  projects: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    status: string;
    type: string;
    likes: number;
    views: number;
    award: string | null;
    contestName: string | null;
  }[];
  contestHistory: {
    contestId: string;
    name: string;
    period: string;
    result: string;
    rank: number | null;
  }[];
  recentActivity: {
    id: string;
    type: 'question' | 'progress' | 'resource' | 'comment';
    title: string;
    projectName: string;
    time: string;
    likes: number;
    comments: number;
  }[];
  // ProfileEditDrawer > 공개 설정 탭의 privacy state와 동일한 구조
  privacy: PrivacySettings;
}

// ── 메이커 데이터베이스 ─────────────────────────────────────────────────
const makerDatabase: Record<string, MakerProfile> = {
  kimmaker: {
    id: 'kimmaker',
    name: '김메이커',
    initial: '김',
    tagline: '로봇공학과 AI를 좋아하는 메이커입니다',      // ProfileEditDrawer & MyMakePage와 일치
    bio: 'ESP32, Arduino, Raspberry Pi를 활용한 IoT 프로젝트와 로봇 제작을 즐깁니다. 오픈소스 커뮤니티에 기여하고 지식을 나누는 것을 좋아합니다.',  // ProfileEditDrawer와 일치
    role: '임베디드 엔지니어',       // ProfileEditDrawer와 일치
    experience: '중급 (3~5년)',      // ProfileEditDrawer select 옵션값과 일치 (수정)
    location: '서울, 대한민국',      // ProfileEditDrawer와 일치 (수정: '서울, 한국' → '서울, 대한민국')
    email: 'kimmaker@example.com',   // ProfileEditDrawer와 일치
    joinDate: '2024년 3월',
    links: {
      github: 'github.com/kimmaker92',          // ProfileEditDrawer github url의 도메인 부분과 일치 (수정: kimmaker → kimmaker92)
      linkedin: 'linkedin.com/in/kimmaker92',   // ProfileEditDrawer와 일치 (수정: 추가)
      website: 'kimmaker.dev',                  // ProfileEditDrawer와 일치 (수정: 추가)
      twitter: '',
      instagram: '',
      youtube: '',
    },
    stats: { projects: 5, totalLikes: 999, totalViews: 14350, contestsEntered: 3, awards: 2 },
    skills: ['Arduino', 'ESP32', 'Python', 'ROS', '3D 프린팅'],  // ProfileEditDrawer와 일치 (수정)
    interests: ['로봇공학', 'AI/ML', 'IoT', '자율주행'],          // ProfileEditDrawer와 일치
    badges: [
      { icon: Trophy, label: '수상자', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
      { icon: Star, label: '인기 메이커', color: 'text-blue-600 bg-blue-50 border-blue-200' },
      { icon: Rocket, label: '콘테스트 완주', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    ],
    projects: [
      {
        id: '1', title: 'AI 음성인식 자율주행 로봇',
        description: '라즈베리파이와 OpenCV로 실내 자율주행이 가능한 배송 로봇',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        category: '로봇공학', status: 'completed', type: 'contest',
        likes: 567, views: 8930, award: '최우수상', contestName: 'AI 로봇 챌린지 2026',
      },
      {
        id: '2', title: '오픈소스 자율주행 로봇',
        description: '라즈베리파이와 AI 비전을 활용한 실내 자율주행 로봇 프로젝트',
        image: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=800',
        category: '로봇공학', status: 'in-progress', type: 'contest',
        likes: 432, views: 5420, award: null, contestName: 'AI 로봇 챌린지 2026',
      },
    ],
    contestHistory: [
      { contestId: 'ai-robot-2026', name: 'AI 로봇 챌린지 2026', period: '2026년 3월', result: '최우수상', rank: 2 },
      { contestId: 'arduino-beginner-2025', name: '아두이노 입문자 대회 2025', period: '2025년 10월', result: '장려상', rank: 5 },
    ],
    recentActivity: [
      { id: 'a1', type: 'progress', title: 'Quest 2 완료! OpenCV 기반 장애물 감지 구현 성공 🎉', projectName: 'AI 음성인식 자율주행 로봇', time: '2일 전', likes: 34, comments: 12 },
      { id: 'a2', type: 'question', title: 'ROS2 Humble에서 SLAM 노드 실행 시 transform 오류 해결 방법', projectName: '오픈소스 자율주행 로봇', time: '5일 전', likes: 18, comments: 7 },
      { id: 'a3', type: 'resource', title: '라즈베리파이 카메라 모듈 v3 최적 설정 가이드 공유', projectName: 'AI 음성인식 자율주행 로봇', time: '1주 전', likes: 56, comments: 4 },
    ],
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: true,
      showLocation: true,
      showEmail: false,
    },
  },
  leedev: {
    id: 'leedev',
    name: '이개발',
    initial: '이',
    tagline: 'IoT와 스마트홈을 즐기는 DIY 메이커',
    bio: 'ESP32와 아두이노로 집 안의 모든 것을 자동화하는 것에 빠져 있습니다. 쉽고 실용적인 IoT 프로젝트를 공유합니다.',
    role: '메이커/취미',
    experience: '초급 (1~3년)',
    location: '부산, 한국',
    email: 'leedev@example.com',
    joinDate: '2024년 7월',
    links: {
      github: 'github.com/leedev',
      linkedin: '',
      website: '',
      twitter: 'twitter.com/leedev_maker',
      instagram: '',
      youtube: '',
    },
    stats: { projects: 3, totalLikes: 289, totalViews: 3210, contestsEntered: 1, awards: 0 },
    skills: ['ESP32', 'Arduino', 'MQTT', 'Node-RED', 'Home Assistant', 'C++'],
    interests: ['IoT', '스마트홈', '자동화', '신재생에너지'],
    badges: [
      { icon: Zap, label: 'IoT 전문가', color: 'text-green-600 bg-green-50 border-green-200' },
      { icon: Code, label: '오픈소스 기여자', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    ],
    projects: [
      {
        id: '3', title: 'ESP32 기반 스마트 화분',
        description: '토양 수분, 온도, 조도를 모니터링하고 자동으로 물을 주는 IoT 화분',
        image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?w=800',
        category: 'IoT', status: 'completed', type: 'personal',
        likes: 289, views: 3210, award: null, contestName: null,
      },
    ],
    contestHistory: [],
    recentActivity: [
      { id: 'b1', type: 'resource', title: 'MQTT 브로커 Mosquitto 설치 및 ESP32 연동 가이드', projectName: 'ESP32 기반 스마트 화분', time: '3일 전', likes: 42, comments: 8 },
      { id: 'b2', type: 'comment', title: '토양 수분 센서 캘리브레이션 팁 댓글 작성', projectName: 'ESP32 기반 스마트 화분', time: '1주 전', likes: 11, comments: 0 },
    ],
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: true,
      showLocation: true,
      showEmail: false,
    },
  },
  parkengineer: {
    id: 'parkengineer',
    name: '박엔지니어',
    initial: '박',
    tagline: '3D 프린팅과 자동화를 연구하는 메이커',
    bio: '기계공학 배경으로 3D 프린팅과 자동화 시스템을 연구합니다. 커뮤니티에서 기술 질문에 답변하는 것을 좋아합니다.',
    role: '하드웨어 엔지니어',
    experience: '고급 (5~10년)',
    location: '대전, 한국',
    email: 'park@example.com',
    joinDate: '2024년 1월',
    links: {
      github: 'github.com/parkengineer',
      linkedin: 'linkedin.com/in/parkengineer',
      website: 'parkengineer.blog',
      twitter: '',
      instagram: '',
      youtube: 'youtube.com/@parkengineer',
    },
    stats: { projects: 4, totalLikes: 267, totalViews: 2890, contestsEntered: 2, awards: 0 },
    skills: ['Fusion 360', 'Arduino', 'FDM 3D Printing', 'Python', 'Marlin', 'AI', 'PCB 설계'],
    interests: ['3D프린팅', '로봇공학', '자동화', '교육 기술'],
    badges: [
      { icon: Star, label: '베스트 답변자', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
      { icon: Users, label: '커뮤니티 기여자', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    ],
    projects: [
      {
        id: '4', title: '3D 프린터 자동 레벨링 시스템',
        description: 'AI 기반 자동 베드 레벨링으로 완벽한 첫 레이어를 만드는 시스템',
        image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?w=800',
        category: '3D프린팅', status: 'in-progress', type: 'personal',
        likes: 267, views: 2890, award: null, contestName: null,
      },
    ],
    contestHistory: [
      { contestId: 'arduino-beginner-2025', name: '아두이노 입문자 대회 2025', period: '2025년 10월', result: '참가', rank: null },
    ],
    recentActivity: [
      { id: 'c1', type: 'question', title: 'Marlin 펌웨어에서 BLTouch 설정 방법 질문 답변', projectName: '3D 프린터 자동 레벨링 시스템', time: '1일 전', likes: 23, comments: 5 },
      { id: 'c2', type: 'progress', title: 'Quest 1 완료: 자동 레벨링 알고리즘 설계 완성', projectName: '3D 프린터 자동 레벨링 시스템', time: '4일 전', likes: 31, comments: 9 },
    ],
    // showActivity, showEmail 비공개 예시
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: false,
      showLocation: true,
      showEmail: false,
    },
  },
  choidev: {
    id: 'choidev',
    name: '최개발',
    initial: '최',
    tagline: 'AI·음성인식 전문 메이커',
    bio: 'AI와 음성 인터페이스를 활용한 스마트홈 기기를 만들고 있습니다. TensorFlow와 Raspberry Pi를 주로 사용합니다.',
    role: 'AI/ML 엔지니어',
    experience: '중급 (3~5년)',
    location: '서울, 한국',
    email: 'choidev@example.com',
    joinDate: '2024년 5월',
    links: {
      github: 'github.com/choidev',
      linkedin: '',
      website: '',
      twitter: '',
      instagram: 'instagram.com/choidev_maker',
      youtube: '',
    },
    stats: { projects: 2, totalLikes: 345, totalViews: 4120, contestsEntered: 1, awards: 1 },
    skills: ['TensorFlow', 'Python', 'Raspberry Pi', 'NLP', '음성인식', 'React'],
    interests: ['AI/ML', '스마트홈', '음성인식', '웨어러블'],
    badges: [
      { icon: Trophy, label: '수상자', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
      { icon: Cpu, label: 'AI 메이커', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    ],
    projects: [
      {
        id: '5', title: 'AI 음성인식 스마트 미러',
        description: '거울에 날씨, 일정, 뉴스를 표시하고 음성으로 제어하는 스마트홈 디스플레이',
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800',
        category: 'AI', status: 'completed', type: 'contest',
        likes: 345, views: 4120, award: '우수상', contestName: '스마트홈 챌린지',
      },
    ],
    contestHistory: [
      { contestId: 'smarthome-2026', name: '스마트홈 챌린지', period: '2026년 2월', result: '우수상', rank: 3 },
    ],
    recentActivity: [
      { id: 'd1', type: 'progress', title: '음성 웨이크워드 인식률 94% 달성! 최적화 과정 공유', projectName: 'AI 음성인식 스마트 미러', time: '3일 전', likes: 67, comments: 15 },
    ],
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: true,
      showLocation: false,   // 위치 비공개 예시
      showEmail: false,
    },
  },
  jungcoder: {
    id: 'jungcoder',
    name: '정코더',
    initial: '정',
    tagline: '기상·환경 센서 전문 메이커',
    bio: '날씨와 환경 데이터를 수집하고 시각화하는 프로젝트를 만들고 있습니다. 아두이노로 시작했지만 지금은 다양한 MCU를 다룹니다.',
    role: '학생/대학원생',
    experience: '입문 (~1년)',
    location: '인천, 한국',
    email: 'jungcoder@example.com',
    joinDate: '2025년 1월',
    links: { github: 'github.com/jungcoder', linkedin: '', website: '', twitter: '', instagram: '', youtube: '' },
    stats: { projects: 1, totalLikes: 45, totalViews: 234, contestsEntered: 0, awards: 0 },
    skills: ['Arduino', 'IoT', '센서', 'Python', 'Data Visualization'],
    interests: ['IoT', '환경', '농업 기술', '교육 기술'],
    badges: [
      { icon: Rocket, label: '새로운 메이커', color: 'text-green-600 bg-green-50 border-green-200' },
    ],
    projects: [
      {
        id: '6', title: '아두이노 기반 날씨 관측소',
        description: '온습도, 기압, 풍향풍속을 측정하고 실시간으로 데이터를 시각화하는 관측 시스템',
        image: 'https://images.unsplash.com/photo-1553408226-42ecf81a214c?w=800',
        category: 'IoT', status: 'draft', type: 'personal',
        likes: 45, views: 234, award: null, contestName: null,
      },
    ],
    contestHistory: [],
    recentActivity: [],
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: true,
      showLocation: true,
      showEmail: true,   // 이메일 공개 예시
    },
  },
  hansoyoung: {
    id: 'hansoyoung',
    name: '한소영',
    initial: '한',
    tagline: 'AI 비전 & 접근성 기술 메이커',
    bio: '수어 번역 AI 카메라로 AI 비전 대회 대상을 수상했습니다. 소외된 분들을 위한 기술에 관심이 많습니다.',
    role: 'AI/ML 엔지니어',
    experience: '중급 (3~5년)',
    location: '서울, 한국',
    email: 'han@example.com',
    joinDate: '2024년 9월',
    links: {
      github: 'github.com/hansoyoung',
      linkedin: 'linkedin.com/in/hansoyoung',
      website: '',
      twitter: '',
      instagram: '',
      youtube: '',
    },
    stats: { projects: 3, totalLikes: 2100, totalViews: 28500, contestsEntered: 1, awards: 1 },
    skills: ['OpenCV', 'MediaPipe', 'Python', 'Raspberry Pi', 'TensorFlow', '접근성'],
    interests: ['AI/ML', '바이오/의료', '교육 기술', '보안'],
    badges: [
      { icon: Crown, label: '대상 수상자', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
      { icon: Heart, label: '사회공헌', color: 'text-red-600 bg-red-50 border-red-200' },
      { icon: Star, label: 'AI 전문가', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    ],
    projects: [
      {
        id: '10', title: '실시간 수어 번역 AI 카메라',
        description: 'OpenCV와 MediaPipe를 활용해 수어를 실시간으로 텍스트와 음성으로 번역하는 라즈베리파이 기반 장치.',
        image: 'https://images.unsplash.com/photo-1755053757912-a63da9d6e0e2?w=800',
        category: 'AI', status: 'completed', type: 'contest',
        likes: 2100, views: 28500, award: '대상', contestName: 'AI 비전 프로젝트 2025',
      },
    ],
    contestHistory: [
      { contestId: 'ai-vision-2025', name: 'AI 비전 프로젝트 2025', period: '2026년 2월', result: '대상', rank: 1 },
    ],
    recentActivity: [
      { id: 'e1', type: 'progress', title: '대상 수상 소감 & 다음 프로젝트 계획 공유', projectName: '실시간 수어 번역 AI 카메라', time: '1주 전', likes: 198, comments: 43 },
      { id: 'e2', type: 'resource', title: 'MediaPipe Hands 랜드마크 좌표 활용 완전 가이드', projectName: '실시간 수어 번역 AI 카메라', time: '2주 전', likes: 134, comments: 22 },
    ],
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: true,
      showLocation: true,
      showEmail: false,
    },
  },
  otaejun: {
    id: 'otaejun',
    name: '오태준',
    initial: '오',
    tagline: '엣지 AI & 농업 기술 메이커',
    bio: 'TensorFlow Lite를 라즈베리파이에 올려 현장에서 동작하는 AI를 만드는 것이 목표입니다. 스마트 농업에 관심이 많습니다.',
    role: 'AI/ML 엔지니어',
    experience: '중급 (3~5년)',
    location: '전주, 한국',
    email: 'ota@example.com',
    joinDate: '2024년 6월',
    links: { github: 'github.com/otaejun', linkedin: '', website: '', twitter: '', instagram: '', youtube: '' },
    stats: { projects: 2, totalLikes: 1450, totalViews: 17200, contestsEntered: 1, awards: 1 },
    skills: ['TensorFlow Lite', 'Python', 'Raspberry Pi', 'Edge AI', 'OpenCV'],
    interests: ['AI/ML', '농업 기술', '환경', 'IoT'],
    badges: [
      { icon: Medal, label: '최우수상', color: 'text-gray-600 bg-gray-50 border-gray-300' },
      { icon: Cpu, label: 'AI 메이커', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    ],
    projects: [
      {
        id: '11', title: '식물 질병 자동 진단 카메라',
        description: 'TensorFlow Lite 기반의 식물 질병 분류 모델을 라즈베리파이에 탑재한 현장용 진단 도구.',
        image: 'https://images.unsplash.com/photo-1630856713958-ba0c27a4ac8f?w=800',
        category: 'AI', status: 'completed', type: 'contest',
        likes: 1450, views: 17200, award: '최우수상', contestName: 'AI 비전 프로젝트 2025',
      },
    ],
    contestHistory: [
      { contestId: 'ai-vision-2025', name: 'AI 비전 프로젝트 2025', period: '2026년 2월', result: '최우수상', rank: 2 },
    ],
    recentActivity: [
      { id: 'f1', type: 'progress', title: '모델 경량화로 추론 속도 3배 향상 성공!', projectName: '식물 질병 자동 진단 카메라', time: '4일 전', likes: 89, comments: 18 },
    ],
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: true,
      showLocation: true,
      showEmail: false,
    },
  },
  shinyerin: {
    id: 'shinyerin',
    name: '신예린',
    initial: '신',
    tagline: 'SLAM & AR 솔로 메이커',
    bio: '솔로로 복잡한 SLAM 알고리즘을 구현해 AI 비전 대회 우수상을 수상했습니다. AR 내비게이션 연구 중입니다.',
    role: '소프트웨어 개발자',
    experience: '초급 (1~3년)',
    location: '대구, 한국',
    email: 'shin@example.com',
    joinDate: '2025년 3월',
    links: {
      github: 'github.com/shinyerin',
      linkedin: '',
      website: 'shinyerin.notion.site',
      twitter: '',
      instagram: '',
      youtube: '',
    },
    stats: { projects: 1, totalLikes: 980, totalViews: 11400, contestsEntered: 1, awards: 1 },
    skills: ['SLAM', 'AR', 'Computer Vision', 'Python', 'ROS', 'OpenCV'],
    interests: ['AI/ML', '자율주행', '게임/엔터테인먼트', '우주/항공'],
    badges: [
      { icon: Award, label: '우수상', color: 'text-orange-600 bg-orange-50 border-orange-200' },
      { icon: Star, label: '솔로 챔피언', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    ],
    projects: [
      {
        id: '12', title: 'AR 기반 실내 네비게이션 시스템',
        description: 'SLAM 알고리즘과 컴퓨터 비전을 결합해 건물 내 AR 길 안내를 구현한 모바일 앱.',
        image: 'https://images.unsplash.com/photo-1537151028327-9ab072f24b41?w=800',
        category: 'AR/VR', status: 'completed', type: 'contest',
        likes: 980, views: 11400, award: '우수상', contestName: 'AI 비전 프로젝트 2025',
      },
    ],
    contestHistory: [
      { contestId: 'ai-vision-2025', name: 'AI 비전 프로젝트 2025', period: '2026년 2월', result: '우수상', rank: 3 },
    ],
    recentActivity: [
      { id: 'g1', type: 'question', title: 'ORB-SLAM3 초기화 실패 시 재시도 전략은?', projectName: 'AR 기반 실내 네비게이션 시스템', time: '6일 전', likes: 29, comments: 11 },
    ],
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: true,
      showLocation: true,
      showEmail: false,
    },
  },
  kimminjun: {
    id: 'kimminjun',
    name: '김민준',
    initial: '김',
    tagline: '아두이노 & 수경재배 IoT 메이커',
    bio: '아두이노 입문자 대회 대상 수상자입니다. 농업과 IoT를 결합한 스마트팜에 관심이 많습니다.',
    role: '학생/대학원생',
    experience: '입문 (~1년)',
    location: '수원, 한국',
    email: 'minjun@example.com',
    joinDate: '2025년 7월',
    links: { github: 'github.com/kimminjun', linkedin: '', website: '', twitter: '', instagram: '', youtube: '' },
    stats: { projects: 1, totalLikes: 1240, totalViews: 15800, contestsEntered: 1, awards: 1 },
    skills: ['Arduino', 'IoT', '스마트팜', 'Sensor', 'C++', 'MQTT'],
    interests: ['IoT', '농업 기술', '환경', '신재생에너지'],
    badges: [
      { icon: Crown, label: '대상 수상자', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
      { icon: Zap, label: 'IoT 전문가', color: 'text-green-600 bg-green-50 border-green-200' },
    ],
    projects: [
      {
        id: '1', title: '스마트 수경재배 자동화 시스템',
        description: '아두이노와 센서를 활용한 완전 자동화된 수경재배 시스템. 온도·습도·pH를 실시간 모니터링.',
        image: 'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=800',
        category: 'IoT', status: 'completed', type: 'contest',
        likes: 1240, views: 15800, award: '대상', contestName: '아두이노 입문자 대회 2025',
      },
    ],
    contestHistory: [
      { contestId: 'arduino-beginner-2025', name: '아두이노 입문자 대회 2025', period: '2026년 1월', result: '대상', rank: 1 },
    ],
    recentActivity: [
      { id: 'h1', type: 'progress', title: '대상 수상! 수경재배 pH 자동 조절 시스템 완성 후기', projectName: '스마트 수경재배 자동화 시스템', time: '2주 전', likes: 203, comments: 51 },
    ],
    privacy: {
      profilePublic: true,
      showProjects: true,
      showSkills: true,
      showActivity: true,
      showLocation: true,
      showEmail: false,
    },
  },
};

// ── 헬퍼 ────────────────────────────────────────────────────────────────
const statusConfig: Record<string, { label: string; className: string }> = {
  completed: { label: '완료', className: 'bg-green-100 text-green-700' },
  'in-progress': { label: '진행중', className: 'bg-yellow-100 text-yellow-700' },
  draft: { label: '초안', className: 'bg-gray-100 text-gray-600' },
};

const activityTypeConfig = {
  progress: { label: '진행공유', icon: Share2, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  question: { label: '질문', icon: MessageSquare, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  resource: { label: '자료공유', icon: BookOpen, color: 'text-green-600 bg-green-50 border-green-200' },
  comment: { label: '댓글', icon: MessageCircle, color: 'text-gray-600 bg-gray-50 border-gray-200' },
};

// ── 컴포넌트 ─────────────────────────────────────────────────────────────
export function PublicMakerProfilePage() {
  const { makerId } = useParams();
  const { isFollowing, followMaker, unfollowMaker } = useFollow();

  const maker = makerId ? makerDatabase[makerId] : null;

  // ── 프로필 자체가 비공개인 경우 ─────────────────────────────────────
  if (!maker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">메이커를 찾을 수 없습니다</h2>
          <p className="text-gray-500 mb-4">존재하지 않는 프로필이거나 탈퇴한 사용자입니다.</p>
          <Link to="/projects" className="text-blue-600 hover:underline text-sm">프로젝트 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  if (!maker.privacy.profilePublic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">비공개 프로필입니다</h2>
          <p className="text-sm text-gray-500 mb-4">이 메이커는 프로필을 비공개로 설정했습니다.</p>
          <Link to="/projects" className="text-blue-600 hover:underline text-sm">프로젝트 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const { privacy, links } = maker;

  // 활성화된 SNS 링크 목록
  const activeSocialLinks = [
    links.github && { icon: Github, label: 'GitHub', url: `https://${links.github}`, color: 'text-gray-800' },
    links.linkedin && { icon: Linkedin, label: 'LinkedIn', url: `https://${links.linkedin}`, color: 'text-blue-700' },
    links.website && { icon: Globe, label: '웹사이트', url: `https://${links.website}`, color: 'text-green-600' },
    links.twitter && { icon: Twitter, label: 'Twitter', url: `https://${links.twitter}`, color: 'text-sky-500' },
    links.instagram && { icon: Instagram, label: 'Instagram', url: `https://${links.instagram}`, color: 'text-pink-500' },
    links.youtube && { icon: Youtube, label: 'YouTube', url: `https://${links.youtube}`, color: 'text-red-600' },
  ].filter(Boolean) as { icon: any; label: string; url: string; color: string }[];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/projects" className="hover:text-blue-600 transition-colors">프로젝트</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">{maker.name}의 마이메이크</span>
          </div>
        </div>
      </div>

      {/* ── 프로필 헤더 ── */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

            {/* 아바타 */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center shadow-2xl">
                <span className="text-5xl font-bold text-white">{maker.initial}</span>
              </div>
              {maker.stats.awards > 0 && (
                <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center shadow-lg">
                  <Trophy className="w-4 h-4 text-yellow-900" />
                </div>
              )}
            </div>

            {/* 기본 정보 */}
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-3xl font-bold mb-1">{maker.name}</h1>
                {/* 한 줄 소개 (tagline) */}
                <p className="text-lg text-white/90">{maker.tagline}</p>
              </div>

              {/* 역할/직군 + 경력 — 기본 정보 탭에서 설정 */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-sm font-medium">
                  <Briefcase className="w-3.5 h-3.5" />
                  {maker.role}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-sm font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {maker.experience}
                </span>
              </div>

              {/* 메타: 위치(showLocation), 가입일, 이메일(showEmail) */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                {/* showLocation 공개 설정에 따라 조건부 표시 */}
                {privacy.showLocation && maker.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />{maker.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />{maker.joinDate} 가입
                </span>
                {/* showEmail 공개 설정에 따라 조건부 표시 */}
                {privacy.showEmail && maker.email && (
                  <a href={`mailto:${maker.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />{maker.email}
                  </a>
                )}
              </div>

              {/* SNS 링크 — 링크 & SNS 탭에서 설정한 링크들 (모두 표시) */}
              {activeSocialLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  {activeSocialLinks.map(({ icon: Icon, label, url, color }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      title={label}
                      className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{label}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* 뱃지 */}
              {maker.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {maker.badges.map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                      <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {badge.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              {maker && (
                <button
                  onClick={() => {
                    if (isFollowing(maker.id)) {
                      unfollowMaker(maker.id);
                    } else {
                      followMaker({
                        id: maker.id,
                        name: maker.name,
                        initial: maker.initial,
                        tagline: maker.tagline,
                        role: maker.role,
                      });
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${
                    isFollowing(maker.id)
                      ? 'bg-white/20 border-2 border-white text-white hover:bg-red-500/30 hover:border-red-300'
                      : 'bg-white text-purple-700 hover:bg-gray-100'
                  }`}
                >
                  {isFollowing(maker.id)
                    ? <><UserCheck className="w-4 h-4" />팔로잉 ✓</>
                    : <><Users className="w-4 h-4" />팔로우</>
                  }
                </button>
              )}
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                <MessageCircle className="w-4 h-4" />
                메시지
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 통계 바 ── */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
            {[
              { label: '프로젝트', value: maker.stats.projects, icon: Rocket, color: 'text-blue-600' },
              { label: '총 좋아요', value: maker.stats.totalLikes.toLocaleString(), icon: Heart, color: 'text-red-500' },
              { label: '총 조회', value: maker.stats.totalViews.toLocaleString(), icon: Eye, color: 'text-gray-500' },
              { label: '콘테스트 참가', value: maker.stats.contestsEntered, icon: Trophy, color: 'text-purple-600' },
              { label: '수상', value: maker.stats.awards, icon: Star, color: 'text-yellow-500' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 본문 ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── 왼쪽: 소개 / 기술·관심사 / 콘테스트 이력 ── */}
          <div className="space-y-6">

            {/* 상세 소개 (bio) — 기본 정보 탭에서 설정 */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                소개
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{maker.bio}</p>
            </Card>

            {/* 기술 스택 & 관심 분야 — showSkills 공개 설정에 따라 표시 */}
            {privacy.showSkills ? (
              <Card className="p-6 space-y-5">
                {/* 기술 스택 */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    기술 스택
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {maker.skills.map((skill) => (
                      <Badge key={skill} className="bg-purple-50 text-purple-700 border border-purple-200 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 관심 분야 — 기술 & 관심사 탭에서 설정 */}
                {maker.interests.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-green-600" />
                      관심 분야
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {maker.interests.map((interest) => (
                        <Badge key={interest} className="bg-green-50 text-green-700 border border-green-200 text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-6 flex items-center gap-3 text-gray-400 border-dashed">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">이 메이커는 기술 스택을 비공개로 설정했습니다.</p>
              </Card>
            )}

            {/* 콘테스트 이력 */}
            {maker.contestHistory.length > 0 && (
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  콘테스트 이력
                </h3>
                <div className="space-y-3">
                  {maker.contestHistory.map((contest, i) => (
                    <Link key={i} to={`/contest/${contest.contestId}`}>
                      <div className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                              {contest.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{contest.period}</p>
                          </div>
                          <Badge className={`flex-shrink-0 text-xs font-bold ${
                            contest.result === '대상' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                            contest.result === '최우수상' ? 'bg-gray-100 text-gray-700 border-gray-300' :
                            contest.result === '우수상' ? 'bg-orange-100 text-orange-700 border-orange-300' :
                            contest.result === '장려상' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                            'bg-gray-100 text-gray-500 border-gray-200'
                          }`}>
                            {contest.rank && `${contest.rank}위 · `}{contest.result}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* ── 오른쪽: 프로젝트 / 활동 내역 / 뱃지 ── */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="projects">
              <TabsList className="bg-white border border-gray-200 p-1 mb-6">
                {/* showProjects 설정에 따라 탭 표시 */}
                {privacy.showProjects && (
                  <TabsTrigger value="projects" className="px-5">
                    <Rocket className="w-4 h-4 mr-2" />
                    프로젝트 ({maker.projects.length})
                  </TabsTrigger>
                )}
                {/* showActivity 설정에 따라 탭 표시 */}
                {privacy.showActivity && (
                  <TabsTrigger value="activity" className="px-5">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    활동 내역 ({maker.recentActivity.length})
                  </TabsTrigger>
                )}
                <TabsTrigger value="achievements" className="px-5">
                  <Star className="w-4 h-4 mr-2" />
                  뱃지 & 업적
                </TabsTrigger>
              </TabsList>

              {/* ── 프로젝트 탭 — showProjects 공개 설정에 따라 */}
              {privacy.showProjects ? (
                <TabsContent value="projects" className="space-y-5">
                  {maker.projects.length === 0 ? (
                    <Card className="p-12 text-center">
                      <Rocket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">아직 공개된 프로젝트가 없습니다.</p>
                    </Card>
                  ) : (
                    maker.projects.map((project) => {
                      const statusCfg = statusConfig[project.status] || statusConfig.draft;
                      return (
                        <Link key={project.id} to={`/project/${project.id}`}>
                          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                            <div className="flex flex-col sm:flex-row">
                              <div className="relative w-full sm:w-52 h-40 sm:h-auto flex-shrink-0 overflow-hidden bg-gray-100">
                                <ImageWithFallback
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {project.award && (
                                  <div className="absolute top-3 left-3">
                                    <Badge className="bg-yellow-500 text-white border-0 text-xs shadow-md">
                                      🏆 {project.award}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 p-5 flex flex-col justify-between">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">{project.category}</Badge>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusCfg.className}`}>{statusCfg.label}</span>
                                    {project.type === 'contest' && (
                                      <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                                        <Trophy className="w-3 h-3 mr-1" />콘테스트
                                      </Badge>
                                    )}
                                  </div>
                                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
                                  {project.contestName && (
                                    <p className="text-xs text-purple-600 font-medium">
                                      <Trophy className="w-3 h-3 inline mr-1" />
                                      {project.contestName}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-400" />{project.likes.toLocaleString()}</span>
                                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{project.views.toLocaleString()}</span>
                                  </div>
                                  <span className="flex items-center gap-1 text-sm text-blue-600 font-medium group-hover:gap-2 transition-all">
                                    프로젝트 보기 <ArrowRight className="w-4 h-4" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })
                  )}
                </TabsContent>
              ) : (
                <TabsContent value="projects">
                  <Card className="p-12 text-center border-dashed">
                    <Lock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium mb-1">프로젝트 목록이 비공개입니다</p>
                    <p className="text-sm text-gray-400">이 메이커는 프로젝트 목록을 비공개로 설정했습니다.</p>
                  </Card>
                </TabsContent>
              )}

              {/* ── 활동 내역 탭 — showActivity 공개 설정에 따라 */}
              {privacy.showActivity && (
                <TabsContent value="activity" className="space-y-4">
                  {maker.recentActivity.length === 0 ? (
                    <Card className="p-12 text-center">
                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">아직 커뮤니티 활동이 없습니다.</p>
                    </Card>
                  ) : (
                    maker.recentActivity.map((activity) => {
                      const typeCfg = activityTypeConfig[activity.type] || activityTypeConfig.comment;
                      const TypeIcon = typeCfg.icon;
                      return (
                        <Card key={activity.id} className="p-5 hover:shadow-md transition-all cursor-pointer group">
                          <div className="flex items-start gap-4">
                            {/* 타입 아이콘 */}
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${typeCfg.color}`}>
                              <TypeIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={`text-xs font-medium border ${typeCfg.color}`}>
                                  {typeCfg.label}
                                </Badge>
                                <span className="text-xs text-gray-400">{activity.time}</span>
                              </div>
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                {activity.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                프로젝트: {activity.projectName}
                              </p>
                            </div>
                            {/* 반응 수 */}
                            <div className="flex items-center gap-3 text-xs text-gray-400 flex-shrink-0">
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-3.5 h-3.5" />{activity.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3.5 h-3.5" />{activity.comments}
                              </span>
                            </div>
                          </div>
                        </Card>
                      );
                    })
                  )}
                </TabsContent>
              )}

              {/* ── 뱃지 & 업적 탭 ── */}
              <TabsContent value="achievements">
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      획득한 뱃지
                    </h3>
                    {maker.badges.length === 0 ? (
                      <p className="text-sm text-gray-500">아직 획득한 뱃지가 없습니다.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {maker.badges.map((badge, i) => {
                          const Icon = badge.icon;
                          return (
                            <div key={i} className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center ${badge.color}`}>
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.color}`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <span className="text-sm font-semibold">{badge.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      활�� 요약
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: '제출한 프로젝트', value: maker.stats.projects, icon: Rocket, color: 'bg-blue-100 text-blue-700' },
                        { label: '받은 좋아요', value: maker.stats.totalLikes.toLocaleString(), icon: Heart, color: 'bg-red-100 text-red-700' },
                        { label: '콘테스트 참가', value: maker.stats.contestsEntered, icon: Trophy, color: 'bg-purple-100 text-purple-700' },
                        { label: '수상 횟수', value: maker.stats.awards, icon: Award, color: 'bg-yellow-100 text-yellow-700' },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className={`flex items-center gap-3 p-4 rounded-xl ${item.color}`}>
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <div>
                              <div className="text-xl font-bold">{item.value}</div>
                              <div className="text-xs opacity-80">{item.label}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* 공개 설정 상태 표시 — 방문자에게 어떤 정보가 공개/비공개인지 명시 */}
                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        이 메이커의 공개 설정
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: '프로젝트', active: privacy.showProjects },
                          { label: '기술 스택', active: privacy.showSkills },
                          { label: '활동 내역', active: privacy.showActivity },
                          { label: '위치 정보', active: privacy.showLocation },
                          { label: '이메일', active: privacy.showEmail },
                        ].map(({ label, active }) => (
                          <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                            active ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                          }`}>
                            {active
                              ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                              : <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                            }
                            {label} {active ? '공개' : '비공개'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}