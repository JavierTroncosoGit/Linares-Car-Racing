"use client";

import { motion } from "framer-motion";
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

  return (
    <section id="marcas" className="w-full bg-bg-secondary py-16 lg:py-24 border-b border-border/50">
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

        {/* Brands Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((brand, idx) => (
            <motion.div
              key={idx}
              className="border border-border/50 bg-bg-primary/50 p-6 rounded-xl flex flex-col items-center justify-center text-center h-28 hover:border-primary/50 hover:bg-bg-primary hover:shadow-lg transition-all duration-300 relative overflow-hidden group cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              {/* Glossy overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* High-quality typography styled brand name since logo image files are mock/placeholders */}
              <span className="font-heading font-black text-xl sm:text-2xl tracking-wider text-text-primary group-hover:text-primary transition-colors uppercase italic">
                {brand.name}
              </span>
              
              {brand.note && (
                <span className="text-[9px] uppercase font-bold tracking-widest text-text-secondary mt-1.5 opacity-80 group-hover:opacity-100 group-hover:text-text-primary transition-all duration-300">
                  {brand.note}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
