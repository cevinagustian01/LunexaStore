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

import { useState } from "react";
import { Product } from "@/lib/db";
import InlineText from "@/components/InlineText";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function ProductCatalog({ 
  dbProducts = [],
  variant = "carousel",
  hideHeader = false
}: { 
  dbProducts?: Product[],
  variant?: "carousel" | "grid",
  hideHeader?: boolean
}) {
  const [buyModal, setBuyModal] = useState<{ product: string, pkg: string, price: string } | null>(null);

  const { text: socmedJson } = useSiteContent("socmed_links_json", "");
  const { text: wa } = useSiteContent("socmed_wa", "https://wa.me/6281234567890");
  const { text: tg } = useSiteContent("socmed_tg", "https://t.me/username");
  const { text: x } = useSiteContent("socmed_x", "https://x.com/username");
  
  let socmedLinks: { id: string; platform: string; url: string; icon: string }[] = [];
  try {
    if (socmedJson) {
      socmedLinks = JSON.parse(socmedJson);
    } else {
      if (wa) socmedLinks.push({ id: "wa", platform: "WhatsApp", icon: "📱", url: wa });
      if (tg) socmedLinks.push({ id: "tg", platform: "Telegram", icon: "✈️", url: tg });
      if (x) socmedLinks.push({ id: "x", platform: "X (Twitter)", icon: "🐦", url: x });
    }
  } catch(e) {}

  const styles = [
    { emoji: "🎬", iconGrad: "linear-gradient(135deg, #ef4444, #dc2626)", headerGrad: "linear-gradient(135deg, rgba(254,226,226,0.8), rgba(255,241,242,0.9))", accentColor: "#ef4444", lightBg: "rgba(254,226,226,0.5)", borderColor: "rgba(252,165,165,0.5)", btnGrad: "linear-gradient(135deg, #ef4444, #ec4899)", badgeBg: "rgba(254,226,226,0.8)" },
    { emoji: "🧋", iconGrad: "linear-gradient(135deg, #a855f7, #7c3aed)", headerGrad: "linear-gradient(135deg, rgba(243,232,255,0.8), rgba(250,245,255,0.9))", accentColor: "#a855f7", lightBg: "rgba(243,232,255,0.5)", borderColor: "rgba(216,180,254,0.5)", btnGrad: "linear-gradient(135deg, #a855f7, #ec4899)", badgeBg: "rgba(243,232,255,0.8)" },
    { emoji: "⚽", iconGrad: "linear-gradient(135deg, #3b82f6, #1d4ed8)", headerGrad: "linear-gradient(135deg, rgba(219,234,254,0.8), rgba(239,246,255,0.9))", accentColor: "#3b82f6", lightBg: "rgba(219,234,254,0.5)", borderColor: "rgba(147,197,253,0.5)", btnGrad: "linear-gradient(135deg, #3b82f6, #a855f7)", badgeBg: "rgba(219,234,254,0.8)" },
    { emoji: "🎧", iconGrad: "linear-gradient(135deg, #10b981, #059669)", headerGrad: "linear-gradient(135deg, rgba(209,250,229,0.8), rgba(240,253,244,0.9))", accentColor: "#10b981", lightBg: "rgba(209,250,229,0.5)", borderColor: "rgba(110,231,183,0.5)", btnGrad: "linear-gradient(135deg, #10b981, #3b82f6)", badgeBg: "rgba(209,250,229,0.8)" },
  ];

  const list = dbProducts.length > 0
    ? dbProducts.map((p, i) => {
        const s = styles[i % styles.length];
        const totalStok = p.variants?.reduce((sum, v) => sum + (v.stok || 0), 0) || p.stok || 0;
        return {
          id: p.id,
          name: p.nama,
          stok: totalStok,
          emoji: s.emoji,
          tagline: "Paket Murah Meriah",
          iconGrad: s.iconGrad,
          headerGrad: s.headerGrad,
          accentColor: s.accentColor,
          lightBg: s.lightBg,
          borderColor: s.borderColor,
          btnGrad: s.btnGrad,
          badge: totalStok > 0 ? "🔥 Tersedia" : "❌ Habis",
          badgeColor: totalStok > 0 ? s.accentColor : "#ef4444",
          badgeBg: totalStok > 0 ? s.badgeBg : "#fee2e2",
          features: ["Akses Penuh", "Kualitas Terbaik", "Garansi"],
          packages: (p.variants && p.variants.length > 0 ? p.variants : [{ name: "Standard", price: p.harga || 0, stok: p.stok || 0 }]).map((v, idx) => ({
            name: v.name,
            price: `Rp ${v.price.toLocaleString("id-ID")}`,
            original: v.crossed_price ? `Rp ${v.crossed_price.toLocaleString("id-ID")}` : "",
            popular: idx === 0,
            stok: v.stok !== undefined ? v.stok : (p.stok || 0)
          }))
        };
      })
    : products;

  return (
    <section
      id="products"
      style={{ padding: "80px 0", position: "relative" }}
    >
      <div className="k-container">
        <div className="pb-lined" style={{ padding: "60px 24px" }}>
        {/* Header */}
        {!hideHeader && (
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", position: "relative", marginBottom: 10 }}>
              <InlineText id="catalog_label" fallback="Katalog Produk" as="span" className="k-font-quicksand" style={{ fontSize:14, fontWeight:700, color:"#ec4899", letterSpacing:"0.05em", textTransform:"uppercase" }} />
            </div>
            <h2 className="k-font-quicksand" style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", margin: "0 0 12px", display: "block", fontWeight: 800 }}>
              <InlineText id="catalog_title" fallback="Pilih Paketmu!" as="span" style={{
                color: "var(--color-primary)"
              }} />
            </h2>
            <InlineText id="catalog_subtitle" fallback="Semua paket resmi & terpercaya — harga yang bikin senyum lebar." as="p" className="k-font-quicksand" style={{ color: "var(--color-text-muted)", fontSize: 16, margin: "0 auto", maxWidth: 520, fontWeight: 500 }} />
          </div>
        )}

        {/* === PRODUCT CARDS === */}
        <div 
          className="no-scrollbar"
          style={variant === "carousel" ? {
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            gap: 24,
            paddingBottom: 24,
            WebkitOverflowScrolling: "touch",
          } : {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {list.map((p, idx) => (
            <div
              key={p.id}
              id={`product-card-${p.id}`}
              className="k-card"
              style={{
                background: "var(--bg-card)",
                border: "var(--border-kawaii)",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "var(--shadow-card)",
                position: "relative",
                flex: variant === "carousel" ? "0 0 min(320px, 85vw)" : "auto",
                scrollSnapAlign: "center",
              }}
            >
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
                      <div className="k-font-quicksand" style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>{p.tagline}</div>
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
                      <span className="k-font-quicksand" style={{ fontSize: 11, color: "var(--color-text)", fontWeight: 600 }}>{f}</span>
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
                        background: pkg.popular ? p.btnGrad : "var(--bg-glass)",
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
                          color: pkg.popular ? "white" : "var(--color-text)",
                        }}>
                          {pkg.name}
                        </div>
                        <div className="k-font-quicksand" style={{
                          fontSize: 11, textDecoration: "line-through",
                          color: pkg.popular ? "rgba(255,255,255,0.65)" : "var(--color-text-muted)",
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
                          color: pkg.popular ? "white" : "var(--color-text)",
                        }}>
                          {pkg.price}
                        </span>
                        <button
                          id={`btn-buy-${p.id}-${pkg.name.replace(" ","")}`}
                          className="k-btn k-font-quicksand"
                          disabled={!("stok" in pkg) || pkg.stok === 0}
                          onClick={() => {
                            if (!("stok" in pkg) || pkg.stok === 0) return;
                            setBuyModal({ product: p.name, pkg: pkg.name, price: pkg.price });
                          }}
                          style={{
                            padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                            whiteSpace: "nowrap",
                            background: !("stok" in pkg) || pkg.stok === 0 ? "#e5e7eb" : (pkg.popular ? "rgba(255,255,255,0.9)" : p.btnGrad),
                            color: !("stok" in pkg) || pkg.stok === 0 ? "#9ca3af" : (pkg.popular ? p.accentColor : "white"),
                            border: "none",
                            boxShadow: !("stok" in pkg) || pkg.stok === 0 ? "none" : (pkg.popular ? "none" : `0 3px 10px ${p.borderColor}`),
                            cursor: !("stok" in pkg) || pkg.stok === 0 ? "not-allowed" : "pointer"
                          }}
                        >
                          {!("stok" in pkg) || pkg.stok === 0 ? "Stok Habis" : "Beli Sekarang"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lihat Semua Button for Carousel */}
        {variant === "carousel" && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href="/katalog" className="pb-btn k-font-quicksand" style={{ background: "white", color: "#FF64A4", border: "2px solid #FF64A4", boxShadow: "0 4px 12px rgba(255,100,164,0.15)" }}>
              <span>Lihat Semua Katalog ➔</span>
            </a>
          </div>
        )}
      </div>
    </div>

    {/* Buy Modal */}
    {buyModal && (
      <div 
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(30,0,60,0.5)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px", animation: "kFadeIn 0.3s ease-out"
        }}
        onClick={(e) => e.target === e.currentTarget && setBuyModal(null)}
      >
        <div style={{
          background: "white", borderRadius: 32, padding: "32px",
          width: "100%", maxWidth: 420,
          boxShadow: "0 24px 60px rgba(160,108,213,0.3)",
          border: "2px solid #E8D5F5",
          animation: "kFadeUp 0.3s ease-out",
          position: "relative",
          textAlign: "center"
        }}>
          <button 
            onClick={() => setBuyModal(null)}
            style={{ 
              position: "absolute", top: 16, right: 16, background: "#fdf2f8", 
              border: "none", borderRadius: "50%", width: 32, height: 32, 
              cursor: "pointer", fontSize: 16, color: "#db2777", display: "flex", alignItems: "center", justifyContent: "center" 
            }}
          >
            ×
          </button>
          
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
          <h3 className="k-font-pacific" style={{ margin: "0 0 8px", fontSize: 24, color: "#1f2937" }}>Lanjut Pembelian?</h3>
          <p className="k-font-quicksand" style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
            Pesan <strong>{buyModal.product}</strong><br/>
            Paket <strong>{buyModal.pkg}</strong> ({buyModal.price})
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p className="k-font-quicksand" style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>Hubungi via:</p>
            {socmedLinks.map(s => {
              // Create prefilled message
              const msg = encodeURIComponent(`Halo min, saya mau pesan ${buyModal.product} - Paket ${buyModal.pkg} seharga ${buyModal.price}.`);
              let finalUrl = s.url;
              if (s.platform.toLowerCase().includes("whatsapp") || s.url.includes("wa.me")) {
                finalUrl = `${s.url}${s.url.includes("?") ? "&" : "?"}text=${msg}`;
              } else if (s.platform.toLowerCase().includes("telegram") || s.url.includes("t.me")) {
                finalUrl = `${s.url}?text=${msg}`;
              } else if (s.platform.toLowerCase().includes("x ") || s.platform.toLowerCase() === "x" || s.url.includes("x.com") || s.url.includes("twitter.com")) {
                finalUrl = `https://twitter.com/messages/compose?recipient_id=${s.url.split("/").pop()}&text=${msg}`; 
              }

              return (
                <a 
                  key={s.id} 
                  href={finalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="k-btn k-font-quicksand"
                  style={{ 
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 800,
                    background: "#f8fafc", color: "#1f2937", border: "1.5px solid #e2e8f0",
                    textDecoration: "none", transition: "all 0.2s"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#FF64A4";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "#FF64A4";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#f8fafc";
                    e.currentTarget.style.color = "#1f2937";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <span style={{ fontSize: 18 }}>{s.icon}</span> {s.platform}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    )}
    </section>
  );
}
