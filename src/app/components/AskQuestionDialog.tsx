import { useState } from 'react';
import { 
  X, AlertCircle, Sparkles, Image as ImageIcon, 
  Code, Github, ExternalLink, Check, HelpCircle,
  FileText, Target, Trophy, FolderOpen, ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface AskQuestionDialogProps {
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

// 커뮤니티 페이지용 mock 프로젝트 목록
const myProjects = [
  { id: '1', title: 'AI 음성인식 자율주행 로봇', category: '로봇공학', tags: ['AI', '라즈베리파이', 'OpenCV'] },
  { id: '2', title: 'ESP32 기반 스마트 화분', category: 'IoT', tags: ['ESP32', 'IoT', '자동화'] },
  { id: '3', title: '3D 프린터 자동 레벨링 시스템', category: '3D 프린팅', tags: ['Arduino', 'AI'] },
];

export function AskQuestionDialog({ 
  isOpen, 
  onClose, 
  project,
  questNumber,
  questTitle
}: AskQuestionDialogProps) {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [problem, setProblem] = useState('');
  const [attempts, setAttempts] = useState('');
  const [helpNeeded, setHelpNeeded] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const selectedProject = project ?? myProjects.find(p => p.id === selectedProjectId) ?? null;

  const questionTypes = [
    { value: 'technical', label: '기술 문제', icon: Code, color: 'blue' },
    { value: 'implementation', label: '구현 방법', icon: Target, color: 'purple' },
    { value: 'design', label: '설계 고민', icon: Sparkles, color: 'pink' },
    { value: 'submission', label: '제출 관련', icon: FileText, color: 'green' },
    { value: 'feedback', label: '피드백 요청', icon: HelpCircle, color: 'orange' },
  ];

  const handleSubmit = () => {
    console.log('질문 등록:', {
      projectId: selectedProject?.id,
      questNumber,
      questionTitle,
      questionType,
      currentWork,
      problem,
      attempts,
      helpNeeded,
    });
    onClose();
  };

  const isFormValid = questionTitle && questionType && currentWork && problem && helpNeeded;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with gradient overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">질문하기</h2>
              <p className="text-sm text-gray-600 mt-1">
                {project ? '현재 프로젝트와 연결된 질문을 등록합니다' : '커뮤니티에 질문을 등록합니다'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Connected Project Info */}
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">연결된 프로젝트</h3>
                <p className="text-sm text-gray-600">
                  {project ? '이 질문은 아래 프로젝트와 자동으로 연결됩니다' : '내 프로젝트를 선택하면 질문이 자동으로 연결됩니다'}
                </p>
              </div>
            </div>
            
            {/* 프로젝트 선택 (커뮤니티 페이지용) */}
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
                      <Badge className="bg-blue-600 text-white">
                        Quest {questNumber}: {questTitle}
                      </Badge>
                    </div>
                  )}
                  {selectedProject.tags && selectedProject.tags.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">기술 태그</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3 py-2">
                  <FolderOpen className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-500">프로젝트를 선택하지 않으면 커뮤니티 일반 질문으로 등록됩니다</p>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  커뮤니티 Q&A에 등록되며, 프로젝트 상세에서도 확인할 수 있습니다
                </p>
              </div>
            </div>
          </Card>

          {/* Question Title */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              질문 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="예: ESP32에서 MQTT 연결이 계속 끊기는 문제"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              문제를 명확하게 요약하세요
            </p>
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              질문 유형 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {questionTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = questionType === type.value;
                return (
                  <button
                    key={type.value}
                    onClick={() => setQuestionType(type.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? `border-${type.color}-500 bg-${type.color}-50`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${
                      isSelected ? `text-${type.color}-600` : 'text-gray-600'
                    }`} />
                    <p className={`text-sm font-semibold ${
                      isSelected ? `text-${type.color}-900` : 'text-gray-900'
                    }`}>
                      {type.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Structured Question Form */}
          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">좋은 질문을 위한 가이드</p>
                  <p className="text-xs">구체적인 상황과 시도한 내용을 포함하면 더 빠르고 정확한 답변을 받을 수 있습니다</p>
                </div>
              </div>
            </div>

            {/* 1. Current Work */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                1. 지금 어떤 작업을 하고 있나요? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={currentWork}
                onChange={(e) => setCurrentWork(e.target.value)}
                placeholder="예: Quest 2에서 ESP32와 MQTT 브로커를 연결하는 작업을 하고 있습니다. AWS IoT Core를 사용 중입니다."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 2. Problem */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                2. 어떤 문제가 있나요? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="예: Wi-Fi 연결은 정상인데 MQTT 연결이 5분마다 자동으로 끊깁니다. Error code -2가 계속 발생합니다."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 3. Attempts */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                3. 무엇을 시도해 보았나요? <span className="text-gray-500 font-normal">(선택)</span>
              </label>
              <textarea
                value={attempts}
                onChange={(e) => setAttempts(e.target.value)}
                placeholder="예: Keep-alive 시간을 60초로 늘려봤고, QoS 레벨도 0, 1, 2 모두 시도했습니다. 브로커 로그에는 특별한 오류가 없습니다."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 4. Help Needed */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                4. 어떤 도움을 받고 싶나요? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={helpNeeded}
                onChange={(e) => setHelpNeeded(e.target.value)}
                placeholder="예: 연결이 끊기는 원인을 찾고 싶습니다. ESP32 설정에서 놓친 부분이 있는지 확인 부탁드립니다."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              첨부 자료 <span className="text-gray-500 font-normal">(선택)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">이미지 첨부</p>
                <p className="text-xs text-gray-500 mt-1">스크린샷, 회로도</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <Code className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">코드 스니펫</p>
                <p className="text-xs text-gray-500 mt-1">문제 코드 붙여넣기</p>
              </button>
            </div>
            <div className="mt-3 space-y-2">
              <input
                type="url"
                placeholder="GitHub 링크"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="참고 링크"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
            >
              임시 저장
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              질문 등록
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