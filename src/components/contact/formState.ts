/**
 * Forme de l'"état" échangé entre le formulaire de contact (Client Component)
 * et la Server Action qui le traite (app/(site)/contact/actions.ts).
 *
 * Pourquoi un fichier séparé ? Un fichier "use server" ne peut exporter QUE
 * des fonctions asynchrones : impossible d'y mettre `initialContactState`.
 */

/** Les noms des champs, identiques aux attributs `name` des <input>. */
export type ContactField = "prenom" | "joindre" | "activite" | "projet";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  /** Message global, lu par les lecteurs d'écran (zone aria-live) */
  message: string;
  /** Une erreur par champ invalide */
  errors: Partial<Record<ContactField, string>>;
  /**
   * Valeurs saisies, renvoyées en cas d'erreur pour re-remplir le formulaire.
   * (React 19 vide le formulaire après chaque envoi : sans ça, la personne
   * perdrait tout son texte à cause d'une seule faute.)
   */
  values: Partial<Record<ContactField, string>>;
}

export const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
