// app/course/finish/page.tsx
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const NAVY = "#2e3159";
const TEAL = "#318484";

type Confidence = "much_more" | "a_little_more" | "no_change";

export default function FinishPage() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // form state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState("");
  const [helpedMost, setHelpedMost] = useState("");
  const [couldBeBetter, setCouldBeBetter] = useState("");
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [confidenceText, setConfidenceText] = useState("");
  const [otherFeedback, setOtherFeedback] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");

  // 1) Check auth + check user's "feedbackSubmitted" flag
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      setSignedIn(!!user);
      if (!user) {
        setHasSubmitted(false);
        setLoading(false);
        return;
      }
      try {
        // user_progress/{uid}/flags/flags.feedbackSubmitted
        const flagsRef = doc(db, "user_progress", user.uid, "flags", "flags");
        const snap = await getDoc(flagsRef);
        setHasSubmitted(Boolean(snap.data()?.feedbackSubmitted));
      } catch {
        setHasSubmitted(false);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const user = auth.currentUser;
    if (!user) {
      setError("Please sign in to submit feedback.");
      return;
    }
    if (submitting) return;

    // minimal client validation
    if (rating < 1 || rating > 5) {
      setError("Please select a star rating (1–5).");
      return;
    }

    const emailTrimmed = subscribeEmail.trim();
    if (subscribe && !emailTrimmed) {
      setError("Please add your email or untick the updates checkbox.");
      return;
    }

    setSubmitting(true);
    try {
      // 2) POST the payload to our server API — this writes to feedback_submissions
      const res = await fetch("/api/submitFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email ?? null,
          rating,
          ratingComment,
          helpedMost,
          couldBeBetter,
          confidence,
          confidenceText,
          otherFeedback,
          subscribe,
          subscribeEmail: subscribe ? emailTrimmed : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit feedback.");
      }

      // 3) Mark user's flag so they never see the form again
      const flagsRef = doc(db, "user_progress", user.uid, "flags", "flags");
      await setDoc(
        flagsRef,
        { feedbackSubmitted: true, updatedAt: serverTimestamp() },
        { merge: true }
      );

      // 4) Flip local UI state
      setHasSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // --- UI ---

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "rgba(236,245,243,0.5)" }}>
        <main className="mx-auto max-w-3xl px-6 py-12 md:px-8" style={{ color: NAVY }}>
          Loading…
        </main>
      </div>
    );
  }

  // If not signed in, ask them to sign in first (we can’t tie feedback to a user otherwise)
  if (!signedIn) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "rgba(236,245,243,0.5)" }}>
        <main className="mx-auto max-w-3xl px-6 py-12 md:px-8">
          <h1 className="text-3xl font-semibold md:text-4xl" style={{ color: NAVY }}>
            Help Us Make The Carer’s Compass Even Better
          </h1>
          <p className="mt-4 max-w-[650px]" style={{ color: NAVY }}>
            Please sign in to share optional feedback. Once submitted, you’ll see a thank-you screen instead of this form.
          </p>
        </main>
      </div>
    );
  }

  // If already submitted → permanent "Thank you" view
  if (hasSubmitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "rgba(236,245,243,0.5)" }}>
        <main className="mx-auto max-w-3xl px-6 py-12 md:px-8">
          <h1 className="text-3xl font-semibold md:text-4xl" style={{ color: NAVY }}>
            Help Us Make The Carer’s Compass Even Better
          </h1>
          <p className="mt-4 max-w-[650px]" style={{ color: NAVY }}>
            You’ve reached the end of the guide — thank you for walking through it.
          </p>
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="leading-relaxed" style={{ color: NAVY }}>
              <em>
                “Every carer’s voice helps shape this guide. Thank you for sharing yours — it will
                make a difference for the next person who walks this path.”
              </em>
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Otherwise show the form
  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgba(236,245,243,0.5)" }}>
      <main className="mx-auto w-full max-w-3xl px-6 py-10 md:px-8">
        <h1 className="text-3xl font-semibold md:text-4xl" style={{ color: NAVY }}>
          Help Us Make The Carer’s Compass Even Better
        </h1>
        <p className="mt-4 max-w-[650px] leading-relaxed" style={{ color: NAVY }}>
          Thank you for walking through this guide.
          If you’d like, you can share a few thoughts about your experience. This is completely optional and
          only takes a couple of minutes. Your feedback will help us improve the guide for future carers.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Quick Check-In */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold" style={{ color: NAVY }}>
              Quick Check-In
            </h2>
            <label className="block text-sm font-semibold" style={{ color: NAVY }}>
              How helpful did you find the guide overall?
            </label>
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n>1?"s":""}`}
                  className="rounded-full p-2 text-2xl transition"
                  style={{ color: n <= rating ? TEAL : "rgba(46,49,89,0.3)" }}
                >
                  ⭐️
                </button>
              ))}
              <span className="ml-2 text-sm" style={{ color: NAVY }}>
                {rating ? `${rating}/5` : "Select 1–5"}
              </span>
            </div>
            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="Optional comment"
              className="w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
              style={{ color: NAVY, lineHeight: 1.6 }}
              rows={3}
            />
          </section>

          {/* What Helped Most */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold" style={{ color: NAVY }}>What Helped Most</h2>
            <input
              type="text"
              value={helpedMost}
              onChange={(e) => setHelpedMost(e.target.value)}
              placeholder="Was there one section or exercise that stood out as especially helpful?"
              className="w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
              style={{ color: NAVY }}
            />
          </section>

          {/* What Could Be Better */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold" style={{ color: NAVY }}>What Could Be Better</h2>
            <textarea
              value={couldBeBetter}
              onChange={(e) => setCouldBeBetter(e.target.value)}
              placeholder="Is there anything you felt was missing, unclear, or less useful?"
              className="w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
              style={{ color: NAVY, lineHeight: 1.6 }}
              rows={4}
            />
          </section>

          {/* Looking Ahead */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold" style={{ color: NAVY }}>Looking Ahead</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { key: "much_more", label: "Much more confident" },
                { key: "a_little_more", label: "A little more confident" },
                { key: "no_change", label: "No change" },
              ].map(opt => (
                <label key={opt.key} className="flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-black/10">
                  <input
                    type="radio"
                    name="confidence"
                    value={opt.key}
                    checked={confidence === (opt.key as Confidence)}
                    onChange={() => setConfidence(opt.key as Confidence)}
                  />
                  <span style={{ color: NAVY }}>{opt.label}</span>
                </label>
              ))}
            </div>
            <textarea
              value={confidenceText}
              onChange={(e) => setConfidenceText(e.target.value)}
              placeholder='Optional: “What shifted for you?”'
              className="w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
              style={{ color: NAVY, lineHeight: 1.6 }}
              rows={3}
            />
          </section>

          {/* Final Thoughts */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold" style={{ color: NAVY }}>Final Thoughts</h2>
            <textarea
              value={otherFeedback}
              onChange={(e) => setOtherFeedback(e.target.value)}
              placeholder="Any other feedback or suggestions you’d like to share?"
              className="w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
              style={{ color: NAVY, lineHeight: 1.6 }}
              rows={4}
            />
          </section>

          {/* Subscribe */}
          <section>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
              />
              <span style={{ color: NAVY }}>
                I’d like to hear about future resources, Q&As, or community updates.
              </span>
            </label>
            {subscribe && (
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Email"
                className="mt-3 w-full rounded-xl bg-[#f7f8fb] p-4 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-black/20"
                style={{ color: NAVY }}
              />
            )}
          </section>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm" style={{ color: NAVY }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            aria-disabled={submitting}
            className="rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95 active:translate-y-[1px]"
            style={{ backgroundColor: TEAL, opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? "Sending…" : "Send feedback"}
          </button>
        </form>
      </main>
    </div>
  );
}
