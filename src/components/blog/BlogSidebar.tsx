import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { siteConfig } from "@/config/site";
import { contactPortrait } from "@/content/exemples";
import type { Article } from "@/types/strapi";

/**
 * Colonne de droite du blog : encadré « Une question sur votre site ? »
 * et liste « Les plus lus ».
 */
export function BlogSidebar({ popular }: { popular: Article[] }) {
  return (
    <aside className="flex flex-col gap-6">
      <ContactBox />
      <PopularArticles articles={popular} />
    </aside>
  );
}

/**
 * Encadré bleu avec l'interlocuteur. Exporté à part : sur mobile la maquette
 * le place APRÈS la liste d'articles, sans la liste « Les plus lus ».
 */
export function ContactBox({ className = "" }: { className?: string }) {
  const { firstName, fullName } = siteConfig.contact;

  return (
    <div className={`flex flex-col gap-3 rounded-xl bg-navy p-6 text-white lg:gap-3.5 lg:p-7 ${className}`}>
      {/* Portrait : uniquement sur desktop (absent de la maquette mobile) */}
      <div className="relative hidden size-20 overflow-hidden rounded-full bg-navy-light ring-3 ring-white lg:block [&>span]:hidden">
        <Photo src={contactPortrait} alt={`Photo de ${fullName}`} sizes="80px" />
      </div>
      <h2 className="text-[22px] leading-[30px] font-semibold lg:text-2xl lg:leading-8">Une question sur votre site ?</h2>
      <p className="text-[15px] leading-6 lg:text-base lg:leading-[26px]">
        {firstName} vous répond directement, à Grenoble ou en visio.
      </p>
      <Button href={siteConfig.phone.href} variant="light" size="md" className="w-full">
        Appeler {firstName}
      </Button>
    </div>
  );
}

/**
 * « Les plus lus ».
 * TODO (Strapi) : Strapi ne compte pas les vues. Il faudra soit un champ
 * "vues" alimenté par l'outil de statistiques, soit une sélection manuelle
 * (relation "articlesPopulaires" dans un Single Type Blog). En attendant,
 * on affiche les 3 articles les plus récents.
 */
function PopularArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <div className="hidden flex-col gap-3 rounded-xl bg-white px-7 py-6 lg:flex">
      <h2 className="text-xl leading-7 font-semibold text-navy">Les plus lus</h2>
      <ol className="flex flex-col gap-3.5">
        {articles.map((article, index) => (
          <li key={article.documentId} className="flex gap-3">
            <span className="font-semibold text-rust">{index + 1}</span>
            <Link
              href={`/blog/${article.slug}`}
              className="text-[15px] leading-[22px] font-medium text-ink no-underline hover:text-rust hover:underline"
            >
              {article.titre}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
