# Refonte de WebSteem

Refonte du site de l'agence [WebSteem](https://websteem.com/) (communication digitale et webmarketing, Grenoble et Saint-Cyr-sur-Mer), pour les TPE/PME de France et de Suisse romande.

> **Statut : phase de cadrage.** Le cahier des charges est en cours de rédaction. La technologie n'est pas encore tranchée : la piste actuelle est **Next.js + CMS headless**.

## Pourquoi cette refonte

Le site actuel (WordPress avec Slider Revolution) dépend d'extensions payantes et vulnérables, et il est lourd. Mesure Ecoindex du 2 novembre 2026 : **note F, 16/100, 4,2 Mo, 1 510 éléments, 150 requêtes**.

## Objectifs

| Objectif | Cible |
|---|---|
| Indépendance vis-à-vis des extensions payantes | Aucune licence de builder ou de slider |
| Éco-conception | Ecoindex et Website Carbon : **B visé, C minimum** |
| Accessibilité | 0 erreur WAVE, RGAA / WCAG 2.1 AA visé |
| RGPD | Aucun traceur avant consentement, bandeau conforme |
| Paiement en ligne | Paiement sécurisé de services via un prestataire certifié |
| Génération de leads | Tunnel(s) de vente, contact en étapes |
| Autonomie éditoriale | Pages, portfolio et blog modifiables via un back-office |
| Interface | Simple, interactive et légère |
| Référencement | SEO et GEO : agence web à Grenoble, Lyon, Marseille, Toulon, Aix-en-Provence, PACA |

## Contenu prévu

- Accueil
- Services (une page par service)
- Offres : Cap Croissance (lien vers capcroissance-sud.fr) et Gestion des fiches d'établissement Google
- Portfolio (études de cas clients)
- Blog (actualités des projets, SEO, SEA, IA…)
- Contact, sous forme de tunnel de vente
- Équipe
- Références clients
- Engagements RSE
- Mentions légales, CGV, politique de confidentialité

## Choix technique

| Point | État |
|---|---|
| Front | Next.js (piste privilégiée, **non décidée**) |
| Back-office | CMS headless à choisir (Payload, Directus ou Strapi) |
| Paiement | Page de paiement hébergée par le prestataire, par exemple Stripe (à confirmer) |
| Hébergement | À confirmer (hébergement vert souhaité) |

Contrainte forte : limiter le JavaScript envoyé au navigateur pour atteindre la note Ecoindex visée (pas de slider, pas de builder, peu de scripts).

## Charte graphique

- Dégradé bleu : `#25358a` vers `#5866a7` (milieu `#405395`)
- Fond uni : `#25358a`
- Rouge flèche : `#fe471f` (grands titres et icônes uniquement : contraste insuffisant pour du petit texte)
- Blanc cassé : `#fffff8`
- Typographies : Warsaw Gothic (Woodtype Oblique), Helvetica Compressed, Poppins

Crédit de la flèche : icône d'[Icon Fonts](http://www.onlinewebfonts.com/icon), licence CC BY 3.0.

## Documentation

- Cahier des charges : *lien à ajouter*
- Charte graphique : *lien à ajouter*

## Installation et lancement

À compléter une fois la technologie choisie.

## Organisation du dépôt

À définir. Proposition de départ :

```
/docs      cahier des charges, charte, décisions techniques
/src       code du site
/content   contenus migrés depuis l'ancien site
```

## Contribuer

1. Créer une branche à partir de `main` (`feature/nom-court`).
2. Faire des commits courts et explicites, en français.
3. Ouvrir une pull request et attendre une relecture avant de fusionner.

## Contact

WebSteem · contact@websteem.com
