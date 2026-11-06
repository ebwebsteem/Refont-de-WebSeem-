import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { footerNav, legalLinks, primaryCta, siteConfig, socialLinks } from "@/config/site";
import { metierHref, metiers } from "@/content/metiers";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

/**
 * Pied de page (identique sur toutes les pages de la maquette).
 *
 * 1. Bandeau : logo + accroche à gauche, « Une question ? » + 2 boutons à droite
 * 2. Quatre colonnes : navigation, métiers, coordonnées, réseaux sociaux
 * 3. Carte blanche : réseaux professionnels, partenariats, avis clients
 * 4. Copyright + liens légaux
 *
 * Tout est statique (config/site.ts et content/metiers.ts) : aucun appel à
 * Strapi, donc le footer est intégré au HTML statique de chaque page.
 */
export function Footer() {
  const { phone, contact } = siteConfig;

  return (
    <footer className="bg-navy text-white">
      <Container className="flex flex-col gap-8 pt-14 pb-7">
        {/* 1. Bandeau du haut */}
        <div className="flex flex-col justify-between gap-8 border-b border-navy-line pb-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-3">
            <Logo tone="creme" className="h-8" />
            <p className="max-w-md leading-[26px]">{siteConfig.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-[15px] leading-[22px] lg:text-right">
              Une question ?
              <br />
              {contact.firstName} vous répond.
            </p>
            <Button href={primaryCta.href} variant="light" size="md">
              {primaryCta.label}
            </Button>
            <Button href={phone.href} variant="outlineLight" size="md">
              {phone.display}
            </Button>
          </div>
        </div>

        {/* 2. Colonnes de liens */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[0.8fr_1fr_1.25fr_1.1fr]">
          <FooterColumn title="Navigation">
            {footerNav.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Un site internet pour…">
            {metiers.map((metier) => (
              <FooterLink key={metier.slug} href={metierHref(metier.slug)}>
                {metier.footerLabel ?? metier.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <div>
            <FooterTitle>Coordonnées</FooterTitle>
            <ul>
              <li>
                <a href={phone.href} className="inline-flex min-h-8 items-center text-[15px] font-semibold text-white hover:text-white">
                  {phone.international}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-8 items-center text-[15px] text-white hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <p className="mt-2.5 text-[15px] leading-6">
              Bureaux à Grenoble (38 - Isère) et Saint-Cyr-sur-Mer (83 - Var).
              <br />
              Partout en France, en visio.
            </p>
          </div>

          <div>
            <FooterTitle>Suivez WebSteem</FooterTitle>
            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={`WebSteem sur ${social.label}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_#8fa7b4] hover:bg-white/10"
                  >
                    <Image src={social.icon} alt="" width={social.width} height={social.height} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Carte des partenaires */}
        <PartnersCard />

        {/* 4. Bas de page */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-navy-line pt-5">
          <p className="text-sm">
            © {siteConfig.yearStart}-<CurrentYear /> WebSteem
          </p>
          <nav aria-label="Informations légales">
            <ul className="flex flex-wrap gap-x-5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex min-h-8 items-center text-sm text-white hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Sous-composants internes (non exportés : ils ne servent qu'ici)     */
/* ------------------------------------------------------------------ */

/**
 * Année en cours. Avec cacheComponents, Next refuse `new Date()` hors d'un
 * scope caché : la valeur changerait à chaque requête et empêcherait de
 * générer la page en statique. 'use cache' + cacheLife("days") règle ça :
 * l'année est recalculée au plus une fois par jour.
 */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2.5 text-[13px] leading-5 font-semibold tracking-[0.08em] uppercase">{children}</h2>;
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>
      <ul>{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-8 items-center py-1 text-[15px] leading-[22px] text-white hover:text-white hover:underline">
        {children}
      </Link>
    </li>
  );
}

/** Logos partenaires : dimensions réelles des fichiers PNG (pour le ratio). */
const partnerGroups = [
  {
    title: "Réseaux professionnels",
    logos: [
      { src: "/brand/partenaires/lacite.png", alt: "La Cité des entrepreneurs d'Euroméditerranée", w: 240, h: 142, className: "h-[62px]" },
      { src: "/brand/partenaires/ekolia-light.png", alt: "Ekolia – l'achat responsable", w: 240, h: 94, className: "h-11" },
    ],
  },
  {
    title: "Partenariats",
    logos: [
      { src: "/brand/partenaires/prestashop.png", alt: "PrestaShop Expert", w: 212, h: 96, className: "h-[46px]" },
      { src: "/brand/partenaires/ionos.png", alt: "IONOS Agency Partner Select – Green Hosting", w: 224, h: 164, className: "h-[62px]" },
      { src: "/brand/partenaires/trustedshops.png", alt: "Trusted Shops Qualified Partner", w: 304, h: 92, className: "h-11" },
    ],
  },
];

function PartnersCard() {
  return (
    <div className="flex flex-col gap-8 rounded-[14px] bg-white px-6 py-7 text-ink lg:flex-row lg:items-start lg:justify-between lg:px-9">
      {partnerGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-3.5 lg:border-r lg:border-line lg:pr-8">
          <p className="text-xs leading-[18px] font-semibold tracking-[0.08em] text-navy uppercase">{group.title}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
            {group.logos.map((logo) => (
              <Image key={logo.src} src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} className={`w-auto ${logo.className}`} />
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-3.5">
        <p className="text-xs leading-[18px] font-semibold tracking-[0.08em] text-navy uppercase">Avis clients</p>
        <div className="flex items-center gap-3.5">
          <Image src="/brand/partenaires/verifsites.png" alt="Verif Sites – note de 5 sur 5" width={226} height={226} className="h-[72px] w-auto" />
          <p className="text-sm leading-[21px]">
            <strong className="block text-[22px] leading-7 text-navy">5/5</strong>
            Avis clients vérifiés
            <br />
            par Verif Sites
          </p>
        </div>
      </div>
    </div>
  );
}
