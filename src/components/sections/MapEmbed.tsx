"use client";

import { motion } from "framer-motion";
import siteConfig from "@/lib/config";

export default function MapEmbed() {
  const mapSection = siteConfig.pages.landing.sections.find((s) => s.type === "map-embed");
  if (!mapSection || !mapSection.googleMapsEmbedUrl) return null;

  return (
    <section id="ubicacion" className="w-full bg-bg-secondary py-20 lg:py-28 border-b border-border/50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {mapSection.sectionLabel && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/20 pb-1">
              {mapSection.sectionLabel}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
            {mapSection.headline}
          </h2>
          {mapSection.address && (
            <p className="text-text-secondary mt-3 text-sm font-light">
              📍 {mapSection.address}
            </p>
          )}
        </div>

        {/* Map iframe container */}
        <motion.div
          className="w-full rounded-2xl overflow-hidden border border-border shadow-xl h-[400px] relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
        >
          <iframe
            src={mapSection.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Racing Cars en Google Maps"
            className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-500"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
