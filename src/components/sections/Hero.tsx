"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import siteConfig from "@/lib/config";
import { PLACEHOLDERS } from "@/lib/placeholders";

export default function Hero() {
  const heroSection = siteConfig.pages.landing.sections.find((s) => s.type === "hero");
  if (!heroSection) return null;

  const bgImageSrc = "/assets/hero.png";
  const bgMobileImageSrc = "/assets/hero-cerlular.png";

  return (
    <section id="hero" className="relative w-full min-h-[85vh] flex items-center justify-center bg-bg-primary overflow-hidden py-20 lg:py-32">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image */}
        <Image
          src={bgImageSrc}
          alt="Racing Cars Hero Background"
          fill
          sizes="100vw"
          priority
          className="hidden md:block object-cover opacity-85 scale-105 contrast-[1.05] brightness-100"
        />
        {/* Mobile Image */}
        <Image
          src={bgMobileImageSrc}
          alt="Racing Cars Hero Background Mobile"
          fill
          sizes="100vw"
          priority
          className="block md:hidden object-cover opacity-85 scale-100 contrast-[1.05] brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-bg-primary/25"></div>
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary font-heading leading-tight max-w-4xl uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroSection.headline}
        </motion.h1>

        {/* Subheadline (Punctuation Normalized: no trailing dot to keep layout clean) */}
        {heroSection.subheadline && (
          <motion.p
            className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroSection.subheadline.trim().endsWith(".") 
              ? heroSection.subheadline.trim().slice(0, -1) 
              : heroSection.subheadline}
          </motion.p>
        )}

        {/* Experience & Multibrand Badges (High Contrast, Centered, with Brand Icons) */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3.5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="px-5 py-2.5 bg-bg-secondary/90 border border-border/80 rounded-full text-xs sm:text-sm font-bold text-text-primary tracking-wider uppercase backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/30">
            <span>25 años de experiencia</span>
          </div>
          <div className="px-5 py-2.5 bg-bg-secondary/90 border border-border/80 rounded-full text-xs sm:text-sm font-bold text-text-primary tracking-wider uppercase backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/30">
            <span>Trabajamos con multimarcas</span>
          </div>
        </motion.div>

        {/* CTAs (Perfectly Aligned horizontally and vertically) */}
        {heroSection.ctas && (
          <motion.div
            className="mt-10 flex flex-wrap justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {heroSection.ctas.map((cta, i) => {
              const isPrimary = cta.variant === "primary";
              return (
                <Link
                  key={i}
                  href={cta.href}
                  className={`px-8 text-base font-bold rounded-md font-heading tracking-wider transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2 h-[54px] min-w-[190px] ${isPrimary
                    ? "bg-primary text-bg-primary hover:bg-primary-dark hover:shadow-primary/20 hover:-translate-y-0.5"
                    : "bg-bg-secondary border border-border text-text-primary hover:bg-border/20 hover:-translate-y-0.5"
                    }`}
                >
                  {cta.text}
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
