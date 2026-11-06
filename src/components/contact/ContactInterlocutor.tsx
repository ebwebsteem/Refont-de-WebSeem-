import { siteConfig } from "@/config/site";
import { contactPortrait } from "@/content/exemples";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";

/**
 * Les deux blocs « humains » de la page contact.
 *
 * Sur desktop, ils forment UNE carte blanche dans la colonne de gauche ;
 * sur mobile, la maquette place le 2e bloc (« Vous préférez parler tout de
 * suite ? ») APRÈS le formulaire. On en fait donc deux composants que la
 * page positionne dans sa grille ; les classes `lg:rounded-b-none` /
 * `lg:rounded-t-none` les recollent visuellement sur grand écran.
 */
const { firstName } = siteConfig.contact;

/** Élision française : « l'agenda d'Emmanuel » mais « l'agenda de Marc ». */
const deFirstName = /^[aeiouyéèêh]/i.test(firstName) ? `d'${firstName}` : `de ${firstName}`;

/** « Votre interlocuteur » : portrait + délai de réponse. */
export function InterlocutorCard() {
  return (
    <section
      aria-labelledby="interlocuteur"
      className="flex items-center gap-3.5 rounded-xl bg-white p-4 lg:items-stretch lg:gap-5 lg:rounded-b-none lg:p-5 lg:pb-0"
    >
      <div className="relative h-[108px] w-[88px] flex-none overflow-hidden rounded-xl bg-placeholder lg:h-[188px] lg:w-[150px]">
        <Photo src={contactPortrait} alt={`Portrait de ${firstName}`} sizes="150px" />
      </div>
      <div className="flex flex-col justify-center gap-1 lg:gap-2">
        <p id="interlocuteur" className="text-sm font-semibold text-rust">
          Votre interlocuteur
        </p>
        <p className="text-[22px] leading-[30px] font-semibold text-navy lg:text-[28px] lg:leading-9">{firstName}</p>
        <p className="text-[15px] leading-6 lg:text-base lg:leading-[26px]">
          C&apos;est {firstName} qui lit votre message et qui vous rappelle. Pas de standard, pas de ticket.
        </p>
        <p className="inline-flex items-center gap-2 self-start rounded-xl bg-cream px-3 py-1.5 text-sm font-semibold text-navy lg:text-[15px]">
          <Icon name="clock" size={18} className="text-orange" />
          Réponse [sous X h], du [jour] au [jour]
        </p>
      </div>
    </section>
  );
}

/** « Vous préférez parler tout de suite ? » : téléphone, agenda, e-mail. */
export function DirectContact() {
  const links: { href: string; icon: IconName; label: string }[] = [
    { href: siteConfig.phone.href, icon: "phone", label: `Appeler ${firstName} · ${siteConfig.phone.display}` },
    { href: siteConfig.bookingUrl, icon: "calendar", label: `Réserver 30 minutes dans l'agenda ${deFirstName}` },
  ];

  return (
    <section
      aria-labelledby="parler-tout-de-suite"
      className="flex flex-col gap-3 pt-6 lg:gap-2.5 lg:rounded-xl lg:rounded-t-none lg:bg-white lg:p-5 lg:pt-5"
    >
      <h2 id="parler-tout-de-suite" className="text-xl font-semibold text-navy lg:text-[15px]">
        Vous préférez parler tout de suite ?
      </h2>
      {links.map((link) => (
        // Simple <a> (et non <Link>) : tel: et le futur lien d'agenda externe ne sont pas des pages du site
        <a
          key={link.icon}
          href={link.href}
          className="flex min-h-13 items-center justify-center gap-3 bg-cream px-5 font-semibold text-navy shadow-[inset_0_0_0_2px_var(--color-navy)] transition duration-200 ease-out hover:-translate-y-px hover:bg-white hover:text-navy hover:shadow-[inset_0_0_0_2px_var(--color-navy),0_6px_16px_rgba(29,54,66,0.16)] lg:min-h-14 lg:justify-start"
        >
          <Icon name={link.icon} className="text-orange" />
          {link.label}
        </a>
      ))}
      <p className="text-[15px] leading-6">
        Ou par e-mail :{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-semibold">
          {siteConfig.email}
        </a>
      </p>
    </section>
  );
}
