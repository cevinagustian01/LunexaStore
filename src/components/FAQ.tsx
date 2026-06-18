"use client";
import { useState } from "react";

/* === AIDA: ACTION — Reduce friction with FAQ, then strong final CTA === */

const faqs = [
  { id:"f1", q:"Apakah akun yang dijual 100% aman & resmi? 🛡️", e:"🔒", a:"Tentu saja! Semua akun premium resmi bergaransi. Kami telah melayani 5000+ pelanggan dengan zero complaint. Transaksi aman via transfer bank, e-wallet, atau QRIS." },
  { id:"f2", q:"Berapa lama proses aktivasi setelah bayar? ⚡", e:"⚡", a:"Super cepat! Rata-rata 5-15 menit setelah konfirmasi pembayaran. CS kami aktif 24/7 dan langsung kirim notifikasi via WhatsApp/Telegram setelah akun aktif." },
  { id:"f3", q:"Bagaimana jika akun bermasalah atau expired? 🤝", e:"🎁", a:"Tenang! Ada masalah teknis sebelum masa paket habis? Kami langsung replace atau refund 100%. Kepuasan pelanggan adalah prioritas utama kami." },
  { id:"f4", q:"Bisakah dipakai di beberapa perangkat sekaligus? 📱", e:"📺", a:"Tergantung paket! Netflix: 4-5 perangkat. Spotify: 1 perangkat aktif. Viu: 2 perangkat. Vidio: beberapa perangkat. Detail ada di deskripsi masing-masing paket." },
  { id:"f5", q:"Metode pembayaran apa saja yang tersedia? 💳", e:"💳", a:"Transfer Bank (BCA, BNI, BRI, Mandiri), GoPay, OVO, DANA, ShopeePay, dan QRIS. Semua aman dan ada bukti transfer yang bisa disimpan!" },
  { id:"f6", q:"Ada promo atau diskon untuk pembelian bundle? 🎉", e:"🎀", a:"Ada! Sering ada promo bundle Netflix + Spotify, Viu + Vidio combo dengan diskon hingga 40%. Follow sosmed atau DM kami untuk info promo terbaru~ 🌸" },
];

