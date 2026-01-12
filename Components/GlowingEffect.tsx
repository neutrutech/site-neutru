'use client';

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  children: React.ReactNode;
  className?: string;
}

const GlowingEffect = memo(
  ({ children, className }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!containerRef.current || !glowRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glowRef.current.style.setProperty("--mouse-x", `${x}px`);
      glowRef.current.style.setProperty("--mouse-y", `${y}px`);
      glowRef.current.style.opacity = "1";
    }, []);

    const handleMouseLeave = useCallback(() => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
    }, []);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [handleMouseMove, handleMouseLeave]);

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
      >
        <div
          ref={glowRef}
          className="absolute -inset-px pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle 100px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 134, 140, 0.3), transparent 80%)",
          } as React.CSSProperties}
        />
        {children}
      </div>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
