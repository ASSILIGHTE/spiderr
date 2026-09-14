export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  caption: string;
  speechBubble: string;
}

export interface StoryChapter {
  id: string;
  chapterNum: string;
  icon: string;
  title: string;
  subtitle: string;
  quote: string;
  color: 'red' | 'blue' | 'accent';
  image?: string;
}

export interface SuperpowerCard {
  id: string;
  icon: string;
  title: string;
  powerName: string;
  description: string;
  secretDetail: string;
  color: string;
}

export interface WebHeartMessage {
  id: number;
  x: number; // percentage
  y: number; // percentage
  message: string;
}

export interface SiteConfig {
  yourName: string;
  partnerName: string;
  birthdayDate: string; // ISO format or string
  anniversaryDate: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  letterTitle: string;
  letterContent: string[];
  finalRooftopQuote1: string;
  finalRooftopQuote2: string;
  memories: MemoryPhoto[];
  chapters: StoryChapter[];
  superpowers: SuperpowerCard[];
  webMessages: WebHeartMessage[];
}

export const defaultConfig: SiteConfig = {
  yourName: "Your Friendly Neighbor Spidey 🕷️",
  partnerName: "My Amazing Girl ❤️",
  birthdayDate: "2026-09-20T00:00:00",
  anniversaryDate: "2023-05-15",
  heroHeadline: "HAPPY BIRTHDAY, MY HERO ❤️",
  heroSubheadline: "Today, the world celebrates you. But I'm the lucky one who gets to love you.",
  heroImage: "/photos/photo1.jpeg",
  letterTitle: "A LETTER FROM YOUR FRIENDLY NEIGHBOR… ❤️",
  letterContent: [
    "Happy birthday, my love.",
    "Thank you for being there through the good days, the bad days, and all the little moments in between.",
    "You make my world brighter just by being in it.",
    "I hope this new chapter brings you everything you've been wishing for.",
    "And if I get to be beside you through it all, then I already have everything I need.",
    "Happy birthday, my favorite person.",
    "I love you. ❤️"
  ],
  finalRooftopQuote1: "Every hero needs someone to come home to.",
  finalRooftopQuote2: "And you're my home. ❤️",
  memories: [
    {
      id: "1",
      url: "/photos/photo1.jpeg",
      title: "First Superhero Stroll",
      date: "15 Mei 2023",
      caption: "Our first adventure ❤️",
      speechBubble: "THWIP! Best day ever!"
    },
    {
      id: "2",
      url: "/photos/photo2.jpeg",
      title: "Cozy Coffee Date",
      date: "24 Juni 2023",
      caption: "This moment still makes me smile.",
      speechBubble: "Spider-Sense says: Sweetness overload!"
    },
    {
      id: "3",
      url: "/photos/photo3.jpeg",
      title: "Sunset Rooftop View",
      date: "10 Agustus 2023",
      caption: "Watching the skyline with you.",
      speechBubble: "You light up the dark city! 🌃"
    },
    {
      id: "4",
      url: "/photos/photo4.jpeg",
      title: "Spontaneous Roadtrip",
      date: "02 Oktober 2023",
      caption: "Getting lost never felt so good.",
      speechBubble: "Partner in crime! 🚗💨"
    },
    {
      id: "5",
      url: "/photos/photo5.jpeg",
      title: "Late Night Talks",
      date: "14 November 2023",
      caption: "Hours pass like seconds with you.",
      speechBubble: "Under the stars with you ✨"
    },
    {
      id: "6",
      url: "/photos/photo6.jpeg",
      title: "Crazy Laughing Moment",
      date: "31 Desember 2023",
      caption: "Pure unscripted happiness.",
      speechBubble: "You make my heart swing! 🕸️"
    },
    {
      id: "7",
      url: "/photos/photo7.jpeg",
      title: "Rainy Day Hug",
      date: "14 Februari 2024",
      caption: "Warmest place in the world.",
      speechBubble: "Safe in your arms ❤️"
    },
    {
      id: "8",
      url: "/photos/photo8.jpeg",
      title: "Theme Park Fun",
      date: "20 Mei 2024",
      caption: "Riding rollercoasters together.",
      speechBubble: "Hero mode: ACTIVATED!"
    },
    {
      id: "9",
      url: "/photos/photo9.jpeg",
      title: "Birthday Prep Surprise",
      date: "Hari Ini ✨",
      caption: "Celebrating another amazing year.",
      speechBubble: "Happy Birthday, My Person! 🎂"
    }
  ],
  chapters: [
    {
      id: "ch1",
      chapterNum: "CHAPTER 01",
      icon: "🕷️",
      title: "The Day We Met",
      subtitle: "The Origin Story",
      quote: "Somehow, I didn't know that meeting you would become one of my favorite chapters.",
      color: "red",
      image: "/photos/photo2.jpeg"
    },
    {
      id: "ch2",
      chapterNum: "CHAPTER 02",
      icon: "❤️",
      title: "Our First Date",
      subtitle: "The Spark of Something New",
      quote: "An ordinary day that became an unforgettable memory.",
      color: "blue",
      image: "/photos/photo3.jpeg"
    },
    {
      id: "ch3",
      chapterNum: "CHAPTER 03",
      icon: "🕸️",
      title: "The Moment I Fell For You",
      subtitle: "Caught in Your Web",
      quote: "Somewhere along the way, you became my favorite person.",
      color: "accent",
      image: "/photos/photo5.jpeg"
    },
    {
      id: "ch4",
      chapterNum: "CHAPTER 04",
      icon: "🎂",
      title: "Your Birthday",
      subtitle: "Celebrating The Legend",
      quote: "And today, we celebrate the most amazing person I know.",
      color: "red",
      image: "/photos/photo9.jpeg"
    }
  ],
  superpowers: [
    {
      id: "sp1",
      icon: "🕷️",
      title: "SUPER SMILE",
      powerName: "Instant Joy Ray",
      description: "Your smile can instantly make my day better.",
      secretDetail: "Effect: Neutralizes all bad moods instantly and fills the room with warmth.",
      color: "red"
    },
    {
      id: "sp2",
      icon: "❤️",
      title: "SUPER HEART",
      powerName: "Empathy Shield & Love Aura",
      description: "You care about people in a way that makes you incredibly special.",
      secretDetail: "Effect: Endless compassion and the ability to make anyone feel truly valued.",
      color: "blue"
    },
    {
      id: "sp3",
      icon: "😂",
      title: "SUPER CHAOS",
      powerName: "Laughter Generator",
      description: "You somehow make even boring days fun.",
      secretDetail: "Effect: Turns ordinary moments into legendary core memories filled with giggles.",
      color: "accent"
    },
    {
      id: "sp4",
      icon: "✨",
      title: "SUPER YOU",
      powerName: "Ultimate Perfection",
      description: "You don't need superpowers. Being yourself is already enough.",
      secretDetail: "Effect: Loved unconditionally by your friendly neighbor forever and ever.",
      color: "red"
    }
  ],
  webMessages: [
    { id: 1, x: 22, y: 30, message: "You make me happy." },
    { id: 2, x: 78, y: 25, message: "I'm grateful for you." },
    { id: 3, x: 28, y: 72, message: "You're my favorite person." },
    { id: 4, x: 72, y: 75, message: "I love our memories." },
    { id: 5, x: 50, y: 50, message: "You're my home ❤️" }
  ]
};

const STORAGE_KEY = "spiderman_birthday_config_v1";

export function loadConfig(): SiteConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultConfig, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error("Failed to load custom config", e);
  }
  return defaultConfig;
}

export function saveConfig(config: SiteConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to save custom config", e);
  }
}
