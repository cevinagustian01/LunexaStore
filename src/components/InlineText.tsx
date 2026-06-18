"use client";

import React, { useState } from "react";
import { useSiteContent } from "./SiteContentProvider";
import { saveSiteContent } from "@/lib/db";

type Props = {
  id: string;
  fallback: string;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  className?: string;
};

export default function InlineText({
  id,
  fallback,
  as: Component = "span",
  style = {},
  className = "",
}: Props) {
  const { text, isAdmin } = useSiteContent(id, fallback);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const [saving, setSaving] = useState(false);

  // Update draft if text from context changes
  React.useEffect(() => {
    setDraft(text);
  }, [text]);

  if (!isAdmin) {
    return (
      <Component className={className} style={style}>
        {text}
      </Component>
    );
  }

  const handleSave = async () => {
    if (draft.trim() === text) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    try {
      await saveSiteContent(id, draft.trim() || fallback);
      setIsEditing(false);
    } catch (e) {
      console.error("Failed to save inline text", e);
      alert("Gagal menyimpan teks.");
    }
    setSaving(false);
  };

  if (isEditing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") {
            setDraft(text);
            setIsEditing(false);
          }
        }}
        onBlur={handleSave}
        disabled={saving}
        style={{
          ...style,
          background: "rgba(255,255,255,0.9)",
          border: "2px dashed #ec4899",
          borderRadius: 4,
          padding: "2px 6px",
          outline: "none",
          minWidth: "100px",
          color: "black",
        }}
      />
    );
  }

  return (
    <Component
      className={className}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(true);
      }}
      title="Klik untuk mengedit"
      style={{
        ...style,
        cursor: "pointer",
        outline: "2px dashed transparent",
        transition: "outline 0.2s",
      }}
      onMouseEnter={(e: any) => {
        e.currentTarget.style.outline = "2px dashed #ec4899";
        e.currentTarget.style.outlineOffset = "4px";
      }}
      onMouseLeave={(e: any) => {
        e.currentTarget.style.outline = "2px dashed transparent";
        e.currentTarget.style.outlineOffset = "0px";
      }}
    >
      {text}
    </Component>
  );
}
