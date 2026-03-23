import { useState } from 'react';
import { useNavigate } from 'react-router'; // react-router (not react-router-dom)
import { 
  ArrowLeft, Upload, Plus, X, Link as LinkIcon, 
  Tag, FileText, Image as ImageIcon, Save, Eye,
  Sparkles, CheckCircle, Users, Target, Lightbulb,
  Cpu, Code, Layers, HelpCircle, Rocket, 
  UserPlus, FolderOpen, MessageCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CommunityDrawer } from '../components/CommunityDrawer';
import { FindTeammateDialog } from '../components/FindTeammateDialog';
import { AskQuestionDialog } from '../components/AskQuestionDialog';
import { ShareProgressDialog } from '../components/ShareProgressDialog';
import { ShareResourceDialog } from '../components/ShareResourceDialog';
import { ProjectPreviewPanel } from '../components/ProjectPreviewPanel';

export function CreatePersonalProjectPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    difficulty: '',
    goal: '',
    hardware: [] as string[],
    software: [] as string[],
    tags: [] as string[],
    coverImage: '',
    links: [] as { type: string; url: string }[],
    teamProject: false,
    teamName: '',
    expectedDuration: '',
  });
  
  const [tagInput, setTagInput] = useState('');
  const [hardwareInput, setHardwareInput] = useState('');
  const [softwareInput, setSoftwareInput] = useState('');
  const [linkType, setLinkType] = useState('GitHub');
  const [linkUrl, setLinkUrl] = useState('');

  // Drawer 상태
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'question' | 'progress' | 'teammate' | 'resource'>('question');
  const [isFindTeammateDialogOpen, setIsFindTeammateDialogOpen] = useState(false);
  const [isAskQuestionDialogOpen, setIsAskQuestionDialogOpen] = useState(false);
  const [isShareProgressDialogOpen, setIsShareProgressDialogOpen] = useState(false);
  const [isShareResourceDialogOpen, setIsShareResourceDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const categories = [
    'AI & 머신러닝',
    '로봇공학',
    'IoT',
    '임베디드',
    '웹/앱 개발',
    '하드웨어',
    '3D 프린팅',
    '드론',
    '스마트홈',
    '기타',
  ];

  const difficulties = [
    { value: 'beginner', label: '초급', description: '기본적인 전자/프로그래밍 지식' },
    { value: 'intermediate', label: '중급', description: '일정 수준의 경험 필요' },
    { value: 'advanced', label: '고급', description: '전문적인 지식과 경험 필요' },
  ];

  const durations = [
    '1주 이내',
    '2-4주',
    '1-2개월',
    '3-6개월',
    '6개월 이상',
  ];

  const linkTypes = ['GitHub', 'YouTube', 'Website', 'Blog', '기타'];

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleAddHardware = () => {
    if (hardwareInput.trim() && !formData.hardware.includes(hardwareInput.trim())) {
      setFormData({ ...formData, hardware: [...formData.hardware, hardwareInput.trim()] });
      setHardwareInput('');
    }
  };

  const handleRemoveHardware = (item: string) => {
    setFormData({ ...formData, hardware: formData.hardware.filter(h => h !== item) });
  };

  const handleAddSoftware = () => {
    if (softwareInput.trim() && !formData.software.includes(softwareInput.trim())) {
      setFormData({ ...formData, software: [...formData.software, softwareInput.trim()] });
      setSoftwareInput('');
    }
  };

  const handleRemoveSoftware = (item: string) => {
    setFormData({ ...formData, software: formData.software.filter(s => s !== item) });
  };

  const handleAddLink = () => {
    if (linkUrl.trim()) {
      setFormData({ ...formData, links: [...formData.links, { type: linkType, url: linkUrl.trim() }] });
      setLinkUrl('');
    }
  };

  const handleRemoveLink = (index: number) => {
    setFormData({ ...formData, links: formData.links.filter((_, i) => i !== index) });
  };

  const handleSubmit = () => {
    console.log('Creating project with data:', formData);
    alert('개인 프로젝트가 생성되었습니다!');
    navigate('/my-make');
  };

  const isFormValid = formData.title && formData.subtitle && formData.description && formData.category;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                뒤로
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">개인 프로젝트 만들기</h1>
                <p className="text-sm text-gray-600 mt-1">자유롭게 나만의 프로젝트를 시작하세요</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
                <Eye className="w-4 h-4 mr-2" />
                미리보기
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                <Save className="w-4 h-4 mr-2" />
                프로젝트 생성
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* 기본 정보 */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">기본 정보</h2>
                  <p className="text-sm text-gray-600">프로젝트의 핵심 정보를 입력하세요</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    프로젝트 제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="예: ESP32 기반 스마트 화분 시스템"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">명확하고 구체적인 제목을 작성하세요</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    한줄 소개 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="예: 토양 수분, 온도, 조도를 모니터링하고 자동으로 물을 주는 IoT 화분"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    프로젝트를 한 문장으로 요약하세요 ({formData.subtitle.length}/100자)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">선택</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      난이도
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">선택</option>
                      {difficulties.map((diff) => (
                        <option key={diff.value} value={diff.value}>
                          {diff.label} - {diff.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    프로젝트 설명 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="프로젝트의 목적, 주요 기능, 사용 기술, 예상 결과물 등을 자세히 설명해주세요..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length}자 / 최소 100자 권장
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    프로젝트 목표 &amp; 동기
                  </label>
                  <textarea
                    placeholder="이 프로젝트를 시작하게 된 이유와 달성하고자 하는 목표를 작성하세요..."
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Quest 진행 시 활용됩니다</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    예상 소요 기간
                  </label>
                  <select
                    value={formData.expectedDuration}
                    onChange={(e) => setFormData({ ...formData, expectedDuration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">선택</option>
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* 기술 스택 */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">기술 스택</h2>
                  <p className="text-sm text-gray-600">사용할 하드웨어와 소프트웨어를 추가하세요</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-purple-600" /> 하드웨어 / 부품</span>
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="예: ESP32, DHT22 센서, 릴레이 모듈"
                      value={hardwareInput}
                      onChange={(e) => setHardwareInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddHardware()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button onClick={handleAddHardware} disabled={!hardwareInput.trim()}>
                      <Plus className="w-4 h-4 mr-1" />추가
                    </Button>
                  </div>
                  {formData.hardware.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.hardware.map((item) => (
                        <Badge key={item} className="bg-purple-100 text-purple-700 border-0 px-3 py-1.5 text-sm">
                          <Cpu className="w-3 h-3 mr-1" />{item}
                          <button onClick={() => handleRemoveHardware(item)} className="ml-2 hover:text-purple-900">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <span className="flex items-center gap-2"><Code className="w-4 h-4 text-blue-600" /> 소프트웨어 / 라이브러리</span>
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="예: Arduino IDE, Python, MQTT, OpenCV"
                      value={softwareInput}
                      onChange={(e) => setSoftwareInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSoftware()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleAddSoftware} disabled={!softwareInput.trim()}>
                      <Plus className="w-4 h-4 mr-1" />추가
                    </Button>
                  </div>
                  {formData.software.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.software.map((item) => (
                        <Badge key={item} className="bg-blue-100 text-blue-700 border-0 px-3 py-1.5 text-sm">
                          <Code className="w-3 h-3 mr-1" />{item}
                          <button onClick={() => handleRemoveSoftware(item)} className="ml-2 hover:text-blue-900">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* 대표 이미지 */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">대표 이미지</h2>
                  <p className="text-sm text-gray-600">프로젝트를 대표하는 이미지를 업로드하세요</p>
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-500 transition-colors cursor-pointer">
                {formData.coverImage ? (
                  <div className="relative">
                    <ImageWithFallback
                      src={formData.coverImage}
                      alt="Cover"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-white"
                      onClick={() => setFormData({ ...formData, coverImage: '' })}
                    >
                      <X className="w-4 h-4 mr-1" />제거
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-900 mb-1">이미지 업로드</p>
                    <p className="text-xs text-gray-500">JPG, PNG 파일 (최대 5MB)</p>
                    <Button size="sm" className="mt-4">파일 선택</Button>
                  </div>
                )}
              </div>
            </Card>

            {/* 태그 */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">태그</h2>
                  <p className="text-sm text-gray-600">프로젝트 검색을 위한 태그를 추가하세요</p>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="태그 입력 후 추가 버튼 클릭"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Button onClick={handleAddTag} disabled={!tagInput.trim()}>
                  <Plus className="w-4 h-4 mr-1" />추가
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} className="bg-green-100 text-green-700 border-0 px-3 py-1.5 text-sm">
                      #{tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-2 hover:text-green-900">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>추천 태그:</strong> Arduino, ESP32, Raspberry Pi, 센서, AI, 딥러닝, IoT, 자동화 등
                </p>
              </div>
            </Card>

            {/* 관련 링크 */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">관련 링크</h2>
                  <p className="text-sm text-gray-600">GitHub, 블로그 등 관련 링크를 추가하세요</p>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <select
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {linkTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <input
                  type="url"
                  placeholder="https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button onClick={handleAddLink} disabled={!linkUrl.trim()}>
                  <Plus className="w-4 h-4 mr-1" />추가
                </Button>
              </div>
              {formData.links.length > 0 && (
                <div className="space-y-2">
                  {formData.links.map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Badge className="bg-orange-100 text-orange-700 border-0 flex-shrink-0">{link.type}</Badge>
                        <span className="text-sm text-blue-600 truncate">{link.url}</span>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => handleRemoveLink(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* 팀 구성 */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">팀 구성</h2>
                  <p className="text-sm text-gray-600">혼자 진행하거나 팀으로 진행할 수 있습니다</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.teamProject}
                    onChange={(e) => setFormData({ ...formData, teamProject: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">팀 프로젝트로 진행</p>
                    <p className="text-xs text-gray-600">여러 명이 함께 참여하는 프로젝트입니다</p>
                  </div>
                </label>
                {formData.teamProject && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">팀 이름</label>
                    <input
                      type="text"
                      placeholder="예: 메이커즈 팀, AI 로봇팀"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* 하단 액션 */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">프로젝트를 생성할 준비가 되었나요?</h3>
                </div>
                {!isFormValid && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4 text-left">
                    <p className="text-sm text-yellow-800 font-semibold mb-2">⚠️ 필수 정보를 모두 입력해주세요</p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      {!formData.title && <li>• 프로젝트 제목</li>}
                      {!formData.subtitle && <li>• 한줄 소개</li>}
                      {!formData.category && <li>• 카테고리</li>}
                      {!formData.description && <li>• 프로젝트 설명</li>}
                    </ul>
                  </div>
                )}
                <div className="flex gap-3 justify-center">
                  <Button size="lg" variant="outline" onClick={() => navigate(-1)} className="px-8">
                    <ArrowLeft className="w-5 h-5 mr-2" />취소
                  </Button>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 shadow-lg"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                  >
                    <Save className="w-5 h-5 mr-2" />프로젝트 생성하기
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-4">프로젝트를 생성한 후에도 언제든지 수정할 수 있습니다</p>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* 프로젝트 타입 */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <Badge className="bg-blue-600 text-white border-0 mb-2">개인 프로젝트</Badge>
                  <h3 className="font-bold text-gray-900 text-sm">자유로운 프로젝트</h3>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">개인 프로젝트는 자유롭게 시작하고 진행할 수 있습니다.</p>
              <div className="space-y-2">
                {['나만의 속도로 진행', '언제든 수정 가능', '포트폴리오로 활용'].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quest 시스템 안내 */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-3">Quest 시스템</h3>
              <p className="text-sm text-gray-600 mb-4">개인 프로젝트도 Quest 단계를 통해 체계적으로 진행할 수 있습니다.</p>
              <div className="space-y-3">
                {[
                  { num: '1', color: 'blue', title: '프로젝트 계획', desc: '아이디어와 목표 정리' },
                  { num: '2', color: 'purple', title: '제작 & 개발', desc: '실제 구현 진행' },
                  { num: '3', color: 'green', title: '완성 & 공유', desc: '결과 정리 및 공개' },
                ].map(({ num, color, title, desc }) => (
                  <div key={num} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full bg-${color}-100 flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-xs font-bold text-${color}-600`}>{num}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{title}</p>
                      <p className="text-xs text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 필수 정보 체크리스트 */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                필수 정보 체크리스트
              </h3>
              <div className="space-y-2">
                {[
                  { label: '프로젝트 제목', done: !!formData.title },
                  { label: '한줄 소개', done: !!formData.subtitle },
                  { label: '카테고리', done: !!formData.category },
                  { label: '프로젝트 설명 (100자 이상)', done: formData.description.length >= 100 },
                ].map(({ label, done }) => (
                  <div key={label} className={`flex items-center gap-2 text-sm ${done ? 'text-green-700' : 'text-gray-600'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${done ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {done && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 작성 팁 */}
            <Card className="p-6 bg-gray-50">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                작성 팁
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• 명확한 제목으로 프로젝트 목적을 전달하세요</p>
                <p>• 한줄 소개는 누구나 이해할 수 있게 작성하세요</p>
                <p>• 사용한 기술 부품을 구체적으로 작성하세요</p>
                <p>• 프로젝트 목표를 작성하면 Quest 진행이 수월합니다</p>
                <p>• 코드는 GitHub 링크로 공유하세요</p>
              </div>
            </Card>

            {/* 커뮤니티 도움받기 */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-900">커뮤니티 도움받기</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                프로젝트를 진행하며 막히는 부분이 있나요? 커뮤니티에서 도움을 받아보세요!
              </p>
              <div className="space-y-2">
                {[
                  { label: '질문하기', desc: '막히는 부분을 물어보세요', icon: HelpCircle, color: 'blue', action: () => setIsAskQuestionDialogOpen(true) },
                  { label: '진행공유', desc: '진행 과정을 기록하세요', icon: Rocket, color: 'purple', action: () => setIsShareProgressDialogOpen(true) },
                  { label: '팀원 찾기', desc: '함께할 팀원을 모집하세요', icon: UserPlus, color: 'green', action: () => setIsFindTeammateDialogOpen(true) },
                  { label: '자료 공유', desc: '유용한 자료를 찾아보세요', icon: FolderOpen, color: 'orange', action: () => setIsShareResourceDialogOpen(true) },
                ].map(({ label, desc, icon: Icon, color, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className={`w-full p-3 bg-white hover:bg-${color}-50 border border-purple-200 hover:border-${color}-400 rounded-lg transition-all text-left group`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-${color}-100 flex items-center justify-center group-hover:bg-${color}-200 transition-colors`}>
                        <Icon className={`w-4 h-4 text-${color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{label}</p>
                        <p className="text-xs text-gray-600">{desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-xs text-gray-700 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>커뮤니티는 프로젝트 진행 중 언제든 활용할 수 있습니다!</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Community Drawer (legacy) */}
      <CommunityDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        type={drawerType}
        isDraft={true}
      />

      {/* 질문하기 Dialog */}
      <AskQuestionDialog
        isOpen={isAskQuestionDialogOpen}
        onClose={() => setIsAskQuestionDialogOpen(false)}
        project={{
          id: 'draft',
          title: formData.title || '작성 중인 개인 프로젝트',
          category: formData.category,
          tags: formData.tags,
        }}
      />

      {/* 진행공유 Dialog */}
      <ShareProgressDialog
        isOpen={isShareProgressDialogOpen}
        onClose={() => setIsShareProgressDialogOpen(false)}
        project={{
          id: 'draft',
          title: formData.title || '작성 중인 개인 프로젝트',
          category: formData.category,
          tags: formData.tags,
        }}
      />

      {/* 팀원찾기 Dialog */}
      <FindTeammateDialog
        isOpen={isFindTeammateDialogOpen}
        onClose={() => setIsFindTeammateDialogOpen(false)}
        project={{
          id: 'draft',
          title: formData.title || '작성 중인 개인 프로젝트',
          category: formData.category,
          tags: formData.tags,
        }}
      />

      {/* 자료공유 Dialog */}
      <ShareResourceDialog
        isOpen={isShareResourceDialogOpen}
        onClose={() => setIsShareResourceDialogOpen(false)}
        project={{
          id: 'draft',
          title: formData.title || '작성 중인 개인 프로젝트',
          category: formData.category,
          tags: formData.tags,
        }}
      />

      {/* 미리보기 패널 */}
      <ProjectPreviewPanel
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        formData={formData}
      />
    </div>
  );
}