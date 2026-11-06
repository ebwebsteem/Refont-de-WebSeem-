import Link from "next/link";
import { metierHref, metiers } from "@/content/metiers";
import { Container } from "@/components/ui/Container";

/**
 * Ligne « Autres métiers : » sous le bandeau d'appel à l'action :
 * des liens vers les 7 autres pages métier (maillage interne, utile au SEO).
 * On filtre la liste de metiers.ts pour retirer le métier affiché.
 */
export function OtherMetiers({ currentSlug }: { currentSlug: string }) {
  const others = metiers.filter((metier) => metier.slug !== currentSlug);

  return (
    // -mt : rapproche la ligne du bandeau CTA (32 px d'écart sur la maquette)
    <Container className="-mt-8 pb-16 md:-mt-16 lg:pb-28">
      <nav aria-label="Autres métiers" className="flex flex-wrap items-center gap-2.5">
        <span className="text-[15px] font-semibold text-navy">Autres métiers :</span>
        {others.map((metier) => (
          <Link
            key={metier.slug}
            href={metierHref(metier.slug)}
            className="inline-flex min-h-11 items-center rounded-lg bg-white px-4 text-[15px] text-ink no-underline hover:text-rust"
          >
            {metier.shortLabel ?? metier.label}
          </Link>
        ))}
      </nav>
    </Container>
  );
}
