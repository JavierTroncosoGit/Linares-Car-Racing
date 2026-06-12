"use client";

import { motion } from "framer-motion";
import siteConfig from "@/lib/config";
import { FaqItem } from "@/types/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const faqSection = siteConfig.pages.landing.sections.find((s) => s.type === "faq");
  if (!faqSection || !faqSection.items) return null;

  const items = faqSection.items as FaqItem[];

  return (
    <section id="faq" className="w-full bg-bg-primary py-20 lg:py-28 border-b border-border/50">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {faqSection.sectionLabel && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/20 pb-1">
              {faqSection.sectionLabel}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
            {faqSection.headline}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Accordion className="w-full space-y-4">
            {items.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-border bg-bg-secondary/40 px-6 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="text-left font-extrabold text-sm sm:text-base font-heading text-text-primary hover:text-primary hover:no-underline py-4 uppercase tracking-wide">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-text-secondary pb-4 leading-relaxed font-light">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
