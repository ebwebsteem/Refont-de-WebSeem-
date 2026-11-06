import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ArticleFaq, KeyTakeaways } from "@/components/blog/ArticleExtras";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { prepareContent } from "@/components/blog/content";
import { Newsletter } from "@/components/blog/Newsletter";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { TableOfContents, TableOfContentsMobile } from "@/components/blog/TableOfContents";
import { Container } from "@/components/ui/Container";
import { getStrapiMediaUrl, withFallback } from "@/lib/strapi/client";
import { getArticleBySlug, getArticleSlugs } from "@/lib/strapi/blog";

/**
 * Page article : /blog/[slug] (maquettes 11, 12 et 13).
 *
 * ──────────────────────────────────────────────────────────────────────
 * COMMENT CETTE PAGE EST GÉNÉRÉE ET MISE EN CACHE
 * ──────────────────────────────────────────────────────────────────────
 * 1. AU BUILD, generateStaticParams() demande à Strapi la liste des slugs.
 *    Next génère une page HTML statique pour chacun (ultra rapide ensuite).
 *
 * 2. UN ARTICLE PUBLIÉ APRÈS LE BUILD n'est pas dans cette liste. À la
 *    première visite, Next génère sa page à la demande, puis la garde en
 *    cache pour les visiteurs suivants (c'est l'ISR : Incremental Static
 *    Regeneration).
 *
 * 3. LES DONNÉES viennent de getArticleBySlug(), en 'use cache' avec
 *    cacheLife("hours") : au plus tard une heure après une modification
 *    dans Strapi, la page est régénérée en arrière-plan.
 *    (Plus tard : un webhook Strapi pourra appeler revalidateTag("article:<slug>")
 *    pour une mise à jour immédiate.)
 *
 * 4. SLUG INCONNU → notFound() → vraie réponse HTTP 404.
 *    Pour obtenir un VRAI code 404 (et pas une page "introuvable" servie en
 *    200), notFound() doit être appelé AVANT que Next commence à envoyer la
 *    page. C'est pourquoi on fait `await params` et la requête Strapi en haut
 *    du composant, et PAS sous un <Suspense> : un Suspense enverrait d'abord
 *    le squelette (statut 200 déjà parti), puis la 404 trop tard.
 *    C'est autorisé avec cacheComponents parce que :
 *    - generateStaticParams fournit des valeurs de `params` connues au build ;
 *    - toutes les données sont en 'use cache' (aucun accès "non caché").
 * ──────────────────────────────────────────────────────────────────────
 */

/**
 * Slug factice, utilisé uniquement si Strapi ne renvoie AUCUN article au build.
 *
 * Avec cacheComponents, generateStaticParams doit renvoyer AU MOINS une valeur,
 * sinon `next build` échoue (« empty generateStaticParams »). Next s'en sert
 * pour vérifier que la page ne lit pas de données non cachées.
 * Si Strapi est éteint pendant le build, on renvoie donc ce slug : la page
 * correspondante appelle notFound() (404), et les vrais articles seront
 * générés à leur première visite.
 */
const PLACEHOLDER_SLUG = "__aucun-article__";

/**
 * `instant = false` : on assume que la navigation vers cette page "bloque"
 * le temps de lire `params` (au lieu d'afficher instantanément un squelette).
 * Sans cette ligne, Next affiche en dev l'avertissement « URL data accessed
 * outside of <Suspense> ». C'est le prix d'une vraie 404 (voir point 4 plus
 * haut) ; il est faible : les données sont en cache, donc le blocage est court.
 * Alternative : mettre l'article sous <Suspense> (navigation instantanée,
 * mais un slug inconnu répond 200 + balise noindex au lieu d'une 404).
 */
export const instant = false;

/** Domaine public du site (même valeur que metadataBase dans app/layout.tsx). */
const SITE_URL = "https://websteem.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // withFallback : Strapi éteint → [] au lieu de faire échouer le build
  const slugs = await withFallback(getArticleSlugs(), []);
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

/**
 * Charge l'article ou déclenche la 404.
 * Utilisée par generateMetadata ET par la page : grâce à 'use cache' dans
 * getArticleBySlug(), Strapi n'est appelé qu'une fois pour les deux.
 */
