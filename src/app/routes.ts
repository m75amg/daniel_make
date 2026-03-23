import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { ContestDetailPage } from "./pages/ContestDetailPage";
import { ContestListPage } from "./pages/ContestListPage";
import { CreateContestProjectPage } from "./pages/CreateContestProjectPage";
import { CreatePersonalProjectPage } from "./pages/CreatePersonalProjectPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectListPage } from "./pages/ProjectListPage";
import { MyMakePage } from "./pages/MyMakePage";
import { CommunityPage } from "./pages/CommunityPage";
import { CommunityActivityDetailPage } from "./pages/CommunityActivityDetailPage";
import { CreateCommunityActivityPage } from "./pages/CreateCommunityActivityPage";
import { EventsPage } from "./pages/EventsPage";
import { SupportPage } from "./pages/SupportPage";
import { NoticesPage } from "./pages/NoticesPage";
import { ContactPage } from "./pages/ContactPage";
import { CareersPage } from "./pages/CareersPage";
import { FAQPage } from "./pages/FAQPage";
import { Quest1Page } from "./pages/Quest1Page";
import { Quest2Page } from "./pages/Quest2Page";
import { Quest3Page } from "./pages/Quest3Page";
import { ProjectCompletedPage } from "./pages/ProjectCompletedPage";
import { EditProjectPage } from "./pages/EditProjectPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ContestResultPage } from "./pages/ContestResultPage";
import { PublicMakerProfilePage } from "./pages/PublicMakerProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "projects",
        Component: ProjectListPage,
      },
      {
        path: "project/create/personal",
        Component: CreatePersonalProjectPage,
      },
      {
        path: "project/:projectId",
        Component: ProjectDetailPage,
      },
      {
        path: "project/:projectId/edit",
        Component: EditProjectPage,
      },
      {
        path: "project/:projectId/quest/1",
        Component: Quest1Page,
      },
      {
        path: "project/:projectId/quest/2",
        Component: Quest2Page,
      },
      {
        path: "project/:projectId/quest/3",
        Component: Quest3Page,
      },
      {
        path: "project/:projectId/completed",
        Component: ProjectCompletedPage,
      },
      {
        path: "contests",
        Component: ContestListPage,
      },
      {
        path: "contest/:contestId",
        Component: ContestDetailPage,
      },
      {
        path: "contest/:contestId/results",
        Component: ContestResultPage,
      },
      {
        path: "contest/:contestId/create-project",
        Component: CreateContestProjectPage,
      },
      {
        path: "community",
        Component: CommunityPage,
      },
      {
        path: "community/create",
        Component: CreateCommunityActivityPage,
      },
      {
        path: "community/:activityId",
        Component: CommunityActivityDetailPage,
      },
      {
        path: "events",
        Component: EventsPage,
      },
      {
        path: "my-make",
        Component: MyMakePage,
      },
      {
        path: "maker/:makerId",
        Component: PublicMakerProfilePage,
      },
      {
        path: "support",
        Component: SupportPage,
      },
      {
        path: "notices",
        Component: NoticesPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "careers",
        Component: CareersPage,
      },
      {
        path: "faq",
        Component: FAQPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);