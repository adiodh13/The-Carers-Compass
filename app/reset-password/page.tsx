"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email);
    setSent(true);
  }

  return (
    <main className="min-h-[60vh] grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm space-y-4">
        <h1 className="text-2xl font-semibold">Reset your password</h1>
        {sent ? (
          <p className="text-sm opacity-80">If that email exists, we’ve sent a reset link.</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full rounded-xl border px-3 py-2" required
              />
            </label>
            <button className="w-full rounded-xl border px-4 py-3 text-sm font-medium hover:shadow">
              Send reset link
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
