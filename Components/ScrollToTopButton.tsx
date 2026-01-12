"use client";

import React, { useEffect, useState } from "react";

export default function ScrollToTopButton(): React.ReactElement {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo"
      className={`fixed z-40 right-28 bottom-8 w-16 h-16 rounded-full bg-[#f1f1f1] text-[#0A0A0B] shadow-lg flex items-center justify-center transition-opacity duration-300 hover:scale-105 hover:shadow-xl ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-[#0A0A0B]">
        <path fill="currentColor" d="M12 4l-8 8h5v8h6v-8h5z" />
      </svg>
    </button>
  );
}
