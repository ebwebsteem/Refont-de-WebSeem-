import Link from "next/link";
import { featuredReferences } from "@/content/references";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** « Sélection de références » : 4 projets clients. */
export function ReferencesSection() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Sélection de références"
            title="Des entreprises comme la vôtre nous ont confié leur site."
          />
          <Link href="/references" className="inline-flex min-h-11 flex-none items-center font-semibold underline">
            Découvrir comment on a travaillé avec eux
          </Link>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {featuredReferences.map((reference) => (
            <li key={reference.name}>
              <article className="flex flex-col gap-4">
                <div className="relative h-60 overflow-hidden rounded-[14px] bg-placeholder transition duration-300 hover:scale-[1.015]">
                  <Photo src={reference.photo} alt="" sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
                </div>
                <p className="text-sm font-medium">{reference.meta}</p>
                <h3 className="text-xl leading-7 font-semibold text-navy">{reference.name}</h3>
                <p className="leading-[26px]">{reference.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
