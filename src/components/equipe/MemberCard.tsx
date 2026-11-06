import type { TeamCardMember } from "@/content/equipe";
import { Button } from "@/components/ui/Button";
import { StrapiImage } from "@/components/ui/StrapiImage";

/**
 * Carte d'un membre de l'équipe ou d'un partenaire.
 *
 * Une seule carte, deux mises en page (prop `variant`) :
 * - "team"    : carte blanche, grande photo à GAUCHE sur grand écran ;
 * - "partner" : carte crème, photo AU-DESSUS du texte sur desktop.
 * Sur mobile, les deux variantes affichent une petite photo à côté du nom
 * (maquette 06-equipe-mobile).
 *
 * Astuce : on utilise une grille CSS dont on change les colonnes selon la
 * taille d'écran, plutôt que d'écrire deux versions de la carte.
 *
 * <StrapiImage> affiche la photo Strapi si elle existe, sinon la photo
 * provisoire (avec son badge).
 */
type MemberCardProps = {
  member: TeamCardMember;
  variant?: "team" | "partner";
};

export function MemberCard({ member, variant = "team" }: MemberCardProps) {
  const isTeam = variant === "team";

  return (
    <article
      className={
        isTeam
          ? "grid grid-cols-[96px_1fr] gap-x-3.5 gap-y-2.5 rounded-xl bg-white p-4 sm:grid-cols-[220px_1fr] sm:gap-x-6"
          : "grid grid-cols-[96px_1fr] gap-x-3.5 gap-y-2.5 rounded-xl bg-cream p-4 lg:grid-cols-1 lg:gap-y-3.5 lg:p-3 lg:pb-6"
      }
    >
      <div
        className={`relative h-[120px] overflow-hidden rounded-xl bg-placeholder ${
          isTeam ? "sm:row-span-2 sm:h-auto sm:min-h-[300px]" : "lg:h-[260px]"
        }`}
      >
        <StrapiImage
          media={member.photo}
          placeholder={member.placeholder}
          fallbackAlt={`${member.fullName}, ${member.role}.`}
          sizes={isTeam ? "(min-width: 640px) 220px, 96px" : "(min-width: 1024px) 33vw, 96px"}
        />
      </div>

      <div className={`self-center ${isTeam ? "sm:self-start sm:pt-3 sm:pr-3" : "lg:px-3"}`}>
        <h3
          className={`font-semibold text-navy ${
            isTeam ? "text-2xl leading-8 sm:text-[28px] sm:leading-9" : "text-[22px] leading-[30px] lg:text-2xl lg:leading-8"
          }`}
        >
          {member.firstName}
        </h3>
        {/* Mobile : nom et poste sur deux lignes ; desktop : séparés par « · » */}
        <p className={`mt-0 text-sm leading-5 font-medium ${isTeam ? "sm:mt-2.5 sm:text-[15px]" : "lg:mt-2"}`}>
          <span className={isTeam ? "block sm:inline" : "block lg:inline"}>{member.fullName}</span>
          {member.role && (
            <>
              <span className={isTeam ? "hidden sm:inline" : "hidden lg:inline"}> · </span>
              <span className={isTeam ? "block sm:inline" : "block lg:inline"}>{member.role}</span>
            </>
          )}
        </p>
      </div>

      <div
        className={`col-span-2 flex flex-col gap-2.5 ${
          isTeam ? "sm:col-span-1 sm:col-start-2 sm:pr-3 sm:pb-3" : "lg:col-span-1 lg:gap-2 lg:px-3"
        }`}
      >
        {member.bio && <p className="text-[15px] leading-6 sm:text-base sm:leading-[26px]">{member.bio}</p>}

        {/* Phrase et « Ce que j'aime » : masquées sur mobile, comme sur la maquette */}
        {member.quote && (
          <p className={`hidden text-navy sm:block ${isTeam ? "text-lg leading-7" : "text-[17px] leading-[26px]"}`}>
            « {member.quote} »
          </p>
        )}
        {member.loves && (
          <p className="hidden text-[15px] leading-6 sm:block">
            <b className="text-navy">Ce que j&apos;aime dans mon métier :</b> {member.loves}
          </p>
        )}

        {/* Pas encore d'e-mail par personne dans Strapi : on renvoie vers le formulaire de contact */}
        <Button
          href="/contact"
          variant="outline"
          size="md"
          className={`mt-auto w-full text-[15px] sm:w-auto sm:self-start ${isTeam ? "" : "lg:mt-0"}`}
        >
          Écrire à {member.firstName}
        </Button>
      </div>
    </article>
  );
}
