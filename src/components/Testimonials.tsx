"use client";
import InlineText from "@/components/InlineText";

/* === AIDA: DESIRE — Social proof to amplify desire === */

const testimonials = [
  {
    id: 1,
    username: "@anin_cutie",
    name: "Anindya ✨",
    avatar: "🐱",
    avatarGrad: "linear-gradient(135deg, #f472b6, #ec4899)",
    stars: 5,
    review: "OMG gak nyangka harganya semurah ini!! Netflix UHD-nya beneran jalan di TV, laptop, hp, semua bisa! Seller ramaaah banget, respon cepet juga 💖 Udah beli berkali-kali gaskeun!",
    product: "Netflix Premium 3 Bulan",
    productColor: "#ef4444",
    bg: "rgba(255,255,255,0.85)",
    border: "rgba(255,179,209,0.5)",
    rotate: "-1.5deg",
    tape: "rgba(255,179,209,0.85)",
    tapeLeft: true,
  },
  {
    id: 2,
    username: "@yuki_streaming",
    name: "Yuki Chan 🌸",
    avatar: "🐻",
    avatarGrad: "linear-gradient(135deg, #a855f7, #7c3aed)",
    stars: 5,
    review: "Viu premiumnya langsung aktif abis transfer! K-Drama favorit gue sekarang bisa ditonton tanpa iklan nyebelin 🥹 Sub Indonesianya juga oke banget. Recommended 100% deh!!",
    product: "Viu Premium 1 Bulan",
    productColor: "#a855f7",
    bg: "rgba(248,245,255,0.9)",
    border: "rgba(216,180,254,0.5)",
    rotate: "2deg",
    tape: "rgba(221,214,254,0.9)",
    tapeLeft: false,
  },
  {
    id: 3,
    username: "@bola_sejati99",
    name: "Hendra Goall ⚽",
    avatar: "🐼",
    avatarGrad: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    stars: 5,
    review: "Vidio Premier worth it banget bro! Liga 1, Serie A, EPL all in one. Pas nonton Final Champions kemaren streaming-nya lancar jaya, gak buffering sama sekali 🔥 Auto langganan terus!",
    product: "Vidio Premier 3 Bulan",
    productColor: "#3b82f6",
    bg: "rgba(239,246,255,0.9)",
    border: "rgba(147,197,253,0.5)",
    rotate: "-2deg",
    tape: "rgba(219,234,254,0.9)",
    tapeLeft: true,
  },
  {
    id: 4,
    username: "@melody_forever",
    name: "Sella Melodia 🎵",
    avatar: "🦊",
    avatarGrad: "linear-gradient(135deg, #10b981, #059669)",
    stars: 5,
    review: "Spotify Premium murah meriah tapi kualitasnya premium banget! Download lagu offline jalan, earworm pagi-pagi tanpa iklan 🎶 Teman kerja sampe penasaran, udah gue rekomenin semua hihi",
    product: "Spotify Premium 6 Bulan",
    productColor: "#10b981",
    bg: "rgba(240,253,244,0.9)",
    border: "rgba(110,231,183,0.5)",
    rotate: "1.5deg",
    tape: "rgba(209,250,229,0.9)",
    tapeLeft: false,
  },
  {
    id: 5,
    username: "@princess_nana",
    name: "Nana Princess 👑",
    avatar: "🐰",
    avatarGrad: "linear-gradient(135deg, #f59e0b, #d97706)",
    stars: 5,
    review: "Seller super trustworthy!! Udah 6 bulan jadi pelanggan setia, gak pernah ada masalah. CS-nya helpful banget, ada masalah langsung dibantuin. Lunexa Store the best lah pokoknya!! 🥰✨",
    product: "Netflix + Spotify Bundle",
    productColor: "#f59e0b",
    bg: "rgba(255,253,235,0.9)",
    border: "rgba(251,211,141,0.5)",
    rotate: "-1deg",
    tape: "rgba(254,240,138,0.9)",
    tapeLeft: true,
  },
  {
    id: 6,
    username: "@dramaqueen_id",
    name: "Rissa Dramaqueen 🎭",
    avatar: "🐸",
    avatarGrad: "linear-gradient(135deg, #14b8a6, #0d9488)",
    stars: 4,
    review: "Langganan Viu udah 3 kali dan selalu puas! K-Drama terbaru langsung ada, gak perlu nunggu lama. Harganya terjangkau buat kantong mahasiswa macam aku 😂💕",
    product: "Viu Premium 3 Bulan",
    productColor: "#14b8a6",
    bg: "rgba(240,253,250,0.9)",
    border: "rgba(153,246,228,0.5)",
    rotate: "2.5deg",
    tape: "rgba(204,251,241,0.9)",
    tapeLeft: false,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= n ? "k-star-fill" : "k-star-empty"} style={{ fontSize: 14 }}>★</span>
      ))}
    </span>
  );
}

