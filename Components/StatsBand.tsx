"use client";
import { useEffect, useRef } from 'react';

export default function StatsBand() {
  const bandRef = useRef<HTMLElement | null>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const animatedRef = useRef(false);

  const stats = [
    { label: 'Projectos Entregues', value: 100 },
    { label: 'Clientes Satisfeitos', value: 98, isPercent: true },
    { label: 'Anos de Experiência', value: 1 },
    { label: 'Horas de Desenvolvimento', value: 2500 },
  ];

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;

    const animateValue = (el: HTMLSpanElement, to: number, duration = 1400, isPercent = false) => {
      const start = performance.now();
      const from = 0;
      const loop = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const current = Math.floor(from + (to - from) * t);
        el.textContent = isPercent ? `${current}%` : `+${current.toLocaleString()}`;
        if (t < 1) requestAnimationFrame(loop);
        else el.textContent = isPercent ? `${to}%` : `+${to.toLocaleString()}`;
      };
      requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            // trigger animations for each stat
            stats.forEach((s, i) => {
              const span = valueRefs.current[i];
              if (span) animateValue(span, s.value, 1400 + i * 200, Boolean((s as any).isPercent));
            });
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={bandRef} className="w-full bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <p className="font-normal text-[#D1D1D1]/40 text-lg md:text-xl mb-2">{s.label}</p>
                <p className="text-4xl md:text-6xl font-audiowide font-normal text-white">
                <span ref={(el) => { valueRefs.current[i] = el; }}>{s.isPercent ? '0%' : '+0'}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
