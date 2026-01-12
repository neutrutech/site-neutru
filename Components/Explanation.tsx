'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Explanation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const el = contentRef.current;
    gsap.set(el, { opacity: 0, y: 40 });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
      onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
      onLeave: () => gsap.to(el, { opacity: 0, y: -40, duration: 0.6, ease: 'power1.in' }),
      onLeaveBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }),
    });

    return () => {
      st && st.kill && st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <section ref={sectionRef} id="explanation-section" className="relative w-full bg-[#0A0A0B] py-12 md:py-16">
      <div className="absolute inset-0">
        <Image
          src="/backimg.webp"
          alt="Luanda City"
          fill
          className="object-cover opacity-20"
          loading="lazy"
        />
      </div>
      <div ref={contentRef} className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Conteúdo à esquerda */}
            <div className="flex flex-col justify-start">
              <h2 className="text-left text-2xl md:text-3xl font-audiowide font-normal text-[#F1F1F1] leading-tight mb-8">
                MUITO ALÉM DO CLIENTE<br /> CONSTRUIMOS O AMANHÃ DIGITAL DE ANGOLA              
                </h2>

              <p className="text-[#D1D1D1] text-sm md:text-base font-normal leading-relaxed mb-6">
                Estamos a construir plataformas que elevam a qualidade de vida, simplificam a administração e colocam o nosso país na vanguarda tecnológica africana.
              </p>

              <a href="projects" className="text-[#00868C] text-lg font-bold hover:text-[#00707a] transition-colors inline-block">
                Veja nossos projectos →
              </a>
            </div>

            {/* Imagem à direita */}
            <div className="relative">
              <Image
                src="/phoneSectionn.webp"
                alt="Phone Section"
                width={500}
                height={500}
                className="object-cover rounded-lg w-full h-auto relative z-10"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
