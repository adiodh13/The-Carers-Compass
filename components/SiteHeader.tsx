import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-text/15 bg-white/85 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-[20px] font-bold text-brand-text">
          The Carer’s Compass
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[16px]">
          <a href="#benefits" className="hover:opacity-80">How this helps you</a>
          <a href="#faqs" className="hover:opacity-80">Your questions, answered</a>
          <a href="#contact" className="hover:opacity-80">Contact us</a>
        </nav>

        <Link
          href="/guide"
          className="rounded-pill bg-brand-teal px-4 py-2 text-white hover:opacity-90"
        >
          Start guide
        </Link>
      </div>
    </header>
  );
}
