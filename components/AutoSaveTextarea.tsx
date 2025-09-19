// components/AutoSaveTextarea.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { FirebaseError } from "firebase/app";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Props = {
  docPath: string;         // e.g. user_progress/<uid>/sections/section-2
  field: string;           // e.g. "contacts"
  label: string;
  placeholder?: string;
  rows?: number;
};

type SaveState = "idle" | "saving" | "saved" | "error";

// Helpers
function isOffline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}

function isNetworkError(err: unknown): boolean {
  const fe = err as Partial<FirebaseError> | undefined;
  const code = typeof fe?.code === "string" ? fe!.code : "";
  const msg = typeof fe?.message === "string" ? fe!.message : "";

  // Common network-ish cases
  if (isOffline()) return true;
  if (code === "unavailable" || code === "deadline-exceeded") return true;
  if (/network|failed\-precondition/i.test(msg)) return true;

  return false;
}

function humanizeLoadError(err: unknown): string {
  if (isNetworkError(err)) return "Couldn’t load — check your connection.";
  const fe = err as Partial<FirebaseError> | undefined;
  if (fe?.code === "permission-denied") return "You don’t have permission to view this.";
  return "Failed to load";
}

function humanizeSaveError(err: unknown): string {
  if (isNetworkError(err)) return "Couldn’t save — check your connection.";
  const fe = err as Partial<FirebaseError> | undefined;
  if (fe?.code === "permission-denied") return "You don’t have permission to save.";
  return "Failed to save";
}

export default function AutoSaveTextarea({
  docPath,
  field,
  label,
  placeholder,
  rows = 6,
}: Props) {
  const [value, setValue] = useState("");
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load once on mount (or when docPath/field changes via key at call site)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, docPath));
        const data = snap.exists() ? snap.data() : undefined;
        const initial = typeof data?.[field] === "string" ? (data![field] as string) : "";
        if (!cancelled) {
          setValue(initial);
          setDirty(false);
          setStatus("idle"); // don’t show "Saved" on initial load
          setErrorMsg(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setErrorMsg(humanizeLoadError(err));
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [docPath, field]);

  // Clear error automatically when the browser regains connectivity
  useEffect(() => {
    const onOnline = () => {
      // clear error banner; do not auto-save to avoid surprises
      setErrorMsg(null);
      if (status === "error") setStatus("idle");
    };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [status]);

  const save = useCallback(async () => {
    // Only attempt a save if there are changes to persist
    if (!dirty || status === "saving") return;

    setStatus("saving");
    setErrorMsg(null);
    try {
      await setDoc(
        doc(db, docPath),
        { [field]: value, updatedAt: Date.now() },
        { merge: true }
      );
      setDirty(false);
      setStatus("saved");
    } catch (err: unknown) {
      // IMPORTANT: stop spinner and show a friendly, actionable message
      setStatus("error");           // stops "Saving…" state
      setErrorMsg(humanizeSaveError(err));
      // keep `dirty` as true so the Save button stays enabled for retry
    }
  }, [dirty, field, value, docPath, status]);

  // Save on blur if there are unsaved edits
  const onBlur = async () => {
    if (dirty) {
      await save();
    }
  };

  // Typing: mark dirty and ensure "Saved" is hidden immediately
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setDirty(true);
    if (status === "saved" || status === "error") setStatus("idle");
    if (errorMsg) setErrorMsg(null);
  };

  // Keyboard: Cmd/Ctrl+S to save
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      void save();
    }
  };

  const showSaved = status === "saved" && !dirty;
  const showSaving = status === "saving";
  const showError = status === "error";

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium" style={{ color: NAVY }}>
        {label}
      </label>

      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border px-3 py-2 text-[15px] leading-relaxed outline-none"
        style={{
          backgroundColor: "white",
          borderColor: "rgba(46,49,89,0.2)",
          color: NAVY,
          boxShadow: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 3px ${TEAL}33`;
          e.currentTarget.style.borderColor = TEAL;
        }}
        onBlurCapture={(e) => {
          // remove focus ring visual on blur (separate from save)
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "rgba(46,49,89,0.2)";
        }}
        aria-label={label}
        aria-invalid={showError ? true : undefined}
      />

      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => void save()}
          disabled={!dirty || showSaving}
          className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95 active:translate-y-[1px] disabled:opacity-60"
          style={{ backgroundColor: TEAL }}
          aria-disabled={!dirty || showSaving}
        >
          {showSaving ? "Saving…" : dirty ? "Save" : "Saved"}
        </button>

        {/* Status text: never show "Saved" while editing */}
        {showSaved && (
          <span className="text-sm" style={{ color: NAVY }} aria-live="polite">
            Saved
          </span>
        )}
        {showError && (
          <span className="text-sm text-red-600" role="alert" aria-live="assertive">
            {errorMsg ?? "Failed to save"}
            {isOffline() && (
              <span className="ml-2 opacity-80">(You appear to be offline)</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
