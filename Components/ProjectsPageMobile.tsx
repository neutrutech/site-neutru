"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { projects } from '@/lib/projects';

export default function ProjectsPageMobile() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray('.projects-mobile-item') as Element[];
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
  return (
    <div className="w-full bg-[#0A0A0B] text-white min-h-screen px-4 py-6 mt-16">
      <header className="max-w-xl mx-auto text-center mb-6">
        <p className="text-[#00868C] text-lg font-bold">PROJECTOS</p>
        <h1 className="text-2xl font-audiowide mt-2">UM PEQUENO PORTIFÓLIO DOS NOSSOS PROJECTOS</h1>
        <p className="text-sm text-[#D1D1D1] mt-2">Cada projeto reflete nossa dedicação em transformar ideias em soluções concretas e eficazes, com design moderno e um visual superior.</p>
      </header>

      <main className="max-w-xl mx-auto space-y-6">
        {projects.map((p) => (
          <article key={p.id} className="bg-[#0f0f10] border border-white/5 rounded-lg overflow-hidden">
            <h3 className="px-4 pt-4 text-lg font-bold">{p.title}</h3>
            <div className="w-full h-64 md:h-72 bg-gray-800 overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="text-sm text-[#D1D1D1]">{p.desc}</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <a href="#" className="text-[#00868C] font-normal">Visitar site...</a>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* PROJECTOS MOBILE section */}
      <section className="max-w-xl mx-auto mt-8">
        <h4 className="text-3xl font-audiowide text-center mb-4">PROJECTOS MOBILE</h4>
        <div className="space-y-6">
          {projects.map((p) => (
            <div key={`m-${p.id}`} className="bg-[#0f0f10] border border-white/5 rounded-lg overflow-hidden">
            <div className="relative w-full h-[520px] overflow-hidden">
                <Image src={p.img} alt={p.title} fill className="object-cover" />
            </div>
              <div className="p-4">
                <h5 className="font-bold mb-2">{p.title}</h5>
                <p className="text-sm text-[#D1D1D1] mb-3">{p.desc}</p>
                <a href="#" className="text-[#00868C] font-normal">Visitar site...</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
