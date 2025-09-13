// components/TextareaWithCount.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  id: string;
  label: string;
  storageKey: string;
  placeholder?: string;
  navy: string;
  maxChars?: number; // only for UI reassurance; not enforced strictly
};

export default function TextareaWithCount({
  id,
  label,
  storageKey,
  placeholder,
  navy,
  maxChars = 2000,
}: Props) {
  const [val, setVal] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) setVal(saved);
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, val);
    } catch {}
  }, [storageKey, val]);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold" style={{ color: navy }}>
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
          style={{ color: navy, lineHeight: 1.6 }}
          rows={4}
        />
        <div className="pointer-events-none absolute bottom-2 right-3 text-xs opacity-60" style={{ color: navy }}>
          {val.length}/{maxChars}
        </div>
      </div>
    </div>
  );
}
