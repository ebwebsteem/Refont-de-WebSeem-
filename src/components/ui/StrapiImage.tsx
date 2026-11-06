import { getStrapiMediaUrl } from "@/lib/strapi/client";
import type { StrapiMedia } from "@/types/strapi";
import { Photo } from "./Photo";

/**
 * Affiche un média Strapi (photo d'un membre, image d'article…).
 *
 * Ordre de priorité :
 * 1. l'image uploadée dans Strapi ;
 * 2. sinon la photo d'exemple `placeholder`, avec le badge « Photo provisoire » ;
 * 3. sinon un aplat gris.
 *
 * Même règle que <Photo> : le parent fixe la taille et est en "relative".
 * Ce composant est un Server Component (il lit STRAPI_URL côté serveur).
 */
type StrapiImageProps = {
  media: StrapiMedia | null | undefined;
  sizes: string;
  /** Texte alternatif par défaut si le champ est vide dans Strapi */
  fallbackAlt?: string;
  /** URL d'une photo d'exemple affichée quand le média Strapi est vide */
  placeholder?: string;
  preload?: boolean;
  className?: string;
};

export function StrapiImage({
  media,
  sizes,
  fallbackAlt = "",
  placeholder,
  preload = false,
  className = "",
}: StrapiImageProps) {
  const strapiUrl = getStrapiMediaUrl(media?.url);
  const src = strapiUrl ?? placeholder;

  if (!src) {
    return <div className="absolute inset-0 bg-placeholder" aria-hidden="true" />;
  }

  return (
    <Photo
      src={src}
      alt={media?.alternativeText ?? fallbackAlt}
      sizes={sizes}
      preload={preload}
      // Le badge n'apparaît que pour une photo d'exemple, pas pour une vraie image Strapi
      provisional={!strapiUrl}
      className={className}
    />
  );
}
