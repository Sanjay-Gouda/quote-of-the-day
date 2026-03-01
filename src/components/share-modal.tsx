"use client";

import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Check, MessageCircle, Instagram } from "lucide-react";
import type { Quote } from "@/lib/quotes";
import { storyThemes, type StoryTheme } from "@/lib/story-themes";
import { StoryCanvas } from "@/components/story-canvas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ShareModalProps {
  quote: Quote;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareModal({ quote, open, onOpenChange }: ShareModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<StoryTheme>(
    storyThemes[0]
  );
  const [platform, setPlatform] = useState<"whatsapp" | "instagram">(
    "whatsapp"
  );
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback((value: string) => {
    setPlatform(value as "whatsapp" | "instagram");
    setExported(false);
  }, []);

  const generateImage = useCallback(async (): Promise<string | null> => {
    if (!canvasRef.current) return null;
    setExporting(true);
    try {
      const elementWidth = canvasRef.current.offsetWidth;
      const scale = 1080 / elementWidth;

      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: scale,
        cacheBust: true,
      });
      return dataUrl;
    } catch {
      return null;
    } finally {
      setExporting(false);
    }
  }, []);

  const downloadImage = useCallback(
    async (dataUrl: string) => {
      const link = document.createElement("a");
      link.download = `quote-${platform}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    },
    [platform]
  );

  const handleShareWhatsApp = useCallback(async () => {
    setExporting(true);
    try {
      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "quote-status.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Quote of the Day",
          text: `"${quote.text}" — ${quote.author}`,
        });
      } else {
        await downloadImage(dataUrl);
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`"${quote.text}" — ${quote.author}`)}`,
          "_blank"
        );
      }
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } finally {
      setExporting(false);
    }
  }, [generateImage, downloadImage, quote]);

  const handleShareInstagram = useCallback(async () => {
    setExporting(true);
    try {
      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "quote-story.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Quote of the Day",
        });
      } else {
        await downloadImage(dataUrl);
      }
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } finally {
      setExporting(false);
    }
  }, [generateImage, downloadImage]);

  const handleConfirmShare = useCallback(() => {
    if (platform === "whatsapp") {
      handleShareWhatsApp();
    } else {
      handleShareInstagram();
    }
  }, [platform, handleShareWhatsApp, handleShareInstagram]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-base font-semibold tracking-tight">
            Share as Story
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Preview how your quote will look, pick a style, then share.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="whatsapp"
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="px-6">
            <TabsList className="w-full">
              <TabsTrigger value="whatsapp" className="flex-1 gap-2 text-xs">
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp Status
              </TabsTrigger>
              <TabsTrigger value="instagram" className="flex-1 gap-2 text-xs">
                <Instagram className="h-3.5 w-3.5" />
                Instagram Story
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="whatsapp" className="mt-0">
            <StoryPreviewSection
              quote={quote}
              platform="whatsapp"
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              canvasRef={canvasRef}
            />
          </TabsContent>

          <TabsContent value="instagram" className="mt-0">
            <StoryPreviewSection
              quote={quote}
              platform="instagram"
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              canvasRef={canvasRef}
            />
          </TabsContent>
        </Tabs>

        {/* Action footer */}
        <div className="flex items-center gap-2 p-6 pt-2 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-10 text-xs tracking-wide gap-2"
            onClick={async () => {
              const dataUrl = await generateImage();
              if (dataUrl) await downloadImage(dataUrl);
            }}
            disabled={exporting}
          >
            <Download className="h-3.5 w-3.5" />
            Download Image
          </Button>
          <Button
            size="sm"
            className="flex-1 h-10 text-xs tracking-wide gap-2"
            onClick={handleConfirmShare}
            disabled={exporting}
          >
            {exported ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Shared!
              </>
            ) : exporting ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Preparing...
              </>
            ) : (
              <>
                {platform === "whatsapp" ? (
                  <MessageCircle className="h-3.5 w-3.5" />
                ) : (
                  <Instagram className="h-3.5 w-3.5" />
                )}
                Share to{" "}
                {platform === "whatsapp" ? "WhatsApp" : "Instagram"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StoryPreviewSection({
  quote,
  platform,
  selectedTheme,
  onThemeChange,
  canvasRef,
}: {
  quote: Quote;
  platform: "whatsapp" | "instagram";
  selectedTheme: StoryTheme;
  onThemeChange: (theme: StoryTheme) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-5">
      {/* Phone frame preview */}
      <div className="relative w-full max-w-[240px]">
        <div className="rounded-[1.5rem] border-2 border-border/30 bg-black p-1.5 shadow-xl">
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 h-4 w-20 rounded-full bg-black" />
          <div className="overflow-hidden rounded-[1.2rem]">
            <StoryCanvas
              ref={canvasRef}
              quote={quote}
              theme={selectedTheme}
              platform={platform}
            />
          </div>
        </div>
      </div>

      {/* Theme selector */}
      <div className="w-full">
        <p className="text-[11px] text-muted-foreground/60 tracking-wider uppercase mb-2.5 text-center font-medium">
          Choose a style
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          {storyThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme)}
              className={`group relative h-9 w-9 rounded-full transition-all duration-200 hover:scale-110 ${
                selectedTheme.id === theme.id
                  ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110"
                  : "ring-1 ring-border/50"
              }`}
              style={{ background: theme.background }}
              aria-label={`${theme.name} theme`}
            >
              <span className="sr-only">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
