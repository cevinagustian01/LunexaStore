"use client";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Features() {
  const { text: featuresJson } = useSiteContent("features_list_json", "");
  
  let features: { id: string; icon: string; title: string; desc: string }[] = [];
  try {
    if (featuresJson) {
      features = JSON.parse(featuresJson);
    } else {
      features = [
        { id: "f1", icon: "💬", title: "Testimoni Asli", desc: "Ribuan pelanggan udah ngebuktiin sendiri kualitas layanan kami. Terjamin 100%!" },
        { id: "f2", icon: "🚀", title: "Aktif Instan", desc: "Bayar sekarang, langsung bisa nonton hari ini juga. Gak pake nunggu lama." },
        { id: "f3", icon: "🛡️", title: "Garansi Penuh", desc: "Ada kendala sebelum masa aktif habis? Langsung kami ganti baru, no debat." },
        { id: "f4", icon: "📱", title: "Bisa Semua Device", desc: "Nonton dari HP, Laptop, TV pintar? Semua bisa tanpa ribet pakai VPN." },
        { id: "f5", icon: "💎", title: "Kualitas UHD 4K", desc: "Nikmati resolusi tertinggi buat pengalaman nonton yang bener-bener memanjakan mata." },
        { id: "f6", icon: "🔒", title: "Aman & Terpercaya", desc: "Pembayaran terjamin aman, data privasi kamu terjaga. Langganan tanpa was-was." },
      ];
    }
  } catch(e) {}

  return (
    <section id="why" style={{ padding: "40px 0 80px" }}>
      <div className="k-container" style={{ maxWidth: 1000 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {features.map(f => (
            <div key={f.id} className="pb-card k-kawaii-card" style={{
              padding: "24px",
              background: "var(--bg-card)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(255,100,164,0.15), rgba(201,168,232,0.2))",
                border: "2px solid rgba(255,182,217,0.5)",
                color: "#FF64A4", display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16, fontSize: 22,
                boxShadow: "0 4px 12px rgba(255,100,164,0.15)",
              }}>
                {f.icon}
              </div>
              <h3 className="k-font-quicksand" style={{ fontSize: 16, fontWeight: 800, color: "var(--color-text)", margin: "0 0 8px" }}>
                {f.title}
              </h3>
              <p className="k-font-quicksand" style={{ fontSize: 14, color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
