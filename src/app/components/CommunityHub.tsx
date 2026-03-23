import { 
  MessageCircle, HelpCircle, ArrowRight, 
  Rocket, UserPlus, FolderOpen, Trophy, Target,
  Heart, Eye, Users, Clock, CheckCircle, Sparkles,
  Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState } from 'react';

type CommunityTab = 'all' | 'question' | 'progress' | 'teammate' | 'resource';

// 프로젝트와 연결된 커뮤니티 활동 Mock Data
const communityActivities = [
  {
    id: '1',
    type: 'question' as const,
    title: 'ESP32에서 MQTT 연결이 계속 끊기는데 해결 방법 있나요?',
    author: { name: '김메이커', initial: '김' },
    project: { id: '1', name: 'IoT 스마트 화분 시스템' },
    questNumber: 2,
    contestName: 'IoT 혁신 챌린지 2026',
    status: 'open' as const,
    answers: 8,
    views: 145,
    likes: 23,
    timeAgo: '15분 전',
  },
  {
    id: '2',
    type: 'progress' as const,
    title: 'Quest 2 완료! 음성 인식 모듈 통합 성공 🎉',
    author: { name: '이개발', initial: '이' },
    project: { id: '2', name: 'AI 스마트 미러' },
    questNumber: 2,
    questTotal: 3,
    contestName: 'AI 로봇 챌린지 2026',
    status: 'completed' as const,
    likes: 56,
    comments: 18,
    timeAgo: '30분 전',
    hasImage: true,
  },
  {
    id: '3',
    type: 'question' as const,
    title: 'TensorFlow Lite 모델을 라즈베리파이에 배포하는 방법',
    author: { name: '박엔지니어', initial: '박' },
    project: { id: '3', name: '얼굴 인식 출입 시스템' },
    questNumber: 3,
    contestName: 'AI 로봇 챌린지 2026',
    status: 'solved' as const,
    answers: 12,
    views: 156,
    likes: 34,
    timeAgo: '1시간 전',
  },
  {
    id: '4',
    type: 'teammate' as const,
    title: '드론 자율비행 프로젝트 - 하드웨어 엔지니어 구합니다',
    author: { name: '최메이커', initial: '최' },
    project: { id: '4', name: 'AI 기반 농업용 드론' },
    questNumber: 2,
    contestName: '스마트 농업 테크 콘테스트 2026',
    status: 'recruiting' as const,
    deadline: 'D-15',
    applicants: 5,
    skills: ['하드웨어', '회로 설계', '드론'],
    timeAgo: '2시간 전',
  },
  {
    id: '5',
    type: 'progress' as const,
    title: '자율주행 알고리즘 1차 테스트 결과 공유',
    author: { name: '정개발', initial: '정' },
    project: { id: '5', name: '실내 배달 로봇' },
    questNumber: 2,
    questTotal: 3,
    contestName: '스마트 로봇 콘테스트',
    status: 'active' as const,
    likes: 28,
    comments: 8,
    timeAgo: '3시간 전',
    hasImage: true,
  },
  {
    id: '6',
    type: 'resource' as const,
    title: 'ESP32 개발 완벽 가이드 - 공식 문서부터 실전 예제까지',
    author: { name: '강메이커', initial: '강' },
    project: { id: '6', name: 'IoT 스마트 화분 시스템' },
    questNumber: 2,
    status: 'recommended' as const,
    resourceType: 'GitHub',
    likes: 89,
    downloads: 67,
    comments: 24,
    timeAgo: '4시간 전',
  },
  {
    id: '7',
    type: 'teammate' as const,
    title: 'IoT 프로젝트 함께할 백엔드 개발자 찾아요',
    author: { name: '한개발', initial: '한' },
    project: { id: '7', name: '스마트 홈 자동화 시스템' },
    questNumber: 1,
    contestName: 'IoT 혁신 챌린지 2026',
    status: 'recruiting' as const,
    deadline: 'D-7',
    applicants: 8,
    skills: ['Node.js', 'MQTT', 'AWS'],
    timeAgo: '5시간 전',
  },
  {
    id: '8',
    type: 'resource' as const,
    title: '3D 프린팅 최적 설정 가이드 (Ender-3 기준)',
    author: { name: '송엔지니어', initial: '송' },
    project: { id: '8', name: '웨어러블 헬스케어 디바이스' },
    questNumber: 1,
    status: 'recommended' as const,
    resourceType: 'YouTube',
    likes: 45,
    downloads: 34,
    comments: 12,
    timeAgo: '6시간 전',
  },
];

