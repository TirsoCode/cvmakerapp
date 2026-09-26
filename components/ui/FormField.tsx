"use client";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "url" | "textarea";
  hint?: string;
}

export default function FormField({ label, value, onChange, placeholder, type = "text", hint }: FormFieldProps) {
  const isTextarea = type === "textarea";

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-instrument), sans-serif" }}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{
            width: "100%",
            padding: "11px 13px",
            fontSize: 13,
            fontFamily: "var(--font-instrument), sans-serif",
            color: "#1A1918",
            background: "rgba(248, 248, 252, 0.88)",
            border: "1px solid rgba(25, 25, 55, 0.1)",
            borderRadius: 10,
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
            lineHeight: 1.55,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#6B63D8"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91, 83, 201, 0.1)"; e.currentTarget.style.background = "#FFFFFF"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(25, 25, 55, 0.1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(248, 248, 252, 0.88)"; }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "11px 13px",
            fontSize: 13,
            fontFamily: "var(--font-instrument), sans-serif",
            color: "#1A1918",
            background: "rgba(248, 248, 252, 0.88)",
            border: "1px solid rgba(25, 25, 55, 0.1)",
            borderRadius: 10,
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#6B63D8"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91, 83, 201, 0.1)"; e.currentTarget.style.background = "#FFFFFF"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(25, 25, 55, 0.1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(248, 248, 252, 0.88)"; }}
        />
      )}
      {hint && <p style={{ fontSize: 10, color: "#9C9890", margin: "4px 0 0", fontFamily: "var(--font-instrument), sans-serif" }}>{hint}</p>}
    </div>
  );
}
