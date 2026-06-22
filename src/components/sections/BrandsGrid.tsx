"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import siteConfig from "@/lib/config";
import { BrandItem } from "@/types/config";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function BrandsGrid() {
  const brandsSection = siteConfig.pages.landing.sections.find((s) => s.type === "brands-grid");
  if (!brandsSection || !brandsSection.items) return null;

  const items = brandsSection.items as BrandItem[];

  // Split items for the double marquee on mobile
  const half = Math.ceil(items.length / 2);
  const row1Items = items.slice(0, half);
  const row2Items = items.slice(half);

  return (
    <section id="marcas" className="w-full bg-bg-secondary py-16 lg:py-24 border-b border-border/50 overflow-hidden">
      {/* SVG Clip Path definition to crop checkered background */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="hex-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.06 C 0.53 0.06, 0.85 0.25, 0.87 0.28 C 0.89 0.31, 0.89 0.69, 0.87 0.72 C 0.85 0.75, 0.53 0.94, 0.5 0.94 C 0.47 0.94, 0.15 0.75, 0.13 0.72 C 0.11 0.69, 0.11 0.31, 0.13 0.28 C 0.15 0.25, 0.47 0.06, 0.5 0.06 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {brandsSection.sectionLabel && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/20 pb-1">
              {brandsSection.sectionLabel}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
            {brandsSection.headline}
          </h2>
        </div>

        {/* Unified View: Responsive Infinite Marquee for all screen sizes */}
        <div className="flex flex-col gap-6 lg:gap-8 overflow-hidden w-full py-2">
          {/* Row 1: Left scrolling */}
          <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {row1Items.map((brand, idx) => (
              <div key={`r1-${idx}`} className="w-[100px] md:w-[140px] h-[84px] md:h-[110px] px-2 md:px-3 flex-shrink-0 flex items-center justify-center relative group cursor-pointer">
                {/* Radial glow background on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,168,36,0.12)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Shadow & Scale Wrapper */}
                <div className="filter drop-shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_8px_20px_rgba(232,168,36,0.25)] group-hover:scale-108">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={110}
                    height={110}
                    className="object-contain w-[84px] h-[84px] md:w-[110px] md:h-[110px]"
                    style={{ clipPath: "url(#hex-clip)" }}
                    priority={idx < 6}
                  />
                </div>
              </div>
            ))}
            {/* Duplicate for seamless scrolling */}
            {row1Items.map((brand, idx) => (
              <div key={`r1-dup-${idx}`} className="w-[100px] md:w-[140px] h-[84px] md:h-[110px] px-2 md:px-3 flex-shrink-0 flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,168,36,0.12)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="filter drop-shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_8px_20px_rgba(232,168,36,0.25)] group-hover:scale-108">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={110}
                    height={110}
                    className="object-contain w-[84px] h-[84px] md:w-[110px] md:h-[110px]"
                    style={{ clipPath: "url(#hex-clip)" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Right scrolling */}
          <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {row2Items.map((brand, idx) => (
              <div key={`r2-${idx}`} className="w-[100px] md:w-[140px] h-[84px] md:h-[110px] px-2 md:px-3 flex-shrink-0 flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,168,36,0.12)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="filter drop-shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_8px_20px_rgba(232,168,36,0.25)] group-hover:scale-108">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={110}
                    height={110}
                    className="object-contain w-[84px] h-[84px] md:w-[110px] md:h-[110px]"
                    style={{ clipPath: "url(#hex-clip)" }}
                  />
                </div>
              </div>
            ))}
            {/* Duplicate for seamless scrolling */}
            {row2Items.map((brand, idx) => (
              <div key={`r2-dup-${idx}`} className="w-[100px] md:w-[140px] h-[84px] md:h-[110px] px-2 md:px-3 flex-shrink-0 flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,168,36,0.12)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="filter drop-shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_8px_20px_rgba(232,168,36,0.25)] group-hover:scale-108">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={110}
                    height={110}
                    className="object-contain w-[84px] h-[84px] md:w-[110px] md:h-[110px]"
                    style={{ clipPath: "url(#hex-clip)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
