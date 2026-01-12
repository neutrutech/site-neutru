import React from 'react';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
    title: 'Processos',
    description: 'Documentação do processo de desenvolvimento e decisões da NEUTRU — abordagens, ferramentas e progresso.',
    path: '/processos',
    image: '/og-processos.png',
    keywords: ['processos', 'documentação', 'desenvolvimento'],
});

export default function ProcessosPage() {
    return (
        <>
            <Nav />

            <main className="min-h-screen flex items-center justify-center bg-white text-[#0A0A0B]">
                <div className="max-w-3xl text-center px-6 py-24">
                    <h1 className="text-3xl md:text-4xl font-audiowide font-bold mb-4">Fique atento</h1>
                    <p className="text-lg text-[#555]">Vamos documentar todo o processo de desenvolvimento aqui. Em breve teremos atualizações com detalhes, decisões e progresso.</p>
                </div>
            </main>

            <Footer />
        </>
    );
}
