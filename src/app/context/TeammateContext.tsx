import { createContext, useContext, useState, ReactNode } from 'react';

// ─── 모집 글 (내가 올린) ────────────────────────────────────────────
export interface TeammatePost {
  id: string;
  title: string;
  projectId?: string;
  projectTitle?: string;
  contestName?: string;
  roles: string[];
  postedAt: string;
  deadline: string;
  status: 'recruiting' | 'closed';
}

// ─── 지원서 (내 모집 글에 들어온) ──────────────────────────────────
export interface TeammateApplication {
  id: string;
  postId: string;
  applicantName: string;
  applicantInitial: string;
  message: string;
  skills: string[];
  portfolio?: string;
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

// ─── 내가 신청한 지원 현황 ─────────────────────────────────────────
export interface MyApplication {
  id: string;           // TeammateApplication id와 동일
  postId: string;
  postTitle: string;
  recruiterName: string;
  recruiterInitial: string;
  projectTitle?: string;
  contestName?: string;
  roles: string[];
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  statusUpdatedAt?: string;
  isStatusRead: boolean;  // 내가 상태 변화를 확인했는지
}

// ─── 모집자 → 나에게 오는 알림 (지원서 들어왔을 때) ────────────────
export interface TeammateNotification {
  id: string;
  postId: string;
  postTitle: string;
  applicationId: string;
  applicantName: string;
  applicantInitial: string;
  isRead: boolean;
  createdAt: string;
}

// ─── Context 타입 ──────────────────────────────────────────────────
interface TeammateContextValue {
  // 모집자 관점
  posts: TeammatePost[];
  applications: TeammateApplication[];
  notifications: TeammateNotification[];       // 내 모집 글에 지원 알림
  unreadCount: number;
  addPost: (post: Omit<TeammatePost, 'id' | 'postedAt'>) => string;
  addApplication: (app: Omit<TeammateApplication, 'id' | 'appliedAt' | 'status'> & {
    postTitle: string;
    recruiterName: string;
    recruiterInitial: string;
    projectTitle?: string;
    contestName?: string;
    roles: string[];
  }) => void;
  acceptApplication: (appId: string) => void;
  rejectApplication: (appId: string) => void;
  markNotificationRead: (notifId: string) => void;
  markAllRead: () => void;
  getApplicationsForPost: (postId: string) => TeammateApplication[];

  // 지원자 관점
  myApplications: MyApplication[];
  myAppUnreadCount: number;                    // 내 지원 상태 변화 미확인 수
  markMyAppRead: (appId: string) => void;
  markAllMyAppsRead: () => void;
}

// ─── 초기 데이터 ───────────────────────────────────────────────────
const initialPosts: TeammatePost[] = [
  {
    id: '7',
    title: '드론 자율비행 프로젝트 - 하드웨어 엔지니어 구합니다',
    projectId: '7',
    projectTitle: 'AI 기반 농업용 드론',
    contestName: '스마트 농업 테크 콘테스트 2026',
    roles: ['하드웨어', '임베디드'],
    postedAt: '2026-03-15T09:00:00',
    deadline: 'D-15',
    status: 'recruiting',
  },
];

const initialApplications: TeammateApplication[] = [
  {
    id: 'app-1',
    postId: '7',
    applicantName: '김엔지니어',
    applicantInitial: '김',
    message: '안녕하세요! 드론 프로젝트 5년차 하드웨어 엔지니어입니다. Pixhawk 기반 자율비행 드론 개발 경험이 있고, 센서 통합과 캘리브레이션에 익숙합니다.',
    skills: ['Pixhawk', '센서 통합', 'PCB 설계'],
    portfolio: 'github.com/kimengineer',
    appliedAt: '2일 전',
    status: 'pending',
  },
  {
    id: 'app-2',
    postId: '7',
    applicantName: '이개발',
    applicantInitial: '이',
    message: '임베디드 시스템과 센서 개발 경력 7년 있습니다. IMU와 GPS 센서 노이즈 필터링 전문입니다.',
    skills: ['임베디드', '센서', 'C/C++'],
    portfolio: 'linkedin.com/in/leedev',
    appliedAt: '1일 전',
    status: 'pending',
  },
];

const initialNotifications: TeammateNotification[] = [
  {
    id: 'notif-1',
    postId: '7',
    postTitle: '드론 자율비행 프로젝트 - 하드웨어 엔지니어 구합니다',
    applicationId: 'app-1',
    applicantName: '김엔지니어',
    applicantInitial: '김',
    isRead: false,
    createdAt: '2시간 전',
  },
  {
    id: 'notif-2',
    postId: '7',
    postTitle: '드론 자율비행 프로젝트 - 하드웨어 엔지니어 구합니다',
    applicationId: 'app-2',
    applicantName: '이개발',
    applicantInitial: '이',
    isRead: false,
    createdAt: '1일 전',
  },
];

// 내가 신청한 기존 샘플 (다른 사람 모집 글에 지원한 이력)
const initialMyApplications: MyApplication[] = [
  {
    id: 'my-app-1',
    postId: 'ext-1',
    postTitle: 'AI 스마트 미러 프로젝트 - 백엔드 개발자 구합니다',
    recruiterName: '최메이커',
    recruiterInitial: '최',
    projectTitle: 'AI 스마트 미러',
    contestName: 'AI 로봇 챌린지 2026',
    roles: ['백엔드', '개발자'],
    appliedAt: '3일 전',
    status: 'accepted',
    statusUpdatedAt: '1일 전',
    isStatusRead: false,
  },
  {
    id: 'my-app-2',
    postId: 'ext-2',
    postTitle: 'ESP32 스마트홈 - UI/UX 디자이너 모집',
    recruiterName: '박메이커',
    recruiterInitial: '박',
    projectTitle: 'ESP32 스마트홈 시스템',
    roles: ['디자이너'],
    appliedAt: '5일 전',
    status: 'rejected',
    statusUpdatedAt: '2일 전',
    isStatusRead: false,
  },
  {
    id: 'my-app-3',
    postId: 'ext-3',
    postTitle: '로봇 팔 제어 프로젝트 - 임베디드 엔지니어 모집',
    recruiterName: '이엔지니어',
    recruiterInitial: '이',
    projectTitle: '6축 로봇 팔 제어 시스템',
    contestName: 'AI 로봇 챌린지 2026',
    roles: ['임베디드', '하드웨어'],
    appliedAt: '1주 전',
    status: 'pending',
    isStatusRead: true,
  },
];

// ─── Context ───────────────────────────────────────────────────────
const TeammateContext = createContext<TeammateContextValue | null>(null);

export function TeammateProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<TeammatePost[]>(initialPosts);
  const [applications, setApplications] = useState<TeammateApplication[]>(initialApplications);
  const [notifications, setNotifications] = useState<TeammateNotification[]>(initialNotifications);
  const [myApplications, setMyApplications] = useState<MyApplication[]>(initialMyApplications);

