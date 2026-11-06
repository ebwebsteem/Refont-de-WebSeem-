import { siteConfig } from "@/config/site";
import type { TeamCardMember } from "@/content/equipe";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MemberCard } from "./MemberCard";

/**
 * Les deux sections « membres » de la page Équipe.
 * Elles reçoivent la liste en props : ce sont des composants d'affichage,
 * la page décide d'où viennent les données (Strapi ou exemples).
 */

/** « L'équipe au quotidien » : grille de 2 colonnes sur desktop. */
export function TeamSection({ members }: { members: TeamCardMember[] }) {
  return (
    <section className="py-18 lg:py-28">
      <Container className="flex flex-col gap-6 lg:gap-12">
        <SectionHeading
          eyebrow="L'équipe au quotidien"
          title="Chaque personne qui touche à votre site, vous la connaissez."
          className="max-w-[820px]"
        />
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {members.map((member) => (
            <MemberCard key={member.fullName} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * « Une équipe modulable » : les experts partenaires, 3 colonnes sur desktop.
 * `moreCount` : nombre de partenaires non affichés (bouton masqué si 0).
 */
export function PartnersSection({ members, moreCount = 0 }: { members: TeamCardMember[]; moreCount?: number }) {
  return (
    <section className="bg-white py-18 lg:py-28">
      <Container className="flex flex-col gap-6 lg:gap-12">
        <SectionHeading
          layout="split"
          eyebrow="Une équipe modulable"
          title="Votre projet a besoin d'un expert en plus ? Il nous rejoint."
          intro={`Photographe, rédacteur, spécialiste des données… Selon vos besoins, ${siteConfig.contact.firstName} s'en occupe seul ou réunit des partenaires de confiance autour de votre projet.`}
        />
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {members.map((member) => (
            <MemberCard key={member.fullName} member={member} variant="partner" />
          ))}
        </div>
        {/* TODO : pas encore de page listant tous les partenaires ; en attendant, on renvoie vers le contact. */}
        {moreCount > 0 && (
          <Button href="/contact" variant="outline" size="md" className="self-center">
            Rencontrer les {moreCount} autres partenaires
          </Button>
        )}
      </Container>
    </section>
  );
}
