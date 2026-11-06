import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Bloc « La lettre WebSteem » (inscription à la newsletter).
 *
 * Deux variantes, comme sur les maquettes :
 * - "light" (page blog) : carte blanche ; sur mobile, bande blanche pleine largeur ;
 * - "dark" (page article) : carte bleue.
 *
 * ⚠️ FORMULAIRE VISUEL UNIQUEMENT.
 * TODO : brancher l'inscription (Brevo, Mailchimp…). Le plus simple avec
 * Next.js : une Server Action (fonction "use server") passée à `action`,
 * qui appelle l'API de l'outil d'e-mailing avec la clé gardée côté serveur.
 * En attendant, `action="#"` + aucun envoi : la page se recharge simplement.
 */
type NewsletterProps = {
  tone?: "light" | "dark";
  /** Préfixe des id du formulaire (deux newsletters ne doivent pas partager le même id) */
  idPrefix?: string;
};

export function Newsletter({ tone = "light", idPrefix = "newsletter" }: NewsletterProps) {
  const dark = tone === "dark";
  const emailId = `${idPrefix}-email`;

  return (
    <section className={dark ? "py-16 lg:py-28" : "bg-white py-14 lg:bg-transparent lg:pt-0 lg:pb-28"}>
      <Container>
        <div
          className={`grid items-center gap-3.5 lg:grid-cols-2 lg:gap-12 lg:rounded-xl lg:px-14 lg:py-12 ${
            dark ? "rounded-xl bg-navy px-[22px] py-7 text-white" : "lg:bg-white"
          }`}
        >
          <div className="flex flex-col gap-3.5 lg:gap-3">
            <p className={`text-sm font-semibold lg:text-[15px] ${dark ? "text-white" : "text-rust"}`}>
              La lettre WebSteem
            </p>
            <h2
              className={`font-semibold lg:text-4xl lg:leading-[44px] ${dark ? "text-2xl leading-8" : "text-[26px] leading-[34px] text-navy"}`}
            >
              Un conseil web utile<span className="hidden lg:inline"> pour votre entreprise</span>, une fois par mois.
            </h2>
            <p className="hidden text-[17px] leading-7 lg:block">
              Écrit par l&apos;équipe, lu en deux minutes. Pas de spam, désinscription en un clic.
            </p>
          </div>

          <form action="#" className="flex flex-col gap-2.5">
            <label htmlFor={emailId} className="text-[15px] font-semibold lg:text-base">
              Votre adresse e-mail
            </label>
            <div className="flex flex-col gap-2.5 lg:flex-row lg:gap-3">
              <input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="prenom@entreprise.fr"
                className={`h-[52px] flex-1 rounded-lg bg-cream px-4 text-base text-ink focus:shadow-[inset_0_0_0_2px_var(--color-navy),0_0_0_4px_#FFD9CC] focus:outline-none lg:h-14 lg:px-[18px] ${
                  dark ? "" : "shadow-[inset_0_0_0_1.5px_var(--color-navy)]"
                }`}
              />
              <button
                type="submit"
                className={`min-h-[52px] cursor-pointer px-6 font-semibold transition duration-200 hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(29,54,66,0.16)] lg:min-h-14 ${
                  dark
                    ? // Mobile : orange avec contour blanc ; desktop : bouton crème (maquettes 11 et 13)
                      "bg-orange text-white shadow-[inset_0_0_0_2px_#fff] hover:bg-orange-dark lg:bg-cream lg:text-ink lg:hover:bg-white"
                    : "bg-orange text-white hover:bg-orange-dark"
                }`}
              >
                Recevoir nos conseils
              </button>
            </div>
            <p className="text-[13px] leading-5 lg:text-sm lg:leading-[22px]">
              <span className="lg:hidden">Pas de spam, désinscription en un clic. </span>
              <span className="hidden lg:inline">Votre adresse sert uniquement à vous envoyer la lettre. </span>
              <Link href="/politique-de-confidentialite" className={dark ? "text-white" : ""}>
                Confidentialité
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
