import { Button } from "@/components/ui/Button";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { siteConfig } from "@/config/site";
import { exampleImages, pick } from "@/content/exemples";
import type { TeamMember } from "@/types/strapi";

/**
 * Encadré « Écrit par » en fin d'article.
 * Alimenté par la relation "auteur" de l'article (content-type Membre d'équipe) :
 * nom, photo et bio viennent de Strapi. Sans auteur, l'encadré n'est pas affiché.
 *
 * Les boutons renvoient vers l'interlocuteur commercial (siteConfig.contact),
 * qui n'est pas forcément l'auteur : c'est le choix de la maquette.
 */
export function AuthorBox({ author }: { author: TeamMember | null | undefined }) {
  if (!author) return null;
  const { firstName } = siteConfig.contact;

  return (
    <aside
      aria-label="À propos de l'auteur"
      className="mt-11 flex flex-col gap-3 rounded-xl bg-white p-5 lg:mt-14 lg:grid lg:grid-cols-[160px_1fr] lg:items-center lg:gap-7 lg:p-6"
    >
      <div className="flex items-center gap-3.5 lg:contents">
        {/* lg:contents : sur desktop ce div "disparaît" et ses enfants deviennent
            directement des cellules de la grille (photo à gauche, texte à droite). */}
        <div className="relative h-[108px] w-[88px] flex-none overflow-hidden rounded-xl bg-placeholder lg:h-[200px] lg:w-[160px]">
          <StrapiImage
            media={author.photo}
            placeholder={pick(exampleImages.portraits, author.id)}
            fallbackAlt={`Portrait de ${author.nom}`}
            sizes="(min-width: 1024px) 160px, 88px"
          />
        </div>
        <div className="lg:hidden">
          <AuthorName name={author.nom} />
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:gap-2.5">
        <div className="hidden lg:block">
          <AuthorName name={author.nom} />
        </div>
        {/* TODO (Strapi) : remplir le champ "bio" de chaque membre de l'équipe */}
        {author.bio && <p className="text-[15px] leading-6 lg:text-base lg:leading-[26px]">{author.bio}</p>}
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
          <Button href="/contact" size="md">
            Poser votre question à {firstName}
          </Button>
          {/* Desktop : « Prendre RDV » ; mobile : « Rencontrer l'équipe » (maquettes 11 et 12) */}
          {/* Les <span> portent l'affichage responsive : Button a déjà sa propre classe inline-flex */}
          <span className="hidden lg:contents">
            <Button href={siteConfig.bookingUrl} variant="outline" size="md" className="bg-cream!">
              Prendre RDV
            </Button>
          </span>
          <span className="contents lg:hidden">
            <Button href="/equipe" variant="outline" size="md" className="bg-cream!">
              Rencontrer l&apos;équipe
            </Button>
          </span>
        </div>
      </div>
    </aside>
  );
}

function AuthorName({ name }: { name: string }) {
  return (
    <>
      <p className="text-[13px] font-semibold text-rust lg:text-sm">Écrit par</p>
      <p className="text-[21px] leading-7 font-semibold text-navy lg:text-[26px] lg:leading-[34px]">{name}</p>
    </>
  );
}
