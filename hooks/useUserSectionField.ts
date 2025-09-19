// hooks/useUserSectionField.ts
"use client";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  doc, onSnapshot, setDoc, serverTimestamp
} from "firebase/firestore";

export function useUserSectionField(sectionId: string, fieldKey: string, localFallbackKey?: string) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load once (and subscribe) if logged in; else load from localStorage
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      // Clear any previous sub
      if (unsubDocRef.current) {
        unsubDocRef.current();
        unsubDocRef.current = null;
      }

      if (!user) {
        // Local fallback
        if (localFallbackKey) {
          try {
            const saved = localStorage.getItem(localFallbackKey);
            if (saved != null) setValue(saved);
          } catch {}
        }
        setLoading(false);
        return;
      }

      // Subscribe to user doc for this section
      const ref = doc(db, "user_progress", user.uid, "sections", sectionId);
      const unsub = onSnapshot(ref, (snap) => {
        const data = snap.data();
        if (data && data[fieldKey] != null) {
          setValue(String(data[fieldKey]));
        } else if (localFallbackKey) {
          // one-time seed from localStorage if Firestore empty
          try {
            const saved = localStorage.getItem(localFallbackKey);
            if (saved != null) setValue(saved);
          } catch {}
        }
        setLoading(false);
      }, () => setLoading(false));

      unsubDocRef.current = unsub;
    });

    return () => {
      unsubAuth();
      if (unsubDocRef.current) unsubDocRef.current();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId, fieldKey]);

  // Debounced write to Firestore when logged in
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      if (localFallbackKey) {
        try { localStorage.setItem(localFallbackKey, value); } catch {}
      }
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const ref = doc(db, "user_progress", user.uid, "sections", sectionId);
      await setDoc(ref, { [fieldKey]: value, updatedAt: serverTimestamp() }, { merge: true });
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, sectionId, fieldKey, localFallbackKey]);

  return { value, setValue, loading };
}

// keep a module-level ref to close onSnapshot when auth changes
const unsubDocRef: { current: null | (() => void) } = { current: null };
