import { QuoteDisplay } from "@/components/quote-display";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-background selection:bg-foreground/10">
      <BackgroundPattern />

      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60">
          Quote of the Day
        </span>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center w-full px-6 py-24">
        <QuoteDisplay />
      </main>

      <footer className="pb-6 text-center">
        <p className="text-[11px] tracking-wider text-muted-foreground/40">
          A new quote every day to inspire your journey
        </p>
      </footer>
    </div>
  );
}

function BackgroundPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-primary/[0.02] blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 h-64 w-64 rounded-full bg-primary/[0.02] blur-3xl" />
    </div>
  );
}
