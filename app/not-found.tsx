export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-6">
      <div className="text-center space-y-2">
        <h1 className="display text-[2.5rem]">Page not found</h1>
        <p className="text-ink-soft">Let’s take you back to the guide.</p>
        <a href="/course/section-1" className="text-link mt-3 inline-block">Go to course</a>
      </div>
    </main>
  );
}
