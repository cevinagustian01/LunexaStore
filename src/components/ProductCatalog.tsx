"use client";

/* === AIDA: DESIRE — Show products that make them want to buy === */

const products = [
  {
    id: "netflix",
    name: "Netflix Premium",
    emoji: "🎬",
    tagline: "Film & Series Terbaik Dunia",
    iconGrad: "linear-gradient(135deg, #ef4444, #dc2626)",
    headerGrad: "linear-gradient(135deg, rgba(254,226,226,0.8), rgba(255,241,242,0.9))",
    accentColor: "#ef4444",
    lightBg: "rgba(254,226,226,0.5)",
    borderColor: "rgba(252,165,165,0.5)",
    btnGrad: "linear-gradient(135deg, #ef4444, #ec4899)",
    badge: "🔥 Terlaris",
    badgeColor: "#ef4444",
    badgeBg: "rgba(254,226,226,0.8)",
    features: ["Ultra HD 4K", "5 Profil Pribadi", "Download Offline", "Semua Konten Netflix"],
    packages: [
      { name: "1 Bulan", price: "Rp 35.000", original: "Rp 80.000", popular: false },
      { name: "3 Bulan", price: "Rp 90.000", original: "Rp 240.000", popular: true, savings: "Hemat 62%" },
      { name: "6 Bulan", price: "Rp 165.000", original: "Rp 480.000", popular: false },
    ],
  },
  {
    id: "viu",
    name: "Viu Premium",
    emoji: "🧋",
    tagline: "K-Drama, Anime & Variety Show",
    iconGrad: "linear-gradient(135deg, #a855f7, #7c3aed)",
    headerGrad: "linear-gradient(135deg, rgba(243,232,255,0.8), rgba(250,245,255,0.9))",
    accentColor: "#a855f7",
    lightBg: "rgba(243,232,255,0.5)",
    borderColor: "rgba(216,180,254,0.5)",
    btnGrad: "linear-gradient(135deg, #a855f7, #ec4899)",
    badge: "💜 K-Drama",
    badgeColor: "#a855f7",
    badgeBg: "rgba(243,232,255,0.8)",
    features: ["K-Drama Eksklusif", "Sub Indonesia", "2 Perangkat", "Full HD Streaming"],
    packages: [
      { name: "1 Bulan", price: "Rp 25.000", original: "Rp 60.000", popular: false },
      { name: "3 Bulan", price: "Rp 65.000", original: "Rp 180.000", popular: true, savings: "Hemat 64%" },
      { name: "6 Bulan", price: "Rp 120.000", original: "Rp 360.000", popular: false },
    ],
  },
  {
    id: "vidio",
    name: "Vidio Premier",
    emoji: "⚽",
    tagline: "Liga 1, Serie A, EPL & Copa",
    iconGrad: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    headerGrad: "linear-gradient(135deg, rgba(219,234,254,0.8), rgba(239,246,255,0.9))",
    accentColor: "#3b82f6",
    lightBg: "rgba(219,234,254,0.5)",
    borderColor: "rgba(147,197,253,0.5)",
    btnGrad: "linear-gradient(135deg, #3b82f6, #a855f7)",
    badge: "⚽ Sport Live",
    badgeColor: "#3b82f6",
    badgeBg: "rgba(219,234,254,0.8)",
    features: ["Live Liga 1", "Serie A & EPL", "Full HD Siaran Langsung", "Sinetron Eksklusif"],
    packages: [
      { name: "1 Bulan", price: "Rp 20.000", original: "Rp 50.000", popular: false },
      { name: "3 Bulan", price: "Rp 55.000", original: "Rp 150.000", popular: true, savings: "Hemat 63%" },
      { name: "6 Bulan", price: "Rp 99.000", original: "Rp 300.000", popular: false },
    ],
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    emoji: "🎧",
    tagline: "Musik Tanpa Batas, Tanpa Iklan",
    iconGrad: "linear-gradient(135deg, #10b981, #059669)",
    headerGrad: "linear-gradient(135deg, rgba(209,250,229,0.8), rgba(240,253,244,0.9))",
    accentColor: "#10b981",
    lightBg: "rgba(209,250,229,0.5)",
    borderColor: "rgba(110,231,183,0.5)",
    btnGrad: "linear-gradient(135deg, #10b981, #3b82f6)",
    badge: "🎵 Musik",
    badgeColor: "#10b981",
    badgeBg: "rgba(209,250,229,0.8)",
    features: ["Tanpa Iklan", "Download Offline", "HiFi Audio Quality", "Lagu Tak Terbatas"],
    packages: [
      { name: "1 Bulan", price: "Rp 19.000", original: "Rp 54.990", popular: false },
      { name: "3 Bulan", price: "Rp 50.000", original: "Rp 164.970", popular: true, savings: "Hemat 70%" },
      { name: "6 Bulan", price: "Rp 90.000", original: "Rp 329.940", popular: false },
    ],
  },
];

import { Product } from "@/lib/db";
import InlineText from "@/components/InlineText";

