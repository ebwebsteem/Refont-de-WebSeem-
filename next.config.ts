import type { NextConfig } from "next";

// Même valeur par défaut que dans src/lib/strapi/client.ts
const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

const nextConfig: NextConfig = {
  // Build autonome pour le déploiement Passenger (repris de develop)
  output: "standalone",
  outputFileTracingRoot: __dirname,

  // Nécessaire pour 'use cache' / cacheLife / cacheTag (appels Strapi)
  cacheComponents: true,
  partialPrefetching: true,

  images: {
    // <Image> de Next.js refuse les images externes non déclarées ici :
    // on autorise uniquement le dossier des médias uploadés dans Strapi.
    remotePatterns: [
      new URL(`${strapiUrl}/uploads/**`),
      // Photos d'exemple provisoires (Unsplash, licence gratuite) : voir src/content/exemples.ts.
      // Pas de propriété `search` : on autorise les paramètres ?w=…&q=… d'Unsplash.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    // En local, Strapi tourne sur localhost. Depuis Next 16, l'optimisation
    // d'images venant d'une IP locale est bloquée par défaut (protection SSRF).
    // On ne l'autorise qu'en développement.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
