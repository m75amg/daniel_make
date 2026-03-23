import { Trophy, Folder, Users, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

const stats = [
  {
    icon: Trophy,
    label: '진행중인 공모전',
    value: '24',
    trend: '+3',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Folder,
    label: '등록된 프로젝트',
    value: '1,847',
    trend: '+127',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: Users,
    label: '활동 메이커',
    value: '5,234',
    trend: '+89',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: TrendingUp,
    label: '이번주 조회수',
    value: '45.2K',
    trend: '+12.5%',
    color: 'text-orange-600 bg-orange-50',
  },
];

export function DashboardStats() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-5 bg-white border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
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
