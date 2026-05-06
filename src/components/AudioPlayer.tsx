"use client";

import { useState, useRef, useCallback, type HTMLAttributes } from "react";

export type AudioPlayerVariant = "inline" | "block";

export interface AudioPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  src: string;
  label: string;
  variant?: AudioPlayerVariant;
}

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export function AudioPlayer({ src, label, variant = "inline", style, ...rest }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }, [playing]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    setProgress(0);
  }, []);

  if (variant === "inline") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", ...style }} {...rest}>
        <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} preload="none" />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "var(--space-8)",
            height: "var(--space-8)",
            borderRadius: "var(--radius-full)",
            border: "var(--border-width-thin) solid var(--border-default)",
            background: "var(--bg-surface)",
            color: "var(--color-kaya-indigo)",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      </span>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-lg)",
        border: "var(--border-width-thin) solid var(--border-default)",
        background: "var(--bg-surface)",
        ...style,
      }}
      {...rest}
    >
      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--space-10)",
          height: "var(--space-10)",
          borderRadius: "var(--radius-full)",
          border: "none",
          background: "var(--color-kaya-indigo)",
          color: "#FFFFFF",
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
        }}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--fg-default)" }}>
          {label}
        </span>
        <div style={{
          height: "4px",
          borderRadius: "var(--radius-full)",
          background: "var(--border-default)",
          overflow: "hidden",
        }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--color-kaya-indigo)",
              borderRadius: "var(--radius-full)",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
