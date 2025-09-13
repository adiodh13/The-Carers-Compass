// components/Collapse.tsx
"use client";

import { PropsWithChildren } from "react";

type Props = {
  title: string;
};

export default function Collapse({ title, children }: PropsWithChildren<Props>) {
  return (
    <details className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 open:shadow-md">
      <summary className="cursor-pointer select-none text-base font-semibold">
        {title}
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
