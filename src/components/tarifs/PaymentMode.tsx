"use client";

/**
 * Bascule « Paiement unique / En 12 fois ».
 *
 * Le bouton est dans l'en-tête de la page, mais il modifie les prix des
 * cartes plus bas : deux composants éloignés doivent partager la même
 * information. Solution React classique : un Contexte.
 *
 *   <PaymentModeProvider>        ← garde le mode choisi (useState)
 *     … <PaymentToggle />        ← le modifie
 *     … <PlanPrice />            ← le lit
 *   </PaymentModeProvider>
 *
 * Seuls ces petits composants sont des Client Components : le reste de la
 * page (passé en `children`) reste rendu côté serveur.
 */
import { createContext, use, useState } from "react";
import type { Plan } from "@/content/tarifs";

type PaymentMode = "once" | "monthly";

const PaymentModeContext = createContext<{
  mode: PaymentMode;
  setMode: (mode: PaymentMode) => void;
}>({ mode: "once", setMode: () => {} });

export function PaymentModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaymentMode>("once");
  // React 19 : on peut écrire <Context value={…}> au lieu de <Context.Provider>
  return <PaymentModeContext value={{ mode, setMode }}>{children}</PaymentModeContext>;
}

/**
 * Deux boutons qui fonctionnent comme un interrupteur.
 * aria-pressed indique aux lecteurs d'écran lequel est actif.
 */
export function PaymentToggle({ className = "" }: { className?: string }) {
  // use(Context) : nouvelle façon (React 19) de lire un contexte, équivalente à useContext
  const { mode, setMode } = use(PaymentModeContext);
  const options: { value: PaymentMode; label: string }[] = [
    { value: "once", label: "Paiement unique" },
    { value: "monthly", label: "En 12 fois" },
  ];

  return (
    <div
      role="group"
      aria-label="Mode de paiement"
      className={`flex rounded-xl bg-white p-1 shadow-[0_0_0_1px_var(--color-line)] ${className}`}
    >
      {options.map((option) => {
        const isActive = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setMode(option.value)}
            className={`min-h-11 flex-1 cursor-pointer rounded-lg px-5 text-[15px] font-semibold transition-colors ${
              isActive ? "bg-navy text-white" : "text-navy hover:bg-cream"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/** Le prix d'une formule, selon le mode de paiement choisi. */
export function PlanPrice({ plan }: { plan: Plan }) {
  const { mode } = use(PaymentModeContext);
  const isMonthly = mode === "monthly" && !plan.isSubscription;

  let note = "";
  if (plan.isSubscription) note = "HT / mois, sans engagement";
  else if (isMonthly) note = "HT / mois, pendant 12 mois";

  return (
    // aria-live : le lecteur d'écran annonce le nouveau prix quand on change de mode
    <div aria-live="polite">
      <p className="text-sm">à partir de</p>
      <p className={`text-[32px] leading-10 font-semibold lg:text-[44px] lg:leading-[52px] ${plan.featured ? "" : "text-navy"}`}>
        {isMonthly ? plan.monthlyPrice : plan.price}
      </p>
      {note && <p className="text-sm leading-5">{note}</p>}
    </div>
  );
}
