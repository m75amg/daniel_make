import { Handshake } from 'lucide-react';

const partners = [
  { id: 1, name: 'Arduino', logo: '🎛️' },
  { id: 2, name: 'Raspberry Pi', logo: '🥧' },
  { id: 3, name: 'Adafruit', logo: '⚡' },
  { id: 4, name: 'SparkFun', logo: '✨' },
  { id: 5, name: 'Seeed Studio', logo: '🌱' },
  { id: 6, name: 'DFRobot', logo: '🤖' },
  { id: 7, name: 'Elegoo', logo: '🔧' },
  { id: 8, name: 'Creality', logo: '🖨️' },
];

export function PartnersSection() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Handshake className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">파트너</h3>
          </div>
          <p className="text-sm text-gray-600">Make 2.0과 함께하는 파트너사</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {partner.logo}
              </div>
              <span className="text-xs font-medium text-gray-600 text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
