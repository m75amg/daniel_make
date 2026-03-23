import { Award, Folder, Users, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const makers = [
  {
    id: 1,
    name: '김메이커',
    initial: '김',
    title: '로봇공학 엔지니어',
    bio: 'AI 로봇과 자율주행 시스템을 연구하는 오픈소스 개발자입니다.',
    projects: 24,
    followers: 1234,
    expertise: ['로봇공학', 'AI/ML', 'ROS'],
    verified: true,
  },
  {
    id: 2,
    name: '이개발자',
    initial: '이',
    title: 'IoT 전문가',
    bio: '스마트홈과 산업용 IoT 솔루션을 만듭니다.',
    projects: 18,
    followers: 890,
    expertise: ['IoT', 'ESP32', '임베디드'],
    verified: true,
  },
  {
    id: 3,
    name: '박엔지니어',
    initial: '박',
    title: '3D 프린팅 전문가',
    bio: '커스텀 3D 프린터와 개조 프로젝트를 진행합니다.',
    projects: 32,
    followers: 1567,
    expertise: ['3D프린팅', '기계설계', 'CAD'],
    verified: true,
  },
  {
    id: 4,
    name: '최메이커',
    initial: '최',
    title: '전자공학 엔지니어',
    bio: 'PCB 설계와 전자 회로 개발을 전문으로 합니다.',
    projects: 21,
    followers: 756,
    expertise: ['PCB설계', '전자공학', 'KiCad'],
    verified: false,
  },
];

export function FeaturedMakers() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-6 h-6 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900">주목할 메이커</h2>
          </div>
          <p className="text-gray-600">커뮤니티를 이끄는 혁신적인 메이커들을 만나보세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {makers.map((maker) => (
            <Card
              key={maker.id}
              className="group cursor-pointer overflow-hidden border-gray-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-20">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '16px 16px'
                  }}></div>
                </div>
              </div>

              {/* Avatar */}
              <div className="relative px-6 -mt-10">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg bg-white">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {maker.initial}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Content */}
              <div className="p-6 pt-3 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{maker.name}</h3>
                    {maker.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{maker.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{maker.bio}</p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Folder className="w-4 h-4" />
                    <span className="font-semibold">{maker.projects}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{maker.followers}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {maker.expertise.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                  프로필 보기
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            모든 메이커 보기 →
          </button>
        </div>
      </div>
    </section>
  );
}
