'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ClipPathLinks } from './SocialMedias';
import { openEmail } from '../lib/utils';

export default function Footer() {
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <footer className="w-full bg-[#0A0A0B] text-white relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-8 pointer-events-none bg-cover bg-right"
        style={{ backgroundImage: "url('/finalImg.jpg')" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:justify-between gap-8 w-full">
          {/* Logo + description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md w-full md:w-auto">
            <div className="px-2 md:px-0 w-full mt-4">
              <p className="text-sm text-gray-300 leading-relaxed">
          Somos uma startup de desenvolvimento de software dedicada a criar soluções
          tecnológicas inovadoras e de alto impacto, feitas sob medida para as
          necessidades do nosso cliente e do nosso país.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="w-full md:w-auto text-center md:text-left">
            <p className="font-bold text-lg sm:text-xl mb-3">Links Rápidos</p>
            <nav className="flex flex-col gap-2 sm:gap-3 justify-center md:justify-start">
              <a href="#sobre" className="text-gray-300 hover:text-[#00868C]">Sobre</a>
              <a href="#servicos" className="text-gray-300 hover:text-[#00868C]">Serviços</a>
              <a href="#projectos" className="text-gray-300 hover:text-[#00868C]">Projectos</a>
              <a href="#contacto" className="text-gray-300 hover:text-[#00868C]">Contacto</a>
            </nav>
          </div>

          {/* Contactos */}
          <div className="w-full md:w-auto text-center md:text-left">
            <p className="font-bold text-lg sm:text-xl mb-3">Contactos</p>
            <div className="flex flex-col gap-2 sm:gap-3 justify-center md:justify-start">
              <p className="text-gray-300">+244 928 051 534</p>
              <p className="text-gray-300">neutru.tech@gmail.com</p>
              <p className="text-gray-300">Localização: Empresa Online</p>
            </div>
          </div>

          {/* CTA */}
          <div className="w-full md:w-auto flex justify-center md:justify-end items-center">
            <button className="button w-auto flex justify-center items-center px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base" onClick={() => openEmail()}>
              <span className="blob1" aria-hidden />
              <span className="inner flex items-center gap-1 md:gap-2">
          Pedir um software
          <Image
            src="/right-up1.png"
            alt="arrow"
            width={16}
            height={16}
            className="w-3 h-3 md:w-4 md:h-4"
          />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <ClipPathLinks />
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} NEUTRU. Todos os direitos reservados.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowPolicy(true)} className="text-gray-300 hover:text-[#00868C]">Política de Privacidade</button>
            <a href="#" className="text-gray-300 hover:text-[#00868C]">Termos</a>
          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowPolicy(false)} />
          <div className="relative bg-white dark:bg-[#0A0A0B] text-black dark:text-white rounded-lg max-w-3xl w-full mx-4 p-6 z-60 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold">Política de Privacidade</h3>
              <button onClick={() => setShowPolicy(false)} className="ml-auto text-gray-600 hover:text-[#00868C]">Fechar</button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-auto text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              <p className="mb-2">Esta é a política de privacidade da NEUTRU. Aqui explicamos quais dados coletamos, por que coletamos e como você pode gerenciá-los.</p>
              <p className="mb-2">Dados que podemos coletar: informações de contato, informações de uso do site, cookies e dados técnicos do dispositivo.</p>
              <p className="mb-2">Uso: Melhorar serviços, comunicação com clientes, cumprir obrigações legais e analisar tráfego.</p>
              <p className="mb-2">Seus direitos: solicitar acesso, correção ou eliminação de seus dados. Para solicitar, entre em contacto connosco via email: privacy@neutru.example</p>
              <p className="mb-2">Esta política pode ser atualizada periodicamente. A data da última alteração será refletida nesta versão.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
