/**
 * Requêtes Strapi du BLOG (liste, catégories, article seul).
 *
 * Même principe que queries.ts (relis son en-tête si besoin) :
 * - chaque fonction = un besoin d'une page ;
 * - 'use cache' + cacheLife + cacheTag sur chaque fonction ;
 * - on ne demande à Strapi QUE les champs affichés (`fields`, `populate`).
 *
 * ──────────────────────────────────────────────────────────────────────
 * RAPPEL : POURQUOI TOUT EST "CACHÉ" ICI ?
 * ──────────────────────────────────────────────────────────────────────
 * Avec `cacheComponents: true`, Next.js essaie de construire chaque page
 * à l'avance (au build) sous forme de HTML statique. Il refuse un appel
 * réseau "non caché" en dehors d'un <Suspense>, car il ne saurait pas
 * s'il doit l'attendre ou non.
 *
 * En posant 'use cache' sur ces fonctions, on dit à Next :
 * « ce résultat peut être réutilisé : intègre-le dans le HTML statique ».
 * Les arguments font partie de la clé de cache : getArticleBySlug("a") et
 * getArticleBySlug("b") sont deux entrées distinctes.
 *
 * Tags utilisés (pour une future revalidation à la demande via un webhook
 * Strapi → revalidateTag) :
 * - "articles"           : toutes les listes d'articles ;
 * - "article:<slug>"     : un article précis (vider uniquement celui modifié) ;
 * - "categories"         : la liste des catégories.
 *
 * Gestion des erreurs : ces fonctions LANCENT une erreur si Strapi est
 * éteint. C'est la page qui les enveloppe dans withFallback() (client.ts),
 * en dehors du cache, pour afficher un état vide sans mettre l'échec en cache.
 * ──────────────────────────────────────────────────────────────────────
 */
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { fetchStrapi } from "./client";
import type { Article, Category, StrapiCollectionResponse, StrapiPagination } from "@/types/strapi";

/* ------------------------------------------------------------------ */
/* Types locaux                                                        */
/* ------------------------------------------------------------------ */

/** Une catégorie avec son nombre d'articles (pour les filtres du blog). */
export interface CategoryWithCount extends Category {
  count: number;
}

/** Une page de résultats : les articles + les infos de pagination. */
export interface ArticlesPage {
  articles: Article[];
  pagination: StrapiPagination;
}

/** Valeur "vide" réutilisable quand Strapi ne répond pas (voir withFallback). */
export const emptyArticlesPage: ArticlesPage = {
  articles: [],
  pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 },
};

/** Nombre d'articles par page de la liste (1 "à la une" + une grille paire). */
export const ARTICLES_PER_PAGE = 9;

/* ------------------------------------------------------------------ */
/* Morceaux de requête réutilisables                                   */
/* ------------------------------------------------------------------ */

/**
 * Champs d'un média, préfixés par le chemin de la relation.
 * Ex. mediaFields("populate[auteur][populate][photo]") →
 *   populate[auteur][populate][photo][fields][0]=url, …
 */
function mediaFields(prefix: string): [string, string][] {
  return ["url", "alternativeText", "width", "height"].map((f, i) => [`${prefix}[fields][${i}]`, f]);
}

/**
 * Tout ce qu'il faut pour afficher une CARTE d'article :
 * titre, date, image, catégorie, auteur (nom + photo) et le résumé.
 *
 * Il n'y a pas de champ "extrait" dans le content-type Article : on réutilise
 * seo.metaDescription (160 caractères max, obligatoire), qui joue très bien
 * ce rôle. On ne demande QUE ce champ du composant SEO.
 *
 * Remarque : "populate" ne va qu'à UN niveau par défaut. Pour la photo de
 * l'auteur (relation → média), il faut imbriquer : populate[auteur][populate][photo].
 */
