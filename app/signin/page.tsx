// app/signin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, googleProvider, db } from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import FadeIn from "@/components/FadeIn";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/course";

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function upsertUser(u: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }) {
    await setDoc(
      doc(db, "users", u.uid),
      {
        uid: u.uid,
        name: u.displayName || "",
        email: u.email || "",
        photoURL: u.photoURL || "",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  async function signInGoogle() {
    try {
      setLoadingGoogle(true);
      const res = await signInWithPopup(auth, googleProvider);
      await upsertUser(res.user);
      router.push(redirectTo);
    } catch (e: any) {
      console.error(e);
      if (e?.code === "auth/operation-not-allowed") {
        alert(
          "Google sign-in is disabled in Firebase. Enable it in Authentication ▸ Sign-in method."
        );
      } else {
        alert("Sign-in with Google failed. Please try again.");
      }
    } finally {
      setLoadingGoogle(false);
    }
  }

  async function continueWithEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");
    if (password.length < 6)
      return alert("Password must be at least 6 characters.");

    try {
      setLoadingEmail(true);
      // Try sign in first
      const res = await signInWithEmailAndPassword(auth, email, password);
      await upsertUser(res.user);
      router.push(redirectTo);
    } catch (err: any) {
      // If the user doesn't exist, create an account and sign them in
      if (err?.code === "auth/user-not-found") {
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await upsertUser(res.user);
          router.push(redirectTo);
          return;
        } catch (createErr: any) {
          console.error(createErr);
          if (createErr?.code === "auth/operation-not-allowed") {
            alert(
              "Email/Password sign-in is disabled in Firebase. Enable it in Authentication ▸ Sign-in method."
            );
          } else if (createErr?.code === "auth/email-already-in-use") {
            alert("This email is already in use. Try signing in instead.");
          } else {
            alert("Could not create your account. Please try again.");
          }
        }
      } else if (err?.code === "auth/operation-not-allowed") {
        alert(
          "Email/Password sign-in is disabled in Firebase. Enable it in Authentication ▸ Sign-in method."
        );
      } else if (err?.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        console.error(err);
        alert("Sign-in failed. Please try again.");
      }
    } finally {
      setLoadingEmail(false);
    }
  }

  return (
    <main className="min-h-[70vh] grid place-items-center p-6">
      <FadeIn>
        <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm space-y-6">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold">Sign in / up</h1>
            <p className="text-sm opacity-80">
              Save your progress so you can pick up where you left off.
            </p>
          </header>

          {/* Google */}
          <button
            onClick={signInGoogle}
            disabled={loadingGoogle}
            className="w-full rounded-xl border px-4 py-3 text-sm font-medium hover:shadow disabled:opacity-60"
          >
            {loadingGoogle ? "Signing in…" : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase tracking-wider opacity-60">
              or
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Email form */}
          <form onSubmit={continueWithEmail} className="space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border px-3 py-2"
                required
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border px-3 py-2"
                required
                minLength={6}
              />
            </label>

            {/* Reset password link */}
            <div className="text-right">
              <Link
                href="/reset-password"
                className="text-sm underline underline-offset-2"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loadingEmail}
              className="w-full rounded-xl border px-4 py-3 text-sm font-medium hover:shadow disabled:opacity-60"
            >
              {loadingEmail ? "Continuing…" : "Continue with email"}
            </button>
          </form>

          {/* Skip account */}
          <button
            onClick={() => router.push(redirectTo)}
            className="block w-full text-center text-sm underline underline-offset-2"
          >
            Continue without signing up
          </button>
        </div>
      </FadeIn>
    </main>
  );
}
