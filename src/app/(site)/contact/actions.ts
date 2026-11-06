"use server";

/**
 * Server Action du formulaire de contact.
 *
 * "use server" en haut du fichier : toutes les fonctions exportées
 * s'exécutent UNIQUEMENT sur le serveur. Le navigateur ne reçoit qu'une
 * référence pour les appeler (via le <form action={…}>).
 *
 * ⚠️ Une Server Action est un point d'entrée public (comme une route d'API) :
 * n'importe qui peut l'appeler avec n'importe quelles données. On ne fait
 * donc JAMAIS confiance aux contrôles du navigateur : tout est revérifié ici.
 */
import type { ContactField, ContactFormState } from "@/components/contact/formState";

/** Longueurs maximales : évitent qu'on nous envoie des textes de 10 Mo. */
const MAX_LENGTH: Record<ContactField, number> = {
  prenom: 60,
  joindre: 120,
  activite: 120,
  projet: 3000,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Téléphone : au moins 10 chiffres une fois retirés espaces, points, tirets, parenthèses et "+". */
function isPhone(value: string): boolean {
  const digits = value.replace(/[\s.\-()+]/g, "");
  return /^\d{10,15}$/.test(digits);
}

/** Lit un champ texte du FormData (renvoie "" si absent ou si ce n'est pas du texte). */
function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Avec useActionState, la Server Action reçoit l'état précédent en 1er
 * argument, puis les données du formulaire. Ce qu'elle renvoie devient le
 * nouvel état affiché par le composant.
 */
export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: Record<ContactField, string> = {
    prenom: readField(formData, "prenom"),
    joindre: readField(formData, "joindre"),
    activite: readField(formData, "activite"),
    projet: readField(formData, "projet"),
  };

  // Champ "piège" invisible pour les humains : s'il est rempli, c'est un robot.
  // On fait semblant que tout s'est bien passé, sans rien traiter.
  if (readField(formData, "site_web")) {
    return { status: "success", message: "Merci, votre message a bien été envoyé.", errors: {}, values: {} };
  }

  /* ---------- Validation ---------- */
  const errors: ContactFormState["errors"] = {};

  if (!values.prenom) errors.prenom = "Indiquez votre prénom.";

  if (!values.joindre) {
    errors.joindre = "Indiquez un e-mail ou un numéro de téléphone pour qu'on puisse vous répondre.";
  } else if (!EMAIL_REGEX.test(values.joindre) && !isPhone(values.joindre)) {
    errors.joindre = "Ce n'est ni un e-mail valide (ex. : nom@domaine.fr) ni un numéro de téléphone (ex. : 06 12 34 56 78).";
  }

  if (!values.activite) errors.activite = "Dites-nous en quelques mots quelle est votre activité.";

  if (!values.projet) {
    errors.projet = "Décrivez votre projet en quelques mots.";
  } else if (values.projet.length < 10) {
    errors.projet = "Pouvez-vous en dire un peu plus (10 caractères minimum) ?";
  }

  for (const field of Object.keys(MAX_LENGTH) as ContactField[]) {
    if (!errors[field] && values[field].length > MAX_LENGTH[field]) {
      errors[field] = `Ce champ est trop long (${MAX_LENGTH[field]} caractères maximum).`;
    }
  }

  if (Object.keys(errors).length > 0) {
    const count = Object.keys(errors).length;
    return {
      status: "error",
      message: count === 1 ? "Un champ est à corriger." : `${count} champs sont à corriger.`,
      errors,
      values, // on renvoie la saisie pour re-remplir le formulaire
    };
  }

  /* ---------- Traitement ---------- */
  // TODO : envoyer réellement le message par e-mail à l'équipe (ex. via
  // Resend, Brevo ou un serveur SMTP avec nodemailer), avec les identifiants
  // en variables d'environnement. Tant que ce n'est pas fait, les messages
  // ne sont reçus par PERSONNE : ne pas mettre ce formulaire en production.
  //
  // RGPD : on ne stocke rien (ni base de données, ni fichier). Le journal
  // ci-dessous évite volontairement les données personnelles (le moyen de
  // contact et le texte du projet n'y apparaissent pas).
  console.log("[Contact] Nouveau message reçu", {
    prenom: values.prenom,
    moyenDeContact: EMAIL_REGEX.test(values.joindre) ? "e-mail" : "téléphone",
    activite: values.activite,
    longueurProjet: values.projet.length,
  });

  return {
    status: "success",
    message: `Merci ${values.prenom}, votre message a bien été envoyé. On vous répond très vite.`,
    errors: {},
    values: {},
  };
}
