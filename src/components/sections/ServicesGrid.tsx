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
  Search,
  MessageSquare,
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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3 } },
};

export default function ServicesGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const servicesSection = siteConfig.pages.landing.sections.find((s) => s.type === "services-grid");

  if (!servicesSection || !servicesSection.categories) return null;

  const query = searchQuery.toLowerCase().trim();

  // Filter categories and services based on query
  const filteredCategories = servicesSection.categories
    .map((cat) => {
      const matchesCategory = cat.name.toLowerCase().includes(query);
      const filteredServices = cat.services.filter((srv) => {
        return (
          matchesCategory ||
          srv.name.toLowerCase().includes(query) ||
          srv.description.toLowerCase().includes(query)
        );
      });

      return {
        ...cat,
        services: filteredServices,
      };
    })
    .filter((cat) => cat.services.length > 0);

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-primary/20 text-primary font-bold px-0.5 rounded select-all">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <section id="servicios" className="w-full bg-bg-primary py-20 lg:py-28 border-b border-border/50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Search input bar */}
        <div className="max-w-md mx-auto mb-16 relative group px-1">
          <input
            type="text"
            placeholder="¿Qué servicio o repuesto buscas? (Ej: Escáner, Pastillas, Bujías...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-secondary border border-border p-4 pl-12 pr-16 rounded-xl text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 shadow-md text-base"
          />
          <Search className="w-5 h-5 text-text-secondary absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-text-secondary hover:text-primary absolute right-5 top-1/2 -translate-y-1/2 font-bold font-heading uppercase cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCategories.length === 0 ? (
            <motion.div
              key="no-results"
              className="border border-dashed border-border p-12 text-center rounded-xl max-w-xl mx-auto space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h3 className="font-extrabold text-text-primary text-lg font-heading uppercase tracking-wide">
                No encontramos servicios para tu búsqueda
              </h3>
              <p className="text-sm text-text-secondary font-light max-w-sm mx-auto">
                ¿Buscas algo específico o una cotización a medida? Escríbenos directamente o visítanos en Linares.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/56949340772?text=${encodeURIComponent(`Hola Racing Cars, no encontré el servicio "${searchQuery}" en la web. ¿Me podrían dar información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-primary text-bg-primary font-bold rounded hover:bg-primary-dark transition-colors font-heading tracking-wide flex items-center gap-2 cursor-pointer text-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  Consultar WhatsApp
                </a>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-5 py-2.5 border border-border text-text-primary font-bold rounded hover:bg-border/20 transition-colors font-heading tracking-wide text-xs cursor-pointer"
                >
                  Ver todos los servicios
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="services-list"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              layout
            >
              {filteredCategories.map((cat, idx) => {
                const Icon = iconMap[cat.icon] || Wrench;
                
                return (
                  <motion.div
                    key={cat.name}
                    className="border border-border bg-bg-secondary p-6 rounded-xl flex flex-col justify-between hover:shadow-xl hover:border-primary/50 transition-all duration-300 layout"
                    variants={cardVariants}
                    layout
                  >
                    <div>
                      <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-4">
                        <div className="p-2.5 bg-bg-primary border border-border rounded-lg text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-extrabold font-heading text-lg text-text-primary uppercase tracking-wide">
                          {highlightText(cat.name, searchQuery)}
                        </h3>
                      </div>

                      <ul className="space-y-4">
                        {cat.services.map((srv, srvIdx) => (
                          <li key={srvIdx} className="group flex justify-between items-start gap-4 border-b border-border/10 pb-3 last:border-b-0 last:pb-0">
                            <div className="flex flex-col">
                              <span className="font-bold text-text-primary text-sm group-hover:text-primary transition-colors">
                                {highlightText(srv.name, searchQuery)}
                              </span>
                              <span className="text-xs text-text-secondary mt-0.5 font-light leading-relaxed">
                                {highlightText(srv.description, searchQuery)}
                              </span>
                            </div>
                            <a
                              href={`https://wa.me/56949340772?text=${encodeURIComponent(`Hola Racing Cars, me gustaría cotizar el servicio: ${srv.name}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-primary hover:underline font-bold font-heading uppercase tracking-wider whitespace-nowrap self-center cursor-pointer flex items-center gap-0.5 border border-primary/20 bg-primary/5 px-2 py-1 rounded hover:bg-primary hover:text-bg-primary transition-all duration-300"
                            >
                              Cotizar
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
