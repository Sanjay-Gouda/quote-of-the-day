import { QuoteDisplay } from "@/components/quote-display";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-background selection:bg-foreground/10 overflow-hidden">
      <BackgroundDecor />

      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 sm:px-8 py-5">
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/50 select-none">
          Quote of the Day
        </span>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center w-full px-6 py-28">
        <QuoteDisplay />
      </main>

      <footer className="pb-8 text-center">
        <p className="text-[11px] tracking-[0.15em] text-muted-foreground/30 select-none">
          A new quote every day to inspire your journey
        </p>
      </footer>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-primary/[0.015] blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-primary/[0.015] blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.008] blur-[120px]" />
    </div>
  );
}
