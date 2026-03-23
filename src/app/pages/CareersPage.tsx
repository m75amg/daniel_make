import { Link } from 'react-router';
import { ChevronRight, Briefcase, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export function CareersPage() {
  const positions = [
    {
      id: 1,
      title: '프론트엔드 개발자',
      department: '개발팀',
      type: '정규직',
      location: '서울 강남',
      experience: '3년 이상',
      salary: '협의',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 2,
      title: '백엔드 개발자',
      department: '개발팀',
      type: '정규직',
      location: '서울 강남',
      experience: '3년 이상',
      salary: '협의',
      tags: ['Node.js', 'Python', 'AWS'],
    },
    {
      id: 3,
      title: 'UX/UI 디자이너',
      department: '디자인팀',
      type: '정규직',
      location: '서울 강남',
      experience: '2년 이상',
      salary: '협의',
      tags: ['Figma', 'Sketch', 'Prototyping'],
    },
    {
      id: 4,
      title: '커뮤니티 매니저',
      department: '운영팀',
      type: '계약직',
      location: '서울 강남',
      experience: '신입 가능',
      salary: '협의',
      tags: ['커뮤니티 운영', '콘텐츠 기획', '이벤트 관리'],
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
            <span className="text-gray-900">채용</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-medium">Join Us</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            메이커들과 함께 일하세요
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Make 2.0에서 메이커 문화를 만들어갈 동료를 찾습니다.
            열정과 창의성으로 함께 성장할 수 있는 기회입니다.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Make 2.0에서 일하는 이유</h2>
          <p className="text-lg text-gray-600">
            우리는 메이커 문화를 만들고 혁신을 추구합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Users,
              title: '성장하는 팀',
              description: '함께 배우고 발전하는 문화',
            },
            {
              icon: Briefcase,
              title: '유연한 근무',
              description: '자율적인 업무 환경',
            },
            {
              icon: DollarSign,
              title: '경쟁력 있는 보상',
              description: '공정한 평가와 보상',
            },
            {
              icon: Clock,
              title: '워라밸',
              description: '일과 삶의 균형',
            },
          ].map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 text-center border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">채용 중인 포지션</h2>
          <div className="space-y-6">
            {positions.map((position) => (
              <Card key={position.id} className="p-6 border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                      <Badge className="bg-blue-100 text-blue-700 border-0">
                        {position.type}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {position.salary}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {position.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    지원하기
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}