"use client";
import React from "react";
import { openEmail } from '../lib/utils';
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div
      className="flex flex-col overflow-hidden py-2 md:py-4 bg-center bg-cover bg-fixed"
      style={{ backgroundImage: "url('/s2f.png')", backgroundSize: "cover" }}
    >

      <ContainerScroll
        titleComponent={
          <>
             <p className="text-center text-[#00868C] text-lg font-bold mb-2">
            UNICIDADE
          </p>
            <h6 className="text-3xl font-normal text-white dark:text-white">
              Para Empresas ligadas ao modernismo <br />
              <span className="text-2xl md:text-[5rem] text-white dark:text-white font-bold mt-1 leading-none font-audiowide">
                   SOFTWARES ÚNICOS
              </span>
            </h6>
          </>
        }
      >
        <div className="max-w-6xl mx-auto w-full rounded-2xl overflow-hidden">
          <video
            src="/v001.mp4"
            height={720}
            width={1400}
            autoPlay
            loop
            muted
            className="w-full h-auto object-contain object-left-top"
            draggable={false}
          />
        </div>
      </ContainerScroll>

    <div className="mb-12 md:mb-32">
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 mt-4 md:-mt-16 max-w-6xl mx-auto px-4 w-full">
        <p className="text-white text-sm md:text-base leading-relaxed max-w-full md:max-w-sm text-center md:text-left">
          Cada projeto reflete nossa dedicação 
          <br/>
           em transformar ideias em soluções concretas
          <br/>
          e eficazes, com design moderno e um visual superior.
        </p>

        <div className="flex flex-col items-center gap-1 mt-4 md:mt-0">
          <p className="font-audiowide text-[#f1f1f1] text-xs md:text-sm">
            Projectos Entregues
          </p>
          <p className="font-audiowide text-[#00868C] text-2xl md:text-4xl font-bold">
            +100
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-6 md:-mt-20 px-4">
        <a href="/projects" className="button w-full md:w-auto px-4 py-3 max-w-md">
          <span className="blob1" aria-hidden />
          <span className="inner flex items-center justify-center gap-2">
            Ver mais projectos
            <Image
              src="/right-up1.png"
              alt="arrow"
              width={20}
              height={20}
              className="w-4 h-4"
            />
          </span>
        </a>
      </div>
    </div>
    </div>
  );
}

export default HeroScrollDemo;