  // ── 모집 글 추가 ───────────────────────────────────────────────
  const addPost = (post: Omit<TeammatePost, 'id' | 'postedAt'>): string => {
    const id = `post-${Date.now()}`;
    setPosts(prev => [{ ...post, id, postedAt: new Date().toISOString() }, ...prev]);
    return id;
  };

  // ── 지원서 제출 (다른 사람 모집 글에 지원) ───────────────────
  const addApplication = (app: Omit<TeammateApplication, 'id' | 'appliedAt' | 'status'> & {
    postTitle: string;
    recruiterName: string;
    recruiterInitial: string;
    projectTitle?: string;
    contestName?: string;
    roles: string[];
  }) => {
    const appId = `app-${Date.now()}`;

    // 모집자 쪽 지원서 목록에 추가
    const newApp: TeammateApplication = {
      id: appId,
      postId: app.postId,
      applicantName: app.applicantName,
      applicantInitial: app.applicantInitial,
      message: app.message,
      skills: app.skills,
      portfolio: app.portfolio,
      appliedAt: '방금 전',
      status: 'pending',
    };
    setApplications(prev => [newApp, ...prev]);

    // 모집자 알림 생성
    const post = posts.find(p => p.id === app.postId);
    const notif: TeammateNotification = {
      id: `notif-${Date.now()}`,
      postId: app.postId,
      postTitle: app.postTitle ?? post?.title ?? '팀원 모집 글',
      applicationId: appId,
      applicantName: app.applicantName,
      applicantInitial: app.applicantInitial,
      isRead: false,
      createdAt: '방금 전',
    };
    setNotifications(prev => [notif, ...prev]);

    // 내 지원 현황에도 추가
    const myApp: MyApplication = {
      id: appId,
      postId: app.postId,
      postTitle: app.postTitle,
      recruiterName: app.recruiterName,
      recruiterInitial: app.recruiterInitial,
      projectTitle: app.projectTitle,
      contestName: app.contestName,
      roles: app.roles,
      appliedAt: '방금 전',
      status: 'pending',
      isStatusRead: true, // 내가 방금 보낸 것이므로 이미 읽음
    };
    setMyApplications(prev => [myApp, ...prev]);
  };

  // ── 수락 (모집자 액션) → 지원자 상태 업데이트 ───────────────
  const acceptApplication = (appId: string) => {
    setApplications(prev =>
      prev.map(a => a.id === appId ? { ...a, status: 'accepted' as const } : a)
    );
    // 내 지원 현황에서도 status 변경 + 미읽음 처리
    setMyApplications(prev =>
      prev.map(a =>
        a.id === appId
          ? { ...a, status: 'accepted' as const, statusUpdatedAt: '방금 전', isStatusRead: false }
          : a
      )
    );
  };

  // ── 거절 (모집자 액션) → 지원자 상태 업데이트 ───────────────
  const rejectApplication = (appId: string) => {
    setApplications(prev =>
      prev.map(a => a.id === appId ? { ...a, status: 'rejected' as const } : a)
    );
    setMyApplications(prev =>
      prev.map(a =>
        a.id === appId
          ? { ...a, status: 'rejected' as const, statusUpdatedAt: '방금 전', isStatusRead: false }
          : a
      )
    );
  };

  // ── 알림 읽음 처리 ─────────────────────────────────────────
  const markNotificationRead = (notifId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notifId ? { ...n, isRead: true } : n)
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markMyAppRead = (appId: string) => {
    setMyApplications(prev =>
      prev.map(a => a.id === appId ? { ...a, isStatusRead: true } : a)
    );
  };

  const markAllMyAppsRead = () => {
    setMyApplications(prev => prev.map(a => ({ ...a, isStatusRead: true })));
  };

  const getApplicationsForPost = (postId: string) =>
    applications.filter(a => a.postId === postId);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const myAppUnreadCount = myApplications.filter(a => !a.isStatusRead).length;

  return (
    <TeammateContext.Provider
      value={{
        posts,
        applications,
        notifications,
        unreadCount,
        addPost,
        addApplication,
        acceptApplication,
        rejectApplication,
        markNotificationRead,
        markAllRead,
        getApplicationsForPost,
        myApplications,
        myAppUnreadCount,
        markMyAppRead,
        markAllMyAppsRead,
      }}
    >
      {children}
    </TeammateContext.Provider>
  );
}

export function useTeammate() {
  const ctx = useContext(TeammateContext);
  if (!ctx) throw new Error('useTeammate must be used within TeammateProvider');
  return ctx;
}
