/**
 * Petites fonctions de mise en forme partagées par les composants du blog.
 * (Fichier sans JSX : de simples fonctions TypeScript.)
 */
import type { Article } from "@/types/strapi";

/**
 * Formateur de date en français : "8 septembre 2026".
 * Créé une seule fois (hors des composants) pour ne pas le recréer à chaque rendu.
 *
 * timeZone "UTC" : Strapi renvoie une date sans heure ("2026-09-08"), que
 * JavaScript interprète comme minuit UTC. Sans cette option, un serveur réglé
 * sur un fuseau en retard (ex. Amérique) afficherait… la veille !
 */
const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" });

export function formatDate(date: string | null | undefined): string | null {
  return date ? dateFormatter.format(new Date(date)) : null;
}

/** "Alice Bourgeois" → "Alice" (la maquette écrit « par Emmanuel »). */
export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

/**
 * Résumé d'un article pour les cartes.
 * Pas de champ "extrait" dans Strapi : on prend la meta description SEO.
 * TODO (Strapi) : ajouter un champ texte "extrait" à Article si l'équipe veut
 * un résumé différent de celui affiché dans Google.
 */
export function excerpt(article: Article): string | null {
  return article.seo?.metaDescription || null;
}

/** Ligne "Catégorie · date" au-dessus des titres de cartes. */
export function metaLine(article: Article): string {
  return [article.categorie?.nom, formatDate(article.datePublication)].filter(Boolean).join(" · ");
}
