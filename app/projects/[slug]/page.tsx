// Use native <img> in SSR page to avoid next/image prerender issues
import { notFound } from 'next/navigation';
import { findProjectBySlug, projects } from '@/lib/projects';
import { pageMetadata } from '@/lib/seo';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: Props) {
  const project = findProjectBySlug(params.slug);
  if (!project) return notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.desc,
    url: `https://neutru.tech/projects/${project.slug}`,
    image: `https://neutru.io${project.img}`,
    genre: project.cat,
    author: { '@type': 'Organization', name: 'NEUTRU', url: 'https://neutru.io' },
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-audiowide mb-4">{project.title}</h1>
        <p className="text-sm text-gray-300 mb-6">{project.cat}</p>
        <div className="w-full h-[60vh] relative mb-6 overflow-hidden">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
        </div>
        <p className="text-gray-300">{project.desc}</p>
      </div>
    </main>
  );
}

export function generateMetadata({ params }: Props) {
  const project = findProjectBySlug(params.slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.desc,
    path: `/projects/${project.slug}`,
    image: project.img,
    keywords: ['projecto', project.cat],
  });
}
