"use client";
export default function GlobalError({ error }: { error: Error }) {
  console.error(error);
  return (
    <main className="min-h-[60vh] grid place-items-center p-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="opacity-80">Please refresh or try again.</p>
      </div>
    </main>
  );
}
