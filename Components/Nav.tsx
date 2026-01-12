'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { openEmail } from '../lib/utils';

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Serviços', href: '/services' },
    { label: 'Projectos', href: '/projects' },
    { label: 'Processo', href: '/processos' },
    { label: 'Contactos', href: '/contact' },
  ];

  return (
    <nav
      className="w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-md font-light"
      style={{ backgroundColor: 'rgba(10, 10, 11, 0.5)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">

          <div className="flex items-center gap-6">
            <Link href="/" className="inline-flex items-center">
              <Image src="/LogoMainT.png" alt="Logo" width={160} height={40} className="h-6 w-auto" />
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={async (e) => {
                      e.preventDefault();
                      window.dispatchEvent(new Event('processing:start'));
                      try {
                        await router.push(item.href);
                      } finally {
                        window.dispatchEvent(new Event('processing:stop'));
                      }
                    }}
                    className={`relative inline-block text-[#F1F1F1] hover:text-[#00868C] transition-colors font-light pb-2`}
                  >
                    {item.label}
                    <span className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#00868C] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA + Mobile hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <button className="button" onClick={() => openEmail()}>
                <span className="blob1" aria-hidden />
                <span className="inner flex items-center gap-2 font-light">
                  Seja Parceiro
                  <Image src="/right-up1.png" alt="arrow" width={80} height={80} className="w-4 h-4" />
                </span>
              </button>
            </div>

            <button
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md text-white hover:text-[#00868C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00868C]"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden ${open ? 'block' : 'hidden'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-x-0 top-full mt-2 bg-black/90 border-t border-white/5 p-6">
          <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={async (e) => {
                      e.preventDefault();
                      setOpen(false);
                      window.dispatchEvent(new Event('processing:start'));
                      try {
                        await router.push(item.href);
                      } finally {
                        window.dispatchEvent(new Event('processing:stop'));
                      }
                    }}
                    className="relative text-white text-lg font-light pb-2"
                  >
                    {item.label}
                    <span className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#00868C] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </a>
                );
              })}

            <div className="pt-4">
              <button
                className="button w-full"
                onClick={() => {
                  setOpen(false);
                  openEmail();
                }}
              >
                <span className="blob1" aria-hidden />
                <span className="inner flex items-center justify-center gap-2 font-light">
                  Seja Parceiro
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
