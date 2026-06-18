"use client";

import { motion } from "framer-motion";
import { Wrench, Trophy, Shield, CheckCircle, LucideIcon } from "lucide-react";
import siteConfig from "@/lib/config";
import { StatItem } from "@/types/config";

const iconMap: Record<string, LucideIcon> = {
  wrench: Wrench,
  trophy: Trophy,
  shield: Shield,
  "check-circle": CheckCircle,
};

export default function Stats() {
  const statsSection = siteConfig.pages.landing.sections.find((s) => s.type === "stats");
  if (!statsSection || !statsSection.items) return null;

  const items = statsSection.items as StatItem[];

  return (
    <section id="stats" className="w-full bg-bg-secondary border-y border-border/40 py-6 sm:py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || CheckCircle;
            
            return (
              <motion.div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-2 rounded-xl hover:bg-bg-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="p-2 sm:p-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary/5">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex flex-col text-left justify-center min-w-0">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-text-primary tracking-tight leading-none uppercase">
                    {item.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-text-secondary mt-1 font-medium leading-tight max-w-[150px] line-clamp-3">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
