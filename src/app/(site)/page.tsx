import type { Metadata } from "next";
import { ClientsStrip } from "@/components/home/ClientsStrip";
import { Hero } from "@/components/home/Hero";
import { NeedsSection } from "@/components/home/NeedsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ReferencesSection } from "@/components/home/ReferencesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { VisibilitySection } from "@/components/home/VisibilitySection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { OfficesSection } from "@/components/sections/OfficesSection";
import { siteConfig } from "@/config/site";

// title.absolute : ignore le modèle "%s | WebSteem" du layout racine pour l'accueil
export const metadata: Metadata = {
  title: { absolute: "WebSteem — Agence web à Grenoble et Saint-Cyr-sur-Mer" },
  description:
    "Un site qui vous amène des clients, et une équipe qui reste à vos côtés. Agence web pour artisans, commerçants, professions libérales et associations.",
};

/**
 * Page d'accueil (maquette « 02-accueil-desktop » / « 03-accueil-mobile »).
 *
 * La page ne fait qu'assembler les sections, dans l'ordre de la maquette.
 * Tout le contenu est statique (dossier src/content) : la page est générée
 * en HTML au build. Les données Strapi (articles, équipe) sont utilisées sur
 * les pages Blog et Équipe.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsStrip />
      <NeedsSection />
      <ProcessSection />
      <VisibilitySection />
      <OfficesSection />
      <ReferencesSection />
      <TestimonialsSection />
      <CtaBanner
        withPortrait
        title="Parlons de votre projet, simplement."
        text={`Un premier échange de 30 minutes, gratuit et sans engagement. ${siteConfig.contact.firstName} vous écoute et vous dit honnêtement si on peut vous aider. À Grenoble, à Saint-Cyr-sur-Mer ou en visio.`}
      />
    </>
  );
}
