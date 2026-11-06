import Link from "next/link";
import type { CategoryWithCount } from "@/lib/strapi/blog";

/**
 * Filtres par catégorie, sous l'en-tête du blog.
 *
 * Ce sont de simples LIENS vers /blog/categorie/[slug] : pas de JavaScript,
 * chaque filtre a sa propre URL (partageable, indexable par Google).
 * Le filtre actif porte aria-current pour les lecteurs d'écran.
 *
 * Mobile : une seule ligne qui défile horizontalement (overflow-x-auto).
 */
type CategoryNavProps = {
  categories: CategoryWithCount[];
  /** Nombre total d'articles (pour « Tous ») */
  total: number;
  /** Slug de la catégorie affichée, ou undefined sur /blog */
  activeSlug?: string;
};

export function CategoryNav({ categories, total, activeSlug }: CategoryNavProps) {
  // Strapi éteint ou aucun article classé : on n'affiche pas une barre avec « Tous » seul
  if (categories.length === 0) return null;

  const items = [
    { label: "Tous", href: "/blog", count: total, active: !activeSlug },
    ...categories.map((c) => ({
      label: c.nom,
      href: `/blog/categorie/${c.slug}`,
      count: c.count,
      active: c.slug === activeSlug,
    })),
  ];

  return (
    <nav
      aria-label="Catégories d'articles"
      // -mx-5 + px-5 : sur mobile la ligne défile jusqu'au bord de l'écran
      className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-7 md:-mx-10 md:px-10 lg:mx-0 lg:flex-wrap lg:gap-2.5 lg:overflow-visible lg:px-0 lg:pb-12"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={`inline-flex min-h-11 flex-none items-center gap-2 rounded-lg px-4 text-sm no-underline lg:px-[18px] lg:text-[15px] ${
            item.active
              ? "bg-navy font-semibold text-white hover:text-white"
              : "bg-white font-medium text-ink hover:bg-cream hover:text-ink hover:shadow-[inset_0_0_0_1.5px_var(--color-navy)]"
          }`}
        >
          {item.label}
          <span className={item.active ? "font-normal" : ""}>{item.count}</span>
        </Link>
      ))}
    </nav>
  );
}
