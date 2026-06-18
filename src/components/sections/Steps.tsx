"use client";

import { motion } from "framer-motion";
import { ClipboardList, Wrench, Car, LucideIcon } from "lucide-react";
import siteConfig from "@/lib/config";

const stepIcons: LucideIcon[] = [
  ClipboardList,
  Wrench,
  Car,
];

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
        <div className="text-center max-w-3xl mx-auto mb-20">
          {stepsSection.sectionLabel && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/20 pb-1">
              {stepsSection.sectionLabel}
            </span>
          )}
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
            {stepsSection.headline}
          </h2>
          <p className="text-text-secondary mt-4 text-sm sm:text-base font-light">
            {stepsSection.subheadline || "Agenda, confirma y recibe atención técnica sin complicaciones."}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-12">
          {/* Connector Line in desktop */}
          <div className="hidden md:block absolute top-0 left-[15%] right-[15%] h-[3px] bg-primary shadow-[0_0_15px_rgba(232,168,36,0.6)] -z-10"></div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stepsSection.steps.map((step, idx) => {
              const Icon = stepIcons[idx] || ClipboardList;
              
              return (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center text-center group border border-border/60 bg-bg-secondary p-8 rounded-2xl relative transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(232,168,36,0.08)]"
                  variants={cardVariants}
                >
                  {/* Floating Step Number */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary border-4 border-bg-primary text-bg-primary font-black font-heading text-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 shadow-primary/20">
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div className="mt-4 p-4 rounded-xl bg-bg-primary border border-border text-primary mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-bg-primary group-hover:shadow-[0_0_20px_rgba(232,168,36,0.3)] group-hover:border-primary">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold font-heading text-xl text-text-primary uppercase tracking-wide transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>

                  {/* Body Text */}
                  <p className="text-sm text-text-secondary mt-3 font-light leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
