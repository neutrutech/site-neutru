"use client";

import React, { useEffect, useRef, useState } from "react";
import { CardStack, CardStackItem } from "@/Components/ui/card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Race Team",
    description: "Experience the thrill of precision engineering",
    imageSrc: "/project1.webp",
    href: "https://www.ruixen.com/",
  },
  {
    id: 2,
    title: "Matana",
    description: "Where beauty meets functionality",
    imageSrc: "/project2.webp",
    href: "https://www.ruixen.com/",
  },
  {
    id: 3,
    title: "Kimbo Soluções",
    description: "Unleash the true potential of the road",
    imageSrc: "/project3.webp",
    href: "https://www.ruixen.com/",
  },
  {
    id: 4,
    title: "Korporativu",
    description: "Built with passion, driven by excellence",
    imageSrc: "/mock2.webp",
    href: "https://www.ruixen.com/",
  },
  {
    id: 5,
    title: "ASA",
    description: "Innovation that moves you forward",
    imageSrc: "/project4.webp",
    href: "https://www.ruixen.com/",
  },
];

export default function CardStackDemoPage({ enabled = true }: { enabled?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(460);
  const [cardHeight, setCardHeight] = useState(260);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      // keep some padding so cards don't hit the page edges; smaller max to avoid edge overflow
      const desired = Math.max(220, Math.min(460, Math.floor(w - 96)));
      setCardWidth(desired);
      // smaller height to reduce vertical footprint
      setCardHeight(260);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={containerRef} className="mx-auto w-full max-w-5xl p-6 overflow-visible">
        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={2000}
          pauseOnHover
          showDots
          enabled={enabled}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
        />
      </div>
    </div>
  );
}