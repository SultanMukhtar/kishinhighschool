"use client";

import { useMedia } from "@/context/MediaContext";

interface KishinLogoProps {
  /** Diameter of the circular mark, in pixels. */
  size?: number;
  className?: string;
}

/**
 * The school crest - renders the logo image from the Media sheet when
 * configured, otherwise falls back to the "刃" kanji placeholder mark.
 */
export default function KishinLogo({ size = 40, className = "" }: KishinLogoProps) {
  const { media } = useMedia();
  const fontSize = Math.max(12, Math.round(size * 0.45));

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-kishin-red/60 bg-kishin-inset/60 ${className}`}
      style={{ width: size, height: size }}
    >
      {media.logoUrl ? (
        // Logo comes from an arbitrary external URL managed in the spreadsheet -
        // next/image's domain allow-listing doesn't fit that, so a plain <img> is used.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.logoUrl}
          alt="Kishin High School"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-display text-kishin-red" style={{ fontSize }}>
          刃
        </span>
      )}
    </div>
  );
}
