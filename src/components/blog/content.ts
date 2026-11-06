/**
 * Préparation du champ "contenu" (Rich text Blocks) d'un article, côté serveur.
 *
 * Le champ Blocks de Strapi est un tableau JSON de blocs :
 *   [{ type: "heading", level: 2, children: [{ type: "text", text: "Titre" }] },
 *    { type: "paragraph", children: [...] }, …]
 *
 * Avant de l'envoyer au composant d'affichage, on :
 * 1. ajoute un `id` à chaque titre (pour les ancres du sommaire : #mon-titre) ;
 * 2. construit la liste des titres pour le sommaire ;
 * 3. rend absolues les URL des images (Strapi renvoie "/uploads/…" en local) ;
 * 4. compte les mots pour estimer le temps de lecture si Strapi ne le donne pas.
 */
import "server-only";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { getStrapiMediaUrl } from "@/lib/strapi/client";

export type TocEntry = { id: string; label: string };

export type PreparedContent = {
  blocks: BlocksContent;
  headings: TocEntry[];
  /** Temps de lecture estimé (minutes) */
  readingTime: number;
};

/** Texte brut d'un nœud (et de ses enfants), ex. pour le libellé d'un titre. */
function nodeText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: string; children?: unknown[] };
  if (typeof n.text === "string") return n.text;
  return (n.children ?? []).map(nodeText).join("");
}

/**
 * "Ce qu'a changé le règlement" → "ce-qua-change-le-reglement".
 * normalize("NFD") sépare les lettres de leurs accents, que l'on supprime ensuite.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function prepareContent(content: unknown): PreparedContent {
  // Le type partagé (BlocksContent = unknown[]) est volontairement large :
  // on vérifie qu'on a bien un tableau avant de le parcourir.
  const blocks = (Array.isArray(content) ? content : []) as BlocksContent;
  const headings: TocEntry[] = [];
  const usedIds = new Set<string>();
  let words = 0;

  const prepared = blocks.map((block) => {
    words += nodeText(block).split(/\s+/).filter(Boolean).length;

    if (block.type === "heading" && block.level <= 2) {
      const label = nodeText(block).trim();
      // Deux titres identiques ne doivent pas avoir le même id : on numérote
      let id = slugify(label) || "section";
      for (let i = 2; usedIds.has(id); i++) id = `${slugify(label)}-${i}`;
      usedIds.add(id);
      headings.push({ id, label });
      // Le renderer transmet toutes les propriétés du bloc au composant :
      // notre composant "heading" recevra donc ce `id`.
      return { ...block, id };
    }

    if (block.type === "image") {
      return { ...block, image: { ...block.image, url: getStrapiMediaUrl(block.image.url) ?? block.image.url } };
    }

    return block;
  });

  return {
    blocks: prepared,
    headings,
    // ~200 mots par minute pour une lecture attentive à l'écran
    readingTime: Math.max(1, Math.ceil(words / 200)),
  };
}
