import { Link } from 'react-router';
import { ChevronRight, Megaphone, Pin, Calendar } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export function NoticesPage() {
  const notices = [
    {
      id: 1,
      title: 'Make 2.0 플랫폼 정식 오픈 안내',
      date: '2026-03-15',
      category: '공지',
      pinned: true,
      views: 1234,
    },
    {
      id: 2,
      title: '2026년 1분기 콘테스트 일정 안내',
      date: '2026-03-10',
      category: '이벤트',
      pinned: true,
      views: 892,
    },
    {
      id: 3,
      title: '서버 정기 점검 안내 (3월 20일)',
      date: '2026-03-08',
      category: '점검',
      pinned: false,
      views: 567,
    },
    {
      id: 4,
      title: '프로젝트 업로드 가이드 업데이트',
      date: '2026-03-05',
      category: '안내',
      pinned: false,
      views: 423,
    },
    {
      id: 5,
      title: '커뮤니티 가이드라인 개정 안내',
      date: '2026-03-01',
      category: '정책',
      pinned: false,
      views: 312,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">공지사항</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Megaphone className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">공지사항</h1>
              <p className="text-lg text-blue-100 mt-2">
                Make 2.0의 소식과 업데이트를 확인하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {notices.map((notice) => (
            <Card key={notice.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-gray-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {notice.pinned && (
                      <Pin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      {notice.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {notice.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {notice.date}
                    </span>
                    <span>조회 {notice.views}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}