// components/FBTextarea.tsx
"use client";
import { useUserSectionField } from "@/hooks/useUserSectionField";

export default function FBTextarea({
  sectionId,
  fieldKey,
  label,
  placeholder,
  navy,
}: {
  sectionId: string;
  fieldKey: string;
  label: string;
  placeholder?: string;
  navy: string;
}) {
  const localKey = `local:${sectionId}:${fieldKey}`; // fallback when logged out
  const { value, setValue, loading } = useUserSectionField(sectionId, fieldKey, localKey);

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold" style={{ color: navy }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
        style={{ color: navy, lineHeight: 1.6, opacity: loading ? 0.6 : 1 }}
        rows={4}
      />
      <div className="mt-1 text-xs opacity-60" style={{ color: navy }}>
        {value.length} chars {loading ? "• syncing…" : ""}
      </div>
    </div>
  );
}
