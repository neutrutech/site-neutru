export type Project = {
  id: number;
  title: string;
  cat: string;
  img: string;
  desc: string;
  slug: string;
  url?: string;
};

export const projects: Project[] = [
  { id: 1, title: 'Race Team', cat: 'site informativo', img: '/project1.webp', desc: 'Criámos o sistema visual e identidade digital para uma galeria fictícia — o projeto destacou-se pelo uso de gradientes e motion.', slug: 'race-team' },
  { id: 2, title: 'Matana', cat: 'site institucional', img: '/project2.webp', desc: 'Aplicámos técnicas de otimização de imagens e performance para um cliente de fotografia, melhorando carregamento e UX.', slug: 'matana' },
  { id: 3, title: 'Kimbo Soluções', cat: 'site institucional', img: '/project3.webp', desc: 'Desenvolvemos uma landing interativa para promover experiências ecológicas, com integração de vídeo e storytelling.', slug: 'kimbo-solucoes' },
  { id: 4, title: 'Korporativu', cat: 'site institucional', img: '/mock2.webp', desc: 'Projeto para uma startup de tecnologia, focado em interfaces modernas e micro-interações para aumentar conversões.', slug: 'korporativu' },
  { id: 5, title: 'Desert', cat: 'Travel', img: '/backimg.webp', desc: 'Campanha visual para promover rotas de viagem, com galerias e filtros de destinos.', slug: 'desert' },
];

export function findProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) || null;
}
