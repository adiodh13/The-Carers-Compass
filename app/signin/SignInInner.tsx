// app/signin/SignInInner.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/components/useAuth";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Mode = "signin" | "signup";

// --- New: UI-friendly error shape ---
type UIAuthError = { code?: string; msg: string };

export default function SignInInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const redirectTo = useMemo(
    () => sp.get("redirectTo") || "/course/section-1",
    [sp]
  );

  const { user, loading } = useAuth();

  // If already signed in, bounce to target
  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectTo);
    }
  }, [user, loading, redirectTo, router]);

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  // --- Changed: hold structured error instead of string ---
  const [err, setErr] = useState<UIAuthError | null>(null);

  const clickingRef = useRef(false); // prevent duplicate Google popups

  const isMobileSafari = () =>
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Mobile|iPhone|iPad|iPod/.test(navigator.userAgent);

  const onGoogle = async () => {
    if (busy || clickingRef.current) return;
    setErr(null);
    setBusy(true);
    clickingRef.current = true;
    try {
      if (isMobileSafari()) {
        await signInWithRedirect(auth, googleProvider);
        return; // redirect flow continues after provider returns to app
      }
      await signInWithPopup(auth, googleProvider);
      router.push(redirectTo);
    } catch (e: unknown) {
      // ignore benign popup race/close errors
      const code =
        typeof e === "object" && e && "code" in e && typeof (e as any).code === "string"
          ? (e as any).code
          : "";
      if (
        code !== "auth/cancelled-popup-request" &&
        code !== "auth/popup-closed-by-user"
      ) {
        setErr(prettyAuthError(e, "signin"));
      }
    } finally {
      clickingRef.current = false;
      setBusy(false);
    }
  };

  const onEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email.trim(), pw);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), pw);
      }
      router.push(redirectTo);
    } catch (e: unknown) {
      setErr(prettyAuthError(e, mode));
    } finally {
      setBusy(false);
    }
  };

  const onForgot = async () => {
    if (!email) {
      setErr({ msg: "Enter your email first, then click ‘Forgot password?’" });
      return;
    }
    setErr(null);
    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setErr({
        code: "ok-reset",
        msg: "Reset link sent. Check your inbox (and Spam/Promotions).",
      });
    } catch (e: unknown) {
      setErr(prettyAuthError(e, "signin"));
    } finally {
      setBusy(false);
    }
  };

  // While auth state loads, show a small placeholder
  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <SkeletonCard />
      </div>
    );
  }

  // If already signed in, we’re already redirecting; show nothing
  if (user) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold" style={{ color: NAVY }}>
            {mode === "signin" ? "Sign in" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            You’ll be returned to Section 1.
          </p>
        </header>

        {/* Google */}
        <button
          type="button"
          onClick={onGoogle}
          disabled={busy}
          className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-60"
          style={{ color: NAVY }}
        >
          <GoogleIcon />
          {busy ? "Working…" : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs uppercase tracking-wide text-gray-500">
              or
            </span>
          </div>
        </div>

        {/* Email / password */}
        <form onSubmit={onEmailSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: NAVY }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#318484]"
              style={{ color: NAVY }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: NAVY }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                minLength={6}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-base placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#318484]"
                style={{ color: NAVY }}
                placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-sm text-gray-600 hover:bg-gray-100"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* --- New: styled, friendly notice --- */}
          {err && (
            <div
              role="alert"
              aria-live="polite"
              className={
                "mt-2 rounded-lg border px-3 py-2 text-sm " +
                (err.code === "ok-reset"
                  ? "border-teal-200 bg-teal-50 text-teal-800"
                  : "border-red-200 bg-red-50 text-red-800")
              }
            >
              <span className="font-medium">
                {err.code === "ok-reset" ? "Email sent." : "We couldn’t sign you in."}
              </span>{" "}
              {err.msg}
              {(!err.code ||
                err.code === "auth/invalid-credential" ||
                err.code === "auth/user-not-found") && (
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="ml-2 underline underline-offset-4"
                  style={{ color: err.code === "ok-reset" ? TEAL : NAVY }}
                >
                  Create an account
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-[#318484] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-60"
          >
            {busy
              ? "Working…"
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-sm font-medium underline underline-offset-4"
              style={{ color: NAVY }}
            >
              {mode === "signin"
                ? "No account? Create one"
                : "Have an account? Sign in"}
            </button>

            <button
              type="button"
              onClick={onForgot}
              className="text-sm underline underline-offset-4"
              style={{ color: NAVY }}
            >
              Forgot password?
            </button>
          </div>

          {/* Warning about spam/promotions */}
          <p className="text-xs text-gray-500 mt-1">
            If you request a reset link, please also check your Spam or Promotions folder.
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 533.5 544.3"
      className="inline-block"
    >
      <path
        fill="#ea4335"
        d="M533.5 278.4c0-18.6-1.5-37-4.7-54.8H272.1v103.8h146.9c-6.3 34-25.3 62.7-54 82v68.2h87.4c51.1-47 80.1-116.2 80.1-199.2z"
      />
      <path
        fill="#34a853"
        d="M272.1 544.3c72.9 0 134.2-24.1 178.9-65.6l-87.4-68.2c-24.3 16.3-55.3 26.1-91.5 26.1-70.3 0-129.9-47.5-151.3-111.3H31.6v69.9c44.4 88 135.9 148.9 240.5 148.9z"
      />
      <path
        fill="#4a90e2"
        d="M120.8 325.2c-10.2-30.3-10.2-63 0-93.3V162H31.6c-43.2 86.5-43.2 189.7 0 276.2l89.2-69z"
      />
      <path
        fill="#fbbc05"
        d="M272.1 106.2c39.6-.6 77.7 14.2 106.7 41.4l79.8-79.8C407.9 24.8 343 0 272.1 0 167.5 0 76 60.9 31.6 148.9l89.2 69c21.5-63.7 81-111.3 151.3-111.7z"
      />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
      <div className="mt-5 h-10 w-full animate-pulse rounded bg-gray-200" />
      <div className="mt-3 h-10 w-full animate-pulse rounded bg-gray-200" />
      <div className="mt-6 h-10 w-full animate-pulse rounded bg-gray-200" />
    </div>
  );
}

// --- New: map Firebase errors → friendly copy + styling ---
function prettyAuthError(err: unknown, mode: "signin" | "signup"): UIAuthError {
  let code = "";
  let raw = "";

  if (err && typeof err === "object") {
    const e = err as any;
    code = typeof e.code === "string" ? e.code : "";
    raw = typeof e.message === "string" ? e.message : "";
  } else if (typeof err === "string") {
    raw = err;
  }

  // Strip Firebase boilerplate if present
  const cleaned =
    (raw || "")
      .replace(/^Firebase:\s*/i, "")
      .replace(/\s*\(auth\/[^\)]+\)\s*$/i, "") || "Something went wrong";

  // Friendly overrides for common cases
  if (mode === "signin" && (code === "auth/invalid-credential" || code === "auth/user-not-found")) {
    return { code, msg: "That email and password don’t match our records." };
  }
  if (code === "auth/invalid-email") {
    return { code, msg: "Please enter a valid email address." };
  }
  if (code === "auth/too-many-requests") {
    return { code, msg: "Too many attempts. Please wait a minute and try again." };
  }

  return { code, msg: cleaned };
}
