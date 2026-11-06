/**
 * Références clients et témoignages (textes de la maquette).
 *
 * Les textes entre crochets ([Prénom Nom], [Citation…]) sont des
 * emplacements volontaires de la maquette, à compléter avec l'équipe.
 * Plus tard : un content-type "Référence" dans Strapi (la route
 * /portfolio/[slug] existe déjà pour les pages détaillées).
 */
import { exampleImages } from "./exemples";

/** Bandeau "Ils nous font confiance" (sous le hero). */
export const trustedClients = [
  { name: "Club Alpin Français Grenoble Isère", activity: "Club de montagne", photo: exampleImages.clients[0] },
  { name: "Caldo Torréfaction", activity: "Torréfaction", photo: exampleImages.clients[1] },
  { name: "Alpes Recrutement", activity: "Recrutement", photo: exampleImages.clients[2] },
  { name: "Nicollet Chauffage", activity: "Chauffage, climatisation", photo: exampleImages.clients[3] },
  { name: "Fulkit Rider Shop", activity: "Boutique de skate", photo: exampleImages.clients[4] },
];

export interface Reference {
  name: string;
  /** "Activité · Ville" */
  meta: string;
  summary: string;
  photo: string;
}

/** Sélection de références (accueil). */
export const featuredReferences: Reference[] = [
  {
    name: "Club Alpin Français Grenoble Isère",
    meta: "Club de montagne · Grenoble",
    summary: "Reprendre un site associatif riche, avec réservation en ligne, sans que les adhérents ne voient la différence.",
    photo: exampleImages.projects[0],
  },
  {
    name: "Nicollet",
    meta: "Chauffage, climatisation · Guilherand-Granges",
    summary: "Une refonte complète pour un chauffagiste, livrée dans les délais et ajustée au fil des semaines.",
    photo: exampleImages.projects[1],
  },
  {
    name: "Aqua +",
    meta: "Cabinet de kinésithérapie · Grenoble",
    summary: "Un site pensé à la fois pour les patients, les médecins et les confrères.",
    photo: exampleImages.projects[2],
  },
  {
    name: "Fulkit Rider Shop",
    meta: "Boutique de skateboard · Le Fontanil-Cornillon",
    summary: "Une boutique en ligne tenue à jour, sans que le commerçant s'occupe de la technique.",
    photo: exampleImages.projects[3],
  },
];

export interface Testimonial {
  /** Thème affiché en étiquette : Écoute, Disponibilité… */
  theme: string;
  quote: string;
  author: string;
  role: string;
  since: string;
  photo: string;
}

/** Avis clients (accueil). */
export const testimonials: Testimonial[] = [
  {
    theme: "Écoute",
    quote: "[Citation sur l'écoute : comment l'équipe a compris son activité dès le premier échange.]",
    author: "[Prénom Nom]",
    role: "[Métier] · [Entreprise]",
    since: "[Client depuis X ans]",
    photo: exampleImages.portraits[1],
  },
  {
    theme: "Disponibilité",
    quote: "[Citation sur la disponibilité : un appel rendu vite, une réponse claire quand il y avait un souci.]",
    author: "[Prénom Nom]",
    role: "[Métier] · [Entreprise]",
    since: "[Client depuis X ans]",
    photo: exampleImages.portraits[2],
  },
  {
    theme: "Suivi dans la durée",
    quote: "[Citation sur le suivi : ce qui a changé après la mise en ligne, et la relation qui continue.]",
    author: "[Prénom Nom]",
    role: "[Métier] · [Entreprise]",
    since: "[Client depuis X ans]",
    photo: exampleImages.portraits[3],
  },
];
