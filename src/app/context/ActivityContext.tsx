import { createContext, useContext, useState, ReactNode } from 'react';

export type ActivityItemType = 'project' | 'question' | 'progress' | 'teammate' | 'resource';

export interface ActivityItem {
  id: string;
  type: ActivityItemType;
  title: string;
  authorName: string;
  authorInitial: string;
  projectName?: string;
  contestName?: string;
  thumbnail?: string;
  likedAt?: string;
  savedAt?: string;
}

interface ActivityContextValue {
  likedItems: ActivityItem[];
  savedItems: ActivityItem[];
  toggleLike: (item: ActivityItem) => void;
  toggleSave: (item: ActivityItem) => void;
  isLiked: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  likeCount: number;
  saveCount: number;
}

const ActivityContext = createContext<ActivityContextValue | null>(null);

// 초기 샘플 데이터 (이미 좋아요/저장한 항목들)
const initialLikedItems: ActivityItem[] = [
  {
    id: 'ext-proj-1',
    type: 'project',
    title: 'Raspberry Pi 기반 얼굴인식 출입통제 시스템',
    authorName: '이개발',
    authorInitial: '이',
    projectName: 'AI 보안 시스템',
    contestName: 'AI 로봇 챌린지 2026',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    likedAt: '1일 전',
  },
  {
    id: 'ext-comm-1',
    type: 'progress',
    title: 'BLDC 모터 FOC 제어 구현 완료! 효율 40% 향상 달성',
    authorName: '박엔지니어',
    authorInitial: '박',
    projectName: '드론 자율비행 프로젝트',
    likedAt: '3일 전',
  },
  {
    id: 'ext-comm-2',
    type: 'resource',
    title: 'ROS2 Humble 완전 정복 가이드 (설치~실전 예제)',
    authorName: '최로봇',
    authorInitial: '최',
    likedAt: '5일 전',
  },
];

const initialSavedItems: ActivityItem[] = [
  {
    id: 'ext-proj-2',
    type: 'project',
    title: 'STM32 기반 실시간 음성 처리 보드',
    authorName: '김임베디드',
    authorInitial: '김',
    projectName: 'DSP 오디오 프로세서',
    contestName: 'IoT 이노베이션 챌린지',
    thumbnail: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400',
    savedAt: '2일 전',
  },
  {
    id: 'ext-comm-3',
    type: 'question',
    title: 'FreeRTOS에서 태스크 간 데이터 동기화 방법 질문',
    authorName: '정메이커',
    authorInitial: '정',
    projectName: 'ESP32 스마트홈',
    savedAt: '4일 전',
  },
  {
    id: 'ext-comm-4',
    type: 'resource',
    title: 'KiCad 6.0 PCB 설계 핵심 팁 모음',
    authorName: '한회로',
    authorInitial: '한',
    savedAt: '1주 전',
  },
  {
    id: 'ext-comm-5',
    type: 'teammate',
    title: 'ROS2 네비게이션 스택 전문가 구합니다 (6축 로봇 팔)',
    authorName: '이엔지니어',
    authorInitial: '이',
    projectName: '6축 로봇 팔 제어 시스템',
    contestName: 'AI 로봇 챌린지 2026',
    savedAt: '1주 전',
  },
];

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [likedItems, setLikedItems] = useState<ActivityItem[]>(initialLikedItems);
  const [savedItems, setSavedItems] = useState<ActivityItem[]>(initialSavedItems);

  const isLiked = (id: string) => likedItems.some(item => item.id === id);
  const isSaved = (id: string) => savedItems.some(item => item.id === id);

  const toggleLike = (item: ActivityItem) => {
    setLikedItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [{ ...item, likedAt: '방금 전' }, ...prev]
    );
  };

  const toggleSave = (item: ActivityItem) => {
    setSavedItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [{ ...item, savedAt: '방금 전' }, ...prev]
    );
  };

  return (
    <ActivityContext.Provider
      value={{
        likedItems,
        savedItems,
        toggleLike,
        toggleSave,
        isLiked,
        isSaved,
        likeCount: likedItems.length,
        saveCount: savedItems.length,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivity must be used within ActivityProvider');
  return ctx;
}
