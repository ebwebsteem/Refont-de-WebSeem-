/**
 * Client HTTP minimal pour l'API REST de Strapi.
 *
 * Toutes les requêtes vers Strapi passent par `fetchStrapi()`. Avantages :
 * - un seul endroit pour l'URL de base, le token et la gestion d'erreurs ;
 * - les composants ne manipulent jamais d'URL ou de `fetch` directement.
 *
 * Ce fichier n'est utilisé QUE côté serveur (Server Components).
 * L'import "server-only" ferait planter le build si un Client Component
 * l'importait par erreur, ce qui exposerait le token au navigateur.
 */
import "server-only";

/** URL du back-office, sans slash final. */
export const STRAPI_URL = (process.env.STRAPI_URL ?? "http://localhost:1337").replace(/\/$/, "");

/** Erreur dédiée : permet de distinguer une erreur Strapi d'un bug de code. */
export class StrapiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "StrapiError";
  }
}

/**
 * Appelle un endpoint Strapi et renvoie le JSON typé.
 *
 * @param path   Chemin de l'API, ex. "/api/articles"
 * @param query  Paramètres de requête (filters, populate, sort…)
 *
 * @example
 *   const res = await fetchStrapi<StrapiCollectionResponse<Article>>(
 *     "/api/articles",
 *     new URLSearchParams({ "sort[0]": "datePublication:desc" }),
 *   );
 *
 * Note sur le cache : ici on ne gère PAS le cache. Avec `cacheComponents`
 * activé (next.config.ts), c'est la directive 'use cache' posée sur les
 * fonctions de queries.ts qui décide combien de temps garder le résultat.
 */
export async function fetchStrapi<T>(path: string, query?: URLSearchParams): Promise<T> {
  const url = `${STRAPI_URL}${path}${query ? `?${query.toString()}` : ""}`;

  const headers: HeadersInit = { "Content-Type": "application/json" };
  const token = process.env.STRAPI_API_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(url, { headers });
  } catch (error) {
    // Strapi est éteint, mauvaise URL, problème réseau…
    // On logue ICI : en production, Next masque le message des erreurs qui
    // sortent d'une fonction 'use cache', le log serait donc illisible plus haut.
    const message = `Strapi injoignable sur ${STRAPI_URL} (${String(error)})`;
    console.error("[Strapi]", message);
    throw new StrapiError(message);
  }

  if (!response.ok) {
    // 403 = la permission "find" n'est pas cochée pour le rôle Public
    // 400 = paramètre invalide (strictParams est activé côté Strapi)
    const message = `Strapi a répondu ${response.status} sur ${path}`;
    console.error("[Strapi]", message);
    throw new StrapiError(message, response.status);
  }

  return (await response.json()) as T;
}

/**
 * Exécute une requête Strapi et renvoie `fallback` en cas d'erreur.
 *
 * Pourquoi ? Si Strapi est éteint, on préfère afficher la page sans la
 * section concernée plutôt qu'une page d'erreur complète. L'erreur a déjà
 * été affichée dans le terminal par fetchStrapi().
 *
 * Important : on attrape l'erreur EN DEHORS de la fonction 'use cache'.
 * Une erreur n'est pas mise en cache, donc Strapi sera rappelé au prochain
 * rendu. Si on renvoyait [] depuis la fonction cachée, ce tableau vide
 * resterait en cache pendant des heures.
 */
export async function withFallback<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

/**
 * Transforme l'URL d'un média Strapi en URL absolue.
 * En local, Strapi renvoie "/uploads/photo.jpg" : il faut ajouter le domaine.
 * Avec un provider cloud (S3, Cloudinary…), l'URL est déjà absolue.
 */
export function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}
