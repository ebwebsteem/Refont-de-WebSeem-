/**
 * Contenu détaillé des 8 pages « métier » (/offres/[slug]).
 *
 * SÉPARATION DONNÉES / GABARIT
 * Les 8 maquettes (16-metier-kine… à 30-metier-recrutement…) ont exactement
 * la même structure : seuls les textes changent. On a donc :
 * - ici, les DONNÉES : un objet par métier, indexé par son slug ;
 * - dans src/components/metier/, le GABARIT : des composants qui reçoivent
 *   ces données en props et ne contiennent aucun texte propre à un métier ;
 * - src/app/(site)/offres/[slug]/page.tsx assemble les deux.
 * Ajouter un 9e métier = ajouter une entrée dans metiers.ts et ici, sans
 * toucher au code des composants.
 *
 * POURQUOI PAS DANS STRAPI (pour l'instant) ?
 * Ces pages ont une structure riche et figée, et leurs textes bougent peu.
 * Les garder dans le code permet de générer les 8 pages en HTML statique au
 * build, sans dépendre de l'API, et TypeScript vérifie qu'aucun champ ne
 * manque. Quand l'équipe voudra les modifier elle-même, on créera dans
 * Strapi un Collection Type « Page métier » (slug UID, hero, besoins en
 * composant répétable, cas client en composant, recherches, FAQ en
 * composant répétable « Question / réponse »…) qui reprendra le type
 * `MetierPageContent` ci-dessous champ pour champ : seul ce fichier sera
 * alors remplacé par un appel à l'API.
 *
 * Les textes entre crochets ([PRIX], [Entreprise], [Prénom Nom]…) sont des
 * emplacements VOULUS par la maquette : ils seront complétés avec le client.
 */
import { exampleImages, pick } from "./exemples";
import { metiers, type Metier } from "./metiers";

/** Une carte numérotée de « Ce dont un [métier] a besoin ». */
export interface MetierNeed {
  title: string;
  text: string;
}

/** Une question de la FAQ (même forme que le composant <Faq>). */
export interface MetierFaqItem {
  question: string;
  answer: string;
}

export interface MetierPageContent {
  /** Dernier élément du fil d'Ariane, ex. "Avocats à Grenoble" */
  breadcrumbLabel: string;
  /** Mot utilisé dans « Parlons de votre … » (cabinet, entreprise, boutique…) */
  audience: string;
  /** Étiquette blanche au-dessus du titre */
  tag: string;
  /** Titre H1 (la promesse) */
  title: string;
  /** Seconde ligne du H1, plus petite (le mot-clé SEO : métier + ville) */
  subtitle: string;
  /** Texte d'introduction du hero (sert aussi de meta description) */
  intro: string;
  /** Texte alternatif de la photo du hero (celui de la future vraie photo) */
  heroPhotoAlt: string;
  /** Section « Le cas général » */
  needs: {
    eyebrow: string;
    title: string;
    intro: string;
    items: MetierNeed[];
  };
  /** Section « Réalisé par WebSteem » : un client du même métier */
  caseStudy: {
    category: string;
    title: string;
    /** Textes alternatifs : grande photo, puis les 2 petites */
    photoAlts: [string, string, string];
    tags: string[];
    context: string;
    need: string;
    done: string;
    result: string;
    quote: string;
    author: string;
    /** Ex. "Avocat · [Entreprise]" */
    authorRole: string;
    clientSince: string;
    storyLabel: string;
    /** ⚠️ Liens à renseigner (étude de cas complète, site du client) */
    storyHref?: string;
    siteHref?: string;
  };
  /** Bandeau « Aussi accompagné : … » */
  alsoHelped: {
    name: string;
    text: string;
    href?: string;
  };
  /** Section « Être trouvé près de chez vous » */
  local: {
    title: string;
    text: string;
    searchesLabel: string;
    /** Exemples de recherches Google ; la dernière est mise en avant */
    searches: string[];
  };
  faq: {
    title: string;
    items: MetierFaqItem[];
  };
}

/**
 * `Record<string, …>` : un objet dont les clés sont les slugs de metiers.ts.
 * Les textes ci-dessous sont repris mot pour mot des maquettes desktop.
 */
