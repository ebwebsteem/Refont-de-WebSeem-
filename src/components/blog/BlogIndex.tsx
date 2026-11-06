import { Suspense } from "react";
import type { Crumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { withFallback } from "@/lib/strapi/client";
import { emptyArticlesPage, getArticles, getCategoriesWithCount } from "@/lib/strapi/blog";
import { BlogHeader } from "./BlogHeader";
import { BlogListing, BlogListingSkeleton } from "./BlogListing";
import { BlogSidebar, ContactBox } from "./BlogSidebar";
import { CategoryNav } from "./CategoryNav";
import { Newsletter } from "./Newsletter";

/**
 * Gabarit commun à /blog et /blog/categorie/[slug] (maquettes 09 et 10).
 *
 * Ce qui est STATIQUE (calculé au build puis mis en cache, envoyé tout de suite) :
 *   en-tête, filtres par catégorie, colonne de droite, newsletter.
 *   → leurs données viennent de fonctions 'use cache' sans info de requête.
 *
 * Ce qui est DYNAMIQUE (sous <Suspense>, rendu à chaque visite) :
 *   la liste d'articles, car elle dépend de ?page= et ?q= (searchParams).
 */
type BlogIndexProps = {
  title: string;
  intro: string;
  introMobile?: string;
  breadcrumb: Crumb[];
  /** Promesse des paramètres d'URL, transmise SANS await (voir BlogListing) */
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  /** Slug de la catégorie filtrée (page catégorie uniquement) */
  categorySlug?: string;
  basePath: string;
};

export async function BlogIndex({
  title,
  intro,
  introMobile,
  breadcrumb,
  searchParams,
  categorySlug,
  basePath,
}: BlogIndexProps) {
  // Promise.all lance les deux requêtes EN PARALLÈLE (au lieu de l'une après l'autre).
  // getArticles({ pageSize: 3 }) sert deux fois : le nombre total d'articles
  // (filtre « Tous ») et la liste « Les plus lus ».
  const [categories, latest] = await Promise.all([
    withFallback(getCategoriesWithCount(), []),
    withFallback(getArticles({ pageSize: 3 }), emptyArticlesPage),
  ]);

  return (
    <>
      <Container>
        <BlogHeader title={title} intro={intro} introMobile={introMobile} breadcrumb={breadcrumb} />
        <CategoryNav categories={categories} total={latest.pagination.total} activeSlug={categorySlug} />

        <div className="grid items-start gap-12 pb-16 lg:grid-cols-[8fr_4fr] lg:pb-28">
          <div className="flex flex-col gap-8">
            <Suspense fallback={<BlogListingSkeleton />}>
              <BlogListing searchParams={searchParams} categorySlug={categorySlug} basePath={basePath} />
            </Suspense>
            {/* Mobile : l'encadré contact vient après les articles */}
            <ContactBox className="lg:hidden" />
          </div>
          <div className="hidden lg:block">
            <BlogSidebar popular={latest.articles} />
          </div>
        </div>
      </Container>

      <Newsletter tone="light" idPrefix="blog-lettre" />
    </>
  );
}
