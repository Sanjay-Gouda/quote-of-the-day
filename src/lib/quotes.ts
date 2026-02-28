export interface Quote {
  text: string;
  author: string;
  category: string;
}

export const quotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Work",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Resilience",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "Hope",
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "Life",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
  },
  {
    text: "Get busy living or get busy dying.",
    author: "Stephen King",
    category: "Motivation",
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    category: "Life",
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "Mindset",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
    category: "Purpose",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "Action",
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "Authenticity",
  },
  {
    text: "If you look at what you have in life, you'll always have more.",
    author: "Oprah Winfrey",
    category: "Gratitude",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Resilience",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Belief",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "Impact",
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: "Strength",
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    category: "Happiness",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "Courage",
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: "Courage",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Perseverance",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: "Perseverance",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    category: "Action",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    category: "Excellence",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams",
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
    category: "Growth",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    category: "Action",
  },
  {
    text: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
    category: "Beginnings",
  },
  {
    text: "Keep your face always toward the sunshine, and shadows will fall behind you.",
    author: "Walt Whitman",
    category: "Optimism",
  },
  {
    text: "Turn your wounds into wisdom.",
    author: "Oprah Winfrey",
    category: "Growth",
  },
  {
    text: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
    category: "Change",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: "Action",
  },
];

export function getQuoteOfTheDay(): Quote {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return quotes[dayOfYear % quotes.length];
}
