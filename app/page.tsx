import HeroSection from '@/Components/HeroSection';
import Explanation from '@/Components/Explanation';
import Differences from '@/Components/Differences';
import VideoExplanation from '@/Components/VideoExplanation';
import Partners from '@/Components/Partners';
import Footer from '@/Components/Footer';
import {  CircularTestimonialsDemo } from '@/Components/Employees';
import { HeroScrollDemo } from '@/Components/projectsEx';
import StatsBand from '@/Components/StatsBand';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Início',
  description: 'NEUTRU — design e engenharia de produto digital. Transformamos ideias em experiências digitais ricas e escaláveis.',
  path: '/',
  image: '/og-home.png',
  keywords: ['NEUTRU', 'design', 'desenvolvimento', 'produtos digitais'],
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <VideoExplanation />
      <HeroScrollDemo />
      <StatsBand />
      <Differences />
      <CircularTestimonialsDemo />
      <Explanation />
      <Partners />
      <Footer />
    </>
  );
};