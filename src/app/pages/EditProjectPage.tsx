import { useParams, Link, useNavigate } from 'react-router';
import { ChevronRight, Save, X, Image as ImageIcon, Upload, Trash2, Plus, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function EditProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Mock project database
  const projectDatabase: { [key: string]: any } = {
    '1': {
      id: '1',
      title: 'AI 음성인식 자율주행 로봇',
      subtitle: '라즈베리파이와 OpenCV로 실내 자율주행이 가능한 배송 로봇',
      description: '실내 환경에서 자율주행이 가능한 배송 로봇 프로젝트입니다.',
      projectType: 'contest',
      status: 'completed',
      contestName: 'AI 로봇 챌린지 2026',
      category: '로봇공학',
      tags: ['AI', '라즈베리파이', 'OpenCV', '자율주행', 'Python', 'ROS'],
      mainImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920',
    },
    '2': {
      id: '2',
      title: '오픈소스 자율주행 로봇',
      subtitle: '라즈베리파이와 AI 비전을 활용한 실내 자율주행 로봇 프로젝트',
      description: '콘테스트 참가중인 자율주행 로봇 프로젝트입니다.',
      projectType: 'contest',
      status: 'in-progress',
      contestName: 'AI 로봇 챌린지 2026',
      category: '로봇공학',
      tags: ['AI', '라즈베리파이', 'OpenCV', '자율주행', 'Python'],
      mainImage: 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=1920',
    },
    '3': {
      id: '3',
      title: 'ESP32 기반 스마트 화분',
      subtitle: '토양 수분, 온도, 조도를 모니터링하고 자동으로 물을 주는 IoT 화분',
      description: '개인 프로젝트로 제작한 스마트 화분입니다.',
      projectType: 'personal',
      status: 'completed',
      category: 'IoT',
      tags: ['ESP32', 'IoT', 'Arduino', '스마트홈', '자동화'],
      mainImage: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?w=1920',
    },
    '4': {
      id: '4',
      title: '3D 프린터 자동 레벨링 시스템',
      subtitle: 'AI 기반 자동 베드 레벨링으로 완벽한 첫 레이어를 만드는 시스템',
      description: '개인 프로젝트로 진행중인 3D 프린터 개선 작업입니다.',
      projectType: 'personal',
      status: 'in-progress',
      category: '3D프린팅',
      tags: ['3D프린팅', 'Arduino', 'AI', '자동화', '센서'],
      mainImage: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?w=1920',
    },
    '6': {
      id: '6',
      title: '아두이노 기반 날씨 관측소',
      subtitle: '온습도, 기압, 풍향풍속을 측정하고 실시간으로 데이터를 시각화하는 관측 시스템',
      description: '작성중인 개인 프로젝트입니다. 아직 초안 단계로 기본 아이디어와 설계만 완료했습니다.',
      projectType: 'personal',
      status: 'draft',
      category: 'IoT',
      tags: ['Arduino', 'IoT', '센서', '날씨', '데이터시각화'],
      mainImage: 'https://images.unsplash.com/photo-1553408226-42ecf81a214c?w=1920',
    },
  };

  const project = projectDatabase[projectId || '1'] || projectDatabase['1'];
  const isContestProject = project.projectType === 'contest';

  const [formData, setFormData] = useState({
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
    category: project.category,
    tags: project.tags,
  });

  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSave = () => {
    // Save logic here
    alert('프로젝트가 저장되었습니다!');
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/my-make" className="hover:text-blue-600 transition-colors">My Make</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">프로젝트 수정</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">프로젝트 수정</h1>
              {isContestProject ? (
                <Badge className="bg-purple-600 text-white border-0 text-base px-3 py-1">
                  콘테스트 프로젝트
                </Badge>
              ) : (
                <Badge className="bg-blue-600 text-white border-0 text-base px-3 py-1">
                  개인 프로젝트
                </Badge>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate(`/project/${projectId}`)}>
                <X className="w-4 h-4 mr-2" />
                취소
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                저장
              </Button>
            </div>
          </div>

          {isContestProject && (
            <div className="flex items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <p className="text-sm text-purple-900">
                <span className="font-semibold">{project.contestName}</span>에 참가중인 프로젝트입니다. Quest 진행 상태는 콘테스트 페이지에서 확인하세요.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Main Image */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">대표 이미지</h3>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                <ImageWithFallback
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100">
                    <Upload className="w-4 h-4 mr-2" />
                    이미지 변경
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                권장 크기: 1920x1080px (16:9 비율)
              </p>
            </div>
          </Card>

          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">기본 정보</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  프로젝트 제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="프로젝트 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  한 줄 소개
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="프로젝트를 한 줄로 요약해주세요"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  카테고리 *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="로봇공학">로봇공학</option>
                  <option value="IoT">IoT</option>
                  <option value="AI">AI</option>
                  <option value="3D프린팅">3D프린팅</option>
                  <option value="웨어러블">웨어러블</option>
                  <option value="드론">드론</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  프로젝트 설명 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="프로젝트에 대해 자세히 설명해주세요"
                />
                <p className="text-sm text-gray-500 mt-2">
                  최소 50자 이상 작성해주세요
                </p>
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">태그</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-gray-50 rounded-lg border border-gray-200">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-700 border-0 px-3 py-1 text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="태그를 입력하고 Enter를 누르세요"
                />
                <Button onClick={handleAddTag} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  추가
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                프로젝트와 관련된 기술, 도구, 주제 등을 태그로 추가하세요
              </p>
            </div>
          </Card>

          {/* Project Content */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">프로젝트 내용</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  이미지, 동영상, 코드 등을 추가하여 프로젝트를 소개하세요
                </p>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  콘텐츠 추가
                </Button>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              프로젝트 삭제
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate(`/project/${projectId}`)}>
                취소
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                변경사항 저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}