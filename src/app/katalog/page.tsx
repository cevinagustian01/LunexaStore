import { getProducts } from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { SiteContentProvider } from "@/components/SiteContentProvider";

import ProductCatalog from "@/components/ProductCatalog";
import Footer from "@/components/Footer";
import InlineText from "@/components/InlineText";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const isAdmin = await checkAuth();
  const dbProducts = await getProducts();

  return (
    <SiteContentProvider initialContent={{}} isAdmin={isAdmin}>
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FFE4EF" }}>
        {/* Simple Header */}
        <header style={{ padding: "40px 24px", textAlign: "center", background: "white", borderBottom: "4px solid #FF64A4", borderRadius: "0 0 40px 40px", boxShadow: "0 10px 30px rgba(255,100,164,0.15)" }}>
          <a href="/" className="k-font-quicksand" style={{ color: "#FF64A4", textDecoration: "none", fontWeight: 800, fontSize: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,100,164,0.1)", padding: "10px 20px", borderRadius: 999 }}>
            <span>←</span> Kembali ke Beranda
          </a>
          <h1 className="k-font-quicksand" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", margin: "24px 0 0", color: "#FF64A4", fontWeight: 800 }}>
            Semua Produk
          </h1>
          <p className="k-font-quicksand" style={{ color: "#4B5563", fontSize: 18, marginTop: 8, fontWeight: 500 }}>
            Pilih paket premium favoritmu di sini! 🎀
          </p>
        </header>

        {/* Full Grid Catalog */}
        <div style={{ flex: 1, padding: "40px 0" }}>
          <ProductCatalog dbProducts={dbProducts} variant="grid" hideHeader={true} />
        </div>

        <Footer />
      </main>
    </SiteContentProvider>
  );
}
