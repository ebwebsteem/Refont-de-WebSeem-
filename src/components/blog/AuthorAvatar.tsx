import { StrapiImage } from "@/components/ui/StrapiImage";
import { exampleImages, pick } from "@/content/exemples";
import type { TeamMember } from "@/types/strapi";

/**
 * Photo ronde de l'auteur (cartes, en-tête d'article).
 * Sans photo dans Strapi : portrait d'exemple. Pas de badge « Photo provisoire »
 * ici : sur un rond de 32 px il cacherait tout le visage.
 */
type AuthorAvatarProps = {
  author: Pick<TeamMember, "id" | "nom" | "photo">;
  /** Diamètre en pixels */
  size: number;
  /** Anneau blanc autour de la photo (maquette : box-shadow 0 0 0 3px #fff) */
  ring?: boolean;
  /** true quand le nom est écrit juste à côté : l'image n'apporte rien de plus aux lecteurs d'écran */
  decorative?: boolean;
};

export function AuthorAvatar({ author, size, ring = false, decorative = false }: AuthorAvatarProps) {
  return (
    <span
      // [&>span]:hidden masque le badge « Photo provisoire » (un <span> enfant direct
      // ajouté par StrapiImage) : illisible et envahissant sur un si petit rond.
      className={`relative inline-block flex-none overflow-hidden rounded-full bg-placeholder [&>span]:hidden ${ring ? "ring-3 ring-white" : ""}`}
      // Taille variable (32, 48, 56 px…) : un style en ligne est plus simple qu'une classe par taille
      style={{ width: size, height: size }}
    >
      <StrapiImage
        media={author.photo}
        placeholder={pick(exampleImages.portraits, author.id)}
        fallbackAlt={decorative ? "" : `Photo de ${author.nom}`}
        sizes={`${size}px`}
      />
    </span>
  );
}
