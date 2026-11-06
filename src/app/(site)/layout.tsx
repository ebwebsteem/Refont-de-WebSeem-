import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

/**
 * Layout commun à toutes les pages publiques du site.
 *
 * Un layout n'est PAS re-rendu quand on navigue d'une page à l'autre :
 * le header et le footer restent en place, seul {children} change.
 */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenu" className="lien-evitement">
        Aller au contenu
      </a>

      <Header />

      <main id="contenu" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
