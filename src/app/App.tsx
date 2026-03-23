import { RouterProvider } from 'react-router';
import { router } from './routes';
import { TeammateProvider } from './context/TeammateContext';
import { ActivityProvider } from './context/ActivityContext';
import { FollowProvider } from './context/FollowContext';

export default function App() {
  return (
    <ActivityProvider>
      <FollowProvider>
        <TeammateProvider>
          <RouterProvider router={router} />
        </TeammateProvider>
      </FollowProvider>
    </ActivityProvider>
  );
}