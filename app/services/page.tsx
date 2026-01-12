import Services from '@/Components/Services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Serviços',
  description: 'Serviços da NEUTRU — design de produto, desenvolvimento web, estratégia de produto e consultoria técnica.',
  path: '/services',
  image: '/og-services.png',
  keywords: ['serviços', 'design de produto', 'desenvolvimento', 'consultoria'],
});

export default function ServicesPage() {
  return <Services />;
}
