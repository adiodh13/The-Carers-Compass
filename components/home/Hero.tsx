// components/home/Hero.tsx
"use client";

import { useLayoutEffect } from "react";

import { takeOpeningRequest } from "@/src/lib/opening";

const SUBTITLE = "Made by Carers, for Carers".split(" ");

export default function Hero() {
  // The text replays by itself on mount; the sun needs restarting from its white screen
  useLayoutEffect(() => {
    if (!takeOpeningRequest()) return;
    document.querySelectorAll(".sun-glow, .sun-rays").forEach((el) => {
      el.getAnimations().forEach((animation) => {
        animation.cancel();
        animation.play();
      });
    });
  }, []);

  return (
    <section className="hero">
      <h1>
        <span className="hero-title">The Carer’s Compass</span>
        <span className="hero-sub" aria-label="Made by Carers, for Carers">
          {SUBTITLE.map((word, i) => (
            <span
              key={word + i}
              className="hero-word"
              aria-hidden
              style={{ "--i": i } as React.CSSProperties}
            >
              {i < SUBTITLE.length - 1 ? `${word} ` : word}
            </span>
          ))}
        </span>
      </h1>

      <a href="#about" className="hero-cue" aria-label="Scroll down to read more">
        Scroll
        <span className="hero-cue-line" aria-hidden />
      </a>
    </section>
  );
}
