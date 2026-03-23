import { UserPlus, FolderPlus, FileEdit, Users2, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: '참가 신청',
    description: '관심있는 공모전이나 카테고리를 선택하고 참가를 신청하세요',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    icon: FolderPlus,
    title: '프로젝트 생성',
    description: '나만의 프로젝트를 만들고 정보를 입력하세요',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    icon: FileEdit,
    title: '수행 기록 작성',
    description: '진행 과정을 기록하고 문서화하며 프로젝트를 발전시켜 나가세요',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    icon: Users2,
    title: '커뮤니티 활동',
    description: '다른 메이커들과 소통하고 피드백을 받으며 함께 성장하세요',
    color: 'from-green-500 to-emerald-500',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Make 2.0 참여 방법</h2>
          <p className="text-gray-600 text-lg">4단계로 시작하는 메이커 여정</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="relative inline-block">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mx-auto`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 text-gray-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
            지금 시작하기
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
