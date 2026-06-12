"use client";

import { motion } from "framer-motion";
import siteConfig from "@/lib/config";

export default function CtaBanner() {
  const ctaSection = siteConfig.pages.landing.sections.find((s) => s.type === "cta-banner");
  if (!ctaSection) return null;

  return (
    <section className="w-full bg-bg-secondary py-16 lg:py-24 relative overflow-hidden border-b border-border/50">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="border border-primary/30 bg-gradient-to-br from-bg-secondary to-bg-secondary/70 p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-text-primary uppercase tracking-tight leading-tight">
              {ctaSection.headline}
            </h2>
            {ctaSection.subheadline && (
              <p className="text-text-secondary mt-3 text-sm sm:text-base font-light">
                {ctaSection.subheadline}
              </p>
            )}
          </div>

          {ctaSection.cta && (
            <a
              href={ctaSection.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary text-bg-primary font-extrabold font-heading text-base tracking-wider rounded-md hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 cursor-pointer text-center w-full md:w-auto"
            >
              {ctaSection.cta.text.toUpperCase()}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
