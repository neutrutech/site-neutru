'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+244928051534'; // Substitua pelo seu número
    const message = 'Olá! Gostaria de mais informações sobre seus serviços.';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-[#00868C] hover:bg-[#00868C] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
      aria-label="Contatar no WhatsApp"
    >
      <FaWhatsapp size={28} className="text-white" />
    </button>
  );
}
