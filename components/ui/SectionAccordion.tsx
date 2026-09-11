"use client";
import { useState, useRef, useEffect } from "react";

interface SectionAccordionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  accentColor?: string;
  children: React.ReactNode;
}

export default function SectionAccordion({ title, count, defaultOpen = true, accentColor = "#C0392B", children }: SectionAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open, children]);

  return (
    <div style={{ borderBottom: "1px solid #E4E2DC" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "14px 16px",
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
      <div
        style={{
          height: height !== undefined ? `${height}px` : "auto",
          overflow: "hidden",
          transition: "height 200ms ease",
        }}
      >
        <div ref={contentRef} style={{ padding: "0 16px 16px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
