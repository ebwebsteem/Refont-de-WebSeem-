import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://websteem.com"),
  title: {
    default: "WebSteem — Agence de communication digitale à Grenoble",
    template: "%s | WebSteem",
  },
  description:
    "Agence de communication digitale à Grenoble et Saint-Cyr-sur-Mer : sites web, applications mobiles, SEO, SEA.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
