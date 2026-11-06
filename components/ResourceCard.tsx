// components/ResourceCard.tsx
"use client";

import Link from "next/link";

type Props = {
  name: string;
  desc: string;
  href: string;
};

export default function ResourceCard({ name, desc, href }: Props) {
  return (
    <div className="border-t border-line pt-4">
      <h4 className="display text-[1.4rem] leading-tight">{name}</h4>
      <p className="mt-1 text-[1.1rem] leading-relaxed text-ink-soft">{desc}</p>
      <Link
        href={href}
        className="text-link mt-2 inline-block text-[1.1rem]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit site →
      </Link>
    </div>
  );
}
