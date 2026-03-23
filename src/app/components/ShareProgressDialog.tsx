import { useState } from 'react';
import { 
  X, AlertCircle, Sparkles, Image as ImageIcon, 
  Github, ExternalLink, Check, Rocket,
  FileText, Trophy, Video, Link2, CheckCircle, Clock, FolderOpen, ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ShareProgressDialogProps {
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

export function ShareProgressDialog({ 
  isOpen, 
  onClose, 
  project,
  questNumber,
  questTitle
}: ShareProgressDialogProps) {
  const [progressTitle, setProgressTitle] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [completed, setCompleted] = useState('');
  const [challenges, setChallenges] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [mediaLinks, setMediaLinks] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const selectedProject = project ?? myProjects.find(p => p.id === selectedProjectId) ?? null;

  const handleSubmit = () => {
    console.log('진행공유 등록:', {
      projectId: selectedProject?.id,
      questNumber,
      progressTitle,
      currentWork,
      completed,
      challenges,
      nextSteps,
      mediaLinks,
    });
    onClose();
  };

  const isFormValid = progressTitle && currentWork && completed && nextSteps;

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
              <h2 className="text-xl font-bold text-gray-900">진행 공유하기</h2>
              <p className="text-sm text-gray-600 mt-1">
                {project ? '현재 프로젝트와 연결된 진행 상황을 공유합니다' : '커뮤니티에 진행 상황을 공유합니다'}
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
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">연결된 프로젝트</h3>
                <p className="text-sm text-gray-600">
                  {project ? '이 진행 공유는 아래 프로젝트와 자동으로 연결됩니다' : '내 프로젝트를 선택하면 진행 공유가 자동으로 연결됩니다'}
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
                  <p className="text-sm text-gray-500">프로젝트를 선택하지 않으면 커뮤니티 일반 진행 공유로 등록됩니다</p>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  커뮤니티에 공유되며, 프로젝트 타임라인에도 표시됩니다
                </p>
              </div>
            </div>
          </Card>

          {/* Progress Title */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              진행 상황 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={progressTitle}
              onChange={(e) => setProgressTitle(e.target.value)}
              placeholder="예: ESP32 센서 연결 완료, MQTT 통신 구현 중"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">이번 단계의 진행 상황을 한 줄로 요약하세요</p>
          </div>

          {/* Structured Progress Form */}
          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">진행 공유 가이드</p>
                  <p className="text-xs">구체적인 작업 내용과 결과물을 공유하면 다른 메이커들에게 도움이 됩니다</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                1. 이번 단계에서 어떤 작업을 했나요? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={currentWork}
                onChange={(e) => setCurrentWork(e.target.value)}
                placeholder="예: Quest 2의 프로토타입 제작 단계에서 ESP32에 온습도 센서를 연결하고, MQTT로 AWS IoT Core에 데이터를 전송하는 작업을 진행했습니다."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                2. 현재까지 완료한 내용은 무엇인가요? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
                placeholder={`예:\n- ESP32와 DHT22 센서 하드웨어 연결 완료\n- Wi-Fi 연결 및 MQTT 클라이언트 라이브러리 설정 완료\n- 5초마다 온습도 데이터를 AWS IoT Core로 전송 성공`}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                3. 막힌 점 또는 고민이 있나요? <span className="text-gray-500 font-normal">(선택)</span>
              </label>
              <textarea
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="예: 배터리로 동작시킬 때 전력 소모가 크고, 센서 값이 가끔 튀는 현상이 있습니다. Deep Sleep 모드 적용을 고민 중입니다."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                4. 다음에 할 일은 무엇인가요? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={nextSteps}
                onChange={(e) => setNextSteps(e.target.value)}
                placeholder={`예:\n- Deep Sleep 모드 구현으로 전력 최적화\n- 센서 값 필터링 알고리즘 추가\n- 웹 대시보드에서 데이터 시각화`}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Media Attachments */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              이미지 / 영상 / 링크 첨부 <span className="text-gray-500 font-normal">(선택)</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">이미지</p>
                <p className="text-xs text-gray-500 mt-1">사진 첨부</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <Video className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">영상</p>
                <p className="text-xs text-gray-500 mt-1">동작 영상</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                <Link2 className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">링크</p>
                <p className="text-xs text-gray-500 mt-1">외부 링크</p>
              </button>
            </div>
            <div className="mt-3 space-y-2">
              <input type="url" placeholder="GitHub 커밋 링크" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="url" placeholder="YouTube 데모 영상" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">취소</Button>
            <Button variant="outline" className="flex-1">임시 저장</Button>
            <Button onClick={handleSubmit} disabled={!isFormValid} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
              <Rocket className="w-4 h-4 mr-2" />
              진행 공유
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