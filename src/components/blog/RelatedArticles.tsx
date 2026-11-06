import { Container } from "@/components/ui/Container";
import { withFallback } from "@/lib/strapi/client";
import { getRelatedArticles } from "@/lib/strapi/blog";
import { RelatedArticleCard } from "./ArticleCard";

/**
 * Section « D'autres conseils pour votre entreprise » sous l'article.
 * Server Component asynchrone : il va lui-même chercher ses données
 * (en cache), la page n'a qu'à lui passer le slug et la catégorie.
 * Masqué s'il n'y a aucun autre article.
 */
export async function RelatedArticles({ slug, categorySlug }: { slug: string; categorySlug?: string }) {
  const articles = await withFallback(getRelatedArticles(slug, categorySlug), []);
  if (articles.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:pt-24 lg:pb-28">
      <Container className="flex flex-col gap-5 lg:gap-10">
        <h2 className="text-[26px] leading-[34px] font-semibold text-navy lg:text-4xl lg:leading-[44px]">
          D&apos;autres conseils pour votre entreprise
        </h2>
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
          {articles.map((article) => (
            <RelatedArticleCard key={article.documentId} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
