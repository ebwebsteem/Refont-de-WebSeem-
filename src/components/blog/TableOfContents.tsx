import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { TocEntry } from "./content";

/**
 * Sommaire de l'article, généré automatiquement à partir des titres (niveau 2)
 * du contenu Strapi (voir prepareContent dans content.ts).
 *
 * - desktop : colonne blanche à gauche, qui reste visible au défilement (sticky) ;
 * - mobile  : bloc repliable <details> « Sommaire de l'article » (sans JavaScript).
 *
 * Un article sans titre n'a pas de sommaire : on ne l'affiche pas.
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <nav
      aria-label="Sommaire de l'article"
      className="hidden flex-col gap-1 rounded-xl bg-white p-6 lg:sticky lg:top-8 lg:flex"
    >
      <p className="mb-2 text-[15px] font-semibold text-navy">Sommaire</p>
      {entries.map((entry, index) => (
        <a
          key={entry.id}
          href={`#${entry.id}`}
          // La maquette souligne le 1er lien d'un trait orange à gauche (inset box-shadow).
          // Sans JavaScript on ne sait pas quelle section est lue : on applique ce style au survol.
          className={`flex min-h-10 items-center pl-3 text-[15px] text-ink no-underline hover:font-semibold hover:text-ink hover:shadow-[inset_3px_0_0_var(--color-orange)] ${
            index === 0 ? "font-semibold shadow-[inset_3px_0_0_var(--color-orange)]" : ""
          }`}
        >
          {entry.label}
        </a>
      ))}
      <Link href="/contact" className="mt-4 flex min-h-11 items-center text-[15px] font-semibold">
        Poser votre question à {siteConfig.contact.firstName}
      </Link>
    </nav>
  );
}

/** Version mobile : repliable, placée sous la photo d'en-tête. */
export function TableOfContentsMobile({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <details className="rounded-xl bg-white px-[18px] lg:hidden">
      <summary className="flex min-h-[52px] cursor-pointer items-center text-base font-semibold text-navy">
        Sommaire de l&apos;article
      </summary>
      <ol className="mb-3.5 list-decimal pl-5 text-[15px] leading-8">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="text-ink">
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
