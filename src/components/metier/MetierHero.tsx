import Link from "next/link";
import { primaryCta, siteConfig } from "@/config/site";
import type { MetierPageContent } from "@/content/metier-pages";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

/**
 * En-tête d'une page métier : fil d'Ariane, étiquette, H1 en deux lignes,
 * texte, 2 boutons, ligne prix / délai, et une grande photo à droite.
 *
 * Mobile d'abord : sur téléphone la photo passe AU-DESSUS du texte
 * (`order-first`) et le fil d'Ariane est masqué, comme sur la maquette
 * mobile. À partir de `lg:` on bascule sur 2 colonnes égales.
 */
type MetierHeroProps = {
  content: MetierPageContent;
  photo: string;
};

export function MetierHero({ content, photo }: MetierHeroProps) {
  const { firstName } = siteConfig.contact;

  return (
    <section className="pt-4 pb-14 lg:pt-14 lg:pb-24">
      {/* 13fr / 11fr (au lieu de 50/50 sur la maquette) : laisse la place aux 2 boutons côte à côte avec le vrai prénom */}
      <Container className="grid items-center gap-4 lg:grid-cols-[13fr_11fr] lg:gap-16">
        <div className="flex flex-col gap-4 lg:gap-[22px]">
          <Breadcrumb
            className="hidden lg:block"
            items={[
              { label: "Accueil", href: "/" },
              { label: "Vos besoins", href: "/#vos-besoins" },
              { label: content.breadcrumbLabel },
            ]}
          />

          <p>
            <span className="rounded-lg bg-white px-2.5 py-[5px] text-[13px] font-semibold text-navy lg:px-3 lg:py-1.5 lg:text-sm">
              {content.tag}
            </span>
          </p>

          {/* Un seul H1 par page : la promesse, puis le mot-clé "métier + ville" en plus petit */}
          <h1 className="text-[32px] leading-10 font-semibold tracking-tight text-balance text-navy lg:text-[52px] lg:leading-[60px]">
            {content.title}
            <span className="mt-1.5 block text-xl leading-7 font-medium tracking-normal lg:mt-2 lg:text-[28px] lg:leading-9">
              {content.subtitle}
            </span>
          </h1>

          <p className="max-w-[58ch] text-base leading-[26px] lg:text-lg lg:leading-[30px]">{content.intro}</p>

          <div className="flex flex-wrap gap-4">
            <Button href={primaryCta.href} className="w-full sm:w-auto">
              Parlons de votre {content.audience}
            </Button>
            {/* Bouton secondaire absent de la maquette mobile : on l'affiche à partir de 640 px */}
            <div className="hidden sm:block">
              <Button href={siteConfig.bookingUrl} variant="outline">
                Réserver 30 min avec {firstName}
              </Button>
            </div>
          </div>

          <p className="text-center text-sm leading-[22px] sm:text-left lg:text-[15px]">
            À partir de <b>[PRIX] € HT</b> · en ligne en <b>[DÉLAI]</b> ·{" "}
            <Link href="/tarifs" className="font-semibold">
              Voir les tarifs
            </Link>
          </p>
        </div>

        <div className="relative order-first h-[230px] overflow-hidden rounded-[14px] bg-placeholder lg:order-none lg:h-[520px]">
          {/* preload : c'est l'image principale visible sans défiler (remplace l'ancien `priority`) */}
          <Photo
            src={photo}
            alt={content.heroPhotoAlt}
            sizes="(min-width: 1440px) 545px, (min-width: 1024px) 42vw, 100vw"
            preload
          />
        </div>
      </Container>
    </section>
  );
}
