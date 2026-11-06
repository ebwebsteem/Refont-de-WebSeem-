import Link from "next/link";
import { Icon, type IconName } from "./Icon";

/**
 * Bouton-lien du design system WebSteem.
 *
 * Particularités de la maquette :
 * - coins carrés (border-radius: 0) ;
 * - l'orange est réservé au bouton d'action principal (variant "primary") ;
 * - au survol, le bouton monte de 1 px avec une ombre douce.
 *
 * Les liens internes passent par <Link> (navigation sans rechargement).
 * Les liens "tel:", "mailto:" ou externes passent par un simple <a>.
 */
const variants = {
  /** Orange plein : l'action principale de la zone */
  primary: "bg-orange text-white hover:bg-orange-dark",
  /** Contour blanc, sur fond foncé ou photo */
  outlineLight: "text-white shadow-[inset_0_0_0_2px_#fff] hover:bg-white/10",
  /** Fond crème, sur fond bleu */
  light: "bg-cream text-ink hover:bg-white",
  /** Contour bleu, sur fond clair */
  outline: "bg-white text-navy shadow-[inset_0_0_0_2px_var(--color-navy)] hover:bg-cream",
} as const;

const sizes = {
  md: "min-h-[52px] px-6 text-base",
  lg: "min-h-14 px-7 text-[17px]",
} as const;

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Icône avant le texte */
  icon?: IconName;
  /** Icône après le texte (ex. "arrowRight") */
  iconAfter?: IconName;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  icon,
  iconAfter,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2.5 font-semibold no-underline transition duration-200 ease-out hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(29,54,66,0.16)] ${variants[variant]} ${sizes[size]} ${className}`;

  // Le contenu est identique pour <Link> et <a>
  const content = (
    <>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
      {iconAfter && <Icon name={iconAfter} size={18} strokeWidth={2.2} />}
    </>
  );

  // Lien externe ou spécial (tel:, mailto:, https://…) : <a> classique
  const isExternal = /^(tel:|mailto:|https?:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
