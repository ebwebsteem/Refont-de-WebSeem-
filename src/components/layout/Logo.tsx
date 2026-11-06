import Image from "next/image";
import Link from "next/link";

/**
 * Logo WebSteem (fichiers fournis avec la maquette, dans /public/brand).
 * - "bleu" sur fond clair (header) ;
 * - "creme" sur fond bleu (footer).
 * width/height = dimensions réelles du PNG : Next.js calcule le ratio et
 * réserve la place avant le chargement (pas de "saut" de mise en page).
 */
const logos = {
  bleu: { src: "/brand/logo-websteem-bleu.png", width: 455, height: 94 },
  creme: { src: "/brand/logo-websteem-creme.png", width: 1000, height: 207 },
};

export function Logo({ tone = "bleu", className = "h-[26px] md:h-[34px]" }: { tone?: "bleu" | "creme"; className?: string }) {
  const logo = logos[tone];
  return (
    <Link href="/" aria-label="WebSteem, retour à l'accueil" className="flex min-h-11 items-center">
      <Image src={logo.src} alt="WebSteem" width={logo.width} height={logo.height} className={`w-auto ${className}`} preload />
    </Link>
  );
}
