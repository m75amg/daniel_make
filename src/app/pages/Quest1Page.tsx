import { useParams, Link, useNavigate } from 'react-router';
import {
  ChevronRight, ChevronLeft, Sparkles, Lightbulb,
  CheckCircle, Target, List, Layers, Calendar, BookOpen,
  Github, Link2, Trophy, Clock, AlertCircle, Users,
  MessageSquare, Rocket, Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { useState } from 'react';
import { AskQuestionDialog } from '../components/AskQuestionDialog';
import { ShareProgressDialog } from '../components/ShareProgressDialog';
import { FindTeammateDialog } from '../components/FindTeammateDialog';
import { ShareResourceDialog } from '../components/ShareResourceDialog';

export function Quest1Page() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Quest 1 정보
  const [quest1Goal, setQuest1Goal] = useState('');
  const [quest1Concept, setQuest1Concept] = useState('');
  const [quest1Features, setQuest1Features] = useState('');
  const [quest1Architecture, setQuest1Architecture] = useState('');
  const [quest1Timeline, setQuest1Timeline] = useState('');
  
  // 기술/링크 정보
  const [githubLink, setGithubLink] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  
  // 질문 다이얼로그 상태
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [isShareProgressDialogOpen, setIsShareProgressDialogOpen] = useState(false);
  const [isFindTeammateDialogOpen, setIsFindTeammateDialogOpen] = useState(false);
  const [isShareResourceDialogOpen, setIsShareResourceDialogOpen] = useState(false);

  // Mock project data
  const project = {
    id: projectId,
    title: 'AI 음성인식 자율주행 로봇',
    contestName: 'AI 로봇 챌린지 2026',
    contestId: '1',
    gradient: 'from-blue-600 to-purple-600',
    quests: [
      {
        id: 1,
        title: 'Quest 1: 프로젝트 기획 및 설계',
        description: '프로젝트 아이디어와 설계 방향을 구체화합니다',
        normalDeadline: '2026년 3월 25일',
        finalDeadline: '2026년 3월 30일',
        points: 100,
        status: 'in-progress',
      },
      {
        id: 2,
        title: 'Quest 2: 프로토타입 제작',
        description: '실제 하드웨어/소프트웨어 프로토타입을 구현합니다',
        normalDeadline: '2026년 4월 10일',
        finalDeadline: '2026년 4월 13일',
        points: 150,
        status: 'pending',
      },
      {
        id: 3,
        title: 'Quest 3: 최종 프로젝트 완성',
        description: '프로젝트를 완성하고 최종 결과물을 제출합니다',
        normalDeadline: '2026년 4월 25일',
        finalDeadline: '2026년 4월 27일',
        points: 200,
        status: 'pending',
      },
    ],
  };

  const handleSubmitQuest1 = () => {
    // 실제로는 여기서 Quest 1 제출 API 호출
    // Quest 1 제출 후 Quest 2 페이지로 이동하여 다음 단계 진행
    navigate(`/project/${projectId}/quest/2`);
  };

  const isFormValid = quest1Goal.length >= 50 && quest1Concept.length >= 100 && quest1Features.length >= 50;

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
            <span className="text-gray-900">Quest 1 작성</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className={`bg-gradient-to-r ${project.gradient} text-white py-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Lightbulb className="w-8 h-8" />
            </div>
            <div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-2">
                <Trophy className="w-3 h-3 mr-1" />
                Quest 1 에디터
              </Badge>
              <h1 className="text-3xl font-bold">
                프로젝트 기획 및 설계 단계
              </h1>
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl">
            <strong>{project.title}</strong> 프로젝트의 Quest 1을 작성합니다. 
            프로젝트의 목표, 컨셉, 기능, 설계를 명확히 정의하세요.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form - Left 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation to project */}
            <Link 
              to={`/project/${projectId}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              프로젝트로 돌아가기
            </Link>

            {/* Quest 1 Info Card */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    Quest 1: 프로젝트 기획 및 설계
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>프로젝트 목표와 컨셉을 명확히 정의하세요</strong> - 무엇을 만들고, 왜 만드는지</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>주요 기능과 특징을 나열하세요</strong> - 어떤 기능을 구현할 것인지</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>하드웨어/소프트웨어 아키텍처 설계</strong> - 전체 시스템 구조</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>개발 일정 계획</strong> - 단계별 목표와 타임라인</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* 1. 프로젝트 목표 */}
            <Card className="p-6 border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">프로젝트 목표</h3>
                  <p className="text-sm text-gray-600">이 프로젝트를 통해 달성하고자 하는 목표를 작성하세요</p>
                </div>
              </div>

              <textarea
                value={quest1Goal}
                onChange={(e) => setQuest1Goal(e.target.value)}
                placeholder="예: 음성 명령을 인식하여 실내에서 자율주행하며 물건을 배달할 수 있는 로봇을 제작합니다. 이를 통해 고령자와 장애인의 일상생활 편의를 높이고자 합니다."
                className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">최소 50자 이상 작성해주세요</p>
                <p className={`text-xs ${quest1Goal.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                  {quest1Goal.length}/50자
                </p>
              </div>
            </Card>

            {/* 2. 프로젝트 컨셉 */}
            <Card className="p-6 border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">프로젝트 컨셉 및 아이디어</h3>
                  <p className="text-sm text-gray-600">프로젝트의 핵심 아이디어와 차별점을 설명하세요</p>
                </div>
              </div>

              <textarea
                value={quest1Concept}
                onChange={(e) => setQuest1Concept(e.target.value)}
                placeholder="예: 기존 배달 로봇과 달리, 음성인식 AI를 통해 누구나 쉽게 명령할 수 있고, 실내 환경에 최적화된 소형 디자인을 채택했습니다. OpenCV 기반 객체 인식으로 장애물을 회피하며, 라즈베리파이로 저비용 구현이 가능합니다..."
                className="w-full min-h-[180px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">최소 100자 이상 작성해주세요</p>
                <p className={`text-xs ${quest1Concept.length >= 100 ? 'text-green-600' : 'text-gray-400'}`}>
                  {quest1Concept.length}/100자
                </p>
              </div>
            </Card>

            {/* 3. 주요 기능 */}
            <Card className="p-6 border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <List className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">주요 기능 및 특징</h3>
                  <p className="text-sm text-gray-600">구현할 핵심 기능들을 나열하세요</p>
                </div>
              </div>

              <textarea
                value={quest1Features}
                onChange={(e) => setQuest1Features(e.target.value)}
                placeholder="예:&#10;1. 음성 명령 인식 및 처리 (Google Speech API)&#10;2. 실내 자율주행 (SLAM 알고리즘)&#10;3. 장애물 감지 및 회피 (초음파 센서 + OpenCV)&#10;4. 물건 적재 및 배달 기능&#10;5. 스마트폰 앱 연동 및 원격 제어"
                className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">최소 50자 이상 작성해주세요</p>
                <p className={`text-xs ${quest1Features.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                  {quest1Features.length}/50자
                </p>
              </div>
            </Card>

            {/* 4. 시스템 아키텍처 */}
            <Card className="p-6 border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">하드웨어/소프트웨어 아키텍처</h3>
                  <p className="text-sm text-gray-600">전체 시스템 구조와 구성요소를 설명하세요</p>
                </div>
              </div>

              <textarea
                value={quest1Architecture}
                onChange={(e) => setQuest1Architecture(e.target.value)}
                placeholder="예:&#10;[하드웨어]&#10;- 메인보드: Raspberry Pi 4 (4GB)&#10;- 모터: DC 기어드 모터 x 4&#10;- 센서: 초음파 센서 x 4, 카메라 모듈 x 1&#10;- 마이크: USB 마이크&#10;&#10;[소프트웨어]&#10;- 운영체제: Raspbian OS&#10;- 음성인식: Google Speech API&#10;- 영상처리: OpenCV + Python&#10;- 자율주행: ROS (Robot Operating System)"
                className="w-full min-h-[240px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </Card>

            {/* 5. 개발 타임라인 */}
            <Card className="p-6 border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">개발 일정 계획</h3>
                  <p className="text-sm text-gray-600">단계별 개발 일정을 작성하세요</p>
                </div>
              </div>

              <textarea
                value={quest1Timeline}
                onChange={(e) => setQuest1Timeline(e.target.value)}
                placeholder="예:&#10;Week 1-2: 하드웨어 설계 및 부품 구매&#10;Week 3-4: 하드웨어 조립 및 기본 동작 테스트&#10;Week 5-6: 음성인식 모듈 개발 및 통합&#10;Week 7-8: 자율주행 알고리즘 구현&#10;Week 9-10: 통합 테스트 및 최적화&#10;Week 11-12: 최종 디버깅 및 문서화"
                className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </Card>

            {/* 6. 참고 자료 */}
            <Card className="p-6 border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">참고 자료 및 링크 (선택)</h3>
                  <p className="text-sm text-gray-600">참고한 자료나 관련 링크를 추가하세요</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Github className="w-4 h-4" />
                    GitHub 저장소 (선택)
                  </label>
                  <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Link2 className="w-4 h-4" />
                    참고 자료 링크 (선택)
                  </label>
                  <input
                    type="url"
                    value={referenceLink}
                    onChange={(e) => setReferenceLink(e.target.value)}
                    placeholder="https://example.com/reference"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Card className="p-6 border-gray-200 bg-white sticky bottom-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">Quest 1 제출 준비 완료</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {isFormValid 
                      ? '모든 필수 항목이 작성되었습니다. 제출하시겠습니까?' 
                      : '필수 항목을 모두 작성해주세요'}
                  </p>
                </div>
                <Button
                  onClick={handleSubmitQuest1}
                  disabled={!isFormValid}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                  size="lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Quest 1 제출
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Quest Progress */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quest Progress Card */}
              <Card className="p-6 border-gray-200 bg-white">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Quest 진행 상황
                </h3>
                <div className="space-y-4">
                  {project.quests.map((quest, index) => (
                    <div key={quest.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        quest.status === 'completed' ? 'bg-green-500' :
                        quest.status === 'in-progress' ? 'bg-blue-600' :
                        'bg-gray-300'
                      }`}>
                        {quest.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${
                          quest.status === 'in-progress' ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {quest.title.split(': ')[1]}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {quest.status === 'completed' ? '완료' :
                           quest.status === 'in-progress' ? '작성 중' :
                           '대기 중'}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">~ {quest.normalDeadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="p-6 border-blue-200 bg-blue-50">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  작성 팁
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>구체적이고 명확하게 작성하세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>다이어그램이나 스케치를 첨부하면 더 좋습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>실현 가능한 목표를 설정하세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>작성 내용은 자동 저장됩니다</span>
                  </li>
                </ul>
              </Card>

              {/* Community Actions Card */}
              <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-gray-900">커뮤니티 도움받기</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  막히는 부분이 있거나 도움이 필요하신가요?
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => setIsQuestionDialogOpen(true)}
                    className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-purple-300 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="font-semibold">질문하기</span>
                  </Button>
                  <Button
                    onClick={() => setIsShareProgressDialogOpen(true)}
                    className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                  >
                    <Rocket className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">진행 공유</span>
                  </Button>
                  <Button
                    onClick={() => setIsFindTeammateDialogOpen(true)}
                    className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                  >
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">팀원 찾기</span>
                  </Button>
                  <Button
                    onClick={() => setIsShareResourceDialogOpen(true)}
                    className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                  >
                    <Share2 className="w-4 h-4 mr-2 text-orange-600" />
                    <span className="text-sm">자료 공유</span>
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mt-4">
                  <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                  현재 프로젝트와 자동으로 연결됩니다
                </p>
              </Card>

              {/* Deadline Warning */}
              <Card className="p-4 border-orange-200 bg-orange-50">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">마감일 안내</h4>
                    <p className="text-xs text-gray-700">
                      정상 마감: <strong>{project.quests[0].normalDeadline}</strong><br />
                      최종 마감: <strong>{project.quests[0].finalDeadline}</strong>
                    </p>
                    <p className="text-xs text-orange-700 mt-2">
                      최종 마감일 이후 제출 시 감점이 적용됩니다
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question Dialog */}
      <AskQuestionDialog
        isOpen={isQuestionDialogOpen}
        onClose={() => setIsQuestionDialogOpen(false)}
        project={{
          id: project.id,
          title: project.title,
          contestName: project.contestName,
          tags: ['라즈베리파이', 'OpenCV', 'AI', '자율주행'],
        }}
        questNumber={1}
        questTitle="프로젝트 기획 및 설계"
      />

      {/* Share Progress Dialog */}
      <ShareProgressDialog
        isOpen={isShareProgressDialogOpen}
        onClose={() => setIsShareProgressDialogOpen(false)}
        project={{
          id: project.id,
          title: project.title,
          contestName: project.contestName,
          tags: ['라즈베리파이', 'OpenCV', 'AI', '자율주행'],
        }}
        questNumber={1}
        questTitle="프로젝트 기획 및 설계"
      />

      {/* Find Teammate Dialog */}
      <FindTeammateDialog
        isOpen={isFindTeammateDialogOpen}
        onClose={() => setIsFindTeammateDialogOpen(false)}
        project={{
          id: project.id,
          title: project.title,
          contestName: project.contestName,
          tags: ['라즈베리파이', 'OpenCV', 'AI', '자율주행'],
        }}
        questNumber={1}
        questTitle="프로젝트 기획 및 설계"
      />

      {/* Share Resource Dialog */}
      <ShareResourceDialog
        isOpen={isShareResourceDialogOpen}
        onClose={() => setIsShareResourceDialogOpen(false)}
        project={{
          id: project.id,
          title: project.title,
          contestName: project.contestName,
          tags: ['라즈베리파이', 'OpenCV', 'AI', '자율주행'],
        }}
        questNumber={1}
        questTitle="프로젝트 기획 및 설계"
      />
    </div>
  );
}