import { getSiteContent, getTestimonials, getProducts } from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { SiteContentProvider } from "@/components/SiteContentProvider";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import ProductCatalog from "@/components/ProductCatalog";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// Set revalidate if you want the page to cache and revalidate in background, 
// or set dynamic = "force-dynamic" for real-time. We'll use force-dynamic so changes in admin reflect immediately.
export const dynamic = "force-dynamic";

export default async function Home() {
  const isAdmin = await checkAuth();

  // Fetch initial content server-side for fast rendering and SEO
  const data = await getSiteContent();
  const dbTestimonials = await getTestimonials();
  const dbProducts = await getProducts();

  const contentMap: Record<string, string> = {};
  if (data) {
    data.forEach((item) => {
      contentMap[item.id] = item.value;
    });
  }

  return (
    <SiteContentProvider initialContent={contentMap} isAdmin={isAdmin}>
      <main style={{ position: "relative", zIndex: 1 }}>
        {/* AIDA: Attention */}
        <Header />
        <HeroSection />
        <Features />
        {/* AIDA: Desire */}
        <ProductCatalog dbProducts={dbProducts} />
        <Testimonials dbTestimonials={dbTestimonials} />
        {/* AIDA: Action */}
        <FAQ />
        <Footer />
      </main>
    </SiteContentProvider>
  );
}