const pages: Record<string, MetierPageContent> = {
  "kinesitherapeutes": {
    breadcrumbLabel: "Kinésithérapeutes à Grenoble",
    audience: "cabinet",
    tag: "Kinésithérapeutes · Grenoble & Isère",
    title: "Vos patients vous trouvent, vos confrères aussi.",
    subtitle: "Votre site de kinésithérapeute à Grenoble",
    intro: "Un site clair pour vos patients, utile pour vos confrères et les médecins prescripteurs, et bien placé quand on cherche un kiné près de chez soi.",
    heroPhotoAlt: "[Prénom Nom], kinésithérapeute à Grenoble, en séance de rééducation.",
    needs: {
      eyebrow: "Ce dont un cabinet a besoin",
      title: "Un site pensé pour votre pratique, et pour vos patients.",
      intro: "Ce que nous prévoyons pour tout cabinet de kinésithérapie. On l'adapte ensuite à vos spécialités et à votre façon de travailler.",
      items: [
        {
          title: "Vos soins et spécialités",
          text: "Respiratoire, sport, pédiatrie, orthèses : chaque spécialité expliquée simplement, avec sa propre page."
        },
        {
          title: "La prise de rendez-vous",
          text: "Le lien vers votre agenda en ligne ou un module de réservation, visible depuis toutes les pages."
        },
        {
          title: "Les infos pratiques",
          text: "Horaires, accès, plan, équipe du cabinet : tout ce qu'un patient cherche avant d'appeler."
        },
        {
          title: "Un espace confrères et médecins",
          text: "Une page pour vos partenaires professionnels : spécialités, protocoles, contact direct."
        }
      ]
    },
    caseStudy: {
      category: "Un cabinet grenoblois",
      title: "Aqua + : un site pensé à la fois pour les patients, les médecins et les confrères.",
      photoAlts: [
        "L'équipe du cabinet de kinésithérapie Aqua +, à Grenoble.",
        "La salle de rééducation du cabinet",
        "La page d'accueil du site Aqua + sur mobile"
      ],
      tags: [
        "Site de cabinet",
        "Grenoble",
        "Prise de rendez-vous"
      ],
      context: "[Contexte du cabinet avant le projet]",
      need: "Parler aux patients, aux médecins prescripteurs et aux confrères, sans les perdre dans un même site.",
      done: "[Étapes du projet : atelier, contenus, prise de rendez-vous, mise en ligne]",
      result: "[Résultat concret pour le cabinet] · Résultat chiffré : [À COMPLÉTER]",
      quote: "[Citation centrée sur la relation : écoute, disponibilité, suivi.]",
      author: "[Prénom Nom]",
      authorRole: "Kinésithérapeute · Aqua +",
      clientSince: "[Client depuis X ans]",
      storyLabel: "Découvrir l'histoire complète d'Aqua +"
    },
    alsoHelped: {
      name: "Kiné Respi Grenoble",
      text: "Un site dédié à une spécialité, pensé pour les familles et les prescripteurs."
    },
    local: {
      title: "Les patients de votre quartier vous trouvent.",
      text: "On travaille les recherches que font vraiment vos patients, sur Google comme dans les assistants IA, avec une fiche Google à jour et des avis bien mis en avant.",
      searchesLabel: "Ce que tapent vos futurs patients :",
      searches: [
        "kiné Grenoble",
        "kinésithérapeute respiratoire Grenoble",
        "kiné du sport Saint-Martin-d'Hères",
        "kiné ouvert le samedi près de moi"
      ]
    },
    faq: {
      title: "Site de kiné : vos questions.",
      items: [
        {
          question: "Combien coûte un site pour un cabinet de kinésithérapie ?",
          answer: "À partir de [PRIX] € HT pour un site vitrine complet. Le devis dépend du nombre de spécialités présentées, du module de rendez-vous et des contenus à rédiger."
        },
        {
          question: "Mon site respecte-t-il les règles de communication de la profession ?",
          answer: "Le site reste informatif : présentation des soins, des praticiens et des informations pratiques, sans promesse de résultat. [À VALIDER avec les recommandations de l'Ordre des masseurs-kinésithérapeutes]"
        },
        {
          question: "Puis-je connecter mon agenda de rendez-vous en ligne ?",
          answer: "Oui. On intègre le lien ou le module de votre outil de prise de rendez-vous, accessible depuis chaque page du site."
        },
        {
          question: "Pourrai-je changer moi-même mes horaires ou ajouter une actualité ?",
          answer: "Oui, une formation à la prise en main est prévue pour que vous gériez ces mises à jour en autonomie."
        }
      ]
    }
  },
  "avocats": {
    breadcrumbLabel: "Avocats à Grenoble",
    audience: "cabinet",
    tag: "Avocats · Grenoble & Isère",
    title: "Vos futurs clients comprennent vos domaines avant d'appeler.",
    subtitle: "Votre site d'avocat à Grenoble",
    intro: "Un site sobre et rassurant qui explique vos domaines d'intervention, vos honoraires et le déroulé d'un premier rendez-vous, dans le respect des règles de la profession.",
    heroPhotoAlt: "[Prénom Nom], avocat à Grenoble, en rendez-vous.",
    needs: {
      eyebrow: "Ce dont un cabinet d'avocats a besoin",
      title: "Un site clair sur ce que vous faites, et sur ce que ça coûte.",
      intro: "Ce que nous prévoyons pour tout cabinet d'avocats. On l'adapte ensuite à vos domaines et à votre façon de recevoir vos clients.",
      items: [
        {
          title: "Vos domaines d'intervention",
          text: "Famille, travail, affaires : une page par domaine, écrite pour être comprise sans jargon."
        },
        {
          title: "Honoraires et déroulé",
          text: "Comment se passe un premier rendez-vous, ce qu'il coûte, quels documents apporter."
        },
        {
          title: "La prise de rendez-vous",
          text: "Un formulaire simple ou le lien vers votre agenda, au cabinet ou en visio."
        },
        {
          title: "Vos actualités juridiques",
          text: "Des articles courts sur les questions que vos clients se posent, utiles aussi pour Google."
        }
      ]
    },
    caseStudy: {
      category: "[Type de cabinet]",
      title: "[Entreprise] : [bénéfice principal du projet pour le cabinet, en une phrase].",
      photoAlts: [
        "L'équipe du cabinet [Entreprise].",
        "La salle de rendez-vous du cabinet",
        "La page d'accueil du site sur mobile"
      ],
      tags: [
        "Site de cabinet",
        "[Ville]",
        "Prise de rendez-vous"
      ],
      context: "[Contexte du cabinet avant le projet]",
      need: "[Besoin exprimé par le cabinet]",
      done: "[Étapes du projet : atelier, contenus, prise de rendez-vous, mise en ligne]",
      result: "[Résultat concret pour le cabinet] · Résultat chiffré : [À COMPLÉTER]",
      quote: "[Citation centrée sur la relation : écoute, disponibilité, suivi.]",
      author: "[Prénom Nom]",
      authorRole: "Avocat · [Entreprise]",
      clientSince: "[Client depuis X ans]",
      storyLabel: "Découvrir l'histoire complète de [Entreprise]"
    },
    alsoHelped: {
      name: "[Entreprise]",
      text: "[Ce qu'on a fait ensemble, en une phrase.]"
    },
    local: {
      title: "Vos futurs clients vous trouvent au bon moment.",
      text: "On travaille les recherches que font vraiment vos futurs clients, sur Google comme dans les assistants IA, avec une fiche Google à jour.",
      searchesLabel: "Ce que tapent vos futurs clients :",
      searches: [
        "avocat Grenoble",
        "avocat droit de la famille Grenoble",
        "avocat droit du travail Isère",
        "avocat consultation en visio près de moi"
      ]
    },
    faq: {
      title: "Site d'avocat : vos questions.",
      items: [
        {
          question: "Combien coûte un site pour un cabinet d'avocats ?",
          answer: "À partir de [PRIX] € HT pour un site vitrine complet. Le devis dépend du nombre de domaines présentés, de la prise de rendez-vous et des contenus à rédiger."
        },
        {
          question: "Mon site respecte-t-il les règles de communication de la profession ?",
          answer: "Le site reste informatif : domaines d'intervention, honoraires, présentation du cabinet, sans promesse de résultat. [À VALIDER avec les règles de la profession d'avocat]"
        },
        {
          question: "Puis-je proposer des rendez-vous en visio ?",
          answer: "Oui. Le formulaire ou votre agenda en ligne peut proposer le choix entre le cabinet et la visio."
        },
        {
          question: "Pourrai-je publier moi-même mes articles ?",
          answer: "Oui, une formation à la prise en main est prévue pour que vous gériez ces mises à jour en autonomie."
        }
      ]
    }
  },
  "photographes": {
    breadcrumbLabel: "Photographes à Grenoble",
    audience: "activité",
    tag: "Photographes · Grenoble & Isère",
    title: "Votre portfolio s'ouvre vite, et vos clients vous réservent.",
    subtitle: "Votre site de photographe à Grenoble",
    intro: "Un site qui met vos images en valeur sans les ralentir, présente vos prestations clairement et rend la demande de séance simple, sur mobile comme sur ordinateur.",
    heroPhotoAlt: "[Prénom Nom], photographe à Grenoble, en séance.",
    needs: {
      eyebrow: "Ce dont un photographe a besoin",
      title: "Un site qui montre votre regard, et qui donne envie de réserver.",
      intro: "Ce que nous prévoyons pour tout photographe. On l'adapte ensuite à vos spécialités : mariage, portrait, entreprise, immobilier.",
      items: [
        {
          title: "Un portfolio rapide",
          text: "Des galeries par thème, des images optimisées pour s'afficher vite, même sur mobile."
        },
        {
          title: "Vos prestations et tarifs",
          text: "Chaque offre expliquée : déroulé de la séance, livrables, délais, à partir de combien."
        },
        {
          title: "La demande de séance",
          text: "Un formulaire court : date, lieu, type de séance. Vous rappelez avec les bonnes infos."
        },
        {
          title: "Vos galeries clients",
          text: "Un espace privé pour livrer les photos à vos clients, si vous en avez besoin."
        }
      ]
    },
    caseStudy: {
      category: "[Type d'activité photo]",
      title: "[Entreprise] : [bénéfice principal du projet pour le ou la photographe, en une phrase].",
      photoAlts: [
        "[Prénom Nom], photographe, en séance.",
        "Une image du portfolio du client",
        "Une galerie du site sur mobile"
      ],
      tags: [
        "Site portfolio",
        "[Ville]",
        "Demande de séance"
      ],
      context: "[Contexte de l'activité avant le projet]",
      need: "[Besoin exprimé par le ou la photographe]",
      done: "[Étapes du projet : sélection des images, galeries, contenus, mise en ligne]",
      result: "[Résultat concret pour l'activité] · Résultat chiffré : [À COMPLÉTER]",
      quote: "[Citation centrée sur la relation : écoute, disponibilité, suivi.]",
      author: "[Prénom Nom]",
      authorRole: "Photographe · [Entreprise]",
      clientSince: "[Client depuis X ans]",
      storyLabel: "Découvrir l'histoire complète de [Entreprise]"
    },
    alsoHelped: {
      name: "[Entreprise]",
      text: "[Ce qu'on a fait ensemble, en une phrase.]"
    },
    local: {
      title: "Les clients de votre région vous trouvent.",
      text: "On travaille les recherches que font vraiment vos futurs clients, sur Google comme dans les assistants IA, avec une fiche Google à jour et des avis bien mis en avant.",
      searchesLabel: "Ce que tapent vos futurs clients :",
      searches: [
        "photographe Grenoble",
        "photographe mariage Isère",
        "photographe portrait entreprise Grenoble",
        "séance photo famille près de moi"
      ]
    },
    faq: {
      title: "Site de photographe : vos questions.",
      items: [
        {
          question: "Combien coûte un site pour un photographe ?",
          answer: "À partir de [PRIX] € HT pour un site vitrine complet. Le devis dépend du nombre de galeries, de l'espace client et des contenus à rédiger."
        },
        {
          question: "Mes photos vont-elles ralentir le site ?",
          answer: "Non. Les images sont compressées et servies au bon format selon l'écran, sans perte de qualité visible."
        },
        {
          question: "Mes photos sont-elles protégées ?",
          answer: "On peut limiter la taille des images publiées et afficher vos mentions de droits. [À PRÉCISER selon vos besoins]"
        },
        {
          question: "Pourrai-je ajouter moi-même de nouvelles galeries ?",
          answer: "Oui, une formation à la prise en main est prévue pour que vous gériez ces mises à jour en autonomie."
        }
      ]
    }
  },
  "artisans-du-batiment": {
    breadcrumbLabel: "Artisans du bâtiment à Grenoble",
    audience: "entreprise",
    tag: "Artisans du bâtiment · Grenoble & Isère",
    title: "On voit vos chantiers, et on vous demande un devis.",
    subtitle: "Votre site d'artisan à Grenoble",
    intro: "Un site qui montre vos réalisations, votre zone d'intervention et vos garanties, avec une demande de devis simple depuis un téléphone.",
    heroPhotoAlt: "[Prénom Nom], artisan à Grenoble, sur un chantier.",
    needs: {
      eyebrow: "Ce dont une entreprise du bâtiment a besoin",
      title: "Un site qui rassure avant le premier coup de fil.",
      intro: "Ce que nous prévoyons pour toute entreprise du bâtiment. On l'adapte ensuite à vos métiers et à votre secteur.",
      items: [
        {
          title: "Vos réalisations avant / après",
          text: "Des photos de chantiers classées par type de travaux, faciles à ajouter depuis votre téléphone."
        },
        {
          title: "Votre zone d'intervention",
          text: "Les communes où vous intervenez, une page par service pour être trouvé localement."
        },
        {
          title: "La demande de devis",
          text: "Un formulaire court avec photos du projet, et votre numéro toujours visible."
        },
        {
          title: "Vos garanties et labels",
          text: "Assurances, garanties, labels : les éléments qui rassurent avant de signer."
        }
      ]
    },
    caseStudy: {
      category: "Chauffage et climatisation",
      title: "Nicollet Chauffage : un site refait pour [bénéfice principal de la refonte, en une phrase].",
      photoAlts: [
        "L'équipe de Nicollet Chauffage.",
        "Une installation réalisée par l'entreprise",
        "Le site Nicollet Chauffage sur mobile"
      ],
      tags: [
        "Refonte de site",
        "Chauffage · climatisation",
        "[Ville]"
      ],
      context: "[Contexte de l'entreprise avant la refonte]",
      need: "[Besoin exprimé par l'entreprise]",
      done: "[Étapes du projet : audit du site existant, contenus, photos, mise en ligne]",
      result: "[Résultat concret pour l'entreprise] · Résultat chiffré : [À COMPLÉTER]",
      quote: "[Citation centrée sur la relation : écoute, disponibilité, suivi.]",
      author: "[Prénom Nom]",
      authorRole: "[Fonction] · Nicollet Chauffage",
      clientSince: "[Client depuis X ans]",
      storyLabel: "Découvrir l'histoire complète de Nicollet Chauffage"
    },
    alsoHelped: {
      name: "[Entreprise]",
      text: "[Ce qu'on a fait ensemble, en une phrase.]"
    },
    local: {
      title: "Les particuliers de votre secteur vous trouvent.",
      text: "On travaille les recherches que font vraiment vos futurs clients, sur Google comme dans les assistants IA, avec une fiche Google à jour et des avis bien mis en avant.",
      searchesLabel: "Ce que tapent vos futurs clients :",
      searches: [
        "chauffagiste Grenoble",
        "installation climatisation Isère",
        "rénovation salle de bain Meylan",
        "dépannage chaudière près de moi"
      ]
    },
    faq: {
      title: "Site d'artisan : vos questions.",
      items: [
        {
          question: "Combien coûte un site pour une entreprise du bâtiment ?",
          answer: "À partir de [PRIX] € HT pour un site vitrine complet. Le devis dépend du nombre de services, de la zone couverte et des contenus à rédiger."
        },
        {
          question: "Je n'ai pas le temps de m'occuper d'un site, comment ça se passe ?",
          answer: "On prépare les contenus avec vous en un ou deux échanges. Vous validez, on met en ligne."
        },
        {
          question: "Puis-je ajouter mes photos de chantier depuis mon téléphone ?",
          answer: "Oui. Ajouter une réalisation se fait en quelques étapes, directement depuis un smartphone."
        },
        {
          question: "Ma fiche Google peut-elle être gérée aussi ?",
          answer: "Oui, avec l'offre Gestion des fiches d'établissement Google : informations, photos et réponses aux avis."
        }
      ]
    }
  },
  "commerces": {
    breadcrumbLabel: "Commerces et e-commerce à Grenoble",
    audience: "boutique",
    tag: "Commerces & e-commerce · Grenoble & Isère",
    title: "Votre boutique vend aussi quand le rideau est baissé.",
    subtitle: "Votre site e-commerce à Grenoble",
    intro: "Un catalogue à jour, un paiement en ligne sécurisé et le retrait en boutique, pour que vos clients achètent comme ils le souhaitent.",
    heroPhotoAlt: "[Prénom Nom], dans sa boutique à Grenoble.",
    needs: {
      eyebrow: "Ce dont un commerce a besoin",
      title: "Une boutique en ligne simple à gérer, et rassurante pour vos clients.",
      intro: "Ce que nous prévoyons pour tout commerce. On l'adapte ensuite à votre catalogue et à votre façon de vendre.",
      items: [
        {
          title: "Un catalogue à jour",
          text: "Produits, stocks et prix faciles à modifier, reliés à votre caisse si besoin."
        },
        {
          title: "Le paiement sécurisé",
          text: "Carte bancaire et moyens de paiement courants, avec des CGV et pages légales prêtes."
        },
        {
          title: "Retrait en boutique et livraison",
          text: "Retrait en magasin, livraison locale ou envoi : vos clients choisissent."
        },
        {
          title: "Les avis clients",
          text: "Des avis vérifiés mis en avant pour rassurer avant l'achat."
        }
      ]
    },
    caseStudy: {
      category: "Une boutique de skateboard",
      title: "Fulkit Rider Shop : une boutique en ligne de skate, maintenue et suivie au quotidien.",
      photoAlts: [
        "L'équipe de Fulkit Rider Shop dans sa boutique.",
        "Les rayons de la boutique",
        "Une fiche produit du site sur mobile"
      ],
      tags: [
        "Maintenance e-commerce",
        "Boutique de skate",
        "[Ville]"
      ],
      context: "[Contexte de la boutique avant le projet]",
      need: "[Besoin exprimé par la boutique]",
      done: "[Étapes du projet : reprise de la boutique, mises à jour, sécurité, suivi]",
      result: "[Résultat concret pour la boutique] · Résultat chiffré : [À COMPLÉTER]",
      quote: "[Citation centrée sur la relation : écoute, disponibilité, suivi.]",
      author: "[Prénom Nom]",
      authorRole: "[Fonction] · Fulkit Rider Shop",
      clientSince: "[Client depuis X ans]",
      storyLabel: "Découvrir l'histoire complète de Fulkit Rider Shop"
    },
    alsoHelped: {
      name: "Caldo Torréfaction",
      text: "[Ce qu'on a fait ensemble, en une phrase.]"
    },
    local: {
      title: "Les clients du quartier vous trouvent, en ligne et en boutique.",
      text: "On travaille les recherches que font vraiment vos clients, sur Google comme dans les assistants IA, avec une fiche Google à jour et des avis bien mis en avant.",
      searchesLabel: "Ce que tapent vos futurs clients :",
      searches: [
        "boutique skate Grenoble",
        "café torréfié Grenoble",
        "idée cadeau artisan Isère",
        "magasin ouvert dimanche près de moi"
      ]
    },
    faq: {
      title: "Site e-commerce : vos questions.",
      items: [
        {
          question: "Combien coûte une boutique en ligne ?",
          answer: "À partir de [PRIX] € HT pour une boutique complète. Le devis dépend du nombre de produits, des moyens de paiement et de livraison, et des contenus."
        },
        {
          question: "Puis-je gérer mes produits et mes stocks moi-même ?",
          answer: "Oui. Une formation à la prise en main est prévue pour gérer produits, stocks et commandes en autonomie."
        },
        {
          question: "WooCommerce ou PrestaShop ?",
          answer: "On vous conseille selon la taille de votre catalogue et vos besoins. WebSteem est PrestaShop Expert et travaille aussi avec WooCommerce."
        },
        {
          question: "Ma boutique existe déjà, pouvez-vous la reprendre ?",
          answer: "Oui : mises à jour, sécurité, sauvegardes et petites évolutions, avec un interlocuteur qui connaît votre boutique."
        }
      ]
    }
  },
  "associations": {
    breadcrumbLabel: "Associations et clubs à Grenoble",
    audience: "association",
    tag: "Associations & clubs · Grenoble & Isère",
    title: "Vos adhérents s'inscrivent en ligne, vos bénévoles gagnent du temps.",
    subtitle: "Votre site d'association à Grenoble",
    intro: "Un site qui présente vos activités, publie votre agenda et gère les inscriptions, simple à mettre à jour par plusieurs bénévoles.",
    heroPhotoAlt: "Des adhérents de [Association] pendant une sortie.",
    needs: {
      eyebrow: "Ce dont une association a besoin",
      title: "Un site qui fait vivre l'association, sans épuiser les bénévoles.",
      intro: "Ce que nous prévoyons pour toute association ou club. On l'adapte ensuite à vos activités et à votre organisation.",
      items: [
        {
          title: "L'agenda des activités",
          text: "Sorties, cours, événements : un agenda clair, mis à jour en quelques clics."
        },
        {
          title: "Inscriptions et adhésions",
          text: "Formulaires et paiement en ligne de la cotisation, avec un suivi simple pour le bureau."
        },
        {
          title: "Plusieurs contributeurs",
          text: "Chaque responsable d'activité peut publier, avec des droits adaptés à son rôle."
        },
        {
          title: "La vie du club",
          text: "Actualités, comptes rendus, partenaires : la vie de l'association en un coup d'œil."
        }
      ]
    },
    caseStudy: {
      category: "Un club de montagne",
      title: "Club Alpin Français Grenoble Isère : un site repris et maintenu pour le club.",
      photoAlts: [
        "Des adhérents du Club Alpin Français Grenoble Isère en sortie.",
        "Une sortie du club",
        "L'agenda des sorties sur mobile"
      ],
      tags: [
        "Reprise et maintenance",
        "Club de montagne",
        "Grenoble"
      ],
      context: "[Contexte du club avant le projet]",
      need: "[Besoin exprimé par le club]",
      done: "[Étapes du projet : reprise du site existant, mises à jour, sécurité, suivi]",
      result: "[Résultat concret pour le club] · Résultat chiffré : [À COMPLÉTER]",
      quote: "[Citation centrée sur la relation : écoute, disponibilité, suivi.]",
      author: "[Prénom Nom]",
      authorRole: "[Fonction] · Club Alpin Français Grenoble Isère",
      clientSince: "[Client depuis X ans]",
      storyLabel: "Découvrir l'histoire complète du Club Alpin Français Grenoble Isère"
    },
    alsoHelped: {
      name: "[Association]",
      text: "[Ce qu'on a fait ensemble, en une phrase.]"
    },
    local: {
      title: "Les habitants du coin découvrent vos activités.",
      text: "On travaille les recherches que font vraiment vos futurs adhérents, sur Google comme dans les assistants IA, avec une fiche Google à jour.",
      searchesLabel: "Ce que tapent vos futurs adhérents :",
      searches: [
        "club escalade Grenoble",
        "association randonnée Isère",
        "club de sport associatif Grenoble",
        "activité enfant le mercredi près de moi"
      ]
    },
    faq: {
      title: "Site d'association : vos questions.",
      items: [
        {
          question: "Combien coûte un site pour une association ?",
          answer: "À partir de [PRIX] € HT pour un site vitrine complet. Le devis dépend des inscriptions en ligne, de l'agenda et des contenus à rédiger."
        },
        {
          question: "Plusieurs bénévoles peuvent-ils mettre le site à jour ?",
          answer: "Oui, chacun avec ses propres accès et des droits adaptés à son rôle."
        },
        {
          question: "Peut-on encaisser les adhésions en ligne ?",
          answer: "Oui, avec un module de paiement ou l'outil que vous utilisez déjà. [À PRÉCISER selon votre outil]"
        },
        {
          question: "Et quand le bureau change ?",
          answer: "Les accès se transmettent simplement, et la prise en main peut être refaite pour la nouvelle équipe."
        }
      ]
    }
  },
  "coachs-formateurs": {
    breadcrumbLabel: "Coachs et formateurs à Grenoble",
    audience: "activité",
    tag: "Coachs & formateurs · Grenoble & Isère",
    title: "Vos offres sont claires, et le premier échange se réserve facilement.",
    subtitle: "Votre site de coach ou formateur à Grenoble",
    intro: "Un site qui vous présente, explique vos accompagnements et vos formations, et permet de réserver un premier échange ou de s'inscrire en ligne.",
    heroPhotoAlt: "[Prénom Nom], formatrice à Grenoble, en séance.",
    needs: {
      eyebrow: "Ce dont un coach ou un formateur a besoin",
      title: "Un site qui vous ressemble, et qui transforme l'intérêt en rendez-vous.",
      intro: "Ce que nous prévoyons pour tout coach ou formateur. On l'adapte ensuite à vos accompagnements et à votre public.",
      items: [
        {
          title: "Qui vous êtes",
          text: "Votre parcours, votre approche, une vraie photo : on choisit une personne avant une offre."
        },
        {
          title: "Des offres claires",
          text: "Chaque accompagnement ou formation : pour qui, déroulé, durée, à partir de combien."
        },
        {
          title: "Réservation et inscriptions",
          text: "Un premier échange à réserver en ligne, des inscriptions aux sessions avec paiement."
        },
        {
          title: "Vos contenus",
          text: "Articles, ressources, témoignages : ce qui montre votre expertise et rassure."
        }
      ]
    },
    caseStudy: {
      category: "[Type d'activité]",
      title: "[Entreprise] : [bénéfice principal du projet pour le coach ou le formateur, en une phrase].",
      photoAlts: [
        "[Prénom Nom], en séance de formation.",
        "La salle de formation",
        "La page d'une offre sur mobile"
      ],
      tags: [
        "Site vitrine",
        "[Ville]",
        "Réservation en ligne"
      ],
      context: "[Contexte de l'activité avant le projet]",
      need: "[Besoin exprimé par le client]",
      done: "[Étapes du projet : atelier, offres, réservation, mise en ligne]",
      result: "[Résultat concret pour l'activité] · Résultat chiffré : [À COMPLÉTER]",
      quote: "[Citation centrée sur la relation : écoute, disponibilité, suivi.]",
      author: "[Prénom Nom]",
      authorRole: "[Métier] · [Entreprise]",
      clientSince: "[Client depuis X ans]",
      storyLabel: "Découvrir l'histoire complète de [Entreprise]"
    },
    alsoHelped: {
      name: "[Entreprise]",
      text: "[Ce qu'on a fait ensemble, en une phrase.]"
    },
    local: {
      title: "Les personnes qui vous cherchent vous trouvent.",
      text: "On travaille les recherches que font vraiment vos futurs clients, sur Google comme dans les assistants IA, avec une fiche Google à jour et des avis bien mis en avant.",
      searchesLabel: "Ce que tapent vos futurs clients :",
      searches: [
        "coach professionnel Grenoble",
        "formation management Isère",
        "coach reconversion en visio",
        "bilan de compétences près de moi"
      ]
    },
    faq: {
      title: "Site de coach ou formateur : vos questions.",
      items: [
        {
          question: "Combien coûte un site pour un coach ou un formateur ?",
          answer: "À partir de [PRIX] € HT pour un site vitrine complet. Le devis dépend du nombre d'offres, de la réservation en ligne et des contenus à rédiger."
        },
        {
          question: "Puis-je vendre mes formations en ligne ?",
          answer: "Oui : inscription et paiement en ligne, avec envoi automatique de la confirmation."
        },
        {
          question: "Puis-je afficher ma certification Qualiopi ?",
          answer: "Oui, en respectant les règles d'usage de la marque Qualiopi. [À VALIDER selon votre certification]"
        },
        {
          question: "Pourrai-je ajouter moi-même mes dates de sessions ?",
          answer: "Oui, une formation à la prise en main est prévue pour que vous gériez ces mises à jour en autonomie."
        }
      ]
    }
  },
  "recrutement": {
    breadcrumbLabel: "Recrutement et RH à Grenoble",
    audience: "cabinet",
    tag: "Recrutement & RH · Grenoble & Isère",
    title: "Vos offres restent à jour, les candidats déposent leur CV simplement.",
    subtitle: "Votre site de cabinet de recrutement à Grenoble",
    intro: "Un site qui parle aux entreprises comme aux candidats, avec des offres d'emploi faciles à publier et un dépôt de candidature rapide, même depuis un téléphone.",
    heroPhotoAlt: "[Prénom Nom], consultante en recrutement à Grenoble, en entretien.",
    needs: {
      eyebrow: "Ce dont un cabinet de recrutement a besoin",
      title: "Un site pour deux publics : les entreprises et les candidats.",
      intro: "Ce que nous prévoyons pour tout cabinet de recrutement ou service RH. On l'adapte ensuite à vos secteurs et à vos outils.",
      items: [
        {
          title: "Des offres d'emploi à jour",
          text: "Publier, modifier, archiver une offre en quelques minutes, avec des filtres par métier et par ville."
        },
        {
          title: "Le dépôt de candidature",
          text: "CV et message en quelques champs, depuis un téléphone, dans le respect du RGPD."
        },
        {
          title: "Un espace entreprises",
          text: "Vos méthodes, vos secteurs, le déroulé d'une mission : de quoi rassurer un futur client."
        },
        {
          title: "Des offres bien référencées",
          text: "Des offres structurées pour remonter dans les recherches d'emploi sur Google."
        }
      ]
    },
    caseStudy: {
      category: "Un cabinet de recrutement",
      title: "Alpes Recrutement : [bénéfice principal du projet pour le cabinet, en une phrase].",
      photoAlts: [
        "L'équipe d'Alpes Recrutement.",
        "Un entretien dans les bureaux du cabinet",
        "La liste des offres sur mobile"
      ],
      tags: [
        "[Type de projet]",
        "Recrutement",
        "[Ville]"
      ],
      context: "[Contexte du cabinet avant le projet]",
      need: "[Besoin exprimé par le cabinet]",
      done: "[Étapes du projet : à compléter avec ce qui a été réalisé]",
      result: "[Résultat concret pour le cabinet] · Résultat chiffré : [À COMPLÉTER]",
      quote: "[Citation centrée sur la relation : écoute, disponibilité, suivi.]",
      author: "[Prénom Nom]",
      authorRole: "[Fonction] · Alpes Recrutement",
      clientSince: "[Client depuis X ans]",
      storyLabel: "Découvrir l'histoire complète d'Alpes Recrutement"
    },
    alsoHelped: {
      name: "[Entreprise]",
      text: "[Ce qu'on a fait ensemble, en une phrase.]"
    },
    local: {
      title: "Les entreprises et les candidats de la région vous trouvent.",
      text: "On travaille les recherches que font vraiment entreprises et candidats, sur Google comme dans les assistants IA, avec une fiche Google à jour.",
      searchesLabel: "Ce que tapent entreprises et candidats :",
      searches: [
        "cabinet de recrutement Grenoble",
        "offre d'emploi technicien Isère",
        "recrutement cadre Alpes",
        "cabinet recrutement industrie près de moi"
      ]
    },
    faq: {
      title: "Site de recrutement : vos questions.",
      items: [
        {
          question: "Combien coûte un site pour un cabinet de recrutement ?",
          answer: "À partir de [PRIX] € HT pour un site complet. Le devis dépend du module d'offres, du dépôt de candidature et des contenus à rédiger."
        },
        {
          question: "Peut-on relier le site à notre logiciel de recrutement ?",
          answer: "Selon votre outil : import automatique des offres ou lien vers vos annonces. [À PRÉCISER selon votre outil]"
        },
        {
          question: "Les candidatures respectent-elles le RGPD ?",
          answer: "Oui : consentement, durée de conservation et suppression des données sont prévus dès la conception."
        },
        {
          question: "Pourrai-je publier les offres moi-même ?",
          answer: "Oui, une formation à la prise en main est prévue pour que vous gériez ces mises à jour en autonomie."
        }
      ]
    }
  },
};

/** Photos provisoires d'une page métier (remplacées plus tard par les vraies). */
export interface MetierPagePhotos {
  hero: string;
  caseMain: string;
  caseSmall: [string, string];
  author: string;
}

/** Tout ce dont le gabarit a besoin pour afficher une page métier. */
export interface MetierPage {
  metier: Metier;
  content: MetierPageContent;
  photos: MetierPagePhotos;
}

/**
 * Renvoie la page d'un métier, ou `undefined` si le slug est inconnu
 * (la page appellera alors notFound() pour afficher une 404).
 */
export function getMetierPage(slug: string): MetierPage | undefined {
  const index = metiers.findIndex((metier) => metier.slug === slug);
  const content = pages[slug];
  if (index === -1 || !content) return undefined;

  const { projects, portraits } = exampleImages;
  return {
    metier: metiers[index],
    content,
    photos: {
      // Même photo que la carte du métier sur l'accueil : continuité visuelle
      hero: metiers[index].photo,
      // pick() recommence au début de la liste : 8 métiers pour 6 photos de projets
      caseMain: pick(projects, index),
      caseSmall: [pick(projects, index + 1), pick(projects, index + 2)],
      author: pick(portraits, index + 1),
    },
  };
}
