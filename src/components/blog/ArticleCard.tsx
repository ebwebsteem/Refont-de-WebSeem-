import Link from "next/link";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { exampleImages, pick } from "@/content/exemples";
import type { Article } from "@/types/strapi";
import { AuthorAvatar } from "./AuthorAvatar";
import { excerpt, firstName, metaLine } from "./format";

/**
 * Carte d'article de la grille « Les derniers conseils de l'équipe » (/blog).
 *
 * Maquette : photo arrondie, ligne "Catégorie · date", titre, résumé, puis
 * « par Prénom » à gauche et « Lire l'article » à droite.
 * Sur mobile le résumé et l'avatar sont masqués (comme sur la maquette 375 px).
 */
export function ArticleCard({ article }: { article: Article }) {
  const summary = excerpt(article);

  return (
    <article className="flex flex-col gap-2.5 lg:gap-3.5">
      <div className="relative h-[190px] overflow-hidden rounded-xl lg:h-60 lg:rounded-[14px]">
        <StrapiImage
          media={article.image}
          // article.id sert d'index : un même article garde toujours la même photo d'exemple
          placeholder={pick(exampleImages.articles, article.id)}
          fallbackAlt=""
          sizes="(min-width: 1440px) 420px, (min-width: 1024px) 30vw, 100vw"
          className="transition-transform duration-300 hover:scale-[1.015]"
        />
      </div>

      <p className="text-[13px] font-medium lg:text-sm">{metaLine(article)}</p>

      <h3 className="text-[19px] leading-[27px] font-semibold text-navy lg:text-[22px] lg:leading-[30px]">
        <Link href={`/blog/${article.slug}`} className="text-navy no-underline hover:text-rust">
          {article.titre}
        </Link>
      </h3>

      {summary && <p className="hidden text-base leading-[26px] lg:block">{summary}</p>}

      <div className="flex items-center justify-between gap-3">
        {article.auteur ? (
          <span className="flex items-center gap-2.5 text-sm">
            <span className="hidden lg:inline-flex">
              <AuthorAvatar author={article.auteur} size={32} decorative />
            </span>
            par {firstName(article.auteur.nom)}
          </span>
        ) : (
          <span />
        )}
        {/* Lien répété pour l'accessibilité : aria-label précise de quel article il s'agit */}
        <Link
          href={`/blog/${article.slug}`}
          aria-label={`Lire l'article : ${article.titre}`}
          className="inline-flex min-h-11 items-center text-[15px] font-semibold"
        >
          Lire l&apos;article
        </Link>
      </div>
    </article>
  );
}

/**
 * Carte compacte de « D'autres conseils pour votre entreprise » (bas d'article).
 * - mobile : une ligne (vignette 84 px + titre), toute la carte est un lien ;
 * - desktop : carte crème avec photo, catégorie, titre et « Lire l'article ».
 */
export function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <article className="relative flex items-center gap-3.5 rounded-xl bg-cream p-2.5 lg:flex-col lg:items-stretch lg:gap-3 lg:p-3 lg:pb-6">
      <div className="relative size-[84px] flex-none overflow-hidden rounded-[10px] lg:h-[200px] lg:w-full lg:rounded-xl">
        <StrapiImage
          media={article.image}
          placeholder={pick(exampleImages.articles, article.id)}
          sizes="(min-width: 1024px) 400px, 84px"
        />
      </div>
      <div className="flex flex-col gap-2 lg:px-3">
        {article.categorie && <p className="hidden text-sm font-medium lg:block">{article.categorie.nom}</p>}
        <h3 className="text-[15px] leading-[22px] font-semibold text-navy lg:text-xl lg:leading-7">
          {/* after:absolute after:inset-0 : le lien couvre toute la carte (cliquable partout) */}
          <Link href={`/blog/${article.slug}`} className="text-navy no-underline after:absolute after:inset-0">
            {article.titre}
          </Link>
        </h3>
        <span aria-hidden="true" className="hidden min-h-11 items-center text-[15px] font-semibold text-rust lg:inline-flex">
          Lire l&apos;article
        </span>
      </div>
    </article>
  );
}
