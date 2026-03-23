import { Link } from 'react-router';

export function PlatformFooter() {
  return (
    <footer>
      {/* Partner/Sponsor Logos Section */}
      <div className="bg-gray-50 border-y border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-2">
            <span className="text-xs text-gray-500">Sponsored Company</span>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-6">
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-gray-600">CREAFORM</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-gray-600">Infineon</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-sm font-bold text-gray-700">KETI</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-gray-600">KEYSIGHT</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-gray-600">Microchip</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-blue-600">mouser.com</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-gray-600">NATIONAL INSTRUMENTS</span>
            </div>
            <div className="h-8 flex items-center bg-red-600 px-3 rounded">
              <span className="text-sm font-bold text-white">ROHM</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-gray-600">ST</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-sm font-medium text-gray-700">Tektronix</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Company Info Section */}
      <div className="bg-black text-gray-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <Link to="/support" className="hover:text-white transition-colors">e4ds 소개</Link>
              <span className="text-gray-700">|</span>
              <Link to="/notices" className="hover:text-white transition-colors">개인정보처리방침</Link>
              <span className="text-gray-700">|</span>
              <Link to="/faq" className="hover:text-white transition-colors">이용약관</Link>
              <span className="text-gray-700">|</span>
              <Link to="/contact" className="hover:text-white transition-colors">청소년보호정책</Link>
              <span className="text-gray-700">|</span>
              <Link to="/careers" className="hover:text-white transition-colors">가족사이트</Link>
              <span className="text-gray-700">|</span>
              <a href="#" className="hover:text-white transition-colors">저작권</a>
              <span className="text-gray-700">|</span>
              <a href="#" className="hover:text-white transition-colors">e4ds인터내셔널</a>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=100" alt="인증마크" className="h-12 w-auto" />
            </div>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>(주)디지털데일리 | 등록번호 : 경기 아51470 | 등록: 2008.10.20 | 발행: 2026.05.19 | 표: 김제호</p>
            <p>주소 :경기도 성남시 분당구 대왕판교로 660번길 8 | 전화 : 02-883-9797 | 팩스 : 02-6280-9957</p>
            <p className="text-gray-600">본 콘텐츠의 저작권은 (주)디지털데일리에 있으며 무단 전재 및 재배포를 금지합니다. 단, 제휴 기관은 예외로 합니다.</p>
            <p className="mt-3">Copyright @ 2026 e4ds News. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}