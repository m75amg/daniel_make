import { useParams, Link, useNavigate } from 'react-router';
import { 
  ChevronRight, Rocket, Image as ImageIcon, FileText, 
  Tag, AlertCircle, CheckCircle, Upload, Trophy, Lightbulb,
  Users, Calendar, Target, Github, ExternalLink, Paperclip,
  Play, Link2, Clock, Layers, Settings, BookOpen, Sparkles,
  ChevronDown, ListChecks, Zap, FolderOpen, MessageSquare, Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { useState } from 'react';
import { AskQuestionDialog } from '../components/AskQuestionDialog';
import { ShareProgressDialog } from '../components/ShareProgressDialog';
import { FindTeammateDialog } from '../components/FindTeammateDialog';
import { ShareResourceDialog } from '../components/ShareResourceDialog';

export function CreateContestProjectPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  
  // 프로젝트 기본 정보
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [teamName, setTeamName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // 기술/링크 정보
  const [githubLink, setGithubLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  
  // 질문 다이얼로그 상태
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [isShareProgressOpen, setIsShareProgressOpen] = useState(false);
  const [isFindTeammateOpen, setIsFindTeammateOpen] = useState(false);
  const [isShareResourceOpen, setIsShareResourceOpen] = useState(false);

  // Mock contest data
  const contest = {
    id: contestId,
    name: 'AI 로봇 챌린지 2026',
    gradient: 'from-blue-600 to-purple-600',
    deadline: '2026년 4월 30일',
    quests: [
      {
        id: 1,
        title: 'Quest 1: 프로젝트 기획 및 설계',
        description: '프로젝트 아이디어와 설계 방향을 구체화합니다',
        deadline: '2026년 3월 31일',
        points: 100,
      },
      {
        id: 2,
        title: 'Quest 2: 프로토타입 제작',
        description: '실제 하드웨어/소프트웨어 프로토타입을 구현합니다',
        deadline: '2026년 4월 15일',
        points: 200,
      },
      {
        id: 3,
        title: 'Quest 3: 최종 프로젝트 완성',
        description: '프로젝트를 완성하고 최종 결과물을 제출합니다',
        deadline: '2026년 4월 30일',
        points: 300,
      },
    ],
  };

  const categories = [
    '로봇공학', 'IoT', 'AI/머신러닝', '3D프린팅', '웨어러블', '드론', '에너지', '기타'
  ];

  const availableTags = [
    '로봇공학', 'AI', '라즈베리파이', 'Arduino', 'OpenCV', 
    '자율주행', '머신러닝', 'IoT', 'Python', 'C++', 'ROS',
    'TensorFlow', 'Raspberry Pi', 'ESP32', '센서'
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 10) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleCreateProject = () => {
    // 실제로는 여기서 프로젝트 생성 API 호출
    // 프로젝트가 생성되면 Quest 1 페이지로 이동하여 첫 Quest 작성 시작
    navigate('/project/1/quest/1');
  };

  const isFormValid = title && summary && description && description.length >= 50 && category && teamName;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/contests" className="hover:text-blue-600 transition-colors">콘테스트</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/contest/${contestId}`} className="hover:text-blue-600 transition-colors">
              {contest.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">프로젝트 시작하기</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className={`bg-gradient-to-r ${contest.gradient} text-white py-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Rocket className="w-8 h-8" />
            </div>
            <div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-2">
                <Trophy className="w-3 h-3 mr-1" />
                콘테스트 프로젝트 에디터
              </Badge>
              <h1 className="text-3xl font-bold">
                콘테스트 프로젝트 시작하기
              </h1>
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl">
            <strong>{contest.name}</strong>에 참가합니다. 
            프로젝트를 등록하고 Quest를 단계별로 완료하면서 하나의 완성된 프로젝트를 만들어 갑니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form - Left 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Message Card */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    콘테스트 참가 = 프로젝트 생성
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Quest는 프로젝트를 완성하는 단계별 기록입니다</strong> - 3개의 별도 제출물이 아닙니다</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>모든 Quest 완료 후 하나의 완성된 프로젝트로 프로젝트 리스트에 노출됩니다</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>콘테스트 종료 후에도 프로젝트는 플랫폼에 계속 남습니다</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Section 1: 프로젝트 기본 정보 */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">프로젝트 기본 정보</h2>
                  <p className="text-sm text-gray-600">프로젝트의 핵심 내용을 입력하세요</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    프로젝트 제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: AI 음성인식 자율주행 로봇"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    프로젝트의 핵심을 명확하게 표현하는 제목
                  </p>
                </div>

                {/* One-line Summary */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    한줄 요약 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="예: 라즈베리파이와 OpenCV로 실내 자율주행이 가능한 로봇"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={100}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    프로젝트를 한 문장으로 소개 (최대 100자)
                  </p>
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    상세 설명 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="어떤 문제를 해결하나요? 어떤 기술을 사용할 예정인가요? 프로젝트의 목표와 기대 효과는 무엇인가요?"
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    최소 50자 이상 • 현재: {description.length}자
                  </p>
                </div>

                {/* Category & Team Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">선택하세요</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      팀명 / 작성자명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="예: 김메이커 또는 로봇팀"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    기술 태그 <span className="text-gray-500 font-normal">(최대 10개)</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                        {selectedTags.includes(tag) && (
                          <span className="ml-1.5">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    선택된 태그: {selectedTags.length}/10
                  </p>
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    대표 이미지 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                    <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      클릭하여 이미지 업로드
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG (최대 5MB) • Quest 제 시 추가 가능
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section 2: 기술 자료 및 링크 */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">기술 자료 및 링크 (선택)</h2>
                  <p className="text-sm text-gray-600">프로젝트 관련 링크와 문서를 연결하세요</p>
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
                    첨부 문서 <span className="text-gray-500 font-normal">(선택사항)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      설계 문서, 회로도 등을 로드
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, PPT (최대 10MB)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link to={`/contest/${contestId}`} className="flex-1">
                <Button variant="outline" className="w-full py-6 text-base">
                  취소
                </Button>
              </Link>
              <Button 
                onClick={handleCreateProject}
                disabled={!isFormValid}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed py-6 text-base font-semibold"
              >
                <Rocket className="w-5 h-5 mr-2" />
                프로젝트 등록하고 Quest 시작
              </Button>
            </div>

            {/* Validation Warning */}
            {!isFormValid && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">필수 항목을 입력해 주세요:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {!title && <li>프로젝트 제목</li>}
                    {!summary && <li>한줄 요약</li>}
                    {!description && <li>상세 설명</li>}
                    {description && description.length < 50 && <li>상세 설명 최소 50자</li>}
                    {!category && <li>카테고리</li>}
                    {!teamName && <li>팀명/작성자명</li>}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contest Info Card */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-gray-900">콘테스트 정보</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">참가 중인 콘테스트</p>
                    <p className="font-semibold text-gray-900">{contest.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">최종 마감</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {contest.deadline}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quest Structure */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Quest 진행 구조</h3>
                </div>
                <div className="space-y-3">
                  {contest.quests.map((quest, index) => (
                    <div key={quest.id} className="relative">
                      {index < contest.quests.length - 1 && (
                        <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          index === 0 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {quest.id}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className="font-semibold text-sm text-gray-900 mb-1">
                            Quest {quest.id}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {quest.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {quest.deadline}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Progress Info */}
              <Card className="p-6 bg-gray-50">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-5 h-5 text-gray-600" />
                  <h3 className="font-bold text-gray-900">프로젝트 진행 흐름</h3>
                </div>
                <div className="space-y-2.5 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong>프로젝트 등록</strong>
                      <p className="text-xs text-gray-600">지금 이 페이지</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong>Quest 1-3 완료</strong>
                      <p className="text-xs text-gray-600">단계별로 프로젝트 완성</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong>프로젝트 완성</strong>
                      <p className="text-xs text-gray-600">리스트에 공개</p>
                    </div>
                  </div>
                </div>
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
                    onClick={() => setIsShareProgressOpen(true)}
                    className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                  >
                    <Rocket className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">진행 공유</span>
                  </Button>
                  <Button
                    onClick={() => setIsFindTeammateOpen(true)}
                    className="w-full justify-start bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                  >
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">팀원 찾기</span>
                  </Button>
                  <Button
                    onClick={() => setIsShareResourceOpen(true)}
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

              {/* Help Info */}
              <Card className="p-5 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">도움말</p>
                    <p className="text-xs leading-relaxed">
                      프로젝트 등록 후 언제든지 수정할 수 있습니다. Quest는 순차적으로 진행됩니다.
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
          id: '1',
          title: title || '새 프로젝트',
          contestName: contest.name,
          tags: selectedTags,
        }}
      />
      {/* Share Progress Dialog */}
      <ShareProgressDialog
        isOpen={isShareProgressOpen}
        onClose={() => setIsShareProgressOpen(false)}
        project={{
          id: '1',
          title: title || '새 프로젝트',
          contestName: contest.name,
          tags: selectedTags,
        }}
      />
      {/* Find Teammate Dialog */}
      <FindTeammateDialog
        isOpen={isFindTeammateOpen}
        onClose={() => setIsFindTeammateOpen(false)}
        project={{
          id: '1',
          title: title || '새 프로젝트',
          contestName: contest.name,
          tags: selectedTags,
        }}
      />
      {/* Share Resource Dialog */}
      <ShareResourceDialog
        isOpen={isShareResourceOpen}
        onClose={() => setIsShareResourceOpen(false)}
        project={{
          id: '1',
          title: title || '새 프로젝트',
          contestName: contest.name,
          tags: selectedTags,
        }}
      />
    </div>
  );
}