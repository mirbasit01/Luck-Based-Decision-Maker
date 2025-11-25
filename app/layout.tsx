import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luck-Based Decision Maker",
  description:
    "A fun Next.js app that helps you make decisions using a 3-round luck-based point battle!",
  keywords: [
    "Luck Decision Maker",
    "Next.js",
    "React",
    "Fun App",
    "Random Decision",
    "Fate App",
  ],

  openGraph: {
    title: "Luck-Based Decision Maker",
    description:
      "Let fate decide! Enter two options and watch them battle through 3 rounds.",
    url: "https://luck-based-decision-maker.netlify.app",
    images: [
      "https://avatars.githubusercontent.com/u/154252497?v=4",
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Luck-Based Decision Maker",
    description:
      "A luck-powered decision tool built using Next.js with animated rounds!",
    images: ["https://avatars.githubusercontent.com/u/154252497?v=4"],
  },
};

// 🟡 FULL JSON-LD INCLUDING PERSON + WEBSITE + WEBAPP
const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mir Basit",
    alternateName: "mirbasit01",
    url: "https://luck-based-decision-maker.netlify.app/",
    image: "https://avatars.githubusercontent.com/u/154252497?v=4",
    description:
      "Frontend & Web3 Developer skilled in React.js, Next.js, TypeScript, Tailwind CSS, Wagmi, Ethers.js and blockchain dApps.",
    sameAs: ["https://github.com/mirbasit01"],
    jobTitle: "Front-End & Web3 Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
  },

  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Luck-Based Decision Maker",
    url: "https://luck-based-decision-maker.netlify.app/",
    description:
      "A fun Next.js app where two options battle using random luck-based points to help you make decisions.",
    publisher: {
      "@type": "Person",
      name: "Mir Basit",
    },
    inLanguage: "en",
    image: "https://avatars.githubusercontent.com/u/154252497?v=4",
    sameAs: ["https://github.com/mirbasit01"],
  },

  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Luck-Based Decision Maker",
    alternateName: "Luck Decision App",
    url: "https://luck-based-decision-maker.netlify.app/",
    image: "https://avatars.githubusercontent.com/u/154252497?v=4",
    description:
      "A fun, interactive Next.js application that helps users make decisions using a 3-round luck system.",
    author: {
      "@type": "Person",
      name: "Mir Basit",
      url: "https://github.com/mirbasit01",
    },
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Inject FULL JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
