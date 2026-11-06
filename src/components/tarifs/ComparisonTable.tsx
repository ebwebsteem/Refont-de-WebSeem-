import { comparison, plans } from "@/content/tarifs";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « Ce que vous obtenez, formule par formule » : un vrai <table>.
 *
 * Des données tabulaires (lignes × colonnes) méritent un tableau HTML :
 * avec <th scope="col"> et <th scope="row">, un lecteur d'écran annonce
 * « Site vitrine, Pages légales et RGPD : inclus » pour chaque case.
 *
 * Sur mobile, le tableau garde une largeur minimale et défile
 * horizontalement dans sa zone (role="region" + tabIndex pour pouvoir le
 * faire défiler au clavier).
 */
export function ComparisonTable() {
  return (
    <section className="bg-white py-16 lg:py-28">
      <Container className="flex flex-col gap-5 lg:gap-10">
        <SectionHeading
          eyebrow="Comparatif"
          title="Ce que vous obtenez, formule par formule."
          className="max-w-[760px]"
        />

        <div
          role="region"
          aria-label="Tableau comparatif, faire défiler horizontalement"
          tabIndex={0}
          // `relative` : les textes .sr-only (en position absolute) sont alors rognés par
          // cette zone ; sans ça, ils dépassent et créent un défilement horizontal de toute la page.
          className="relative overflow-x-auto rounded-xl shadow-[0_0_0_1px_var(--color-line)]"
        >
          <table className="w-full min-w-[560px] border-collapse text-sm leading-5 lg:text-base lg:leading-6">
            <caption className="sr-only">Comparatif des trois formules</caption>
            <thead>
              <tr className="bg-cream text-navy">
                <th scope="col" className="px-3.5 py-3 text-left font-semibold lg:px-6 lg:py-4.5">
                  Inclus
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={`px-2 py-3 font-semibold lg:w-[18%] lg:px-6 lg:py-4.5 ${plan.featured ? "bg-[#EEF2F4]" : ""}`}
                  >
                    {/* Nom court sur mobile, nom complet sur desktop */}
                    <span className="lg:hidden">{plan.shortName}</span>
                    <span className="hidden lg:inline">{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="px-3.5 py-3 text-left font-normal lg:px-6 lg:py-4">
                    {row.label}
                  </th>
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={`px-2 py-3 text-center lg:px-6 lg:py-4 ${plan.featured ? "bg-[#F3F6F7]" : ""}`}
                    >
                      {row.includedIn.includes(plan.id) ? (
                        <>
                          <Icon name="check" size={22} strokeWidth={2.6} className="inline-block text-rust" />
                          {/* L'icône est décorative : le texte masqué porte le sens */}
                          <span className="sr-only">Inclus</span>
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true" className="text-[#8A93A0]">
                            —
                          </span>
                          <span className="sr-only">Non inclus</span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
