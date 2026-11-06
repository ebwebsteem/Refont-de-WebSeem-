/**
 * Banque de PHOTOS PROVISOIRES, sur le thème du développement web.
 *
 * La maquette utilise des photos d'exemple (badge « Photo provisoire ») ;
 * on les remplace ici par des photos Unsplash (https://unsplash.com/license) :
 * utilisation gratuite, y compris commerciale, sans obligation de citer l'auteur.
 * Elles sont chargées depuis images.unsplash.com (autorisé dans
 * next.config.ts > images.remotePatterns) puis optimisées par <Image>.
 *
 * ⚠️ À remplacer par les vraies photos de l'équipe et des clients
 * (dans Strapi pour le contenu dynamique, dans /public pour le reste).
 */

/**
 * Construit l'URL d'une photo Unsplash à partir de son identifiant
 * (visible dans l'URL de la photo sur unsplash.com).
 * `w=1600` limite le poids du fichier source ; <Image> générera ensuite
 * les tailles plus petites dont le navigateur a besoin.
 */
function unsplash(id: string): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
}

export const exampleImages = {
  /** Carrousel du hero de l'accueil (3 photos) */
  heroSlides: [
    unsplash("1522071820081-009f0129c71c"), // équipe autour d'ordinateurs portables
    unsplash("1556761175-b413da4baf72"), // équipe dans des bureaux lumineux
    unsplash("1517245386807-bb43f82c33c4"), // rendez-vous client
  ],
  /** Atelier de travail avec un client */
  workshop: unsplash("1557804506-669a67965ba0"),
  /** Bureaux de Grenoble et de Saint-Cyr-sur-Mer */
  offices: [unsplash("1504384308090-c894fdcc538d"), unsplash("1556761175-4b46a572b786")],
  /** Cartes "Vos besoins" (une par métier, dans l'ordre de content/metiers.ts) */
  metiers: [
    unsplash("1498050108023-c5249f4df085"),
    unsplash("1547658719-da2b51169166"),
    unsplash("1551836022-d5d88e9218df"),
    unsplash("1605379399642-870262d3d051"),
    unsplash("1619410283995-43d9134e7656"),
    unsplash("1467232004584-a241de8bcf5d"),
    unsplash("1499951360447-b19be8fe80f5"),
    unsplash("1587620962725-abab7fe55159"),
  ],
  /** Projets / références clients */
  projects: [
    unsplash("1484417894907-623942c8ee29"),
    unsplash("1461749280684-dccba630e2f6"),
    unsplash("1542831371-29b0f74f9713"),
    unsplash("1607799279861-4dd421887fb3"),
    unsplash("1593720213428-28a5b9e94613"),
    unsplash("1571171637578-41bc2dd41cd2"),
  ],
  /** Vignettes des logos clients (bandeau "Ils nous font confiance") */
  clients: [
    unsplash("1507238691740-187a5b1d37b8"),
    unsplash("1541746972996-4e0b0f43e02a"),
    unsplash("1606857521015-7f9fcf423740"),
    unsplash("1521737852567-6949f3f9f2b5"),
    unsplash("1551434678-e076c223a692"),
  ],
  /** Portraits (équipe, témoignages, interlocuteur) */
  portraits: [
    unsplash("1566753323558-f4e0952af115"), // homme souriant, lunettes
    unsplash("1580489944761-15a19d654956"), // femme souriante
    unsplash("1600180758890-6b94519a8ba6"), // homme, fond clair
    unsplash("1531123897727-8f129e1688ce"), // femme, fond orangé
    unsplash("1573496359142-b8d87734a5a2"), // femme, bureau
    unsplash("1536104968055-4d61aa56f46a"), // homme au casque devant un écran
    unsplash("1623479322729-28b25c16b011"), // homme sur ordinateur
  ],
  /** Visuels d'articles de blog */
  articles: [
    unsplash("1522202176988-66273c2fd55f"),
    unsplash("1454165804606-c3d57bc86b40"),
    unsplash("1484417894907-623942c8ee29"),
    unsplash("1551434678-e076c223a692"),
    unsplash("1517245386807-bb43f82c33c4"),
  ],
};

/** Portrait provisoire de l'interlocuteur principal (Emmanuel). */
export const contactPortrait = exampleImages.portraits[0];

/**
 * Renvoie l'élément n° `index` d'une liste en recommençant au début une fois
 * arrivé au bout (opérateur modulo %). Ex. avec 4 portraits, la 5e personne
 * reçoit le 1er portrait.
 */
export function pick(list: string[], index: number): string {
  return list[index % list.length];
}
