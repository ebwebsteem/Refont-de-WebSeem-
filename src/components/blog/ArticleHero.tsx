import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { exampleImages, pick } from "@/content/exemples";
import type { Article } from "@/types/strapi";
import { AuthorAvatar } from "./AuthorAvatar";
import { formatDate } from "./format";
import { ShareLinks } from "./ShareLinks";

/**
 * En-tête d'article : grande photo, voile bleu dégradé, titre en blanc par-dessus.
 * - desktop : carte arrondie dans les marges, dégradé de gauche à droite ;
 * - mobile  : pleine largeur, dégradé de haut en bas, « ‹ Retour au blog ».
 */
type ArticleHeroProps = {
  article: Article;
  readingTime: number;
  /** URL absolue de l'article, pour les boutons de partage */
  shareUrl: string;
};

// Dégradés copiés de la maquette (couleur ink #20304A à différentes opacités)
const gradientDesktop =
  "linear-gradient(90deg, rgba(32,48,74,0.94) 0%, rgba(32,48,74,0.86) 42%, rgba(32,48,74,0.55) 62%, rgba(32,48,74,0.08) 88%), linear-gradient(0deg, rgba(32,48,74,0.55) 0%, rgba(32,48,74,0) 45%)";
const gradientMobile =
  "linear-gradient(180deg, rgba(32,48,74,0.05) 0%, rgba(32,48,74,0.35) 25%, rgba(32,48,74,0.84) 42%, rgba(32,48,74,0.94) 100%)";

export function ArticleHero({ article, readingTime, shareUrl }: ArticleHeroProps) {
  const author = article.auteur;
  const date = formatDate(article.datePublication);

  return (
    <section className="mx-auto w-full max-w-[1440px] lg:px-10 lg:pt-8 xl:px-24">
      <div className="relative flex min-h-[580px] items-end overflow-hidden bg-navy lg:min-h-[620px] lg:rounded-[14px]">
        <StrapiImage
          media={article.image}
          placeholder={pick(exampleImages.articles, article.id)}
          fallbackAlt=""
          sizes="(min-width: 1440px) 1248px, 100vw"
          // Photo principale, visible immédiatement : préchargée (remplace l'ancien `priority`)
          preload
          className="object-[40%_30%] lg:object-[70%_40%]"
        />
        {/* Voile dégradé pour que le texte blanc reste lisible sur la photo */}
        <div aria-hidden="true" className="absolute inset-0 lg:hidden" style={{ background: gradientMobile }} />
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block" style={{ background: gradientDesktop }} />

        <div className="relative flex w-full max-w-[760px] flex-col gap-3.5 px-5 pb-7 [text-shadow:0_1px_12px_rgba(32,48,74,0.45)] lg:gap-5 lg:px-16 lg:pb-14">
          {/* Mobile : lien retour ; desktop : fil d'Ariane complet */}
          <Link href="/blog" className="inline-flex min-h-11 items-center text-sm text-white lg:hidden">
            ‹ Retour au blog
          </Link>
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Blog", href: "/blog" },
              // Comme la maquette, le fil s'arrête à la catégorie (le titre est juste en dessous)
              { label: article.categorie?.nom ?? article.titre },
            ]}
            // Variantes arbitraires : on recolore en blanc le composant partagé sans le modifier
            className="hidden lg:block [&_a]:text-white [&_a]:hover:text-white [&_ol]:text-[15px] [&_ol]:text-white"
          />

          {article.categorie && (
            <p>
              <Link
                href={`/blog/categorie/${article.categorie.slug}`}
                className="rounded-lg bg-white/16 px-2.5 py-[5px] text-[13px] font-semibold text-white no-underline hover:bg-white/25 hover:text-white lg:px-3 lg:py-1.5 lg:text-sm"
              >
                {article.categorie.nom}
              </Link>
            </p>
          )}

          <h1 className="text-[28px] leading-9 font-semibold tracking-[-0.01em] text-balance text-white lg:text-[46px] lg:leading-[54px] lg:tracking-[-0.02em]">
            {article.titre}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3 lg:gap-3.5">
              {author && (
                <>
                  <span className="lg:hidden">
                    <AuthorAvatar author={author} size={48} ring decorative />
                  </span>
                  <span className="hidden lg:inline">
                    <AuthorAvatar author={author} size={56} ring decorative />
                  </span>
                </>
              )}
              <p className="text-sm leading-5 text-white lg:text-[15px] lg:leading-[22px]">
                {author && (
                  <>
                    <b>{author.nom}</b>
                    {author.poste && <span className="hidden lg:inline">, {author.poste}</span>}
                    <br />
                  </>
                )}
                {date && <time dateTime={article.datePublication ?? undefined}>{date}</time>}
                {date && " · "}
                {readingTime} min de lecture
              </p>
            </div>
            <div className="hidden lg:block">
              <ShareLinks url={shareUrl} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
