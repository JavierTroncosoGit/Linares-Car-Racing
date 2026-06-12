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
    <section id="stats" className="w-full bg-bg-secondary border-y border-border/50 py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || CheckCircle;
            
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-4 first:pt-0 md:first:pt-4 md:pt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-3 bg-bg-primary border border-border/50 rounded-lg text-primary mb-4 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black font-heading text-text-primary tracking-tight">
                  {item.value}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-[180px]">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
