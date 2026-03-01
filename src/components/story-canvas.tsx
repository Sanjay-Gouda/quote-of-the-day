"use client";

import { forwardRef } from "react";
import type { Quote } from "@/lib/quotes";
import type { StoryTheme } from "@/lib/story-themes";

interface StoryCanvasProps {
  quote: Quote;
  theme: StoryTheme;
  platform: "whatsapp" | "instagram";
}

export const StoryCanvas = forwardRef<HTMLDivElement, StoryCanvasProps>(
  function StoryCanvas({ quote, theme, platform }, ref) {
    return (
      <div
        ref={ref}
        style={{
          background: theme.background,
          aspectRatio: "9 / 16",
          width: "100%",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-none"
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            background:
              "radial-gradient(circle at 70% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 px-8 sm:px-10 max-w-full">
          {/* Opening quote mark */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.accentColor}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>

          {/* Quote text */}
          <p
            className="text-center leading-relaxed font-light italic"
            style={{
              color: theme.textColor,
              fontSize: quote.text.length > 100 ? "1.1rem" : "1.35rem",
              letterSpacing: "-0.01em",
              lineHeight: "1.6",
            }}
          >
            {quote.text}
          </p>

          {/* Divider */}
          <div
            className="h-px w-10"
            style={{ backgroundColor: theme.accentColor }}
          />

          {/* Author */}
          <p
            className="text-center font-sans text-xs tracking-[0.2em] uppercase"
            style={{
              color: theme.accentColor,
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
          >
            {quote.author}
          </p>
        </div>

        {/* Bottom watermark */}
        <div
          className="absolute bottom-5 flex items-center gap-1.5"
          style={{ color: theme.accentColor, opacity: 0.5 }}
        >
          <span
            className="text-[9px] tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
          >
            Quote of the Day
          </span>
        </div>

        {/* Platform badge */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{
            backgroundColor:
              platform === "whatsapp"
                ? "rgba(37,211,102,0.15)"
                : "rgba(225,48,108,0.15)",
          }}
        >
          <span
            className="text-[8px] font-medium tracking-wider uppercase"
            style={{
              color:
                platform === "whatsapp"
                  ? "rgba(37,211,102,0.9)"
                  : "rgba(225,48,108,0.9)",
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
          >
            {platform === "whatsapp" ? "Status" : "Story"}
          </span>
        </div>
      </div>
    );
  }
);
