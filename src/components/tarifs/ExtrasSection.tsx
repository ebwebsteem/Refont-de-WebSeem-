import Link from "next/link";
import { siteConfig } from "@/config/site";
import { extras, featuredArticle, notIncluded, reassurance } from "@/content/tarifs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « À la carte » : prestations complémentaires + encadré « Ce qui n'est pas inclus ».
 *
 * Sur desktop l'encadré bleu est dans la colonne de gauche ; sur mobile
 * la maquette le met APRÈS la liste. Pour ne pas l'écrire deux fois, on
 * utilise une grille : il est placé en dernier dans le HTML, et sur
 * desktop on le remonte en 1re colonne / 2e ligne (lg:col-start-1 lg:row-start-2).
 */
export function ExtrasSection() {
  return (
    <section className="py-16 lg:py-28">
      <Container className="grid gap-3 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-5">
        <SectionHeading
          eyebrow="À la carte"
          title="Besoin d'un coup de main en plus ? On l'ajoute."
          intro={<span className="hidden lg:inline">À ajouter à une formule, ou à commander seul pour un site existant.</span>}
          className="mb-2 lg:mb-0"
        />

        <ul className="flex flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {extras.map((extra) => (
            <li
              key={extra.title}
              className="flex flex-col rounded-xl bg-white px-4.5 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-6 lg:py-5"
            >
              <div>
                <p className="font-semibold text-navy lg:text-[17px]">{extra.title}</p>
                <p className="text-sm leading-[21px] lg:text-[15px] lg:leading-[22px]">{extra.text}</p>
              </div>
              <p className="mt-1 text-sm font-semibold whitespace-nowrap lg:mt-0 lg:text-base">{extra.price}</p>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-col gap-3 self-start rounded-xl bg-navy p-5 text-white lg:col-start-1 lg:row-start-2 lg:mt-0 lg:px-8 lg:py-7">
          <h3 className="text-base font-semibold lg:text-xl lg:leading-7">Ce qui n&apos;est pas inclus, pour être clair</h3>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-[22px] lg:text-base lg:leading-[26px]">
            {notIncluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Réassurance : paiement en 12 fois, devis gratuit, et un article à lire. */
export function ReassuranceSection() {
  return (
    <section className="bg-white py-14 lg:py-24">
      <Container className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-6">
        {reassurance.map((item) => (
          <div key={item.figure} className="flex flex-col gap-2 rounded-xl bg-cream p-4.5 lg:p-8">
            <p className="text-[30px] leading-[38px] font-semibold text-rust lg:text-[44px] lg:leading-[52px]">
              {item.figure}
            </p>
            <h3 className="text-[15px] leading-[22px] font-semibold text-navy lg:text-xl lg:leading-7">{item.title}</h3>
            <p className="text-[15px] leading-[22px] lg:text-base lg:leading-[26px]">{item.text}</p>
          </div>
        ))}

        {/* Toute la carte est un lien : on force les couleurs (les <a> sont orange par défaut) */}
        <Link
          href={featuredArticle.href}
          className="col-span-2 flex flex-col gap-2 rounded-xl bg-navy p-5 text-white no-underline transition hover:-translate-y-px hover:text-white hover:shadow-[0_12px_32px_rgba(29,54,66,0.14)] lg:col-span-1 lg:p-8"
        >
          <span className="text-sm font-semibold">À lire</span>
          <h3 className="text-base leading-6 font-semibold lg:text-xl lg:leading-7">{featuredArticle.title}</h3>
          <span className="mt-auto text-[15px] font-semibold underline">
            Lire le conseil d&apos;{siteConfig.contact.firstName}
          </span>
        </Link>
      </Container>
    </section>
  );
}
