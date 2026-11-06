import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { withFallback } from "@/lib/strapi/client";
import { getCategoryBySlug, getCategorySlugs } from "@/lib/strapi/blog";

/**
 * Page /blog/categorie/[slug] : même gabarit que /blog, filtré par catégorie.
 *
 * Pour la logique generateStaticParams / notFound / cache, voir les
 * commentaires détaillés de /blog/[slug]/page.tsx : c'est exactement le même
 * principe ici.
 */

/** Slug factice renvoyé quand Strapi ne donne aucune catégorie au build. */
const PLACEHOLDER_SLUG = "__aucune-categorie__";

/** Navigation autorisée à "bloquer" sur params, pour une vraie 404 (explications dans /blog/[slug]/page.tsx). */
export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Catégories pré-générées au build (au moins une valeur, sinon le build échoue). */
export async function generateStaticParams() {
  const slugs = await withFallback(getCategorySlugs(), []);
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

/** Récupère la catégorie (en cache) ou affiche la 404. */
async function loadCategory(params: Props["params"]) {
  const { slug } = await params;
  const category = await withFallback(getCategoryBySlug(slug), null);
  if (!category) notFound();
  return category;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await loadCategory(params);
  return {
    title: `${category.nom} : nos conseils`,
    description: `Les articles du blog WebSteem sur le thème « ${category.nom} » : des conseils concrets pour les TPE, PME, commerces et associations.`,
    alternates: { canonical: `/blog/categorie/${category.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  // Le await de params est fait HORS <Suspense> pour pouvoir répondre une
  // vraie 404 si la catégorie n'existe pas (voir /blog/[slug]/page.tsx).
  // getCategoryBySlug() est en 'use cache' : le 2e appel (après celui de
  // generateMetadata) lit le résultat en cache, Strapi n'est pas rappelé.
  const category = await loadCategory(params);

  return (
    <BlogIndex
      title={`${category.nom} : les conseils de l'équipe`}
      intro="Écrits par l'équipe, à partir de vraies questions de clients : TPE, PME, commerces et associations."
      introMobile="Écrits par l'équipe, à partir de vraies questions de clients."
      breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Blog", href: "/blog" }, { label: category.nom }]}
      searchParams={searchParams}
      categorySlug={category.slug}
      basePath={`/blog/categorie/${category.slug}`}
    />
  );
}
