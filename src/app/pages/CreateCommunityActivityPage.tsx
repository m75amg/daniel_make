import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { 
  ArrowLeft, X, HelpCircle, Rocket, UserPlus, FolderOpen,
  Sparkles, Trophy, CheckCircle, Calendar, Tag, Upload,
  AlertCircle, Save
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function CreateCommunityActivityPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const type = searchParams.get('type') || 'question';
  const projectId = searchParams.get('projectId');
  const isDraft = searchParams.get('draft') === 'true';

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    images: [] as string[],
    linkedToProject: true,
    // 팀원찾기 전용
    positions: [] as string[],
    deadline: '',
    // 자료공유 전용
    resourceUrl: '',
    resourceType: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [positionInput, setPositionInput] = useState('');

  // 임시 프로젝트 데이터 (작성 중인 프로젝트)
  const [draftProjectData, setDraftProjectData] = useState<any>(null);

  // 세션 스토리지에서 임시 프로젝트 정보 가져오기
  useEffect(() => {
    if (isDraft) {
      const draftData = sessionStorage.getItem('draftProject');
      if (draftData) {
        try {
          const parsed = JSON.parse(draftData);
          setDraftProjectData(parsed);
          // 태그 자동 설정
          if (parsed.tags && parsed.tags.length > 0) {
            setFormData(prev => ({
              ...prev,
              tags: [...parsed.tags],
            }));
          }
        } catch (e) {
          console.error('Failed to parse draft project data:', e);
        }
      }
    }
  }, [isDraft]);

  // Mock 프로젝트 데이터 (실제로는 projectId로 API에서 가져옴)
  const projectData = projectId ? {
    id: projectId,
    title: 'AI 음성인식 자율주행 로봇',
    type: 'contest',
    contest: {
      id: '1',
      name: 'AI 로봇 챌린지 2026',
    },
    currentQuest: {
      number: 1,
      title: '프로젝트 기획 및 설계',
    },
    tags: ['라즈베리파이', 'OpenCV', 'AI', '자율주행'],
  } : null;

  const typeConfig = {
    question: {
      title: '질문하기',
      description: '현재 프로젝트와 연결된 질문을 등록합니다',
      icon: HelpCircle,
      color: 'blue',
      placeholder: '예: ESP32에서 MQTT 연결이 계속 끊기는데 해결 방법 있나요?',
    },
    progress: {
      title: '진행공유',
      description: '프로젝트 진행 상황을 공유합니다',
      icon: Rocket,
      color: 'purple',
      placeholder: '예: Quest 2 완료! 음성 인식 모듈 통합 성공 🎉',
    },
    teammate: {
      title: '팀원 찾기',
      description: '함께 프로젝트를 진행할 팀원을 모집합니다',
      icon: UserPlus,
      color: 'green',
      placeholder: '예: AI 로봇 프로젝트 함께할 팀원 모집합니다',
    },
    resource: {
      title: '자료 공유',
      description: '유용한 자료와 정보를 공유합니다',
      icon: FolderOpen,
      color: 'orange',
      placeholder: '예: ESP32 개발에 유용한 라이브러리 모음',
    },
  };

  const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.question;
  const Icon = config.icon;

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleAddPosition = () => {
    if (positionInput.trim() && !formData.positions.includes(positionInput.trim())) {
      setFormData({
        ...formData,
        positions: [...formData.positions, positionInput.trim()],
      });
      setPositionInput('');
    }
  };

  const handleRemovePosition = (position: string) => {
    setFormData({
      ...formData,
      positions: formData.positions.filter(p => p !== position),
    });
  };

  const handleSubmit = () => {
    // 실제로는 API 호출
    console.log('Submitting community activity:', { type, ...formData });
    alert(`${config.title}이(가) 등록되었습니다!`);
    navigate('/community');
  };

  const handleSaveDraft = () => {
    // 임시 저장 로직
    console.log('Saving draft:', { type, ...formData });
    alert('임시 저장되었습니다!');
  };

  const isFormValid = formData.title.trim() && formData.content.trim();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                뒤로
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
                <p className="text-sm text-gray-600 mt-1">{config.description}</p>
              </div>
            </div>
            <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* 연결된 프로젝트 */}
          {projectId && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-${config.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <Sparkles className={`w-6 h-6 text-${config.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">연결된 프로젝트</h3>
                  <p className="text-sm text-gray-600 mb-3">이 질문은 아래 프로젝트와 자동으로 연결됩니다</p>
                  
                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">프로젝트명</p>
                      <p className="font-bold text-gray-900">{projectData.title}</p>
                    </div>

                    {projectData.type === 'contest' && projectData.contest && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">콘테스트</p>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-purple-600" />
                          <p className="text-sm font-semibold text-purple-600">{projectData.contest.name}</p>
                        </div>
                      </div>
                    )}

                    {projectData.currentQuest && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">진행 중인 Quest</p>
                        <Badge className="bg-blue-600 text-white border-0">
                          Quest {projectData.currentQuest.number}: {projectData.currentQuest.title}
                        </Badge>
                      </div>
                    )}

                    {projectData.tags && projectData.tags.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 mb-2">기술 태그</p>
                        <div className="flex flex-wrap gap-2">
                          {projectData.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-200">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.linkedToProject}
                          onChange={(e) => setFormData({ ...formData, linkedToProject: e.target.checked })}
                          className="mt-0.5 w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                        />
                        <span className="text-xs text-gray-700 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          커뮤니티 Q&A에 등록되며, 프로젝트 상세에서도 확인할 수 있습니다
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 프로젝트 없이 작성하는 경우 */}
          {!projectId && !isDraft && (
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    프로젝트와 연결하지 않고 작성합니다
                  </p>
                  <p className="text-xs text-gray-600">
                    프로젝트를 진행 중이라면 해당 프로젝트와 연결하여 작성하는 것을 추천합니다
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* 작성 중인 프로젝트 (draft) */}
          {!projectId && isDraft && draftProjectData && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-${config.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <Sparkles className={`w-6 h-6 text-${config.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">작성 중인 프로젝트</h3>
                  <p className="text-sm text-gray-600 mb-3">현재 생성 중인 프로젝트와 연결됩니다</p>
                  
                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">프로젝트명</p>
                      <p className="font-bold text-gray-900">{draftProjectData.title}</p>
                    </div>

                    {draftProjectData.type && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">프로젝트 유형</p>
                        <Badge className="bg-blue-100 text-blue-700 border-0">
                          {draftProjectData.type === 'personal' ? '개인 프로젝트' : '콘테스트 프로젝트'}
                        </Badge>
                      </div>
                    )}

                    {draftProjectData.category && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">카테고리</p>
                        <Badge variant="outline" className="text-xs">
                          {draftProjectData.category}
                        </Badge>
                      </div>
                    )}

                    {draftProjectData.tags && draftProjectData.tags.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 mb-2">기술 태그</p>
                        <div className="flex flex-wrap gap-2">
                          {draftProjectData.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">
                          프로젝트 생성을 완료하면 이 {type === 'question' ? '질문' : type === 'progress' ? '진행공유' : type === 'teammate' ? '팀원 모집' : '자료'}이 해당 프로젝트와 자동으로 연결됩니다
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 제목 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {type === 'question' ? '질문 제목' : 
                   type === 'progress' ? '진행 내용 제목' :
                   type === 'teammate' ? '모집 제목' :
                   '자료 제목'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={config.placeholder}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>

          {/* 내용 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {type === 'question' ? '질문 내용' : 
                   type === 'progress' ? '진행 내용' :
                   type === 'teammate' ? '모집 내용' :
                   '자료 설명'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder={
                    type === 'question' ? '문제 상황, 시도한 해결 방법, 에러 메시지 등을 자세히 작성해주세요...' :
                    type === 'progress' ? '진행한 내용, 배운 점, 어려웠던 점, 다음 계획 등을 작성해주세요...' :
                    type === 'teammate' ? '프로젝트 소개, 필요한 역할, 활동 기간, 요구 사항 등을 작성해주세요...' :
                    '자료에 대한 설명, 활용 방법, 참고 사항 등을 작성해주세요...'
                  }
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {formData.content.length}자 / 최소 50자 권장
                </p>
              </div>

              {/* 이미지 업로드 */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  이미지 첨부 (선택)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">이미지를 드래그하거나 클릭하여 업로드</p>
                  <p className="text-xs text-gray-500">JPG, PNG (최대 5MB, 최대 5개)</p>
                </div>
              </div>
            </div>
          </Card>

          {/* 팀원찾기 전용 필드 */}
          {type === 'teammate' && (
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">모집 정보</h3>
              <div className="space-y-4">
                {/* 모집 포지션 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    모집 포지션
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="예: 프론트엔드 개발자, 하드웨어 엔지니어"
                      value={positionInput}
                      onChange={(e) => setPositionInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddPosition()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Button onClick={handleAddPosition} disabled={!positionInput.trim()}>
                      추가
                    </Button>
                  </div>
                  {formData.positions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.positions.map((position) => (
                        <Badge
                          key={position}
                          className="bg-green-100 text-green-700 border-0 px-3 py-1.5 text-sm"
                        >
                          {position}
                          <button
                            onClick={() => handleRemovePosition(position)}
                            className="ml-2 hover:text-green-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* 모집 마감일 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    모집 마감일 (선택)
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 자료공유 전용 필드 */}
          {type === 'resource' && (
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">자료 정보</h3>
              <div className="space-y-4">
                {/* 자료 URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    자료 링크 (선택)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.resourceUrl}
                    onChange={(e) => setFormData({ ...formData, resourceUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* 자료 타입 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    자료 유형 (선택)
                  </label>
                  <select
                    value={formData.resourceType}
                    onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">선택</option>
                    <option value="tutorial">튜토리얼</option>
                    <option value="library">라이브러리</option>
                    <option value="tool">개발 도구</option>
                    <option value="article">아티클</option>
                    <option value="video">영상</option>
                    <option value="code">코드</option>
                    <option value="etc">기타</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          {/* 태그 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-600" />
                  태그 (선택)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="태그 입력 후 추가"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={handleAddTag} disabled={!tagInput.trim()}>
                    추가
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-blue-100 text-blue-700 border-0 px-3 py-1.5 text-sm"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* 필수 입력 안내 */}
          {!isFormValid && (
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800 mb-1">
                    필수 항목을 모두 입력해 주세요
                  </p>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    {!formData.title && <li>• 제목을 입력하세요</li>}
                    {!formData.content && <li>• 내용을 입력하세요</li>}
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {/* 하단 버튼 */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center justify-center gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                취소
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleSaveDraft}
              >
                <Save className="w-4 h-4 mr-2" />
                임시 저장
              </Button>
              <Button
                size="lg"
                className={`bg-${config.color}-600 hover:bg-${config.color}-700 text-white px-8`}
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                {type === 'question' ? '질문 등록' :
                 type === 'progress' ? '진행공유 등록' :
                 type === 'teammate' ? '팀원 모집 등록' :
                 '자료 등록'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}