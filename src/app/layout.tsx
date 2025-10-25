import "./globals.css";
import type { Metadata, Viewport } from "next";
import ToastProvider from "./toast-provider";

const SEO = {
  title: "2048 Game SlipBey",
  publishDomain: "https://2048oyunu.vercel.app",
  themeColor: "#2563eb",
  keywords: [],
  description: "2048 Game - SlipBey/SlipyGame",
  domain: "https://2048oyunu.vercel.app",
};

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  applicationName: SEO.title,
  authors: [{ name: "Berkant Günaydın", url: "https://slip.slipyme.com" }],
  creator: "Berkant Günaydın",
  publisher: "Berkant Günaydın",
  alternates: { canonical: "" },
  openGraph: {
    type: "website",
    url: SEO.publishDomain,
    siteName: SEO.title,
    title: SEO.title,
    description: SEO.description,
    locale: "tr_TR",
    alternateLocale: [],
  },
  twitter: {
    card: "summary",
    title: SEO.title,
    description: SEO.description,
    site: SEO.publishDomain,
  },

  metadataBase: new URL(SEO.publishDomain),
};

export const viewport: Viewport = {
  themeColor: SEO.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="select-none">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
