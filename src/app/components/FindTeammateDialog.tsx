import { useState } from 'react';
import { 
  X, AlertCircle, Sparkles, Users, 
  Github, ExternalLink, Check, UserPlus,
  FileText, Trophy, Mail, MessageSquare, Calendar, Target, FolderOpen, ChevronDown,
  CheckCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { useTeammate } from '../context/TeammateContext';

interface FindTeammateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project?: {
    id: string;
    title: string;
    contestName?: string;
    category?: string;
    tags?: string[];
  };
  questNumber?: number;
  questTitle?: string;
}

const myProjects = [
  { id: '1', title: 'AI 음성인식 자율주행 로봇', category: '로봇공학', tags: ['AI', '라즈베리파이', 'OpenCV'] },
  { id: '2', title: 'ESP32 기반 스마트 화분', category: 'IoT', tags: ['ESP32', 'IoT', '자동화'] },
  { id: '3', title: '3D 프린터 자동 레벨링 시스템', category: '3D 프린팅', tags: ['Arduino', 'AI'] },
];

export function FindTeammateDialog({ 
  isOpen, 
  onClose, 
  project,
  questNumber,
  questTitle
}: FindTeammateDialogProps) {
  const { addPost } = useTeammate();
  const [recruitTitle, setRecruitTitle] = useState('');
  const [projectIntro, setProjectIntro] = useState('');
  const [currentStage, setCurrentStage] = useState('');
  const [neededRoles, setNeededRoles] = useState('');
  const [collaboration, setCollaboration] = useState('');
  const [contact, setContact] = useState('');
  const [selectedRoleTypes, setSelectedRoleTypes] = useState<string[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedProject = project ?? myProjects.find(p => p.id === selectedProjectId) ?? null;

  const roleTypes = [
    { value: 'developer', label: '개발자', icon: Target, color: 'blue' },
    { value: 'hardware', label: '하드웨어', icon: Sparkles, color: 'purple' },
    { value: 'designer', label: '디자이너', icon: FileText, color: 'pink' },
    { value: 'researcher', label: '연구자', icon: AlertCircle, color: 'green' },
    { value: 'marketer', label: '마케터', icon: Users, color: 'orange' },
    { value: 'etc', label: '기타', icon: UserPlus, color: 'gray' },
  ];

  const toggleRoleType = (value: string) => {
    setSelectedRoleTypes(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    const roleLabels = selectedRoleTypes.map(v => roleTypes.find(r => r.value === v)?.label ?? v);
    addPost({
      title: recruitTitle,
      projectId: selectedProject?.id,
      projectTitle: selectedProject?.title,
      contestName: (selectedProject as any)?.contestName,
      roles: roleLabels,
      deadline: 'D-30',
      status: 'recruiting',
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setRecruitTitle('');
    setProjectIntro('');
    setCurrentStage('');
    setNeededRoles('');
    setCollaboration('');
    setContact('');
    setSelectedRoleTypes([]);
    setSelectedProjectId('');
    onClose();
  };

  const isFormValid = recruitTitle && projectIntro && neededRoles && collaboration && contact && selectedRoleTypes.length > 0;

  if (!isOpen) return null;

  // 제출 완료 화면
  if (submitted) {
    return (
      <>
        <div 
          className="fixed inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={handleClose}
        />
        <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex items-center justify-center animate-in slide-in-from-right duration-300">
          <div className="text-center px-8 py-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">팀원 모집 등록 완료!</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-gray-900">"{recruitTitle}"</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              커뮤니티와 메인페이지에 공개되었습니다.<br />
              지원자가 생기면 내 My Make 알림으로 안내드립니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3 text-sm text-green-800">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                커뮤니티 게시판에 공개됨
              </div>
              <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                My Make 활동 내역에 기록됨
              </div>
              <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-3 text-sm text-purple-800">
                <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                지원 시 My Make 알림으로 연결됨
              </div>
            </div>
            <Button onClick={handleClose} className="mt-8 w-full bg-green-600 hover:bg-green-700">
              확인
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">팀원 찾기</h2>
              <p className="text-sm text-gray-600 mt-1">
                {project ? '현재 프로젝트와 연결된 팀원 모집을 시작합니다' : '커뮤니티에 팀원을 모집합니다'}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Connected Project Info */}
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">연결된 프로젝트</h3>
                <p className="text-sm text-gray-600">
                  {project ? '이 팀원 모집은 아래 프로젝트와 자동으로 연결됩니다' : '내 프로젝트를 선택하면 팀원 모집이 자동으로 연결됩니다'}
                </p>
              </div>
            </div>

            {!project && (
              <div className="mb-3">
                <div className="relative">
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm font-medium text-gray-800"
                  >
                    <option value="">내 프로젝트 선택 (선택사항)</option>
                    {myProjects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg p-4 space-y-3">
              {selectedProject ? (
                <>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">프로젝트명</p>
                    <p className="font-bold text-gray-900">{selectedProject.title}</p>
                  </div>
                  {('contestName' in selectedProject) && selectedProject.contestName && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">콘테스트</p>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-purple-600" />
                        <p className="font-semibold text-purple-900">{selectedProject.contestName}</p>
                      </div>
                    </div>
                  )}
                  {questNumber && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">진행 중인 Quest</p>
                      <Badge className="bg-blue-600 text-white">Quest {questNumber}: {questTitle}</Badge>
                    </div>
                  )}
                  {selectedProject.tags && selectedProject.tags.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">기술 태그</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3 py-2">
                  <FolderOpen className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-500">프로젝트를 선택하지 않으면 커뮤니티 일반 팀원 모집으로 등록됩니다</p>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  커뮤니티에 공개되며, 관심 있는 메이커들이 연락할 수 있습니다
                </p>
              </div>
            </div>
          </Card>

          {/* Recruit Title */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              모집 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={recruitTitle}
              onChange={(e) => setRecruitTitle(e.target.value)}
              placeholder="예: AI 로봇 프로젝트 함께할 하드웨어 엔지니어 구합니다"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">모집 목적을 명확하게 요약하세요</p>
          </div>

          {/* Role Type Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              필요한 역할 유형 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roleTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedRoleTypes.includes(type.value);
                return (
                  <button
                    key={type.value}
                    onClick={() => toggleRoleType(type.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? `border-${type.color}-500 bg-${type.color}-50`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? `text-${type.color}-600` : 'text-gray-600'}`} />
                    <p className={`text-sm font-semibold ${isSelected ? `text-${type.color}-900` : 'text-gray-900'}`}>
                      {type.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Structured Recruit Form */}
          <div className="space-y-5">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-900">
                  <p className="font-semibold mb-1">팀원 모집 가이드</p>
                  <p className="text-xs">프로젝트 정보와 협업 방식을 구체적으로 작성하면 더 좋은 팀원을 만날 수 있습니다</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                1. 프로젝트 간단 소개 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={projectIntro}
                onChange={(e) => setProjectIntro(e.target.value)}
                placeholder="예: AI 음성인식으로 동작하는 자율주행 로봇을 만들고 있습니다. 라즈베리파이와 OpenCV를 활용하며, 최종 목표는 실내 자율주행 배송 로봇입니다."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                2. 현재 진행 단계 <span className="text-gray-500 font-normal">(선택)</span>
              </label>
              <textarea
                value={currentStage}
                onChange={(e) => setCurrentStage(e.target.value)}
                placeholder="예: Quest 2 프로토타입 단계입니다. 소프트웨어 부분은 70% 완성되었고, 하드웨어 설계와 제작이 필요한 상황입니다."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                3. 필요한 역할과 요구 사항 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={neededRoles}
                onChange={(e) => setNeededRoles(e.target.value)}
                placeholder={`예:\n- 하드웨어 엔지니어 1명: 모터 제어 및 센서 통합 경험\n- 기계 설계 전공자 1명: 3D CAD 모델링 가능자\n- 주 1회 이상 온라인 미팅 가능하신 분`}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                4. 협업 방식 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={collaboration}
                onChange={(e) => setCollaboration(e.target.value)}
                placeholder={`예:\n- 온라인 협업 (Slack + GitHub)\n- 주 1회 화상 회의 (수요일 저녁 9시)\n- 월 1회 오프라인 미팅 (서울 강남)`}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                5. 연락 방법 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={`예:\n- 이메일: maker@example.com\n- 카카오톡 오픈채팅: https://open.kakao.com/...\n관심 있으신 분은 간단한 자기소개와 함께 연락 주세요!`}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              참고 링크 <span className="text-gray-500 font-normal">(선택)</span>
            </label>
            <div className="space-y-2">
              <input type="url" placeholder="GitHub 저장소 (참고용)" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="url" placeholder="프로젝트 상세 페이지" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="url" placeholder="참고 자료 링크" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">취소</Button>
            <Button variant="outline" className="flex-1">임시 저장</Button>
            <Button onClick={handleSubmit} disabled={!isFormValid} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
              <UserPlus className="w-4 h-4 mr-2" />
              팀원 모집
            </Button>
          </div>
          {!isFormValid && (
            <div className="mt-3 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>필수 항목을 모두 입력해 주세요</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}