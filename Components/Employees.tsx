"use client";

import React, { useEffect, useState } from "react";
import { CircularTestimonials } from './ui/circular-testimonials';
const testimonials = [
  {
    quote:
      "Cria interfaces e experiências digitais centradas no usuário, combinando estética e usabilidade.",
    name: "Ryan Amador",
    designation: "UI/UX Designer",
    src:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Desenvolve e mantém aplicações, escrevendo código e solucionando problemas técnicos.",
    name: "Denzel Santos",
    designation: "Software Developer",
    src:
      "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "Edita vídeos e cria conteúdo para redes sociais, trabalhando para maximizar alcance e engajamento.",
    name: "Gerson Baptista",
    designation: "Video Editor/Social Media Manager",
    src:
      "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "Analisa requisitos, projeta e implementa soluções de software para melhorar processos e sistemas.",
    name: "Alcino Jaime",
    designation: "Anal. de Sistemas/Programador",
    src:
      "https://i.pinimg.com/1200x/bb/6a/ef/bb6aef8c1bd48cd8b3b41725eaba18e3.jpg",
  },
];

export const CircularTestimonialsDemo = () => (
  <section id="employees-section" className="relative z-20">
    {/* Title Section */}
    <div className="bg-[#0A0A0B] text-whitept-20 pb-18 mt-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-center text-[#00868C] text-lg font-bold mb-2">
          PROFISSIONAIS
        </p>
        <h2 className="text-2xl md:text-3xl font-audiowide font-semibold text-[#F1F1F1] leading-tight">
          CONHEÇA AS MENTES<br/>
          POR TRÁS DA STARTUP
        </h2>
      </div>
    </div>

    {/* Light testimonials section */}
    <div className="bg-[#0A0A0B] px-4 pb-20 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
      <div
        className="items-center justify-center relative flex"
        style={{ maxWidth: "1456px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          initialIndex={getInitialIndex()}
          colors={{
            name: "#F1F1F1",
            designation: "#D1D1D1",
            testimony: "#F1F1F1",
            arrowBackground: "#F1F1F1",
            arrowForeground: "#0A0A0B",
            arrowHoverBackground: "#00868C",
          }}
          fontSizes={{
            name: "28px",
            designation: "20px",
            quote: "20px",
          }}
        />
      </div>
    </div>
  </section>
);

function getInitialIndex() {
  if (typeof window !== 'undefined') {
    const selectedIndex = sessionStorage.getItem('selectedMemberIndex');
    if (selectedIndex !== null) {
      sessionStorage.removeItem('selectedMemberIndex');
      return parseInt(selectedIndex, 10);
    }
  }
  return 0;
}
