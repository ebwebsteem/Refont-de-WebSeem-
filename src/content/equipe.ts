/**
 * Contenus de la page « L'équipe » (maquette 05-equipe-desktop / 06-equipe-mobile).
 *
 * Deux sortes de données ici :
 * 1. Les textes fixes de la page (titres, intro) : ils ne changent pas.
 * 2. Des membres D'EXEMPLE (les noms de la maquette). Ils ne servent que de
 *    REPLI : la page affiche en priorité les membres saisis dans Strapi
 *    (collection « Membre d'équipe »). Voir src/lib/strapi/team.ts.
 *
 * Les textes entre crochets ([Phrase personnelle]…) sont des emplacements
 * voulus par la maquette, à compléter avec chaque personne.
 */
import { siteConfig } from "@/config/site";
import { contactPortrait, exampleImages, pick } from "@/content/exemples";
import type { StrapiMedia } from "@/types/strapi";

/**
 * Ce dont une carte « membre » a besoin pour s'afficher.
 *
 * C'est un type "de vue" : il ne dépend pas de Strapi. Que la personne
 * vienne de Strapi ou des données d'exemple ci-dessous, on la convertit
 * dans ce format, et les composants n'ont qu'un seul cas à gérer.
 */
export interface TeamCardMember {
  /** Prénom affiché en grand (h3) */
  firstName: string;
  /** Nom complet, affiché sous le prénom avec le poste */
  fullName: string;
  role: string;
  /** Une phrase qui décrit ce que la personne fait pour vous */
  bio: string;
  /**
   * ⚠️ Champs ABSENTS du content-type Strapi « Membre d'équipe ».
   * La maquette les affiche : pour les gérer depuis Strapi, il faudrait
   * ajouter au content-type deux champs texte, par exemple :
   *   - phrasePersonnelle (Text)
   *   - ceQueJaime       (Text, « Ce que j'aime dans mon métier »)
   * En attendant, ils ne sont remplis que dans les données d'exemple.
   */
  quote?: string;
  loves?: string;
  /** Photo Strapi (null pour les données d'exemple) */
  photo: StrapiMedia | null;
  /** Photo provisoire utilisée tant qu'il n'y a pas de photo Strapi */
  placeholder: string;
}

/** Textes à compléter, repris tels quels de la maquette. */
const QUOTE = "[Phrase personnelle]";
const LOVES = "[Ce que j'aime dans mon métier]";

/* ------------------------------------------------------------------ */
/* Votre premier interlocuteur (Emmanuel)                              */
/* ------------------------------------------------------------------ */

/**
 * Emmanuel est mis en avant à part : c'est l'interlocuteur unique du site
 * (son prénom est dans siteConfig). Son bloc reste statique, même quand
 * Strapi est rempli, pour garantir que la page ne perde jamais son contact
 * principal.
 */
export const mainContact = {
  firstName: siteConfig.contact.firstName,
  fullName: siteConfig.contact.fullName,
  role: siteConfig.contact.role,
  bio: "Il pilote votre projet du premier appel à la mise en ligne, et reste votre contact ensuite. Avant WebSteem, 26 ans comme consultant, concepteur-rédacteur et chef de projet web.",
  quote: `[Phrase personnelle d'${siteConfig.contact.firstName}]`,
  loves: "[Ce que j'aime dans mon métier, en une ou deux phrases, à la première personne.]",
  photo: contactPortrait,
};

/* ------------------------------------------------------------------ */
/* Membres d'exemple (repli quand Strapi est vide ou éteint)           */
/* ------------------------------------------------------------------ */

/** L'équipe au quotidien (4 personnes sur la maquette). */
export const fallbackTeam: TeamCardMember[] = [
  {
    firstName: "Mélanie",
    fullName: "Mélanie Blanc Nowak",
    role: "responsable marketing",
    bio: "Elle construit avec vous la façon de faire venir des clients : messages, réseaux, actions concrètes.",
  },
  {
    firstName: "Robin",
    fullName: "Robin Hourtané",
    role: "développeur web",
    bio: "Il construit votre site et vérifie que tout fonctionne, sur ordinateur comme sur téléphone.",
  },
  {
    firstName: "Grégory",
    fullName: "Grégory Beylier",
    role: "développeur web",
    bio: "Il donne vie à la maquette : vos pages, vos formulaires, un site rapide et facile à lire.",
  },
  {
    firstName: "Quentin",
    fullName: "Quentin Blas-Trinidad",
    role: "développeur full stack",
    bio: "Il s'occupe de ce qui se passe derrière l'écran : vos données, vos fonctionnalités sur mesure.",
  },
].map((member, index) => ({
  ...member,
  quote: QUOTE,
  loves: LOVES,
  photo: null,
  // Portraits 1 à 4 (le n° 0 est celui d'Emmanuel)
  placeholder: pick(exampleImages.portraits, index + 1),
}));

/** Les experts partenaires (3 visibles sur la maquette). */
export const fallbackPartners: TeamCardMember[] = [
  {
    firstName: "Pierre-Emmanuel",
    fullName: "Pierre-Emmanuel Manteau",
    role: "partenaire",
    bio: "Il crée les applications web sur mesure, quand un site ne suffit plus.",
  },
  {
    firstName: "Déborah",
    fullName: "Déborah Joly",
    role: "partenaire",
    bio: "Elle vous aide à organiser vos outils informatiques pour gagner du temps au quotidien.",
  },
  {
    firstName: "Christophe",
    fullName: "Christophe Vitiello",
    role: "partenaire",
    bio: "Il vous aide à développer vos ventes, avec une démarche commerciale claire.",
  },
].map((member, index) => ({
  ...member,
  quote: QUOTE,
  loves: LOVES,
  photo: null,
  placeholder: pick(exampleImages.portraits, index + 5),
}));

/** Nombre de partenaires non affichés (bouton « Rencontrer les 13 autres partenaires »). */
export const otherPartnersCount = 13;
