// components/auth.tsx
"use client";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createContext, useContext, useEffect, useState } from "react";

type AuthCtx = { user: User | null; loading: boolean };

const Ctx = createContext<AuthCtx>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      console.log("AUTH:", u ? `signed in (${u.uid})` : "signed out");
    });
  }, []);

  return <Ctx.Provider value={{ user, loading }}>{children}</Ctx.Provider>;
}

// Use this in components to read auth state
export function useAuth() {
  return useContext(Ctx);
}

// Optional: keep a sign-out button here for convenience
export function SignOutButton() {
  return (
    <button
      onClick={() => signOut(auth)}
      className="rounded-lg border px-3 py-2 text-sm hover:shadow"
    >
      Sign out
    </button>
  );
}
