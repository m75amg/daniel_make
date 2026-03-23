import { BookOpen, Video, FileText, Users } from 'lucide-react';
import { Card } from './ui/card';

const guides = [
  {
    id: 1,
    icon: BookOpen,
    title: '시작 가이드',
    description: '메이커 시작 안내',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    icon: Video,
    title: '튜토리얼',
    description: '프로젝트 제작 영상',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 3,
    icon: FileText,
    title: '문서',
    description: '기술 문서 & API',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 4,
    icon: Users,
    title: '커뮤니티',
    description: '메이커와 함께 성장',
    color: 'bg-orange-100 text-orange-600',
  },
];

export function BeginnerGuide() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">시작하기</h2>
        </div>

        {/* Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card
                key={guide.id}
                className="p-5 hover:shadow-md transition-shadow cursor-pointer border-gray-200 bg-white group"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-lg ${guide.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-500">{guide.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}