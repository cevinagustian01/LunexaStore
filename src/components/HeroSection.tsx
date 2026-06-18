"use client";
import Image from "next/image";

/* ===================================================
   HERO SECTION — Inspired by HARUA Poster Aesthetic
   Sky Blue + Cloud + Manga Outline + Sticker Collage
   =================================================== */

// Scattered star/sparkle positions
const sparkles = [
  { e: "✦", top: "8%",  left: "8%",  size: 28, color: "#FFD166", delay: "0s" },
  { e: "✦", top: "15%", left: "55%", size: 20, color: "white",   delay: "0.4s" },
  { e: "✦", top: "5%",  left: "75%", size: 32, color: "#FFD166", delay: "0.8s" },
  { e: "★", top: "35%", left: "3%",  size: 18, color: "white",   delay: "1s"   },
  { e: "✦", top: "70%", left: "90%", size: 26, color: "#FFD166", delay: "0.3s" },
  { e: "✦", top: "60%", left: "6%",  size: 22, color: "white",   delay: "1.2s" },
  { e: "★", top: "80%", left: "48%", size: 16, color: "#FFD166", delay: "0.6s" },
  { e: "✦", top: "90%", left: "20%", size: 24, color: "white",   delay: "0.9s" },
  { e: "♡", top: "22%", left: "88%", size: 20, color: "#FF5FA0", delay: "1.5s" },
  { e: "♡", top: "50%", left: "96%", size: 16, color: "white",   delay: "0.2s" },
  { e: "◇", top: "13%", left: "44%", size: 14, color: "#FFD166", delay: "0.7s" },
  { e: "◇", top: "75%", left: "75%", size: 18, color: "white",   delay: "1.1s" },
];

// Cloud shape component
function Cloud({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", ...style }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"55%", background:"white", borderRadius:"40px 40px 30px 30px" }} />
        <div style={{ position:"absolute", bottom:"30%", left:"15%", width:"38%", height:"80%", background:"white", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"30%", left:"35%", width:"45%", height:"100%", background:"white", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"20%", right:"10%", width:"30%", height:"65%", background:"white", borderRadius:"50%" }} />
      </div>
    </div>
  );
}

import InlineText from "@/components/InlineText";

