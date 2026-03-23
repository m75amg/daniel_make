import { Link, useNavigate } from 'react-router';
import { ChevronRight, Heart, Eye, MessageCircle, Award, Trophy, Filter, Search, TrendingUp, Plus, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const projects = [
  {
    id: 1,
    title: 'AI 음성인식 자율주행 로봇',
    description: '라즈베리파이와 OpenCV로 실내 자율주행이 가능한 배송 로봇. Quest 3까지 완료하여 최우수상 수상',
    author: '김메이커',
    authorId: 'kimmaker',
    authorInitial: '김',
    category: '로봇공학',
    likes: 567,
    views: 8930,
    comments: 142,
    projectType: 'contest', // 'personal' | 'contest'
    status: 'completed', // 'draft' | 'in-progress' | 'completed'
    contestName: 'AI 로봇 챌린지 2026',
    contestId: 'ai-robot-2026',
    questProgress: { completed: 3, total: 3 },
    award: '최우수상',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    featured: true,
  },
  {
    id: 2,
    title: '오픈소스 자율주행 로봇',
    description: '라즈베리파이와 AI 비전을 활용한 실내 자율주행 로봇 프로젝트. Quest 2 진행중',
    author: '김메이커',
    authorId: 'kimmaker',
    authorInitial: '김',
    category: '로봇공학',
    likes: 432,
    views: 5420,
    comments: 89,
    projectType: 'contest',
    status: 'in-progress',
    contestName: 'AI 로봇 챌린지 2026',
    contestId: 'ai-robot-2026',
    questProgress: { completed: 2, total: 3 },
    image: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=800',
    featured: false,
  },
  {
    id: 3,
    title: 'ESP32 기반 스마트 화분',
    description: '토양 수분, 온도, 조도를 모니터링하고 자동으로 물을 주는 IoT 화분',
    author: '이개발',
    authorId: 'leedev',
    authorInitial: '이',
    category: 'IoT',
    likes: 289,
    views: 3210,
    comments: 54,
    projectType: 'personal',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?w=800',
    featured: false,
  },
  {
    id: 4,
    title: '3D 프린터 자동 레벨링 시스템',
    description: 'AI 기반 자동 베드 레벨링으로 완벽한 첫 레이어를 만드는 시스템',
    author: '박엔지니어',
    authorId: 'parkengineer',
    authorInitial: '박',
    category: '3D프린팅',
    likes: 267,
    views: 2890,
    comments: 41,
    projectType: 'personal',
    status: 'in-progress',
    image: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?w=800',
    featured: false,
  },
  {
    id: 5,
    title: 'AI 음성인식 스마트 미러',
    description: '거울에 날씨, 일정, 뉴스를 표시하고 음성으로 제어하는 스마트홈 디스플레이',
    author: '최개발',
    authorId: 'choidev',
    authorInitial: '최',
    category: 'AI',
    likes: 345,
    views: 4120,
    comments: 67,
    projectType: 'contest',
    status: 'completed',
    contestName: '스마트홈 챌린지',
    contestId: 'smarthome-2026',
    questProgress: { completed: 3, total: 3 },
    award: '우수상',
    image: 'https://images.unsplash.com/photo-1758525747606-bd5d801ca87b?w=800',
    featured: false,
  },
  {
    id: 6,
    title: '아두이노 기반 날씨 관측소',
    description: '온습도, 기압, 풍향풍속을 측정하고 실시간으로 데이터를 시각화하는 관측 시스템. 작성중',
    author: '정코더',
    authorId: 'jungcoder',
    authorInitial: '정',
    category: 'IoT',
    likes: 45,
    views: 234,
    comments: 8,
    projectType: 'personal',
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1553408226-42ecf81a214c?w=800',
    featured: false,
  },
];

const categories = [
  { name: '전체', count: 2341 },
  { name: '로봇공학', count: 456 },
  { name: 'IoT', count: 678 },
  { name: 'AI', count: 432 },
  { name: '3D프린팅', count: 289 },
  { name: '웨어러블', count: 234 },
  { name: '드론', count: 198 },
];

export function ProjectListPage() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState('all');
  const ITEMS_PER_LOAD = 6;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_LOAD);
  };

  // Filter projects based on active filter
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'personal') return project.projectType === 'personal';
    if (activeFilter === 'contest') return project.projectType === 'contest';
    if (activeFilter === 'in-progress') return project.status === 'in-progress';
    if (activeFilter === 'completed') return project.status === 'completed';
    if (activeFilter === 'award') return project.award;
    return true;
  });

  const hasMore = visibleCount < filteredProjects.length;
  const displayedProjects = filteredProjects.slice(0, visibleCount);

  // Count for each filter
  const filterCounts = {
    all: projects.length,
    personal: projects.filter(p => p.projectType === 'personal').length,
    contest: projects.filter(p => p.projectType === 'contest').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    award: projects.filter(p => p.award).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">프로젝트</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">2,341개의 프로젝트</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              메이커들의 프로젝트
            </h1>
            <p className="text-xl text-gray-600">
              전 세계 메이커들이 만들고 공유하는 혁신적인 프로젝트를 둘러보세요
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="프로젝트 검색..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              필터
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-lg text-gray-900 mb-4">카테고리</h3>
              <div className="space-y-1">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-100 transition-colors text-left ${
                      index === 0 ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">정렬</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>인기순</option>
                  <option>최신순</option>
                  <option>조회순</option>
                  <option>좋아요순</option>
                </select>
              </div>
            </Card>
          </div>

          {/* Project Grid */}
          <div className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-1">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  전체 <Badge className="ml-1.5 bg-white text-gray-900 text-xs">{filterCounts.all}</Badge>
                </button>
                <button
                  onClick={() => setActiveFilter('personal')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'personal'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  개인 프로젝트 <Badge className="ml-1.5 bg-white text-gray-900 text-xs">{filterCounts.personal}</Badge>
                </button>
                <button
                  onClick={() => setActiveFilter('contest')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'contest'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 inline mr-1" />
                  콘테스트 프로젝트 <Badge className="ml-1.5 bg-white text-gray-900 text-xs">{filterCounts.contest}</Badge>
                </button>
                <button
                  onClick={() => setActiveFilter('in-progress')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'in-progress'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  진행중 <Badge className="ml-1.5 bg-white text-gray-900 text-xs">{filterCounts.inProgress}</Badge>
                </button>
                <button
                  onClick={() => setActiveFilter('completed')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'completed'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
                  완료 <Badge className="ml-1.5 bg-white text-gray-900 text-xs">{filterCounts.completed}</Badge>
                </button>
                <button
                  onClick={() => setActiveFilter('award')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'award'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 inline mr-1" />
                  수상작 <Badge className="ml-1.5 bg-white text-gray-900 text-xs">{filterCounts.award}</Badge>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeFilter === 'all' && '전체 프로젝트'}
                {activeFilter === 'personal' && '개인 프로젝트'}
                {activeFilter === 'contest' && '콘테스트 프로젝트'}
                {activeFilter === 'in-progress' && '진행중인 프로젝트'}
                {activeFilter === 'completed' && '완료된 프로젝트'}
                {activeFilter === 'award' && '수상 프로젝트'}
              </h2>
              <span className="text-sm text-gray-600">{filteredProjects.length}개의 결과</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {displayedProjects.map((project) => (
                // 외부 Link 제거 → Card onClick으로 네비게이션 (내부 작성자 Link와 중첩 방지)
                <Card
                  key={project.id}
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <Badge className="bg-white/90 text-gray-900 border-0 text-xs">
                        {project.category}
                      </Badge>
                      
                      {/* Status Badge */}
                      {project.status === 'draft' && (
                        <Badge className="bg-gray-500/90 text-white border-0 text-xs">
                          초안
                        </Badge>
                      )}
                      {project.status === 'in-progress' && (
                        <Badge className="bg-yellow-500/90 text-white border-0 text-xs">
                          진행중
                        </Badge>
                      )}
                      {project.status === 'completed' && (
                        <Badge className="bg-green-500/90 text-white border-0 text-xs">
                          완료
                        </Badge>
                      )}
                      
                      {/* Award Badge */}
                      {project.award && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                          🏆 {project.award}
                        </Badge>
                      )}
                      
                      {project.projectType === 'contest' && (
                        <Badge className="bg-purple-600/90 text-white border-0 text-xs">
                          <Trophy className="w-3 h-3 mr-1" />
                          콘테스트
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-5">
                    {/* Contest Progress Banner */}
                    {project.projectType === 'contest' && project.questProgress && (
                      <div className={`mb-4 p-3 rounded-lg border ${
                        project.status === 'completed' 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-yellow-50 border-yellow-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-700">
                            {project.status === 'completed' ? '✅ 콘테스트 완료' : '⏳ 진행중'}
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            Quest {project.questProgress.completed}/{project.questProgress.total}
                          </span>
                        </div>
                        <div className="w-full bg-white rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all ${
                              project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${(project.questProgress.completed / project.questProgress.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Author & Stats */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/maker/${project.authorId}`}
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-2 group/author"
                      >
                        <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover/author:ring-blue-400 transition-all">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
                            {project.authorInitial}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700 font-medium group-hover/author:text-blue-600 transition-colors">{project.author}</span>
                      </Link>

                      <div className="flex items-center gap-3 text-sm text-gray-500">
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
                      </div>
                    </div>
                  </div>
                {/* Card closing tag — 외부 Link 제거 */}
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4">
              {hasMore ? (
                <Button 
                  size="lg"
                  variant="outline" 
                  onClick={handleLoadMore}
                  className="px-8 py-6 text-base font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  더 많은 프로젝트 보기
                </Button>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Trophy className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium mb-1">
                    모든 프로젝트를 확인했습니다
                  </p>
                  <p className="text-sm text-gray-500">
                    총 {projects.length}개의 프로젝트를 둘러보셨습니다
                  </p>
                </div>
              )}
              
              {/* Progress indicator */}
              {hasMore && (
                <p className="text-sm text-gray-500">
                  {visibleCount}개 / 총 {projects.length}개
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}