const cardParams: [string, string][] = [
  ["fields[0]", "titre"],
  ["fields[1]", "slug"],
  ["fields[2]", "datePublication"],
  ["fields[3]", "tempsLecture"],
  ...mediaFields("populate[image]"),
  ["populate[categorie][fields][0]", "nom"],
  ["populate[categorie][fields][1]", "slug"],
  ["populate[auteur][fields][0]", "nom"],
  ...mediaFields("populate[auteur][populate][photo]"),
  ["populate[seo][fields][0]", "metaDescription"],
  // Du plus récent au plus ancien ; createdAt départage deux articles du même jour
  ["sort[0]", "datePublication:desc"],
  ["sort[1]", "createdAt:desc"],
];

/* ------------------------------------------------------------------ */
/* Listes d'articles                                                   */
/* ------------------------------------------------------------------ */

type ArticlesQuery = {
  /** Numéro de page (commence à 1) */
  page?: number;
  pageSize?: number;
  /** Ne garder que les articles de cette catégorie */
  categorySlug?: string;
  /** Texte recherché dans le titre et le résumé */
  search?: string;
  /** Exclure cet article (ex. l'article en cours dans « D'autres conseils ») */
  excludeSlug?: string;
};

/**
 * Liste paginée des articles, avec filtres optionnels.
 * Sert à /blog, /blog?q=…, /blog?page=2, /blog/categorie/[slug]
 * et aux « articles liés » de la page article.
 *
 * Les filtres Strapi s'écrivent aussi "à crochets" :
 * - filters[categorie][slug][$eq]=seo        → égalité sur un champ d'une relation
 * - filters[$or][0][titre][$containsi]=site  → "contient", insensible à la casse
 * - filters[slug][$ne]=mon-article           → "différent de"
 */
export async function getArticles({
  page = 1,
  pageSize = ARTICLES_PER_PAGE,
  categorySlug,
  search,
  excludeSlug,
}: ArticlesQuery = {}): Promise<ArticlesPage> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const query = new URLSearchParams([
    ...cardParams,
    ["pagination[page]", String(page)],
    ["pagination[pageSize]", String(pageSize)],
  ]);

  if (categorySlug) query.append("filters[categorie][slug][$eq]", categorySlug);
  if (excludeSlug) query.append("filters[slug][$ne]", excludeSlug);
  if (search) {
    // $or : l'article est gardé si le titre OU le résumé contient le texte
    query.append("filters[$or][0][titre][$containsi]", search);
    query.append("filters[$or][1][seo][metaDescription][$containsi]", search);
  }

  const res = await fetchStrapi<StrapiCollectionResponse<Article>>("/api/articles", query);
  return {
    articles: res.data,
    // withCount est activé dans back-end/config/api.ts : la pagination est toujours renvoyée
    pagination: res.meta.pagination ?? { page, pageSize, pageCount: 1, total: res.data.length },
  };
}

/**
 * Articles à proposer sous un article (« D'autres conseils… »).
 * D'abord ceux de la même catégorie ; s'il n'y en a pas assez, on complète
 * avec les plus récents. Pas de 'use cache' ici : la fonction se contente
 * d'appeler getArticles(), qui est déjà mise en cache.
 */
