// app/reset-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import FadeIn from "@/components/FadeIn";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "If this email is registered, a password reset link has been sent."
      );
    } catch (err: any) {
      console.error(err);
      if (err?.code === "auth/invalid-email") {
        setMessage("That email address looks invalid.");
      } else if (err?.code === "auth/user-not-found") {
        setMessage("No account found with that email.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] grid place-items-center p-6">
      <FadeIn>
        <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm space-y-6">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold">Reset password</h1>
            <p className="text-sm opacity-80">
              Enter your email and we’ll send you a link to reset your password.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl border px-4 py-3 text-sm font-medium hover:shadow disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>

          {message && (
            <p className="text-sm text-center opacity-80">{message}</p>
          )}

          <button
            onClick={() => router.push("/signin")}
            className="block w-full text-center text-sm underline underline-offset-2"
          >
            Back to sign in
          </button>
        </div>
      </FadeIn>
    </main>
  );
}
