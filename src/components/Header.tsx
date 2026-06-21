"use client";
import Link from "next/link";
import InlineText from "@/components/InlineText";

export default function Header() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "16px 0",
        background: "var(--bg-glass)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "var(--border-kawaii)",
      }}
    >
      <div className="k-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="#home" style={{ position: "relative", width: 180, height: 48, display: "block" }}>
          <img src="/logo.png" alt="Lunexa Store" style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", width: 240, height: 240, objectFit: "contain", pointerEvents: "none" }} />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="#contact"
            className="k-font-quicksand pb-card"
            style={{
              padding: "8px 20px", textDecoration: "none",
              color: "#374151", fontWeight: 700, fontSize: 14,
              borderRadius: 999, display: "flex", alignItems: "center", gap: 8,
              boxShadow: "none"
            }}
          >
            <InlineText id="nav_login" fallback="Hubungi CS ➔" />
          </a>
        </nav>
      </div>
    </header>
  );
}
