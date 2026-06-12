"use client";

import { useToastStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Info, AlertTriangle } from "lucide-react";

export default function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let borderClass = "border-primary/40";
          let iconColor = "text-primary";

          if (toast.type === "success") {
            Icon = CheckCircle;
            borderClass = "border-success/40";
            iconColor = "text-success";
          } else if (toast.type === "warning") {
            Icon = AlertTriangle;
            borderClass = "border-danger/40";
            iconColor = "text-danger";
          }

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`pointer-events-auto w-full flex items-center justify-between gap-3 p-4 bg-bg-secondary/90 border ${borderClass} backdrop-blur-md rounded-xl shadow-xl`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                <p className="text-xs font-heading font-medium tracking-wide uppercase text-text-primary">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1.5 text-text-secondary hover:text-text-primary rounded-full hover:bg-border/20 transition-all cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                aria-label="Cerrar notificación"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
