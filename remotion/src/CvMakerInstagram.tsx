import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const COLORS = {
  ink: "#171724",
  muted: "#68687b",
  violet: "#6659d8",
  blue: "#287de4",
  pink: "#d166b4",
};

const enter = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 155 }, durationInFrames: 18 });

const fadeScene = (frame: number, duration: number) => {
  const fadeIn = interpolate(frame, [0, 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [duration - 9, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fadeIn, fadeOut);
};

const GradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 450], [0, 50]);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#fff", color: COLORS.ink, fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ position: "absolute", width: 720, height: 720, borderRadius: "50%", left: -360, top: 100 + y, background: "radial-gradient(circle, rgba(78,205,255,.22), rgba(78,205,255,0) 68%)", filter: "blur(24px)" }} />
      <div style={{ position: "absolute", width: 780, height: 780, borderRadius: "50%", right: -390, top: 460 - y, background: "radial-gradient(circle, rgba(195,109,255,.15), rgba(195,109,255,0) 68%)", filter: "blur(24px)" }} />
      <div style={{ position: "absolute", width: 650, height: 650, borderRadius: "50%", left: -260, bottom: 120, background: "radial-gradient(circle, rgba(242,119,190,.12), rgba(242,119,190,0) 68%)", filter: "blur(26px)" }} />
      {children}
    </AbsoluteFill>
  );
};

