import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malikana Properties Ltd. | জমি ও প্লট বিক্রয়",
  description: "সারা বাংলাদেশে জমি ও আবাসিক প্লট — সহজ মাসিক কিস্তিতে",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
