import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";

/**
 * Page /blog : liste de tous les articles (maquettes 09 et 10).
 *
 * Métadonnées FIXES (pas d'appel à Strapi) : un simple objet suffit.
 */
export const metadata: Metadata = {
  title: "Blog : conseils web pour TPE, PME et associations",
  description:
    "Des conseils concrets pour que votre site travaille pour vous, écrits par l'équipe WebSteem à partir de vraies questions de clients.",
  alternates: { canonical: "/blog" },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * La page n'est PAS async et ne fait PAS `await searchParams` :
 * elle transmet la promesse à <BlogListing>, qui l'attend sous <Suspense>.
 * Ainsi tout le reste de la page reste dans le HTML statique.
 */
export default function BlogPage({ searchParams }: Props) {
  return (
    <BlogIndex
      title="Des conseils concrets, pour que votre site travaille pour vous."
      intro="Écrits par l'équipe, à partir de vraies questions de clients : TPE, PME, commerces et associations."
      introMobile="Écrits par l'équipe, à partir de vraies questions de clients."
      breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Blog" }]}
      searchParams={searchParams}
      basePath="/blog"
    />
  );
}
