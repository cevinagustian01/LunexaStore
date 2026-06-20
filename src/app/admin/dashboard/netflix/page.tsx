"use client";

import Link from "next/link";

export default function NetflixBotPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F0FF", fontFamily: "Quicksand, sans-serif" }}>
      {/* Header Admin */}
      <header style={{ background: "white", padding: "16px 32px", borderBottom: "2px solid #E8D5F5", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 24 }}>🎬</div>
            <h1 style={{ margin: 0, fontFamily: "Pacifico, cursive", color: "#FF64A4", fontSize: 22 }}>
              Netflix Automator
            </h1>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              href="/admin/dashboard"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 16px", borderRadius: 999,
                background: "#FFE4EF", color: "#7c3aed",
                fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13,
                textDecoration: "none", border: "1.5px solid #ddd6fe",
              }}
            >
              ← Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Iframe Content */}
      <main style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 24px", height: "calc(100vh - 80px)" }}>
        <div style={{ 
          width: "100%", 
          height: "100%", 
          background: "#000", 
          borderRadius: 20, 
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(160,108,213,0.15)", 
          border: "2px solid #E8D5F5"
        }}>
          {/* We point to /netflix-tool/ and it will be proxied to Python backend */}
          <iframe 
            src="/netflix-tool/" 
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Netflix Automator Bot"
          />
        </div>
      </main>
    </div>
  );
}
