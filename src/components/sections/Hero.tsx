"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import siteConfig from "@/lib/config";
import { PLACEHOLDERS } from "@/lib/placeholders";

export default function Hero() {
  const heroSection = siteConfig.pages.landing.sections.find((s) => s.type === "hero");
  if (!heroSection) return null;

  const bgImage = PLACEHOLDERS.heroMain;
  const logoImage = PLACEHOLDERS.logo;

  return (
    <section id="hero" className="relative w-full min-h-[85vh] flex items-center justify-center bg-bg-primary overflow-hidden py-20 lg:py-32">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage.src || bgImage.fallback}
          alt={bgImage.alt}
          fill
          priority
          className="object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent"></div>
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        {heroSection.badge && (
          <motion.span
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full font-heading mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {heroSection.badge}
          </motion.span>
        )}

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary font-heading leading-tight max-w-4xl uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroSection.headline}
        </motion.h1>

        {/* Subheadline */}
        {heroSection.subheadline && (
          <motion.p
            className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroSection.subheadline}
          </motion.p>
        )}

        {/* Logo and Partner Badge */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-2 border border-border/50 bg-bg-secondary/40 backdrop-blur-sm px-6 py-4 rounded-xl max-w-md w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-40 h-16">
            <Image
              src={logoImage.src}
              alt={logoImage.alt}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-heading border-t border-border/50 pt-2 w-full">
            Distribuidor Exclusivo EMASA Región del Maule
          </span>
        </motion.div>

        {/* CTAs */}
        {heroSection.ctas && (
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
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
                  className={`px-8 py-4 text-base font-bold rounded-md font-heading tracking-wider transition-all duration-300 shadow-lg cursor-pointer flex items-center gap-2 ${
                    isPrimary
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
