import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LaunchScreen from "./components/LaunchScreen";

export const metadata: Metadata = {
  title: "The Infinity Creators — Math Club | KM/KM/ Al-Ashraq MMV (National School)",
  description: "Official website of The Infinity Creators, the Math Club of KM/KM/ Al-Ashraq MMV (National School), Nintavur. Exploring the beauty of mathematics, developing logical minds, and inspiring innovators. Established 2026.",
  keywords: "Math Club, Infinity Creators, KM/KM/ Al-Ashraq MMV, National School, Nintavur, Math, STEM, Education",
  icons: {
    icon: [
      { url: '/images/logos/club-logo.png' },
      { url: '/icon.png' },
    ],
    shortcut: '/images/logos/club-logo.png',
    apple: '/images/logos/club-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <LaunchScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
