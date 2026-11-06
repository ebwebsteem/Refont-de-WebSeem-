/**
 * Conteneur centré. La maquette fait 1440 px de large avec des marges de
 * 96 px : on reproduit ces marges sur grand écran et on les réduit sur
 * tablette (40 px) et mobile (20 px).
 */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-24 ${className}`}>{children}</div>;
}
