// components/ResourceCard.tsx
"use client";

import Link from "next/link";

type Props = {
  name: string;
  desc: string;
  href: string;
  navy: string;
  teal: string;
};

export default function ResourceCard({ name, desc, href, navy, teal }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <h4 className="text-[16px] font-semibold" style={{ color: navy }}>
        {name}
      </h4>
      <p className="mt-1 text-sm opacity-90" style={{ color: navy }}>
        {desc}
      </p>
      <Link
        href={href}
        className="mt-3 inline-block underline underline-offset-4 transition hover:opacity-90"
        style={{ color: teal }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit site →
      </Link>
    </div>
  );
}
