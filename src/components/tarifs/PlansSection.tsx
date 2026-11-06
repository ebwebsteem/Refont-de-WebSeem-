import { siteConfig } from "@/config/site";
import { contactPortrait } from "@/content/exemples";
import { plans, type Plan } from "@/content/tarifs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { PaymentModeProvider, PaymentToggle, PlanPrice } from "./PaymentMode";

/**
 * En-tête de la page (h1 + bascule de paiement) et les 3 cartes de formules.
 *
 * Les deux sont enveloppés dans <PaymentModeProvider> car la bascule de
 * l'en-tête change les prix des cartes (voir PaymentMode.tsx).
 */
export function PlansSection() {
  const { firstName } = siteConfig.contact;

  return (
    <PaymentModeProvider>
      {/* EN-TÊTE */}
      <section className="pt-7 pb-8 lg:pt-14 lg:pb-12">
        <Container className="grid gap-4 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-5">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Tarifs" }]} />
            <p className="text-sm font-semibold text-rust lg:text-[15px]">Tarifs</p>
            <h1 className="text-[34px] leading-[42px] font-semibold tracking-tight text-balance text-navy lg:text-[56px] lg:leading-16">
              Vous connaissez le prix avant même notre premier rendez-vous.
            </h1>
            <p className="max-w-[60ch] text-base leading-[26px] lg:text-lg lg:leading-[30px]">
              Prix de départ HT. Ensuite, {firstName} prépare avec vous un devis gratuit, détaillé phase par phase. Pas
              de surprise, pas de jargon.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-start">
            <PaymentToggle className="lg:inline-flex" />
            {/* Encart « Une question sur un prix ? » : desktop uniquement, comme sur la maquette */}
            <div className="hidden items-center gap-3.5 rounded-xl bg-white px-4.5 py-3.5 lg:flex">
              <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full bg-placeholder shadow-[0_0_0_3px_#fff]">
                {/* Trop petite pour le badge : provisional={false} (la photo reste à remplacer) */}
                <Photo src={contactPortrait} alt="" sizes="48px" provisional={false} />
              </div>
              <p className="text-[15px] leading-[22px]">
                Une question sur un prix ? <b className="text-navy">{firstName} vous répond</b> au{" "}
                <a href={siteConfig.phone.href} className="font-semibold">
                  {siteConfig.phone.display}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FORMULES */}
      <section className="pb-16 lg:pb-28">
        <Container className="grid gap-4 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </Container>
      </section>
    </PaymentModeProvider>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const featured = plan.featured;

  return (
    <article
      className={`flex flex-col gap-3.5 rounded-xl p-6 lg:gap-4.5 lg:px-8 lg:py-9 ${
        featured
          ? // Sur mobile, la formule mise en avant passe en premier (order-first)
            "order-first bg-navy text-white shadow-[0_16px_40px_rgba(32,48,74,0.18)] lg:order-none"
          : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className={`text-[22px] leading-[30px] font-semibold lg:text-2xl lg:leading-8 ${featured ? "" : "text-navy"}`}>
          {plan.name}
        </h2>
        {featured && (
          <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-rust lg:text-[13px]">
            Le plus demandé
          </span>
        )}
      </div>

      <p className="text-[15px] leading-6 lg:text-base lg:leading-[26px]">
        <b>Idéal si :</b> {plan.idealFor}
      </p>

      <PlanPrice plan={plan} />

      <ul className="flex flex-col gap-2.5 text-[15px] leading-6 lg:text-base">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <Icon
              name="check"
              strokeWidth={2.4}
              className={`mt-0.5 ${featured ? "text-white" : "text-rust"}`}
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* mt-auto : pousse le délai et le bouton en bas, pour aligner les 3 cartes */}
      {plan.delay && <p className="mt-auto text-sm">Délai indicatif : {plan.delay}</p>}

      <Button
        href="/contact"
        variant={featured ? "primary" : "outline"}
        size="md"
        className={`w-full ${plan.delay ? "" : "mt-auto"}`}
      >
        {plan.cta}
      </Button>
    </article>
  );
}
