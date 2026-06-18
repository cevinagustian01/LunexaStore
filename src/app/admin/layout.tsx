import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Lunexa Store",
  description: "Panel admin untuk mengelola produk dan testimoni",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F0FF", fontFamily: "Quicksand, sans-serif" }}>
      {children}
    </div>
  );
}
