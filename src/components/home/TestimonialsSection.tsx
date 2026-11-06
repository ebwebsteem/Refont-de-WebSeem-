import { siteConfig } from "@/config/site";
import { testimonials } from "@/content/references";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « Avis clients » : 3 témoignages, chacun rattaché à une valeur
 * (écoute, disponibilité, suivi). <figure> + <blockquote> + <figcaption>
 * est la structure HTML prévue pour une citation et son auteur.
 */
export function TestimonialsSection() {
  const { googleReviews } = siteConfig;

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          layout="split"
          eyebrow="Avis clients"
          title="Être écouté, être rappelé, être suivi : nos clients en parlent."
          intro={
            <>
              Des partenaires, pas des prestataires.{" "}
              <a href={googleReviews.url} className="font-semibold underline">
                Lire les {googleReviews.count} avis Google ({googleReviews.rating}/5)
              </a>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.theme} className="flex flex-col gap-6 rounded-xl bg-cream p-8">
              <div className="flex items-center gap-4">
                <div className="relative h-22 w-22 flex-none overflow-hidden rounded-[14px] bg-placeholder">
                  <Photo src={testimonial.photo} alt={`Photo de ${testimonial.author}`} sizes="88px" provisional={false} />
                </div>
                <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium">{testimonial.theme}</span>
              </div>
              <blockquote className="text-[21px] leading-8 text-navy">« {testimonial.quote} »</blockquote>
              <figcaption className="mt-auto flex flex-col gap-0.5">
                <span className="text-[17px] font-semibold">{testimonial.author}</span>
                <span className="text-[15px]">{testimonial.role}</span>
                <span className="text-sm font-medium text-rust">{testimonial.since}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
