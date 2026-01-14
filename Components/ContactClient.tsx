"use client";

import React, { useState } from 'react';
import RotatingEarth from './World';
import Image from 'next/image';

export default function ContactClient() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) { setError('Por favor, preencha o campo de nome.'); return; }
        if (!form.email.trim()) { setError('Por favor, preencha o campo de email.'); return; }
        if (!form.message.trim()) { setError('Por favor, preencha o campo de mensagem.'); return; }

        const subject = encodeURIComponent(`Mensagem de ${form.name}`);
        const body = encodeURIComponent(`Nome: ${form.name}\nEmail: ${form.email}\n\nMensagem:\n${form.message}`);
        const mailtoLink = `mailto:neutru.tech@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    };

    return (
        <>
            <main className="min-h-screen bg-black">
                <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0 w-full h-full flex items-center justify-center">
                        <RotatingEarth className="w-[120%] h-[120%]" width={1000} height={800} />
                    </div>

                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="text-white">
                            <h1 className="text-3xl md:text-4xl font-audiowide font-normal mb-4">CONTACTE-NOS</h1>
                            <p className="text-[#B1B1B1] mb-6 font-semibold">Envie uma mensagem e entraremos em contacto<br/> assim que possível.</p>

                            <div className="space-y-4">
                                <div className="text-sm text-[#B1B1B1] font-semibold">Email: neutru.tech@gmail.com</div>
                                <div className="text-sm text-[#B1B1B1] font-semibold">Telefone: +244 928 051 534</div>
                                <div className="text-sm text-[#B1B1B1] font-semibold">Localização: Empresa Online</div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/5">
                            <label className="block mb-3">
                                <span className="text-sm text-white/80">Nome</span>
                                <input name="name" value={form.name} onChange={handleChange} className="mt-2 w-full rounded-md bg-black/50 border border-white/10 px-3 py-2 text-white outline-none" />
                            </label>

                            <label className="block mb-3">
                                <span className="text-sm text-white/80">Email</span>
                                <input name="email" value={form.email} onChange={handleChange} className="mt-2 w-full rounded-md bg-black/50 border border-white/10 px-3 py-2 text-white outline-none" />
                            </label>

                            <label className="block mb-4">
                                <span className="text-sm text-white/80">Mensagem</span>
                                <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="mt-2 w-full rounded-md bg-black/50 border border-white/10 px-3 py-2 text-white outline-none" />
                            </label>

                            {error && (
                                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-md">
                                    <p className="text-sm text-red-400">{error}</p>
                                </div>
                            )}

                            <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
                                <button type="submit" className="button px-4 py-2 text-sm md:px-6 md:py-3 md:text-base self-center inline-flex">
                                    <span className="blob1" aria-hidden />
                                    <span className="inner flex items-center gap-2">
                                        Enviar Mensagem
                                        <Image
                                            src="/right-up1.png"
                                            alt="arrow"
                                            width={80}
                                            height={80}
                                            className="w-4 h-4"
                                        />
                                    </span>
                                </button>
                                <div className="text-sm text-white/60 text-center">Resposta em até 48 horas</div>
                            </div>
                        </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
