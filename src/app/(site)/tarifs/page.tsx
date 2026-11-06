import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ComparisonTable } from "@/components/tarifs/ComparisonTable";
import { ExtrasSection, ReassuranceSection } from "@/components/tarifs/ExtrasSection";
import { PlansSection } from "@/components/tarifs/PlansSection";
import { PricingFaqSection } from "@/components/tarifs/PricingFaqSection";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Site vitrine, site e-commerce, visibilité locale : nos prix de départ HT, ce qui est inclus formule par formule, les options à la carte et le paiement en 12 fois.",
};

/**
 * Page « Tarifs » (maquettes 14-tarifs-desktop / 15-tarifs-mobile).
 *
 * Contenu 100 % statique (src/content/tarifs.ts) : la page est générée en
 * HTML au build. Seule la bascule « Paiement unique / En 12 fois » est
 * interactive (Client Component, voir components/tarifs/PaymentMode.tsx).
 */
export default function TarifsPage() {
  return (
    <>
      <PlansSection />
      <ComparisonTable />
      <ExtrasSection />
      <ReassuranceSection />
      <PricingFaqSection />
      <CtaBanner
        title="Un doute sur la formule ? Parlons-en, simplement."
        text="À Grenoble, à Saint-Cyr-sur-Mer ou en visio. Devis gratuit et sans engagement."
      />
    </>
  );
}
