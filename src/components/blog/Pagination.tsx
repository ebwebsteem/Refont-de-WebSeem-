import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/**
 * Pagination de la liste d'articles (absente de la maquette, qui n'affiche
 * que 5 articles : elle n'apparaît qu'à partir de 10 articles).
 *
 * Simples liens ?page=2, ?page=3… : la page lit `searchParams.page`.
 * On conserve la recherche en cours (?q=…) dans les liens.
 */
type PaginationProps = {
  page: number;
  pageCount: number;
  /** URL de la liste, sans paramètres (ex. "/blog" ou "/blog/categorie/seo") */
  basePath: string;
  search?: string;
};

export function Pagination({ page, pageCount, basePath, search }: PaginationProps) {
  if (pageCount <= 1) return null;

  const href = (target: number) => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (target > 1) params.set("page", String(target));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const linkClass =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 text-[15px] font-semibold no-underline";

  return (
    <nav aria-label="Pagination des articles" className="flex flex-wrap items-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className={`${linkClass} gap-1 bg-white text-ink hover:text-rust`}>
          <Icon name="chevronLeft" size={18} /> Précédent
        </Link>
      )}
      {pages.map((p) =>
        p === page ? (
          <span key={p} aria-current="page" className={`${linkClass} bg-navy text-white`}>
            {p}
          </span>
        ) : (
          <Link key={p} href={href(p)} aria-label={`Page ${p}`} className={`${linkClass} bg-white text-ink hover:text-rust`}>
            {p}
          </Link>
        ),
      )}
      {page < pageCount && (
        <Link href={href(page + 1)} className={`${linkClass} gap-1 bg-white text-ink hover:text-rust`}>
          Suivant <Icon name="chevronRight" size={18} />
        </Link>
      )}
    </nav>
  );
}
