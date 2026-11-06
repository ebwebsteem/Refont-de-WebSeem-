/**
 * En-tête de section récurrent sur la maquette :
 * - un sur-titre ("eyebrow") en orange foncé ;
 * - un titre H2 bleu (40 px / 48 px sur desktop) ;
 * - un texte d'introduction, soit dessous ("stack"), soit à droite ("split",
 *   grille 7/12 - 5/12 alignée en bas, comme sur la plupart des sections).
 */
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  layout?: "stack" | "split";
  /** "light" pour les sections sur fond bleu */
  tone?: "dark" | "light";
  /** Niveau de titre (h2 par défaut, h1 pour le haut d'une page) */
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  layout = "stack",
  tone = "dark",
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  const isLight = tone === "light";

  const titleBlock = (
    <div className="flex flex-col gap-3">
      {eyebrow && <p className={`text-[15px] font-semibold ${isLight ? "text-white" : "text-rust"}`}>{eyebrow}</p>}
      <Heading
        className={`text-3xl leading-tight font-semibold text-balance md:text-[40px] md:leading-[48px] ${isLight ? "text-white" : "text-navy"}`}
      >
        {title}
      </Heading>
    </div>
  );

  const introBlock = intro && (
    <div className={`text-lg leading-[30px] ${isLight ? "text-white/90" : "text-ink"}`}>{intro}</div>
  );

  if (layout === "split") {
    return (
      <div className={`grid gap-6 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16 ${className}`}>
        {titleBlock}
        {introBlock}
      </div>
    );
  }

  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${className}`}>
      {titleBlock}
      {introBlock}
    </div>
  );
}
