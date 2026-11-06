import { Icon } from "@/components/ui/Icon";
import type { FaqItem } from "@/components/ui/Faq";

/**
 * Blocs de fin d'article présents sur la maquette mais SANS champ Strapi
 * pour l'instant. Les composants sont prêts : ils ne s'affichent que si on
 * leur passe des données, ce qui n'est pas encore le cas.
 *
 * TODO (Strapi) — champs à ajouter au content-type Article :
 * - "aRetenir"       : Texte long → encadré bleu « Ce que vous avez à retenir » ;
 * - "avertissement"  : Texte court → mention en italique sous l'encadré ;
 * - "faq"            : composant répétable { question: Texte, reponse: Texte long }.
 * Puis les demander dans getArticleBySlug() (src/lib/strapi/blog.ts).
 */

/** Encadré bleu « Ce que vous avez à retenir » (+ avertissement facultatif). */
export function KeyTakeaways({ text, disclaimer }: { text?: string | null; disclaimer?: string | null }) {
  if (!text) return null;

  return (
    <>
      <div className="mt-8 mb-3.5 flex flex-col gap-2 rounded-xl bg-navy p-6 text-white lg:mt-10 lg:mb-4 lg:gap-2.5 lg:px-9 lg:py-8">
        <p className="text-sm font-semibold lg:text-[15px]">Ce que vous avez à retenir</p>
        <p className="text-base leading-[27px] lg:text-[19px] lg:leading-[31px]">{text}</p>
      </div>
      {disclaimer && <p className="text-sm leading-[22px] italic lg:text-[15px] lg:leading-6">{disclaimer}</p>}
    </>
  );
}

/**
 * FAQ de l'article (questions dépliables, sans JavaScript grâce à <details>).
 * Styles propres à l'article (plus compacts que le composant ui/Faq).
 * `id="faq"` : ancre utilisée par le sommaire.
 */
export function ArticleFaq({ items }: { items?: FaqItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <h2
        id="faq"
        className="mt-11 mb-3 scroll-mt-24 text-2xl leading-8 font-semibold text-navy lg:mt-14 lg:mb-4 lg:text-[32px] lg:leading-10"
      >
        FAQ
      </h2>
      <div className="flex flex-col gap-2 lg:gap-2.5">
        {items.map((item, index) => (
          <details key={item.question} open={index === 0} className="group rounded-xl bg-white px-4 lg:px-[22px]">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[15px] leading-[22px] font-semibold text-navy lg:text-[17px] [&::-webkit-details-marker]:hidden">
              {item.question}
              <Icon name="chevronDown" className="flex-none transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-4 text-[15px] leading-[25px] lg:text-[17px] lg:leading-7">{item.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
