/**
 * Petite pastille au-dessus des titres des pages métier :
 * « Le cas général » (fond bleu très clair) ou « Réalisé par WebSteem »
 * (fond bleu plein). Suivie, sur desktop, d'un sur-titre orange foncé.
 *
 * Sur mobile la maquette n'affiche que la pastille : le sur-titre est masqué
 * (`hidden lg:inline`).
 */
type SectionLabelProps = {
  label: string;
  eyebrow?: string;
  tone?: "soft" | "dark";
};

export function SectionLabel({ label, eyebrow, tone = "soft" }: SectionLabelProps) {
  return (
    <p className="flex flex-wrap items-center gap-2.5">
      <span
        className={`rounded-lg px-2.5 py-1 text-xs font-semibold lg:text-[13px] ${
          // #EEF2F4 : bleu très pâle de la maquette, absent du thème (utilisé seulement ici)
          tone === "dark" ? "bg-navy text-white" : "bg-[#EEF2F4] text-navy"
        }`}
      >
        {label}
      </span>
      {eyebrow && <span className="hidden text-[15px] font-semibold text-rust lg:inline">{eyebrow}</span>}
    </p>
  );
}
