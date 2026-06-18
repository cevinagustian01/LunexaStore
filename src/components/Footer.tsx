"use client";
import { useSiteContent } from "@/components/SiteContentProvider";
import InlineText from "@/components/InlineText";
import { Product } from "@/lib/db";

export default function Footer({ dbProducts = [] }: { dbProducts?: Product[] }) {
  const yr = new Date().getFullYear();

  const { text: waLink } = useSiteContent("socmed_wa", "https://wa.me/6281234567890");
  const { text: tgLink } = useSiteContent("socmed_tg", "https://t.me/lunexastore");
  const { text: igLink } = useSiteContent("socmed_ig", "https://instagram.com/lunexastore");
  const { text: ttLink } = useSiteContent("socmed_tt", "https://tiktok.com/@lunexastore");

  const socials = [
    { id:"s-wa", icon:"📱", label:"WhatsApp", href: waLink, hoverBg:"rgba(22,163,74,0.15)", hoverColor:"#16a34a" },
    { id:"s-tg", icon:"✈️", label:"Telegram", href: tgLink, hoverBg:"rgba(59,130,246,0.15)", hoverColor:"#3b82f6" },
    { id:"s-ig", icon:"📸", label:"Instagram", href: igLink, hoverBg:"rgba(236,72,153,0.15)", hoverColor:"#ec4899" },
    { id:"s-tt", icon:"🎵", label:"TikTok", href: ttLink, hoverBg:"rgba(168,139,250,0.15)", hoverColor:"#a855f7" },
  ];

  const productNames = dbProducts.length > 0 ? dbProducts.map(p => p.nama) : ["Netflix Premium", "Viu Premium", "Vidio Premier", "Spotify Premium"];
  const navItems = ["Home", "Kenapa Kami?", "Produk", "Testimoni", "FAQ"];

  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #1e0a3c 0%, #3b1f6e 50%, #5a2d91 100%)",
        paddingTop: 80, paddingBottom: 24,
      }}
    >
      {/* Top wave */}
      <div style={{ position:"absolute", top:0, left:0, right:0, pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,20 L1440,80 L0,80 Z" fill="#F5EEFF" />
        </svg>
      </div>

      {/* Glows */}
      <div style={{ position:"absolute", top:"50%", left:"50%", width:400, height:400, borderRadius:"50%", background:"rgba(168,139,250,0.12)", filter:"blur(60px)", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, left:0, width:250, height:250, borderRadius:"50%", background:"rgba(244,114,182,0.08)", filter:"blur(50px)", pointerEvents:"none" }} />

      {/* Floating decor */}
      <div className="k-float" style={{ position:"absolute", top:80, left:40, fontSize:24, opacity:0.15 }}>✨</div>
      <div className="k-float-slow" style={{ position:"absolute", top:100, right:60, fontSize:20, opacity:0.15 }}>💫</div>
      <div className="k-sparkle" style={{ position:"absolute", bottom:60, left:"25%", fontSize:18, opacity:0.12 }}>🌸</div>

      <div className="k-container" style={{ position:"relative", zIndex:5 }}>
        {/* === FINAL CTA BAR === */}
        <div style={{
          background:"linear-gradient(135deg, rgba(244,114,182,0.2), rgba(168,139,250,0.2))",
          border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:24, padding:"28px 32px", marginBottom:56,
          display:"flex", flexWrap:"wrap", alignItems:"center",
          justifyContent:"space-between", gap:20,
        }}>
          <div>
            <div className="k-font-bubble" style={{ fontSize:20, marginBottom:6 }}>
              <span style={{
                background:"linear-gradient(90deg, #f9a8d4, #ddd6fe)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>Masih ragu? Jangan tunggu lama! ⏰</span>
            </div>
            <p className="k-font-quicksand" style={{ margin:0, color:"rgba(196,167,255,0.9)", fontSize:14, fontWeight:500 }}>
              Slot terbatas · Harga bisa naik kapan saja · 5000+ sudah puas
            </p>
          </div>
          <a href="#products" className="k-btn k-font-nunito" style={{
            padding:"12px 28px", borderRadius:999,
            background:"linear-gradient(135deg, #f472b6, #a855f7)",
            color:"white", fontWeight:800, fontSize:14,
            boxShadow:"0 6px 20px rgba(244,114,182,0.3)",
            whiteSpace:"nowrap",
          }}>
            Beli Sekarang 🛒
          </a>
        </div>

        {/* Footer Grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
          gap:40, marginBottom:48,
        }}>
          {/* Brand */}
          <div style={{ gridColumn:"span 1" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div className="k-spin" style={{
                width:44, height:44, borderRadius:"50%",
                background:"linear-gradient(135deg, #f472b6, #a855f7)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:20, boxShadow:"0 4px 16px rgba(244,114,182,0.3)",
              }}>✨</div>
              <div>
                <span className="k-font-bubble" style={{
                  fontSize:20, display:"block", lineHeight:1,
                  background:"linear-gradient(90deg, #f9a8d4, #ddd6fe, #f9a8d4)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                }}>Lunexa</span>
                <span className="k-font-bubble" style={{
                  fontSize:20, display:"block", lineHeight:1, marginTop:-2,
                  background:"linear-gradient(90deg, #fde68a, #f9a8d4, #ddd6fe)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                }}>Store</span>
              </div>
            </div>
            <InlineText id="footer_desc" fallback="Platform jual beli akun streaming premium terpercaya. Melayani dengan sepenuh hati sejak 2023! 💖" as="p" className="k-font-quicksand" style={{ color:"rgba(196,167,255,0.8)", fontSize:13, lineHeight:1.65, marginBottom:20, maxWidth:220 }} />

            {/* Contact links */}
            {[
              { id:"contact-wa", icon:"📱", label:"+62 812-3456-7890 (WhatsApp)", href:"https://wa.me/6281234567890" },
              { id:"contact-tg", icon:"✈️", label:"@lunexastore (Telegram)", href:"https://t.me/lunexastore" },
              { id:"contact-email", icon:"💌", label:"hello@lunexastore.id", href:"mailto:hello@lunexastore.id" },
            ].map(c => (
              <a
                key={c.id}
                id={c.id}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:"flex", alignItems:"center", gap:10,
                  marginBottom:10, textDecoration:"none",
                  transition:"opacity 0.2s",
                }}
              >
                <span style={{
                  width:34, height:34, borderRadius:10, flexShrink:0,
                  background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
                }}>
                  {c.icon}
                </span>
                <span className="k-font-quicksand" style={{ color:"rgba(196,167,255,0.8)", fontSize:12, fontWeight:500 }}>{c.label}</span>
              </a>
            ))}
          </div>

          {/* Products */}
          <div>
            <h4 className="k-font-bubble" style={{ color:"#f9a8d4", fontSize:16, marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
              <InlineText id="footer_produk_label" fallback="🛍️ Produk Kami" as="span" />
            </h4>
            {productNames.map(p => (
              <a key={p} href="#products" style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, textDecoration:"none", color:"rgba(196,167,255,0.8)", transition:"color 0.2s" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#f9a8d4", flexShrink:0 }} />
                <span className="k-font-quicksand" style={{ fontSize:13, fontWeight:500 }}>{p}</span>
              </a>
            ))}
          </div>

          {/* Nav */}
          <div>
            <h4 className="k-font-bubble" style={{ color:"#f9a8d4", fontSize:16, marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
              <InlineText id="footer_nav_label" fallback="🗺️ Navigasi" as="span" />
            </h4>
            {navItems.map(n => (
              <a key={n} href={`#${n.toLowerCase().replace(/\?/,"").replace(/ /g,"-")}`} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, textDecoration:"none", color:"rgba(196,167,255,0.8)", transition:"color 0.2s" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"rgba(196,167,255,0.4)", flexShrink:0 }} />
                <span className="k-font-quicksand" style={{ fontSize:13, fontWeight:500 }}>{n}</span>
              </a>
            ))}
            <div style={{ marginTop:16, padding:"12px 14px", borderRadius:14, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)" }}>
              <div className="k-font-quicksand" style={{ color:"rgba(196,167,255,0.6)", fontSize:11, fontWeight:700, marginBottom:4 }}>🕐 Jam Operasional</div>
              <div className="k-font-quicksand" style={{ color:"rgba(196,167,255,0.8)", fontSize:12 }}>Senin – Minggu</div>
              <div className="k-font-quicksand" style={{ color:"#f9a8d4", fontSize:13, fontWeight:700 }}>08.00 – 22.00 WIB</div>
            </div>
          </div>
        </div>

        {/* Social + Back to top */}
        <div style={{
          borderTop:"1px solid rgba(255,255,255,0.08)",
          paddingTop:24, paddingBottom:12,
          display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:16,
        }}>
          <div>
            <p className="k-font-quicksand" style={{ color:"rgba(196,167,255,0.7)", fontSize:12, marginBottom:10 }}>🌟 Follow & DM kami:</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {socials.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:"flex", alignItems:"center", gap:6, padding:"7px 14px",
                    borderRadius:999, border:"1px solid rgba(255,255,255,0.15)",
                    color:"rgba(196,167,255,0.8)", textDecoration:"none",
                    background:"rgba(255,255,255,0.05)", transition:"all 0.2s ease",
                    fontSize:13, fontFamily:"Quicksand, sans-serif", fontWeight:600,
                  }}
                >
                  <span style={{ fontSize:16 }}>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <a
            href="#home"
            id="btn-top"
            className="k-btn k-font-quicksand"
            style={{
              padding:"10px 20px", borderRadius:999,
              background:"linear-gradient(135deg, #f472b6, #a855f7)",
              color:"white", fontSize:13, fontWeight:700,
              boxShadow:"0 4px 14px rgba(244,114,182,0.3)",
              display:"flex", alignItems:"center", gap:6,
            }}
          >
            ↑ Kembali ke Atas
          </a>
        </div>

        {/* Bottom */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:16, textAlign:"center" }}>
          <p className="k-font-quicksand" style={{ color:"rgba(196,167,255,0.5)", fontSize:12, margin:0 }}>
            © {yr} <span style={{ color:"#f9a8d4", fontWeight:700 }}>Lunexa Store</span> ✨ Made with <span className="k-heartbeat" style={{ display:"inline-block", color:"#f472b6" }}>💖</span> — All rights reserved.
          </p>
          <p className="k-font-quicksand" style={{ color:"rgba(196,167,255,0.35)", fontSize:11, margin:"4px 0 0" }}>
            🌸 Streaming Premium · Harga Terjangkau · Garansi Terpercaya 🌸
          </p>
        </div>
      </div>
    </footer>
  );
}
