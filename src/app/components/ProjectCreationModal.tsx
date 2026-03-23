import { useNavigate } from 'react-router';
import { 
  X, Trophy, User, ArrowRight, Rocket, 
  CheckCircle, Target, Award, Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectCreationModal({ isOpen, onClose }: ProjectCreationModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePersonalProject = () => {
    onClose();
    navigate('/project/create/personal');
  };

  const handleContestProject = () => {
    onClose();
    navigate('/contests');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">새 프로젝트 시작</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">어떤 프로젝트를 시작할까요?</h2>
            <p className="text-blue-100 text-lg">
              프로젝트 타입을 선택하고 메이킹을 시작하세요
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 개인 프로젝트 카드 */}
            <Card 
              className="p-6 hover:shadow-2xl transition-all cursor-pointer group border-2 hover:border-blue-500 relative overflow-hidden"
              onClick={handlePersonalProject}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                {/* 아이콘 */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-white" />
                </div>

                {/* 타이틀 */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  개인 프로젝트
                </h3>
                <p className="text-gray-600 mb-4">
                  자유롭게 나만의 프로젝트를 시작하세요
                </p>

                {/* 특징 */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>자유로운 주제 선택</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>나만의 속도로 진행</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>언제든지 수정 가능</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>포트폴리오로 활용</span>
                  </div>
                </div>

                {/* 추천 대상 */}
                <div className="p-3 bg-blue-50 rounded-lg mb-4">
                  <p className="text-xs font-semibold text-blue-900 mb-1">추천 대상</p>
                  <p className="text-xs text-blue-700">
                    자유롭게 아이디어를 실험하고 싶은 메이커
                  </p>
                </div>

                {/* 버튼 */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-lg transition-all">
                  개인 프로젝트 시작하기
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* 콘테스트 프로젝트 카드 */}
            <Card 
              className="p-6 hover:shadow-2xl transition-all cursor-pointer group border-2 hover:border-purple-500 relative overflow-hidden"
              onClick={handleContestProject}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                {/* 배지 */}
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                  <Award className="w-3 h-3 mr-1" />
                  인기
                </Badge>

                {/* 아이콘 */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="w-8 h-8 text-white" />
                </div>

                {/* 타이틀 */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  콘테스트 프로젝트
                </h3>
                <p className="text-gray-600 mb-4">
                  콘테스트에 참가하며 프로젝트를 완성하세요
                </p>

                {/* 특징 */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Quest 단계별 가이드</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>상금 및 경품 획득 기회</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>구조화된 프로젝트 관리</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>커뮤니티 피드백</span>
                  </div>
                </div>

                {/* 추천 대상 */}
                <div className="p-3 bg-purple-50 rounded-lg mb-4">
                  <p className="text-xs font-semibold text-purple-900 mb-1">추천 대상</p>
                  <p className="text-xs text-purple-700">
                    목표와 동기를 갖고 체계적으로 프로젝트를 완성하고 싶은 메이커
                  </p>
                </div>

                {/* 버튼 */}
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group-hover:shadow-lg transition-all">
                  콘테스트 둘러보기
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>

          {/* 안내 문구 */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">프로젝트는 통합 관리됩니다</h4>
                <p className="text-sm text-gray-600">
                  개인 프로젝트든 콘테스트 프로젝트든, 모두 "내 프로젝트"에서 함께 관리되며 
                  동일한 Quest 시스템과 커뮤니티 기능을 사용할 수 있습니다. 
                  시작 방식만 다를 뿐, 프로젝트 자체는 통합된 하나의 시스템입니다.
                </p>
              </div>
            </div>
          </div>

          {/* 취소 버튼 */}
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              나중에 하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}