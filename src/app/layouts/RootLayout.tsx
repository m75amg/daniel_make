import { Outlet } from 'react-router';
import { PlatformHeader } from '../components/PlatformHeader';
import { PlatformFooter } from '../components/PlatformFooter';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <PlatformHeader />
      <main>
        <Outlet />
      </main>
      <PlatformFooter />
    </div>
  );
}
