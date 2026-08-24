import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Akshat Pratap — Full-Stack Developer & AI Builder",
  description:
    "Portfolio of Akshat Pratap, a full-stack developer building AI-driven products with React, FastAPI and cloud infrastructure. B.Tech CSE at SRM Delhi-NCR · AICTE × AWS intern · 3× national hackathon participant.",
  keywords: [
    "Akshat Pratap",
    "Full-Stack Developer",
    "React Developer",
    "AI Applications",
    "FastAPI",
    "Portfolio",
  ],
  openGraph: {
    title: "Akshat Pratap — Full-Stack Developer & AI Builder",
    description:
      "Full-stack developer building AI-driven products with React, FastAPI and generative AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body bg-ink text-bone`}
      >
        {children}
      </body>
    </html>
  );
}
