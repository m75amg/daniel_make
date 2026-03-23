import { PlatformHero } from '../components/PlatformHero';
import { ProjectsShowcase } from '../components/ProjectsShowcase';
import { CommunityHub } from '../components/CommunityHub';
import { ActiveChallenges } from '../components/ActiveChallenges';
import { EventsSection } from '../components/EventsSection';

export function HomePage() {
  return (
    <>
      <PlatformHero />
      <ProjectsShowcase />
      <ActiveChallenges />
      <CommunityHub />
      <EventsSection />
    </>
  );
}