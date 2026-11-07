// components/CopyChecklistButton.tsx
"use client";

import { useState } from "react";

/** Copies text to the clipboard, falling back to a hidden textarea on older browsers. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}

export function formatChecklist(title: string, items: string[]) {
  return [title, "", ...items.map((item) => `☐ ${item}`)].join("\n");
}

/**
 * Copies a checklist. Pass `items` directly, or `getItems` to read them when clicked
 * (e.g. from the page).
 */
export default function CopyChecklistButton({
  title,
  items,
  getItems,
  label = "Copy checklist",
}: {
  title: string;
  items?: string[];
  getItems?: () => string[];
  label?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const onClick = async () => {
    const list = getItems ? getItems() : items ?? [];
    const ok = await copyText(formatChecklist(title, list));
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-link print:hidden"
    >
      <span aria-live="polite">
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Couldn’t copy" : label}
      </span>
    </button>
  );
}
