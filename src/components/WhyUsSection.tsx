"use client";

/* === AIDA: INTEREST — Build interest with clear benefits & comparison === */

const benefits = [
  {
    icon: "⚡",
    title: "Aktivasi Super Cepat",
    desc: "Rata-rata aktif dalam 5-15 menit setelah pembayaran dikonfirmasi. Langsung bisa nonton!",
    color: "#f59e0b",
    bg: "rgba(254,243,199,0.6)",
    border: "rgba(251,191,36,0.3)",
  },
  {
    icon: "💎",
    title: "Kualitas Premium Asli",
    desc: "Bukan sharing account biasa. Semua akun resmi bergaransi dengan kualitas streaming tertinggi.",
    color: "#a855f7",
    bg: "rgba(243,232,255,0.6)",
    border: "rgba(196,167,255,0.3)",
  },
  {
    icon: "🛡️",
    title: "Garansi 30 Hari Penuh",
    desc: "Ada masalah? Kami replace atau refund 100%. CS aktif 24/7 siap bantu kapanpun kamu butuh.",
    color: "#10b981",
    bg: "rgba(209,250,229,0.6)",
    border: "rgba(110,231,183,0.3)",
  },
  {
    icon: "💸",
    title: "Hemat Hingga 70%",
    desc: "Bandingkan sendiri! Harga kami jauh lebih murah dari langganan resmi tanpa mengorbankan kualitas.",
    color: "#ec4899",
    bg: "rgba(252,231,243,0.6)",
    border: "rgba(249,168,212,0.3)",
  },
  {
    icon: "🔒",
    title: "Privasi 100% Terjaga",
    desc: "Profil pribadi eksklusif. Tidak ada yang bisa melihat riwayat tontonanmu. Aman & rahasia.",
    color: "#3b82f6",
    bg: "rgba(219,234,254,0.6)",
    border: "rgba(147,197,253,0.3)",
  },
  {
    icon: "🤝",
    title: "CS Responsif & Ramah",
    desc: "Tim support kami siap bantu via WhatsApp & Telegram. Respon rata-rata < 5 menit. Gak pake lama!",
    color: "#f472b6",
    bg: "rgba(252,231,243,0.6)",
    border: "rgba(249,168,212,0.3)",
  },
];

const compareData = [
  { feature: "Harga / Bulan", premium: "Rp 19-35rb", resmi: "Rp 54-189rb" },
  { feature: "Aktivasi", premium: "< 15 Menit ⚡", resmi: "Verifikasi Ribet ❌" },
  { feature: "Garansi", premium: "30 Hari ✅", resmi: "Tidak Ada ❌" },
  { feature: "CS Support", premium: "24/7 WA/TG ✅", resmi: "Email Only ❌" },
  { feature: "Profil Pribadi", premium: "Ada ✅", resmi: "Ada ✅" },
  { feature: "Kualitas", premium: "Ultra HD 4K ✅", resmi: "Ultra HD 4K ✅" },
];

import InlineText from "@/components/InlineText";

