import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import "./globals.css";

/**
 * next/font télécharge les polices au build et les héberge avec le site :
 * aucune requête vers Google côté visiteur (meilleur pour le RGPD et la perf).
 * `variable` expose la police sous forme de variable CSS, réutilisée
 * dans le @theme de globals.css.
 *
 * Poppins : police unique de la charte (400 à 700).
 * Fraunces italique : petites touches éditoriales (citations).
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://websteem.com"),
  title: {
    default: "WebSteem — Agence de communication digitale à Grenoble",
    template: "%s | WebSteem",
  },
  description:
    "Agence de communication digitale à Grenoble et Saint-Cyr-sur-Mer : sites web, applications mobiles, SEO, SEA.",
};

/**
 * Layout racine : uniquement <html>, <body>, la police et le CSS global.
 * Le header et le footer sont dans app/(site)/layout.tsx. Le dossier "(site)"
 * est un "route group" : les parenthèses l'excluent de l'URL, mais il permet
 * de donner un layout commun aux pages publiques (et un autre, plus tard,
 * à d'éventuelles pages sans header comme une landing page).
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
