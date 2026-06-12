"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, // Auto requestAnimationFrame in Lenis 1.1+
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
