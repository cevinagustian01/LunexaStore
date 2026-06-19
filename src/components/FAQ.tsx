"use client";
import { useState } from "react";
import { useSiteContent } from "@/components/SiteContentProvider";
import InlineText from "@/components/InlineText";

/* === AIDA: ACTION — Reduce friction with FAQ, then strong final CTA === */

export default function FAQ() {
  const { text: faqJson } = useSiteContent("faq_list_json", "");
  
  let faqs: { id: string; q: string; e: string; a: string }[] = [];
  try {
    if (faqJson) {
      faqs = JSON.parse(faqJson);
    } else {
      faqs = [
        { id:"f1", q:"Apakah akun yang dijual 100% aman & resmi? 🛡️", e:"🔒", a:"Tentu saja! Semua akun premium resmi bergaransi. Kami telah melayani 5000+ pelanggan dengan zero complaint. Transaksi aman via transfer bank, e-wallet, atau QRIS." },
        { id:"f2", q:"Berapa lama proses aktivasi setelah bayar? ⚡", e:"⚡", a:"Super cepat! Rata-rata 5-15 menit setelah konfirmasi pembayaran. CS kami aktif 24/7 dan langsung kirim notifikasi via WhatsApp/Telegram setelah akun aktif." },
        { id:"f3", q:"Bagaimana jika akun bermasalah atau expired? 🤝", e:"🎁", a:"Tenang! Ada masalah teknis sebelum masa paket habis? Kami langsung replace atau refund 100%. Kepuasan pelanggan adalah prioritas utama kami." },
        { id:"f4", q:"Bisakah dipakai di beberapa perangkat sekaligus? 📱", e:"📺", a:"Tergantung paket! Netflix: 4-5 perangkat. Spotify: 1 perangkat aktif. Viu: 2 perangkat. Vidio: beberapa perangkat. Detail ada di deskripsi masing-masing paket." },
        { id:"f5", q:"Metode pembayaran apa saja yang tersedia? 💳", e:"💳", a:"Transfer Bank (BCA, BNI, BRI, Mandiri), GoPay, OVO, DANA, ShopeePay, dan QRIS. Semua aman dan ada bukti transfer yang bisa disimpan!" },
        { id:"f6", q:"Ada promo atau diskon untuk pembelian bundle? 🎉", e:"🎀", a:"Ada! Sering ada promo bundle Netflix + Spotify, Viu + Vidio combo dengan diskon hingga 40%. Follow sosmed atau DM kami untuk info promo terbaru~ 🌸" },
      ];
    }
  } catch(e) {}

  const [open, setOpen] = useState<string | null>(null);
  return (
    <section
      id="faq"
      style={{
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="k-container" style={{ position:"relative", zIndex:5, maxWidth:780 }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <h2 className="k-font-quicksand" style={{ fontSize:"clamp(2rem, 5vw, 2.5rem)", margin:"0 0 12px", fontWeight: 800 }}>
            <InlineText id="faq_title" fallback="Pertanyaan Umum" as="span" style={{
              color: "var(--color-primary)"
            }} />
          </h2>
          <p className="k-font-quicksand" style={{ color:"var(--color-text-muted)", fontSize:16, fontWeight:500 }}>
            Masih bingung? Yuk dibaca dulu!
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
                className="pb-card"
                style={{
                  marginBottom: 12,
                  overflow: "hidden",
                  border: isOpen ? "2px solid #FF64A4" : "2px solid transparent",
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
                  <span className="k-font-nunito" style={{ flex:1, fontWeight:800, color:"var(--color-text)", fontSize:14 }}>
                    {faq.q}
                  </span>
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
                    <p className="k-font-quicksand" style={{ margin:0, fontSize:13, color:"var(--color-text-muted)", lineHeight:1.7 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* === FINAL CTA (ACTION) === */}
        <div className="pb-card" style={{
          padding:"40px 32px", textAlign:"center",
          marginTop: 64,
        }}>
          <h3 className="k-font-quicksand" style={{ fontSize:"clamp(1.5rem, 4vw, 2rem)", margin:"0 0 10px", fontWeight: 800 }}>
            <InlineText id="faq_cta_title" fallback="Siap Nonton Tanpa Batas?" as="span" style={{
              color: "var(--color-primary)"
            }} />
          </h3>
          <p className="k-font-quicksand" style={{ color:"var(--color-text-muted)", fontSize:15, marginBottom:24, fontWeight:500 }}>
            <InlineText id="faq_cta_desc" fallback="Bergabung dengan 5000+ pelanggan happy! Mulai hanya dari Rp 19.000/bulan" as="span" />
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <a href="#products" id="btn-faq-cta" className="pb-btn k-font-quicksand">
              <InlineText id="faq_cta_btn" fallback="Daftar Sekarang" as="span" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
