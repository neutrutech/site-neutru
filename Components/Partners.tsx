'use client';

import Image from 'next/image';
import { openEmail } from '../lib/utils';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const elems = logoRefs.current.filter(Boolean) as HTMLElement[];
    if (!elems.length) return;

    gsap.set(elems, { y: 20, opacity: 0, scale: 0.96 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Entrance animation
    tl.to(elems, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out' });

    // After entrance, add a subtle infinite bob for life (staggered)
    tl.to(elems, {
      y: '-=6',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.18,
    }, '+=0.4');

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(elems);
    };
  }, []);

  // Note: filename must match case-sensitive public files for production builds
  const logos = ['Logo001.png', 'Logo002.png', 'Logo003.png', 'Logo0004.PNG'];

  return (
    <section ref={sectionRef} className="w-full bg-[#0A0A0B] py-16 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl md:text-3xl font-audiowide text-[#F1F1F1] mb-6">
          CONFIADO POR INSTITUIÇÕES COM SEDE<br/> DE MODERNIDADE
        </h3>

        <p className="text-sm text-[#B1B1B1] mb-6">Instituições que confiam em soluções modernas e em engenharia sólida,<br/> têm sempre uma arquitetura visual que se destaca.<br/> Conheça as parcerias que nos inspiram a continuar.</p>

        <div className="mb-8">
          {/* Full-bleed row allowing logos to extend to screen edges */}
          <div style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
            <div className="relative">
              <div className="flex items-center flex-wrap md:flex-nowrap gap-12 md:gap-40 justify-center">
              {logos.map((src, i) => (
                <div
                  key={src}
                  ref={(el) => { logoRefs.current[i] = el; }}
                  className="relative inline-flex items-center justify-center rounded-md flex-shrink-0 w-40 sm:w-44 md:w-44 lg:w-56 h-36 sm:h-44"
                >
                  <div className="relative z-4 flex items-center justify-center w-full h-full overflow-hidden p-3">
                    <Image
                      src={`/${src}`}
                      alt={src}
                      width={350}
                      height={120}
                      className="max-w-full max-h-full object-contain block"
                      sizes="(max-width: 640px) 120px, 180px"
                    />
                  </div>
                </div>
            ))}
              </div>

              {/* Left and right edge fades to make logos visually disappear at edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-56 bg-gradient-to-r from-[#0A0A0B] via-[rgba(10,10,11,0.95)] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-56 bg-gradient-to-l from-[#0A0A0B] via-[rgba(10,10,11,0.95)] to-transparent" />
            </div>
          </div>
        </div>

          <div>
            <button className="button" onClick={() => openEmail()}>
              <span className="blob1" aria-hidden />
              <span className="inner flex items-center gap-2">
                Tornar-me parceiro
                <Image
                  src="/right-up1.png"
                  alt="arrow"
                  width={80}
                  height={80}
                  className="w-4 h-4"
                />
              </span>
            </button>
        </div>
      </div>
    </section>
  );
}
