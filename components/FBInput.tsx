// components/FBInput.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";

export default function FBInput({
  sectionId,
  fieldKey,
  label,
  placeholder,
  navy,
  ariaLabel,
}: {
  sectionId: string;
  fieldKey: string;   // e.g. "weeklyDay" or "weeklyTime"
  label: string;
  placeholder?: string;
  navy: string;
  ariaLabel?: string;
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const localKey = `local:${sectionId}:${fieldKey}`;

  // Subscribe to Firestore (if logged in). Fallback to localStorage when logged out.
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (unsubDocRef.current) { unsubDocRef.current(); unsubDocRef.current = null; }

      if (!user) {
        try { const saved = localStorage.getItem(localKey); if (saved != null) setValue(saved); } catch {}
        setLoading(false);
        return;
      }

      const ref = doc(db, "user_progress", user.uid, "sections", sectionId);
      const unsub = onSnapshot(ref, (snap) => {
        const data = snap.data();
        if (data && data[fieldKey] != null) setValue(String(data[fieldKey]));
        else {
          try { const saved = localStorage.getItem(localKey); if (saved != null) setValue(saved); } catch {}
        }
        setLoading(false);
      }, () => setLoading(false));

      unsubDocRef.current = unsub;
    });

    return () => {
      unsubAuth();
      if (unsubDocRef.current) unsubDocRef.current();
    };
  }, [sectionId, fieldKey, localKey]);

  // Debounced write (Firestore when logged in, else localStorage)
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      try { localStorage.setItem(localKey, value); } catch {}
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const ref = doc(db, "user_progress", user.uid, "sections", sectionId);
      await setDoc(ref, { [fieldKey]: value, updatedAt: serverTimestamp() }, { merge: true });
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [value, sectionId, fieldKey, localKey]);

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold" style={{ color: navy }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
        style={{ color: navy, opacity: loading ? 0.6 : 1 }}
        aria-label={ariaLabel || label}
      />
      <div className="mt-1 text-xs opacity-60" style={{ color: navy }}>
        {loading ? "syncing…" : "saved"}
      </div>
    </div>
  );
}

// shared ref to clean up snapshot when auth switches
const unsubDocRef: { current: null | (() => void) } = { current: null };