export default function WhyUsSection() {
  return (
    <section
      id="why"
      style={{
        padding: "90px 0",
        background: "linear-gradient(180deg, #FFFBF9 0%, #F5EEFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div style={{ position:"absolute", top:0, right:0, width:300, height:300, borderRadius:"50%", background:"rgba(196,167,255,0.15)", filter:"blur(50px)", transform:"translate(30%,-30%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:0, width:300, height:300, borderRadius:"50%", background:"rgba(255,179,209,0.15)", filter:"blur(50px)", transform:"translate(-30%,30%)", pointerEvents:"none" }} />

      {/* Floating decor */}
      <div className="k-wiggle" style={{ position:"absolute", top:24, left:24, fontSize:28, opacity:0.4 }}>🌟</div>
      <div className="k-float-slow" style={{ position:"absolute", bottom:40, right:24, fontSize:28, opacity:0.4 }}>💡</div>

      <div className="k-container" style={{ position: "relative", zIndex: 5 }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, transparent, #FFB3D1)" }} />
            <InlineText id="why_label" fallback="～ kenapa pilih kami ～" as="span" className="k-font-quicksand" style={{ fontSize: 13, fontWeight: 700, color: "#ec4899" }} />
            <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #FFB3D1, transparent)" }} />
          </div>
          <h2 className="k-font-bubble" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 12px" }}>
            <InlineText id="why_title" fallback="6 Alasan Pelanggan Setia Kami 💡" as="span" style={{
              background: "linear-gradient(90deg, #ec4899, #a855f7, #60a5fa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }} />
          </h2>
          <InlineText id="why_subtitle" fallback="Bukan sekedar jual-beli biasa. Kami berkomitmen memberikan pengalaman terbaik untuk kamu!" as="p" className="k-font-quicksand" style={{ fontSize: 16, color: "#6d28d9", maxWidth: 540, margin: "0 auto", fontWeight: 500 }} />
        </div>

        {/* Benefits Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20, marginBottom: 72,
        }}>
          {benefits.map((b, i) => (
            <div
              key={b.title}
              id={`benefit-${i}`}
              className="k-card"
              style={{
                background: b.bg,
                border: `1.5px solid ${b.border}`,
                borderRadius: 24, padding: "24px 24px",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: "white", border: `2px solid ${b.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, marginBottom: 16,
                boxShadow: `0 4px 12px ${b.border}`,
              }}>
                {b.icon}
              </div>
              <h3 className="k-font-nunito" style={{ margin: "0 0 8px", fontWeight: 800, fontSize: 16, color: b.color }}>
                {b.title}
              </h3>
              <p className="k-font-quicksand" style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          borderRadius: 28, overflow: "hidden",
          border: "1.5px solid rgba(255,179,209,0.4)",
          boxShadow: "0 8px 40px rgba(236,72,153,0.1)",
          maxWidth: 700, margin: "0 auto",
        }}>
          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            background: "linear-gradient(135deg, #f472b6, #a855f7)",
            padding: "16px 24px",
          }}>
            <span className="k-font-nunito" style={{ fontWeight: 800, color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Fitur</span>
            <span className="k-font-nunito" style={{ fontWeight: 800, color: "white", fontSize: 14, textAlign: "center" }}>
              ✨ Lunexa Store
            </span>
            <span className="k-font-nunito" style={{ fontWeight: 800, color: "rgba(255,255,255,0.7)", fontSize: 13, textAlign: "center" }}>
              Berlangganan Resmi
            </span>
          </div>
          {/* Rows */}
          {compareData.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                padding: "14px 24px",
                background: i % 2 === 0 ? "rgba(248,241,255,0.5)" : "transparent",
                borderBottom: i < compareData.length - 1 ? "1px solid rgba(255,179,209,0.2)" : "none",
                alignItems: "center",
              }}
            >
              <span className="k-font-quicksand" style={{ fontWeight: 600, color: "#374151", fontSize: 13 }}>
                {row.feature}
              </span>
              <span className="k-font-quicksand k-compare-yes" style={{ textAlign: "center", fontSize: 13 }}>
                {row.premium}
              </span>
              <span className="k-font-quicksand" style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
                {row.resmi}
              </span>
            </div>
          ))}
          {/* CTA inside table */}
          <div style={{ padding: "20px 24px", textAlign: "center", background: "rgba(253,242,255,0.5)" }}>
            <a
              href="#products"
              className="k-btn k-font-nunito"
              style={{
                padding: "12px 32px", borderRadius: 999,
                background: "linear-gradient(135deg, #f472b6, #a855f7)",
                color: "white", fontWeight: 800, fontSize: 14,
                boxShadow: "0 6px 20px rgba(244,114,182,0.35)",
              }}
            >
              Hemat Sekarang — Mulai Rp 19.000/bulan 🎉
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
