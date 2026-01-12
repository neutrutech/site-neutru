"use client";

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
    title: "Future of Mobility",
    description: "Innovation that moves you forward",
    imageSrc: "https://i.pinimg.com/736x/9c/f2/8b/9cf28b4df4e06e0ca34fbe87f25734b6.jpg",
    href: "https://www.ruixen.com/",
  },
];

export default function CardStackDemoPage() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl p-8">
        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={2000}
          pauseOnHover
          showDots
        />
      </div>
    </div>
  );
}