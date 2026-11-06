import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMetierPage } from "@/content/metier-pages";
import { metiers } from "@/content/metiers";
import { MetierCaseStudy } from "@/components/metier/MetierCaseStudy";
import { MetierFaq } from "@/components/metier/MetierFaq";
import { MetierHero } from "@/components/metier/MetierHero";
import { MetierLocalSearch } from "@/components/metier/MetierLocalSearch";
import { MetierNeeds } from "@/components/metier/MetierNeeds";
import { OtherMetiers } from "@/components/metier/OtherMetiers";
import { CtaBanner } from "@/components/sections/CtaBanner";

/**
 * Pages métier : /offres/kinesitherapeutes, /offres/avocats… (maquettes 16 à 31).
 *
 * ROUTE DYNAMIQUE
 * Le dossier s'appelle `[slug]` : les crochets indiquent un segment
 * dynamique. Un seul fichier page.tsx sert donc les 8 URL ; Next.js nous
 * donne la partie variable de l'URL dans `params.slug`.
 *
 * Dans cette version de Next.js, `params` est une Promise : il faut
 * l'attendre avec `await` avant de lire `slug`.
 */
type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * GENERATESTATICPARAMS
 * Liste, au moment du build, toutes les valeurs possibles de `slug`.
 * Next.js génère alors les 8 pages en HTML statique à l'avance : elles
 * s'affichent instantanément et ne demandent aucun calcul serveur.
 *
 * Avec `cacheComponents: true` (activé dans next.config.ts), c'est aussi ce
 * qui rend `await params` possible sans <Suspense> : les valeurs étant
 * connues au build, le slug n'est plus une donnée « d'exécution ».
 *
 * Remarque : l'option `export const dynamicParams = false` (404 automatique
 * pour un slug non listé) n'est PAS disponible avec cacheComponents. On gère
 * donc le slug inconnu nous-mêmes avec notFound() plus bas.
 */
export function generateStaticParams() {
  return metiers.map((metier) => ({ slug: metier.slug }));
}

/** Balises <title> et <meta name="description"> propres à chaque métier. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getMetierPage(slug);
  if (!page) return {};

  return {
    // Le layout racine ajoute " | WebSteem" (modèle de titre)
    title: `${page.content.breadcrumbLabel} : votre site internet`,
    description: page.content.intro,
  };
}

export default async function MetierPage({ params }: Props) {
  const { slug } = await params;
  const page = getMetierPage(slug);

  // Slug inconnu (ex. /offres/inexistant) : affiche la page 404
  if (!page) notFound();

  const { content, photos } = page;

  // La page ne contient aucun texte : elle assemble le gabarit (components/metier)
  // avec les données du métier (content/metier-pages.ts), dans l'ordre de la maquette.
  return (
    <>
      <MetierHero content={content} photo={photos.hero} />
      <MetierNeeds needs={content.needs} />
      <MetierCaseStudy caseStudy={content.caseStudy} alsoHelped={content.alsoHelped} photos={photos} />
      <MetierLocalSearch local={content.local} />
      <MetierFaq faq={content.faq} />
      <CtaBanner
        title={`Parlons de votre ${content.audience}.`}
        text="Rendez-vous à Grenoble ou en visio. Devis gratuit et sans engagement."
      />
      <OtherMetiers currentSlug={slug} />
    </>
  );
}