import InlineText from "@/components/InlineText";

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section
      id="faq"
      style={{
        padding: "90px 0",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFF9F0 0%, #F5EEFF 100%)",
      }}
    >
      <div style={{ position:"absolute", top:0, right:0, width:280, height:280, borderRadius:"50%", background:"rgba(255,179,209,0.15)", filter:"blur(50px)", transform:"translate(30%,-30%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:0, width:280, height:280, borderRadius:"50%", background:"rgba(196,167,255,0.15)", filter:"blur(50px)", transform:"translate(-30%,30%)", pointerEvents:"none" }} />
      <div className="k-wiggle" style={{ position:"absolute", top:20, left:20, fontSize:28, opacity:0.35 }}>❓</div>
      <div className="k-bounce" style={{ position:"absolute", bottom:20, right:20, fontSize:28, opacity:0.35 }}>💭</div>

      <div className="k-container" style={{ position:"relative", zIndex:5, maxWidth:780 }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <div style={{ width:50, height:1, background:"linear-gradient(90deg, transparent, #C9A8E8)" }} />
            <span className="k-font-quicksand" style={{ fontSize:13, fontWeight:700, color:"#7c3aed" }}>～ pertanyaan umum ～</span>
            <div style={{ width:50, height:1, background:"linear-gradient(90deg, #C9A8E8, transparent)" }} />
          </div>
          <h2 className="k-font-bubble" style={{ fontSize:"clamp(2rem, 5vw, 3rem)", margin:"0 0 12px" }}>
            <InlineText id="faq_title" fallback="FAQ Imut Kita~ 🌸" as="span" style={{
              background:"linear-gradient(90deg, #ec4899, #a855f7, #60a5fa)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }} />
          </h2>
          <p className="k-font-quicksand" style={{ color:"#6d28d9", fontSize:16, fontWeight:500 }}>
            Masih bingung? Yuk dibaca dulu, dijamin langsung paham! 🎀
          </p>
        </div>

        {/* FAQ Items */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:48 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === faq.id;
            return (
              <div
                key={faq.id}
                id={faq.id}
                style={{
                  borderRadius: 20,
                  border: `2px solid ${isOpen ? "rgba(168,139,250,0.5)" : "rgba(255,179,209,0.4)"}`,
                  background: isOpen ? "rgba(250,245,255,0.85)" : "rgba(255,255,255,0.75)",
                  backdropFilter:"blur(8px)",
                  boxShadow: isOpen ? "0 8px 30px rgba(168,139,250,0.15)" : "0 2px 12px rgba(0,0,0,0.04)",
                  overflow:"hidden",
                  transition:"all 0.3s ease",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  style={{
                    width:"100%", display:"flex", alignItems:"center", gap:14,
                    padding:"16px 20px", background:"transparent", border:"none", cursor:"pointer",
                    textAlign:"left",
                  }}
                >
                  <span style={{
                    fontSize:22, flexShrink:0,
                    transition:"transform 0.3s ease",
                    transform: isOpen ? "scale(1.2) rotate(10deg)" : "scale(1)",
                    display:"inline-block",
                  }}>{faq.e}</span>
                  <span className="k-font-nunito" style={{ flex:1, fontWeight:800, color:"#4c1d95", fontSize:14 }}>{faq.q}</span>
                  <span style={{
                    flexShrink:0, width:28, height:28, borderRadius:"50%",
                    background: isOpen ? "linear-gradient(135deg, #f472b6, #a855f7)" : "rgba(255,179,209,0.3)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    transition:"all 0.3s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4L6 8L10 4" stroke={isOpen ? "white" : "#ec4899"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? "300px" : "0",
                  overflow:"hidden",
                  transition:"max-height 0.4s ease, opacity 0.3s ease",
                  opacity: isOpen ? 1 : 0,
                }}>
                  <div style={{ padding:"0 20px 18px 56px" }}>
                    <div style={{ width:"100%", height:1, background:"rgba(255,179,209,0.3)", marginBottom:12 }} />
                    <p className="k-font-quicksand" style={{ margin:0, fontSize:13, color:"#4b5563", lineHeight:1.7 }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* === FINAL CTA (ACTION) === */}
        <div style={{
          background:"linear-gradient(135deg, rgba(244,114,182,0.15), rgba(168,139,250,0.15))",
          border:"2px dashed rgba(244,114,182,0.4)",
          borderRadius:28, padding:"36px 32px", textAlign:"center",
        }}>
          <div className="k-heartbeat" style={{ fontSize:40, marginBottom:12, display:"block" }}>💖</div>
          <h3 className="k-font-bubble" style={{ fontSize:"clamp(1.5rem, 4vw, 2rem)", margin:"0 0 10px" }}>
            <span style={{
              background:"linear-gradient(90deg, #ec4899, #a855f7)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>
              Siap Nonton Tanpa Batas?
            </span>
          </h3>
          <p className="k-font-quicksand" style={{ color:"#6d28d9", fontSize:15, marginBottom:24, fontWeight:500 }}>
            Bergabung dengan <strong style={{ color:"#ec4899" }}>5000+ pelanggan happy</strong> yang udah hemat jutaan rupiah!<br/>
            Mulai hanya dari <strong style={{ color:"#ec4899" }}>Rp 19.000/bulan</strong> 🎉
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <a href="#products" id="btn-faq-cta" className="k-btn k-font-nunito k-pulse-glow" style={{
              padding:"14px 36px", borderRadius:999,
              background:"linear-gradient(135deg, #f472b6, #a855f7, #ec4899)",
              color:"white", fontWeight:800, fontSize:16,
              boxShadow:"0 8px 25px rgba(244,114,182,0.4)",
            }}>
              🛒 Beli Sekarang — Mulai Rp 19rb!
            </a>
            <a href="#contact" id="btn-faq-contact" className="k-btn k-font-nunito k-glass" style={{
              padding:"14px 28px", borderRadius:999,
              color:"#7c3aed", fontWeight:700, fontSize:15,
              border:"2px solid rgba(167,139,250,0.5)",
            }}>
              💬 Ada Pertanyaan?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
