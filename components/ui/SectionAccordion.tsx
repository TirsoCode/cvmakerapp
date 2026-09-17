"use client";
import { useState } from "react";

interface SectionAccordionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  accentColor?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function SectionAccordion({ title, count, defaultOpen = true, accentColor = "#C0392B", style, children }: SectionAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ borderBottom: "1px solid #E4E2DC", ...style }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "8px 10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left" as const,
          gap: 10,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1918", flex: 1 }}>{title}</span>
        {count !== undefined && count > 0 && (
          <span style={{ fontSize: 10, fontWeight: 600, color: accentColor, background: `${accentColor}15`, padding: "2px 8px", borderRadius: 999, fontFamily: "var(--font-instrument), sans-serif" }}>
            {count}
          </span>
        )}
      </button>
      <div style={{ display: open ? "block" : "none", padding: "0 8px 8px" }}>
        {children}
      </div>
    </div>
  );
}
