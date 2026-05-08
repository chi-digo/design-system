"use client";

import { useEffect, useRef } from "react";

export interface ConfettiProps {
  fire: boolean;
  duration?: number;
  particleCount?: number;
}

const COLORS = [
  "#C9A84C", // mnazi gold
  "#E87040", // kanga orange
  "#3D8B5F", // mangrove green
  "#3B4F8A", // kaya indigo
];

export function Confetti({
  fire,
  duration = 3000,
  particleCount = 100,
}: ConfettiProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (!fire || hasFired.current) return;
    hasFired.current = true;

    let cancelled = false;

    import("canvas-confetti").then((mod) => {
      if (cancelled) return;
      const confetti = mod.default;
      const end = Date.now() + duration;

      function frame() {
        if (cancelled || Date.now() > end) return;
        confetti({
          particleCount: Math.floor(particleCount / 10),
          angle: 60 + Math.random() * 60,
          spread: 55,
          origin: { x: Math.random(), y: Math.random() * 0.4 },
          colors: COLORS,
        });
        requestAnimationFrame(frame);
      }

      frame();
    });

    return () => {
      cancelled = true;
    };
  }, [fire, duration, particleCount]);

  useEffect(() => {
    if (!fire) {
      hasFired.current = false;
    }
  }, [fire]);

  return null;
}
