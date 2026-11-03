export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#contenu" className="lien-evitement">
        Aller au contenu
      </a>

      <header>{/* navigation à venir */}</header>

      <main id="contenu">{children}</main>

      <footer>{/* mentions légales, réseaux sociaux */}</footer>
    </>
  );
}
