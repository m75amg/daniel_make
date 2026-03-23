import { useParams, Link, useNavigate } from 'react-router';
import { 
  ChevronRight, Image as ImageIcon, 
  AlertCircle, CheckCircle, Upload, Trophy, 
  Calendar, Target, Github, ExternalLink, Paperclip,
  Play, Link2, Clock, Sparkles, ChevronLeft,
  Zap, Settings, Award, Star, Rocket, Package,
  Video, FileCheck, Medal, Users, MessageSquare, Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { useState } from 'react';
import { AskQuestionDialog } from '../components/AskQuestionDialog';
import { ShareProgressDialog } from '../components/ShareProgressDialog';
import { FindTeammateDialog } from '../components/FindTeammateDialog';
import { ShareResourceDialog } from '../components/ShareResourceDialog';

export function Quest3Page() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Quest 3 정보
  const [quest3Title, setQuest3Title] = useState('');
  const [quest3Goal, setQuest3Goal] = useState('');
  const [quest3Content, setQuest3Content] = useState('');
  const [quest3Status, setQuest3Status] = useState('in-progress'); // pending | in-progress | completed
  
  // 최종 제출 정보
  const [finalSummary, setFinalSummary] = useState('');
  const [achievements, setAchievements] = useState('');
  const [futureWork, setFutureWork] = useState('');
  const [teamContribution, setTeamContribution] = useState('');
  
  // 질문 다이얼로그 상태
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);

  // 공유 다이얼로그 상태
  const [isShareProgressDialogOpen, setIsShareProgressDialogOpen] = useState(false);
  const [isFindTeammateDialogOpen, setIsFindTeammateDialogOpen] = useState(false);
  const [isShareResourceDialogOpen, setIsShareResourceDialogOpen] = useState(false);

  // 기술/링크 정보
  const [githubLink, setGithubLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [presentationLink, setPresentationLink] = useState('');
  const [referenceLink, setReferenceLink] = useState('');

  // Mock project data
  const project = {
    id: projectId,
    title: 'AI 음성인식 자율주행 로봇',
    contestName: 'AI 로봇 챌린지 2026',
    contestId: 'ai-robot-2026',
    gradient: 'from-blue-600 to-purple-600',
    deadline: '2026년 4월 30일',
    quests: [
      {
        id: 1,
        title: 'Quest 1: 프로젝트 기획 및 설계',
        description: '프로젝트 아이디어와 설계 방향을 구체화합니다',
        deadline: '2026년 3월 31일',
        points: 100,
        status: 'completed',
      },
      {
        id: 2,
        title: 'Quest 2: 프로토타입 제작',
        description: '실제 하드웨어/소프트웨어 프로토타입을 구현합니다',
        deadline: '2026년 4월 15일',
        points: 200,
        status: 'completed',
      },
      {
        id: 3,
        title: 'Quest 3: 최종 프로젝트 완성',
        description: '프로젝트를 완성하고 최종 결과물을 제출합니다',
        deadline: '2026년 4월 30일',
        points: 300,
        status: 'in-progress',
      },
    ],
  };

  const handleSubmitQuest3 = () => {
    // 실제로는 여기서 Quest 3 최종 제출 API 호출
    // Quest 3가 제출되면 프로젝트 완료 페이지로 이동
    navigate(`/project/${projectId}/completed`);
  };

  const isFormValid = 
    quest3Content.length >= 200 && 
    finalSummary.length >= 50 && 
    demoLink.trim() !== '';

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
            <span className="text-gray-900">Quest 3 작성</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className={`bg-gradient-to-r ${project.gradient} text-white py-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Rocket className="w-8 h-8" />
            </div>
            <div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-2">
                <Medal className="w-3 h-3 mr-1" />
                Quest 3 최종 제출 에디터
              </Badge>
              <h1 className="text-3xl font-bold">
                최종 프로젝트 완성 및 제출
              </h1>
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl">
            <strong>{project.title}</strong> 프로젝트의 최종 Quest를 작성합니다. 
            완성된 프로젝트와 그 성과를 자세히 소개하고, 콘테스트에 최종 제출하세요.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form - Left 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation to previous quest */}
            <Link 
              to={`/project/${projectId}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              프로젝트로 돌아가기
            </Link>

            {/* Quest 3 Info Card */}
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    Quest 3: 최종 프로젝트 완성 및 제출
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>프로젝트 완성도를 높이세요</strong> - Quest 1, 2에서 부족했던 부분 개선</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>데모 영상은 필수입니다</strong> - 실제 동작하는 모습을 보여주세요</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>프로젝트 성과와 배운 점을 정리하세요</strong> - 다른 메이커들에게 영감을</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span className="font-semibold text-yellow-900">제출 완료 시 프로젝트가 플랫폼에 공개됩니다!</span>
                    </li>
                  </ul>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-4 pt-4 border-t border-yellow-200">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      마감: {project.quests[2].deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {project.quests[2].points}점
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quest 3 Main Content */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">최종 프로젝트 상세 설명</h2>
                  <p className="text-sm text-gray-600">완성된 프로젝트를 상세히 소개하세요</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quest 3 Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Quest 3 세부 제목 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <input
                    type="text"
                    value={quest3Title}
                    onChange={(e) => setQuest3Title(e.target.value)}
                    placeholder="예: 완성된 자율주행 로봇 - 실내외 배송 시스템 구현"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Quest 3 Goal */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Quest 3 목표 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <textarea
                    value={quest3Goal}
                    onChange={(e) => setQuest3Goal(e.target.value)}
                    placeholder="최종 단계에서 달성한 목표를 작성하세요"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Quest 3 Content */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    최종 프로젝트 상세 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={quest3Content}
                    onChange={(e) => setQuest3Content(e.target.value)}
                    placeholder="완성된 프로젝트를 상세히 설명하세요:

• 최종 완성된 기능 및 성능
• Quest 2 이후 추가/개선된 내용
• 최종 시스템 아키텍처
• 사용된 모든 기술 스택 정리
• 성능 테스트 결과 및 분석
• 프로젝트의 실용성 및 활용 방안
• 예상치 못한 결과나 미로운 발견

마크다운 문법을 사용할 수 있습니다."
                    rows={20}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    최소 200자 이상 • 현재: {quest3Content.length}자
                  </p>
                </div>

                {/* Final Summary */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    프로젝트 최종 요약 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={finalSummary}
                    onChange={(e) => setFinalSummary(e.target.value)}
                    placeholder="이 프로젝트를 한눈에 이해할 수 있도록 핵심 내용을 요약하세요. 무엇을 만들었고, 어떻게 작동하며, 어떤 가치를 제공하는지 명확하게 설명하세요."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    최소 50자 이상 • 현재: {finalSummary.length}자 • 프로젝트 리스트에 노출되는 요약문입니다
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    주요 성과 및 배운 점 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <textarea
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                    placeholder="• 프로젝트를 통해 달성한 성과
• 기술적으로 배운 점
• 어려웠던 점과 극복 방법
• 향후 유사 프로젝트에 도움이 될 팁"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Future Work */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    향후 개선 계획 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <textarea
                    value={futureWork}
                    onChange={(e) => setFutureWork(e.target.value)}
                    placeholder="• 추가하고 싶은 기능
• 개선하고 싶은 부분
• 확장 가능성
• 다음 버전 계획"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Team Contribution (if team project) */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    팀 기여도 및 역할 <span className="text-gray-500 font-normal">(팀 프로젝트인 경우)</span>
                  </label>
                  <textarea
                    value={teamContribution}
                    onChange={(e) => setTeamContribution(e.target.value)}
                    placeholder="팀 프로젝트인 경우 각 팀원의 역할과 기여도를 작성하세요"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Final Media */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Video className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">최종 미디어 자료</h2>
                  <p className="text-sm text-gray-600">완성된 프로젝트의 사진과 영상을 업로드하세요</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Final Images */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    최종 프로젝트 이미지 <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                    <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      완성된 프로젝트의 고품질 이미지 업로드
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG (최대 10MB) • 여러 각도에서 촬영한 이미지 권장
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 대표 이미지는 프로젝트 리스트에 썸네일로 표시됩니다
                  </p>
                </div>

                {/* Demo Video - REQUIRED */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <Play className="w-4 h-4 inline mr-1" />
                    데모 영상 링크 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={demoLink}
                    onChange={(e) => setDemoLink(e.target.value)}
                    placeholder="https://youtube.com/... (필수)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    <strong className="text-red-600">필수:</strong> 프로젝트가 실제로 동작하는 영상을 YouTube, Vimeo 등에 업로드하고 링크를 입력하세요
                  </p>
                </div>

                {/* Presentation/Documentation */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <FileCheck className="w-4 h-4 inline mr-1" />
                    발표 자료 / 문서 링크 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <input
                    type="url"
                    value={presentationLink}
                    onChange={(e) => setPresentationLink(e.target.value)}
                    placeholder="Google Slides, PDF 등의 발표 자료 링크"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </Card>

            {/* Technical Resources */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">최종 기술 자료</h2>
                  <p className="text-sm text-gray-600">프로젝트 코드와 자료를 공유하세요</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* GitHub Link */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <Github className="w-4 h-4 inline mr-1" />
                    GitHub 저장소 <span className="text-gray-500 font-normal">(강력 권장)</span>
                  </label>
                  <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    오픈소스로 공유하면 다른 메이커들에게 도움이 됩니다
                  </p>
                </div>

                {/* Reference Link */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <ExternalLink className="w-4 h-4 inline mr-1" />
                    참고 링크 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <input
                    type="url"
                    value={referenceLink}
                    onChange={(e) => setReferenceLink(e.target.value)}
                    placeholder="블로그 포스트, 관련 논문, 외부 문서 등"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <Paperclip className="w-4 h-4 inline mr-1" />
                    최종 문서 및 자료 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      회로도, BOM, 3D 모델, 최종 보고서 등을 업로드
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, ZIP, STL, GERBER (최대 50MB)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quest Status */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">Quest 3 진행 상태</h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setQuest3Status('pending')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                    quest3Status === 'pending'
                      ? 'border-gray-400 bg-gray-50 text-gray-900'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1" />
                  시작 전
                </button>
                <button
                  onClick={() => setQuest3Status('in-progress')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                    quest3Status === 'in-progress'
                      ? 'border-yellow-400 bg-yellow-50 text-yellow-900'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Zap className="w-4 h-4 mx-auto mb-1" />
                  진행중
                </button>
                <button
                  onClick={() => setQuest3Status('completed')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                    quest3Status === 'completed'
                      ? 'border-green-400 bg-green-50 text-green-900'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mx-auto mb-1" />
                  최종 제출
                </button>
              </div>
            </Card>

            {/* Final Submit Warning */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-2">최종 제출 전 확인하세요:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>모든 Quest가 완료되었나요?</li>
                    <li>데모 영상이 프로젝트의 핵심 기능을 잘 보여주나요?</li>
                    <li>이미지가 고품질이며 프로젝트를 잘 설명하나요?</li>
                    <li>README나 문서가 충분히 작성되었나요?</li>
                    <li>제출 후에도 수정할 수 있지만, 심사는 첫 제출 시점 기준입니다</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link to={`/project/${projectId}`} className="flex-1">
                <Button variant="outline" className="w-full py-6 text-base">
                  저장하지 않고 나가기
                </Button>
              </Link>
              <Button 
                onClick={handleSubmitQuest3}
                disabled={!isFormValid}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed py-6 text-base font-semibold text-white"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Quest 3 최종 제출하기
              </Button>
            </div>

            {/* Validation Warning */}
            {!isFormValid && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">필수 항목을 입력해 주세요:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {quest3Content.length < 200 && (
                      <li>최종 프로젝트 상세 내용 (최소 200자)</li>
                    )}
                    {finalSummary.length < 50 && (
                      <li>프로젝트 최종 요약 (최소 50자)</li>
                    )}
                    {!demoLink.trim() && (
                      <li>데모 영상 링크 (필수)</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Project Info Card */}
              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-bold text-gray-900">프로젝트 정보</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">프로젝트</p>
                    <p className="font-semibold text-gray-900">{project.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">콘테스트</p>
                    <p className="font-semibold text-gray-900">{project.contestName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">최종 마감</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.deadline}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quest Progress */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-gray-900">Quest 진행 상황</h3>
                </div>
                <div className="space-y-3">
                  {project.quests.map((quest, index) => (
                    <div key={quest.id} className="relative">
                      {index < project.quests.length - 1 && (
                        <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          quest.status === 'completed'
                            ? 'bg-green-100 text-green-700' 
                            : quest.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {quest.status === 'completed' ? '✓' : quest.id}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className={`font-semibold text-sm mb-1 ${
                            quest.status === 'in-progress' ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            Quest {quest.id}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {quest.description}
                          </p>
                          <Badge 
                            variant={
                              quest.status === 'completed' ? 'default' : 
                              quest.status === 'in-progress' ? 'secondary' : 
                              'outline'
                            }
                            className="text-xs"
                          >
                            {quest.status === 'completed' ? '완료' : 
                             quest.status === 'in-progress' ? '진행중' : 
                             '대기중'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Submission Checklist */}
              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  제출 체크리스트
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className={quest3Content.length >= 200 ? "text-green-600" : "text-gray-400"}>
                      {quest3Content.length >= 200 ? '✓' : '○'}
                    </span>
                    <span>프로젝트 상세 설명 200자 이상</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={finalSummary.length >= 50 ? "text-green-600" : "text-gray-400"}>
                      {finalSummary.length >= 50 ? '✓' : '○'}
                    </span>
                    <span>최종 요약 50자 이상</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={demoLink.trim() ? "text-green-600" : "text-gray-400"}>
                      {demoLink.trim() ? '✓' : '○'}
                    </span>
                    <span>데모 영상 링크 첨부</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">○</span>
                    <span>프로젝트 이미지 업로드 (권장)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={githubLink.trim() ? "text-green-600" : "text-gray-400"}>
                      {githubLink.trim() ? '✓' : '○'}
                    </span>
                    <span>GitHub 저장소 링크 (권장)</span>
                  </li>
                </ul>
              </Card>

              {/* Award Info */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Medal className="w-4 h-4 text-purple-600" />
                  제출 완료 후
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>프로젝트가 플랫폼에 공개됩니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>다른 메이커들이 볼 수 있습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span>콘테스트 심사 대상이 됩니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>수정은 가능하지만 심사는 첫 제출 기준</span>
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
        questNumber={3}
        questTitle="최종 프로젝트 완성"
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
        questNumber={3}
        questTitle="최종 프로젝트 완성"
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
        questNumber={3}
        questTitle="최종 프로젝트 완성"
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
        questNumber={3}
        questTitle="최종 프로젝트 완성"
      />
    </div>
  );
}