"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SiteMedia, fallbackMedia } from "@/data/media";

interface MediaContextValue {
  media: SiteMedia;
  isLoading: boolean;
}

const MediaContext = createContext<MediaContextValue>({
  media: fallbackMedia,
  isLoading: true,
});

export function MediaProvider({ children }: { children: ReactNode }) {
  const [media, setMedia] = useState<SiteMedia>(fallbackMedia);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/media", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json?.data) {
          setMedia(json.data as SiteMedia);
        }
      })
      .catch(() => {
        // network error - keep fallbackMedia, UI degrades to placeholder/gradient
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <MediaContext.Provider value={{ media, isLoading }}>{children}</MediaContext.Provider>;
}

export function useMedia() {
  return useContext(MediaContext);
}
