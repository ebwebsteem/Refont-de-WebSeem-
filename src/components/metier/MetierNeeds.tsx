import type { MetierPageContent } from "@/content/metier-pages";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "./SectionLabel";

/**
 * « Le cas général » : ce dont tout professionnel du métier a besoin,
 * en 4 cartes numérotées (1 colonne sur mobile, 2 sur tablette, 4 sur desktop).
 */
export function MetierNeeds({ needs }: { needs: MetierPageContent["needs"] }) {
  return (
    <section className="bg-white py-16 lg:py-28">
      <Container className="flex flex-col gap-3.5 lg:gap-12">
        <div className="grid gap-6 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-3">
            <SectionLabel label="Le cas général" eyebrow={needs.eyebrow} />
            <h2 className="text-[28px] leading-9 font-semibold text-balance text-navy lg:text-[40px] lg:leading-[48px]">
              {needs.title}
            </h2>
          </div>
          {/* Introduction absente de la maquette mobile */}
          <p className="hidden text-lg leading-[30px] lg:block">{needs.intro}</p>
        </div>

        {/* <ol> : les cartes sont numérotées, l'ordre a donc un sens */}
        <ol className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {needs.items.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-1 rounded-xl bg-cream px-5 py-[18px] lg:gap-2.5 lg:p-7">
              {/* padStart : 1 → "01", 2 → "02"… comme sur la maquette */}
              <p aria-hidden="true" className="text-sm font-semibold text-rust lg:text-[15px]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg leading-7 font-semibold text-navy lg:text-xl">{item.title}</h3>
              <p className="text-[15px] leading-6 lg:text-base lg:leading-[26px]">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
