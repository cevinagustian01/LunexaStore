"use client";

import { useState, useEffect, useCallback } from "react";
import { getProducts, saveProduct, deleteProduct, getTestimonials, saveTestimonial, deleteTestimonial, getSiteContent, saveSiteContent } from "@/lib/db";
import type { Product, Testimonial, SiteContent } from "@/lib/db";
import Link from "next/link";

/* ================================================================
   ADMIN DASHBOARD — Lunexa Store
   Full CRUD for: products, testimonials, site_content
   ================================================================ */

// ── Toast Notification ──────────────────────────────────────────
type Toast = { id: number; msg: string; type: "success" | "error" | "info" };

// ── Blank form defaults ─────────────────────────────────────────
const BLANK_PRODUCT: Omit<Product, "id" | "created_at"> = {
  nama: "", harga: 0, gambar: "", stok: 0,
};
const BLANK_TESTI: Omit<Testimonial, "id" | "created_at"> = {
  username: "", avatar: "", rating: 5, komen: "",
};

// ── Shared style tokens ─────────────────────────────────────────
const S = {
  card: {
    background: "white",
    border: "2px solid #E8D5F5",
    borderRadius: 20,
    boxShadow: "0 4px 20px rgba(160,108,213,0.08)",
    padding: "24px",
  } as React.CSSProperties,
  input: {
    width: "100%", padding: "10px 14px", borderRadius: 12,
    border: "2px solid #E8D5F5", fontFamily: "Quicksand, sans-serif",
    fontSize: 14, fontWeight: 600, color: "#3b0764",
    outline: "none", transition: "border-color 0.2s",
    background: "#FDFAFF",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  label: {
    display: "block", marginBottom: 6,
    fontWeight: 700, fontSize: 12, color: "#7c3aed",
    fontFamily: "Nunito, sans-serif",
    letterSpacing: "0.04em", textTransform: "uppercase" as const,
  } as React.CSSProperties,
  btnPrimary: {
    padding: "10px 22px", borderRadius: 999,
    background: "linear-gradient(135deg, #f472b6, #a855f7)",
    color: "white", fontWeight: 800, fontSize: 13,
    border: "none", cursor: "pointer", fontFamily: "Nunito, sans-serif",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 14px rgba(244,114,182,0.35)",
  } as React.CSSProperties,
  btnSecondary: {
    padding: "10px 22px", borderRadius: 999,
    background: "transparent",
    color: "#7c3aed", fontWeight: 700, fontSize: 13,
    border: "2px solid #C9A8E8", cursor: "pointer", fontFamily: "Nunito, sans-serif",
  } as React.CSSProperties,
  btnDanger: {
    padding: "6px 14px", borderRadius: 999,
    background: "#fff1f2", color: "#e11d48",
    fontWeight: 700, fontSize: 12, border: "1.5px solid #fecdd3",
    cursor: "pointer", fontFamily: "Nunito, sans-serif",
  } as React.CSSProperties,
  btnEdit: {
    padding: "6px 14px", borderRadius: 999,
    background: "#eff6ff", color: "#2563eb",
    fontWeight: 700, fontSize: 12, border: "1.5px solid #bfdbfe",
    cursor: "pointer", fontFamily: "Nunito, sans-serif",
  } as React.CSSProperties,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"products" | "testimonials" | "content" | "socmed">("products");
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ── Products state ─────────────────────────────────────
  const [products, setProducts]     = useState<Product[]>([]);
  const [prodLoading, setProdLoading] = useState(false);
  const [prodModal, setProdModal]   = useState<"add" | "edit" | null>(null);
  const [editProd, setEditProd]     = useState<Product | null>(null);
  const [prodForm, setProdForm]     = useState(BLANK_PRODUCT);
  const [prodSaving, setProdSaving] = useState(false);

  // ── Testimonials state ─────────────────────────────────
  const [testis, setTestis]           = useState<Testimonial[]>([]);
  const [testiLoading, setTestiLoading] = useState(false);
  const [testiModal, setTestiModal]   = useState<"add" | "edit" | null>(null);
  const [editTesti, setEditTesti]     = useState<Testimonial | null>(null);
  const [testiForm, setTestiForm]     = useState(BLANK_TESTI);
  const [testiSaving, setTestiSaving] = useState(false);

  // ── Content state ──────────────────────────────────────
  const [contentItems, setContentItems] = useState<SiteContent[]>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentModal, setContentModal] = useState<"edit" | null>(null);
  const [editContent, setEditContent] = useState<SiteContent | null>(null);
  const [contentSaving, setContentSaving] = useState(false);

  // ── Socmed state ───────────────────────────────────────
  const [socmedWA, setSocmedWA] = useState("");
  const [socmedTG, setSocmedTG] = useState("");
  const [socmedIG, setSocmedIG] = useState("");
  const [socmedTT, setSocmedTT] = useState("");
  const [socmedSaving, setSocmedSaving] = useState(false);

  const saveSocmed = async () => {
    setSocmedSaving(true);
    try {
      await saveSiteContent("socmed_wa", socmedWA);
      await saveSiteContent("socmed_tg", socmedTG);
      await saveSiteContent("socmed_ig", socmedIG);
      await saveSiteContent("socmed_tt", socmedTT);
      toast("✨ Link sosial media berhasil disimpan!");
      fetchContent_();
    } catch (e: any) {
      toast(`Error: ${e.message}`, "error");
    }
    setSocmedSaving(false);
  };

  // Sync socmed state when content loads
  useEffect(() => {
    setSocmedWA(contentItems.find(c => c.id === "socmed_wa")?.value || "");
    setSocmedTG(contentItems.find(c => c.id === "socmed_tg")?.value || "");
    setSocmedIG(contentItems.find(c => c.id === "socmed_ig")?.value || "");
    setSocmedTT(contentItems.find(c => c.id === "socmed_tt")?.value || "");
  }, [contentItems]);

  // ── Toast helper ───────────────────────────────────────
  const toast = (msg: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  };

  // (Env check removed)

  // ════════════════════════════════════════════════════════
  //  PRODUCTS — CRUD
  // ════════════════════════════════════════════════════════
  const fetchProducts_ = useCallback(async () => {
    setProdLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e: any) {
      toast(`Gagal memuat produk: ${e.message}`, "error");
    }
    setProdLoading(false);
  }, []);

  const saveProduct_ = async () => {
    if (!prodForm.nama.trim()) return toast("Nama produk wajib diisi!", "error");
    if (prodForm.harga < 0)    return toast("Harga tidak boleh negatif!", "error");
    setProdSaving(true);
    try {
      if (prodModal === "add") {
        await saveProduct(prodForm);
        toast("✨ Produk berhasil ditambahkan!");
      } else if (prodModal === "edit" && editProd) {
        await saveProduct({ ...prodForm, id: editProd.id });
        toast("✅ Produk berhasil diperbarui!");
      }
      closeProdModal();
      fetchProducts_();
    } catch (e: any) {
      toast(`Error: ${e.message}`, "error");
    }
    setProdSaving(false);
  };

  const deleteProduct_ = async (id: string, nama: string) => {
    if (!confirm(`Hapus produk "${nama}"?`)) return;
    try {
      await deleteProduct(id);
      toast("🗑️ Produk dihapus!");
      fetchProducts_();
    } catch (e: any) {
      toast(`Gagal menghapus: ${e.message}`, "error");
    }
  };

  const openProdAdd = () => {
    setProdForm(BLANK_PRODUCT);
    setEditProd(null);
    setProdModal("add");
  };
  const openProdEdit = (p: Product) => {
    setProdForm({ nama: p.nama, harga: p.harga, gambar: p.gambar ?? "", stok: p.stok });
    setEditProd(p);
    setProdModal("edit");
  };
  const closeProdModal = () => { setProdModal(null); setEditProd(null); };

  // ════════════════════════════════════════════════════════
  //  TESTIMONIALS — CRUD
  // ════════════════════════════════════════════════════════
  const fetchTestis_ = useCallback(async () => {
    setTestiLoading(true);
    try {
      const data = await getTestimonials();
      setTestis(data);
    } catch (e: any) {
      toast(`Gagal memuat testimoni: ${e.message}`, "error");
    }
    setTestiLoading(false);
  }, []);

  const saveTesti_ = async () => {
    if (!testiForm.username.trim()) return toast("Username wajib diisi!", "error");
    if (!testiForm.komen.trim())   return toast("Komentar wajib diisi!", "error");
    setTestiSaving(true);
    try {
      if (testiModal === "add") {
        await saveTestimonial(testiForm);
        toast("✨ Testimoni berhasil ditambahkan!");
      } else if (testiModal === "edit" && editTesti) {
        await saveTestimonial({ ...testiForm, id: editTesti.id });
        toast("✅ Testimoni berhasil diperbarui!");
      }
      closeTestiModal();
      fetchTestis_();
    } catch (e: any) {
      toast(`Error: ${e.message}`, "error");
    }
    setTestiSaving(false);
  };

  const deleteTesti_ = async (id: string, username: string) => {
    if (!confirm(`Hapus testimoni dari "${username}"?`)) return;
    try {
      await deleteTestimonial(id);
      toast("🗑️ Testimoni dihapus!");
      fetchTestis_();
    } catch (e: any) {
      toast(`Gagal menghapus: ${e.message}`, "error");
    }
  };

  const openTestiAdd = () => {
    setTestiForm(BLANK_TESTI);
    setEditTesti(null);
    setTestiModal("add");
  };
  const openTestiEdit = (t: Testimonial) => {
    setTestiForm({ username: t.username, avatar: t.avatar ?? "", rating: t.rating, komen: t.komen });
    setEditTesti(t);
    setTestiModal("edit");
  };
  const closeTestiModal = () => { setTestiModal(null); setEditTesti(null); };

  // ════════════════════════════════════════════════════════
  //  CONTENT — CRUD
  // ════════════════════════════════════════════════════════
  const fetchContent_ = useCallback(async () => {
    setContentLoading(true);
    try {
      const data = await getSiteContent();
      setContentItems(data);
    } catch (e: any) {
      toast(`Gagal memuat konten: ${e.message}`, "error");
    }
    setContentLoading(false);
  }, []);

  const saveContent_ = async () => {
    if (!editContent || !editContent.value.trim()) return toast("Teks tidak boleh kosong!", "error");
    setContentSaving(true);
    try {
      await saveSiteContent(editContent.id, editContent.value);
      toast("✅ Konten web berhasil diperbarui!");
      closeContentModal();
      fetchContent_();
    } catch (e: any) {
      toast(`Error: ${e.message}`, "error");
    }
    setContentSaving(false);
  };

  const openContentEdit = (c: SiteContent) => {
    setEditContent({ ...c }); // Copy to allow editing
    setContentModal("edit");
  };
  const closeContentModal = () => { setContentModal(null); setEditContent(null); };

  // Load data on mount
  useEffect(() => { fetchProducts_(); fetchTestis_(); fetchContent_(); }, [fetchProducts_, fetchTestis_, fetchContent_]);

  // ════════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════════
  return (
    <>
      {/* ── Toast Notifications ── */}
      <div style={{ position: "fixed", top: 24, right: 24, zIndex: 999, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: "12px 20px", borderRadius: 14,
            background: t.type === "error" ? "#fff1f2" : t.type === "info" ? "#eff6ff" : "#f0fdf4",
            border: `1.5px solid ${t.type === "error" ? "#fecdd3" : t.type === "info" ? "#bfdbfe" : "#bbf7d0"}`,
            color: t.type === "error" ? "#be123c" : t.type === "info" ? "#1d4ed8" : "#15803d",
            fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            animation: "kFadeUp 0.3s ease-out",
            minWidth: 240, maxWidth: 320,
          }}>
            {t.msg}
          </div>
        ))}
      </div>

      {/* ── Modal: Products ── */}
      {prodModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(30,0,60,0.4)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}
          onClick={e => e.target === e.currentTarget && closeProdModal()}
        >
          <div style={{
            background: "white", borderRadius: 28, padding: "32px",
            width: "100%", maxWidth: 500,
            boxShadow: "0 24px 60px rgba(160,108,213,0.2)",
            border: "2px solid #E8D5F5",
            animation: "kFadeUp 0.25s ease-out",
          }}>
            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: "Pacifico, cursive", fontSize: 20 }}>
                  <span style={{
                    background: "linear-gradient(90deg, #ec4899, #a855f7)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    {prodModal === "add" ? "➕ Tambah Produk" : "✏️ Edit Produk"}
                  </span>
                </h2>
                {editProd && <p style={{ margin: "4px 0 0", color: "#9ca3af", fontSize: 12, fontFamily: "Quicksand, sans-serif" }}>ID: {editProd.id}</p>}
              </div>
              <button onClick={closeProdModal} style={{ background: "#f3e8ff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={S.label}>Nama Produk *</label>
                <input
                  style={S.input}
                  value={prodForm.nama}
                  onChange={e => setProdForm(p => ({ ...p, nama: e.target.value }))}
                  placeholder="cth: Netflix Premium 1 Bulan"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={S.label}>Harga (Rp) *</label>
                  <input
                    style={S.input} type="number" min={0}
                    value={prodForm.harga}
                    onChange={e => setProdForm(p => ({ ...p, harga: parseInt(e.target.value) || 0 }))}
                    placeholder="35000"
                  />
                </div>
                <div>
                  <label style={S.label}>Stok *</label>
                  <input
                    style={S.input} type="number" min={0}
                    value={prodForm.stok}
                    onChange={e => setProdForm(p => ({ ...p, stok: parseInt(e.target.value) || 0 }))}
                    placeholder="100"
                  />
                </div>
              </div>
              <div>
                <label style={S.label}>URL Gambar</label>
                <input
                  style={S.input}
                  value={prodForm.gambar ?? ""}
                  onChange={e => setProdForm(p => ({ ...p, gambar: e.target.value }))}
                  placeholder="https://example.com/gambar.png"
                />
              </div>

              {/* Preview harga */}
              {prodForm.harga > 0 && (
                <div style={{ background: "#fdf4ff", border: "1px dashed #c084fc", borderRadius: 12, padding: "10px 14px" }}>
                  <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13, color: "#7c3aed" }}>
                    💰 Harga: Rp {prodForm.harga.toLocaleString("id-ID")}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
              <button style={S.btnSecondary} onClick={closeProdModal}>Batal</button>
              <button
                style={{ ...S.btnPrimary, opacity: prodSaving ? 0.7 : 1 }}
                onClick={saveProduct_}
                disabled={prodSaving}
              >
                {prodSaving ? "Menyimpan..." : prodModal === "add" ? "Tambahkan ✨" : "Perbarui ✅"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Testimonials ── */}
      {testiModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(30,0,60,0.4)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}
          onClick={e => e.target === e.currentTarget && closeTestiModal()}
        >
          <div style={{
            background: "white", borderRadius: 28, padding: "32px",
            width: "100%", maxWidth: 500,
            boxShadow: "0 24px 60px rgba(160,108,213,0.2)",
            border: "2px solid #E8D5F5",
            animation: "kFadeUp 0.25s ease-out",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontFamily: "Pacifico, cursive", fontSize: 20 }}>
                <span style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {testiModal === "add" ? "➕ Tambah Testimoni" : "✏️ Edit Testimoni"}
                </span>
              </h2>
              <button onClick={closeTestiModal} style={{ background: "#f3e8ff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={S.label}>Username *</label>
                  <input
                    style={S.input}
                    value={testiForm.username}
                    onChange={e => setTestiForm(p => ({ ...p, username: e.target.value }))}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label style={S.label}>Avatar (emoji/url)</label>
                  <input
                    style={S.input}
                    value={testiForm.avatar ?? ""}
                    onChange={e => setTestiForm(p => ({ ...p, avatar: e.target.value }))}
                    placeholder="🐱 atau URL"
                  />
                </div>
              </div>

              <div>
                <label style={S.label}>Rating (1–5) *</label>
                {/* Star selector */}
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      onClick={() => setTestiForm(p => ({ ...p, rating: n }))}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: 28, lineHeight: 1,
                        filter: n <= testiForm.rating ? "none" : "grayscale(1) opacity(0.3)",
                        transform: n <= testiForm.rating ? "scale(1.1)" : "scale(1)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ alignSelf: "center", fontSize: 13, fontWeight: 700, color: "#7c3aed", fontFamily: "Nunito, sans-serif", marginLeft: 4 }}>
                    {testiForm.rating}/5
                  </span>
                </div>
              </div>

              <div>
                <label style={S.label}>Komentar *</label>
                <textarea
                  style={{ ...S.input, minHeight: 100, resize: "vertical" }}
                  value={testiForm.komen}
                  onChange={e => setTestiForm(p => ({ ...p, komen: e.target.value }))}
                  placeholder="Ceritakan pengalaman pelanggan..."
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
              <button style={S.btnSecondary} onClick={closeTestiModal}>Batal</button>
              <button
                style={{ ...S.btnPrimary, opacity: testiSaving ? 0.7 : 1 }}
                onClick={saveTesti_}
                disabled={testiSaving}
              >
                {testiSaving ? "Menyimpan..." : testiModal === "add" ? "Tambahkan ✨" : "Perbarui ✅"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Content ── */}
      {contentModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(30,0,60,0.4)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}
          onClick={e => e.target === e.currentTarget && closeContentModal()}
        >
          <div style={{
            background: "white", borderRadius: 28, padding: "32px",
            width: "100%", maxWidth: 600,
            boxShadow: "0 24px 60px rgba(160,108,213,0.2)",
            border: "2px solid #E8D5F5",
            animation: "kFadeUp 0.25s ease-out",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: "Pacifico, cursive", fontSize: 20 }}>
                  <span style={{
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    ✏️ Edit Teks Web
                  </span>
                </h2>
                <p style={{ margin: "4px 0 0", color: "#9ca3af", fontSize: 12, fontFamily: "Quicksand, sans-serif" }}>
                  ID: {editContent?.id} ({editContent?.section})
                </p>
              </div>
              <button onClick={closeContentModal} style={{ background: "#f3e8ff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={S.label}>Teks / Nilai *</label>
                <textarea
                  style={{ ...S.input, minHeight: 120, resize: "vertical" }}
                  value={editContent?.value ?? ""}
                  onChange={e => setEditContent(p => p ? { ...p, value: e.target.value } : null)}
                  placeholder="Isi teks di sini..."
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
              <button style={S.btnSecondary} onClick={closeContentModal}>Batal</button>
              <button
                style={{ ...S.btnPrimary, opacity: contentSaving ? 0.7 : 1 }}
                onClick={saveContent_}
                disabled={contentSaving}
              >
                {contentSaving ? "Menyimpan..." : "Perbarui ✅"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          MAIN LAYOUT
          ════════════════════════════════════════════════════ */}
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #F8F0FF 0%, #FFF0F8 100%)" }}>

        {/* ── Admin Header ── */}
        <header style={{
          background: "white",
          borderBottom: "2px solid #E8D5F5",
          padding: "0 32px",
          boxShadow: "0 2px 12px rgba(160,108,213,0.08)",
          position: "sticky", top: 0, zIndex: 50,
        }}>
          <div style={{
            maxWidth: 1300, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 64,
          }}>
            {/* Logo + breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "linear-gradient(135deg, #f472b6, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, boxShadow: "0 4px 10px rgba(244,114,182,0.3)",
              }}>✨</div>
              <div>
                <div style={{ fontFamily: "Pacifico, cursive", fontSize: 15 }}>
                  <span style={{
                    background: "linear-gradient(90deg, #ec4899, #a855f7)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>Lunexa Store</span>
                </div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 11, color: "#9ca3af" }}>
                  Admin Panel
                </div>
              </div>
              <div style={{ width: 1, height: 28, background: "#E8D5F5", margin: "0 8px" }} />
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13, color: "#7c3aed" }}>
                📊 Dashboard
              </span>
            </div>

            {/* Right actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Link
                href="/"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 16px", borderRadius: 999,
                  background: "#f3e8ff", color: "#7c3aed",
                  fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13,
                  textDecoration: "none", border: "1.5px solid #ddd6fe",
                }}
              >
                ← Kembali ke Situs
              </Link>
              <button
                onClick={async () => {
                  const { logout } = await import("@/lib/auth");
                  await logout();
                  window.location.href = "/";
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 16px", borderRadius: 999,
                  background: "#fff1f2", color: "#e11d48",
                  fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 13,
                  border: "1.5px solid #fecdd3", cursor: "pointer",
                }}
              >
                Logout 🚪
              </button>
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 24px" }}>

          {/* (Env Banner Removed) */}

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
            {[
              { label: "Total Produk", value: products.length, icon: "🛍️", color: "#ec4899", bg: "#fdf2f8" },
              { label: "Total Testimoni", value: testis.length, icon: "💬", color: "#8b5cf6", bg: "#faf5ff" },
              { label: "Stok Tersedia", value: products.reduce((s, p) => s + p.stok, 0), icon: "📦", color: "#2563eb", bg: "#eff6ff" },
              { label: "Avg Rating", value: testis.length ? (testis.reduce((s, t) => s + t.rating, 0) / testis.length).toFixed(1) + " ★" : "—", icon: "⭐", color: "#d97706", bg: "#fffbeb" },
            ].map(c => (
              <div key={c.label} style={{ ...S.card, padding: "20px", background: c.bg, borderColor: `${c.color}30` }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontFamily: "Pacifico, cursive", fontSize: 24, color: c.color }}>{c.value}</div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: 11, color: "#6b7280", marginTop: 2 }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* ── Tab Navigation ── */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "white", borderRadius: 16, padding: 6, border: "2px solid #E8D5F5", width: "fit-content" }}>
            {(["products", "testimonials", "content", "socmed"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer",
                  fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: 13,
                  transition: "all 0.2s ease",
                  background: activeTab === tab ? "linear-gradient(135deg, #f472b6, #a855f7)" : "transparent",
                  color: activeTab === tab ? "white" : "#6b7280",
                  boxShadow: activeTab === tab ? "0 4px 12px rgba(244,114,182,0.3)" : "none",
                }}
              >
                {tab === "products" ? "🛍️ Produk" : tab === "testimonials" ? "💬 Testimoni" : tab === "content" ? "📝 Konten Web" : "📱 Sosial Media"}
              </button>
            ))}
          </div>

          {/* ════════════════════════════════════════
              PRODUCTS TAB
              ════════════════════════════════════════ */}
          {activeTab === "products" && (
            <div>
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 20, color: "#1f2937" }}>
                    🛍️ Kelola Produk
                  </h2>
                  <p style={{ margin: "2px 0 0", fontFamily: "Quicksand, sans-serif", fontSize: 13, color: "#6b7280" }}>
                    {products.length} produk terdaftar
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={fetchProducts_} style={{ ...S.btnSecondary, padding: "9px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    🔄 Refresh
                  </button>
                  <button id="btn-add-product" onClick={openProdAdd} style={{ ...S.btnPrimary, display: "flex", alignItems: "center", gap: 6 }}>
                    ➕ Tambah Produk
                  </button>
                </div>
              </div>

              {/* Table */}
              <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
                {prodLoading ? (
                  <div style={{ padding: 48, textAlign: "center" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
                    <p style={{ fontFamily: "Nunito, sans-serif", color: "#8b5cf6", fontWeight: 700 }}>Memuat produk...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div style={{ padding: 48, textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                    <p style={{ fontFamily: "Nunito, sans-serif", color: "#9ca3af", fontWeight: 700 }}>Belum ada produk.</p>
                    <button onClick={openProdAdd} style={{ ...S.btnPrimary, marginTop: 12 }}>Tambah Produk Pertama ✨</button>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "linear-gradient(135deg, #fdf2f8, #faf5ff)" }}>
                          {["Nama Produk", "Harga", "Stok", "Gambar", "Aksi"].map(h => (
                            <th key={h} style={{
                              padding: "14px 20px", textAlign: "left",
                              fontFamily: "Nunito, sans-serif", fontWeight: 900,
                              fontSize: 12, color: "#7c3aed",
                              letterSpacing: "0.05em", textTransform: "uppercase",
                              borderBottom: "2px solid #E8D5F5",
                              whiteSpace: "nowrap",
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p, i) => (
                          <tr
                            key={p.id}
                            style={{
                              background: i % 2 === 0 ? "white" : "#FDFAFF",
                              borderBottom: "1px solid #F3E8FF",
                              transition: "background 0.15s",
                            }}
                          >
                            <td style={{ padding: "14px 20px", fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#1f2937", fontSize: 14 }}>
                              {p.nama}
                            </td>
                            <td style={{ padding: "14px 20px", fontFamily: "Quicksand, sans-serif", fontWeight: 700, color: "#ec4899", fontSize: 14, whiteSpace: "nowrap" }}>
                              Rp {p.harga.toLocaleString("id-ID")}
                            </td>
                            <td style={{ padding: "14px 20px" }}>
                              <span style={{
                                fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: 13,
                                padding: "3px 12px", borderRadius: 999,
                                background: p.stok > 10 ? "#f0fdf4" : p.stok > 0 ? "#fffbeb" : "#fff1f2",
                                color: p.stok > 10 ? "#15803d" : p.stok > 0 ? "#d97706" : "#be123c",
                                border: `1px solid ${p.stok > 10 ? "#bbf7d0" : p.stok > 0 ? "#fde68a" : "#fecdd3"}`,
                              }}>
                                {p.stok} unit
                              </span>
                            </td>
                            <td style={{ padding: "14px 20px", fontSize: 13, color: "#9ca3af", fontFamily: "Quicksand, sans-serif" }}>
                              {p.gambar ? (
                                <a href={p.gambar} target="_blank" rel="noopener" style={{ color: "#8b5cf6", fontWeight: 700, textDecoration: "none" }}>🖼️ Lihat</a>
                              ) : (
                                <span style={{ color: "#d1d5db" }}>—</span>
                              )}
                            </td>
                            <td style={{ padding: "14px 20px" }}>
                              <div style={{ display: "flex", gap: 8 }}>
                                <button
                                  id={`btn-edit-product-${p.id}`}
                                  onClick={() => openProdEdit(p)}
                                  style={S.btnEdit}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  id={`btn-delete-product-${p.id}`}
                                  onClick={() => deleteProduct_(p.id, p.nama)}
                                  style={S.btnDanger}
                                >
                                  🗑️ Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════
              TESTIMONIALS TAB
              ════════════════════════════════════════ */}
          {activeTab === "testimonials" && (
            <div>
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 20, color: "#1f2937" }}>
                    💬 Kelola Testimoni
                  </h2>
                  <p style={{ margin: "2px 0 0", fontFamily: "Quicksand, sans-serif", fontSize: 13, color: "#6b7280" }}>
                    {testis.length} testimoni terdaftar
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={fetchTestis_} style={{ ...S.btnSecondary, padding: "9px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    🔄 Refresh
                  </button>
                  <button id="btn-add-testimonial" onClick={openTestiAdd} style={{ ...S.btnPrimary, display: "flex", alignItems: "center", gap: 6 }}>
                    ➕ Tambah Testimoni
                  </button>
                </div>
              </div>

              {/* Cards grid */}
              {testiLoading ? (
                <div style={{ ...S.card, padding: 48, textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>💫</div>
                  <p style={{ fontFamily: "Nunito, sans-serif", color: "#8b5cf6", fontWeight: 700 }}>Memuat testimoni...</p>
                </div>
              ) : testis.length === 0 ? (
                <div style={{ ...S.card, padding: 48, textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
                  <p style={{ fontFamily: "Nunito, sans-serif", color: "#9ca3af", fontWeight: 700 }}>Belum ada testimoni.</p>
                  <button onClick={openTestiAdd} style={{ ...S.btnPrimary, marginTop: 12 }}>Tambah Testimoni Pertama ✨</button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                  {testis.map(t => (
                    <div key={t.id} style={{ ...S.card, position: "relative" }}>
                      {/* Star badge */}
                      <div style={{
                        position: "absolute", top: 16, right: 16,
                        background: "#fffbeb", border: "1.5px solid #fde68a",
                        borderRadius: 999, padding: "2px 10px",
                        fontFamily: "Nunito, sans-serif", fontWeight: 800,
                        fontSize: 12, color: "#d97706",
                      }}>
                        {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)} {t.rating}/5
                      </div>

                      {/* User */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingRight: 80 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: "50%",
                          background: "linear-gradient(135deg, #f472b6, #a855f7)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: t.avatar && t.avatar.length <= 2 ? 24 : 14,
                          border: "2px solid white",
                          boxShadow: "0 3px 8px rgba(244,114,182,0.25)",
                          flexShrink: 0,
                          overflow: "hidden",
                        }}>
                          {t.avatar || "👤"}
                        </div>
                        <div>
                          <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, color: "#1f2937", fontSize: 14 }}>{t.username}</div>
                          <div style={{ fontFamily: "Quicksand, sans-serif", fontSize: 11, color: "#9ca3af" }}>
                            {t.created_at ? new Date(t.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" }) : "—"}
                          </div>
                        </div>
                      </div>

                      {/* Comment */}
                      <p style={{
                        margin: "0 0 16px",
                        fontFamily: "Quicksand, sans-serif", fontSize: 13, color: "#4b5563",
                        lineHeight: 1.65,
                        background: "#FDFAFF", borderRadius: 12, padding: "10px 12px",
                        border: "1px solid #F3E8FF",
                      }}>
                        &ldquo;{t.komen}&rdquo;
                      </p>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          id={`btn-edit-testi-${t.id}`}
                          onClick={() => openTestiEdit(t)}
                          style={S.btnEdit}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          id={`btn-delete-testi-${t.id}`}
                          onClick={() => deleteTesti_(t.id, t.username)}
                          style={S.btnDanger}
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════
              CONTENT TAB
              ════════════════════════════════════════ */}
          {activeTab === "content" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 20, color: "#1f2937" }}>
                    📝 Kelola Konten Web
                  </h2>
                  <p style={{ margin: "2px 0 0", fontFamily: "Quicksand, sans-serif", fontSize: 13, color: "#6b7280" }}>
                    Ubah teks pada landing page langsung dari sini
                  </p>
                </div>
                <button onClick={fetchContent_} style={{ ...S.btnSecondary, padding: "9px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                  🔄 Refresh
                </button>
              </div>

              {contentLoading ? (
                <div style={{ ...S.card, padding: 48, textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
                  <p style={{ fontFamily: "Nunito, sans-serif", color: "#8b5cf6", fontWeight: 700 }}>Memuat konten...</p>
                </div>
              ) : contentItems.length === 0 ? (
                <div style={{ ...S.card, padding: 48, textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
                  <p style={{ fontFamily: "Nunito, sans-serif", color: "#9ca3af", fontWeight: 700 }}>Belum ada konten dinamis.</p>
                </div>
              ) : (
                <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "linear-gradient(135deg, #eff6ff, #faf5ff)" }}>
                        {["Section", "ID", "Teks / Nilai", "Aksi"].map(h => (
                          <th key={h} style={{
                            padding: "14px 20px", textAlign: "left",
                            fontFamily: "Nunito, sans-serif", fontWeight: 900,
                            fontSize: 12, color: "#3b82f6",
                            letterSpacing: "0.05em", textTransform: "uppercase",
                            borderBottom: "2px solid #bfdbfe",
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((c, i) => (
                        <tr
                          key={c.id}
                          style={{
                            background: i % 2 === 0 ? "white" : "#f8fafc",
                            borderBottom: "1px solid #e2e8f0",
                          }}
                        >
                          <td style={{ padding: "14px 20px" }}>
                            <span style={{
                              fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: 11,
                              padding: "4px 10px", borderRadius: 999,
                              background: "#e0e7ff", color: "#4338ca",
                              textTransform: "uppercase"
                            }}>
                              {c.section}
                            </span>
                          </td>
                          <td style={{ padding: "14px 20px", fontFamily: "Quicksand, sans-serif", fontSize: 13, color: "#64748b" }}>
                            <code>{c.id}</code>
                          </td>
                          <td style={{ padding: "14px 20px", fontFamily: "Quicksand, sans-serif", fontSize: 14, color: "#1e293b", maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {c.value}
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <button
                              onClick={() => openContentEdit(c)}
                              style={S.btnEdit}
                            >
                              ✏️ Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════
              SOCMED TAB
              ════════════════════════════════════════ */}
          {activeTab === "socmed" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 20, color: "#1f2937" }}>
                    📱 Kelola Sosial Media
                  </h2>
                  <p style={{ margin: "2px 0 0", fontFamily: "Quicksand, sans-serif", fontSize: 13, color: "#6b7280" }}>
                    Atur link kontak yang akan ditampilkan di Footer.
                  </p>
                </div>
              </div>

              <div style={{ ...S.card, maxWidth: 600 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={S.label}>WhatsApp URL</label>
                    <input style={S.input} value={socmedWA} onChange={e => setSocmedWA(e.target.value)} placeholder="https://wa.me/628..." />
                  </div>
                  <div>
                    <label style={S.label}>Telegram URL</label>
                    <input style={S.input} value={socmedTG} onChange={e => setSocmedTG(e.target.value)} placeholder="https://t.me/..." />
                  </div>
                  <div>
                    <label style={S.label}>Instagram URL</label>
                    <input style={S.input} value={socmedIG} onChange={e => setSocmedIG(e.target.value)} placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <label style={S.label}>TikTok URL</label>
                    <input style={S.input} value={socmedTT} onChange={e => setSocmedTT(e.target.value)} placeholder="https://tiktok.com/@..." />
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button onClick={saveSocmed} disabled={socmedSaving} style={{ ...S.btnPrimary, width: "100%", opacity: socmedSaving ? 0.7 : 1 }}>
                      {socmedSaving ? "Menyimpan..." : "Simpan Perubahan ✨"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "24px", borderTop: "1px solid #E8D5F5", marginTop: 40 }}>
          <p style={{ fontFamily: "Quicksand, sans-serif", fontSize: 12, color: "#9ca3af", margin: 0 }}>
            ✨ Lunexa Store Admin Panel · Data disimpan di{" "}
            <a href="https://supabase.com" target="_blank" rel="noopener" style={{ color: "#8b5cf6", fontWeight: 700, textDecoration: "none" }}>Supabase</a>
          </p>
        </footer>
      </div>
    </>
  );
}