export default function HeroSection() {

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingTop: 65,
        background: "linear-gradient(175deg, #4BC8EA 0%, #72D8F4 25%, #A8E8F8 55%, #D6F4FD 80%, #EEF9FF 100%)",
      }}
    >
      {/* ── CLOUDS ── */}
      <Cloud style={{ top: "22%", left: "-4%", width: 220, height: 120, opacity: 0.95 }} />
      <Cloud style={{ top: "55%", left: "-2%", width: 180, height: 100, opacity: 0.9 }} />
      <Cloud style={{ top: "10%", right: "-3%", width: 160, height: 90, opacity: 0.85 }} />
      <Cloud style={{ bottom: "8%", left: "15%", width: 260, height: 130, opacity: 0.9 }} />
      <Cloud style={{ bottom: "12%", right: "5%", width: 200, height: 110, opacity: 0.85 }} />
      <Cloud style={{ top: "38%", right: "-2%", width: 140, height: 80, opacity: 0.8 }} />

      {/* ── SCATTERED SPARKLES ── */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="k-sparkle"
          style={{
            position: "absolute", top: s.top, left: s.left,
            fontSize: s.size, color: s.color,
            animationDelay: s.delay, pointerEvents: "none", userSelect: "none",
            filter: "drop-shadow(0 0 4px rgba(0,0,0,0.15))",
            zIndex: 2,
          }}
        >
          {s.e}
        </div>
      ))}

      {/* ── SCROLLING TICKER ── */}
      <div style={{
        position: "absolute", top: 65, left: 0, right: 0,
        background: "#FF5FA0",
        borderTop: "2.5px solid #1B1464",
        borderBottom: "2.5px solid #1B1464",
        padding: "6px 0",
        overflow: "hidden", zIndex: 20,
      }}>
        <div style={{ display: "flex", gap: 0, animation: "kTickerScroll 22s linear infinite", whiteSpace: "nowrap" }}>
          {[0, 1, 2].map(n => (
            <InlineText as="span" key={n} id="hero_ticker" fallback="LUNEXA STORE · NONTON SEPUASNYA · AKTIF INSTAN · GARANSI PENUH · NETFLIX · VIU · VIDIO · SPOTIFY ·" className="k-font-nunito" style={{ color: "white", fontWeight: 800, fontSize: 12, letterSpacing: "0.08em", paddingRight: 48 }} />
          ))}
        </div>
        <style>{`
          @keyframes kTickerScroll {
            from { transform: translateX(0); }
            to { transform: translateX(-33.33%); }
          }
        `}</style>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="k-container"
        style={{
          position: "relative", zIndex: 10,
          paddingTop: 56, paddingBottom: 48,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "calc(100vh - 65px)",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        {/* ═══════════════════════════
            LEFT COLUMN — Text & Info
            ═══════════════════════════ */}
        <div style={{ flex: "1 1 340px", maxWidth: 560, zIndex: 10 }}>

          {/* Platform badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "white",
            border: "2.5px solid #1B1464",
            borderRadius: 999,
            padding: "5px 16px", marginBottom: 20,
            boxShadow: "3px 3px 0 #1B1464",
          }}>
            <span style={{ fontSize: 14 }}>⭐</span>
            <span className="k-font-nunito" style={{ fontWeight: 800, color: "#1B1464", fontSize: 12 }}>
              #1 Platform Streaming Premium · 5000+ Pelanggan
            </span>
          </div>

          {/* ── GIANT MANGA-STYLE HEADLINE ── */}
          <h1 style={{ margin: "0 0 24px", lineHeight: 1.05 }}>
            {/* Line 1: PINK */}
            <InlineText
              id="hero_title_1" fallback="Nonton"
              as="span"
              className="k-font-bubble"
              style={{
                display: "block",
                fontSize: "clamp(3.2rem, 8.5vw, 6.5rem)",
                color: "#FF5FA0",
                WebkitTextStroke: "4px #1B1464",
                paintOrder: "stroke fill",
                textShadow: "5px 5px 0 #1B1464",
                lineHeight: 1.08,
              }}
            />
            {/* Line 2: YELLOW */}
            <InlineText
              id="hero_title_2" fallback="Sepuasnya"
              as="span"
              className="k-font-bubble"
              style={{
                display: "block",
                fontSize: "clamp(3.2rem, 8.5vw, 6.5rem)",
                color: "#FFD166",
                WebkitTextStroke: "4px #1B1464",
                paintOrder: "stroke fill",
                textShadow: "5px 5px 0 #1B1464",
                lineHeight: 1.08,
              }}
            />
            {/* Line 3: WHITE */}
            <InlineText
              id="hero_title_3" fallback="Tanpa Iklan!"
              as="span"
              className="k-font-bubble"
              style={{
                display: "block",
                fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
                color: "white",
                WebkitTextStroke: "4px #1B1464",
                paintOrder: "stroke fill",
                textShadow: "5px 5px 0 #1B1464",
                lineHeight: 1.1,
              }}
            />
          </h1>

          {/* ── INFO BOXES (PLACE/DATE style from reference) ── */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
            {/* MULAI box */}
            <div style={{
              background: "rgba(255,255,255,0.92)",
              border: "2.5px solid #1B1464",
              borderRadius: 16, padding: "10px 18px",
              boxShadow: "4px 4px 0 #1B1464",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span className="k-font-nunito" style={{ fontWeight: 900, fontSize: 12, color: "#1B1464", letterSpacing: "0.08em" }}>MULAI</span>
              <div>
                <div className="k-font-bubble" style={{ fontSize: 22, color: "#FF5FA0", lineHeight: 1 }}>Rp 19rb</div>
                <div className="k-font-quicksand" style={{ fontSize: 10, color: "#666", fontWeight: 600 }}>/bulan · aktif instan</div>
              </div>
            </div>
            {/* AKTIF box */}
            <div style={{
              background: "rgba(255,255,255,0.92)",
              border: "2.5px solid #1B1464",
              borderRadius: 16, padding: "10px 18px",
              boxShadow: "4px 4px 0 #1B1464",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span className="k-font-nunito" style={{ fontWeight: 900, fontSize: 12, color: "#1B1464", letterSpacing: "0.08em" }}>AKTIF</span>
              <div>
                <div className="k-font-bubble" style={{ fontSize: 24, color: "#FFD166", lineHeight: 1 }}>&lt;15<span style={{ fontSize: 14 }}>m</span></div>
                <div className="k-font-quicksand" style={{ fontSize: 10, color: "#666", fontWeight: 600 }}>setelah bayar</div>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <InlineText
            id="hero_subtitle" fallback="Akses Netflix, Viu, Vidio & Spotify premium dengan harga yang bikin senyum lebar~ Aktif instan, garansi penuh! 🎉"
            as="p"
            className="k-font-quicksand"
            style={{
              fontSize: 15, color: "#1B1464", marginBottom: 18, lineHeight: 1.65,
              fontWeight: 600, maxWidth: 460,
              background: "rgba(255,255,255,0.7)",
              borderRadius: 12, padding: "10px 14px",
              border: "1.5px solid rgba(27,20,100,0.2)",
            }}
          />

          {/* Feature pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {[
              { icon: "⚡", text: "Aktif < 15 Menit" },
              { icon: "🛡️", text: "100% Aman" },
              { icon: "💖", text: "Garansi 30 Hari" },
              { icon: "🔒", text: "Privasi Terjaga" },
            ].map(f => (
              <span
                key={f.text}
                className="k-font-nunito"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "6px 14px", borderRadius: 999,
                  background: "white",
                  border: "2px solid #1B1464",
                  fontWeight: 700, fontSize: 12, color: "#1B1464",
                  boxShadow: "2px 2px 0 #1B1464",
                }}
              >
                <span>{f.icon}</span> {f.text}
              </span>
            ))}
          </div>

          {/* ── CTA BUTTONS ── */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            <a
              href="#products"
              id="btn-hero-cta"
              className="k-btn k-font-nunito k-pulse-glow"
              style={{
                padding: "14px 30px", borderRadius: 999,
                background: "#FF5FA0",
                border: "3px solid #1B1464",
                color: "white", fontWeight: 900, fontSize: 15,
                boxShadow: "5px 5px 0 #1B1464",
                whiteSpace: "nowrap",
              }}
            >
              <InlineText id="hero_btn_buy" fallback="🛒 Pilih Paket Sekarang!" />
            </a>
            <a
              href="#why"
              id="btn-hero-why"
              className="k-btn k-font-nunito"
              style={{
                padding: "14px 24px", borderRadius: 999,
                background: "#FFD166",
                border: "3px solid #1B1464",
                color: "#1B1464", fontWeight: 900, fontSize: 14,
                boxShadow: "5px 5px 0 #1B1464",
                whiteSpace: "nowrap",
              }}
            >
              <InlineText id="hero_btn_why" fallback="Kenapa Kami? ✨" />
            </a>
          </div>

          {/* ── STATS in bordered boxes ── */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { v: "5000+", l: "Pelanggan Happy" },
              { v: "4.9 ★", l: "Rating Bintang" },
              { v: "< 15m", l: "Waktu Aktif" },
            ].map(s => (
              <div
                key={s.l}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "2.5px solid #1B1464",
                  borderRadius: 14, padding: "8px 16px",
                  textAlign: "center",
                  boxShadow: "3px 3px 0 #1B1464",
                }}
              >
                <div className="k-font-bubble" style={{ fontSize: 20, color: "#FF5FA0", lineHeight: 1.1 }}>{s.v}</div>
                <div className="k-font-nunito" style={{ fontSize: 10, fontWeight: 700, color: "#1B1464", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════
            RIGHT COLUMN — Character + Stickers
            ═══════════════════════════ */}
        <div
          style={{
            flex: "1 1 280px", maxWidth: 440,
            position: "relative",
            display: "flex", justifyContent: "center",
            alignItems: "center",
            minHeight: 380,
          }}
        >
          {/* ── RETRO BROWSER WINDOW ── */}
          <div
            className="k-float-slow"
            style={{
              background: "white",
              border: "3px solid #1B1464",
              borderRadius: 20,
              width: 290, height: 290,
              boxShadow: "7px 7px 0 #1B1464",
              position: "relative", overflow: "hidden",
              zIndex: 5,
            }}
          >
            {/* Titlebar */}
            <div style={{
              background: "#FF5FA0",
              borderBottom: "3px solid #1B1464",
              padding: "7px 12px",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFD166", border: "1.5px solid #1B1464" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4ECBF3", border: "1.5px solid #1B1464" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "white", border: "1.5px solid #1B1464" }} />
              <span className="k-font-nunito" style={{ color: "white", fontWeight: 800, fontSize: 11, marginLeft: 8 }}>
                premium-wonderland.exe ✨
              </span>
            </div>
            {/* Character image */}
            <div style={{ position: "relative", height: "calc(100% - 37px)" }}>
              <Image
                src="/kawaii-hero.png"
                alt="Kawaii streaming character"
                fill
                sizes="290px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>

          {/* ── FLOATING STICKERS ── */}

          {/* OK Button sticker */}
          <div
            className="k-float"
            style={{
              position: "absolute", top: 10, right: 20,
              background: "#4ECBF3",
              border: "2.5px solid #1B1464",
              borderRadius: 8, padding: "4px 14px",
              fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 15, color: "#1B1464",
              boxShadow: "3px 3px 0 #1B1464",
              transform: "rotate(5deg)", zIndex: 10,
            }}
          >
            OK ✔
          </div>

          {/* Note sticker — streaming apps */}
          <div
            className="k-float-slow"
            style={{
              position: "absolute", top: 30, left: -20,
              background: "#FFD166",
              border: "2.5px solid #1B1464",
              borderRadius: 12, padding: "10px 14px",
              fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: 12, color: "#1B1464",
              boxShadow: "3px 3px 0 #1B1464",
              transform: "rotate(-6deg)", zIndex: 10,
              lineHeight: 1.6,
            }}
          >
            🎬 Netflix<br/>🧋 Viu<br/>⚽ Vidio<br/>🎵 Spotify
          </div>

          {/* Garansi sticker */}
          <div
            className="k-float"
            style={{
              position: "absolute", bottom: 40, left: -30,
              background: "white",
              border: "2.5px solid #1B1464",
              borderRadius: 999, padding: "7px 16px",
              fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 12, color: "#FF5FA0",
              boxShadow: "3px 3px 0 #1B1464",
              transform: "rotate(3deg)", zIndex: 10,
              display: "flex", alignItems: "center", gap: 6,
              animationDelay: "1s",
            }}
          >
            💖 Garansi 30 Hari!
          </div>

          {/* Pink phone sticker */}
          <div
            className="k-float-slow"
            style={{
              position: "absolute", bottom: 20, right: -10,
              background: "#FFB3D9",
              border: "2.5px solid #1B1464",
              borderRadius: 16, padding: "10px 14px",
              boxShadow: "4px 4px 0 #1B1464",
              transform: "rotate(-4deg)", zIndex: 10,
              textAlign: "center",
              animationDelay: "0.5s",
            }}
          >
            <div style={{ fontSize: 28, lineHeight: 1 }}>📱</div>
            <div className="k-font-nunito" style={{ fontSize: 10, fontWeight: 800, color: "#1B1464", marginTop: 4 }}>
              Aktif di<br/>semua device!
            </div>
          </div>

          {/* Floating stars around character */}
          <div className="k-sparkle" style={{ position:"absolute", top:"-5%", left:"30%", fontSize:30, color:"#FFD166", filter:"drop-shadow(2px 2px 0 #1B1464)", animationDelay:"0.3s" }}>✦</div>
          <div className="k-sparkle" style={{ position:"absolute", bottom:"15%", right:"15%", fontSize:22, color:"white", filter:"drop-shadow(2px 2px 0 #1B1464)", animationDelay:"1.2s" }}>✦</div>
          <div className="k-sparkle" style={{ position:"absolute", top:"30%", left:"-5%", fontSize:18, color:"#FF5FA0", filter:"drop-shadow(1px 1px 0 #1B1464)", animationDelay:"0.7s" }}>★</div>
        </div>
      </div>

      {/* ── WAVY BOTTOM SEPARATOR ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none", zIndex: 5 }}>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
          <path d="M0,70 C200,110 400,30 600,70 C800,110 1000,30 1200,65 C1320,85 1390,55 1440,45 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.5)" />
          <path d="M0,90 C300,50 600,110 900,80 C1100,58 1300,100 1440,75 L1440,120 L0,120 Z" fill="#FFFBF9" />
        </svg>
      </div>

      {/* ── RESPONSIVE MOBILE STYLES ── */}
      <style>{`
        @media (max-width: 900px) {
          #home .k-container {
            flex-direction: column !important;
            text-align: center;
            align-items: center;
          }
        }
        @media (max-width: 640px) {
          #home h1 span {
            font-size: clamp(2.4rem, 12vw, 3.5rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
