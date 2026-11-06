import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DirectContact, InterlocutorCard } from "@/components/contact/ContactInterlocutor";
import { OfficesSection } from "@/components/sections/OfficesSection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Racontez-nous votre projet de site internet : ${siteConfig.contact.firstName} vous répond et vous rappelle. Premier échange gratuit, à Grenoble, à Saint-Cyr-sur-Mer ou en visio.`,
};

/**
 * Page « Contact » (maquettes 07-contact-desktop / 08-contact-mobile).
 *
 * La page reste un Server Component (statique) : seul le formulaire est un
 * Client Component, car c'est la seule partie interactive.
 *
 * Mise en page : une grille de 2 colonnes sur desktop.
 *   ┌──────────────────────┬──────────────┐
 *   │ titre + interlocuteur│              │
 *   ├──────────────────────┤  formulaire  │
 *   │ parler tout de suite │              │
 *   └──────────────────────┴──────────────┘
 * `grid-rows-[auto_1fr]` : la 1re ligne prend juste la hauteur de son contenu,
 * la 2e absorbe le reste ; sans ça, la hauteur du formulaire serait répartie
 * sur les deux lignes et un trou apparaîtrait entre les deux blocs de gauche.
 * Sur mobile, tout s'empile dans l'ordre du HTML : titre, formulaire, puis
 * « parler tout de suite », comme sur la maquette mobile.
 */
export default function ContactPage() {
  const { firstName } = siteConfig.contact;

  return (
    <>
      <section className="pt-7 lg:pt-14 lg:pb-28">
        <Container className="grid items-start gap-6 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
          <div className="flex flex-col gap-4 lg:gap-6">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />
            <h1 className="text-[34px] leading-[42px] font-semibold tracking-tight text-balance text-navy lg:text-[52px] lg:leading-[60px]">
              Racontez-nous votre projet. {firstName} vous répond.
            </h1>
            <p className="text-base leading-[26px] lg:text-lg lg:leading-[30px]">
              Quatre questions, pas une de plus. Et une vraie personne qui vous rappelle.
            </p>
            <InterlocutorCard />
          </div>

          {/* row-span-2 : le formulaire occupe la hauteur des deux blocs de gauche */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ContactForm firstName={firstName} />
          </div>

          <div className="pt-6 lg:pt-0">
            <DirectContact />
          </div>
        </Container>
      </section>

      <OfficesSection
        title="On se rencontre où ça vous arrange."
        withPhotos={false}
        className="mt-16 bg-white py-16 lg:mt-0 lg:pt-24 lg:pb-28"
      />
    </>
  );
}
