import { useParams, Link, useNavigate } from 'react-router';
import { 
  ChevronRight, Image as ImageIcon, FileText, 
  AlertCircle, CheckCircle, Upload, Trophy, 
  Calendar, Target, Github, ExternalLink, Paperclip,
  Play, Link2, Clock, Sparkles, ChevronLeft,
  Zap, Settings, BookOpen, Wrench, Code, Cpu,
  MessageSquare, Rocket, Users, Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { useState } from 'react';
import { AskQuestionDialog } from '../components/AskQuestionDialog';
import { ShareProgressDialog } from '../components/ShareProgressDialog';
import { FindTeammateDialog } from '../components/FindTeammateDialog';
import { ShareResourceDialog } from '../components/ShareResourceDialog';

export function Quest2Page() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Quest 2 정보
  const [quest2Title, setQuest2Title] = useState('');
  const [quest2Goal, setQuest2Goal] = useState('');
  const [quest2Content, setQuest2Content] = useState('');
  const [quest2Status, setQuest2Status] = useState('in-progress'); // pending | in-progress | completed
  
  // 기술/링크 정보
  const [githubLink, setGithubLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [progressNotes, setProgressNotes] = useState('');
  
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
        points: 150,
        status: 'in-progress',
      },
      {
        id: 3,
        title: 'Quest 3: 최종 프로젝트 완성',
        description: '프로젝트를 완성하고 최종 결과물을 제출합니다',
        deadline: '2026년 4월 30일',
        points: 200,
        status: 'pending',
      },
    ],
  };

  const handleSubmitQuest2 = () => {
    // 실제로는 여기서 Quest 2 제출 API 호출
    // Quest 2가 제출되면 Quest 3 페이지로 이동하여 최종 단계 작성
    navigate(`/project/${projectId}/quest/3`);
  };

  const isFormValid = quest2Content.length >= 100;

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
            <span className="text-gray-900">Quest 2 작성</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className={`bg-gradient-to-r ${project.gradient} text-white py-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Wrench className="w-8 h-8" />
            </div>
            <div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-2">
                <Trophy className="w-3 h-3 mr-1" />
                Quest 2 에디터
              </Badge>
              <h1 className="text-3xl font-bold">
                프로토타입 제작 단계
              </h1>
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl">
            <strong>{project.title}</strong> 프로젝트의 Quest 2를 작성합니다. 
            실제 하드웨어/소프트웨어 프로토타입 제작 과정과 결과를 기록하세요.
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

            {/* Quest 2 Info Card */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    Quest 2: 프로토타입 제작
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>실제 제작 과정을 상세히 기록하세요</strong> - 사용한 부품, 코드, 회로도 등</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>겪은 문제와 해결 방법을 공유하세요</strong> - 다른 메이커에게 도움이 됩니다</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>프로토타입 사진/영상을 첨부하세요</strong> - 동작하는 모습을 보여주세요</span>
                    </li>
                  </ul>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-4 pt-4 border-t border-purple-200">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      마감: {project.quests[1].deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {project.quests[1].points}점
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quest 2 Main Content */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">프로토타입 제작 내용</h2>
                  <p className="text-sm text-gray-600">제작 과정과 결과를 상세히 작성하세요</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quest 2 Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Quest 2 세부 제목 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <input
                    type="text"
                    value={quest2Title}
                    onChange={(e) => setQuest2Title(e.target.value)}
                    placeholder="예: 라즈베리파이 기반 자율주행 프로토타입 구현"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    이번 단계의 주요 작업을 설명하는 제목
                  </p>
                </div>

                {/* Quest 2 Goal */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Quest 2 목표 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <textarea
                    value={quest2Goal}
                    onChange={(e) => setQuest2Goal(e.target.value)}
                    placeholder="이 단계에서 달성하고자 하는 목표를 작성하세요"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Quest 2 Content */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    프로토타입 제작 상세 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={quest2Content}
                    onChange={(e) => setQuest2Content(e.target.value)}
                    placeholder="프로토타입 제작 과정을 상세히 작성하세요:
                    
• 사용한 하드웨어/소프트웨어 스택
• 회로 설계 및 부품 연결 방법
• 주요 코드 설명 (알고리즘, 로직)
• 제작 과정에서 겪은 문제와 해결 방법
• 프로토타입의 현재 동작 상태
• 테스트 결과 및 개선 필요 사항

마크다운 문법을 사용할 수 있습니다."
                    rows={20}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    최소 100자 이상 • 현재: {quest2Content.length}자
                  </p>
                </div>

                {/* Progress Notes */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    진행 노트 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <textarea
                    value={progressNotes}
                    onChange={(e) => setProgressNotes(e.target.value)}
                    placeholder="다음 단계를 위한 메모나 개선 계획을 작성하세요"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Images & Media */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    프로토타입 이미지/영상 <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                    <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      클릭하여 이미지/영상 업로드
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, MP4 (최대 10MB) • 여러 파일 업로드 가능
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 프로토타입이 동작하는 사진이나 영상을 꼭 첨부해주세요
                  </p>
                </div>
              </div>
            </Card>

            {/* Technical Links & Resources */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">기술 자료 및 링크</h2>
                  <p className="text-sm text-gray-600">관련 링크와 자료를 업데이트하세요</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* GitHub Link */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <Github className="w-4 h-4 inline mr-1" />
                    GitHub 저장소 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Demo Link */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <Play className="w-4 h-4 inline mr-1" />
                    데모 영상 링크 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <input
                    type="url"
                    value={demoLink}
                    onChange={(e) => setDemoLink(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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
                    placeholder="관련 자료, 블로그, 논문 등"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    <Paperclip className="w-4 h-4 inline mr-1" />
                    추가 문서 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      회로도, 코드 파일, BOM 등을 업로드
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, ZIP, CODE (최대 20MB)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quest Status */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">Quest 2 진행 상태</h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setQuest2Status('pending')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                    quest2Status === 'pending'
                      ? 'border-gray-400 bg-gray-50 text-gray-900'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1" />
                  시작 전
                </button>
                <button
                  onClick={() => setQuest2Status('in-progress')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                    quest2Status === 'in-progress'
                      ? 'border-yellow-400 bg-yellow-50 text-yellow-900'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Zap className="w-4 h-4 mx-auto mb-1" />
                  진행중
                </button>
                <button
                  onClick={() => setQuest2Status('completed')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                    quest2Status === 'completed'
                      ? 'border-green-400 bg-green-50 text-green-900'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mx-auto mb-1" />
                  제출완료
                </button>
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
                onClick={handleSubmitQuest2}
                disabled={!isFormValid}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed py-6 text-base font-semibold"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Quest 2 제출하기
              </Button>
            </div>

            {/* Validation Warning */}
            {!isFormValid && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">필수 항목을 입력해 주세요:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {quest2Content.length < 100 && (
                      <li>프로토타입 제작 상세 내용 (최소 100자)</li>
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
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-5 h-5 text-blue-600" />
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

              {/* Tips Card */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  작성 팁
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>코드는 ```언어 형식으로 작성</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>회로 연결은 핀 번호 명시</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>문제 해결 과정도 기록</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>사진은 고해상도로 업로드</span>
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
        questNumber={2}
        questTitle="프로토타입 제작"
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
        questNumber={2}
        questTitle="프로토타입 제작"
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
        questNumber={2}
        questTitle="프로토타입 제작"
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
        questNumber={2}
        questTitle="프로토타입 제작"
      />
    </div>
  );
}