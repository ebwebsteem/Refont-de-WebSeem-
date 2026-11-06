import { exampleImages } from "@/content/exemples";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

/**
 * Haut de la page Équipe : titre (h1) à gauche, photo de groupe à droite.
 *
 * Sur mobile, la maquette place la photo AU-DESSUS du titre : on garde
 * l'ordre logique du HTML (titre puis photo, meilleur pour les lecteurs
 * d'écran) et on inverse seulement l'affichage avec `order-first`.
 */
export function EquipeHero() {
  return (
    <section className="pt-4 pb-18 lg:pt-18 lg:pb-28">
      <Container className="grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-4.5 lg:gap-6">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "L'équipe" }]} />
          <h1 className="text-4xl leading-11 font-semibold tracking-tight text-balance text-navy lg:text-[56px] lg:leading-16">
            Les personnes qui vont s&apos;occuper de votre site.
          </h1>
          <p className="max-w-[60ch] text-base leading-[26px] lg:text-lg lg:leading-[30px]">
            Vous savez dès le premier jour qui travaille sur votre projet. Et vous pouvez joindre chacun directement,
            par son prénom.
          </p>
          <ul className="flex flex-wrap gap-3">
            {["Grenoble et Saint-Cyr-sur-Mer", "21 personnes, équipe et partenaires"].map((tag) => (
              <li key={tag} className="rounded-lg bg-white px-3.5 py-2 text-sm font-medium lg:text-[15px]">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative order-first h-[230px] lg:order-none lg:h-[460px]">
          {/* Forme blanche décorative derrière la photo (desktop uniquement) */}
          <svg
            aria-hidden="true"
            viewBox="-80 -80 160 160"
            className="absolute -top-10 -right-12 hidden h-[420px] w-[420px] lg:block"
          >
            <path
              fill="#FFFFFF"
              d="M43.5,-58.1C55.3,-48.5,62.9,-34.1,67.2,-18.4C71.5,-2.7,72.5,14.3,65.6,27.4C58.7,40.5,43.9,49.7,28.6,56.6C13.3,63.5,-2.5,68.1,-18.6,65.5C-34.7,62.9,-51.1,53.1,-60.6,38.9C-70.1,24.7,-72.7,6.1,-68.6,-10.4C-64.5,-26.9,-53.7,-41.3,-40.1,-50.6C-26.5,-59.9,-10.2,-64.1,3.2,-68.2C16.6,-72.3,31.7,-67.7,43.5,-58.1Z"
            />
          </svg>
          {/* `inset` décale la photo de 20 px en haut et à droite pour laisser voir la forme */}
          <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-placeholder lg:inset-[20px_20px_0_0]">
            <Photo
              src={exampleImages.heroSlides[0]}
              alt="L'équipe WebSteem réunie dans son bureau de Grenoble."
              sizes="(min-width: 1024px) 50vw, 100vw"
              preload
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
