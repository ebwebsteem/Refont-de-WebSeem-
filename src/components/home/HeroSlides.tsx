"use client";

/**
 * Photos de fond du hero, en carrousel (Client Component : il faut un état
 * pour savoir quelle photo est affichée, et des clics sur les boutons).
 *
 * Choix d'accessibilité repris de la maquette :
 * - pas de défilement automatique (gênant pour la lecture et les lecteurs d'écran) ;
 * - boutons précédent / suivant + une pastille par photo, avec aria-label ;
 * - toutes les photos sont superposées et on joue sur l'opacité (fondu).
 */
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Slide = { src: string; alt: string };

export function HeroSlides({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const count = slides.length;

  // Modulo : après la dernière photo on revient à la première (et inversement)
  const go = (index: number) => setCurrent((index + count) % count);

  return (
    <>
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={index === current ? slide.alt : ""}
          fill
          // Seule la première photo est préchargée : c'est elle qui s'affiche au chargement
          preload={index === 0}
          sizes="(min-width: 1440px) 1376px, 100vw"
          className={`object-cover transition-opacity duration-400 ease-out ${index === current ? "opacity-100" : "opacity-0"}`}
          aria-hidden={index !== current}
        />
      ))}

      {/* Commandes du carrousel : en haut à droite sur mobile, en bas à droite sur desktop */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1 lg:top-auto lg:right-8 lg:bottom-8">
        <CarouselButton label="Photo précédente" icon="chevronLeft" onClick={() => go(current - 1)} />
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(index)}
            aria-label={`Afficher la photo ${index + 1} sur ${count}`}
            aria-current={index === current}
            className="flex h-11 w-8 items-center justify-center"
          >
            <span
              className={`h-2.5 rounded-lg transition-all duration-300 ${index === current ? "w-6 bg-white" : "w-2.5 bg-white/50"}`}
            />
          </button>
        ))}
        <CarouselButton label="Photo suivante" icon="chevronRight" onClick={() => go(current + 1)} />
      </div>
    </>
  );
}

function CarouselButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: "chevronLeft" | "chevronRight";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center bg-white/15 text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.7)] hover:bg-white/25"
    >
      <Icon name={icon} strokeWidth={2.2} />
    </button>
  );
}
