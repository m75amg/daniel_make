import { useParams, Link } from 'react-router';
import { 
  ChevronRight, CheckCircle, Trophy, Calendar, Star,
  Share2, Edit, Eye, Award, Sparkles, ArrowRight,
  Github, Video, Image as ImageIcon, FileText,
  TrendingUp, Users, Zap, Package, Globe,
  Target, Clock, Medal, Gift, ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export function ProjectCompletedPage() {
  const { projectId } = useParams();

  // Mock project data
  const project = {
    id: projectId,
    title: 'AI 음성인식 자율주행 로봇',
    summary: '라즈베리파이와 OpenCV로 실내 자율주행이 가능한 배송 로봇',
    contestName: 'AI 로봇 챌린지 2026',
    contestId: 'ai-robot-2026',
    gradient: 'from-blue-600 to-purple-600',
    completedDate: '2026년 3월 13일',
    announcementDate: '2026년 5월 15일',
    category: '로봇공학',
    tags: ['AI', '라즈베리파이', 'OpenCV', '자율주행', 'Python'],
    hasMainImage: true,
    hasGithub: true,
    hasDemoVideo: true,
    questsCompleted: 3,
    totalQuests: 3,
  };

  const completionStatus = {
    hasMainImage: project.hasMainImage,
    hasGithub: project.hasGithub,
    hasDemoVideo: project.hasDemoVideo,
    hasDetailedContent: true,
  };

  const suggestions = [
    {
      icon: ImageIcon,
      title: '대표 이미지 개선',
      description: '고해상도 이미지로 교체하면 더 많은 조회수를 얻을 수 있습니다',
      completed: project.hasMainImage,
      action: '이미지 추가하기',
    },
    {
      icon: Github,
      title: 'GitHub 저장소 공개',
      description: '오픈소스로 공유하면 커뮤니티에 더 많은 영향력을 줄 수 있습니다',
      completed: project.hasGithub,
      action: 'GitHub 추가하기',
    },
    {
      icon: Video,
      title: '데모 영상 품질',
      description: '프로젝트 동작을 명확하게 보여주는 영상으로 업데이트하세요',
      completed: project.hasDemoVideo,
      action: '영상 개선하기',
    },
    {
      icon: FileText,
      title: '제작 과정 보완',
      description: '상세한 제작 과정은 다른 메이커들에게 큰 도움이 됩니다',
      completed: completionStatus.hasDetailedContent,
      action: '내용 보완하기',
    },
  ];

  const relatedProjects = [
    {
      id: '2',
      title: '오픈소스 자율주행 로봇',
      author: '김메이커',
      image: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=400',
      likes: 432,
      views: 5420,
    },
    {
      id: '3',
      title: 'ESP32 기반 스마트 화분',
      author: '이개발',
      image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?w=400',
      likes: 289,
      views: 3210,
    },
    {
      id: '5',
      title: 'AI 음성인식 스마트 미러',
      author: '최개발',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400',
      likes: 345,
      views: 4120,
    },
  ];

  const upcomingContests = [
    {
      id: 'iot-smart-home',
      title: 'IoT 스마트홈 챌린지',
      deadline: '2026년 6월 30일',
      participants: 89,
      prize: '총 상금 500만원',
      gradient: 'from-green-600 to-teal-600',
    },
    {
      id: '3d-printing-innovation',
      title: '3D 프린팅 혁신 대회',
      deadline: '2026년 7월 15일',
      participants: 64,
      prize: '총 상금 600만원',
      gradient: 'from-orange-600 to-red-600',
    },
  ];

  const handleShare = () => {
    // 공유하기 기능
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.summary,
        url: window.location.origin + `/project/${projectId}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/my-make" className="hover:text-blue-600 transition-colors">마이메이크</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/project/${projectId}`} className="hover:text-blue-600 transition-colors">
              {project.title}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">프로젝트 완료</span>
          </div>
        </div>
      </div>

      {/* Hero Section - 완료 축하 */}
      <section className={`bg-gradient-to-r ${project.gradient} text-white py-16`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Confetti Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Congratulations Message */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎉 프로젝트 완성을 축하합니다!
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              <strong>{project.title}</strong>이(가) Make 2.0 플랫폼의 공식 프로젝트로 등록되었습니다.<br />
              이제 전 세계 메이커들과 함께 공유됩니다.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 text-center min-w-[160px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                </div>
                <p className="text-sm text-gray-700">진행률</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 text-center min-w-[160px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Target className="w-5 h-5 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900">{project.questsCompleted}/{project.totalQuests}</p>
                </div>
                <p className="text-sm text-gray-700">Quest 완료</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 text-center min-w-[160px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <p className="text-sm font-bold text-gray-900">{project.completedDate}</p>
                </div>
                <p className="text-sm text-gray-700">완료일</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 text-center min-w-[160px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <p className="text-sm font-bold text-gray-900">{project.announcementDate}</p>
                </div>
                <p className="text-sm text-gray-700">결과 발표</p>
              </div>
            </div>

            {/* Main Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={`/project/${projectId}`}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  <Eye className="w-5 h-5 mr-2" />
                  내 프로젝트 보기
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 mr-2" />
                공유하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* 프로젝트 자산화 안내 */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    프로젝트가 Make 2.0의 자산이 되었습니다
                  </h2>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">플랫폼에 공개</p>
                        <p>프로젝트 리스트에 노출되어 전 세계 메이커들이 볼 수 있습니다</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">영감의 원천</p>
                        <p>다른 메이커들이 참고하고 배울 수 있는 소중한 자료가 됩니다</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">커뮤니티 기여</p>
                        <p>Make 2.0 생태계의 일부로서 메이커 문화 확산에 기여합니다</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">지속적인 가치</p>
                        <p>콘테스트 종료 후에도 플랫폼에 영구 보존됩니다</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quest 완료 요약 */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Medal className="w-6 h-6 text-yellow-600" />
                Quest 완료 타임라인
              </h2>
              <div className="space-y-6">
                {/* Quest 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700">완료</Badge>
                      <span className="text-sm text-gray-600">2026년 3월 5일</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Quest 1: 프로젝트 기획 및 설계</h3>
                    <p className="text-sm text-gray-600">
                      프로젝트 아이디어와 설계 방향을 구체화하고 기술 스택을 결정했습니다.
                    </p>
                  </div>
                </div>

                {/* Quest 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700">완료</Badge>
                      <span className="text-sm text-gray-600">2026년 3월 10일</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Quest 2: 프로토타입 제작</h3>
                    <p className="text-sm text-gray-600">
                      실제 하드웨어/소프트웨어 프로토타입을 구현하고 동작을 검증했습니다.
                    </p>
                  </div>
                </div>

                {/* Quest 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700">완료</Badge>
                      <span className="text-sm text-gray-600">{project.completedDate}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Quest 3: 최종 프로젝트 완성</h3>
                    <p className="text-sm text-gray-600">
                      프로젝트를 완성하고 최종 결과물을 제출했습니다. 모든 기능이 정상 작동합니다.
                    </p>
                  </div>
                </div>

                {/* Project Completed */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">프로젝트 완료</Badge>
                      <span className="text-sm text-gray-600">{project.completedDate}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">플랫폼 자산화 완료</h3>
                    <p className="text-sm text-gray-600">
                      프로젝트가 Make 2.0에 공식 등록되어 전 세계에 공개되었습니다!
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 프로젝트 보완 제안 */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                프로젝트를 더욱 빛나게 만들어보세요
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                아래 항목을 보완하면 더 많은 사람들에게 주목받을 수 있습니다
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {suggestions.map((suggestion, index) => {
                  const Icon = suggestion.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        suggestion.completed
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          suggestion.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {suggestion.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Icon className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                            {suggestion.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2">
                            {suggestion.description}
                          </p>
                          {!suggestion.completed && (
                            <Link to={`/project/${projectId}/edit`}>
                              <Button variant="outline" size="sm" className="text-xs">
                                {suggestion.action}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* 관련 프로젝트 */}
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  같은 콘테스트 참가 프로젝트
                </h2>
                <Link to={`/contest/${project.contestId}#projects`}>
                  <Button variant="outline" size="sm">
                    전체보기
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedProjects.map((relProject) => (
                  <Link key={relProject.id} to={`/project/${relProject.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img 
                          src={relProject.image} 
                          alt={relProject.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">
                          {relProject.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-3">{relProject.author}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {relProject.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {relProject.views}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>

            {/* 다음 콘테스트 */}
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Gift className="w-6 h-6 text-purple-600" />
                  다음 콘테스트에도 참가해보세요
                </h2>
                <Link to="/contests">
                  <Button variant="outline" size="sm">
                    전체보기
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingContests.map((contest) => (
                  <Link key={contest.id} to={`/contest/${contest.id}`}>
                    <Card className={`p-6 bg-gradient-to-r ${contest.gradient} text-white hover:shadow-lg transition-shadow`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{contest.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {contest.deadline}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {contest.participants}명 참가중
                            </span>
                            <Badge className="bg-white/20 text-white">
                              {contest.prize}
                            </Badge>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 ml-4 flex-shrink-0" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* 프로젝트 요약 */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  내 프로젝트 요약
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">프로젝트</p>
                    <p className="font-semibold text-gray-900">{project.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">카테고리</p>
                    <Badge>{project.category}</Badge>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">기술 태그</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">콘테스트</p>
                    <p className="font-semibold text-gray-900">{project.contestName}</p>
                  </div>
                </div>
              </Card>

              {/* 액션 버튼 */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">액션</h3>
                <div className="space-y-2">
                  <Link to={`/project/${projectId}`} className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      내 프로젝트 보기
                    </Button>
                  </Link>
                  <Link to={`/project/${projectId}/edit`} className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      프로젝트 수정하기
                    </Button>
                  </Link>
                  <Link to="/projects" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      프로젝트 리스트에서 보기
                    </Button>
                  </Link>
                  <Link to={`/contest/${project.contestId}`} className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Trophy className="w-4 h-4 mr-2" />
                      콘테스트 상세 보기
                    </Button>
                  </Link>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    공유하기
                  </Button>
                </div>
              </Card>

              {/* 심사 안내 */}
              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  심사 및 결과 안내
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">심사 진행</p>
                      <p className="text-xs">심사위원단이 프로젝트를 검토합니다</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">결과 발표</p>
                      <p className="text-xs">{project.announcementDate} 예정</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Edit className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">수정 가능</p>
                      <p className="text-xs">결과 발표 전까지 수정할 수 있습니다<br />단, 심사는 첫 제출 기준입니다</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 통계 */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">프로젝트 현황</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">완성도</span>
                    <span className="font-bold text-green-600">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="pt-3 border-t border-gray-200 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Quest 완료</span>
                      <span className="font-semibold text-gray-900">{project.questsCompleted}/{project.totalQuests}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">제출일</span>
                      <span className="font-semibold text-gray-900">{project.completedDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">상태</span>
                      <Badge className="bg-green-100 text-green-700">공개됨</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}