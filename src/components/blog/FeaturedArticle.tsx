import Link from "next/link";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { exampleImages, pick } from "@/content/exemples";
import type { Article } from "@/types/strapi";
import { AuthorAvatar } from "./AuthorAvatar";
import { excerpt, firstName, formatDate } from "./format";

/**
 * Article « À la une » : le plus récent, en grand, en haut de la liste.
 * Desktop : photo à gauche (6/11) et texte à droite (5/11) dans un bloc blanc.
 * Mobile  : photo au-dessus, bouton pleine largeur.
 *
 * TODO (Strapi) : ajouter un booléen "aLaUne" à Article pour choisir l'article
 * mis en avant au lieu de prendre simplement le plus récent.
 */
export function FeaturedArticle({ article }: { article: Article }) {
  const summary = excerpt(article);
  const date = formatDate(article.datePublication);
  const author = article.auteur;
  const href = `/blog/${article.slug}`;

  return (
    <article className="flex flex-col gap-3.5 rounded-xl bg-white px-2.5 pt-2.5 pb-[22px] lg:grid lg:grid-cols-[6fr_5fr] lg:items-center lg:gap-8 lg:p-4">
      <div className="relative h-[220px] overflow-hidden rounded-xl lg:h-[400px]">
        <StrapiImage
          media={article.image}
          placeholder={pick(exampleImages.articles, article.id)}
          sizes="(min-width: 1440px) 560px, (min-width: 1024px) 40vw, 100vw"
          // Image visible sans scroller : on la précharge pour améliorer le LCP
          preload
        />
      </div>

      <div className="flex flex-col gap-3 px-2.5 lg:gap-4 lg:py-4 lg:pr-6 lg:pl-0">
        <p className="flex flex-wrap gap-2">
          <span className="rounded-lg bg-orange px-2.5 py-1 text-[13px] font-semibold text-white">À la une</span>
          {article.categorie && (
            <span className="hidden rounded-lg bg-cream px-2.5 py-1 text-[13px] font-medium lg:inline">
              {article.categorie.nom}
            </span>
          )}
        </p>

        <h2 className="text-[22px] leading-[30px] font-semibold text-navy lg:text-[30px] lg:leading-[38px]">
          <Link href={href} className="text-navy no-underline hover:text-rust">
            {article.titre}
          </Link>
        </h2>

        {summary && <p className="hidden text-[17px] leading-7 lg:block">{summary}</p>}

        {(author || date) && (
          <div className="flex items-center gap-2.5 lg:gap-3">
            {author && <AuthorAvatar author={author} size={48} ring decorative />}
            <p className="text-sm leading-5 lg:text-[15px] lg:leading-[22px]">
              {author && (
                <>
                  <b className="text-navy">{author.nom}</b>
                  <br />
                </>
              )}
              {date}
              {article.tempsLecture && (
                <span className="hidden lg:inline"> · {article.tempsLecture} min de lecture</span>
              )}
            </p>
          </div>
        )}

        <Link
          href={href}
          className="flex min-h-[52px] items-center justify-center bg-orange px-6 font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:bg-orange-dark hover:text-white hover:shadow-[0_6px_16px_rgba(29,54,66,0.16)] lg:self-start"
        >
          {/* La maquette personnalise le bouton avec le prénom de l'auteur */}
          {author ? `Lire le conseil de ${firstName(author.nom)}` : "Lire l'article"}
        </Link>
      </div>
    </article>
  );
}
