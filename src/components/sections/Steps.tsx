"use client";

import { motion } from "framer-motion";
import siteConfig from "@/lib/config";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Steps() {
  const stepsSection = siteConfig.pages.landing.sections.find((s) => s.type === "steps");
  if (!stepsSection || !stepsSection.steps) return null;

  return (
    <section id="proceso" className="w-full bg-bg-primary py-20 lg:py-28 border-b border-border/50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {stepsSection.sectionLabel && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/20 pb-1">
              {stepsSection.sectionLabel}
            </span>
          )}
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
            {stepsSection.headline}
          </h2>
          {stepsSection.subheadline && (
            <p className="text-text-secondary mt-4 text-sm sm:text-base font-light">
              {stepsSection.subheadline}
            </p>
          )}
        </div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connector Line in desktop */}
          <div className="hidden md:block absolute top-[44px] left-8 right-8 h-[2px] bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 -z-10"></div>
          
          {stepsSection.steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center group"
              variants={cardVariants}
            >
              {/* Step number badge */}
              <div className="w-16 h-16 rounded-full bg-bg-secondary border-2 border-border text-primary font-black font-heading text-xl flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300 shadow-md">
                {step.number}
              </div>
              <h3 className="font-extrabold font-heading text-lg text-text-primary mt-6 uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary mt-3 font-light leading-relaxed max-w-xs">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
