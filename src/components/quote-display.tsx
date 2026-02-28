"use client";

import { useCallback, useEffect, useState } from "react";
import { Quote, getQuoteOfTheDay, quotes } from "@/lib/quotes";
import {
  RefreshCw,
  Share2,
  Copy,
  Check,
  Quote as QuoteIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function QuoteDisplay() {
  const [quote, setQuote] = useState<Quote>(getQuoteOfTheDay());
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNewQuote = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * quotes.length);
      } while (quotes[randomIndex].text === quote.text && quotes.length > 1);
      setQuote(quotes[randomIndex]);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  }, [isAnimating, quote.text]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        handleNewQuote();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNewQuote]);

  async function handleCopy() {
    const text = `"${quote.text}" — ${quote.author}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    const text = `"${quote.text}" — ${quote.author}`;
    if (navigator.share) {
      await navigator.share({ title: "Quote of the Day", text });
    } else {
      await handleCopy();
    }
  }

  return (
    <div
      className={`flex flex-col items-center gap-10 transition-all duration-500 ease-out ${
        isAnimating
          ? "opacity-0 translate-y-3 scale-[0.99]"
          : "opacity-100 translate-y-0 scale-100"
      }`}
    >
      <QuoteIcon
        className="h-8 w-8 text-muted-foreground/20"
        strokeWidth={1.5}
      />

      <blockquote className="text-center max-w-2xl px-6">
        <p className="text-2xl sm:text-3xl md:text-[2.5rem] md:leading-[1.4] font-light leading-relaxed tracking-tight text-foreground font-serif italic">
          {quote.text}
        </p>
      </blockquote>

      <div className="flex flex-col items-center gap-3">
        <Separator className="w-12 bg-muted-foreground/15" />
        <cite className="not-italic text-sm sm:text-base font-medium tracking-[0.15em] uppercase text-muted-foreground">
          {quote.author}
        </cite>
        <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/40 font-medium">
          {quote.category}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-2 text-xs font-medium tracking-wide h-9 px-5 border-border/50 hover:border-border hover:bg-accent transition-all"
          onClick={handleNewQuote}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 transition-transform ${isAnimating ? "animate-spin" : ""}`}
          />
          New Quote
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          onClick={handleCopy}
          aria-label="Copy quote"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          onClick={handleShare}
          aria-label="Share quote"
        >
          <Share2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <p className="text-[10px] text-muted-foreground/30 tracking-wider mt-2">
        Press <kbd className="px-1.5 py-0.5 rounded border border-border/50 text-[10px] font-mono">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded border border-border/50 text-[10px] font-mono">&rarr;</kbd> for a new quote
      </p>
    </div>
  );
}
