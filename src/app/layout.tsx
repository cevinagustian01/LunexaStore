import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lunexa Store ✨ | Nonton Sepuasnya Tanpa Iklan!",
  description: "Lunexa Store - Akses streaming premium Netflix, Viu, Vidio & Spotify dengan harga super terjangkau. Nonton sepuasnya tanpa iklan! 🌸",
  keywords: "netflix premium, viu premium, spotify premium, streaming murah, akun premium, lunexa store",
  openGraph: {
    title: "Lunexa Store ✨",
    description: "Nonton Sepuasnya Tanpa Iklan! Akses streaming premium terjangkau.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Nunito:wght@400;500;600;700;800;900&family=Dancing+Script:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