export default function ProductCatalog({ dbProducts = [] }: { dbProducts?: Product[] }) {
  const styles = [
    { emoji: "🎬", iconGrad: "linear-gradient(135deg, #ef4444, #dc2626)", headerGrad: "linear-gradient(135deg, rgba(254,226,226,0.8), rgba(255,241,242,0.9))", accentColor: "#ef4444", lightBg: "rgba(254,226,226,0.5)", borderColor: "rgba(252,165,165,0.5)", btnGrad: "linear-gradient(135deg, #ef4444, #ec4899)", badgeBg: "rgba(254,226,226,0.8)" },
    { emoji: "🧋", iconGrad: "linear-gradient(135deg, #a855f7, #7c3aed)", headerGrad: "linear-gradient(135deg, rgba(243,232,255,0.8), rgba(250,245,255,0.9))", accentColor: "#a855f7", lightBg: "rgba(243,232,255,0.5)", borderColor: "rgba(216,180,254,0.5)", btnGrad: "linear-gradient(135deg, #a855f7, #ec4899)", badgeBg: "rgba(243,232,255,0.8)" },
    { emoji: "⚽", iconGrad: "linear-gradient(135deg, #3b82f6, #1d4ed8)", headerGrad: "linear-gradient(135deg, rgba(219,234,254,0.8), rgba(239,246,255,0.9))", accentColor: "#3b82f6", lightBg: "rgba(219,234,254,0.5)", borderColor: "rgba(147,197,253,0.5)", btnGrad: "linear-gradient(135deg, #3b82f6, #a855f7)", badgeBg: "rgba(219,234,254,0.8)" },
    { emoji: "🎧", iconGrad: "linear-gradient(135deg, #10b981, #059669)", headerGrad: "linear-gradient(135deg, rgba(209,250,229,0.8), rgba(240,253,244,0.9))", accentColor: "#10b981", lightBg: "rgba(209,250,229,0.5)", borderColor: "rgba(110,231,183,0.5)", btnGrad: "linear-gradient(135deg, #10b981, #3b82f6)", badgeBg: "rgba(209,250,229,0.8)" },
  ];

  const list = dbProducts.length > 0
    ? dbProducts.map((p, i) => {
        const s = styles[i % styles.length];
        return {
          id: p.id,
          name: p.nama,
          emoji: s.emoji,
          tagline: "Paket Murah Meriah",
          iconGrad: s.iconGrad,
          headerGrad: s.headerGrad,
          accentColor: s.accentColor,
          lightBg: s.lightBg,
          borderColor: s.borderColor,
          btnGrad: s.btnGrad,
          badge: "🔥 Tersedia",
          badgeColor: s.accentColor,
          badgeBg: s.badgeBg,
          features: ["Akses Penuh", "Kualitas Terbaik", "Garansi"],
          packages: [
            { name: "Promo", price: `Rp ${p.harga.toLocaleString("id-ID")}`, original: "", popular: true }
          ]
        };
      })
    : products;

  return (
    <section
      id="products"
      className="k-lined-paper"
      style={{ padding: "90px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Decorative elements */}
      <div className="k-wiggle" style={{ position:"absolute", top:20, left:16, fontSize:28, opacity:0.35 }}>📌</div>
      <div className="k-float" style={{ position:"absolute", top:40, right:20, fontSize:24, opacity:0.4 }}>🎀</div>
      <div className="k-sparkle" style={{ position:"absolute", bottom:40, left:20, fontSize:24, opacity:0.35 }}>⭐</div>
      <div className="k-bounce" style={{ position:"absolute", bottom:20, right:16, fontSize:28, opacity:0.4 }}>🌸</div>

      <div className="k-container" style={{ position: "relative", zIndex: 5 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          {/* Tape decoration */}
          <div style={{ display: "inline-block", position: "relative", marginBottom: 10 }}>
            <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%) rotate(-1deg)", width:80, height:20, background:"rgba(254,240,138,0.85)", borderRadius:4, border:"1px solid rgba(234,179,8,0.4)" }} />
            <InlineText id="catalog_label" fallback="～ katalog produk ～" as="span" className="k-font-quicksand" style={{ position:"relative", zIndex:1, fontSize:12, fontWeight:700, color:"#854d0e", display:"inline-block", padding:"2px 8px" }} />
          </div>
          <h2 className="k-font-bubble" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 12px", display: "block" }}>
            <InlineText id="catalog_title" fallback="Pilih Paketmu! 🛍️" as="span" style={{
              background: "linear-gradient(90deg, #ec4899, #a855f7, #60a5fa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }} />
          </h2>
          <InlineText id="catalog_subtitle" fallback="Semua paket resmi & terpercaya — harga yang bikin senyum-senyum sendiri~ 💖" as="p" className="k-font-quicksand" style={{ color: "#6d28d9", fontSize: 16, margin: "0 auto 16px", maxWidth: 520, fontWeight: 500 }} />
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, fontSize:18, color:"#f9a8d4" }}>
            <div style={{ width:50, height:1, background:"linear-gradient(90deg, transparent, #FFB3D1)" }} />
            ✦ ✦ ✦
            <div style={{ width:50, height:1, background:"linear-gradient(90deg, #FFB3D1, transparent)" }} />
          </div>
        </div>

        {/* === PRODUCT CARDS GRID === */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {list.map((p, idx) => (
            <div
              key={p.id}
              id={`product-card-${p.id}`}
              className="k-card"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                border: `2px solid ${p.borderColor}`,
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                position: "relative",
              }}
            >
              {/* Tape */}
              <div style={{
                position: "absolute",
                top: -8,
                ...(idx % 2 === 0 ? { left: 24 } : { right: 24 }),
                width: 52, height: 18, borderRadius: 4,
                background: idx % 2 === 0 ? "rgba(255,179,209,0.85)" : "rgba(221,214,254,0.85)",
                border: "1px solid rgba(255,255,255,0.6)",
                transform: idx % 2 === 0 ? "rotate(2deg)" : "rotate(-2deg)",
                zIndex: 5,
              }} />

              {/* Card Header */}
              <div style={{ background: p.headerGrad, padding: "20px 20px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Icon */}
                    <div style={{
                      width: 54, height: 54, borderRadius: 16,
                      background: p.iconGrad,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 28, boxShadow: `0 6px 16px ${p.borderColor}`,
                    }}>
                      {p.emoji}
                    </div>
                    <div>
                      <div className="k-font-bubble" style={{ fontSize: 18, color: "#1f2937" }}>{p.name}</div>
                      <div className="k-font-quicksand" style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{p.tagline}</div>
                    </div>
                  </div>
                  <span className="k-font-quicksand" style={{
                    fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
                    color: p.badgeColor, background: p.badgeBg,
                    border: `1px solid ${p.borderColor}`,
                  }}>
                    {p.badge}
                  </span>
                </div>

                {/* Features */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 4px", marginTop: 14 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ color: p.accentColor, fontWeight: 700, fontSize: 12 }}>✓</span>
                      <span className="k-font-quicksand" style={{ fontSize: 11, color: "#374151", fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packages */}
              <div style={{ padding: "16px 20px 20px" }}>
                <div style={{ marginBottom: 10 }}>
                  <span className="k-font-quicksand" style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pilih Durasi:</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.packages.map(pkg => (
                    <div
                      key={pkg.name}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: pkg.popular ? "12px 14px" : "10px 14px",
                        borderRadius: 16,
                        background: pkg.popular ? p.btnGrad : "rgba(249,250,251,0.8)",
                        border: pkg.popular ? "none" : `1.5px solid ${p.borderColor}`,
                        position: "relative",
                        boxShadow: pkg.popular ? `0 6px 20px ${p.borderColor}` : "none",
                        transition: "transform 0.2s ease",
                        cursor: "pointer",
                      }}
                    >
                      {pkg.popular && (
                        <div style={{
                          position: "absolute", top: -10, left: 12,
                          background: "#fde68a", color: "#854d0e",
                          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                          fontFamily: "Pacifico, cursive",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}>
                          ★ Terpopuler!
                        </div>
                      )}
                      <div>
                        <div className="k-font-nunito" style={{
                          fontWeight: 800, fontSize: 13,
                          color: pkg.popular ? "white" : "#374151",
                        }}>
                          {pkg.name}
                        </div>
                        <div className="k-font-quicksand" style={{
                          fontSize: 11, textDecoration: "line-through",
                          color: pkg.popular ? "rgba(255,255,255,0.65)" : "#9ca3af",
                        }}>
                          {pkg.original}
                        </div>
                        {pkg.popular && "savings" in pkg && (
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.9)", fontFamily: "Quicksand, sans-serif", fontWeight: 700 }}>
                            🎉 {(pkg as typeof pkg & {savings: string}).savings}
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="k-font-bubble" style={{
                          fontSize: 15,
                          color: pkg.popular ? "white" : "#1f2937",
                        }}>
                          {pkg.price}
                        </span>
                        <button
                          id={`btn-buy-${p.id}-${pkg.name.replace(" ","")}`}
                          className="k-btn k-font-quicksand"
                          style={{
                            padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                            whiteSpace: "nowrap",
                            background: pkg.popular ? "rgba(255,255,255,0.9)" : p.btnGrad,
                            color: pkg.popular ? p.accentColor : "white",
                            border: "none",
                            boxShadow: pkg.popular ? "none" : `0 3px 10px ${p.borderColor}`,
                          }}
                        >
                          Beli Sekarang
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <div
            className="k-glass"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "12px 24px", borderRadius: 999,
              border: "1px solid rgba(255,179,209,0.4)",
              boxShadow: "0 4px 16px rgba(255,133,179,0.1)",
            }}
          >
            <span className="k-heartbeat" style={{ fontSize: 22 }}>💖</span>
            <span className="k-font-quicksand" style={{ fontSize: 13, color: "#6d28d9", fontWeight: 600 }}>
              Semua transaksi aman & terenkripsi · Konfirmasi via WA/TG · <span style={{ color: "#ec4899", fontWeight: 700 }}>@lunexastore</span>
            </span>
            <span className="k-heartbeat" style={{ fontSize: 22, animationDelay: "0.5s" }}>💖</span>
          </div>
        </div>
      </div>
    </section>
  );
}
