// src/lib/progress.ts
// How far someone has read, kept only in this browser's localStorage. Nothing is sent
// anywhere, there is no account, and it is specific to this device.
"use client";

import { useSyncExternalStore } from "react";

/** Furthest point reached per stop slug, from 0 to 1. */
export type Progress = Record<string, number>;

const KEY = "carers-compass:progress";
const EMPTY: Progress = {};

let cache: Progress | null = null;
const listeners = new Set<() => void>();

function read(): Progress {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    cache = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    cache = {};
  }
  return cache as Progress;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY && e.key !== null) return; // another tab changed it
    cache = null;
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

/** Records how far someone got. Only ever moves forward. */
export function recordProgress(slug: string, fraction: number) {
  const current = read();
  const value = fraction >= 0.97 ? 1 : Math.round(fraction * 50) / 50;
  if (value <= (current[slug] ?? 0)) return;
  cache = { ...current, [slug]: value };
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {}
  emit();
}

/** Forgets everything this site kept in the browser, including older ticked milestones. */
export function clearProgress() {
  cache = {};
  try {
    localStorage.removeItem(KEY);
    Object.keys(localStorage)
      .filter((key) => key.endsWith(":milestones"))
      .forEach((key) => localStorage.removeItem(key));
  } catch {}
  emit();
}
