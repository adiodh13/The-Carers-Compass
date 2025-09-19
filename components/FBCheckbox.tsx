// components/FBCheckbox.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

export default function FBCheckbox({
  sectionId,         // e.g. "section-1"
  fieldKey,          // e.g. "calmingTried"
  label,             // visible label text
  navy = "#2e3159",
  teal = "#318484",
  ariaLabel,         // optional
}: {
  sectionId: string;
  fieldKey: string;
  label: string;
  navy?: string;
  teal?: string;
  ariaLabel?: string;
}) {
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const localKey = `local:${sectionId}:${fieldKey}`;
  const unsubDocRef = useRef<null | (() => void)>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Subscribe to Firestore (or load localStorage when logged out)
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      // clean previous doc subscription
      if (unsubDocRef.current) { unsubDocRef.current(); unsubDocRef.current = null; }

      if (!user) {
        // load from localStorage only
        try {
          const saved = localStorage.getItem(localKey);
          if (saved != null) setChecked(saved === "true");
        } catch {}
        setLoading(false);
        return;
      }

      // subscribe to the user's section doc
      const ref = doc(db, "user_progress", user.uid, "sections", sectionId);
      const unsub = onSnapshot(
        ref,
        (snap) => {
          const data = snap.data();
          if (data && typeof data[fieldKey] === "boolean") {
            setChecked(Boolean(data[fieldKey]));
          } else {
            // if Firestore has no value yet, fall back to local
            try {
              const saved = localStorage.getItem(localKey);
              if (saved != null) setChecked(saved === "true");
            } catch {}
          }
          setLoading(false);
        },
        () => setLoading(false)
      );
      unsubDocRef.current = unsub;
    });

    return () => {
      unsubAuth();
      if (unsubDocRef.current) unsubDocRef.current();
    };
  }, [sectionId, fieldKey, localKey]);

  // Persist changes (debounced). Firestore when signed in, localStorage otherwise.
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      try { localStorage.setItem(localKey, String(checked)); } catch {}
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const ref = doc(db, "user_progress", user.uid, "sections", sectionId);
      await setDoc(ref, { [fieldKey]: checked, updatedAt: serverTimestamp() }, { merge: true });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [checked, sectionId, fieldKey, localKey]);

  return (
    <label className="mt-4 flex cursor-pointer select-none items-center gap-3">
      <input
        type="checkbox"
        className="h-5 w-5 appearance-none rounded-md border border-[rgba(46,49,89,0.2)] outline-none transition checked:animate-checkpop checked:border-transparent"
        style={{
          backgroundColor: checked ? teal : "white",
          boxShadow: checked ? "inset 0 0 0 2px white" : "none",
          opacity: loading ? 0.7 : 1,
        }}
        aria-label={ariaLabel || label}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span className="text-[15px]" style={{ color: navy }}>{label}</span>
    </label>
  );
}
