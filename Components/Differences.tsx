"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Differences() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const slides = [
    {
      src: isMobile ? '/imgMob1.png' : '/mock2.webp',
      title: 'TORNAMOS SEU VISUAL ÚNICO',
      desc: 'Você precisa se destacar no mercado, não seguir a manada.',
    },
    {
      src: isMobile ? '/imgMob2.png' : '/mock1.webp',
      title: 'O COMUM SEGUE A MANADA',
      desc: 'Você não precisa seguir todo mundo, seu cliente valoriza o diferente.',
    },
  ];

  const [current, setCurrent] = useState(0);
  const slideRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((s) => (s + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  const sectionRef = useRef<any>(null);
  const topStatRef = useRef<any>(null);
  const bottomStatRef = useRef<any>(null);
  const topCountRef = useRef<any>(null);
  const bottomCountRef = useRef<any>(null);
  const countAnimatedRef = useRef<boolean>(false);
  const leftContentRef = useRef<any>(null);
  const rightContentRef = useRef<any>(null);
  const beforeImgRef = useRef<any>(null);
  const afterImgRef = useRef<any>(null);

  const handleMouseMove = (e: React.MouseEvent, i: number) => {
    const el = slideRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  const handleMouseLeave = (i: number) => {
    const el = slideRefs.current[i];
    if (!el) return;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '45%');
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elems = [
      topStatRef.current,
      bottomStatRef.current,
      leftContentRef.current,
      rightContentRef.current,
      beforeImgRef.current,
      afterImgRef.current,
    ].filter(Boolean);

    if (elems.length === 0 || !sectionRef.current) return;

    gsap.set(elems, { y: 40, opacity: 0 });

    const animateCounts = () => {
      if (countAnimatedRef.current) return;
      countAnimatedRef.current = true;

      if (topCountRef.current) {
        const topCounter = { value: 0 };
        gsap.to(topCounter, {
          value: 100,
          duration: 1.2,
          ease: 'power1.out',
          onUpdate: () => {
            if (topCountRef.current) topCountRef.current.textContent = `+${Math.floor(topCounter.value)}`;
          },
        });
      }

      if (bottomCountRef.current) {
        const bottomCounter = { value: 0 };
        gsap.to(bottomCounter, {
          value: 100,
          duration: 1.4,
          ease: 'power1.out',
          onUpdate: () => {
            if (bottomCountRef.current) bottomCountRef.current.textContent = `+${Math.floor(bottomCounter.value)}`;
          },
        });
      }
    };

    const enter = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(elems, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' });
        animateCounts();
      },
      onEnterBack: () => {
        gsap.to(elems, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' });
        animateCounts();
      },
    });

    // Exit trigger: animate out only when leaving the section
    const exitTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'bottom top',
      onLeave: () => {
        gsap.to(elems, { y: -40, opacity: 0, stagger: 0.05, duration: 0.45, ease: 'power1.in' });
      },
      onLeaveBack: () => {
        // when scrolling back up into the section, bring elems back
        gsap.to(elems, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' });
      },
    });

    return () => {
      enter && enter.kill && enter.kill();
      exitTrigger && exitTrigger.kill && exitTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(elems);
    };
  }, []);

  // We render title/desc directly inside each slide, so no DOM updates needed

  return (
    <section ref={sectionRef} className="relative w-full min-h-[620px] overflow-hidden z-20">

      <div
        className="absolute inset-0 bg-[#0A0A0B]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
        }}
      />

      {/* Light section - Bottom left diagonal */}
      <div
        className="absolute inset-0 bg-[#0A0A0B]"
        style={{
          clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
        }}
      />

      {/* Slideshow: one large image at a time with description below */}
      <div className="relative w-full h-full min-h-[720px] flex flex-col items-center justify-center">
        {/* Slides container: image centered and larger; titles/descriptions removed */}
        <div className="w-full py-8 flex items-center justify-center">
          <div className="relative w-full px-e">
            {/* Slides container */}
            <div className="relative w-full h-[720px] overflow-hidden">
              {slides.map((s, i) => (
                <div
                  key={s.src}
                  ref={(el) => {
                    if (!el) return;
                    slideRefs.current[i] = el;
                  }}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className={`absolute inset-0 transition-opacity duration-800 ease-[cubic-bezier(.2,.8,.2,1)] flex items-center justify-center ${i === current ? 'opacity-100 z-20' : 'opacity-0 z-10'
                    }`}
                >
                  <div
                    className="flex items-center justify-center w-full h-full"
                    ref={(el) => {
                      if (!el) return;
                      // attach specific refs for GSAP if needed
                      if (i === 0) beforeImgRef.current = el;
                      if (i === 1) afterImgRef.current = el;
                    }}
                  >
                    <div className="max-w-[1200px] w-[98%] mx-auto relative flex items-center justify-center">
                      <Image
                        src={s.src}
                        alt={s.title}
                        width={1200}
                        height={800}
                        className="object-cover rounded-lg w-full h-auto"
                      />

                      {/* Dark overlay with cursor reveal + subtle light */}
                      <div className="absolute inset-0 rounded-lg bg-black/70 z-20" />

                      {/* Reveal mask: larger transparent center where cursor is to show more image */}
                      <div
                        className="absolute inset-0 rounded-lg z-30 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle at var(--mx,50%) var(--my,45%), rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.85) 100%)',
                          mixBlendMode: 'normal',
                        }}
                      />

                      {/* Subtle light tint at cursor center to simulate illumination (no dark edges) */}
                      <div
                        className="absolute inset-0 rounded-lg z-40 pointer-events-none"
                        style={{
                          background:
                          'radial-gradient(circle at var(--mx,50%) var(--my,45%), rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 25%, transparent 45%)',
                          mixBlendMode: 'screen',
                        }}
                      />

                      {/* Title & description overlay */}
                      <div className="absolute left-6 bottom-24 text-left text-white z-40">
                        <h3 className="text-2xl md:text-3xl font-audiowide font-normal">{s.title}</h3>
                        <p className="text-sm md:text-base font-extralight mt-2 max-w-xl">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
