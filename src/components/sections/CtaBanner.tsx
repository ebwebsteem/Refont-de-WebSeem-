import { siteConfig } from "@/config/site";
import { contactPortrait } from "@/content/exemples";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";

/**
 * Bandeau d'appel à l'action en bas de page (bloc bleu, coins arrondis).
 *
 * Il revient sur toutes les pages avec un titre différent :
 * « Parlons de votre projet, simplement. », « Parlons de votre cabinet. »…
 * d'où les props. `withPortrait` affiche la photo de l'interlocuteur à
 * gauche (version de l'accueil) ; sans elle, on obtient la version compacte
 * des pages métier avec l'avion en papier orange dans l'angle.
 */
type CtaBannerProps = {
  title: string;
  text?: string;
  withPortrait?: boolean;
};

export function CtaBanner({ title, text, withPortrait = false }: CtaBannerProps) {
  const { firstName } = siteConfig.contact;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div
          className={`relative grid items-center gap-10 overflow-hidden rounded-[14px] bg-navy p-8 text-white md:p-16 ${
            withPortrait ? "lg:grid-cols-[280px_1fr] lg:gap-14" : "lg:grid-cols-[1fr_auto]"
          }`}
        >
          {/* Avion en papier orange décoratif dans l'angle (version compacte, comme la maquette) */}
          {!withPortrait && (
            <Icon name="send" size={88} className="absolute -top-4 -right-3 rotate-12 text-orange" />
          )}

          {withPortrait && (
            <div className="relative hidden h-80 overflow-hidden rounded-[14px] bg-navy-light lg:block">
              <Photo src={contactPortrait} alt={`${firstName}, votre interlocuteur chez WebSteem`} sizes="280px" />
            </div>
          )}

          <div className="relative flex max-w-2xl flex-col gap-5">
            <h2
              className={`font-semibold tracking-tight text-balance ${
                withPortrait ? "text-4xl md:text-5xl md:leading-[56px]" : "text-3xl md:text-[44px] md:leading-[52px]"
              }`}
            >
              {title}
            </h2>
            {text && <p className="text-lg leading-[30px]">{text}</p>}
            {withPortrait && <CtaButtons firstName={firstName} />}
          </div>

          {/* Version compacte : boutons empilés à droite */}
          {!withPortrait && <CtaButtons firstName={firstName} stacked />}
        </div>
      </Container>
    </section>
  );
}

function CtaButtons({ firstName, stacked = false }: { firstName: string; stacked?: boolean }) {
  return (
    <div className={`relative flex gap-4 ${stacked ? "flex-col sm:items-stretch" : "flex-wrap"}`}>
      <Button href={siteConfig.bookingUrl} variant="light">
        Réserver 30 minutes avec {firstName}
      </Button>
      <Button href={siteConfig.phone.href} variant="outlineLight">
        Appeler {firstName} · {siteConfig.phone.display}
      </Button>
    </div>
  );
}
