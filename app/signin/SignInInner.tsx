"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/useAuth";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Mode = "signin" | "signup" | "reset";

export default function SignInInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const redirectTo = useMemo(
    () => sp.get("redirect") || "/course/section-1",
    [sp]
  );

  const { user, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // If already signed in, go to target once auth state is known
  useEffect(() => {
    if (!loading && user) router.replace(redirectTo);
  }, [loading, user, router, redirectTo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setInfo(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        router.replace(redirectTo);
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        router.replace(redirectTo);
      } else {
        await sendPasswordResetEmail(auth, email.trim());
        setInfo("Password reset email sent. Check your inbox.");
      }
    } catch (error: any) {
      setErr(error?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-[420px] p-6">
      <h1 className="text-[28px] font-semibold" style={{ color: NAVY }}>
        {mode === "signin" && "Sign in"}
        {mode === "signup" && "Create an account"}
        {mode === "reset" && "Reset your password"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>

        {mode !== "reset" && (
          <label className="block">
            <span className="text-sm">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border p-2"
            />
          </label>
        )}

        {err && <p className="text-sm text-red-600">{err}</p>}
        {info && <p className="text-sm text-green-700">{info}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md px-4 py-2 font-semibold text-white"
          style={{ backgroundColor: TEAL, opacity: busy ? 0.8 : 1 }}
        >
          {busy
            ? "Please wait…"
            : mode === "signin"
            ? "Sign in"
            : mode === "signup"
            ? "Create account"
            : "Send reset link"}
        </button>
      </form>

      <div className="mt-4 space-y-2 text-sm">
        {mode !== "signin" && (
          <button className="underline" onClick={() => setMode("signin")}>
            Back to sign in
          </button>
        )}
        {mode === "signin" && (
          <>
            <div>
              Don&apos;t have an account?{" "}
              <button
                className="underline"
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </div>
            <div>
              Forgot password?{" "}
              <button className="underline" onClick={() => setMode("reset")}>
                Reset it
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
