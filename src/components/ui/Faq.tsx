import { Icon } from "./Icon";

/**
 * Liste de questions / réponses dépliables.
 *
 * <details> / <summary> : élément HTML natif qui s'ouvre et se ferme au clic,
 * sans JavaScript et accessible au clavier. Pas besoin de "use client".
 *
 * Bonus SEO : on peut ajouter le balisage JSON-LD "FAQPage" (voir faqJsonLd)
 * pour aider Google et les IA à lire ces réponses.
 */
export type FaqItem = { question: string; answer: string };

export function Faq({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <details
          key={item.question}
          open={index === defaultOpen}
          className="group rounded-xl bg-white p-1 open:pb-5"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-[17px] font-semibold text-navy [&::-webkit-details-marker]:hidden">
            {item.question}
            <Icon name="chevronDown" className="text-navy transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 text-base leading-[26px]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Données structurées schema.org pour une FAQ (à injecter dans un <script type="application/ld+json">). */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
