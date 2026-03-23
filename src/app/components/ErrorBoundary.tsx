import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export function ErrorBoundary() {
  const error = useRouteError();
  
  // Check if it's a 404 error
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                홈으로 가기
              </Button>
            </Link>
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전 페이지
            </Button>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">추천 페이지</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/contests">
                <Button variant="outline" size="sm">콘테스트</Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="sm">프로젝트</Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" size="sm">커뮤니티</Button>
              </Link>
              <Link to="/my-make">
                <Button variant="outline" size="sm">My Make</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For other errors, show a generic error page
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-red-600">
            오류 발생
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          문제가 발생했습니다
        </h1>
        <p className="text-gray-600 mb-8">
          일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Home className="w-4 h-4 mr-2" />
            홈으로 가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
