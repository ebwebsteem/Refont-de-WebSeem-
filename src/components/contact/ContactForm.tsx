"use client";

/**
 * Formulaire « Parlez-nous de vous ».
 *
 * C'est un Client Component ("use client") car il utilise un hook React,
 * useActionState, qui :
 * - appelle la Server Action `sendContactMessage` à l'envoi du formulaire ;
 * - conserve l'état renvoyé (erreurs, message de succès) ;
 * - fournit `pending` (vrai pendant l'envoi) pour désactiver le bouton.
 *
 * Bonus : grâce à <form action={…}>, le formulaire fonctionne même si le
 * JavaScript n'est pas encore chargé (envoi HTML classique).
 *
 * Accessibilité des erreurs :
 * - `noValidate` désactive les bulles du navigateur : on affiche nos propres
 *   messages, identiques pour tout le monde, et vérifiés côté serveur ;
 * - chaque champ en erreur porte aria-invalid et aria-describedby (le
 *   lecteur d'écran lit le message en arrivant sur le champ) ;
 * - le résumé en haut est dans une zone role="alert" : il est annoncé
 *   dès qu'il apparaît.
 */
import Link from "next/link";
import { useActionState } from "react";
import { sendContactMessage } from "@/app/(site)/contact/actions";
import { Icon } from "@/components/ui/Icon";
import { initialContactState, type ContactField } from "./formState";

const fieldClasses =
  "w-full rounded-lg bg-cream px-3.5 text-base text-ink placeholder:text-muted lg:px-4 shadow-[inset_0_0_0_1.5px_var(--color-navy)] aria-invalid:shadow-[inset_0_0_0_2px_var(--color-rust)]";

export function ContactForm({ firstName }: { firstName: string }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);

  /** Attributs communs à chaque champ (nom, valeur précédente, accessibilité des erreurs). */
  function fieldProps(name: ContactField) {
    const error = state.errors[name];
    return {
      id: `contact-${name}`,
      name,
      required: true,
      defaultValue: state.values[name] ?? "",
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `contact-${name}-erreur` : undefined,
    };
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-labelledby="form-titre"
      className="flex flex-col gap-4.5 lg:gap-6 lg:rounded-[14px] lg:bg-cream lg:px-12 lg:py-10 lg:shadow-[0_0_0_1px_#E9E8EC,0_16px_40px_rgba(29,54,66,0.08)]"
    >
      <h2 id="form-titre" className="text-2xl leading-8 font-semibold text-navy lg:text-[28px] lg:leading-9">
        Parlez-nous de vous
      </h2>

      {/* Zone d'annonce : succès (role="status", poli) ou erreurs (role="alert", prioritaire) */}
      {state.status === "success" && (
        <p role="status" className="flex items-start gap-3 rounded-xl bg-white p-4 font-semibold text-navy">
          <Icon name="check" className="mt-0.5 text-navy" />
          {state.message}
        </p>
      )}
      {state.status === "error" && (
        <p role="alert" className="rounded-xl bg-white p-4 font-semibold text-rust">
          {state.message}
        </p>
      )}

      <div className="grid gap-4.5 sm:grid-cols-2 lg:gap-5">
        <Field label="Votre prénom" name="prenom" error={state.errors.prenom}>
          <input {...fieldProps("prenom")} type="text" autoComplete="given-name" className={`h-13 lg:h-14 ${fieldClasses}`} />
        </Field>
        <Field label="Comment vous joindre ?" name="joindre" error={state.errors.joindre}>
          <input
            {...fieldProps("joindre")}
            type="text"
            autoComplete="email"
            placeholder="E-mail ou téléphone"
            className={`h-13 lg:h-14 ${fieldClasses}`}
          />
        </Field>
      </div>

      <Field label="Votre activité" name="activite" error={state.errors.activite}>
        <input
          {...fieldProps("activite")}
          type="text"
          autoComplete="organization"
          placeholder="Ex. : cabinet de kiné, boutique de vélos, club de sport"
          className={`h-13 lg:h-14 ${fieldClasses}`}
        />
      </Field>

      <Field label="Votre projet en quelques mots" name="projet" error={state.errors.projet}>
        <textarea
          {...fieldProps("projet")}
          rows={5}
          placeholder="Ce que vous aimeriez, ce qui vous bloque aujourd'hui… Pas besoin d'être technique."
          className={`resize-y py-3.5 leading-[26px] ${fieldClasses}`}
        />
      </Field>

      {/*
        Anti-spam "pot de miel" : champ invisible que seuls les robots remplissent.
        aria-hidden + tabIndex={-1} : ignoré par les lecteurs d'écran et le clavier.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="contact-site-web">Ne pas remplir</label>
        <input id="contact-site-web" type="text" name="site_web" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm leading-[22px]">
        Vos informations servent uniquement à vous répondre.{" "}
        <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-13 items-center justify-center gap-3 bg-orange px-7 text-base font-semibold text-white transition duration-200 ease-out hover:-translate-y-px hover:bg-orange-dark hover:shadow-[0_6px_16px_rgba(29,54,66,0.16)] disabled:cursor-wait disabled:opacity-70 sm:self-start lg:min-h-14 lg:text-[17px]"
      >
        {pending ? "Envoi en cours…" : `Parler de mon projet à ${firstName}`}
        <Icon name="send" />
      </button>

      <div className="flex flex-col gap-3 lg:border-t lg:border-placeholder lg:pt-6">
        <p className="font-semibold text-navy">Et ensuite ?</p>
        <ol className="flex flex-col gap-2.5 rounded-xl bg-white px-4.5 py-4 text-sm leading-[22px] sm:grid sm:grid-cols-3 sm:gap-4 lg:bg-transparent lg:p-0 lg:text-[15px] lg:leading-6">
          {[
            `${firstName} lit votre message.`,
            "Vous échangez 30 minutes, [sous X h].",
            "Vous recevez un devis gratuit, sans engagement.",
          ].map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-cream font-semibold text-navy lg:bg-white">
                {index + 1}
              </span>
              <span className="pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </form>
  );
}

/** Un label + son champ + son message d'erreur. */
function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: ContactField;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`contact-${name}`} className="font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`contact-${name}-erreur`} className="text-sm leading-[22px] font-medium text-rust">
          {error}
        </p>
      )}
    </div>
  );
}
