"use client";

/**
 * Bouton « Copier le lien de l'article ».
 * Client Component : l'accès au presse-papiers (navigator.clipboard) et
 * l'état "copié" n'existent que dans le navigateur.
 */
import { useState } from "react";

export function CopyLinkButton({ url, className = "" }: { url: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // Le message disparaît après 2 secondes
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers refusé (navigateur ancien, page non sécurisée…) : on ne fait rien
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Lien copié" : "Copier le lien de l'article"}
      className={`relative cursor-pointer ${className}`}
    >
      {/* Icône "maillon de chaîne" */}
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
      </svg>
      {/* aria-live : le lecteur d'écran annonce « Lien copié » */}
      <span aria-live="polite" className="absolute top-full right-0 mt-2 text-xs whitespace-nowrap">
        {copied ? "Lien copié" : ""}
      </span>
    </button>
  );
}
