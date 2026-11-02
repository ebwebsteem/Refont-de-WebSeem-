DROP DATABASE IF EXISTS websteem_test;
CREATE DATABASE websteem_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE websteem_test;

-- Services (les 8 de l'agence)
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  titre VARCHAR(255) NOT NULL,
  description_courte TEXT,
  meta_title VARCHAR(70),
  meta_description VARCHAR(160)
) ENGINE=InnoDB;

-- Équipe
CREATE TABLE equipe (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  poste VARCHAR(100),
  bio TEXT
) ENGINE=InnoDB;

-- Articles de blog
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(150) NOT NULL UNIQUE,
  titre VARCHAR(255) NOT NULL,
  categorie VARCHAR(50),
  contenu TEXT,
  auteur_id INT,
  publie TINYINT(1) DEFAULT 1,
  date_publication DATE,
  CONSTRAINT fk_articles_auteur FOREIGN KEY (auteur_id) REFERENCES equipe(id)
) ENGINE=InnoDB;

-- Portfolio : études de cas
CREATE TABLE etudes_de_cas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(150) NOT NULL UNIQUE,
  client VARCHAR(150) NOT NULL,
  service_id INT,
  contexte TEXT,
  solution TEXT,
  resultats TEXT,
  CONSTRAINT fk_cas_service FOREIGN KEY (service_id) REFERENCES services(id)
) ENGINE=InnoDB;

-- Témoignages
CREATE TABLE temoignages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client VARCHAR(150) NOT NULL,
  texte TEXT NOT NULL,
  note TINYINT
) ENGINE=InnoDB;

-- FAQ
CREATE TABLE faq (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  reponse TEXT NOT NULL,
  service_id INT NULL,
  CONSTRAINT fk_faq_service FOREIGN KEY (service_id) REFERENCES services(id)
) ENGINE=InnoDB;

-- Redirections 301
CREATE TABLE redirections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ancienne_url VARCHAR(250) NOT NULL UNIQUE,
  nouvelle_url VARCHAR(500) NOT NULL
) ENGINE=InnoDB;

-- Leads du tunnel de contact
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  besoin VARCHAR(100),
  budget VARCHAR(50),
  delai VARCHAR(50),
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ===== Jeu de test =====
INSERT INTO services (slug, titre, description_courte) VALUES
('site-vitrine-ecommerce', 'Sites vitrine et e-commerce', 'Création de sites sur mesure pour TPE/PME.'),
('applications-mobiles', 'Applications mobiles', 'Applications iOS et Android.'),
('reseaux-sociaux', 'Réseaux sociaux', 'Animation et stratégie de vos comptes.'),
('e-mailing', 'E-mailing', 'Campagnes d''e-mailing et newsletters.'),
('formation', 'Formation', 'Formations au numérique pour vos équipes.'),
('hebergement', 'Hébergement', 'Hébergement et maintenance de votre site.'),
('seo', 'SEO', 'Référencement naturel.'),
('sea', 'SEA', 'Publicité sur les moteurs de recherche.');

INSERT INTO equipe (nom, poste, bio) VALUES
('Emmanuel Bertrand', 'Dirigeant', 'Fondateur de l''agence.'),
('Camille Martin', 'Chargée de communication', 'Réseaux sociaux et rédaction.');

INSERT INTO articles (slug, titre, categorie, contenu, auteur_id, date_publication) VALUES
('seo-local-tpe', 'Le SEO local pour les TPE', 'SEO', 'Texte de test sur le SEO local...', 1, '2026-09-10'),
('fiche-google-etablissement', 'Optimiser sa fiche d''établissement Google', 'SEO', 'Texte de test...', 2, '2026-10-02'),
('ia-et-webmarketing', 'L''IA au service du webmarketing', 'IA', 'Texte de test...', 1, '2026-10-20');

INSERT INTO etudes_de_cas (slug, client, service_id, contexte, solution, resultats) VALUES
('boulangerie-dupont', 'Boulangerie Dupont', 1, 'Pas de site, peu de visibilité.', 'Site vitrine avec commande en ligne.', '+40 % de commandes en 3 mois.'),
('cabinet-sante-grenoble', 'Cabinet de santé Grenoble', 7, 'Site existant mal référencé.', 'Refonte SEO local.', 'Page 1 sur 5 requêtes ciblées.');

INSERT INTO temoignages (client, texte, note) VALUES
('Boulangerie Dupont', 'Équipe réactive et à l''écoute.', 5),
('Cabinet de santé Grenoble', 'Nos demandes de rendez-vous ont augmenté.', 5);

INSERT INTO faq (question, reponse, service_id) VALUES
('Combien de temps pour créer un site ?', 'En général 3 à 6 semaines.', 1),
('Qu''est-ce que le SEO ?', 'L''ensemble des techniques pour apparaître dans les résultats de recherche.', 7);

INSERT INTO redirections (ancienne_url, nouvelle_url) VALUES
('/creation-site-internet-grenoble/', '/services/site-vitrine-ecommerce'),
('/referencement-seo/', '/services/seo');

INSERT INTO leads (nom, email, besoin, budget, delai) VALUES
('Jean Test', 'jean@exemple.fr', 'Site vitrine', '2000-5000', '1 mois');