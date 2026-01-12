import ProjectsPage from '@/Components/ProjectsPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Projectos',
  description: 'Portfólio de projectos da NEUTRU — estudos de caso, sites e plataformas entregues com foco em performance e design.',
  path: '/projects',
  image: '/og-projects.png',
  keywords: ['projectos', 'portfólio', 'sites', 'plataformas', 'design'],
});

export default function Projects() {
  return <ProjectsPage />;
}
