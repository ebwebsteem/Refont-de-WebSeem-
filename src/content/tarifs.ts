/**
 * Contenus de la page « Tarifs » (maquettes 14-tarifs-desktop / 15-tarifs-mobile).
 *
 * Les textes sont séparés de la mise en page : pour changer un prix ou une
 * question de la FAQ, on modifie ce fichier sans toucher aux composants.
 * Les valeurs entre crochets ([PRIX], [DÉLAI], [À CONFIRMER…]) sont des
 * emplacements à compléter par l'équipe, voulus par la maquette.
 */
import type { FaqItem } from "@/components/ui/Faq";

/** Identifiants des formules, réutilisés par le tableau comparatif. */
export type PlanId = "vitrine" | "ecommerce" | "visibilite";

export interface Plan {
  id: PlanId;
  name: string;
  /** Nom court pour l'en-tête du tableau sur mobile */
  shortName: string;
  idealFor: string;
  price: string;
  /** Prix mensuel affiché quand on choisit « En 12 fois » */
  monthlyPrice: string;
  /** Vrai pour un abonnement (déjà payé au mois : le bouton « 12 fois » ne change rien) */
  isSubscription?: boolean;
  features: string[];
  delay?: string;
  cta: string;
  /** La formule mise en avant (fond bleu + badge « Le plus demandé ») */
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: "vitrine",
    name: "Site vitrine",
    shortName: "Vitrine",
    idealFor: "vous êtes artisan, profession libérale ou association, et vous voulez être trouvé.",
    price: "[PRIX] €",
    monthlyPrice: "[MENSUALITÉ] €",
    features: [
      "Design sur mesure, adapté au mobile",
      "Vos services et votre zone d'intervention",
      "Référencement de base",
      "Formulaire de contact et pages légales RGPD",
      "Formation à la prise en main",
    ],
    delay: "[DÉLAI]",
    cta: "Parler de mon site vitrine",
  },
  {
    id: "ecommerce",
    name: "Site e-commerce",
    shortName: "E-commerce",
    idealFor: "vous êtes commerçant ou créateur et vous voulez vendre en ligne.",
    price: "[PRIX] €",
    monthlyPrice: "[MENSUALITÉ] €",
    features: [
      "Boutique WooCommerce ou PrestaShop",
      "Paiement en ligne et livraison",
      "Fiches produits optimisées",
      "CGV et pages légales",
      "Formation à la gestion de la boutique",
    ],
    delay: "[DÉLAI]",
    cta: "Parler de ma boutique en ligne",
    featured: true,
  },
  {
    id: "visibilite",
    name: "Visibilité locale",
    shortName: "Visibilité",
    idealFor: "vous avez déjà un site, mais il ne vous ramène pas assez de contacts.",
    price: "[PRIX] €",
    monthlyPrice: "[PRIX] €",
    isSubscription: true,
    features: [
      "Audit de votre site sur Google et dans les IA",
      "Votre fiche Google optimisée",
      "Des pages pour votre métier et votre ville",
      "Une FAQ que Google et les IA comprennent",
      "Un rapport mensuel, expliqué de vive voix",
    ],
    delay: "[DÉLAI]",
    cta: "Parler de ma visibilité",
  },
];

/**
 * Tableau comparatif : une ligne par prestation, avec la liste des
 * formules qui l'incluent. (Plus lisible et moins risqué qu'un tableau de
 * true/false dont on oublierait l'ordre des colonnes.)
 */
export const comparison: { label: string; includedIn: PlanId[] }[] = [
  { label: "Design sur mesure, adapté au mobile", includedIn: ["vitrine", "ecommerce"] },
  { label: "Hébergement vert la première année", includedIn: ["vitrine", "ecommerce"] },
  { label: "Pages légales et RGPD", includedIn: ["vitrine", "ecommerce"] },
  { label: "Référencement de base", includedIn: ["vitrine", "ecommerce", "visibilite"] },
  { label: "Fiche Google Business Profile", includedIn: ["visibilite"] },
  { label: "Pages métier et ville", includedIn: ["visibilite"] },
  { label: "Boutique, paiement et livraison", includedIn: ["ecommerce"] },
  { label: "Audit Google et IA (SEO et GEO)", includedIn: ["visibilite"] },
  { label: "Rapport mensuel expliqué", includedIn: ["visibilite"] },
  { label: "Formation à la prise en main", includedIn: ["vitrine", "ecommerce"] },
];

