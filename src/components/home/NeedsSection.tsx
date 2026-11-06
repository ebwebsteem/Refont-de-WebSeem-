import Link from "next/link";
import { metierHref, metiers } from "@/content/metiers";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « Vos besoins » : les 8 métiers, chacun menant à sa page /offres/[slug].
 * Les données viennent de content/metiers.ts (partagé avec le footer).
 */
export function NeedsSection() {
  return (
    // id : cible du lien "Vos besoins" du menu (/#vos-besoins) ; scroll-mt évite que le header collant cache le titre
    <section id="vos-besoins" className="scroll-mt-24 pt-18 pb-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          layout="split"
          eyebrow="Vos besoins"
          title="Vous connaissez votre métier. Nous aussi, et vos clients avec."
          intro="Choisissez votre activité : on vous montre ce dont votre site a vraiment besoin, et des clients qui font le même métier que vous."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metiers.map((metier) => (
            <li key={metier.slug}>
              <article className="flex h-full flex-col gap-3.5 rounded-xl bg-white p-3 pb-6">
                <div className="relative h-[140px] overflow-hidden rounded-[10px] bg-placeholder transition duration-300 hover:scale-[1.015]">
                  <Photo src={metier.photo} alt="" sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col gap-2 px-3">
                  <h3 className="text-xl leading-7 font-semibold text-navy">{metier.label}</h3>
                  <p className="leading-6">{metier.pitch}</p>
                  <Link
                    href={metierHref(metier.slug)}
                    className="mt-auto inline-flex min-h-11 items-center text-[15px] font-semibold underline"
                  >
                    Voir ce qu&apos;on fait pour {metier.linkLabel}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="text-[17px]">
          Votre métier n&apos;est pas dans la liste ?{" "}
          <Link href="/contact" className="font-semibold underline">
            Parlons de votre activité
          </Link>
        </p>
      </Container>
    </section>
  );
}
