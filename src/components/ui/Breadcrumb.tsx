import Link from "next/link";

/**
 * Fil d'Ariane en haut des pages intérieures : « Accueil › Blog › Article ».
 * Le dernier élément (page courante) n'est pas un lien et porte
 * aria-current="page" pour les lecteurs d'écran.
 */
export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className="text-ink underline hover:text-rust">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
              {!isLast && <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
