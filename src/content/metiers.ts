/**
 * Les 8 métiers ("Vos besoins") pour lesquels WebSteem a une offre dédiée.
 *
 * Cette liste sert à 3 endroits : les cartes de l'accueil, la colonne
 * « Un site internet pour… » du footer et les pages /offres/[slug].
 * Le contenu détaillé de chaque page métier est dans metier-pages.ts.
 *
 * Pourquoi pas dans Strapi ? Ces pages ont une structure riche et figée
 * (besoins, cas client, recherches Google, FAQ). Les mettre dans le code
 * est plus simple pour démarrer ; on pourra créer un content-type
 * "Métier" dans Strapi quand l'équipe voudra les éditer elle-même.
 */
import { exampleImages } from "./exemples";

export interface Metier {
  slug: string;
  /** Titre de la carte et du footer, ex. "Kinésithérapeutes" */
  label: string;
  /** Libellé du footer quand il diffère (ex. "Commerces & boutiques") */
  footerLabel?: string;
  /** Libellé court de la ligne « Autres métiers » (ex. "Commerces") */
  shortLabel?: string;
  /** Fin du lien de la carte : "Voir ce qu'on fait pour {linkLabel}" */
  linkLabel: string;
  /** Phrase d'accroche de la carte */
  pitch: string;
  /** Photo provisoire de la carte */
  photo: string;
}

export const metiers: Metier[] = [
  {
    slug: "kinesitherapeutes",
    label: "Kinésithérapeutes",
    linkLabel: "les kinés",
    pitch: "Vos patients prennent rendez-vous en ligne, vos confrères vous trouvent.",
    photo: exampleImages.metiers[0],
  },
  {
    slug: "avocats",
    label: "Avocats",
    linkLabel: "les avocats",
    pitch: "Vos futurs clients comprennent vos domaines et vos honoraires avant d'appeler.",
    photo: exampleImages.metiers[1],
  },
  {
    slug: "photographes",
    label: "Photographes",
    linkLabel: "les photographes",
    pitch: "Votre portfolio s'ouvre vite sur mobile et se trouve sur Google.",
    photo: exampleImages.metiers[2],
  },
  {
    slug: "artisans-du-batiment",
    label: "Artisans du bâtiment",
    linkLabel: "les artisans",
    pitch: "On voit vos chantiers et votre zone, et on vous demande un devis simplement.",
    photo: exampleImages.metiers[3],
  },
  {
    slug: "commerces",
    label: "Commerces & e-commerce",
    shortLabel: "Commerces",
    footerLabel: "Commerces & boutiques",
    linkLabel: "les commerces",
    pitch: "Votre catalogue à jour, le paiement en ligne et le retrait en boutique.",
    photo: exampleImages.metiers[4],
  },
  {
    slug: "associations",
    label: "Associations & clubs",
    shortLabel: "Associations",
    linkLabel: "les associations",
    pitch: "Vos adhérents s'inscrivent en ligne, vos bénévoles gagnent du temps.",
    photo: exampleImages.metiers[5],
  },
  {
    slug: "coachs-formateurs",
    label: "Coachs & formateurs",
    linkLabel: "les coachs",
    pitch: "Vos offres sont claires et un premier échange se réserve facilement.",
    photo: exampleImages.metiers[6],
  },
  {
    slug: "recrutement",
    label: "Recrutement & RH",
    shortLabel: "Recrutement",
    footerLabel: "Cabinets de recrutement",
    linkLabel: "le recrutement",
    pitch: "Vos offres restent à jour, les candidats déposent leur CV simplement.",
    photo: exampleImages.metiers[7],
  },
];

/** URL d'une page métier. */
export function metierHref(slug: string): string {
  return `/offres/${slug}`;
}
