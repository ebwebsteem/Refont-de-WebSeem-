import { siteConfig } from "@/config/site";
import { mainContact } from "@/content/equipe";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

/**
 * « Votre premier interlocuteur » : le grand bloc d'Emmanuel.
 *
 * Sur mobile, la maquette affiche le sur-titre AVANT la photo. On place donc
 * le sur-titre en premier dans le HTML, et sur desktop on le range dans la
 * colonne de droite grâce à la grille (col-start-2).
 */
export function MainContactSection() {
  const { firstName, fullName, role, bio, quote, loves, photo } = mainContact;

  return (
    <section className="bg-white py-18 lg:py-28">
      <Container className="grid gap-4 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr] lg:gap-x-18 lg:gap-y-5">
        <p className="text-sm font-semibold text-rust lg:col-start-2 lg:self-end lg:text-[15px]">
          Votre premier interlocuteur
        </p>

        <div className="relative h-[360px] overflow-hidden rounded-[14px] bg-placeholder lg:row-span-2 lg:row-start-1 lg:h-[560px] lg:self-center">
          <Photo
            src={photo}
            alt={`${fullName}, ${role}, dans le bureau de Grenoble.`}
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>

        <div className="flex flex-col gap-4 lg:col-start-2 lg:gap-5">
          <h2 className="mt-2 text-[32px] leading-10 font-semibold text-navy lg:mt-0 lg:text-5xl lg:leading-14">
            {firstName}
          </h2>
          <p className="text-[15px] font-medium lg:text-[17px]">
            {fullName} · {role}
          </p>
          <p className="max-w-[60ch] text-base leading-[26px] lg:text-lg lg:leading-[30px]">{bio}</p>
          {/* <blockquote> : la balise HTML dédiée aux citations */}
          <blockquote className="text-xl leading-8 text-navy lg:text-2xl lg:leading-[34px]">« {quote} »</blockquote>
          <div className="flex flex-col gap-1.5 rounded-xl bg-cream px-4.5 py-4 lg:px-6 lg:py-5">
            <p className="text-[15px] font-semibold text-navy">Ce que j&apos;aime dans mon métier</p>
            <p className="text-base leading-[26px] lg:text-[17px] lg:leading-7">{loves}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button href={siteConfig.bookingUrl}>Réserver 30 minutes avec {firstName}</Button>
            <Button href={`mailto:${siteConfig.email}`} variant="outline">
              Écrire à {firstName}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
