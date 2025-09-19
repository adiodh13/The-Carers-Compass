// app/signin/page.tsx
import { Suspense } from "react";
import SignInInner from "./SignInInner";

// Auth pages are dynamic; this avoids prerender quirks.
export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <Suspense fallback={<div />}>
      <SignInInner />
    </Suspense>
  );
}
