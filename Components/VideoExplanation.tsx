"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DottedSurface } from "./ui/dotted-surface";

gsap.registerPlugin(ScrollTrigger);

const infoPairs = [
  { left: "Inovação Contínua", right: "Transformação Digital" },
  { left: "Tecnologia Avançada", right: "Soluções Escaláveis" },
  { left: "Design Inteligente", right: "Performance Otimizada" },
  { left: "Experiência Única", right: "Impacto Positivo" },
];

export default function VideoExplanation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const infoTLRef = useRef<gsap.core.Timeline | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [infoIndex, setInfoIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const playStartedRef = useRef(false);
  const videoEndedRef = useRef(false);
  const infoCycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    // animate info panels
    const animateInfoPanels = () => {
      if (infoTLRef.current) {
        infoTLRef.current.kill();
        infoTLRef.current = null;
      }

      const tl = gsap.timeline();
      tl.fromTo(
        ".ve-info-left",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 }
      )
        .fromTo(
          ".ve-info-right",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5 },
          "<"
        )
        .to(
          [".ve-info-left", ".ve-info-right"],
          { opacity: 0, x: 0, duration: 0.4, delay: 1.2 }
        );
      infoTLRef.current = tl;
      setInfoIndex((prev) => (prev + 1) % infoPairs.length);
    };

    // video ended handler
    const onVideoEnd = () => {
      if (videoEndedRef.current) return;
      videoEndedRef.current = true;
      
      // Stop info cycling
      if (infoCycleIntervalRef.current) {
        clearInterval(infoCycleIntervalRef.current);
        infoCycleIntervalRef.current = null;
      }
      
      // Kill all GSAP animations
      if (infoTLRef.current) {
        infoTLRef.current.kill();
        infoTLRef.current = null;
      }
      
      // Kill ScrollTrigger
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      
      // Show final screen
      setShowFinal(true);
    };

    // setup scroll trigger
    let hasReached40 = false;
    let scrollAfter40 = false;

    triggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        if (videoEndedRef.current) return; // Don't process if video ended
        
        const progress = self.progress;
        const velocity = self.getVelocity();
        const isScrollingDown = velocity > 0;

        if (progress >= 0.4 && !hasReached40) {
          hasReached40 = true;
          console.log("Reached 40% visibility");
        }

        if (hasReached40 && isScrollingDown && !scrollAfter40 && !playStartedRef.current) {
          scrollAfter40 = true;
          playStartedRef.current = true;
          console.log("Starting video playback");
          vid.play().catch((err) => console.log("Play error:", err));
          animateInfoPanels();
        }

        if (progress < 0.35 && !isScrollingDown) {
          hasReached40 = false;
          scrollAfter40 = false;
        }
      },
    });

    // animate info every 2 seconds while video is playing
    const onPlaying = () => {
      if (infoCycleIntervalRef.current) clearInterval(infoCycleIntervalRef.current);
      infoCycleIntervalRef.current = setInterval(() => {
        if (!vid.paused && !vid.ended) {
          animateInfoPanels();
        }
      }, 2000);
    };

    const onPause = () => {
      if (infoCycleIntervalRef.current) {
        clearInterval(infoCycleIntervalRef.current);
        infoCycleIntervalRef.current = null;
      }
    };

    vid.addEventListener("play", onPlaying);
    vid.addEventListener("pause", onPause);
    vid.addEventListener("ended", onVideoEnd);

    return () => {
      vid.removeEventListener("play", onPlaying);
      vid.removeEventListener("pause", onPause);
      vid.removeEventListener("ended", onVideoEnd);
      if (infoCycleIntervalRef.current) {
        clearInterval(infoCycleIntervalRef.current);
      }
      if (infoTLRef.current) {
        infoTLRef.current.kill();
      }
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
      if (vid) vid.pause();
    };
  }, []);

  // Animate final screen once
  useEffect(() => {
    if (!showFinal) return;
    
    console.log("Animating final screen - smooth crossfade");
    
    const tl = gsap.timeline();
    
    // Crossfade: fade out video while fading in final screen
    tl.to(".ve-video-container", {
      opacity: 0,
      duration: 1.2,
      ease: "power1.inOut"
    })
    .to(".ve-final-container", {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut"
    }, "<") // Start at the same time
    .to(".ve-final-image", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(".ve-final-title", {
      opacity: 1,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.3")
    .to(".ve-final-tagline", {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, [showFinal]);

  const currentInfo = infoPairs[infoIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white overflow-visible py-16 md:py-24"
      aria-label="Video explanation"
    >
      {/* DottedSurface Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 scale-[5] origin-center">
          <DottedSurface className="size-full" />
        </div>
      </div>

      <div
      className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none"
      style={{ zIndex: 15 }}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="relative flex items-center justify-center min-h-[600px] md:min-h-[700px]">
        {/* Video Container - fades out */}
        <div className="ve-video-container absolute inset-0 flex items-center justify-center">
        {/* Left Info */}
        <div className="ve-info-left hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-40" style={{ opacity: 0 }}>
          <div className="font-audiowide text-[#f1f1f1] text-2xl leading-tight">
          {currentInfo.left}
          </div>
        </div>

        {/* Video */}
        <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <video
          ref={videoRef}
          src="/v2.mp4"
          className="w-full h-auto block bg-gray-900"
          playsInline
          muted
          preload="auto"
          controls={false}
          />
        </div>

        {/* Right Info */}
        <div className="ve-info-right hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-40 text-right" style={{ opacity: 0 }}>
          <div className="font-audiowide text-[#f1f1f1] text-2xl leading-tight">
          {currentInfo.right}
          </div>
        </div>
        </div>

        {/* Final Screen - fades in, absolutely centered, on top */}
        <div className={`ve-final-container absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showFinal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-full flex flex-col items-center justify-center space-y-6 md:space-y-8">
          {/* Final Heading */}
          <div className="ve-final-heading text-center" style={{ opacity: 1 }}>
          <p className="text-center text-[#00868C] text-lg font-bold mb-2">
          MODERNO
        </p>
          <h2 className="text-center text-2xl md:text-3xl font-audiowide font-normal text-[#F1F1F1] leading-normal">
            MAIS QUE UMA STARUP<br/>SOMOS O FUTURO DE ANGOLA
          </h2>
          </div>

          {/* Final Image with Side Descriptions */}
          <div className="flex items-center justify-center gap-8 md:gap-12 w-full px-4">
          {/* Left Description */}
          <div className="hidden lg:flex flex-col items-start justify-center w-40">
            <p className="left-2 text-[#f1f1f1] text-sm leading-normal text-left">
            Reinventando a forma como os softwares em Angola são criados.
            </p>
          </div>

          {/* Final Image */}
          <div className="ve-final-image w-40 h-36 sm:w-64 sm:h-56 md:w-94 md:h-84 rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
            <img
              src="/finalImgt1.png"
              alt="NEUTRU Final"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Right Description */}
          <div className="hidden lg:flex flex-col items-end justify-center w-40">
            <p className="right-2 text-[#f1f1f1] text-sm leading-normal text-right">
            Transformando ideias em soluções que impactam o mundo.
            </p>
          </div>
          </div>

          {/* Final Title */}
          <div className="ve-final-title text-center" style={{ opacity: 0 }}>
          <p className="max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-[#f1f1f1] leading-relaxed">
            Fundada por uma equipa de engenheiros apaixonados. Começámos com soluções locais simples e, com foco na inovação e no talento nacional, evoluímos para produtos digitais escaláveis que geram impacto social e económico.
          </p>
          </div>
        </div>
        </div>
      </div>
      </div>
      {/* Bottom NEUTRU watermark (Audiowide) — placed under the fade overlay */}
      <div
        aria-hidden={true}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: -28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 8,
          pointerEvents: "none",
          fontFamily: "Audiowide, sans-serif",
          color: "rgba(241,241,241,0.95)",
          opacity: 0.1,
          fontSize: "clamp(8rem, 18vw, 40rem)",
          lineHeight: 0.9,
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 80%)",
          maskImage: "linear-gradient(to top, transparent 0%, black 40%)",
        }}
      >
        NEUTRU
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/40 to-transparent pointer-events-none"
        style={{ zIndex: 15 }}
      />
    </section>
  );
}