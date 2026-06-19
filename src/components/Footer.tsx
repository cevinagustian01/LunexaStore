"use client";
import InlineText from "@/components/InlineText";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Footer() {
  const yr = new Date().getFullYear();
  const { text: socmedJson } = useSiteContent("socmed_links_json", "");
  
  // Hooks must be called at top level
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

  return (
    <footer
      id="contact"
      style={{
        padding: "40px 0",
        background: "var(--bg-footer)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        textAlign: "center",
        borderTop: "var(--border-kawaii)",
        position: "relative",
        zIndex: 2,
        transition: "background 0.3s ease, border 0.3s ease",
      }}
    >
      <div className="k-container">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 32 }}>
          {socmedLinks.map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="pb-btn-outline" style={{ padding: "8px 20px", fontSize: 14, background: "white" }}>
              {link.icon} {link.platform}
            </a>
          ))}
        </div>
        <p className="k-font-quicksand" style={{ fontSize: 13, color: "#FF64A4", fontWeight: 600, margin: 0 }}>
          <InlineText id="footer_text" fallback={`lunexastore by owner · inspired by pasteboard — ${yr}`} as="span" />
        </p>
      </div>
    </footer>
  );
}
