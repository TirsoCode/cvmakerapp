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
        <>Generando PDF…</>
      ) : state === "success" ? (
        <>¡Descargado!</>
      ) : (
        <>Exportar PDF</>
      )}
    </button>
  );
}
