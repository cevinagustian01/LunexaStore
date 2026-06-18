"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import InlineText from "@/components/InlineText";

const navLinks = [
  { href: "#home", label: "Home", id: "nav_home" },
  { href: "#why", label: "Kenapa Kami?", id: "nav_why" },
  { href: "#products", label: "Produk", id: "nav_products" },
  { href: "#testimonials", label: "Testimoni", id: "nav_testi" },
  { href: "#faq", label: "FAQ", id: "nav_faq" },
  { href: "#contact", label: "Kontak", id: "nav_contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: "white",
        borderBottom: "2.5px solid #1B1464",
        boxShadow: "0 3px 0 #1B1464",
        padding: "10px 0",
        transition: "all 0.3s ease",
      }}
    >
      <div className="k-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ position: "relative" }}>
            <div
              className="k-spin"
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #f472b6, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(244,114,182,0.4)",
              }}
            >
              <span style={{ color: "white", fontSize: 18 }}>✨</span>
            </div>
            <div
              className="k-sparkle"
              style={{
                position: "absolute", top: -4, right: -4,
                width: 16, height: 16, borderRadius: "50%",
                background: "#fde68a",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 700,
              }}
            >★</div>
          </div>
          <div>
            <span
              className="k-font-bubble k-grad-pink"
              style={{ fontSize: 22, display: "block", lineHeight: 1 }}
            >Lunexa</span>
            <span
              className="k-font-bubble"
              style={{
                fontSize: 22, display: "block", lineHeight: 1, marginTop: -2,
                background: "linear-gradient(90deg, #a855f7, #ec4899, #facc15)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >Store</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="k-nav-desktop">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="k-font-quicksand"
              style={{
                padding: "8px 14px", textDecoration: "none",
                color: "#6d28d9", fontWeight: 600, fontSize: 14,
                borderRadius: 999, transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(236,72,153,0.1)"; (e.target as HTMLElement).style.color = "#ec4899"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "#6d28d9"; }}
            >
              <InlineText id={link.id} fallback={link.label} />
            </a>
          ))}
        </nav>

        {/* Auth Buttons removed */}
        {/* Hamburger */}
        <button
          id="btn-mobile-menu"
          className="k-nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(255,179,209,0.3)", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
          }}
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: 20, height: 2, background: "#ec4899", borderRadius: 2,
              transition: "all 0.3s ease",
              transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={{
        overflow: "hidden", transition: "max-height 0.4s ease, opacity 0.4s ease",
        maxHeight: menuOpen ? "400px" : "0", opacity: menuOpen ? 1 : 0,
      }}>
        <div style={{
          margin: "8px 16px 16px",
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
          borderRadius: 24, padding: 16, border: "1px solid rgba(255,179,209,0.4)",
          boxShadow: "0 8px 24px rgba(255,133,179,0.15)",
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="k-font-quicksand"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block", padding: "10px 16px", textDecoration: "none",
                color: "#6d28d9", fontWeight: 600, borderRadius: 16,
                transition: "background 0.2s",
              }}
            >
              <InlineText id={link.id} fallback={link.label} />
            </a>
          ))}
          {/* Mobile Auth Buttons removed */}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .k-nav-desktop { display: flex !important; } .k-nav-mobile { display: none !important; } }
        @media (max-width: 767px) { .k-nav-desktop { display: none !important; } .k-nav-mobile { display: flex !important; } }
      `}</style>
    </header>
  );
}
