"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-1 text-[11px] text-text-secondary hover:text-primary transition-colors focus:outline-none ml-2 p-1 hover:bg-border/30 rounded cursor-pointer select-none"
      title={`Copiar ${label || "texto"}`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-success animate-scale-up" />
          <span className="text-[10px] text-success font-medium">¡Copiado!</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
        </>
      )}
    </button>
  );
}
