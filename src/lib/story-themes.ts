export interface StoryTheme {
  id: string;
  name: string;
  background: string;
  textColor: string;
  accentColor: string;
}

export const storyThemes: StoryTheme[] = [
  {
    id: "midnight",
    name: "Midnight",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    textColor: "#ffffff",
    accentColor: "rgba(255,255,255,0.4)",
  },
  {
    id: "sunset",
    name: "Sunset",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff9a76 100%)",
    textColor: "#ffffff",
    accentColor: "rgba(255,255,255,0.5)",
  },
  {
    id: "ocean",
    name: "Ocean",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    accentColor: "rgba(255,255,255,0.4)",
  },
  {
    id: "forest",
    name: "Forest",
    background: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    textColor: "#ffffff",
    accentColor: "rgba(255,255,255,0.4)",
  },
  {
    id: "minimal-light",
    name: "Light",
    background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
    textColor: "#1a1a1a",
    accentColor: "rgba(0,0,0,0.35)",
  },
  {
    id: "noir",
    name: "Noir",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
    textColor: "#e0e0e0",
    accentColor: "rgba(255,255,255,0.25)",
  },
  {
    id: "peach",
    name: "Peach",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    textColor: "#2d1b0e",
    accentColor: "rgba(45,27,14,0.35)",
  },
  {
    id: "aurora",
    name: "Aurora",
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #667eea 100%)",
    textColor: "#0a2a1a",
    accentColor: "rgba(10,42,26,0.35)",
  },
];