/** Prestations « à la carte ». */
export const extras: { title: string; text: string; price: string }[] = [
  {
    title: "Hébergement et maintenance",
    text: "Mises à jour, sauvegardes, sécurité : on veille sur votre site.",
    price: "[PRIX] € HT/mois",
  },
  { title: "Refonte d'un site existant", text: "Nouveau design et reprise de vos contenus.", price: "Sur devis" },
  { title: "Rédaction de vos textes", text: "Avec notre partenaire concepteur-rédacteur.", price: "[PRIX] € HT/page" },
  {
    title: "Être cité par les IA (GEO)",
    text: "Contenus et FAQ pensés pour ChatGPT, Gemini et les autres.",
    price: "Sur devis",
  },
  { title: "Publicité en ligne (SEA)", text: "Google Ads, Facebook Ads, LinkedIn Ads.", price: "[PRIX] € HT/mois" },
  {
    title: "Formation",
    text: "Webmarketing, réseaux sociaux, gestion de votre site.",
    price: "[PRIX] € HT/demi-journée",
  },
  { title: "Application mobile", text: "Android et iOS, sur mesure.", price: "Sur devis" },
];

/** Encadré « Ce qui n'est pas inclus, pour être clair ». */
export const notIncluded = [
  "Le budget publicitaire (Google Ads, Meta…), payé directement aux plateformes",
  "Les photos professionnelles (possibles avec un partenaire photographe)",
  "Les extensions payantes éventuelles, signalées dans le devis",
];

/** Les deux chiffres de réassurance. */
export const reassurance = [
  { figure: "12×", title: "Un paiement étalé", text: "Réglez votre site en 12 mensualités sur l'année." },
  { figure: "0 €", title: "Un devis gratuit", text: "Détaillé phase par phase, et sans engagement." },
];

/**
 * Article mis en avant dans la réassurance.
 * TODO : remplacer "/blog" par "/blog/<slug>" quand l'article sera publié
 * dans Strapi (on évite ainsi un lien vers une page qui n'existe pas encore).
 */
export const featuredArticle = {
  title: "Amortissement d'un site internet : ce que dit la comptabilité française",
  href: "/blog",
};

/** Questions fréquentes (affichées avec <Faq> + balisage JSON-LD). */
export const pricingFaq: FaqItem[] = [
  {
    question: "Pourquoi des prix « à partir de » ?",
    answer:
      "Parce que deux sites vitrine ne se ressemblent pas : nombre de pages, contenus à rédiger, fonctionnalités. Le prix de départ correspond à un projet simple ; le devis précise tout le reste avant de commencer.",
  },
  {
    question: "Les prix sont-ils HT ou TTC ?",
    answer: "Tous les prix affichés sont HT. [À CONFIRMER : TVA applicable]",
  },
  {
    question: "Comment fonctionne le paiement en 12 fois ?",
    answer:
      "Le montant du projet est réparti en 12 mensualités égales sur l'année. [À CONFIRMER : frais éventuels]",
  },
  {
    question: "Que se passe-t-il après la mise en ligne ?",
    answer:
      "Vous pouvez choisir la formule hébergement et maintenance pour que WebSteem assure les mises à jour, la sécurité et les évolutions. Rien n'est obligatoire.",
  },
  {
    question: "Puis-je amortir mon site en comptabilité ?",
    answer:
      "Selon le projet, oui. Notre article sur l'amortissement d'un site internet explique les règles ; votre expert-comptable valide le traitement.",
  },
];
