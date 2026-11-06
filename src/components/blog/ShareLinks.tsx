import { CopyLinkButton } from "./CopyLinkButton";

/**
 * Boutons de partage de l'en-tête d'article (LinkedIn, Facebook, copier le lien).
 *
 * LinkedIn et Facebook : de simples liens vers leurs pages de partage, avec
 * l'URL de l'article encodée (encodeURIComponent) dans les paramètres.
 * Aucun script tiers chargé : pas de cookies, pas de ralentissement.
 *
 * `url` doit être ABSOLUE (https://…) : les réseaux sociaux ne connaissent
 * pas notre domaine.
 */
const buttonClass =
  "flex size-11 items-center justify-center bg-white/14 font-bold text-white no-underline shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.6)] transition hover:bg-white/25 hover:text-white";

export function ShareLinks({ url }: { url: string }) {
  const encoded = encodeURIComponent(url);

  return (
    <div className="flex gap-2" role="group" aria-label="Partager l'article">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn"
        className={`${buttonClass} text-sm`}
      >
        in
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur Facebook"
        className={`${buttonClass} text-base`}
      >
        f
      </a>
      <CopyLinkButton url={url} className={buttonClass} />
    </div>
  );
}
