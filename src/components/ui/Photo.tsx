import Image from "next/image";

/**
 * Photo qui remplit son parent, avec le badge « Photo provisoire » de la maquette.
 *
 * Le PARENT fixe la taille et doit être en `position: relative` (classe
 * "relative") ; ex. <div className="relative h-60 overflow-hidden rounded-xl">.
 * <Image fill> s'étire alors pour le couvrir, `object-cover` recadre sans
 * déformer.
 *
 * `sizes` est important : il dit au navigateur quelle largeur la photo
 * occupera à l'écran, pour qu'il ne télécharge pas une image trop grande.
 */
type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Affiche le badge « Photo provisoire » (vrai par défaut) */
  provisional?: boolean;
  /** Position du badge */
  badge?: "top-left" | "top-right";
  /** À activer pour la photo principale visible sans scroller */
  preload?: boolean;
  /** Classes ajoutées à l'image (ex. "object-[50%_30%]" pour recadrer) */
  className?: string;
};

export function Photo({
  src,
  alt,
  sizes,
  provisional = true,
  badge = "top-left",
  preload = false,
  className = "",
}: PhotoProps) {
  return (
    <>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={`object-cover ${className}`} />
      {provisional && <ProvisionalBadge position={badge} />}
    </>
  );
}

/** Étiquette « Photo provisoire » (rappel : photo à remplacer avant la mise en ligne). */
export function ProvisionalBadge({ position = "top-left" }: { position?: "top-left" | "top-right" }) {
  return (
    <span
      className={`absolute top-3 rounded-lg bg-ink/85 px-2.5 py-1 text-xs font-semibold text-white ${
        position === "top-left" ? "left-3" : "right-3"
      }`}
    >
      Photo provisoire
    </span>
  );
}
