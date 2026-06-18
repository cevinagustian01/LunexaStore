"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(password);
      if (res.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(res.error || "Login gagal");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #FFFBF9 0%, #F5EEFF 100%)",
      padding: 24
    }}>
      <div style={{
        background: "white", padding: 40, borderRadius: 24, width: "100%", maxWidth: 400,
        boxShadow: "0 10px 40px rgba(160,108,213,0.15)", border: "2px solid #E8D5F5",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h1 style={{ fontFamily: "Pacifico, cursive", color: "#ec4899", margin: "0 0 8px", fontSize: 32 }}>Admin Login</h1>
        <p style={{ fontFamily: "Quicksand, sans-serif", color: "#6b7280", margin: "0 0 32px", fontSize: 14 }}>
          Silakan masukkan password rahasia untuk mengakses dashboard.
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "14px 20px", borderRadius: 16, border: "2px solid #E8D5F5",
              fontFamily: "Nunito, sans-serif", fontSize: 16, outline: "none",
              background: "#FDFAFF", transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#f472b6"}
            onBlur={(e) => e.target.style.borderColor = "#E8D5F5"}
          />
          {error && <p style={{ color: "#e11d48", fontSize: 13, margin: 0, fontFamily: "Quicksand, sans-serif", fontWeight: 700 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              padding: "14px", borderRadius: 16, background: "linear-gradient(135deg, #f472b6, #a855f7)",
              color: "white", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer",
              fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 14px rgba(244,114,182,0.35)",
              opacity: (loading || !password) ? 0.7 : 1
            }}
          >
            {loading ? "Mengecek..." : "Masuk ✨"}
          </button>
        </form>
      </div>
    </div>
  );
}
