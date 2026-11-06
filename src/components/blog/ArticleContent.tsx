"use client";

/**
 * Affichage du contenu d'un article (champ Strapi "Rich text (Blocks)").
 *
 * On utilise le paquet officiel @strapi/blocks-react-renderer : il parcourt
 * le JSON des blocs et appelle, pour chaque type de bloc, le composant React
 * qu'on lui fournit. On "mappe" ainsi chaque bloc sur les styles de la maquette.
 *
 * Pourquoi "use client" ?
 * BlocksRenderer est lui-même un Client Component, et on lui passe des
 * FONCTIONS (nos composants de blocs). Or un Server Component ne peut pas
 * transmettre de fonctions à un Client Component (elles ne passent pas sur
 * le réseau). On regroupe donc renderer + composants dans ce fichier client.
 * Le HTML est quand même généré côté serveur (SSR) : Google voit le texte.
 */
import Image from "next/image";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

export function ArticleContent({ content }: { content: BlocksContent }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        // Le 1er paragraphe est le "chapô" de la maquette (plus grand, en bleu) : voir ArticleBody
        paragraph: ({ children }) => <p className="mb-4 lg:mb-[18px]">{children}</p>,

        heading: ({ children, level, ...rest }) => {
          // `id` est ajouté côté serveur par prepareContent() (content.ts) pour le sommaire
          const { id } = rest as { id?: string };
          // L'article a déjà un <h1> (son titre) : les titres du contenu commencent à <h2>
          if (level <= 2) {
            return (
              <h2
                id={id}
                className="mt-11 mb-3 scroll-mt-24 text-2xl leading-8 font-semibold text-navy lg:mt-14 lg:mb-4 lg:text-[32px] lg:leading-10"
              >
                {children}
              </h2>
            );
          }
          return (
            <h3 className="mt-8 mb-3 text-xl leading-7 font-semibold text-navy lg:text-2xl lg:leading-8">{children}</h3>
          );
        },

        list: ({ children, format }) =>
          format === "ordered" ? (
            <ol className="mb-4 flex list-decimal flex-col gap-2 pl-[22px] lg:mb-[18px] lg:gap-2.5 lg:pl-6">{children}</ol>
          ) : (
            <ul className="mb-4 flex list-disc flex-col gap-2 pl-[22px] lg:mb-[18px] lg:gap-2.5 lg:pl-6">{children}</ul>
          ),

        quote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-orange bg-white py-4 pr-5 pl-5 text-navy italic lg:pl-6">
            {children}
          </blockquote>
        ),

        code: ({ plainText }) => (
          <pre className="mb-4 overflow-x-auto rounded-xl bg-ink p-4 text-sm leading-6 text-white">
            <code>{plainText}</code>
          </pre>
        ),

        link: ({ children, url }) => {
          const external = /^https?:\/\//.test(url);
          return (
            <a href={url} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {children}
            </a>
          );
        },

        // Images insérées dans le texte : URL rendue absolue côté serveur (content.ts)
        image: ({ image }) => (
          <figure className="my-6">
            <Image
              src={image.url}
              alt={image.alternativeText ?? ""}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 720px, 100vw"
              className="h-auto w-full rounded-xl"
            />
            {image.caption && <figcaption className="mt-2 text-sm text-muted">{image.caption}</figcaption>}
          </figure>
        ),
      }}
      modifiers={{
        bold: ({ children }) => <strong className="font-semibold">{children}</strong>,
        italic: ({ children }) => <em>{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        strikethrough: ({ children }) => <del>{children}</del>,
        code: ({ children }) => <code className="rounded bg-white px-1.5 py-0.5 text-[0.9em]">{children}</code>,
      }}
    />
  );
}
