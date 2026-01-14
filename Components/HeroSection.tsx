'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { openEmail } from '../lib/utils';
import { Boxes } from './BgHeroSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export default function HeroSection() {
  const [memberHovered, setMemberHovered] = useState(false);
  const sectionRef = useRef(null);
  const leftGroupRef = useRef(null);
  const rightGroupRef = useRef(null);

  // Dynamic title and description
  const titles = [
    'UM NOVO PADRÃO\nDO MODERNO',
    'TRANSFORMAMOS\nO SEU NEGÓCIO',
    'SOFTWARES FEITOS\nPARA VOCÊ'
  ];

  const descriptions = [
    'NEUTRU nasce para redefinir o que é ser moderno. Unimos tecnologia inteligente, design funcional e inovação.',
    'Criamos software sob medida que resolve problemas reais e impulsiona crescimento com experiência e precisão.',
    'Design centrado no utilizador e engenharia robusta para produtos digitais escaláveis e elegantes.'
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);
  const [titleFading, setTitleFading] = useState(false);
  const [descFading, setDescFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // start fade out
      setTitleFading(true);
      setDescFading(true);

      const t = setTimeout(() => {
        setTitleIndex((i) => (i + 1) % titles.length);
        setDescIndex((i) => (i + 1) % descriptions.length);
        // fade in
        setTitleFading(false);
        setDescFading(false);
        clearTimeout(t);
      }, 500); // fade duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMemberClick = (memberIndex: number) => {
    // Mapear índice da Hero para índice do testimonials
    // Hero: m1=Alcino(0), m2=Denzel(1), m3=Gerson(2), m4=Ryan(3)
    // Testimonials: Ryan(0), Denzel(1), Gerson(2), Alcino(3)
    const heroToTestimonialIndex = [3, 1, 2, 0]; // [Alcino->3, Denzel->1, Gerson->2, Ryan->0]
    const testimonialIndex = heroToTestimonialIndex[memberIndex];
    
    // Guardar o índice do membro clicado no sessionStorage
    sessionStorage.setItem('selectedMemberIndex', testimonialIndex.toString());
    
    // Scroll suave até a section employees
    const employeesSection = document.querySelector('#employees-section');
    if (employeesSection) {
      employeesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !leftGroupRef.current || !rightGroupRef.current) return;

    // Animar saída para a esquerda (h1 + botão)
    gsap.to(leftGroupRef.current, {
      x: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    });

    // Animar saída para a direita (descrição + fotos)
    gsap.to(rightGroupRef.current, {
      x: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated background using Boxes */}
      <div className="absolute inset-0 z-0">
      <Boxes />
      </div>

      <div ref={leftGroupRef} className="hidden md:block absolute left-4 sm:left-8 md:left-30 bottom-20 z-20 pointer-events-none">
      <div className="pointer-events-auto bg-black/40 px-6 py-3 rounded-md flex flex-col items-start">
      <h1 className={`text-white text-2xl sm:text-2xl md:text-5xl font-audiowide font-bold m-0 leading-normal tracking-wider transition-opacity duration-500 ${titleFading ? 'opacity-0' : 'opacity-100'}`}>
        {titles[titleIndex].split('\n').map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h1>
      </div>

      <button className="button left-6 mt-6 pointer-events-auto" onClick={() => openEmail()}>
      <span className="blob1" aria-hidden />
      <span className="inner flex items-center gap-2">
        Pedir um Software
        <Image
        src="/right-up1.png"
        alt="arrow"
        width={80}
        height={80}
        className="w-6 h-6"
        />
      </span>
      </button>
      </div>

      <div ref={rightGroupRef} className="hidden md:block absolute right-4 sm:right-8 md:right-30 bottom-28 z-20 pointer-events-none">
      <div className="max-w-sm pointer-events-auto text-right">
      <p className={`text-white text-base md:text-lg font-poppins text-left leading-relaxed transition-opacity duration-500 ${memberHovered ? 'blur-sm' : ''} ${descFading ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-bold">{descriptions[descIndex].split(' ')[0]}</span> {descriptions[descIndex].split(' ').slice(1).join(' ')}
      </p>
      </div>

      {/* Team Members Carousel */}
      <div className="mt-10 flex items-center pointer-events-auto">
      {[
        { img: 'm1.png', name: 'Alcino', role: 'Programador / Analista de Sistemas' },
        { img: 'm2.png', name: 'Denzel', role: 'Programador' },
        { img: 'm3.png', name: 'Gerson', role: 'Editor de Vídeo / Gestor de Redes Sociais' },
        { img: 'm4.png', name: 'Ryan', role: 'UI/UX Designer' },
      ].map((member, i) => (
        <div
      key={i}
      className="group relative transition-all cursor-pointer"
      style={{ zIndex: 10 + i, marginLeft: i !== 0 ? '-1.5rem' : '0' }}
      onMouseEnter={() => setMemberHovered(true)}
      onMouseLeave={() => setMemberHovered(false)}
      onClick={() => handleMemberClick(i)}
        >
      {/* Glow behind the avatar on hover */}
      <div
        style={{ zIndex: 10 + i - 1 }}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#00868C] opacity-0 group-hover:opacity-80 blur-xl transition-all duration-300 pointer-events-none"
      />

      <Image
        src={`/${member.img}`}
        alt={member.name}
        width={64}
        height={64}
        className="relative z-20 w-16 h-16 rounded-full object-cover border-2 border-white/10 transition-transform duration-200 hover:scale-105 hover:-translate-y-1"
      />

      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-2 rounded-md whitespace-nowrap text-xs z-30">
        <p className="text-white font-bold">{member.name}</p>
        <p className="text-gray-300 text-xs">{member.role}</p>
      </div>
        </div>
      ))}
      </div>
      </div>

      {/* Mobile centered layout - only on small screens (dynamic title/desc + clickable members) */}
      <div className="md:hidden absolute top-8 left-0 right-0 z-20 flex flex-col items-center mt-32 gap-6 px-6">
        <div className="bg-black/40 px-4 py-3 rounded-md">
          <h1 className={`text-white text-2xl sm:text-2xl font-audiowide font-bold m-0 leading-normal tracking-wider text-center transition-opacity duration-500 ${titleFading ? 'opacity-0' : 'opacity-100'}`}>
            {titles[titleIndex].split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
        </div>

        <p className={`text-white text-base text-center font-poppins leading-relaxed max-w-md transition-opacity duration-500 ${descFading ? 'opacity-0' : 'opacity-100'}`}>
          <span className="font-bold">{descriptions[descIndex].split(' ')[0]}</span> {descriptions[descIndex].split(' ').slice(1).join(' ')}
        </p>

        <div className="flex items-center justify-center gap-4">
          {[
            { img: 'm1.png', name: 'Alcino', role: 'Programador | Analista de Sistemas' },
            { img: 'm2.png', name: 'Denzel', role: 'Programador' },
            { img: 'm3.png', name: 'Gerson', role: 'Editor de Vídeo | Gestor de Redes Sociais' },
            { img: 'm4.png', name: 'Ryan', role: 'UI/UX Designer' },
          ].map((member, i) => (
            <button
              key={i}
              onClick={() => handleMemberClick(i)}
              className="relative bg-transparent border-0 p-0 cursor-pointer"
              aria-label={`Selecionar ${member.name}`}
            >
              <Image
                src={`/${member.img}`}
                alt={member.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
              />
            </button>
          ))}
        </div>

        <button className="button mt-2" onClick={() => openEmail()}>
          <span className="blob1" aria-hidden />
          <span className="inner flex items-center gap-2">
            Pedir um Software
            <Image src="/right-up1.png" alt="arrow" width={80} height={80} className="w-4 h-4" />
          </span>
        </button>
      </div>

      {/* Gradient overlay at bottom */}
      <div
      className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none"
      style={{ zIndex: 15 }}
      />
    </section>
  );
}
