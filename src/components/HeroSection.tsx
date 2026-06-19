"use client";
import InlineText from "@/components/InlineText";
import { useTheme } from "@/components/ThemeProvider";

export default function HeroSection() {
  const { theme, setTheme } = useTheme();

  return (
    <section
      id="home"
      style={{
        paddingTop: 160,
        paddingBottom: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="k-container" style={{ maxWidth: 800 }}>
        {/* HEADLINE */}
        <h1 style={{ margin: "0 0 24px", lineHeight: 1.15 }}>
          <InlineText
            id="pb_hero_title" fallback="Beli Akun Premium Murah & Aman"
            as="span"
            className="k-font-quicksand"
            style={{
              display: "block",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 800,
              color: "var(--color-primary)",
              letterSpacing: "-0.02em",
            }}
          />
        </h1>

        {/* SUBTITLE */}
        <InlineText
          id="pb_hero_subtitle" fallback="Langganan Netflix, Viu, Vidio & Spotify dengan harga bersahabat. Aktif instan, garansi penuh 100%!"
          as="p"
          className="k-font-quicksand"
          style={{
            fontSize: 20, color: "var(--color-text-muted)", marginBottom: 40, lineHeight: 1.5,
            fontWeight: 500, maxWidth: 600, margin: "0 auto 40px"
          }}
        />

        {/* BUTTONS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 32 }}>
          <a
            href="#products"
            id="btn-pb-primary"
            className="pb-btn k-font-quicksand"
          >
            <span style={{ marginRight: 8 }}>👤+</span> Beli Sekarang
          </a>
          <a
            href="#testimonials"
            id="btn-pb-secondary"
            className="pb-btn-outline k-font-quicksand"
            style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-glass)" }}
          >
            <span>👁️</span> Lihat Testimoni
          </a>
        </div>

        {/* THEME TOGGLE */}
        <div style={{
          display: "inline-flex",
          background: "var(--bg-glass)",
          padding: 4,
          borderRadius: 999,
          gap: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}>
          <button
            onClick={() => setTheme("dark")}
            style={{
              padding: "8px 24px",
              color: theme === "dark" ? "white" : "var(--color-text-muted)",
              background: theme === "dark" ? "#1f2937" : "transparent",
              borderRadius: 999,
              fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
              boxShadow: theme === "dark" ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
              transition: "all 0.2s"
            }}>Dark</button>
          <button
            onClick={() => setTheme("light")}
            style={{
              padding: "8px 24px",
              color: theme === "light" ? "black" : "var(--color-text-muted)",
              background: theme === "light" ? "white" : "transparent",
              borderRadius: 999,
              fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
              boxShadow: theme === "light" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s"
            }}>Light</button>
          <button
            onClick={() => setTheme("pink")}
            style={{
              padding: "8px 24px",
              color: theme === "pink" ? "white" : "var(--color-text-muted)",
              background: theme === "pink" ? "#FF64A4" : "transparent",
              borderRadius: 999,
              fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
              boxShadow: theme === "pink" ? "0 2px 8px rgba(255,100,164,0.3)" : "none",
              transition: "all 0.2s"
            }}>Pink</button>
        </div>
      </div>
    </section>
  );
}