async function loadArticle(params: Props["params"]) {
  const { slug } = await params;
  // Strapi éteint : withFallback renvoie null → 404 plutôt qu'une page d'erreur.
  // (L'erreur n'est pas mise en cache : l'article réapparaît dès que Strapi répond.)
  const article = await withFallback(getArticleBySlug(slug), null);
  if (!article) notFound();
  return article;
}

/**
 * Balises <title>, description, Open Graph… à partir du composant SEO de Strapi.
 * Les champs SEO sont obligatoires dans Strapi, mais on prévoit quand même
 * un repli sur le titre de l'article (prudence avec les anciennes entrées).
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await loadArticle(params);
  const seo = article.seo;
  const path = `/blog/${article.slug}`;
  // Image de partage : celle du SEO, sinon l'image de l'article
  const shareImage = getStrapiMediaUrl(seo?.shareImage?.url ?? article.image?.url);

  return {
    // `absolute` : le metaTitle saisi dans Strapi est le titre complet voulu,
    // on n'y ajoute pas « | WebSteem » (le gabarit du layout racine).
    title: seo?.metaTitle ? { absolute: seo.metaTitle } : article.titre,
    description: seo?.metaDescription,
    alternates: { canonical: seo?.canonicalUrl || path },
    openGraph: {
      type: "article",
      title: seo?.metaTitle || article.titre,
      description: seo?.metaDescription,
      url: path,
      publishedTime: article.datePublication ?? undefined,
      authors: article.auteur ? [article.auteur.nom] : undefined,
      images: shareImage ? [{ url: shareImage }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await loadArticle(params);

  // Contenu Blocks : ids des titres, sommaire, temps de lecture (voir content.ts)
  const { blocks, headings, readingTime } = prepareContent(article.contenu);
  const shareUrl = `${SITE_URL}/blog/${article.slug}`;

  // TODO (Strapi) : champs à créer, voir ArticleExtras.tsx. En attendant,
  // ces blocs restent masqués (on ne publie pas de faux contenu).
  const takeaways: string | null = null;
  const faq: { question: string; answer: string }[] = [];
  const toc = faq.length > 0 ? [...headings, { id: "faq", label: "FAQ" }] : headings;

  // Données structurées schema.org : aident Google à comprendre qu'il s'agit d'un article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.titre,
    description: article.seo?.metaDescription,
    datePublished: article.datePublication ?? undefined,
    author: article.auteur ? { "@type": "Person", name: article.auteur.nom } : undefined,
    image: getStrapiMediaUrl(article.image?.url) ?? undefined,
    mainEntityOfPage: shareUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleHero article={article} readingTime={article.tempsLecture ?? readingTime} shareUrl={shareUrl} />

      <Container>
        {toc.length > 0 && (
          <div className="pt-5 lg:hidden">
            <TableOfContentsMobile entries={toc} />
          </div>
        )}

        <div
          className={`grid items-start gap-[72px] pt-7 pb-16 lg:pt-[72px] lg:pb-24 ${toc.length > 0 ? "lg:grid-cols-[280px_1fr]" : ""}`}
        >
          <TableOfContents entries={toc} />

          <article className="max-w-[720px]">
            {/* Styles du texte : 16 px mobile / 18 px desktop. Le 1er paragraphe
                (le "chapô") est plus grand et en bleu, comme sur la maquette. */}
            <div className="text-base leading-[27px] lg:text-lg lg:leading-[30px] [&>h2:first-child]:mt-0 [&>p:first-child]:text-lg [&>p:first-child]:leading-[29px] [&>p:first-child]:font-medium [&>p:first-child]:text-navy lg:[&>p:first-child]:text-[21px] lg:[&>p:first-child]:leading-[34px]">
              <ArticleContent content={blocks} />
            </div>

            <KeyTakeaways text={takeaways} />
            <ArticleFaq items={faq} />
            <AuthorBox author={article.auteur} />
          </article>
        </div>
      </Container>

      <RelatedArticles slug={article.slug} categorySlug={article.categorie?.slug} />
      <Newsletter tone="dark" idPrefix="article-lettre" />
    </>
  );
}