import { Testimonial } from "@/lib/db";

export default function Testimonials({ dbTestimonials = [] }: { dbTestimonials?: Testimonial[] }) {
  const colors = [
    { bg: "rgba(255,255,255,0.85)", border: "rgba(255,179,209,0.5)", tape: "rgba(255,179,209,0.85)", avatarGrad: "linear-gradient(135deg, #f472b6, #ec4899)" },
    { bg: "rgba(248,245,255,0.9)", border: "rgba(216,180,254,0.5)", tape: "rgba(221,214,254,0.9)", avatarGrad: "linear-gradient(135deg, #a855f7, #7c3aed)" },
    { bg: "rgba(239,246,255,0.9)", border: "rgba(147,197,253,0.5)", tape: "rgba(219,234,254,0.9)", avatarGrad: "linear-gradient(135deg, #3b82f6, #1d4ed8)" },
    { bg: "rgba(240,253,244,0.9)", border: "rgba(110,231,183,0.5)", tape: "rgba(209,250,229,0.9)", avatarGrad: "linear-gradient(135deg, #10b981, #059669)" },
    { bg: "rgba(255,253,235,0.9)", border: "rgba(251,211,141,0.5)", tape: "rgba(254,240,138,0.9)", avatarGrad: "linear-gradient(135deg, #f59e0b, #d97706)" },
  ];

  const list = dbTestimonials.length > 0 
    ? dbTestimonials.map((t, i) => {
        const c = colors[i % colors.length];
        return {
          id: t.id,
          username: t.username,
          name: t.username, // Just use username
          avatar: t.avatar || "👤",
          avatarGrad: c.avatarGrad,
          stars: t.rating,
          review: t.komen,
          product: "Pelanggan Setia",
          productColor: "#f472b6",
          bg: c.bg,
          border: c.border,
          rotate: i % 2 === 0 ? "-2deg" : "3deg",
          tape: c.tape,
          tapeLeft: i % 2 === 0,
        };
      })
    : testimonials;

  return (
    <section
      id="testimonials"
      style={{ padding: "80px 0", position: "relative" }}
    >
      <div className="k-container">
        <div className="pb-lined" style={{ padding: "60px 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <InlineText id="testi_label" fallback="Testimoni" as="span" className="k-font-quicksand" style={{ fontSize:14, fontWeight:700, color:"#ec4899", letterSpacing:"0.05em", textTransform:"uppercase" }} />
          </div>
          <h2 className="k-font-quicksand" style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", margin: "0 0 12px", fontWeight: 800 }}>
            <InlineText id="testi_title" fallback="Kata Mereka" as="span" style={{
              color: "var(--color-primary)"
            }} />
          </h2>
          <InlineText id="testi_subtitle" fallback="Gak usah ragu, 5000+ orang udah ngebuktiin sendiri kualitasnya! ✨" as="p" className="k-font-quicksand" style={{ color: "var(--color-text-muted)", fontSize: 16, margin: "0 auto", maxWidth: 520, fontWeight: 500 }} />
        </div>

        {/* Scrapbook Masonry */}
        <div style={{
          columns: "1",
          columnGap: "24px",
        }}>
          <style>{`
            @media (min-width: 640px) { #testi-masonry { columns: 2 !important; } }
            @media (min-width: 1024px) { #testi-masonry { columns: 3 !important; } }
          `}</style>
          <div id="testi-masonry" style={{ columns: 1, columnGap: 24 }}>
            {list.map((t, idx) => (
              <div
                key={t.id}
                id={`testimonial-${t.id}`}
                style={{
                  breakInside: "avoid",
                  marginBottom: 32,
                  transform: `rotate(${t.rotate})`,
                  transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  cursor: "default",
                  display: "inline-block",
                  width: "100%",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "rotate(0deg) scale(1.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = `rotate(${t.rotate})`; }}
              >
                {/* Tape */}
                <div style={{
                  position: "absolute", top: -10, left: "50%", transform: "translateX(-50%) rotate(-1deg)",
                  width: 60, height: 20, background: "rgba(254,240,138,0.9)",
                  border: "1px solid rgba(234,179,8,0.3)", borderRadius: 2, zIndex: 10,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                }} />

                {/* Card */}
                <div className="pb-polaroid" style={{ width: "100%" }}>
                  {/* User row */}
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: t.avatarGrad,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize: 22, flexShrink: 0,
                      border: "2.5px solid white",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                    }}>
                      {t.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="k-font-nunito" style={{ fontWeight:800, color:"var(--color-text)", fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.name}</div>
                      <div className="k-font-quicksand" style={{ fontSize:11, color:"var(--color-text-muted)", fontWeight:600 }}>{t.username}</div>
                    </div>
                    <span style={{ fontSize:16, flexShrink:0 }} title="Terverifikasi">✔️</span>
                  </div>

                  {/* Stars + product */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:6 }}>
                    <Stars n={t.stars} />
                    <span className="k-font-quicksand" style={{
                      fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:999,
                      background: `${t.productColor}18`, color: t.productColor,
                    }}>
                      {t.product}
                    </span>
                  </div>

                  {/* Quote */}
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", top:-4, left:-4, fontSize:28, color:"rgba(236,72,153,0.15)", fontFamily:"serif", lineHeight:1 }}>"</span>
                    <p className="k-font-quicksand" style={{ margin:0, fontSize:13, color:"var(--color-text)", lineHeight:1.65, paddingLeft:16, paddingRight:8, paddingTop:4, paddingBottom:4 }}>
                      {t.review}
                    </p>
                    <span style={{ position:"absolute", bottom:-8, right:0, fontSize:28, color:"rgba(168,139,250,0.15)", fontFamily:"serif", lineHeight:1 }}>"</span>
                  </div>

                  {/* Footer */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:14, paddingTop:10, borderTop:"1px solid rgba(255,255,255,0.6)" }}>
                    <div style={{ display:"flex", gap:4 }}>
                      {["💖","✨","🎉"].map((e,i) => (
                        <span key={i} className="k-sparkle" style={{ fontSize:13, animationDelay:`${i*0.3}s` }}>{e}</span>
                      ))}
                    </div>
                    <span className="k-font-quicksand" style={{ fontSize:11, color:"#9ca3af" }}>Pelanggan Setia ❤️</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:12, marginTop:50 }}>
          {[
            { icon:"🛡️", label:"100% Terpercaya" },
            { icon:"⚡", label:"Aktivasi Cepat" },
            { icon:"💎", label:"Premium Quality" },
            { icon:"🤝", label:"Garansi Penuh" },
          ].map(b => (
            <div key={b.label} className="k-glass k-card" style={{
              display:"flex", alignItems:"center", gap:8,
              padding:"10px 20px", borderRadius:999,
              border:"1px solid rgba(255,255,255,0.7)",
              boxShadow:"0 4px 16px rgba(236,72,153,0.08)",
            }}>
              <span style={{ fontSize:22 }}>{b.icon}</span>
              <span className="k-font-quicksand" style={{ fontWeight:700, color:"#6d28d9", fontSize:13 }}>{b.label}</span>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
