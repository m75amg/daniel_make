import { useState } from 'react';
import { 
  X, AlertCircle, Sparkles, Share2, 
  Github, ExternalLink, Check, FileText,
  Trophy, Link2, Code, Image as ImageIcon,
  BookOpen, Video, Package, Download, FolderOpen, ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ShareResourceDialogProps {
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

export function ShareResourceDialog({ 
  isOpen, 
  onClose, 
  project,
  questNumber,
  questTitle
}: ShareResourceDialogProps) {
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [usefulFor, setUsefulFor] = useState('');
  const [links, setLinks] = useState('');
  const [selectedQuests, setSelectedQuests] = useState<number[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const selectedProject = project ?? myProjects.find(p => p.id === selectedProjectId) ?? null;

  const resourceTypes = [
    { value: 'code', label: '코드 라이브러리', icon: Code, color: 'blue' },
    { value: 'tutorial', label: '튜토리얼', icon: BookOpen, color: 'purple' },
    { value: 'design', label: '설계 파일', icon: FileText, color: 'pink' },
    { value: 'video', label: '영상 자료', icon: Video, color: 'green' },
    { value: 'data', label: '데이터셋', icon: Package, color: 'orange' },
    { value: 'etc', label: '기타', icon: Share2, color: 'gray' },
  ];

  const questStages = [
    { value: 1, label: 'Quest 1: 기획/설계' },
    { value: 2, label: 'Quest 2: 프로토타입' },
    { value: 3, label: 'Quest 3: 최종 완성' },
  ];

  const toggleQuest = (value: number) => {
    setSelectedQuests(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    console.log('자료공유 등록:', {
      projectId: selectedProject?.id,
      questNumber,
      resourceTitle,
      resourceType,
      description,
      benefits,
      usefulFor,
      links,
      selectedQuests,
    });
    onClose();
  };

  const isFormValid = resourceTitle && resourceType && description && benefits && selectedQuests.length > 0;

  if (!isOpen) return null;

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
              <h2 className="text-xl font-bold text-gray-900">자료 공유하기</h2>
              <p className="text-sm text-gray-600 mt-1">
                {project ? '현재 프로젝트와 연결된 유용한 자료를 공유합니다' : '커뮤니티에 유용한 자료를 공유합니다'}
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
              <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">연결된 프로젝트</h3>
                <p className="text-sm text-gray-600">
                  {project ? '이 자료는 아래 프로젝트와 자동으로 연결됩니다' : '내 프로젝트를 선택하면 자료가 자동으로 연결됩니다'}
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
                  <p className="text-sm text-gray-500">프로젝트를 선택하지 않으면 커뮤니티 공용 자료로 등록됩니다</p>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  커뮤니티 자료실에 등록되며, 다른 메이커들에게 도움이 됩니다
                </p>
              </div>
            </div>
          </Card>

          {/* Resource Title */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              자료 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
              placeholder="예: ESP32 MQTT 안정적 연결을 위한 코드 라이브러리"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">자료의 내용을 명확하게 표현하세요</p>
          </div>

          {/* Resource Type */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              자료 유형 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {resourceTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = resourceType === type.value;
                return (
                  <button
                    key={type.value}
                    onClick={() => setResourceType(type.value)}
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

          {/* Structured Resource Form */}
          <div className="space-y-5">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-900">
                  <p className="font-semibold mb-1">자료 공유 가이드</p>
                  <p className="text-xs">구체적인 사용 방법과 도움이 되는 이유를 작성하면 더 많은 메이커들에게 도움이 됩니다</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                1. 자료 설명 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="예: ESP32에서 MQTT 연결이 끊기는 문제를 해결한 안정적인 라이브러리입니다. 자동 재연결, Keep-alive 최적화, 오류 처리 기능이 포함되어 있습니다."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                2. 왜 이 자료가 도움이 되나요? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder={`예:\n- MQTT 연결 안정성 99% 이상 유지\n- 네트워크 불안정 환경에서도 자동 복구\n- 간단한 API로 5분 안에 적용 가능\n- AWS IoT Core, Azure IoT Hub 모두 지원`}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                3. 어떤 상황/단계에 유용한가요? <span className="text-gray-500 font-normal">(선택)</span>
              </label>
              <textarea
                value={usefulFor}
                onChange={(e) => setUsefulFor(e.target.value)}
                placeholder={`예:\n- IoT 프로젝트에서 ESP32 사용하시는 분\n- MQTT 연결 불안정 문제를 겪고 계신 분\n- 실제 배포 환경에서 안정성이 필요하신 분`}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                4. 유용한 Quest 단계 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {questStages.map((quest) => (
                  <button
                    key={quest.value}
                    onClick={() => toggleQuest(quest.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                      selectedQuests.includes(quest.value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedQuests.includes(quest.value) ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {selectedQuests.includes(quest.value) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`font-semibold ${selectedQuests.includes(quest.value) ? 'text-blue-900' : 'text-gray-900'}`}>
                      {quest.label}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">복수 선택 가능합니다</p>
            </div>
          </div>

          {/* File/Link Attachments */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              파일 또는 링크 첨부 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <Package className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">파일 첨부</p>
                <p className="text-xs text-gray-500 mt-1">코드, 문서 등</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">이미지</p>
                <p className="text-xs text-gray-500 mt-1">설명 이미지</p>
              </button>
            </div>
            <div className="mt-3 space-y-2">
              <input type="url" placeholder="GitHub 저장소 링크 *" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="url" placeholder="다운로드 링크 또는 참고 문서" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="url" placeholder="데모 영상 링크 (선택)" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* License Info */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              라이센스 정보 <span className="text-gray-500 font-normal">(선택)</span>
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">라이센스를 선택하세요</option>
              <option value="mit">MIT License</option>
              <option value="apache">Apache 2.0</option>
              <option value="gpl">GPL 3.0</option>
              <option value="cc">Creative Commons</option>
              <option value="proprietary">개인 저작물 (출처 표기 필수)</option>
              <option value="etc">기타</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">자료 사용 시 라이센스를 명시하면 다른 메이커들이 안심하고 사용할 수 있습니다</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">취소</Button>
            <Button variant="outline" className="flex-1">임시 저장</Button>
            <Button onClick={handleSubmit} disabled={!isFormValid} className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
              <Share2 className="w-4 h-4 mr-2" />
              자료 공유
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