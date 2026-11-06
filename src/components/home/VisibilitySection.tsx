import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « Être trouvé, sur Google et par les IA » (SEO local + GEO).
 * Texte à gauche, deux cartes à droite : une blanche, une bleue.
 */
const google = [
  "Une page pour votre métier et votre ville",
  "Votre fiche Google tenue à jour avec vous",
  "Les mêmes coordonnées partout",
  "De l'aide pour recueillir les avis de vos clients",
];

const ai = [
  "Des textes qui répondent aux vraies questions de vos clients",
  "Une FAQ que les assistants savent lire",
  "Votre présence sur les sites qu'ils consultent",
  "Un point régulier pour voir où l'on vous cite",
];

export function VisibilitySection() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-5">
          <SectionHeading
            eyebrow="Être trouvé, sur Google et par les IA"
            title="Vos clients vous cherchent. Ils vous trouvent."
            intro="Aujourd'hui, vos clients tapent une recherche sur Google, ou posent la question à ChatGPT ou Gemini. On prépare votre site pour qu'il réponde clairement à leurs questions, et qu'on le leur recommande."
          />
          <p className="rounded-xl bg-white px-6 py-5 leading-[26px]">
            <b className="text-navy">Ce qu&apos;on ne promet pas :</b> une première place garantie. Personne ne peut la
            garantir honnêtement. On promet un travail sérieux, mesuré et expliqué.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CheckCard title="Près de chez vous, sur Google" items={google} />
          <CheckCard title="Dans les réponses des IA" items={ai} dark />
        </div>
      </Container>
    </section>
  );
}

function CheckCard({ title, items, dark = false }: { title: string; items: string[]; dark?: boolean }) {
  return (
    <div className={`flex flex-col gap-4 rounded-xl p-8 ${dark ? "bg-navy text-white" : "bg-white"}`}>
      <h3 className={`text-2xl leading-8 font-semibold ${dark ? "" : "text-navy"}`}>{title}</h3>
      <ul className="flex flex-col gap-3 text-[17px] leading-[26px]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Icon name="check" size={22} strokeWidth={2.4} className={`mt-0.5 ${dark ? "text-white" : "text-rust"}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
