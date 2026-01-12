'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheck, FaGlobe, FaMobileAlt, FaArrowRight, FaPalette } from 'react-icons/fa';
import Nav from './Nav';
import Footer from './Footer';
import { openEmail } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [activeTab, setActiveTab] = useState('sites');
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [tabWidths, setTabWidths] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animar título
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'top center',
            toggleActions: 'play none none none',
            markers: false,
          },
        }
      );
    }

    // Animar cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              end: 'top center',
              toggleActions: 'play none none none',
              markers: false,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Calcular largura das abas dinamicamente
  useEffect(() => {
    const updateWidths = () => {
      const widths = tabsRef.current.map(tab => tab?.offsetWidth || 0);
      setTabWidths(widths);
    };

    // Calcular na primeira renderização
    updateWidths();

    // Recalcular ao redimensionar a janela
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, []);

  // Animar cards ao trocar tab
  useEffect(() => {
    const cards = cardsRef.current.filter(card => card); // Remove undefined cards

    // Fade out dos cards atuais
    gsap.to(cards, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      stagger: 0.05,
    });

    // Delay e fade in dos novos cards com animação especial
    setTimeout(() => {
      if (cards.length > 0) {
        const middleIndex = Math.floor(cards.length / 2);

        // Animar card do meio (vem de baixo)
        gsap.fromTo(
          cards[middleIndex],
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          }
        );

        // Animar cards das laterais (saem da lateral do card do meio)
        cards.forEach((card, index) => {
          if (index !== middleIndex) {
            const direction = index < middleIndex ? -60 : 60; // Esquerda ou direita
            gsap.fromTo(
              card,
              { x: -direction, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.15, // Começa após o card do meio
              }
            );
          }
        });
      }
    }, 300);
  }, [activeTab]);

  const services = [
    {
      id: 1,
      title: 'Sites Estáticos',
      description: 'Plataformas digitais para apresentar sua marca, serviços e conteúdo. Ideal para empresas, profissionais e organizações que precisam de presença online forte.',
      category: 'sites',
      features: [
        'Design responsivo e moderno',
        'Otimização SEO completa',
        'Hospedagem incluída (1 ano)',
        'Domínio personalizado',
        'Painel de controle intuitivo',
        'Suporte técnico',
      ],
      price: '150.000',
      image: 'https://i.pinimg.com/736x/64/4a/9e/644a9e67cd0bd971aee3cd05300228b7.jpg',
    },
    {
      id: 2,
      title: 'Sites Informativos',
      description: 'Plataformas interativas com conteúdo dinâmico e atualizações frequentes. Ideal para blogs, notícias, portais e sites de informação.',
      category: 'sites',
      features: [
        'Design responsivo e moderno',
        'Otimização SEO completa',
        'Hospedagem incluída (1 ano)',
        'Domínio personalizado',
        'Painel de controle intuitivo',
        'Suporte técnico',
      ],
      price: '450.000',
      image: 'https://i.pinimg.com/1200x/0a/fd/9b/0afd9bed6f6738c0e401686d6e9dbfb0.jpg',
    },
    {
      id: 3,
      title: 'Sites Comerciais',
      description: 'E-commerce completo com sistema de vendas, integração de pagamentos e gestão de inventário. Perfeito para lojas online e negócios digitais.',
      category: 'sites',
      features: [
        'Catálogo de produtos avançado',
        'Sistema de carrinho e checkout',
        'Gateway de pagamento integrado',
        'Gestão de estoque automática',
        'Dashboard de vendas em tempo real',
        'Suporte técnico prioritário 24/7',
      ],
      price: '550.000',
      image: 'https://i.pinimg.com/1200x/30/3e/b9/303eb9f517c2b7c7cb7a29101e858ac1.jpg',
    },
    {
      id: 4,
      title: 'Web Apps Customizadas',
      description: 'Aplicações web sob medida para processos empresariais específicos. Sistemas ERP, CRM, gestão de projetos e soluções personalizadas.',
      category: 'sites',
      features: [
        'Análise detalhada de requisitos',
        'Desenvolvimento totalmente customizado',
        'Integração com APIs externas',
        'Painel administrativo robusto',
        'Treinamento completo da equipe',
        'Suporte técnico e manutenção contínua',
      ],
      price: '630.000',
      image: 'https://i.pinimg.com/1200x/cc/dc/8e/ccdc8eb99b52cad8a14a8137931e02a6.jpg',
    },
    {
      id: 8,
      title: 'Rebranding',
      description: 'Transforme sua marca com identidade visual moderna. Logo, paleta de cores, guidelines de marca e materiais de design profissionais.',
      category: 'rebranding',
      features: [
        'Pesquisa de mercado e análise competitiva',
        'Design do logotipo exclusivo',
        'Paleta de cores estratégica',
        'Guidelines de marca completos',
        'Materiais de impressão e digital',
        'Consultoria de posicionamento de marca',
      ],
      price: null,
      image: 'https://i.pinimg.com/1200x/dd/40/1d/dd401db56e8a7f696938173a6d32a31e.jpg',
    },
    {
      id: 5,
      title: 'Aplicativos Comerciais',
      description: 'Aplicativos móveis e desktop para gerenciamento de negócios. Ferramentas de controle, análise de dados e automação de processos comerciais.',
      category: 'aplicativos',
      features: [
        'Interface intuitiva e responsiva',
        'Sistema de autenticação seguro',
        'Sincronização em tempo real',
        'Relatórios e análises avançadas',
        'Integração com sistemas existentes',
        'Suporte técnico e atualizações regulares',
      ],
      price: '600.000',
      image: 'https://i.pinimg.com/1200x/12/58/bc/1258bc7b4935f71c72a0a242778e8383.jpg',
    },
    {
      id: 6,
      title: 'Aplicativos Sociais',
      description: 'Plataformas de comunicação e networking. Apps para conectar usuários, compartilhar conteúdo e construir comunidades online.',
      category: 'aplicativos',
      features: [
        'Sistema de mensagens em tempo real',
        'Feed de atividades personalizado',
        'Notificações push inteligentes',
        'Perfis de usuário customizáveis',
        'Sistema de recomendações',
        'Moderação e segurança integradas',
      ],
      price: '750.000',
      image: 'https://i.pinimg.com/1200x/fa/7d/6e/fa7d6e208f4901bc5971a37847479da5.jpg',
    },
    {
      id: 7,
      title: 'Aplicativos Funcionais',
      description: 'Ferramentas utilitárias para produtividade e organização. Apps de gestão de tarefas, calendários, notas e outros recursos essenciais.',
      category: 'aplicativos',
      features: [
        'Sincronização multi-dispositivo',
        'Backup automático na nuvem',
        'Interface minimalista e eficiente',
        'Atalhos e automações',
        'Integração com outras ferramentas',
        'Modo offline disponível',
      ],
      price: '400.000',
      image: 'https://i.pinimg.com/1200x/9f/05/34/9f05342781ae53b91e7e212ab1014d42.jpg',
    },
  ];

  const filteredServices = services.filter(service => service.category === activeTab);

  return (
    <>
      <Nav />
      <section ref={sectionRef} id="servicos" className="relative w-full bg-[#0A0A0B] py-20 md:py-28 mt-18">
        {/* Background */}
        <div className="fixed inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'url(/backimg.webp)', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div ref={titleRef} className="mb-16 md:mb-20 text-center">
              <p className="text-[#00868C] text-lg font-semibold mb-4">SERVIÇOS</p>
              <h2 className="text-3xl md:text-5xl font-audiowide font-normal text-[#F1F1F1] leading-tight mb-6">
                CRIAMOS SOFTWARES<br/> QUE TRANSFORMAM
              </h2>
              <p className="text-[#B1B1B1] text-base md:text-lg max-w-2xl mx-auto">
                Soluções completas em desenvolvimento web, design e consultoria para llevar sua empresa ao próximo nível.
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-12 flex justify-center">
              <div className="relative bg-[#1a1a1e] border border-[#00868C]/30 rounded-full p-1 flex gap-0 w-full sm:w-fit overflow-x-auto no-scrollbar items-center">
              {/* Animated background toggle */}
              <div
                className="absolute top-1 bottom-1 rounded-full bg-white transition-all duration-300 ease-out pointer-events-none"
                style={{
                // compute index of active tab
                width: `${Math.max((tabWidths[['sites', 'aplicativos', 'rebranding'].indexOf(activeTab)] || 0) - 8, 40)}px`,
                left: `${tabWidths.slice(0, ['sites', 'aplicativos', 'rebranding'].indexOf(activeTab)).reduce((a, b) => a + b, 0) + 8}px`,
                }}
              />

              {[
                { id: 'sites', icon: FaGlobe, label: 'Sites' },
                { id: 'aplicativos', icon: FaMobileAlt, label: 'Aplicativos' },
                { id: 'rebranding', icon: FaPalette, label: 'Rebranding' },
              ].map((tab, index) => (
                <button
                key={tab.id}
                ref={(el) => {
                  if (el) tabsRef.current[index] = el;
                }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 sm:px-6 h-12 sm:h-14 rounded-full flex items-center justify-center gap-2 font-semibold transition-all duration-300 whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                  ? 'text-[#0A0A0B]'
                  : 'text-[#B1B1B1] hover:text-[#F1F1F1]'
                }`}
                >
                <tab.icon size={18} />
                <span className="text-sm">{tab.label}</span>
                </button>
              ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
              {/* Light effect in the center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#00868C]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
              
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="group relative bg-gradient-to-br from-[#1a1a1e] to-[#0a0a0b] border border-[#00868C]/30 rounded-lg p-8 hover:border-[#00868C] transition-all duration-300 hover:shadow-lg hover:shadow-[#00868C]/20"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00868C]/0 to-[#00868C]/0 group-hover:from-[#00868C]/10 group-hover:to-[#00868C]/5 rounded-lg transition-all duration-300 pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Image */}
                    <div className="mb-6 -m-8 mb-6 rounded-t-lg overflow-hidden h-48">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-audiowide font-bold text-[#F1F1F1] mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#B1B1B1] text-sm md:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <FaCheck className="text-[#00868C] mt-1 flex-shrink-0" size={16} />
                          <span className="text-[#D1D1D1] text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    {service.price && (
                      <div className="border-t border-[#00868C]/20 pt-6 mb-6">
                        <p className="text-[#00868C] text-xs font-semibold uppercase tracking-wider mb-2">
                          Preço base
                        </p>
                        <p className="text-2xl md:text-3xl font-audiowide font-bold text-[#F1F1F1]">
                          {service.price}
                          <span className="text-base text-[#B1B1B1] font-normal"> Kzs</span>
                        </p>
                      </div>
                    )}

                    {/* CTA Link */}
                    <a 
                      href={`mailto:neutru.tech@gmail.com?subject=Solicitação de ${service.price ? 'Serviço' : 'Consultoria'} - ${service.title}&body=${service.price ? `Gostaria de requisitar o serviço ${service.title}...` : `Gostaria de agendar uma consultoria gratuita para o serviço ${service.title}...`}`}
                      className="inline-flex items-center gap-2 text-[#00868C] font-semibold hover:text-[#3B82F6] transition-colors duration-300 group/link"
                    >
                      {service.price ? 'Requisitar Serviço' : 'Agendar Consultoria Gratuita'}
                      <FaArrowRight className="group-hover/link:translate-x-1 transition-transform duration-300" size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Section */}
            <div className="mt-20 bg-gradient-to-r from-[#F1F1F1] to-[#F1F1F1] border border-[#F1F1F1] rounded-lg p-8 md:p-12">
              <h3 className="text-xl md:text-2xl font-audiowide font-normal text-[#0A0A0B] mb-4">
              Orçamento Personalizado
              </h3>
              <p className="text-[#0A0A0B] text-base leading-relaxed mb-6">
              Os preços acima são preços base. Cada projeto é único e pode ter requisitos específicos que afetam o custo final. Oferecemos consultoria gratuita para entender suas necessidades e fornecer um orçamento preciso.
              </p>
              <button className="button" onClick={() => openEmail('Solicitação de Consultoria Gratuita', 'Gostaria de agendar uma consultoria gratuita para discutir minhas necessidades...')}>
              <span className="blob1" aria-hidden />
              <span className="inner flex items-center gap-2 text-white">
                Agendar Consultoria Gratuita
                <Image
                  src="/right-up1.png"
                  alt="arrow"
                  width={80}
                  height={80}
                  className="w-4 h-4"
                />
              </span>
            </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
