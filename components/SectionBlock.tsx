// components/SectionBlock.tsx
import { PropsWithChildren } from "react";

import FadeIn from "@/components/FadeIn";

export default function SectionBlock({ children }: PropsWithChildren) {
  return <FadeIn className="mb-20">{children}</FadeIn>;
}
