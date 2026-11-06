import type { MetierPageContent } from "@/content/metier-pages";
import { Container } from "@/components/ui/Container";
import { Faq, faqJsonLd } from "@/components/ui/Faq";

/**
 * Questions fréquentes du métier : titre à gauche (4/12), questions
 * dépliables à droite (8/12).
 *
 * On ajoute aussi les données structurées JSON-LD « FAQPage » : invisibles
 * à l'écran, elles permettent à Google et aux assistants IA de lire
 * directement les questions / réponses.
 */
export function MetierFaq({ faq }: { faq: MetierPageContent["faq"] }) {
  return (
    <section className="py-16 lg:py-28">
      <Container className="grid items-start gap-4 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-rust lg:text-[15px]">Questions fréquentes</p>
          <h2 className="text-[28px] leading-9 font-semibold text-balance text-navy lg:text-[40px] lg:leading-[48px]">
            {faq.title}
          </h2>
        </div>

        <Faq items={faq.items} />
      </Container>

      {/*
        JSON.stringify transforme l'objet en texte JSON. dangerouslySetInnerHTML
        est nécessaire pour écrire ce texte tel quel dans la balise <script>.
        Sans risque ici : le contenu vient de nos propres fichiers, pas d'un
        utilisateur. On remplace quand même "<" par son code unicode pour qu'un
        texte ne puisse jamais fermer la balise </script> par erreur.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faq.items)).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
