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
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Instrument Sans', sans-serif" }}>
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
            padding: "10px 12px",
            fontSize: 13,
            fontFamily: "'Instrument Sans', sans-serif",
            color: "#1A1918",
            background: "#F3F2EE",
            border: "1px solid #E4E2DC",
            borderRadius: 8,
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
            lineHeight: 1.55,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#C0392B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(192,57,43,0.08)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#E4E2DC"; e.currentTarget.style.boxShadow = "none"; }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "10px 12px",
            fontSize: 13,
            fontFamily: "'Instrument Sans', sans-serif",
            color: "#1A1918",
            background: "#F3F2EE",
            border: "1px solid #E4E2DC",
            borderRadius: 8,
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#C0392B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(192,57,43,0.08)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#E4E2DC"; e.currentTarget.style.boxShadow = "none"; }}
        />
      )}
      {hint && <p style={{ fontSize: 10, color: "#9C9890", margin: "4px 0 0", fontFamily: "'Instrument Sans', sans-serif" }}>{hint}</p>}
    </div>
  );
}
