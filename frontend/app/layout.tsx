import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malikana Properties Ltd. | \u099c\u09ae\u09bf \u09a4 \u09aa\u09cd\u09b2\u099f \u09ac\u09bf\u0995\u09cd\u09b0\u09af\u09bc",
  description: "\u09b8\u09be\u09b0\u09be \u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7 \u099c\u09ae\u09bf \u09a4 \u0986\u09ac\u09be\u09b8\u09bf\u0995 \u09aa\u09cd\u09b2\u099f \u2014 \u09b8\u09b9\u099c \u09ae\u09be\u09b8\u09bf\u0995 \u0995\u09bf\u09b8\u09cd\u09a4\u09bf\u09a4\u09c7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body style={{ margin: 0, padding: 0, fontFamily: "'Hind Siliguri', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
