/**
 * Données de la page « L'équipe » depuis Strapi.
 *
 * Pourquoi un fichier à part plutôt que getTeamMembers() de queries.ts ?
 * Cette fonction-là sert à l'aperçu de l'accueil : 4 membres maximum, sans
 * la bio. La page Équipe a besoin de TOUS les membres et de leur bio.
 *
 * ──────────────────────────────────────────────────────────────────────
 * STRAPI D'ABORD, DONNÉES D'EXEMPLE EN REPLI
 * ──────────────────────────────────────────────────────────────────────
 * - Strapi contient des membres → on les affiche (l'équipe gère sa page
 *   elle-même, sans développeur).
 * - Strapi est vide (projet qui démarre) ou éteint → on affiche les
 *   membres d'exemple de src/content/equipe.ts (noms de la maquette),
 *   pour que la page ne soit jamais vide.
 * ──────────────────────────────────────────────────────────────────────
 */
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { siteConfig } from "@/config/site";
import { exampleImages, pick } from "@/content/exemples";
import { fallbackPartners, fallbackTeam, type TeamCardMember } from "@/content/equipe";
import type { StrapiCollectionResponse, TeamMember } from "@/types/strapi";
import { fetchStrapi, withFallback } from "./client";

/**
 * Tous les membres publiés, avec leur bio et leur photo.
 * Même principe de cache que queries.ts : 'use cache' + durée + étiquette
 * "team-members" (un webhook Strapi pourra vider ce cache à chaque modification).
 */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("team-members");

  const query = new URLSearchParams([
    ["fields[0]", "nom"],
    ["fields[1]", "poste"],
    ["fields[2]", "bio"],
    ["populate[photo][fields][0]", "url"],
    ["populate[photo][fields][1]", "alternativeText"],
    ["populate[photo][fields][2]", "width"],
    ["populate[photo][fields][3]", "height"],
    // Ordre de création : la première personne saisie apparaît en premier
    ["sort[0]", "createdAt:asc"],
    ["pagination[pageSize]", "50"],
  ]);

  const res = await fetchStrapi<StrapiCollectionResponse<TeamMember>>("/api/team-members", query);
  return res.data;
}

/**
 * Le content-type n'a pas de champ « équipe / partenaire ». En attendant
 * d'en ajouter un (ex. une énumération `type` : "equipe" | "partenaire"),
 * on considère comme partenaire toute personne dont le poste contient
 * le mot « partenaire ».
 */
function isPartner(member: TeamMember): boolean {
  return /partenaire/i.test(member.poste ?? "");
}

/** Convertit un membre Strapi en carte affichable (voir TeamCardMember). */
function toCard(member: TeamMember, index: number): TeamCardMember {
  return {
    // Strapi stocke le nom complet : le prénom est le premier mot
    firstName: member.nom.split(" ")[0],
    fullName: member.nom,
    role: member.poste ?? "",
    bio: member.bio ?? "",
    photo: member.photo ?? null,
    placeholder: pick(exampleImages.portraits, index + 1),
  };
}

/**
 * Renvoie l'équipe et les partenaires à afficher sur la page.
 *
 * withFallback() attrape l'erreur si Strapi est éteint (voir client.ts) :
 * on obtient alors une liste vide, et donc les données d'exemple.
 */
export async function getTeamPageMembers(): Promise<{
  team: TeamCardMember[];
  partners: TeamCardMember[];
  fromStrapi: boolean;
}> {
  const members = await withFallback(getAllTeamMembers(), []);

  // Emmanuel a déjà son grand bloc en haut de page : on ne le répète pas
  const others = members.filter((m) => m.nom !== siteConfig.contact.fullName);

  if (others.length === 0) {
    return { team: fallbackTeam, partners: fallbackPartners, fromStrapi: false };
  }

  const cards = others.map(toCard);
  return {
    team: cards.filter((_, i) => !isPartner(others[i])),
    partners: cards.filter((_, i) => isPartner(others[i])),
    fromStrapi: true,
  };
}
