"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, 
  Cpu, 
  Cog, 
  Disc, 
  ArrowUpDown, 
  Filter, 
  Lightbulb,
  ChevronDown,
  LucideIcon 
} from "lucide-react";
import siteConfig from "@/lib/config";

const iconMap: Record<string, LucideIcon> = {
  wrench: Wrench,
  "scan-line": Cpu,
  cog: Cog,
  disc: Disc,
  "move-vertical": ArrowUpDown,
  filter: Filter,
  lightbulb: Lightbulb,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.98, y: -10, transition: { duration: 0.2 } },
};

export default function ServicesGrid() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [openSubcategories, setOpenSubcategories] = useState<string[]>([]);
  const servicesSection = siteConfig.pages.landing.sections.find((s) => s.type === "services-grid");

  if (!servicesSection || !servicesSection.categories) return null;

  const toggleCategory = (catName: string) => {
    setOpenCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((name) => name !== catName)
        : [...prev, catName]
    );
  };

  const toggleSubcategory = (subcatName: string) => {
    setOpenSubcategories((prev) =>
      prev.includes(subcatName)
        ? prev.filter((name) => name !== subcatName)
        : [...prev, subcatName]
    );
  };

  return (
    <section id="servicios" className="w-full bg-bg-primary py-20 lg:py-28 border-b border-border/50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {servicesSection.sectionLabel && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/20 pb-1">
              {servicesSection.sectionLabel}
            </span>
          )}
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
            {servicesSection.headline}
          </h2>
          {servicesSection.subheadline && (
            <p className="text-text-secondary mt-4 text-sm sm:text-base font-light">
              {servicesSection.subheadline}
            </p>
          )}
        </div>

        {/* Categories Accordion Container */}
        <motion.div 
          className="space-y-4 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          layout
        >
          {servicesSection.categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Wrench;
            const isOpen = openCategories.includes(cat.name);
            const totalServices = cat.subcategories.reduce(
              (acc, sub) => acc + sub.services.length,
              0
            );
            
            return (
              <motion.div
                key={cat.name}
                className="border border-border/80 bg-bg-secondary rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/45 shadow-sm"
                variants={cardVariants}
                layout
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-bg-primary/30 focus:outline-none select-none cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                      isOpen 
                        ? "bg-primary border-primary text-bg-primary shadow-[0_0_15px_rgba(232,168,36,0.35)]" 
                        : "bg-bg-primary border-border text-primary"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold font-heading text-base sm:text-lg text-text-primary uppercase tracking-wide">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-text-secondary font-light mt-0.5">
                        {totalServices} {totalServices === 1 ? "servicio disponible" : "servicios disponibles"}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`p-1.5 rounded-full border text-text-secondary transition-transform duration-300 ${
                    isOpen 
                      ? "rotate-180 text-primary border-primary/30 bg-primary/5" 
                      : "border-border/80"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 border-t border-border/40 bg-bg-primary/20 space-y-4">
                        {cat.subcategories.map((subcat) => {
                          const SubIcon = iconMap[subcat.icon] || Wrench;
                          const isSubOpen = openSubcategories.includes(subcat.name);
                          
                          return (
                            <div 
                              key={subcat.name} 
                              className="border border-border/40 bg-bg-secondary/40 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/20"
                            >
                              {/* Subcategory Accordion Header */}
                              <button
                                onClick={() => toggleSubcategory(subcat.name)}
                                className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-bg-primary/20 focus:outline-none select-none cursor-pointer"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-md border transition-all duration-300 ${
                                    isSubOpen 
                                      ? "bg-primary/10 border-primary/30 text-primary" 
                                      : "bg-bg-primary border-border/50 text-text-secondary"
                                  }`}>
                                    <SubIcon className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <h4 className="font-extrabold font-heading text-sm text-text-primary uppercase tracking-wide">
                                      {subcat.name}
                                    </h4>
                                    <p className="text-[10px] text-text-secondary font-light mt-0.5">
                                      {subcat.services.length} {subcat.services.length === 1 ? "servicio disponible" : "servicios disponibles"}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className={`p-1 rounded-full border text-text-secondary transition-transform duration-200 ${
                                  isSubOpen 
                                    ? "rotate-180 text-primary border-primary/20 bg-primary/5" 
                                    : "border-border/60"
                                }`}>
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </div>
                              </button>

                              {/* Subcategory Accordion Content */}
                              <AnimatePresence initial={false}>
                                {isSubOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-4 border-t border-border/30 bg-bg-primary/40">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {subcat.services.map((srv, srvIdx) => (
                                          <div 
                                            key={srvIdx} 
                                            className="group flex justify-between items-start gap-4 p-4 border border-border/20 rounded-lg bg-bg-secondary hover:border-primary/20 hover:bg-bg-secondary/80 transition-all duration-300"
                                          >
                                            <div className="flex flex-col flex-1">
                                              <span className="font-bold text-text-primary text-sm sm:text-base group-hover:text-primary transition-colors">
                                                {srv.name}
                                              </span>
                                              <span className="text-xs text-text-secondary mt-1 font-light leading-relaxed">
                                                {srv.description}
                                              </span>
                                            </div>
                                            <a
                                              href={`https://wa.me/56949340772?text=${encodeURIComponent(`Hola Racing Cars, me gustaría cotizar el servicio: ${srv.name}.`)}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-[10px] text-primary hover:underline font-bold font-heading uppercase tracking-wider whitespace-nowrap self-center cursor-pointer flex items-center gap-0.5 border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-md hover:bg-primary hover:text-bg-primary hover:scale-105 transition-all duration-300"
                                            >
                                              Cotizar
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
