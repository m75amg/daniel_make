import { Brain, Cpu, Cog, Zap, Car, Factory, Wifi } from 'lucide-react';

const categories = [
  { id: 1, name: 'AI/ML', icon: Brain, color: 'from-purple-500 to-pink-500', count: '234' },
  { id: 2, name: 'IoT', icon: Wifi, color: 'from-blue-500 to-cyan-500', count: '189' },
  { id: 3, name: '로봇공학', icon: Cog, color: 'from-orange-500 to-red-500', count: '156' },
  { id: 4, name: '임베디드', icon: Cpu, color: 'from-green-500 to-emerald-500', count: '203' },
  { id: 5, name: '에너지', icon: Zap, color: 'from-yellow-500 to-orange-500', count: '98' },
  { id: 6, name: '스마트팩토리', icon: Factory, color: 'from-indigo-500 to-purple-500', count: '127' },
  { id: 7, name: '자동차', icon: Car, color: 'from-red-500 to-pink-500', count: '145' },
];

export function TechCategories() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">기술 카테고리</h2>
          <p className="text-gray-600">관심있는 분야의 프로젝트를 탐색하세요</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="group relative bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-transparent overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative space-y-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm mb-1">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.count} 프로젝트</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