export function CommunityHub() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<CommunityTab>('all');

  const getTypeConfig = (type: string) => {
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
        return { label: '활동', icon: Sparkles, bgColor: 'bg-gray-100', textColor: 'text-gray-700' };
    }
  };

  const filteredActivities = selectedTab === 'all' 
    ? communityActivities 
    : communityActivities.filter(activity => activity.type === selectedTab);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">실시간 활동 피드</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            메이커들이 지금 만들고 있어요
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            프로젝트를 진행하며 질문하고, 공유하고, 협업하는 활동을 확인하세요
          </p>
        </div>

        {/* Activity Type Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { value: 'all', label: '전체 활동', icon: Sparkles, count: communityActivities.length },
              { value: 'question', label: '질문', icon: HelpCircle, count: communityActivities.filter(a => a.type === 'question').length },
              { value: 'progress', label: '진행공유', icon: Rocket, count: communityActivities.filter(a => a.type === 'progress').length },
              { value: 'teammate', label: '팀원찾기', icon: UserPlus, count: communityActivities.filter(a => a.type === 'teammate').length },
              { value: 'resource', label: '자료공유', icon: FolderOpen, count: communityActivities.filter(a => a.type === 'resource').length },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedTab(tab.value as CommunityTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedTab === tab.value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  <span className="opacity-70">({tab.count})</span>
                </button>
              );
            })}
          </div>
          <Link to="/community">
            <Button variant="outline" size="sm" className="hidden md:flex">
              전체 커뮤니티
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredActivities.slice(0, 6).map((activity) => {
            const typeConfig = getTypeConfig(activity.type);
            const TypeIcon = typeConfig.icon;

            return (
              <Card 
                key={activity.id}
                className="p-5 hover:shadow-xl transition-all cursor-pointer group border-l-4"
                style={{ borderLeftColor: selectedTab === 'all' ? '#3b82f6' : 'transparent' }}
                onClick={() => navigate(`/community/${activity.id}`)}
              >
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarFallback className={`${typeConfig.bgColor} ${typeConfig.textColor} font-semibold`}>
                      {activity.author.initial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    {/* Type & Status Badges */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0`}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {typeConfig.label}
                      </Badge>
                      
                      {/* Status Badges */}
                      {activity.type === 'question' && (
                        activity.status === 'open' ? (
                          <Badge className="bg-orange-100 text-orange-700 border-0">
                            <Clock className="w-3 h-3 mr-1" />
                            해결중
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 border-0">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            해결됨
                          </Badge>
                        )
                      )}
                      
                      {activity.type === 'teammate' && activity.status === 'recruiting' && (
                        <Badge className="bg-orange-100 text-orange-700 border-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.deadline}
                        </Badge>
                      )}

                      {activity.type === 'progress' && activity.status === 'completed' && (
                        <Badge className="bg-green-100 text-green-700 border-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          완료됨
                        </Badge>
                      )}

                      {activity.type === 'resource' && activity.status === 'recommended' && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                          <Sparkles className="w-3 h-3 mr-1" />
                          추천
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </h3>

                    {/* Project Connection Info - 핵심! */}
                    <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/project/${activity.project.id}`}
                            className="text-sm font-bold text-blue-600 hover:underline line-clamp-1 block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {activity.project.name}
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1 flex-wrap">
                            {activity.questNumber && (
                              <span className="flex items-center gap-1">
                                <Rocket className="w-3 h-3" />
                                Quest {activity.questNumber}
                                {activity.questTotal && `/${activity.questTotal}`}
                              </span>
                            )}
                            {activity.contestName && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 truncate">
                                  <Trophy className="w-3 h-3" />
                                  {activity.contestName}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills (for teammate) */}
                    {activity.type === 'teammate' && activity.skills && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {activity.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} className="bg-green-50 text-green-700 border-green-200 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Activity Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="font-medium text-gray-700">{activity.author.name}</span>
                        
                        {activity.type === 'question' && (
                          <>
                            <span className="flex items-center gap-1 font-semibold text-blue-600">
                              <MessageCircle className="w-4 h-4" />
                              {activity.answers}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {activity.views}
                            </span>
                          </>
                        )}

                        {activity.type === 'progress' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {activity.likes}
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-purple-600">
                              <MessageCircle className="w-4 h-4" />
                              {activity.comments}
                            </span>
                          </>
                        )}

                        {activity.type === 'teammate' && (
                          <span className="flex items-center gap-1 font-semibold text-green-600">
                            <Users className="w-4 h-4" />
                            {activity.applicants}명
                          </span>
                        )}

                        {activity.type === 'resource' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {activity.likes}
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-orange-600">
                              <Eye className="w-4 h-4" />
                              {activity.downloads}
                            </span>
                          </>
                        )}
                      </div>
                      
                      <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">프로젝트와 함께 성장하세요</h3>
              <p className="text-blue-100">
                질문하고, 공유하고, 협업하며 메이커 커뮤니티와 함께하세요
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                <HelpCircle className="w-4 h-4 mr-2" />
                질문하기
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <Rocket className="w-4 h-4 mr-2" />
                진행공유
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <UserPlus className="w-4 h-4 mr-2" />
                팀원찾기
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <FolderOpen className="w-4 h-4 mr-2" />
                자료공유
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile: View All Button */}
        <div className="mt-6 text-center md:hidden">
          <Link to="/community">
            <Button variant="outline" className="w-full">
              전체 커뮤니티 활동 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}