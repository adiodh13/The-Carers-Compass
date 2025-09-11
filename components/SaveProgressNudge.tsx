"use client";
import { useCurrentUser } from "@/components/auth";
import { useRouter, usePathname } from "next/navigation";

export default function SaveProgressNudge() {
  const { user, ready } = useCurrentUser();
  const router = useRouter();
  const path = usePathname();

  if (!ready || user) return null;

  return (
    <div className="mt-8 rounded-2xl border p-4 shadow-sm">
      <h3 className="font-semibold">Save your progress</h3>
      <p className="text-sm opacity-80 mt-1">
        Create a free account so you can pick up where you left off.
      </p>
      <button
        onClick={() => router.push(`/(auth)/signin?redirect=${encodeURIComponent(path)}`)}
        className="mt-3 rounded-lg border px-4 py-2 text-sm hover:shadow"
      >
        Sign in / up
      </button>
    </div>
  );
}
