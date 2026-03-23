import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useTeammate } from '../context/TeammateContext';
import { useActivity } from '../context/ActivityContext';
import {
  ChevronRight, UserPlus, Clock, Users, Calendar, Eye, Target,
  CheckCircle, Handshake, MessageSquare as MessageSquareIcon, Share2,
  Send, Lightbulb, AlertCircle, Briefcase, Video, Mail, Link2,
  Bookmark, Rocket, ThumbsUp, MessageCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Textarea } from '../components/ui/textarea';
import { ResourceDetailView } from '../components/ResourceDetailView';
import { ProgressDetailView } from '../components/ProgressDetailView';
import { QuestionDetailView } from '../components/QuestionDetailView';

export function CommunityActivityDetailPage() {
  const params = useParams();
  const activityId = params.activityId;
  const navigate = useNavigate();
  const { addApplication } = useTeammate();
  const { toggleLike, toggleSave, isLiked, isSaved } = useActivity();
  const [newComment, setNewComment] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applyMessage, setApplyMessage] = useState('');
  const [applySkills, setApplySkills] = useState('');
  const [applyPortfolio, setApplyPortfolio] = useState('');
  const [applySubmitted, setApplySubmitted] = useState(false);

  // Mock data - activityId에 따라 다른 타입 반환
  const getActivityData = () => {
    // ID 10, 11, 12는 자료공유
    if (['10', '11', '12'].includes(activityId || '')) {
      return {
        id: activityId || '10',
        type: 'resource' as const,
        title: 'ESP32 개발 완벽 가이드 - 공식 문서부터 실전 예제까지',
        author: {
          name: '박자료',
          initial: '박',
          projects: 22,
          contributions: 89,
        },
        project: {
          id: '1',
          name: 'IoT 스마트 화분 시스템',
          category: 'IoT',
          status: 'Quest 3 진행중',
          image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
        },
        contest: {
          id: '1',
          name: 'IoT 혁신 챌린지 2026',
        },
        questNumber: 2,
        questTitle: 'Quest 2: 센서 데이터 수집 및 전송',
        status: 'recommended' as const,
        
        // 자료공유 전용 필드
        description: `ESP32 프로젝트를 시작하는 분들을 위한 완벽한 학습 자료 모음입니다. 
        
공식 문서부터 실전 예제, 유튜브 강의, 그리고 검증된 GitHub 프로젝트까지 단계별로 정리했습니다. 

저도 처음에 ESP32를 배울 때 자료가 너무 많아서 어디서부터 시작해야 할지 막막했는데, 이 순서대로 학습하니 체계적으로 배울 수 있었습니다.`,

        whyHelpful: `**이 자료가 도움되는 이유:**

1. **단계별 학습 경로**: 기초부터 고급까지 체계적으로 정리
2. **한국어 자료 위주**: 초보자도 쉽게 이해할 수 있는 한글 자료 우선
3. **검증된 자료만 선별**: 제가 직접 학습하고 프로젝트에 적용해본 자료만 포함
4. **최신 업데이트**: 2024년 기준 최신 ESP32-S3, C3 등 신규 모델 포함

특히 WiFi, Bluetooth, MQTT, HTTP 통신 예제는 바로 복사해서 사용할 수 있을 정도로 완성도가 높습니다.`,

        usefulFor: `**어떤 Quest에 유용한가요?**

✅ **Quest 1 - 하드웨어 설정**: 개발 환경 설정, 보드 선택 가이드
✅ **Quest 2 - 센서 연결**: ADC, I2C, SPI 통신 예제
✅ **Quest 3 - 네트워크 통신**: WiFi, MQTT, HTTP 클라이언트/서버 예제
✅ **Quest 4 - 전력 관리**: Deep Sleep, 배터리 최적화 가이드

**어떤 단계에서 보면 좋을까요?**
- ESP32를 처음 시작하는 단계
- 센서 통신이 안 되어 막힌 단계
- WiFi/MQTT 연결 구현 단계
- 전력 소모를 줄여야 하는 단계`,

        cautions: `**참고할 때 주의사항:**

⚠️ **보드 버전 확인**: ESP32, ESP32-S2, S3, C3 등 모델별로 일부 기능이 다름
⚠️ **라이브러리 버전**: Arduino IDE 사용 시 ESP32 보드 매니저 버전 확인 필수
⚠️ **전압 주의**: 3.3V 로직 레벨이므로 5V 센서 연결 시 레벨 시프터 필요
⚠️ **핀 제약사항**: 일부 핀은 부팅 시 특수 용도로 사용되므로 피해야 함 (GPIO 0, 2, 15 등)

**추천 학습 순서:**
1단계: 공식 문서로 기본 개념 파악
2단계: 한국어 블로그로 실습 진행  
3단계: GitHub 예제로 실전 적용
4단계: YouTube 강의로 심화 학습`,

        resources: [
          {
            type: 'docs',
            title: 'ESP32 공식 문서 (영문)',
            description: 'Espressif 공식 문서 - 가장 정확하고 완벽한 레퍼런스',
            url: 'https://docs.espressif.com/projects/esp-idf/en/latest/',
            thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
            tags: ['공식문서', '필수', '영문'],
          },
          {
            type: 'github',
            title: 'ESP32 Arduino Examples',
            description: '100개 이상의 검증된 Arduino 예제 코드 모음',
            url: 'https://github.com/espressif/arduino-esp32',
            thumbnail: 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=400',
            tags: ['GitHub', 'Arduino', '예제'],
            stars: '12.5k',
          },
          {
            type: 'youtube',
            title: 'ESP32 완벽 가이드 강의 (한글)',
            description: '생활코딩 스타일의 체계적인 한글 강의 시리즈',
            url: 'https://www.youtube.com/watch?v=example',
            thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
            tags: ['YouTube', '한글', '초보자'],
            duration: '3시간 20분',
          },
          {
            type: 'blog',
            title: 'ESP32 MQTT 통신 완벽 정리',
            description: '실제 IoT 프로젝트에 바로 적용 가능한 MQTT 예제',
            url: 'https://blog.example.com/esp32-mqtt',
            thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
            tags: ['블로그', 'MQTT', '실전'],
          },
          {
            type: 'pdf',
            title: 'ESP32 핀맵 및 회로도 (PDF)',
            description: 'ESP32 DevKit 핀 배치 및 회로도 상세 문서',
            url: '#',
            size: '2.4 MB',
            tags: ['PDF', '회로도', '핀맵'],
          },
          {
            type: 'github',
            title: 'ESP32 센서 라이브러리 모음',
            description: 'DHT22, BMP280, MPU6050 등 주요 센서 라이브러리',
            url: 'https://github.com/example/esp32-sensors',
            thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
            tags: ['센서', '라이브러리'],
            stars: '3.2k',
          },
        ],

        images: [
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
          'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        ],

        stats: {
          views: 456,
          likes: 89,
          comments: 24,
          bookmarks: 142,
          downloads: 67,
        },
        createdAt: '2024-03-16T15:20:00',
      };
    }

    // ID 7, 8, 9는 팀원찾기
    if (['7', '8', '9'].includes(activityId || '')) {
      return {
        id: activityId || '7',
        type: 'teammate' as const,
        title: '드론 자율비 프로젝트 - 하드웨어 엔지니어 구합니다',
        author: {
          name: '임메이커',
          initial: '임',
          projects: 15,
          contributions: 67,
        },
        project: {
          id: '7',
          name: 'AI 기반 농업용 드론',
          category: '드론/하드웨어',
          status: 'Quest 1 진행중',
          image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400',
        },
        contest: {
          id: '2',
          name: '스마트 농업 테크 콘테스트 2026',
        },
        questNumber: 2,
        questTitle: 'Quest 2: 자율비행 시스템 구축',
        status: 'recruiting' as const,
        deadline: 'D-15',
        
        // 팀원찾기 전용 필드
        projectIntro: '농작물 생육 상태를 자동으로 모니터링하고, AI로 병충해를 탐지하는 농업용 드론을 개발하고 있습니다. 현재 소프트웨어 개발은 완료되었으나, 하드웨어 통합 및 최적화에 어려움을 겪고 있어 전문가의 도움이 필요합니다.',
        
        currentStage: 'Quest 1에서 소프트웨어 시스템(이미지 분석 AI, 비행 경로 알고리즘)을 완성했고, 현재 Quest 2에서 실제 드론 하드웨어와 통합하는 단계입니다. 프로토타입 제작을 위한 부품은 모두 확보했으나, 회로 설계와 센서 통합에 전문성이 필요합니다.',
        
        helpNeeded: `**구체적으로 필요한 도움:**
- 드론 비행 제어 보드(Flight Controller) 선택 및 설정
- GPS, 고도계, IMU 센서 통합 및 캘리브레이션
- 카메라 모듈과 라즈베리파이 연결 최적화
- 배터리 관리 시스템(BMS) 설계
- 모터 제어 및 ESC 설정

**특히 중요한 부분:**
드론이 자율비행 중 안정적으로 작동하려면 센서 데이터의 정확도가 매우 중요합니다. 센서 노이즈 필터링과 칼만 필터 적용 경험 있으신 분이면 더욱 좋습니다.`,

        roles: [
          {
            title: '하드웨어 엔지니어',
            description: '드론 하드웨어 설계 및 센서 통합',
            skills: ['회로 설계', '센서 통합', 'PCB 설계'],
            isMain: true,
          },
          {
            title: '임베디드 개발자 (선택)',
            description: '비행 제어 펌웨어 최적화',
            skills: ['C/C++', 'RTOS', '펌웨어'],
            isMain: false,
          },
        ],

        duration: '2-3주 (Quest 2 마감까지)',
        
        collaborationMethod: `**협업 방식:**
- 주 2-3회 온라인 미팅 (Zoom, Discord)
- 주말 1회 오프라인 작업 (서울 강남 메이커스페이스)
- GitHub를 통한 코드/설계 공유
- Notion으로 진행 상황 공유

**제공 가능한 것:**
- 모든 필요한 부품 및 장비 제공
- 메이커스페이스 이용료 지원
- 프로젝트 완료 시 포트폴리오용 자료 제공
- 콘테스트 상 시 상금 공유`,

        contactMethod: `**연락 방법:**
- Make 2.0 메시지
- 이메일: dronemaker@example.com
- 오픈 카톡방: [참여하기 버튼 클릭 시 공유]

먼저 간단히 자기소개와 관련 경험을 메시지로 보내주시면, 화상 미팅으로 자세히 이야기 나눠보겠습니다!`,

        stats: {
          views: 189,
          likes: 34,
          comments: 12,
          bookmarks: 28,
          applicants: 3,
        },
        createdAt: '2024-03-17T09:00:00',
      };
    }

    // ID 4, 5, 6은 진행공유
    if (['4', '5', '6'].includes(activityId || '')) {
      return {
        id: activityId || '4',
        type: 'progress' as const,
        title: 'Quest 2 료! 음성 인식 모듈 통합 성공 🎉',
        author: {
          name: '최메이커',
          initial: '최',
          projects: 8,
          contributions: 32,
        },
        project: {
          id: '4',
          name: 'AI 스마트 미러',
          category: 'AI/IoT',
          status: 'Quest 2 완료',
          image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400',
        },
        contest: {
          id: '1',
          name: 'AI 로봇 챌린지 2026',
        },
        questNumber: 2,
        questTotal: 3,
        questTitle: 'Quest 2: 음성 인식 및 응답 시스템 구축',
        status: 'completed' as const,
        
        // 진행공유 전용 필드
        whatIDid: `이번 Quest에서는 스마트 미러에 음성 인식 기능을 통합하는 작업을 진행했습니다.

**주요 작업 내용:**
- Google Speech-to-Text API 연동
- 한국어 음성 명령어 파싱 로직 구현
- Wake Word 감지 기능 추가 ("거울아" 호출어 설정)
- 마이크 배치 최적화 및 노이즈 캔슬링

**기술 스택:**
- Google Cloud Speech API
- Python 3.9
- PyAudio for 마이크 입력
- 라즈베리파이 4B (4GB RAM)`,

        completed: [
          '✅ Google Cloud 프로젝트 생성 및 API 키 발급',
          '✅ Speech-to-Text API 연동 및 테스트',
          '✅ 실시간 오디오 스트리밍 파이프라인 구축',
          '✅ Wake Word 감지 알고리즘 구현',
          '✅ 한국어 명령어 인식률 테스트 (목표: 90% 이상)',
          '✅ 마이크 위치 최적화 (거울 상단 중앙 배치)',
          '✅ 노이즈 필터링 구현 (배경 소음 제거)',
          '✅ 응답 속도 최적화 (평균 0.8초 내)',
        ],

        challenges: `**주요 이슈: 인식률이 처에 60%대에 불과했습니다**

원인을 분석한 결과:
1. 마이크 위치 문제: 거울 하단에 있어서 소리가 명확하게 들리지 않음
2. 배경 소음: 에어컨 소리 등이 계속 지됨
3. API 언어 설정: 처음에는 'ko-KR'만 설정했는데, 'en-US'도 함께 설정해야 했음

**해결 방법:**
- 마이크를 거울 상단 중앙으로 이동 → 70%로 상승
- Noise Gate 필터 적용 → 80%로 상승
- 명령어 사전 훈련 및 컨텍스트 힌트 추가 → 90%로 상승

특히 Google Speech API의 \`speech_contexts\` 파라미터를 활용해서 자주 사용하는 명령어("날씨", "뉴스", "일정" 등)의 인식률을 크게 높일 수 있었습니다.`,

        nextSteps: `**Quest 3 준비 작업:**
1. ~~음성 응답 TTS 시스템 구축~~ (착수 완료)
2. 날씨, 뉴스 등 외부 API 연동
3. 일정 관리 기능 구현
4. UI 개선 및 애니메이션 추가

**추가 개선 계획:**
- 다중 사용자 음성 인식 (가족 구성원별 프로필)
- 감정 인식 기능 연구 중
- 오프라인 모드 대비 로컬 음성 인식 엔진 검토`,

        images: [
          'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          'https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=800',
        ],
        
        links: [
          {
            type: 'github',
            title: 'GitHub Commit: Voice Recognition Integration',
            url: 'https://github.com/example/smart-mirror',
            description: 'Quest 2 완료 커밋',
          },
          {
            type: 'docs',
            title: 'Google Speech API 한국어 최적화 가이드',
            url: 'https://cloud.google.com/speech-to-text',
            description: '참고한 공식 문서',
          },
        ],

        stats: {
          views: 234,
          likes: 56,
          comments: 18,
          bookmarks: 23,
        },
        createdAt: '2024-03-18T14:30:00',
      };
    }

    // 기본은 질문 타입
    return {
      id: activityId || '1',
      type: 'question' as const,
      title: 'ESP32에서 MQTT 연결이 계속 끊기는데 해결 방법 있나요?',
      questionType: 'technical', // 질문 유형 추가
      content: `안녕하세요, IoT 프로젝트를 진행 중인데 ESP32에서 MQTT 브로커로 연결할 때 계속 끊기는 문제가 발���합니다.

## 현재 상황
- ESP32-DevKitC 보드 사용 중
- WiFi는 안정적으로 연결됨
- MQTT 브로커는 Mosquitto 사용 (로컬 서버)
- 약 5-10분마다 연결이 끊어짐

## 시도해본 것들
1. Keep-alive 시간을 60초로 설정
2. QoS 레벨을 0, 1, 2 두 시도
3. WiFi 재연결 코드 추가

## 코드
\`\`\`cpp
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client")) {
      Serial.println("connected");
      client.subscribe("home/sensor");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
\`\`\`

어떤 부분을 개선하면 좋을까요?`,
      // 구조화된 질문 내용 추가
      currentWork: 'Quest 2에서 ESP32와 MQTT 브로커를 연결하는 작업을 하고 있습니다. AWS IoT Core를 사용 중입니다. 센서 데이터를 5초마다 전송해야 하는 상황입니다.',
      problem: 'Wi-Fi 연결은 정상인데 MQTT 브로커로의 연결이 5-10분마다 자동으로 끊깁니다. 연결이 끊 때 Error code -2가 계속 발생하며, 재연결 시도는 성공하지만 다시 끊기는 현상이 반복됩니다.',
      attempts: `1. Keep-alive 시간을 기본 15초에서 60초로 늘려봤습니다
2. QoS 레벨을 0, 1, 2로 각각 시도해봤습니다
3. WiFi 재연결 코드를 추가했습니다
4. MQTT 브로커 로그를 확인했지만 특별한 오류가 없었습니다
5. 다른 MQTT 클라이언트(PC)로 테스트했을 때는 문제가 없었습니다`,
      helpNeeded: '연결이 끊기는 근본적인 원인을 찾고 싶습니다. ESP32 설정이나 코드에서 놓친 부분이 있는지 확인 부탁드립니다. 히 전력 관리나 WiFi 설정 관련해서 조언해주시면 감사하겠습니다.',
      author: {
        name: '김메이커',
        initial: '김',
        projects: 12,
        contributions: 45,
      },
      project: {
        id: '1',
        name: 'IoT 스마트 화분 시스템',
        category: 'IoT',
        image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
      },
      contest: {
        id: '1',
        name: 'IoT 혁신 챌린지 2026',
      },
      questNumber: 2,
      questTitle: 'Quest 2: 센서 데이터 수집 및 전송',
      status: 'open' as const,
      tags: ['ESP32', 'MQTT', 'IoT', 'WiFi'],
      stats: {
        views: 145,
        likes: 23,
        answers: 8,
        bookmarks: 12,
      },
      createdAt: '2024-03-15T10:30:00',
      images: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      ],
      attachments: [
        {
          name: 'esp32_mqtt_config.ino',
          type: 'code',
          size: '2.4 KB',
        },
      ],
    };
  };

  const activity = getActivityData();

  // Mock applicants for teammate type
  const applicants = [
    {
      id: '1',
      author: {
        name: '김엔지니어',
        initial: '김',
      },
      message: '안녕하세요! 드론 프로젝트 5년차 하드웨어 엔지니어입니다. Pixhawk 기반 자율비행 드론 개발 경험이 있고, 센서 통합과 캘리브레이션에 익숙합니다. 농업용 드론이라는 주제가 매력적이어서 꼭 참여하고 싶습니다.',
      skills: ['Pixhawk', '센서 통합', 'PCB 설계'],
      portfolio: 'github.com/kimengineer',
      createdAt: '2일 전',
      status: 'pending',
    },
    {
      id: '2',
      author: {
        name: '이개발',
        initial: '이',
      },
      message: '드론 하드웨어 경험은 많지 않지만, 임베디드 시스템과 센서 개발 경력이 7년 있습니다. 특히 IMU와 GPS 센서 노이즈 필터링 전문입니다. 새로운 분야 도전하고 싶어 지원합니다!',
      skills: ['임베디드', '센서', 'C/C++'],
      portfolio: 'linkedin.com/in/leedev',
      createdAt: '1일 전',
      status: 'pending',
    },
    {
      id: '3',
      author: {
        name: '박메이커',
        initial: '박',
      },
      message: '취미로 드론 제작해온 메이커입니다. 상업용 경험은 없지만 다양한 Flight Controller 사용해봤고, 열정과 시간은 충분합니다. 함께 배우며 성장하고 싶습니다.',
      skills: ['드론 제작', 'Arduino', '열정'],
      portfolio: 'instagram.com/parkmaker',
      createdAt: '5시간 전',
      status: 'pending',
    },
  ];

  // Mock comments
  const teammateComments = [
    {
      id: '1',
      author: {
        name: '정메이커',
        initial: '정',
      },
      content: '좋은 프로젝트네요! 저는 드론 전문가는 아니지만, 농업 분야에 관심이 많습니다. 혹시 데이터 분석이나 AI 쪽 도움도 필요하시면 연락주세요.',
      createdAt: '1일 전',
      likes: 5,
    },
    {
      id: '2',
      author: {
        name: '최엔지니어',
        initial: '최',
      },
      content: '배터리 관리 시스템 관련해서 팁 드리면, LiPo 배터리 사용 시 voltage divider로 각 셀 전압을 모니터링하는 게 중요합니다. 추천 칩셋은 TI의 BQ76920입니다.',
      createdAt: '12시간 전',
      likes: 8,
    },
  ];

  const progressComments = [
    {
      id: '1',
      author: {
        name: '박엔지니어',
        initial: '박',
      },
      content: '인식률 90% 정말 대단하네요! 저도 음성 인식 프로젝트 해봤는데 70%에서 막혔었거든요. speech_contexts 팁 정말 유용합니다 👍',
      createdAt: '1시간 전',
      likes: 12,
    },
    {
      id: '2',
      author: {
        name: '이메이커',
        initial: '이',
      },
      content: '마이크 위치 바꿔서 인식률 올린 부분이 인상적이에요. 저도 비슷한 문제 겪고 있는데 참고하겠습니다!',
      createdAt: '2시간 전',
      likes: 8,
    },
    {
      id: '3',
      author: {
        name: '정개발',
        initial: '정',
      },
      content: `노이즈 필터링은 어떤 라이브러리 사용하셨나요? 저는 webrtcvad 써봤는데 라즈베리파이에서 좀 무거워서.`,
      createdAt: '3시간 전',
      likes: 5,
    },
  ];

  const resourceComments = [
    {
      id: '1',
      author: {
        name: '김개발',
        initial: '김',
      },
      content: '이 자료 정말 유용했어요! ESP32 시작할 때 이 자료 먼저 봤으면 헤매지 않았을 텐데요. 특히 한국어 블로그 모음이 너무 좋습니다. 감사합니다!',
      createdAt: '5시간 전',
      likes: 23,
    },
    {
      id: '2',
      author: {
        name: '이메이커',
        initial: '이',
      },
      content: '저도 비슷한 자료 모음 만들고 있는데 이 리스트 참고하겠니다. 추가로 ESP32 공식 포럼도 유용하더라고요: https://esp32.com/',
      createdAt: '8시간 전',
      likes: 15,
    },
    {
      id: '3',
      author: {
        name: '박엔지니어',
        initial: '박',
      },
      content: 'Quest 2에서 MQTT 통신 구현할 때 이 자료 덕분에 2일 만에 완료했습니다. 특히 GitHub 예제 코드가 바로 적용 가능해서 좋았어요.',
      createdAt: '1일 전',
      likes: 18,
    },
    {
      id: '4',
      author: {
        name: '최코더',
        initial: '최',
      },
      content: '한 가지 추가하자면, ESP32-C3 사용하시는 분들 라이브러리 버전 2.0.14 이상 사용하셔야 안정적입니다. 저는 이거 몰라서 한참 헤맸네요 ㅠㅠ',
      createdAt: '2일 전',
      likes: 12,
    },
  ];

  const questionAnswers = [
    {
      id: '1',
      author: {
        name: '박엔지니어',
        initial: '박',
        isExpert: true,
      },
      content: `WiFi와 MQTT 연결이 동시에 관리되야 합니다. 제 경험상 이 문제는 보통 두 가지 원인이 있습니다:

1. **WiFi 연결 불안정**: ESP32의 WiFi가 간헐적으로 끊어지면 MQTT도 끊어집니다.
2. **MQTT Keep-alive 설정 문제**: 브로커와 클라이언트의 Keep-alive 시간이 맞지 않을 수 있습니다.

아래 코드를 참해보세요:

\`\`\`cpp
void setup() {
  // WiFi 파워 세이빙 모드 끄기
  WiFi.setSleep(false);
  
  // MQTT 설정
  client.setServer(mqtt_server, 1883);
  client.setKeepAlive(90); // 90초로 설정
  client.setSocketTimeout(30);
}

void loop() {
  // WiFi 상태 체크
  if (WiFi.status() != WL_CONNECTED) {
    reconnectWiFi();
  }
  
  // MQTT 상태 체크
  if (!client.connected()) {
    reconnect();
  }
  
  client.loop();
}
\`\`\`

특히 \`WiFi.setSleep(false)\` 설정이 중요합니다!`,
      createdAt: '2024-03-15T11:45:00',
      likes: 34,
      isHelpful: true,
      replies: 2,
    },
  ];

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      console.log('댓글 등록:', newComment);
      setNewComment('');
    }
  };

  const handleApply = () => {
    if (applyMessage.trim()) {
      const skills = applySkills.split(',').map(s => s.trim()).filter(Boolean);
      addApplication({
        postId: activityId ?? '7',
        applicantName: '나 (현재 사용자)',
        applicantInitial: '나',
        message: applyMessage,
        skills: skills.length > 0 ? skills : ['기타'],
        portfolio: applyPortfolio || undefined,
        // 내 지원 현황용 추가 필드
        postTitle: activity.title,
        recruiterName: activity.author.name,
        recruiterInitial: activity.author.initial,
        projectTitle: activity.project?.name,
        contestName: activity.contest?.name,
        roles: activity.type === 'teammate' ? (activity.roles?.map((r: any) => r.title) ?? []) : [],
      });
      setApplySubmitted(true);
      setApplyMessage('');
      setApplySkills('');
      setApplyPortfolio('');
      setShowApplyForm(false);
    }
  };

  // 팀원찾기 타입 렌더링
  if (activity.type === 'teammate') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/community" className="hover:text-blue-600 transition-colors">커뮤니티</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">팀원찾기</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card className="p-6">
                {/* Type & Status Badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <UserPlus className="w-3 h-3 mr-1" />
                    팀원찾기
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-700 border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.deadline} 마감
                  </Badge>
                  {activity.status === 'recruiting' && (
                    <Badge className="bg-blue-100 text-blue-700 border-0">
                      모집중
                    </Badge>
                  )}
                  {activity.questNumber && (
                    <Badge variant="outline">Quest {activity.questNumber}</Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {activity.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-green-100 text-green-700 font-semibold text-sm">
                        {activity.author.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{activity.author.name}</div>
                      <div className="text-xs text-gray-500">
                        프로젝트 {activity.author.projects} · 기여 {activity.author.contributions}
                      </div>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>1일 전 작성</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{activity.stats.views} 조회</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">{activity.stats.applicants}명 지원</span>
                  </div>
                </div>

                {/* Connected Project */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900">협업할 프로젝트</span>
                  </div>
                  <Link 
                    to={`/project/${activity.project.id}`}
                    className="font-bold text-green-600 hover:underline block mb-1"
                  >
                    {activity.project.name}
                  </Link>
                  {activity.questTitle && (
                    <div className="text-sm text-gray-700 mb-2">
                      {activity.questTitle}
                    </div>
                  )}
                  {activity.contest && (
                    <Badge variant="outline" className="text-xs">
                      {activity.contest.name}
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6 border-t border-gray-200">
                  {applySubmitted ? (
                    <div className="col-span-3 flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-green-800">참여 신청이 완료되었습니다!</p>
                        <p className="text-xs text-green-600">모집자가 검토 후 수락/거절 알림을 드립니다.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => setShowApplyForm(!showApplyForm)}
                      >
                        <Handshake className="w-4 h-4 mr-2" />
                        참여 의사 있습니다
                      </Button>
                      <Button variant="outline">
                        <MessageSquareIcon className="w-4 h-4 mr-2" />
                        질문하기
                      </Button>
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        공유하기
                      </Button>
                    </>
                  )}
                </div>
              </Card>

              {/* Apply Form */}
              {showApplyForm && !applySubmitted && (
                <Card className="p-6 border-2 border-green-200 bg-green-50">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-green-600" />
                    참여 신청하기
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    자기소개와 함께 어떤 역할로 기여할 수 있는지 작성해주세요. 신청 후 모집자의 My Make에 알림이 전송됩니다.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        자기소개 및 기여 내용 <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        placeholder="예: 안녕하세요! 드론 하드웨어 설계 경력 3년차 엔지니어입니다. Pixhawk 기반 드론 개발 경험이 있고, 센서 통합 작업을 주로 해왔습니다..."
                        value={applyMessage}
                        onChange={(e) => setApplyMessage(e.target.value)}
                        className="min-h-[130px] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        보유 스킬 <span className="text-gray-400 font-normal">(쉼표로 구분)</span>
                      </label>
                      <input
                        type="text"
                        value={applySkills}
                        onChange={(e) => setApplySkills(e.target.value)}
                        placeholder="예: 회로설계, 센서통합, PCB설계"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        포트폴리오 / GitHub <span className="text-gray-400 font-normal">(선택)</span>
                      </label>
                      <input
                        type="text"
                        value={applyPortfolio}
                        onChange={(e) => setApplyPortfolio(e.target.value)}
                        placeholder="예: github.com/username"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-green-200">
                    <Button 
                      onClick={handleApply}
                      disabled={!applyMessage.trim()}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      참여 신청 보내기
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowApplyForm(false)}
                    >
                      취소
                    </Button>
                    <p className="text-xs text-gray-500 ml-auto">
                      신청 시 모집자에게 알림이 전송됩니다
                    </p>
                  </div>
                </Card>
              )}

              {/* Project Intro */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">프로젝트 소개</h2>
                    <p className="text-sm text-gray-600">What we're building</p>
                  </div>
                </div>
                <p className="text-gray-800 leading-relaxed">
                  {activity.projectIntro}
                </p>
              </Card>

              {/* Current Stage */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">현재 진행 단계</h2>
                    <p className="text-sm text-gray-600">Current progress</p>
                  </div>
                </div>
                <p className="text-gray-800 leading-relaxed">
                  {activity.currentStage}
                </p>
              </Card>

              {/* Help Needed */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">어떤 도움이 필요한가요?</h2>
                    <p className="text-sm text-gray-600">What we need</p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <div className="text-gray-800 whitespace-pre-wrap leading-relaxed bg-orange-50 p-4 rounded-lg border border-orange-100">
                    {activity.helpNeeded}
                  </div>
                </div>
              </Card>

              {/* Roles */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">모집 역할</h2>
                    <p className="text-sm text-gray-600">Positions needed</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {activity.roles.map((role, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        role.isMain 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{role.title}</h3>
                        {role.isMain && (
                          <Badge className="bg-green-600 text-white border-0 text-xs">
                            우선순위
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Collaboration Details */}
              <Card className="p-6">
                <div className="space-y-6">
                  {/* Duration */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-gray-700" />
                      <h3 className="font-bold text-gray-900">협업 기간</h3>
                    </div>
                    <p className="text-gray-800">{activity.duration}</p>
                  </div>

                  <Separator />

                  {/* Collaboration Method */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Video className="w-5 h-5 text-gray-700" />
                      <h3 className="font-bold text-gray-900">협업 방식 및 혜택</h3>
                    </div>
                    <div className="prose max-w-none">
                      <div className="text-gray-800 whitespace-pre-wrap leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
                        {activity.collaborationMethod}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Method */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="w-5 h-5 text-gray-700" />
                      <h3 className="font-bold text-gray-900">연락 방법</h3>
                    </div>
                    <div className="prose max-w-none">
                      <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {activity.contactMethod}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Applicants List */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    참여 신청 <span className="text-green-600">{applicants.length}</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {applicants.map((applicant) => (
                    <div key={applicant.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                            {applicant.author.initial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-gray-900">{applicant.author.name}</span>
                            <span className="text-sm text-gray-500">{applicant.createdAt}</span>
                            <Badge variant="outline" className="text-xs ml-auto">
                              검토중
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-800 mb-3">{applicant.message}</p>
                          <div className="flex items-center gap-3 mb-3">
                            {applicant.skills.map((skill) => (
                              <Badge key={skill} className="bg-green-50 text-green-700 border-green-200 text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Link2 className="w-4 h-4 text-blue-600" />
                            <a href="#" className="text-blue-600 hover:underline">
                              {applicant.portfolio}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Comments Section */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    댓글 및 질 <span className="text-green-600">{teammateComments.length}</span>
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  {teammateComments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                          {comment.author.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{comment.author.name}</span>
                          <span className="text-sm text-gray-500">{comment.createdAt}</span>
                        </div>
                        <p className="text-gray-800 mb-3">{comment.content}</p>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            답글
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">댓글 남기기</h3>
                  <Textarea
                    placeholder="프로젝트에 대한 질문이나 의견을 남겨주세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[120px] mb-4"
                  />
                  <div className="flex items-center justify-end">
                    <Button 
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      댓글 등록
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Apply */}
                <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                  <h3 className="font-bold text-gray-900 mb-4">빠른 참여</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">모집중</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-700">{activity.deadline} 마감</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{activity.stats.applicants}명 지원</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 mb-2"
                    onClick={() => {
                      if (applySubmitted) return;
                      setShowApplyForm(true);
                      setTimeout(() => {
                        document.getElementById('apply-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    disabled={applySubmitted}
                  >
                    {applySubmitted ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        신청 완료
                      </>
                    ) : (
                      <>
                        <Handshake className="w-4 h-4 mr-2" />
                        참여 신청하기
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bookmark className="w-4 h-4 mr-2" />
                    나중에 보기
                  </Button>
                </Card>

                {/* Project Card */}
                <Card className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-green-500 to-blue-500 relative">
                    <img 
                      src={activity.project.image} 
                      alt={activity.project.name}
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-2">
                        {activity.project.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">연결된 프로젝트</h3>
                    <Link 
                      to={`/project/${activity.project.id}`}
                      className="text-green-600 hover:underline font-semibold block mb-2"
                    >
                      {activity.project.name}
                    </Link>
                    <div className="text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Rocket className="w-4 h-4 text-blue-600" />
                        <span>{activity.project.status}</span>
                      </div>
                    </div>
                    {activity.contest && (
                      <div className="mb-3 pb-3 border-b border-gray-100">
                        <div className="text-xs text-gray-600 mb-1">참여 콘테스트</div>
                        <Link 
                          to={`/contest/${activity.contest.id}`}
                          className="text-sm text-blue-600 hover:underline font-medium"
                        >
                          {activity.contest.name}
                        </Link>
                      </div>
                    )}
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                      프로젝트 보기
                    </Button>
                  </div>
                </Card>

                {/* Stats */}
                <Card className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">통계</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        조회수
                      </span>
                      <span className="font-semibold text-gray-900">{activity.stats.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        지원자
                      </span>
                      <span className="font-semibold text-green-600">{activity.stats.applicants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        댓글
                      </span>
                      <span className="font-semibold text-gray-900">{activity.stats.comments}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Bookmark className="w-4 h-4" />
                        저장
                      </span>
                      <span className="font-semibold text-gray-900">{activity.stats.bookmarks}</span>
                    </div>
                  </div>
                </Card>

                {/* Author Info */}
                <Card className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">작성자 정보</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-green-100 text-green-700 font-semibold text-lg">
                        {activity.author.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-gray-900">{activity.author.name}</div>
                      <div className="text-sm text-gray-600">
                        프로젝트 {activity.author.projects}개 완료
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    메시지 보내기
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 자료공유 타입 렌더링
  if (activity.type === 'resource') {
    const itemId = activity.id;
    return (
      <ResourceDetailView
        activity={activity}
        resourceComments={resourceComments}
        isLiked={isLiked(itemId)}
        setIsLiked={() => toggleLike({
          id: itemId, type: 'resource',
          title: activity.title,
          authorName: activity.author.name,
          authorInitial: activity.author.initial,
          projectName: activity.project?.name,
          contestName: activity.contest?.name,
        })}
        isBookmarked={isSaved(itemId)}
        setIsBookmarked={() => toggleSave({
          id: itemId, type: 'resource',
          title: activity.title,
          authorName: activity.author.name,
          authorInitial: activity.author.initial,
          projectName: activity.project?.name,
          contestName: activity.contest?.name,
        })}
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmitComment={handleSubmitComment}
      />
    );
  }

  // 진행공유 타입 렌더링
  if (activity.type === 'progress') {
    const itemId = activity.id;
    return (
      <ProgressDetailView
        activity={activity}
        progressComments={progressComments}
        isLiked={isLiked(itemId)}
        setIsLiked={() => toggleLike({
          id: itemId, type: 'progress',
          title: activity.title,
          authorName: activity.author.name,
          authorInitial: activity.author.initial,
          projectName: activity.project?.name,
          contestName: activity.contest?.name,
        })}
        isBookmarked={isSaved(itemId)}
        setIsBookmarked={() => toggleSave({
          id: itemId, type: 'progress',
          title: activity.title,
          authorName: activity.author.name,
          authorInitial: activity.author.initial,
          projectName: activity.project?.name,
          contestName: activity.contest?.name,
        })}
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmitComment={handleSubmitComment}
      />
    );
  }

  // 질문 타입 렌더링
  const itemId = activity.id;
  return (
    <QuestionDetailView
      activity={activity}
      questionAnswers={questionAnswers}
      isBookmarked={isSaved(itemId)}
      setIsBookmarked={() => toggleSave({
        id: itemId, type: 'question',
        title: activity.title,
        authorName: activity.author.name,
        authorInitial: activity.author.initial,
        projectName: activity.project?.name,
        contestName: activity.contest?.name,
      })}
      newComment={newComment}
      setNewComment={setNewComment}
      handleSubmitComment={handleSubmitComment}
    />
  );
}