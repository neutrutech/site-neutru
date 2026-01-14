 'use client';
import { RadialScrollGallery } from '@/Components/ui/portfolio-and-image-gallery';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import Footer from './Footer';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CardStackDemoPage from '@/Components/slideDesktop';
import ProjectsPageMobile from './ProjectsPageMobile';

import { projects } from '@/lib/projects';

export default function DemoRadialScrollGalleryBento() {
  const [selected, setSelected] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const mobileSectionRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const cardStackRef = useRef<HTMLDivElement | null>(null);
  const [cardEnabled, setCardEnabled] = useState(true);
  const prevVisibleRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Entrance animations for header and mobile section title
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.querySelectorAll('p, h1'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
      );
    }
    if (mobileSectionRef.current) {
      gsap.fromTo(
        mobileSectionRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // Observe CardStack visibility and enable/disable it accordingly
  useEffect(() => {
    if (!cardStackRef.current) return;
    const el = cardStackRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
          // when it becomes visible now but wasn't before, scroll it to center
          if (visible && !prevVisibleRef.current) {
            try {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch (e) {
              /* ignore */
            }
          }
          prevVisibleRef.current = visible;
          setCardEnabled(visible);
        });
      },
      { threshold: [0, 0.15, 0.5, 1], rootMargin: '0px 0px -20% 0px' },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (isMobile) {
    return <ProjectsPageMobile />;
  }

  return (
  <div className="bg-background min-h-[600px] mt-18 text-foreground overflow-visible w-full">
    <div ref={headerRef} className="h-[300px] flex flex-col items-center justify-center space-y-4 pt-8">
      <div className="space-y-1 text-center">
         <p className="text-center text-[#00868C] text-lg font-bold mb-2">
          PROJECTOS
        </p>
        <h1 className="text-3xl md:text-5xl font-normal text-center font-audiowide text-[#F1F1F1] leading-tight">
          UM PEQUENO PORTIFÓLIO<br/> DOS NOSSOS PROJECTOS
        </h1>
      </div>
      <p className="text-[#D1D1D1] font-normal text-sm md:text-base leading-relaxed max-w-full md:max-w-sm text-center md:text-center">
        Cada projeto reflete nossa dedicação em transformar ideias em soluções concretas e eficazes, com design moderno e um visual superior.
        </p>
    </div>

    <div>
      <div ref={cardStackRef}>
        <CardStackDemoPage enabled={cardEnabled} />
      </div>

      <div className="mt-32 mb-6 px-4 flex flex-col items-center justify-center mx-auto text-center max-w-2xl">
        <h4 ref={mobileSectionRef} className="text-3xl md:text-4xl font-audiowide font-normal mb-4">PROECTOS MOBILE</h4>
        <p className="text-[#D1D1D1] font-normal text-sm leading-relaxed max-w-full">
        Além de projectos web, também desenvolvemos aplicações móveis personalizadas que combinam funcionalidade e design intuitivo para oferecer experiências excepcionais aos usuários em qualquer dispositivo.
        </p>
      </div>
    </div>

 <RadialScrollGallery
      className="!min-h-[600px]"
      baseRadius={400}
      mobileRadius={250}
      visiblePercentage={50}
      scrollDuration={2000}
    >
      {(hoveredIndex) =>
        projects.map((project, index) => {
           const isActive = hoveredIndex === index;
           return (
            <div 
              key={project.id} 
              className="group relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] overflow-hidden rounded-xl bg-card border border-border shadow-lg"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isActive ? 'scale-110 blur-0' : 'scale-100 blur-[1px] grayscale-[30%]'
                  }`}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-60" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-background/80 backdrop-blur">
                    {project.cat}
                  </Badge>
                  <div className={`w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                    <ArrowUpRight size={12} />
                  </div>
                </div>

                <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                  <h3 className="text-xl font-bold leading-tight text-foreground">{project.title}</h3>
                  <div className={`h-0.5 bg-primary mt-2 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                </div>
              </div>
            </div>
           );
        })
      }
    </RadialScrollGallery>

    <div className="h-[300px] flex items-center justify-center bg-muted/30">
      <Footer />
    </div>

    {/* Modal */}
    {selected !== null && (
      (() => {
        const p = projects.find((x) => x.id === selected)!;

        const closeModal = () => {
          if (modalContentRef.current) {
            gsap.to(modalContentRef.current, { y: 20, opacity: 0, duration: 0.25 }).then(() => setSelected(null));
          } else {
            setSelected(null);
          }
        };

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
              <div ref={modalContentRef} className="relative max-w-4xl w-full mx-4 bg-[#0A0A0B] rounded-lg overflow-hidden shadow-xl text-[#F1F1F1]" style={{ opacity: 0 }}>
                <div className="relative w-full h-[60vh] md:h-[70vh] bg-[#0A0A0B]">
                  <Image src={p.img} alt={p.title} fill className="object-cover" sizes="100vw" unoptimized />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-normal font-audiowide text-[#F1F1F1]">{p.title}</h2>
                      <p className="text-sm text-[#D1D1D1] mt-1">{p.cat}</p>
                    </div>
                    <button onClick={closeModal} className="text-[#F1F1F1] hover:text-[#00868C]">Fechar</button>
                  </div>
                  <p className="mt-4 text-[#F1F1F1]">{p.desc}</p>
                </div>
              </div>
          </div>
        );
      })()
    )}
  </div>
);
}