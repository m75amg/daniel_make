import { Search, Bell, User } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="font-bold text-blue-600 text-xl">Make 2.0</h1>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-900 font-medium">대시보드</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">공모전</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">프로젝트</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">커뮤니티</a>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <User className="w-4 h-4 mr-2" />
              로그인
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}