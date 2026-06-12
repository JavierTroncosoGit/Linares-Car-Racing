"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import siteConfig from "@/lib/config";

export default function WhatsAppButton() {
  const whatsapp = siteConfig.contact.whatsapp[0];
  if (!whatsapp) return null;

  const url = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-6 right-6 p-4 rounded-full bg-emerald-500 text-neutral-900 shadow-xl flex items-center justify-center cursor-pointer hover:bg-emerald-400 transition-colors"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))"
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1.5 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-neutral-900 stroke-none" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
    </motion.a>
  );
}
