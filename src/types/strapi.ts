/**
 * Types TypeScript des données renvoyées par l'API REST de Strapi 5.
 *
 * Ils reflètent les schémas "schema.json" de chaque dossier back-end/src/api/.
 * Si tu modifies un content-type dans Strapi, pense à mettre ce fichier à jour.
 *
 * Rappel Strapi 5 : la réponse est "à plat". Les champs sont directement
 * sur l'objet (article.titre) et non plus dans article.attributes.titre
 * comme en Strapi 4. Chaque entrée a un `id` (numérique) ET un `documentId`
 * (chaîne stable, à utiliser pour identifier un document).
 */

/* ------------------------------------------------------------------ */
/* Enveloppes génériques                                               */
/* ------------------------------------------------------------------ */

/** Champs présents sur toutes les entrées Strapi. */
export interface StrapiEntry {
  id: number;
  documentId: string;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/** Réponse d'un appel sur une collection : GET /api/articles */
export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: { pagination?: StrapiPagination };
}

/** Réponse d'un appel sur une entrée unique ou un Single Type. */
export interface StrapiSingleResponse<T> {
  data: T | null;
  meta: Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/* Médias et composants partagés                                       */
/* ------------------------------------------------------------------ */

/**
 * Un fichier de la médiathèque Strapi.
 * On ne demande que les champs utiles via `fields` (voir queries.ts),
 * d'où les champs optionnels.
 */
export interface StrapiMedia extends StrapiEntry {
  url: string; // relative en local ("/uploads/..."), absolue avec un provider cloud
  alternativeText: string | null;
  width: number | null;
  height: number | null;
}

/** Composant "shared.seo" */
export interface Seo {
  metaTitle: string;
  metaDescription: string;
  shareImage?: StrapiMedia | null;
  canonicalUrl?: string | null;
}

/**
 * Champ "Rich text (Blocks)" de Strapi.
 * On le laisse volontairement générique : il sera rendu plus tard avec
 * le paquet @strapi/blocks-react-renderer sur la page article.
 */
export type BlocksContent = unknown[];

/* ------------------------------------------------------------------ */
/* Content-types                                                       */
/* ------------------------------------------------------------------ */

export interface Category extends StrapiEntry {
  nom: string;
  slug: string;
}

export interface TeamMember extends StrapiEntry {
  nom: string;
  poste: string | null;
  bio: string | null;
  photo?: StrapiMedia | null;
}

export interface Article extends StrapiEntry {
  titre: string;
  slug: string;
  datePublication: string | null; // format "YYYY-MM-DD"
  tempsLecture: number | null;
  contenu?: BlocksContent;
  image?: StrapiMedia | null;
  categorie?: Category | null;
  auteur?: TeamMember | null;
  seo?: Seo;
}

export interface Service extends StrapiEntry {
  titre: string;
  slug: string;
  descriptionCourte: string | null;
  ordre: number;
  contenu?: BlocksContent;
  image?: StrapiMedia | null;
  seo?: Seo;
}
