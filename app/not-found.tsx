export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="opacity-80">Let’s take you back to the guide.</p>
        <a href="/course" className="inline-block rounded-full border px-5 py-2 mt-2">Go to course</a>
      </div>
    </main>
  );
}