const Brand: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    <div style={{ width: 64, height: 64, borderRadius: 19, display: "grid", placeItems: "center", color: "#fff", fontSize: 32, fontWeight: 850, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.violet} 58%, ${COLORS.pink})`, boxShadow: "0 18px 42px rgba(82,80,205,.28)" }}>C</div>
    <span style={{ fontSize: 30, fontWeight: 750, letterSpacing: "-1px" }}>CVMakerApp</span>
  </div>
);

const SafeFrame: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: "absolute", inset: "0 92px", display: "flex", flexDirection: "column", alignItems: "center", ...style }}>{children}</div>
);

const SceneOne: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = fadeScene(frame, durationInFrames);
  const title = enter(frame, fps, 8);
  const visual = enter(frame, fps, 24);
  return (
    <GradientBackground>
      <SafeFrame style={{ paddingTop: 130, alignItems: "stretch" }}>
        <div style={{ display: "flex", justifyContent: "center", opacity }}><Brand /></div>
        <div style={{ marginTop: 230, textAlign: "center", opacity, transform: `translateY(${(1 - title) * 60}px)` }}>
          <div style={{ display: "inline-flex", padding: "14px 25px", border: "1px solid rgba(102,89,216,.13)", borderRadius: 999, color: "#5f57ba", background: "rgba(102,89,216,.065)", fontSize: 20, fontWeight: 750, letterSpacing: 2.2, textTransform: "uppercase" }}>Si buscas trabajo</div>
          <h1 style={{ margin: "48px 0 0", fontSize: 94, lineHeight: .98, letterSpacing: -6, fontWeight: 800 }}>Mira esto.<br /><span style={{ color: COLORS.violet }}>Tu CV puede estar</span><br />perdiendo oportunidades.</h1>
          <p style={{ maxWidth: 750, margin: "38px auto 0", color: COLORS.muted, fontSize: 30, lineHeight: 1.4 }}>Y arreglarlo no debería llevarte horas.</p>
        </div>
        <div style={{ marginTop: "auto", marginBottom: 110, opacity: visual, transform: `translateY(${(1 - visual) * 50}px) scale(${0.92 + visual * 0.08})` }}>
          <ResumeCard compact />
        </div>
      </SafeFrame>
    </GradientBackground>
  );
};

const ResumeCard: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div style={{ width: "100%", padding: compact ? 0 : 34, borderRadius: 40, background: "rgba(255,255,255,.78)", border: "1px solid rgba(30,30,70,.09)", boxShadow: "0 42px 100px rgba(47,45,105,.16)", backdropFilter: "blur(18px)" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: compact ? "34px 42px" : "0 0 30px" }}>
      <span style={{ fontSize: 20, fontWeight: 720 }}>Vista previa</span>
      <span style={{ display: "flex", alignItems: "center", gap: 10, color: "#4a9f7b", fontSize: 17, fontWeight: 700 }}><i style={{ width: 10, height: 10, borderRadius: 99, background: "#4fce94" }} />En vivo</span>
    </div>
    <div style={{ padding: compact ? "34px 42px 42px" : "48px", color: "#20202a", background: "#fff", borderRadius: compact ? 0 : 26, boxShadow: "0 18px 44px rgba(35,35,75,.09)" }}>
      <div style={{ width: 90, height: 7, marginBottom: 28, borderRadius: 8, background: COLORS.violet }} />
      <h3 style={{ margin: 0, fontSize: compact ? 45 : 42, letterSpacing: -2 }}>María García López</h3>
      <p style={{ margin: "8px 0 22px", color: "#555566", fontSize: 22 }}>Diseñadora de Producto</p>
      <div style={{ height: 1, marginBottom: 24, background: "#e9e9f0" }} />
      <small style={{ color: "#9696a4", fontSize: 14, fontWeight: 800, letterSpacing: 1.6 }}>EXPERIENCIA</small>
      <strong style={{ display: "block", marginTop: 20, fontSize: 21 }}>Senior Product Designer</strong>
      <span style={{ display: "block", margin: "6px 0 14px", color: "#9696a4", fontSize: 16 }}>Stripe · Ene 2022 — Presente</span>
      <div style={{ width: "100%", height: 7, borderRadius: 6, background: "#eeeeF3" }} /><div style={{ width: "88%", height: 7, marginTop: 9, borderRadius: 6, background: "#eeeeF3" }} />
    </div>
  </div>
);

const EditorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = fadeScene(frame, durationInFrames);
  const animation = spring({ frame, fps, config: { damping: 20, stiffness: 95 } });
  return (
    <GradientBackground>
      <SafeFrame style={{ paddingTop: 170, alignItems: "stretch" }}>
        <div style={{ opacity }}><Brand /></div>
        <div style={{ marginTop: 105, opacity, textAlign: "center" }}>
          <div style={{ color: COLORS.violet, fontSize: 20, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>Te lo digo en serio</div>
          <h2 style={{ margin: "25px 0 0", fontSize: 68, lineHeight: 1.02, letterSpacing: -4.5 }}>Tardé 5 minutos<br />en hacer esto.</h2>
        </div>
        <div style={{ marginTop: 85, opacity, transform: `translateY(${(1 - animation) * 80}px) scale(${0.9 + animation * .1})` }}>
          <div style={{ overflow: "hidden", border: "1px solid rgba(30,30,70,.09)", borderRadius: 36, background: "rgba(255,255,255,.8)", boxShadow: "0 40px 90px rgba(47,45,105,.15)" }}>
            <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", borderBottom: "1px solid rgba(30,30,70,.08)" }}>
              <div style={{ display: "flex", gap: 8 }}>{["#ff9bad", "#ffd27d", "#75dfb0"].map((color) => <i key={color} style={{ width: 12, height: 12, borderRadius: 99, background: color }} />)}</div>
              <span style={{ color: "#858598", fontSize: 15 }}>CVMakerApp · Editor</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "38% 62%" }}>
              <div style={{ padding: 30, background: "#fafaff", borderRight: "1px solid rgba(30,30,70,.08)" }}>
                <strong style={{ fontSize: 18 }}>Datos personales</strong>
                <span style={{ display: "block", marginTop: 24, color: "#858598", fontSize: 12, fontWeight: 700 }}>NOMBRE COMPLETO</span>
                <div style={{ marginTop: 8, padding: 15, border: "1px solid #e8e8f0", borderRadius: 10, background: "#fff", fontSize: 14 }}>María García López</div>
                <span style={{ display: "block", marginTop: 20, color: "#858598", fontSize: 12, fontWeight: 700 }}>TÍTULO PROFESIONAL</span>
                <div style={{ marginTop: 8, padding: 15, border: "1px solid #e8e8f0", borderRadius: 10, background: "#fff", fontSize: 14 }}>Diseñadora de Producto</div>
              </div>
              <div style={{ padding: 22, background: "#f4f4f9" }}><div style={{ padding: 15, background: "#fff" }}><ResumeCard compact /></div></div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, opacity, textAlign: "center", color: COLORS.muted, fontSize: 29, fontWeight: 650 }}>Escribe. Mira el resultado. Listo.</div>
      </SafeFrame>
    </GradientBackground>
  );
};

const templates = ["Minimal", "Editorial", "Modern", "Prussian", "Aurora", "Meridian"];

const TemplatesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = fadeScene(frame, durationInFrames);
  return (
    <GradientBackground>
      <SafeFrame style={{ paddingTop: 150, alignItems: "stretch" }}>
        <div style={{ opacity }}><Brand /></div>
        <div style={{ marginTop: 100, textAlign: "center", opacity }}>
          <div style={{ color: COLORS.violet, fontSize: 20, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>POV: necesitas trabajo</div>
          <h2 style={{ margin: "25px 0 0", fontSize: 70, lineHeight: 1.02, letterSpacing: -4.5 }}>Tu CV vs. un CV<br /><span style={{ color: COLORS.violet }}>que sí llama la atención.</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginTop: 88 }}>
          {templates.map((name, index) => {
            const progress = enter(frame, fps, 8 + index * 4);
            const cardInk = index === 0 || index === 3 || index === 5 ? "#25252b" : "#ffffff";
            return (
              <div key={name} style={{ opacity: progress, transform: `translateY(${(1 - progress) * 55}px) rotate(${(index % 2 ? 2.4 : -2.4) - (1 - progress) * 3}deg)`, padding: 18, borderRadius: 24, background: "rgba(255,255,255,.83)", border: "1px solid rgba(30,30,70,.08)", boxShadow: "0 20px 50px rgba(45,45,90,.09)" }}>
                <div style={{ aspectRatio: ".72", padding: 24, borderRadius: 12, background: index === 1 ? "#242438" : index === 2 ? "#315b78" : index === 4 ? "linear-gradient(145deg,#29223b,#b66c9f)" : "#f5f4f0", color: cardInk }}>
                  <div style={{ width: "55%", height: 10, borderRadius: 8, background: index === 4 ? "#fff" : index === 0 ? "#222" : "#7ed1e5" }} />
                  <div style={{ width: "70%", height: 18, marginTop: 26, borderRadius: 6, background: cardInk, opacity: .88 }} />
                  <div style={{ width: "48%", height: 7, marginTop: 12, borderRadius: 5, background: cardInk, opacity: .3 }} />
                  <div style={{ height: 1, margin: "30px 0 22px", background: cardInk, opacity: .16 }} />
                  {[92, 75, 86, 65].map((width) => <div key={width} style={{ width: `${width}%`, height: 5, marginBottom: 11, borderRadius: 5, background: cardInk, opacity: .18 }} />)}
                </div>
                <p style={{ margin: "15px 4px 2px", fontSize: 18, fontWeight: 720 }}>{name}</p>
              </div>
            );
          })}
        </div>
        <p style={{ marginTop: 44, color: COLORS.muted, textAlign: "center", fontSize: 25, opacity }}>Deja de mandar un CV que no dice nada.</p>
      </SafeFrame>
    </GradientBackground>
  );
};

const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = fadeScene(frame, durationInFrames);
  const features = [
    { icon: "!", title: "Nadie te enseña esto", text: "Cuando haces tu primer CV", tone: "#287de4" },
    { icon: "×", title: "El error que estás cometiendo", text: "Tu CV no necesita más texto. Necesita mejor estructura.", tone: "#6659d8" },
    { icon: "→", title: "Deja de mandar ese CV", text: "Cambia el diseño, no tu experiencia", tone: "#cf5eae" },
  ];
  return (
    <GradientBackground>
      <SafeFrame style={{ paddingTop: 150, alignItems: "stretch" }}>
        <div style={{ opacity }}><Brand /></div>
        <div style={{ marginTop: 100, opacity, textAlign: "center" }}>
          <div style={{ color: COLORS.violet, fontSize: 20, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>La parte que nadie explica</div>
          <h2 style={{ margin: "25px 0 0", fontSize: 70, lineHeight: 1.02, letterSpacing: -4.5 }}>El error que<br /><span style={{ color: COLORS.violet }}>estás cometiendo.</span></h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 90 }}>
          {features.map((feature, index) => {
            const progress = enter(frame, fps, 10 + index * 7);
            return (
              <div key={feature.title} style={{ display: "flex", alignItems: "center", gap: 28, padding: 30, opacity: progress, transform: `translateX(${(1 - progress) * 80}px)`, border: "1px solid rgba(30,30,70,.08)", borderRadius: 28, background: "rgba(255,255,255,.83)", boxShadow: "0 22px 55px rgba(45,45,90,.08)" }}>
                <div style={{ width: 78, height: 78, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: 24, color: feature.tone, background: `${feature.tone}14`, fontSize: 34, fontWeight: 800 }}>{feature.icon}</div>
                <div><strong style={{ display: "block", fontSize: 28, letterSpacing: -.8 }}>{feature.title}</strong><span style={{ display: "block", marginTop: 7, color: COLORS.muted, fontSize: 20 }}>{feature.text}</span></div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "auto", marginBottom: 105, opacity, textAlign: "center" }}><div style={{ display: "inline-flex", padding: "17px 28px", borderRadius: 999, color: "#5f57ba", background: "rgba(102,89,216,.07)", fontSize: 20, fontWeight: 700 }}>100% en tu navegador</div></div>
      </SafeFrame>
    </GradientBackground>
  );
};

const FinalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = fadeScene(frame, durationInFrames);
  const logo = spring({ frame, fps, config: { damping: 14, stiffness: 145 } });
  const text = enter(frame, fps, 8);
  const url = enter(frame, fps, 18);
  const pulse = 1 + Math.sin(frame / 7) * 0.012;
  return (
    <GradientBackground>
      <SafeFrame style={{ paddingTop: 260, alignItems: "stretch" }}>
        <div style={{ marginTop: 40, display: "grid", placeItems: "center", opacity, transform: `scale(${.75 + logo * .25})` }}>
          <div style={{ width: 210, height: 210, display: "grid", placeItems: "center", borderRadius: 62, color: "#fff", fontSize: 102, fontWeight: 850, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.violet} 58%, ${COLORS.pink})`, boxShadow: "0 45px 90px rgba(82,80,205,.32)", transform: `scale(${pulse})` }}>C</div>
          <div style={{ marginTop: 38, fontSize: 42, fontWeight: 780, letterSpacing: -1.5 }}>CVMakerApp</div>
        </div>
        <div style={{ marginTop: 120, textAlign: "center", opacity: text, transform: `translateY(${(1 - text) * 60}px)` }}>
          <h2 style={{ margin: 0, fontSize: 75, lineHeight: 1.02, letterSpacing: -5 }}>Encontré una forma<br /><span style={{ color: COLORS.violet }}>mucho más fácil.</span></h2>
          <p style={{ margin: "34px auto 0", color: COLORS.muted, fontSize: 30, fontWeight: 650 }}>Así debería verse un CV en 2026.</p>
          <div style={{ marginTop: 52, display: "inline-flex", padding: "25px 38px", color: "#fff", borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.violet} 72%, ${COLORS.pink})`, boxShadow: "0 25px 55px rgba(82,80,205,.3)", fontSize: 27, fontWeight: 750 }}>Haz el tuyo gratis →</div>
        </div>
        <div style={{ marginTop: "auto", marginBottom: 88, display: "flex", justifyContent: "center", opacity: url, transform: `translateY(${(1 - url) * 42}px) scale(${.9 + url * .1})` }}>
          <span style={{ padding: "22px 34px", color: "#242438", border: "2px solid rgba(102,89,216,.16)", borderRadius: 999, background: "rgba(255,255,255,.94)", boxShadow: "0 18px 45px rgba(47,45,105,.12)", fontSize: 43, fontWeight: 800, letterSpacing: "-1.8px" }}>cvmakerapp.vercel.app</span>
        </div>
      </SafeFrame>
    </GradientBackground>
  );
};

export const CvMakerInstagram: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={78}><SceneOne /></Sequence>
      <Sequence from={78} durationInFrames={96}><EditorScene /></Sequence>
      <Sequence from={174} durationInFrames={90}><TemplatesScene /></Sequence>
      <Sequence from={264} durationInFrames={84}><FeaturesScene /></Sequence>
      <Sequence from={348} durationInFrames={102}><FinalScene /></Sequence>
    </AbsoluteFill>
  );
};