export async function getRelatedArticles(
  slug: string,
  categorySlug: string | undefined,
  limit = 3,
): Promise<Article[]> {
  const sameCategory = categorySlug
    ? (await getArticles({ categorySlug, excludeSlug: slug, pageSize: limit })).articles
    : [];
  if (sameCategory.length >= limit) return sameCategory;

  const latest = (await getArticles({ excludeSlug: slug, pageSize: limit + sameCategory.length })).articles;
  const others = latest.filter((a) => !sameCategory.some((s) => s.slug === a.slug));
  return [...sameCategory, ...others].slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Article seul                                                        */
/* ------------------------------------------------------------------ */

/**
 * Un article complet à partir de son slug (contenu, auteur, SEO).
 * Renvoie `null` si aucun article publié ne porte ce slug : la page
 * appellera alors notFound() pour afficher la 404.
 *
 * Pourquoi /api/articles?filters[slug][$eq]=… et pas /api/articles/:id ?
 * L'URL du site contient le slug, pas le documentId. On filtre donc la
 * collection et on prend le premier (le slug est unique : type "uid").
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles", `article:${slug}`);

  const query = new URLSearchParams([
    ["filters[slug][$eq]", slug],
    ["fields[0]", "titre"],
    ["fields[1]", "slug"],
    ["fields[2]", "datePublication"],
    ["fields[3]", "tempsLecture"],
    ["fields[4]", "contenu"],
    ...mediaFields("populate[image]"),
    ["populate[categorie][fields][0]", "nom"],
    ["populate[categorie][fields][1]", "slug"],
    ["populate[auteur][fields][0]", "nom"],
    ["populate[auteur][fields][1]", "poste"],
    ["populate[auteur][fields][2]", "bio"],
    ...mediaFields("populate[auteur][populate][photo]"),
    // Composant SEO complet, avec son image de partage (réseaux sociaux)
    ["populate[seo][fields][0]", "metaTitle"],
    ["populate[seo][fields][1]", "metaDescription"],
    ["populate[seo][fields][2]", "canonicalUrl"],
    ...mediaFields("populate[seo][populate][shareImage]"),
    ["pagination[pageSize]", "1"],
  ]);

  const res = await fetchStrapi<StrapiCollectionResponse<Article>>("/api/articles", query);
  return res.data[0] ?? null;
}

/**
 * Slugs des articles à pré-générer au build (generateStaticParams).
 * On limite aux 100 plus récents (maxLimit de Strapi) : les plus anciens
 * seront générés à la première visite puis gardés en cache (ISR).
 */
export async function getArticleSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const query = new URLSearchParams([
    ["fields[0]", "slug"],
    ["sort[0]", "datePublication:desc"],
    ["pagination[pageSize]", "100"],
  ]);

  const res = await fetchStrapi<StrapiCollectionResponse<Pick<Article, "slug">>>("/api/articles", query);
  return res.data.map((a) => a.slug).filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* Catégories                                                          */
/* ------------------------------------------------------------------ */

/**
 * Catégories avec leur nombre d'articles, pour les filtres du blog.
 *
 * populate[articles][count]=true : Strapi ne renvoie pas les articles
 * eux-mêmes mais seulement { count: 3 }. Beaucoup plus léger !
 * Les catégories vides sont retirées (un filtre sans résultat frustre).
 */
export async function getCategoriesWithCount(): Promise<CategoryWithCount[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories", "articles");

  const query = new URLSearchParams([
    ["fields[0]", "nom"],
    ["fields[1]", "slug"],
    ["populate[articles][count]", "true"],
    ["sort[0]", "nom:asc"],
    ["pagination[pageSize]", "100"],
  ]);

  type Raw = Category & { articles?: { count: number } };
  const res = await fetchStrapi<StrapiCollectionResponse<Raw>>("/api/categories", query);

  return res.data
    .map(({ articles, ...category }) => ({ ...category, count: articles?.count ?? 0 }))
    .filter((category) => category.count > 0);
}

/** Une catégorie à partir de son slug, ou null si elle n'existe pas. */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  const query = new URLSearchParams([
    ["filters[slug][$eq]", slug],
    ["fields[0]", "nom"],
    ["fields[1]", "slug"],
    ["pagination[pageSize]", "1"],
  ]);

  const res = await fetchStrapi<StrapiCollectionResponse<Category>>("/api/categories", query);
  return res.data[0] ?? null;
}

/** Slugs des catégories, pour generateStaticParams de /blog/categorie/[slug]. */
export async function getCategorySlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  const query = new URLSearchParams([
    ["fields[0]", "slug"],
    ["pagination[pageSize]", "100"],
  ]);

  const res = await fetchStrapi<StrapiCollectionResponse<Pick<Category, "slug">>>("/api/categories", query);
  return res.data.map((c) => c.slug).filter(Boolean);
}
