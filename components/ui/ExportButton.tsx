"use client";
import { useState, useRef } from "react";

interface Props {
  onExport: () => Promise<void>;
}

export default function ExportButton({ onExport }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("loading");
    try {
      await onExport();
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    } catch (e) {
      console.error("Export failed:", e);
      setState("idle");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={state !== "idle"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 20px",
        background: state === "success" ? "#16A34A" : "#1A1918",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "var(--font-instrument), sans-serif",
        cursor: state === "idle" ? "pointer" : "not-allowed",
        opacity: state === "loading" ? 0.7 : 1,
        transition: "all 200ms ease",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {state === "loading" ? (
        <>
          <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
          Generando PDF…
        </>
      ) : state === "success" ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20,6 9,17 4,12" />
          </svg>
          ¡Descargado!
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Exportar PDF
        </>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
