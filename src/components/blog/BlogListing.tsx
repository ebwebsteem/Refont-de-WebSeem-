import Link from "next/link";
import { withFallback } from "@/lib/strapi/client";
import { emptyArticlesPage, getArticles } from "@/lib/strapi/blog";
import { ArticleCard } from "./ArticleCard";
import { FeaturedArticle } from "./FeaturedArticle";
import { Pagination } from "./Pagination";

/**
 * Liste des articles (à la une + grille + pagination).
 *
 * ──────────────────────────────────────────────────────────────────────
 * POURQUOI CE COMPOSANT EST-IL TOUJOURS SOUS <Suspense> ?
 * ──────────────────────────────────────────────────────────────────────
 * Il lit `searchParams` (?page=2, ?q=seo). Ces valeurs ne sont connues
 * qu'au moment de la requête du visiteur : impossible de les deviner au build.
 * Avec cacheComponents, tout accès à searchParams doit donc être placé sous
 * un <Suspense>. Résultat :
 * - au build, Next génère le HTML statique de la page avec le `fallback`
 *   (squelette) à la place de ce composant ;
 * - à chaque visite, ce composant est rendu puis "streamé" dans la page.
 *
 * Ce rendu reste rapide : getArticles() est en 'use cache', donc pour une
 * même combinaison (page, recherche, catégorie) Strapi n'est appelé qu'une
 * fois par heure au maximum.
 *
 * On reçoit `searchParams` sous forme de PROMESSE et on fait le `await` ICI,
 * à l'intérieur du Suspense. Si la page faisait le await elle-même, toute la
 * page deviendrait dynamique (plus de HTML statique du tout).
 * ──────────────────────────────────────────────────────────────────────
 */
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type BlogListingProps = {
  searchParams: SearchParams;
  /** Filtre par catégorie (page /blog/categorie/[slug]) */
  categorySlug?: string;
  /** URL de la liste, pour les liens de pagination */
  basePath: string;
};

/** Lit un paramètre d'URL qui peut être absent, une chaîne ou un tableau (?q=a&q=b). */
function readParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export async function BlogListing({ searchParams, categorySlug, basePath }: BlogListingProps) {
  const params = await searchParams;

  // On "nettoie" les valeurs venant de l'URL : un visiteur peut taper n'importe quoi.
  const search = readParam(params.q).slice(0, 100);
  const pageNumber = Number.parseInt(readParam(params.page), 10);
  const page = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  // withFallback : si Strapi est éteint, on obtient une liste vide au lieu d'une erreur.
  const { articles, pagination } = await withFallback(
    getArticles({ page, categorySlug, search: search || undefined }),
    emptyArticlesPage,
  );

  // « À la une » : uniquement sur la 1re page, sans recherche
  const showFeatured = page === 1 && !search && articles.length > 0;
  const featured = showFeatured ? articles[0] : undefined;
  const others = showFeatured ? articles.slice(1) : articles;

  return (
    <div className="flex flex-col gap-8">
      {featured && <FeaturedArticle article={featured} />}

      {search ? (
        <div className="flex flex-col gap-2">
          <h2 className="text-[26px] leading-[34px] font-semibold text-navy lg:text-[32px] lg:leading-10">
            Résultats pour « {search} »
          </h2>
          <p>
            {pagination.total} article{pagination.total > 1 ? "s" : ""} trouvé{pagination.total > 1 ? "s" : ""}.{" "}
            <Link href={basePath}>Effacer la recherche</Link>
          </p>
        </div>
      ) : (
        others.length > 0 && (
          <h2 className="text-[26px] leading-[34px] font-semibold text-navy lg:mt-4 lg:text-[32px] lg:leading-10">
            Les derniers conseils de l&apos;équipe
            {page > 1 && <span className="sr-only"> (page {page})</span>}
          </h2>
        )
      )}

      {others.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-6">
          {others.map((article) => (
            <ArticleCard key={article.documentId} article={article} />
          ))}
        </div>
      )}

      {articles.length === 0 && <EmptyState search={search} page={page} basePath={basePath} />}

      <Pagination page={page} pageCount={pagination.pageCount} basePath={basePath} search={search} />
    </div>
  );
}

/** Message affiché quand il n'y a rien à montrer (recherche sans résultat, Strapi éteint…). */
function EmptyState({ search, page, basePath }: { search: string; page: number; basePath: string }) {
  let message = "Les premiers articles arrivent bientôt. Revenez nous voir !";
  if (search) message = "Aucun article ne correspond à votre recherche. Essayez un autre mot-clé.";
  else if (page > 1) message = "Cette page n'existe pas (ou plus).";

  return (
    <div className="flex flex-col items-start gap-3 rounded-xl bg-white p-6 lg:p-8">
      <p className="text-lg leading-[30px]">{message}</p>
      {(search || page > 1) && <Link href={basePath}>Voir tous les articles</Link>}
    </div>
  );
}

/**
 * Squelette affiché pendant le chargement de <BlogListing> (fallback du Suspense).
 * Il fait partie du HTML statique : mêmes dimensions que le vrai contenu pour
 * éviter que la page "saute" quand les articles arrivent.
 */
export function BlogListingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Chargement des articles" className="flex flex-col gap-8">
      <div className="h-[420px] animate-pulse rounded-xl bg-white lg:h-[432px]" />
      <div className="grid gap-8 sm:grid-cols-2 lg:gap-6">
        {[0, 1].map((i) => (
          <div key={i} className="h-[190px] animate-pulse rounded-xl bg-placeholder lg:h-60 lg:rounded-[14px]" />
        ))}
      </div>
    </div>
  );
}
