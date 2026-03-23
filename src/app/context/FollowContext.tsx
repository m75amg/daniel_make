import { createContext, useContext, useState, ReactNode } from 'react';

// ── 팔로우한 메이커의 최신 업데이트 항목 ─────────────────────────────
export type UpdateType = 'project' | 'progress' | 'question' | 'resource' | 'award';

export interface MakerUpdate {
  id: string;
  type: UpdateType;
  title: string;
  projectName?: string;
  time: string;
  isNew: boolean; // 팔로우 이후 아직 확인 안 한 업데이트
}

// ── 팔로우된 메이커 데이터 ────────────────────────────────────────────
export interface FollowedMaker {
  id: string;
  name: string;
  initial: string;
  tagline: string;
  role: string;
  followedAt: string;
  updates: MakerUpdate[];
}

// ── Context 인터페이스 ────────────────────────────────────────────────
interface FollowContextValue {
  followedMakers: FollowedMaker[];
  followMaker: (maker: Omit<FollowedMaker, 'followedAt' | 'updates'>) => void;
  unfollowMaker: (makerId: string) => void;
  isFollowing: (makerId: string) => boolean;
  followCount: number;
  totalNewUpdates: number;
  markUpdatesRead: (makerId: string) => void;
  markAllUpdatesRead: () => void;
}

const FollowContext = createContext<FollowContextValue | null>(null);

// ── 메이커별 mock 업데이트 피드 (팔로우 시 표시될 최신 활동) ──────────
const MAKER_UPDATES: Record<string, MakerUpdate[]> = {
  leedev: [
    { id: 'lu-1', type: 'resource', title: 'MQTT 브로커 Mosquitto 설치 및 ESP32 연동 완전 가이드', projectName: 'ESP32 기반 스마트 화분', time: '3일 전', isNew: true },
    { id: 'lu-2', type: 'progress', title: 'Quest 3 완료! 자동 급수 알고리즘 최종 안정화', projectName: 'ESP32 기반 스마트 화분', time: '1주 전', isNew: false },
  ],
  parkengineer: [
    { id: 'pu-1', type: 'question', title: 'Marlin 2.1에서 BLTouch probe 오프셋 세팅 방법 질문 답변 완료', projectName: '3D 프린터 자동 레벨링 시스템', time: '1일 전', isNew: true },
    { id: 'pu-2', type: 'progress', title: 'Quest 1 완료: AI 기반 레벨링 알고리즘 설계 및 검증', projectName: '3D 프린터 자동 레벨링 시스템', time: '4일 전', isNew: true },
  ],
  choidev: [
    { id: 'cu-1', type: 'progress', title: '웨이크워드 인식률 94% 달성! 핵심 최적화 과정 전체 공유', projectName: 'AI 음성인식 스마트 미러', time: '3일 전', isNew: true },
    { id: 'cu-2', type: 'project', title: 'AI 음성인식 스마트 미러 v2.0 업데이트 — 다국어 지원 추가', projectName: 'AI 음성인식 스마트 미러', time: '2주 전', isNew: false },
  ],
  hansoyoung: [
    { id: 'hu-1', type: 'award', title: 'AI 비전 프로젝트 2025 🏆 대상 수상!', projectName: '실시간 수어 번역 AI 카메라', time: '1주 전', isNew: true },
    { id: 'hu-2', type: 'resource', title: 'MediaPipe Hands 랜드마크 좌표 활용 완전 가이드 (한국어)', projectName: '실시간 수어 번역 AI 카메라', time: '2주 전', isNew: false },
  ],
  otaejun: [
    { id: 'ou-1', type: 'progress', title: '모델 경량화로 추론 속도 3배 향상 성공! 상세 과정 공유', projectName: '식물 질병 자동 진단 카메라', time: '4일 전', isNew: true },
  ],
  shinyerin: [
    { id: 'su-1', type: 'question', title: 'ORB-SLAM3 초기화 실패 시 재시도 전략은? — 답변 8개 달림', projectName: 'AR 기반 실내 네비게이션', time: '6일 전', isNew: true },
    { id: 'su-2', type: 'award', title: 'AI 비전 프로젝트 2025 🥉 우수상 수상 후기', projectName: 'AR 기반 실내 네비게이션', time: '2주 전', isNew: false },
  ],
  kimminjun: [
    { id: 'mu-1', type: 'award', title: '아두이노 입문자 대회 2025 🏆 대상 수상 소감 및 개발 후기', projectName: '스마트 수경재배 자동화 시스템', time: '2주 전', isNew: true },
    { id: 'mu-2', type: 'resource', title: 'pH 센서 캘리브레이션 완전 정복 — 아두이노 코드 공개', projectName: '스마트 수경재배 자동화 시스템', time: '3주 전', isNew: false },
  ],
  jungcoder: [
    { id: 'ju-1', type: 'progress', title: '아두이노 날씨 관측소 — BME280 기압 센서 연동 성공!', projectName: '아두이노 기반 날씨 관측소', time: '5일 전', isNew: true },
  ],
};

// ── Provider ───────────────────────────────────────────────────────────
export function FollowProvider({ children }: { children: ReactNode }) {
  const [followedMakers, setFollowedMakers] = useState<FollowedMaker[]>([]);

  const isFollowing = (makerId: string) =>
    followedMakers.some(m => m.id === makerId);

  const followMaker = (maker: Omit<FollowedMaker, 'followedAt' | 'updates'>) => {
    if (isFollowing(maker.id)) return;
    const updates = MAKER_UPDATES[maker.id] ?? [];
    setFollowedMakers(prev => [
      {
        ...maker,
        followedAt: '방금 전',
        updates,
      },
      ...prev,
    ]);
  };

  const unfollowMaker = (makerId: string) => {
    setFollowedMakers(prev => prev.filter(m => m.id !== makerId));
  };

  const markUpdatesRead = (makerId: string) => {
    setFollowedMakers(prev =>
      prev.map(m =>
        m.id === makerId
          ? { ...m, updates: m.updates.map(u => ({ ...u, isNew: false })) }
          : m
      )
    );
  };

  const markAllUpdatesRead = () => {
    setFollowedMakers(prev =>
      prev.map(m => ({
        ...m,
        updates: m.updates.map(u => ({ ...u, isNew: false })),
      }))
    );
  };

  const totalNewUpdates = followedMakers.reduce(
    (sum, m) => sum + m.updates.filter(u => u.isNew).length,
    0
  );

  return (
    <FollowContext.Provider
      value={{
        followedMakers,
        followMaker,
        unfollowMaker,
        isFollowing,
        followCount: followedMakers.length,
        totalNewUpdates,
        markUpdatesRead,
        markAllUpdatesRead,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const ctx = useContext(FollowContext);
  if (!ctx) throw new Error('useFollow must be used within FollowProvider');
  return ctx;
}
