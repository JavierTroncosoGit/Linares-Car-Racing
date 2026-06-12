"use client";

import { useEffect, useState } from "react";
import siteConfig from "@/lib/config";

export default function StatusBadge() {
  const [status, setStatus] = useState<{ isOpen: boolean; text: string } | null>(null);

  useEffect(() => {
    const schedule = siteConfig.contact.schedule;
    if (!schedule) return;

    const checkStatus = () => {
      try {
        const now = new Date();
        const chileTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Santiago" }));
        const day = chileTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const hours = chileTime.getHours();
        const minutes = chileTime.getMinutes();
        const currentTimeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        let todaySchedule = schedule.weekday;
        let nextOpenStr = "Lunes 09:00 am";

        if (day === 6) { // Sábado
          todaySchedule = schedule.saturday;
          nextOpenStr = "Lunes 09:00 am";
        } else if (day === 0) { // Domingo
          todaySchedule = schedule.sunday;
          nextOpenStr = "Lunes 09:00 am";
        } else if (day === 5) { // Viernes
          todaySchedule = schedule.weekday;
          nextOpenStr = "Sábado 10:00 am";
        } else { // Lunes-Jueves
          todaySchedule = schedule.weekday;
          nextOpenStr = "Mañana 09:00 am";
        }

        const { open, close } = todaySchedule;

        if (open === "00:00" && close === "00:00") {
          setStatus({ isOpen: false, text: `Cerrado — Abre ${nextOpenStr}` });
          return;
        }

        const isOpen = currentTimeStr >= open && currentTimeStr < close;

        if (isOpen) {
          setStatus({ isOpen: true, text: "Atendiendo ahora" });
        } else {
          // If we are closed but today's schedule opening hasn't happened yet
          if (currentTimeStr < open) {
            const openHour = parseInt(open.split(":")[0], 10);
            const openStr = openHour >= 12 ? `${openHour - 12 === 0 ? 12 : openHour - 12}:00 pm` : `${openHour}:00 am`;
            setStatus({ isOpen: false, text: `Cerrado — Abre hoy ${openStr}` });
          } else {
            setStatus({ isOpen: false, text: `Cerrado — Abre ${nextOpenStr}` });
          }
        }
      } catch (err) {
        console.error("Error evaluating schedule status:", err);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <div className="flex items-center gap-1.5 select-none">
      <span
        className={`w-2 h-2 rounded-full ${
          status.isOpen ? "bg-success animate-pulse" : "bg-danger"
        }`}
      />
      <span className={`text-[10px] font-bold tracking-wider uppercase font-heading ${
        status.isOpen ? "text-success" : "text-danger"
      }`}>
        {status.text}
      </span>
    </div>
  );
}
