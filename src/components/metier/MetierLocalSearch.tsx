import type { MetierPageContent } from "@/content/metier-pages";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/**
 * « Être trouvé près de chez vous » (référencement local).
 * À droite, des exemples de recherches Google présentés comme des barres de
 * recherche ; la dernière (souvent « … près de moi ») est encadrée en orange.
 */
export function MetierLocalSearch({ local }: { local: MetierPageContent["local"] }) {
  const lastIndex = local.searches.length - 1;

  return (
    <section className="bg-white py-16 lg:py-28">
      <Container className="grid items-center gap-3 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="flex flex-col gap-3 lg:gap-4">
          <p className="text-sm font-semibold text-rust lg:text-[15px]">Être trouvé près de chez vous</p>
          <h2 className="text-[28px] leading-9 font-semibold text-balance text-navy lg:text-[40px] lg:leading-[48px]">
            {local.title}
          </h2>
          <p className="mb-1.5 text-base leading-[26px] lg:mb-0 lg:text-lg lg:leading-[30px]">{local.text}</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="hidden text-[15px] font-semibold text-navy lg:block">{local.searchesLabel}</p>
          <ul className="flex flex-col gap-3">
            {local.searches.map((search, index) => {
              const highlighted = index === lastIndex;
              return (
                <li
                  key={search}
                  className={`flex min-h-[52px] items-center gap-2.5 rounded-xl px-4 text-[15px] lg:min-h-14 lg:gap-3 lg:px-5 lg:text-[17px] ${
                    highlighted ? "bg-white font-medium shadow-[inset_0_0_0_2px_var(--color-orange)]" : "bg-cream"
                  }`}
                >
                  <Icon name="search" className={highlighted ? "text-rust" : "text-navy"} />
                  {search}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
