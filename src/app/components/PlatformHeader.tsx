import { Search, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export function PlatformHeader() {
  const [showMakersDropdown, setShowMakersDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="text-xs text-gray-500">
              2026년 03월 19일(금)
            </div>
            <div className="flex items-center gap-4 text-xs">
              <a href="#" className="text-gray-600 hover:text-gray-900">로그인</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">회원가입</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">고객센터</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">홈사이트</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold">
              <span className="text-gray-800">e</span>
              <span className="text-orange-500">4</span>
              <span className="text-gray-800">ds</span>
            </span>
            <span className="text-xl font-normal text-gray-600 ml-1">make</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 font-medium">
              News
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 font-medium">
              Technologies
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 font-medium">
              Industries
              <ChevronDown className="w-4 h-4" />
            </button>
            <Link to="/events" className="text-sm text-gray-700 hover:text-gray-900 font-medium">
              EEWebinar
            </Link>
            
            {/* Maker's Zone Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMakersDropdown(true)}
              onMouseLeave={() => setShowMakersDropdown(false)}
            >
              <Link 
                to="/" 
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 font-medium"
              >
                Maker's Zone
                <ChevronDown className="w-4 h-4" />
              </Link>
              
              {showMakersDropdown && (
                <div className="absolute top-full left-0 pt-1">
                  <div className="w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <Link 
                      to="/projects" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      프로젝트
                    </Link>
                    <Link 
                      to="/contests" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      콘테스트
                    </Link>
                    <Link 
                      to="/community" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      커뮤니티
                    </Link>
                    <Link 
                      to="/my-make" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      마이메이크
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}