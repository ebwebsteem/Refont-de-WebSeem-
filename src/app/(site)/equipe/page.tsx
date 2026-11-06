import type { Metadata } from "next";
import { EquipeHero } from "@/components/equipe/EquipeHero";
import { MainContactSection } from "@/components/equipe/MainContactSection";
import { PartnersSection, TeamSection } from "@/components/equipe/TeamSections";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { otherPartnersCount } from "@/content/equipe";
import { getTeamPageMembers } from "@/lib/strapi/team";

export const metadata: Metadata = {
  title: "L'équipe",
  description:
    "Les personnes qui vont s'occuper de votre site : Emmanuel, votre interlocuteur, l'équipe au quotidien et nos experts partenaires, à Grenoble et Saint-Cyr-sur-Mer.",
};

/**
 * Page « L'équipe » (maquettes 05-equipe-desktop / 06-equipe-mobile).
 *
 * Les membres viennent de Strapi (collection « Membre d'équipe »), avec repli
 * sur les données d'exemple si Strapi est vide ou éteint (voir lib/strapi/team.ts).
 *
 * Cache : getAllTeamMembers() est marquée 'use cache'. Next peut donc
 * intégrer son résultat dans le HTML statique de la page, sans <Suspense>
 * (cacheComponents n'exige <Suspense> que pour les données NON cachées).
 */
export default async function EquipePage() {
  const { team, partners, fromStrapi } = await getTeamPageMembers();

  return (
    <>
      <EquipeHero />
      <MainContactSection />
      {team.length > 0 && <TeamSection members={team} />}
      {partners.length > 0 && (
        // Le compteur « 13 autres partenaires » n'a de sens qu'avec les données d'exemple
        <PartnersSection members={partners} moreCount={fromStrapi ? 0 : otherPartnersCount} />
      )}
      <CtaBanner
        title="Envie de nous rencontrer ? Autour d'un café ou en visio."
        text="À Grenoble, à Saint-Cyr-sur-Mer ou à distance. Devis gratuit et sans engagement."
      />
    </>
  );
}
