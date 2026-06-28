import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malikana Properties Ltd. | জমি ও প্লট বিক্রয় বাংলাদেশ",
  description: "সারা বাংলাদেশে জমি, আবাসিক প্লট ও ফ্ল্যাট বিক্রয় — সহজ মাসিক কিস্তিতে। ঢাকা, গাজীপুর, নারায়ণগঞ্জসহ সারাদেশে সেরা রিয়েল এস্টেট সেবা।",
  keywords: "জমি বিক্রয়, প্লট বিক্রয়, ফ্ল্যাট বিক্রয়, বাংলাদেশ রিয়েল এস্টেট, ঢাকা জমি, কিস্তিতে জমি, Malikana Properties",
  authors: [{ name: "Malikana Properties Ltd." }],
  creator: "Malikana Properties Ltd.",
  publisher: "Malikana Properties Ltd.",
  metadataBase: new URL("https://malikanaproperties.com"),
  alternates: {
    canonical: "https://malikanaproperties.com",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://malikanaproperties.com",
    siteName: "Malikana Properties Ltd.",
    title: "Malikana Properties Ltd. | জমি ও প্লট বিক্রয় বাংলাদেশ",
    description: "সারা বাংলাদেশে জমি, আবাসিক প্লট ও ফ্ল্যাট বিক্রয় — সহজ মাসিক কিস্তিতে।",
    images: [{ url: "/logo.jpeg", width: 800, height: 600, alt: "Malikana Properties Ltd." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malikana Properties Ltd. | জমি ও প্লট বিক্রয়",
    description: "সারা বাংলাদেশে জমি, প্লট ও ফ্ল্যাট বিক্রয় — কিস্তি সুবিধায়।",
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f2d1e" />
        <link rel="icon" href="/logo.jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Malikana Properties Ltd.",
              "url": "https://malikanaproperties.com",
              "logo": "https://malikanaproperties.com/logo.jpeg",
              "description": "সারা বাংলাদেশে জমি, আবাসিক প্লট ও ফ্ল্যাট বিক্রয়",
              "telephone": "+8801719880087",
              "email": "malikanapropertiesltd@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kazi Garden, 7th Floor, Tejgaon",
                "addressLocality": "Dhaka",
                "addressCountry": "BD"
              },
              "openingHours": "Sa-Th 09:00-18:00",
              "sameAs": []
            })
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "sans-serif" }}>
        {children}

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/8801719880087?text=আমি%20আপনাদের%20সম্পত্তি%20সম্পর্কে%20জানতে%20চাই"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            width: "58px",
            height: "58px",
            background: "#25d366",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
            zIndex: 999,
            textDecoration: "none",
            animation: "wa-pulse 2s infinite",
          }}
          title="WhatsApp এ যোগাযোগ করুন"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.469.672 4.783 1.84 6.768L2 30l7.43-1.812A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.834-1.598l-.418-.248-4.33 1.056 1.087-4.218-.272-.432A11.468 11.468 0 014.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172-.23.344-.888 1.118-1.09 1.348-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.767-1.706-1.022-.912-1.712-2.037-1.913-2.381-.2-.344-.021-.53.15-.701.155-.155.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.057-.43-.028-.603-.086-.172-.776-1.87-1.063-2.562-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.603.086-.918.43-.316.344-1.204 1.176-1.204 2.867s1.233 3.325 1.404 3.555c.172.23 2.428 3.706 5.882 5.196.823.355 1.465.567 1.966.726.826.263 1.578.226 2.172.137.662-.099 2.036-.832 2.323-1.636.287-.804.287-1.492.2-1.636-.086-.143-.316-.23-.66-.402z"/>
          </svg>
        </a>

        <style>{`
          @keyframes wa-pulse {
            0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
            70% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
            100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
          }
        `}</style>
      </body>
    </html>
  );
}
