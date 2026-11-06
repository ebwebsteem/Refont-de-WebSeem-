import { primaryCta, siteConfig } from "@/config/site";
import { contactPortrait, exampleImages } from "@/content/exemples";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo, ProvisionalBadge } from "@/components/ui/Photo";
import { HeroSlides } from "./HeroSlides";

/**
 * Hero de l'accueil : grand bloc arrondi, photos en carrousel en fond,
 * dégradé bleu pour la lisibilité, texte blanc, 2 boutons et la carte
 * « Vous parlez directement à Emmanuel ».
 *
 * Ce composant reste côté serveur : seul <HeroSlides> (le carrousel) est
 * un Client Component. Le texte, lui, est envoyé en HTML pur.
 */
const slides = [
  { src: exampleImages.heroSlides[0], alt: "L'équipe WebSteem présente la maquette d'un site à un client." },
  { src: exampleImages.heroSlides[1], alt: "L'équipe WebSteem au travail dans ses bureaux." },
  { src: exampleImages.heroSlides[2], alt: "Rendez-vous de suivi avec un client, un an après la mise en ligne." },
];

export function Hero() {
  const { contact } = siteConfig;

  return (
    <section className="lg:px-8 lg:pt-6">
      <div
        role="region"
        aria-roledescription="carrousel"
        aria-label="Photos de clients et de l'équipe"
        className="relative isolate mx-auto flex min-h-[720px] max-w-[1376px] items-end overflow-hidden bg-navy lg:min-h-[700px] lg:items-center lg:rounded-[14px]"
      >
        <HeroSlides slides={slides} />

        {/* Dégradé : vertical sur mobile (texte en bas), horizontal sur desktop (texte à gauche) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(32,48,74,0.05)_0%,rgba(32,48,74,0.3)_28%,rgba(32,48,74,0.86)_46%,rgba(32,48,74,0.95)_100%)] lg:bg-[linear-gradient(90deg,rgba(32,48,74,0.94)_0%,rgba(32,48,74,0.88)_48%,rgba(32,48,74,0.6)_66%,rgba(32,48,74,0.05)_92%)]"
        />
        <div className="[&>span]:top-5 [&>span]:left-5 lg:[&>span]:top-6 lg:[&>span]:right-6 lg:[&>span]:left-auto">
          <ProvisionalBadge />
        </div>

        {/* pt-56 sur mobile : laisse voir la photo et les commandes du carrousel au-dessus du texte */}
        <div className="relative flex max-w-[900px] flex-col gap-6 px-5 pt-56 pb-8 text-white lg:px-16 lg:pt-16 lg:pb-28">
          <p className="inline-flex items-center gap-2 self-start rounded-lg bg-white/15 px-3.5 py-2 text-[15px] font-medium">
            <Icon name="pin" size={18} />
            Agence web à Grenoble et Saint-Cyr-sur-Mer
          </p>
          <h1 className="text-[34px] leading-[42px] font-semibold tracking-tight lg:text-[56px] lg:leading-[64px]">
            Un site qui vous amène des clients. Et une équipe qui reste à vos côtés.
          </h1>
          <p className="max-w-[58ch] text-lg leading-[30px]">
            Artisans, commerçants, professions libérales, associations : on construit votre site avec vous, on vous
            explique chaque étape, et on reste là après la mise en ligne.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href={primaryCta.href} iconAfter="arrowRight">
              {primaryCta.label}
            </Button>
            <Button href={siteConfig.bookingUrl} variant="outlineLight" icon="calendar">
              Réserver 30 minutes
            </Button>
          </div>

          {/* Carte "interlocuteur unique" */}
          <div className="flex items-center gap-4 self-start rounded-xl bg-white px-5 py-3.5 text-ink lg:w-[544px]">
            <div className="relative h-14 w-14 flex-none overflow-hidden rounded-full shadow-[0_0_0_3px_#fff]">
              <Photo src={contactPortrait} alt={`Photo de ${contact.firstName}`} sizes="56px" provisional={false} />
            </div>
            <div>
              <p className="font-semibold text-navy">
                Vous parlez directement à {contact.firstName}, pas à un standard.
              </p>
              <p className="text-sm">Réponse sous 48h ouvrées · 26 ans d&apos;expérience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
