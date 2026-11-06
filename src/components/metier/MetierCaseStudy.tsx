import type { MetierPageContent, MetierPagePhotos } from "@/content/metier-pages";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "./SectionLabel";

/**
 * « Réalisé par WebSteem » : un client du même métier.
 *
 * Desktop : photos à gauche (7/12), récit à droite (5/12).
 * Mobile : tout s'empile, et les 2 petites photos, les étiquettes et le
 * lien « Voir le site » sont masqués pour raccourcir la page (maquette mobile).
 * En bas, le bandeau « Aussi accompagné » cite un second client.
 */
type MetierCaseStudyProps = {
  caseStudy: MetierPageContent["caseStudy"];
  alsoHelped: MetierPageContent["alsoHelped"];
  photos: MetierPagePhotos;
};

const linkClass = "inline-flex min-h-11 items-center text-[15px] font-semibold lg:text-base";

export function MetierCaseStudy({ caseStudy, alsoHelped, photos }: MetierCaseStudyProps) {
  // Les 3 premières étapes ont le même style ; « Le résultat » est mis en avant à part
  const steps = [
    { label: "Le contexte", text: caseStudy.context },
    { label: "Le besoin", text: caseStudy.need },
    { label: "Ce qu'on a fait ensemble", text: caseStudy.done },
  ];

  return (
    <section className="py-16 lg:py-28">
      <Container className="flex flex-col gap-3.5 lg:gap-12">
        <div className="flex max-w-[860px] flex-col gap-3">
          <SectionLabel label="Réalisé par WebSteem" eyebrow={caseStudy.category} tone="dark" />
          <h2 className="text-[28px] leading-9 font-semibold text-balance text-navy lg:text-[40px] lg:leading-[48px]">
            {caseStudy.title}
          </h2>
        </div>

        <div className="grid items-start gap-3.5 lg:grid-cols-[7fr_5fr] lg:gap-8">
          {/* Colonne photos */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[220px] overflow-hidden rounded-[14px] bg-placeholder lg:h-[420px]">
              <Photo
                src={photos.caseMain}
                alt={caseStudy.photoAlts[0]}
                sizes="(min-width: 1440px) 720px, (min-width: 1024px) 55vw, 100vw"
              />
            </div>
            <div className="hidden grid-cols-2 gap-4 sm:grid">
              {photos.caseSmall.map((src, index) => (
                <div key={src} className="relative h-[200px] overflow-hidden rounded-[14px] bg-placeholder">
                  <Photo src={src} alt={caseStudy.photoAlts[index + 1]} sizes="(min-width: 1024px) 360px, 50vw" />
                </div>
              ))}
            </div>
          </div>

          {/* Colonne récit */}
          <div className="flex flex-col gap-3.5 lg:gap-4">
            <ul className="hidden flex-wrap gap-2 sm:flex" aria-label="Type de projet">
              {caseStudy.tags.map((tag) => (
                <li key={tag} className="rounded-lg bg-white px-2.5 py-1 text-[13px] font-medium">
                  {tag}
                </li>
              ))}
            </ul>

            <ol className="flex flex-col gap-3.5 lg:gap-3">
              {steps.map((step) => (
                <li key={step.label} className="rounded-xl bg-white px-[18px] py-4 lg:px-[22px] lg:py-[18px]">
                  <p className="mb-1 text-[13px] font-semibold text-rust lg:text-sm">{step.label}</p>
                  <p className="text-[15px] leading-6 lg:text-base lg:leading-[26px]">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="rounded-xl bg-navy px-[18px] py-4 text-white lg:px-[22px] lg:py-5">
              <p className="mb-1 text-[13px] font-semibold lg:text-sm">Le résultat</p>
              <p className="text-[15px] leading-6 lg:text-base lg:leading-[26px]">{caseStudy.result}</p>
            </div>

            {/* <figure> + <blockquote> + <figcaption> : balisage sémantique d'une citation et de son auteur */}
            <figure className="flex flex-col gap-3 rounded-xl bg-white p-5 lg:gap-3.5 lg:p-[22px]">
              <blockquote className="text-lg leading-7 text-navy lg:text-[19px] lg:leading-[29px]">
                « {caseStudy.quote} »
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="relative h-11 w-11 flex-none overflow-hidden rounded-full bg-placeholder lg:h-12 lg:w-12">
                  <Photo src={photos.author} alt={`Photo de ${caseStudy.author}`} sizes="48px" provisional={false} />
                </span>
                <span className="text-sm leading-5 lg:text-[15px] lg:leading-[22px]">
                  <b>{caseStudy.author}</b>
                  <br />
                  {caseStudy.authorRole}
                  {/* Retour à la ligne sur mobile, simple séparateur « · » sur desktop */}
                  <br className="lg:hidden" />
                  <span className="hidden lg:inline"> · </span>
                  <span className="font-medium text-rust">{caseStudy.clientSince}</span>
                </span>
              </figcaption>
            </figure>

            <div className="flex flex-wrap items-center gap-x-5">
              {/* ⚠️ Liens "#" tant que l'étude de cas et l'URL du site client ne sont pas renseignées */}
              <a href={caseStudy.storyHref ?? "#"} className={linkClass}>
                {caseStudy.storyLabel}
              </a>
              <a href={caseStudy.siteHref ?? "#"} className={`hidden sm:inline-flex ${linkClass}`}>
                Voir le site
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-white px-[18px] py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:px-7 lg:py-6">
          <p className="text-[15px] leading-6 lg:text-base lg:leading-[26px]">
            <b className="text-navy">Aussi accompagné : {alsoHelped.name}.</b> {alsoHelped.text}
          </p>
          <a href={alsoHelped.href ?? "#"} className={`whitespace-nowrap ${linkClass}`}>
            Voir le site
          </a>
        </div>
      </Container>
    </section>
  );
}
