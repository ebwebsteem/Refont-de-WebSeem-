import Link from "next/link";
import { mainNav, primaryCta, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * En-tête du site (Server Component).
 *
 * Desktop (≥ 1024 px) : logo · menu · téléphone · bouton orange.
 * Mobile : logo · bouton téléphone orange · bouton menu (MobileMenu).
 *
 * Seul le menu mobile a besoin d'un état React (ouvert/fermé) : il est isolé
 * dans <MobileMenu>, un Client Component. Le reste ne coûte aucun JavaScript.
 */
export function Header() {
  const { phone } = siteConfig;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-8 pr-3 pl-5 md:px-10 lg:h-[88px] xl:px-24">
        <Logo />

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="px-3.5 py-3 text-base text-ink hover:text-rust">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href={phone.href} className="inline-flex min-h-12 items-center gap-2 px-3 font-semibold text-navy">
            <Icon name="phone" className="text-orange" />
            {phone.display}
          </a>
          <Button href={primaryCta.href} size="md">
            {primaryCta.label}
          </Button>
        </div>

        {/* Actions mobile */}
        <div className="flex gap-2 lg:hidden">
          <a
            href={phone.href}
            aria-label={`Appeler WebSteem au ${phone.display}`}
            className="flex h-12 w-12 items-center justify-center bg-orange text-white"
          >
            <Icon name="phone" size={22} />
          </a>
          <MobileMenu links={mainNav} cta={primaryCta} />
        </div>
      </div>
    </header>
  );
}
