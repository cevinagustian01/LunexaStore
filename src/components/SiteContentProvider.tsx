"use client";

import React, { createContext, useContext, useState } from "react";

type SiteContentContextType = {
  contentMap: Record<string, string>;
  isLoading: boolean;
  isAdmin: boolean;
};

const SiteContentContext = createContext<SiteContentContextType>({
  contentMap: {},
  isLoading: true,
  isAdmin: false,
});

export function SiteContentProvider({
  children,
  initialContent = {},
  isAdmin = false,
}: {
  children: React.ReactNode;
  initialContent?: Record<string, string>;
  isAdmin?: boolean;
}) {
  const [contentMap] = useState<Record<string, string>>(initialContent);
  const isLoading = Object.keys(initialContent).length === 0;

  return (
    <SiteContentContext.Provider value={{ contentMap, isLoading, isAdmin }}>
      {children}
    </SiteContentContext.Provider>
  );
}

// Hook for components to use
export function useSiteContent(id: string, fallback: string): { text: string; isAdmin: boolean } {
  const { contentMap, isLoading, isAdmin } = useContext(SiteContentContext);
  // Return fallback while loading if the key doesn't exist yet, 
  // or return the mapped value, or the fallback if not found.
  let text = fallback;
  if (!isLoading || contentMap[id]) {
    text = contentMap[id] ?? fallback;
  }
  return { text, isAdmin };
}
