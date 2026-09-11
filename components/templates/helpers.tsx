import { type ResumeData, FONT_PAIRINGS, DEFAULT_SECTION_ORDER, SECTION_LABELS, type SectionKey } from "@/lib/types";

export function getFontFamily(settings: ResumeData["settings"]): string {
  const pairing = FONT_PAIRINGS.find((fp) => fp.id === settings.fontPairing);
  return pairing?.heading || "var(--font-instrument), system-ui, sans-serif";
}

export function getBodyFontFamily(settings: ResumeData["settings"]): string {
  const pairing = FONT_PAIRINGS.find((fp) => fp.id === settings.fontPairing);
  return pairing?.body || "var(--font-instrument), system-ui, sans-serif";
}

export function PhotoBadge({ data, size = 64 }: { data: ResumeData; size?: number }) {
  if (!data.settings.showPhoto || !data.personal.photo) return null;
  return (
    <img
      src={data.personal.photo}
      alt={data.personal.name}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        objectFit: "cover",
        border: `2px solid ${data.settings.accentColor}40`,
      }}
    />
  );
}

export function getOrderedSections(data: ResumeData): { key: SectionKey; visible: boolean }[] {
  const order = data.settings.sectionOrder || DEFAULT_SECTION_ORDER;
  return order.map((key) => ({ key, visible: data.settings.sections[key] }));
}

export function renderCustomSections(data: ResumeData, style?: React.CSSProperties) {
  if (!data.customSections?.length) return null;
  const accent = data.settings.accentColor;
  return (
    <>
      {data.customSections.map((cs) => (
        <section key={cs.id} style={{ marginBottom: 24, ...style }}>
          <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, margin: "0 0 12px" }}>
            {cs.title}
          </h2>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: "#4A4843", margin: 0, whiteSpace: "pre-wrap" }}>{cs.content}</p>
        </section>
      ))}
    </>
  );
}
