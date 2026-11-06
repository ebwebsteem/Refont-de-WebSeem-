import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pricingFaq } from "@/content/tarifs";
import { Container } from "@/components/ui/Container";
import { Faq, faqJsonLd } from "@/components/ui/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « Vos questions sur les prix » + données structurées FAQPage.
 *
 * Le <script type="application/ld+json"> n'est pas affiché : il décrit les
 * questions/réponses dans un format standard (schema.org) que Google et les
 * IA savent lire. On le génère à partir des MÊMES données que la liste
 * visible, pour qu'ils ne se contredisent jamais.
 *
 * Sécurité : dangerouslySetInnerHTML injecte du texte brut dans la page.
 * On remplace « < » par son code unicode pour qu'un texte contenant
 * « </script> » ne puisse pas fermer la balise (recommandation de la doc Next.js).
 */
export function PricingFaqSection() {
  const jsonLd = JSON.stringify(faqJsonLd(pricingFaq)).replace(/</g, "\\u003c");

  return (
    <section className="py-16 lg:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Container className="grid gap-4 lg:grid-cols-[4fr_8fr] lg:items-start lg:gap-16">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Vos questions sur les prix."
          intro={
            <span className="text-base leading-[26px]">
              Une autre question ?{" "}
              <Link href="/contact" className="font-semibold">
                Posez-la à {siteConfig.contact.firstName}
              </Link>
            </span>
          }
        />
        <Faq items={pricingFaq} />
      </Container>
    </section>
  );
}
