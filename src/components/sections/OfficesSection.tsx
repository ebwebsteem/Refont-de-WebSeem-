import { offices, siteConfig } from "@/config/site";
import { exampleImages } from "@/content/exemples";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « Où nous trouver » : Grenoble, Saint-Cyr-sur-Mer et « Partout ailleurs ».
 *
 * Utilisé sur l'accueil (avec photos et intro) et sur la page contact
 * (version compacte, sans photos, avec un autre titre) : d'où les props.
 */
type OfficesSectionProps = {
  title?: string;
  withPhotos?: boolean;
  className?: string;
};

export function OfficesSection({
  title = "On vient vous voir, ou vous passez nous voir. Partout ailleurs, en visio.",
  withPhotos = true,
  className = "bg-white py-16 lg:py-24",
}: OfficesSectionProps) {
  return (
    <section className={className}>
      <Container className="flex flex-col gap-12">
        {withPhotos ? (
          <SectionHeading
            layout="split"
            eyebrow="Où nous trouver"
            title={title}
            intro="Nos bureaux sont à Grenoble et à Saint-Cyr-sur-Mer. On aime rencontrer nos clients de la région, et on accompagne tout aussi bien des entreprises partout en France et en Suisse romande."
          />
        ) : (
          <h2 className="text-3xl font-semibold text-navy md:text-[40px] md:leading-[48px]">{title}</h2>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {offices.map((office, index) => (
            <article
              key={office.title}
              className={`flex flex-col gap-4 rounded-xl bg-cream ${withPhotos ? "p-3 pb-7" : "p-6"}`}
            >
              {withPhotos && (
                <div className="relative h-[220px] overflow-hidden rounded-xl bg-placeholder">
                  <Photo src={exampleImages.offices[index]} alt="" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
              )}
              <div className={`flex flex-col gap-2 ${withPhotos ? "px-4" : ""}`}>
                <h3 className="text-[22px] leading-[30px] font-semibold text-navy">{office.title}</h3>
                <p className="leading-[26px]">{office.text}</p>
              </div>
            </article>
          ))}

          <article className="flex flex-col justify-between gap-4 rounded-xl bg-navy p-8 text-white">
            <div className="flex flex-col gap-3">
              {withPhotos && <Icon name="send" size={40} className="text-orange" />}
              <h3 className="text-[22px] leading-[30px] font-semibold">Partout ailleurs</h3>
              <p className="leading-[26px]">
                France entière et Suisse romande, en visio.{withPhotos && " Même écoute, même suivi, simplement à distance."}
              </p>
            </div>
            {withPhotos && (
              <Button href={siteConfig.bookingUrl} variant="light" size="md" className="self-start">
                Prendre un café, même en visio
              </Button>
            )}
          </article>
        </div>
      </Container>
    </section>
  );
}
