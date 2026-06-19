"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

/* ================================================================
   KAWAII BACKGROUND
   Pure decorative layer — blobs + floating stickers + sparkles.
   Uses position:fixed so it stays behind all content (z-index: 0).
   No functionality is touched.
   ================================================================ */

const BLOBS = [
  { w: 420, h: 380, top: "-8%",  left: "-6%",  right: undefined, color: "#fbc8e6", delay: "0s",   dur: "13s" },
  { w: 340, h: 320, top: "12%",  left: undefined, right: "-5%",  color: "#c8e8fb", delay: "2s",   dur: "15s" },
  { w: 300, h: 280, top: "55%",  left: "-4%",  right: undefined, color: "#d4f5e2", delay: "4s",   dur: "12s" },
  { w: 280, h: 260, top: "70%",  left: undefined, right: "-4%",  color: "#fce8bb", delay: "1s",   dur: "17s" },
  { w: 200, h: 200, top: "40%",  left: "42%",  right: undefined, color: "#e8d5fb", delay: "3s",   dur: "11s" },
];

const STICKERS = [
  { emoji: "🌸", top: "8%",   left: "6%",   right: undefined, size: 38, animDelay: "0s",   speed: "6s",  rot: "-12deg" },
  { emoji: "⭐", top: "15%",  left: undefined, right: "8%",   size: 30, animDelay: "1s",   speed: "5s",  rot: "8deg"  },
  { emoji: "🍭", top: "28%",  left: "3%",   right: undefined, size: 34, animDelay: "2.5s", speed: "7s",  rot: "-6deg" },
  { emoji: "💜", top: "38%",  left: undefined, right: "5%",   size: 26, animDelay: "0.5s", speed: "8s",  rot: "14deg" },
  { emoji: "🌷", top: "55%",  left: "7%",   right: undefined, size: 32, animDelay: "3s",   speed: "6s",  rot: "-10deg"},
  { emoji: "✨", top: "62%",  left: undefined, right: "9%",   size: 28, animDelay: "1.5s", speed: "5s",  rot: "5deg"  },
  { emoji: "🎀", top: "75%",  left: "5%",   right: undefined, size: 36, animDelay: "4s",   speed: "9s",  rot: "-8deg" },
  { emoji: "🍑", top: "80%",  left: undefined, right: "6%",   size: 30, animDelay: "2s",   speed: "7s",  rot: "12deg" },
  { emoji: "💫", top: "90%",  left: "12%",  right: undefined, size: 28, animDelay: "0s",   speed: "6s",  rot: "-4deg" },
  { emoji: "🌙", top: "5%",   left: undefined, right: "16%",  size: 34, animDelay: "3.5s", speed: "10s", rot: "6deg"  },
  { emoji: "🦋", top: "47%",  left: "2%",   right: undefined, size: 30, animDelay: "2s",   speed: "8s",  rot: "-15deg"},
  { emoji: "🍬", top: "20%",  left: "18%",  right: undefined, size: 24, animDelay: "1s",   speed: "7s",  rot: "9deg"  },
  { emoji: "🌈", top: "85%",  left: undefined, right: "18%",  size: 32, animDelay: "4.5s", speed: "11s", rot: "-7deg" },
  { emoji: "💮", top: "32%",  left: undefined, right: "3%",   size: 28, animDelay: "5s",   speed: "9s",  rot: "3deg"  },
];

const SPARKLE_DOTS = [
  { top: "22%",  left: "15%",  color: "#FF64A4", size: 10 },
  { top: "44%",  left: "88%",  color: "#C9A8E8", size: 8  },
  { top: "68%",  left: "22%",  color: "#80d4f5", size: 12 },
  { top: "12%",  left: "55%",  color: "#FFD6B0", size: 8  },
  { top: "78%",  left: "70%",  color: "#FF64A4", size: 10 },
  { top: "90%",  left: "40%",  color: "#a8f5d0", size: 8  },
  { top: "35%",  left: "50%",  color: "#fce8bb", size: 6  },
];

export default function KawaiiBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes kKawaiiFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33%  { transform: translateY(-14px) rotate(3deg) scale(1.04); }
          66%  { transform: translateY(-6px) rotate(-2deg) scale(0.98); }
        }
        @keyframes kKawaiiBlobPulse {
          0%, 100% { opacity: 0.42; transform: scale(1); }
          50%      { opacity: 0.60; transform: scale(1.07); }
        }
        @keyframes kSparkleGlow {
          0%, 100% { transform: scale(1);   opacity: 0.55; }
          50%      { transform: scale(1.5); opacity: 0.9;  }
        }
      `}</style>

      {/* ── Pastel blobs ── */}
      {BLOBS.map((b, i) => (
        <div
          key={`blob-${i}`}
          style={{
            position: "fixed",
            width: b.w,
            height: b.h,
            top: b.top,
            left: b.left,
            right: b.right,
            background: `radial-gradient(ellipse at 40% 40%, ${b.color}CC, ${b.color}55)`,
            borderRadius: "50% 60% 50% 70% / 60% 50% 70% 50%",
            pointerEvents: "none",
            zIndex: 0,
            animation: `kKawaiiBlobPulse ${b.dur} ease-in-out infinite`,
            animationDelay: b.delay,
            filter: "blur(3px)",
          }}
        />
      ))}

      {/* ── Floating emoji stickers ── */}
      {STICKERS.map((s, i) => (
        <div
          key={`sticker-${i}`}
          style={{
            position: "fixed",
            top: s.top,
            left: s.left,
            right: s.right,
            fontSize: s.size,
            pointerEvents: "none",
            zIndex: 0,
            userSelect: "none",
            animation: `kKawaiiFloat ${s.speed} ease-in-out infinite`,
            animationDelay: s.animDelay,
            transform: `rotate(${s.rot})`,
            filter: "drop-shadow(0 3px 8px rgba(200,100,180,0.22))",
            lineHeight: 1,
            opacity: 0.75,
          }}
        >
          {s.emoji}
        </div>
      ))}

      {/* ── Sparkle dots ── */}
      {SPARKLE_DOTS.map((d, i) => (
        <div
          key={`dot-${i}`}
          style={{
            position: "fixed",
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: d.color,
            pointerEvents: "none",
            zIndex: 0,
            animation: `kSparkleGlow ${2.5 + i * 0.6}s ease-in-out infinite`,
            boxShadow: `0 0 ${d.size * 2}px ${d.color}99`,
          }}
        />
      ))}

      {/* ── Subtle polka dot grid (sticker-book feel) ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,182,217,0.15) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
        }}
      />
    </>
  );
}
