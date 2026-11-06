/**
 * Contenus "fixes" du site : navigation, coordonnées, liens légaux.
 *
 * Ces infos changent rarement : les garder dans le code évite un appel API
 * sur chaque page. Si l'équipe veut pouvoir les modifier elle-même, on
 * pourra créer un Single Type "Global" dans Strapi et remplacer ce fichier.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "WebSteem",
  description: "Agence web à Grenoble et Saint-Cyr-sur-Mer, pour les TPE, PME, commerces et associations.",
  email: "contact@websteem.com",
  phone: {
    display: "06 78 28 19 27",
    international: "+33 (0)6 78 28 19 27",
    href: "tel:+33678281927",
  },
  /**
   * Votre interlocuteur unique. La maquette écrit souvent « [Prénom de
   * l'interlocuteur] » : on centralise le prénom ici pour le changer partout.
   */
  contact: {
    firstName: "Emmanuel",
    fullName: "Emmanuel Bertrand",
    role: "gérant de WebSteem",
  },
  /** ⚠️ Lien de prise de rendez-vous (Calendly, Google Agenda…) à renseigner. */
  bookingUrl: "/contact",
  /** Avis Google : valeurs à compléter (la maquette affiche [NOTE] et [NB]). */
  googleReviews: { rating: "[NOTE]", count: "[NB]", url: "#" },
  yearStart: 2020,
} as const;

/** Liens du menu principal (Header). */
export const mainNav: NavLink[] = [
  { label: "Tarifs", href: "/tarifs" },
  { label: "Vos besoins", href: "/#vos-besoins" },
  { label: "Références", href: "/references" },
  { label: "Équipe", href: "/equipe" },
  { label: "Blog", href: "/blog" },
];

/** Bouton d'action principal, présent dans le header et le footer. */
export const primaryCta: NavLink = { label: "Parlons de votre projet", href: "/contact" };

/** Colonne "Navigation" du footer. */
export const footerNav: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Références", href: "/references" },
  { label: "Équipe", href: "/equipe" },
  { label: "Blog", href: "/blog" },
  { label: "Engagement RSE", href: "/engagements-rse" },
  { label: "Contact", href: "/contact" },
];

/** Bas du footer. ⚠️ Les pages cookies, accessibilité et plan du site restent à créer. */
export const legalLinks: NavLink[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Politique de confidentialité (RGPD)", href: "/politique-de-confidentialite" },
  { label: "Gestion des cookies", href: "#" },
  { label: "Accessibilité", href: "#" },
  { label: "Plan du site", href: "#" },
];

/** Réseaux sociaux (icônes dans /public/brand/reseaux). ⚠️ URLs à renseigner. */
export const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "/brand/reseaux/linkedin.png", width: 22, height: 20 },
  { label: "Instagram", href: "#", icon: "/brand/reseaux/instagram.png", width: 21, height: 20 },
  { label: "Facebook", href: "#", icon: "/brand/reseaux/facebook.png", width: 12, height: 20 },
  { label: "YouTube", href: "#", icon: "/brand/reseaux/youtube.png", width: 22, height: 16 },
];

/** Bureaux (accueil, contact). */
export const offices = [
  {
    title: "Grenoble · Isère (38)",
    text: "Rendez-vous sur place à Grenoble, Saint-Martin-d'Hères, Échirolles, Meylan, Voiron…",
  },
  {
    title: "Saint-Cyr-sur-Mer · Var (83)",
    text: "Rendez-vous sur place à Saint-Cyr-sur-Mer, Bandol, La Cadière-d'Azur, Sanary-sur-Mer, La Ciotat.",
  },
];
