"use client";
import { type TemplateId, TEMPLATES } from "@/lib/types";

interface Props {
  selected: TemplateId;
  onChange: (t: TemplateId) => void;
}

export default function TemplateSelector({ selected, onChange }: Props) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Instrument Sans', sans-serif" }}>
        Plantilla
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              padding: 0,
              border: selected === t.id ? `2px solid ${t.accent}` : "2px solid #E4E2DC",
              borderRadius: 10,
              background: "#fff",
              cursor: "pointer",
              overflow: "hidden",
              textAlign: "left" as const,
              boxShadow: selected === t.id ? `0 0 0 3px ${t.accent}20` : "none",
              transition: "all 150ms ease",
            }}
          >
            {/* Mini preview */}
            <div style={{ height: 80, background: "#FAFAF8", position: "relative", overflow: "hidden" }}>
              <TemplatePreview id={t.id} accent={t.accent} />
            </div>
            <div style={{ padding: "8px 10px", background: selected === t.id ? `${t.accent}10` : "#fff" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#1A1918", margin: 0, fontFamily: "'Instrument Sans', sans-serif" }}>
                {t.name}
              </p>
              <p style={{ fontSize: 9, color: "#9C9890", margin: "2px 0 0", fontFamily: "'Instrument Sans', sans-serif" }}>
                {t.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TemplatePreview({ id, accent }: { id: TemplateId; accent: string }) {
  if (id === "minimal") {
    return (
      <div style={{ padding: "10px 12px", height: "100%" }}>
        <div style={{ width: "60%", height: 5, background: "#1A1918", borderRadius: 2, marginBottom: 5 }} />
        <div style={{ width: "40%", height: 3, background: accent, borderRadius: 2, marginBottom: 8 }} />
        <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 3 }} />
        <div style={{ width: "85%", height: 2, background: "#E4E2DC", marginBottom: 3 }} />
        <div style={{ width: "70%", height: 2, background: "#E4E2DC" }} />
      </div>
    );
  }
  if (id === "editorial") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "35% 1fr", height: "100%" }}>
        <div style={{ background: "#1A1918", padding: "10px 8px" }}>
          <div style={{ width: "80%", height: 3, background: "#F3F2EE", borderRadius: 2, marginBottom: 4 }} />
          <div style={{ width: "60%", height: 2, background: "#6B6860", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ width: "70%", height: 2, background: "#6B6860", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ width: "50%", height: 2, background: "#6B6860", borderRadius: 2 }} />
        </div>
        <div style={{ padding: "10px 10px" }}>
          <div style={{ width: "90%", height: 3, background: accent, borderRadius: 2, marginBottom: 6 }} />
          <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
          <div style={{ width: "80%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
          <div style={{ width: "90%", height: 2, background: "#E4E2DC" }} />
        </div>
      </div>
    );
  }
  if (id === "modern") {
    return (
      <div style={{ height: "100%" }}>
        <div style={{ background: "#1A1918", padding: "8px 10px" }}>
          <div style={{ width: "55%", height: 5, background: "#fff", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ width: "35%", height: 2, background: accent, borderRadius: 2 }} />
        </div>
        <div style={{ padding: "8px 10px" }}>
          <div style={{ width: "90%", height: 2, background: accent, borderRadius: 2, marginBottom: 5 }} />
          <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
          <div style={{ width: "75%", height: 2, background: "#E4E2DC" }} />
        </div>
      </div>
    );
  }
  // classic
  return (
    <div style={{ padding: "10px 12px", height: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div style={{ width: "70%", height: 4, background: "#1A1918", borderRadius: 2, margin: "0 auto 3px" }} />
        <div style={{ width: "40%", height: 2, background: accent, borderRadius: 2, margin: "0 auto" }} />
      </div>
      <div style={{ width: "100%", height: 1, background: "#E4E2DC", marginBottom: 4 }} />
      <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
      <div style={{ width: "80%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
      <div style={{ width: "90%", height: 2, background: "#E4E2DC" }} />
    </div>
  );
}
