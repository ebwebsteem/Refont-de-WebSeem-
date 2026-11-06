import { siteConfig } from "@/config/site";
import { trustedClients } from "@/content/references";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";

/**
 * Bandeau « Ils nous font confiance » juste sous le hero :
 * titre + note Google à gauche, 5 cartes clients à droite.
 */
export function ClientsStrip() {
  const { googleReviews } = siteConfig;

  return (
    <section aria-labelledby="clients-titre" className="pt-8">
      <Container className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center">
        <div className="flex flex-col gap-2.5">
          <h2 id="clients-titre" className="text-xl leading-7 font-semibold text-navy">
            Ils nous font confiance, de Grenoble au Var.
          </h2>
          <p className="flex flex-col items-start gap-1.5">
            <span role="img" aria-label={`Note Google : ${googleReviews.rating} sur 5`} className="flex gap-0.5 text-orange">
              {[1, 2, 3, 4, 5].map((n) => (
                <Icon key={n} name="star" size={26} />
              ))}
            </span>
            <span className="text-[15px]">
              <b>{googleReviews.rating}/5</b> · {googleReviews.count} avis Google
            </span>
          </p>
        </div>

        {/* Défilement horizontal sur mobile, grille de 5 sur desktop */}
        <ul className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {trustedClients.map((client) => (
            <li
              key={client.name}
              className="flex w-44 flex-none snap-start flex-col gap-3 rounded-xl bg-white p-4 shadow-[0_1px_0_var(--color-line)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(32,48,74,0.10)] lg:w-auto"
            >
              <div className="relative h-24 w-full overflow-hidden rounded-lg bg-placeholder">
                <Photo src={client.photo} alt={`${client.name} (logo à venir)`} sizes="(min-width: 1024px) 200px, 176px" provisional={false} />
              </div>
              <span className="flex flex-col">
                <span className="text-[15px] leading-[21px] font-semibold">{client.name}</span>
                <span className="text-[13px] leading-[18px] text-muted">{client.activity}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
