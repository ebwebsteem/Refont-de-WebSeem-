"use client";

/**
 * Menu "burger" pour mobile et tablette.
 *
 * "use client" est obligatoire ici car on utilise useState (état ouvert/fermé)
 * et des gestionnaires d'événements (onClick), qui n'existent que dans le
 * navigateur. Les liens sont passés en props depuis le Header (serveur) :
 * ce sont de simples objets, donc sérialisables.
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavLink } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

type MobileMenuProps = {
  links: NavLink[];
  cta: NavLink;
};

export function MobileMenu({ links, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  // Referme le menu avec la touche Échap (accessibilité)
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="menu-mobile"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        className="flex h-12 w-12 items-center justify-center bg-white text-navy"
      >
        <Icon name={isOpen ? "close" : "menu"} size={22} />
      </button>

      {isOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navigation mobile"
          className="absolute inset-x-0 top-[68px] border-b border-line bg-cream px-5 pb-6 shadow-lg"
        >
          <ul className="flex flex-col divide-y divide-line">
            {links.map((link) => (
              <li key={link.href}>
                {/* onClick={close} : referme le menu quand on change de page */}
                <Link href={link.href} onClick={close} className="block py-4 text-lg font-medium text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cta.href}
            onClick={close}
            className="mt-4 flex min-h-14 items-center justify-center bg-orange font-semibold text-white hover:text-white"
          >
            {cta.label}
          </Link>
        </nav>
      )}
    </>
  );
}
