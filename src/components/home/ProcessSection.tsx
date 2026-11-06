import { siteConfig } from "@/config/site";
import { exampleImages } from "@/content/exemples";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « Comment on travaille ensemble » : photo d'atelier à gauche, frise de
 * 4 étapes à droite (ligne pointillée orange, pastilles numérotées).
 *
 * Une <ol> (liste ordonnée) car l'ordre des étapes a du sens.
 * Les valeurs entre crochets ([durée], [DÉLAI]) sont à compléter (maquette).
 */
const steps = [
  {
    title: "Un premier échange",
    tag: "30 min · gratuit",
    text: "Au téléphone, en visio ou autour d'un café. Vous nous parlez de votre activité, on écoute, et on vous dit franchement ce qui vous sera utile.",
  },
  {
    title: "Un atelier, ensemble",
    tag: "[durée]",
    text: "Chez vous ou dans nos bureaux, on construit le plan du site avec vous : vos clients, vos mots, vos photos. Rien n'est décidé sans vous.",
  },
  {
    title: "La création, pas à pas",
    tag: "[DÉLAI]",
    text: `Vous voyez votre site avancer et vous validez chaque étape. Une question ? Vous appelez ${siteConfig.contact.firstName}, pas un service client.`,
  },
  {
    title: "Un suivi dans la durée",
    tag: "après la mise en ligne",
    text: "On reste là : mises à jour, conseils, évolutions. Toujours le même interlocuteur, qui connaît votre site et votre activité.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Comment on travaille ensemble"
            title="Vous savez toujours où en est votre site, et à qui parler."
          />
          <div className="relative h-72 overflow-hidden rounded-[14px] bg-placeholder lg:h-[400px]">
            <Photo
              src={exampleImages.workshop}
              alt="Atelier de travail entre l'équipe WebSteem et un client pour construire le plan de son site."
              sizes="(min-width: 1024px) 500px, 100vw"
            />
          </div>
        </div>

        <ol className="relative flex flex-col gap-5">
          {/* Ligne pointillée verticale qui relie les pastilles */}
          <li aria-hidden="true" className="absolute top-10 bottom-24 left-[23px] border-l-[3px] border-dashed border-orange md:left-[31px]" />
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li key={step.title} className="relative flex items-start gap-4 md:gap-6">
                <span
                  className={`flex h-12 w-12 flex-none items-center justify-center rounded-full text-lg font-semibold text-white shadow-[0_0_0_6px_#fff] md:h-16 md:w-16 md:text-[22px] ${
                    isLast ? "bg-orange" : "bg-navy"
                  }`}
                >
                  {index + 1}
                </span>
                <div className="flex flex-1 flex-col gap-2 rounded-xl bg-cream px-5 py-5 md:px-7 md:py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold text-navy md:text-2xl md:leading-8">{step.title}</h3>
                    <span className="rounded-lg bg-white px-3 py-1 text-sm font-medium">{step.tag}</span>
                  </div>
                  <p className="text-[17px] leading-7">{step.text}</p>
                </div>
              </li>
            );
          })}
          <li className="pt-2 md:pl-22">
            <Button href="/contact">Échanger sur vos besoins</Button>
          </li>
        </ol>
      </Container>
    </section>
  );
}
