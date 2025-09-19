// components/FBSelect.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";

type Option = { value: string; label: string };

export default function FBSelect({
  sectionId,
  fieldKey,
  label,
  options,
  navy,
  ariaLabel,
}: {
  sectionId: string;
  fieldKey: string;       // e.g. "poa", "advance"
  label: string;
  options: Option[];      // e.g. [{value:"Yes",label:"Yes"}, ...]
  navy: string;
  ariaLabel?: string;
}) {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const localKey = `local:${sectionId}:${fieldKey}`;
  const unsubDocRef = useRef<null | (() => void)>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [value, sectionId, fieldKey, localKey]);

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <label className="mr-4 text-sm font-semibold" style={{ color: navy }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-lg bg-[#f7f8fb] px-3 py-2 text-sm outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
        style={{ color: navy, opacity: loading ? 0.6 : 1 }}
        aria-label={ariaLabel || label}
      >
        <option value="">— Select —</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
