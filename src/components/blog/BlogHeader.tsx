import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";

/**
 * En-tête des pages de liste du blog (/blog et /blog/categorie/[slug]).
 * Desktop : titre + intro à gauche (7/12), recherche à droite (5/12), alignés en bas.
 * Mobile  : tout empilé, le fil d'Ariane est masqué (comme sur la maquette).
 *
 * Ce composant ne lit AUCUNE donnée de requête (searchParams…) : il fait donc
 * partie du HTML statique ("static shell") envoyé immédiatement.
 */
type BlogHeaderProps = {
  title: string;
  intro: string;
  /** Intro plus courte sur mobile (la maquette coupe la fin de la phrase) */
  introMobile?: string;
  breadcrumb: Crumb[];
};

export function BlogHeader({ title, intro, introMobile, breadcrumb }: BlogHeaderProps) {
  return (
    <section className="grid gap-3.5 pt-7 pb-5 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16 lg:pt-14 lg:pb-16">
      <div className="flex flex-col gap-3.5 lg:gap-5">
        <Breadcrumb
          items={breadcrumb}
          // Variantes arbitraires : on recolore le composant partagé sans le modifier
          className="hidden lg:block [&_a]:text-navy [&_a]:no-underline [&_a]:hover:underline [&_ol]:text-[15px] [&_ol]:text-navy"
        />
        <h1 className="text-[32px] leading-10 font-semibold tracking-[-0.02em] text-balance text-navy lg:text-[56px] lg:leading-16">
          {title}
        </h1>
        <p className="max-w-[60ch] text-base leading-[26px] lg:text-lg lg:leading-[30px]">
          {introMobile ? (
            <>
              <span className="lg:hidden">{introMobile}</span>
              <span className="hidden lg:inline">{intro}</span>
            </>
          ) : (
            intro
          )}
        </p>
      </div>

      <BlogSearch />
    </section>
  );
}

/**
 * Barre de recherche : un simple <form method="get"> vers /blog.
 * En validant, le navigateur ouvre /blog?q=texte ; la page lit alors
 * `searchParams` (sous <Suspense>) et filtre les articles côté serveur.
 * Aucun JavaScript nécessaire.
 *
 * Le champ n'est pas pré-rempli avec la recherche en cours : cela obligerait
 * à lire searchParams ici et ferait sortir l'en-tête du HTML statique.
 * La recherche en cours est rappelée au-dessus des résultats.
 */
function BlogSearch() {
  return (
    <form action="/blog" method="get" role="search" className="flex flex-col gap-2">
      <label htmlFor="blog-recherche" className="text-[15px] font-semibold lg:text-base">
        Vous cherchez un sujet précis ?
      </label>
      <input
        id="blog-recherche"
        name="q"
        type="search"
        placeholder="Ex. : référencement local, boutique en ligne"
        className="h-[52px] rounded-lg bg-cream px-4 text-base text-ink shadow-[inset_0_0_0_1.5px_var(--color-navy)] focus:shadow-[inset_0_0_0_2px_var(--color-navy),0_0_0_4px_#FFD9CC] focus:outline-none lg:h-14 lg:px-[18px]"
      />
    </form>
  );
}
