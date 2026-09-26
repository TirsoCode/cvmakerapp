"use client";
import { useState } from "react";

interface SectionAccordionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  accentColor?: string;
  style?: React.CSSProperties;
  sectionId?: string;
  active?: boolean;
  children: React.ReactNode;
}

export default function SectionAccordion({ title, count, defaultOpen = true, accentColor = "#6659D8", style, sectionId, active = false, children }: SectionAccordionProps) {
  return (
    <div
      id={sectionId}
      style={{
        borderBottom: "1px solid rgba(25, 25, 55, 0.07)",
        scrollMarginTop: 70,
        background: active ? "rgba(238, 237, 255, 0.58)" : "transparent",
        transition: "background 200ms ease",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "10px 10px",
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
      </div>
      <div style={{ display: "block", padding: "0 6px 6px" }}>
        {children}
      </div>
    </div>
  );
}