// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const redirect = pathname?.startsWith("/course") ? pathname : "/course";
  const signInUrl = `/signin?redirect=${encodeURIComponent(redirect)}`; // <-- FIXED

  return (
    <header className="mx-auto w-full max-w-[920px] px-4 md:px-6">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Row 1: desktop uses 3 columns; mobile uses a simple flex row */}
        <div className="flex h-16 items-center justify-between md:grid md:grid-cols-[auto_1fr_auto]">
          {/* LEFT — Title */}
          <Link
            href="/"
            className="text-[22px] md:text-[24px] font-semibold text-[#2e3159] whitespace-nowrap"
          >
            The Carer’s Compass
          </Link>

          {/* CENTER — Links */}
          <nav className="hidden md:block justify-self-center w-full">
            <ul className="mx-auto flex w-full max-w-[420px] items-center justify-between text-[#2e3159]">
              <li className="whitespace-nowrap">
                <Link href="/#how-this-helps-you" className="text-[12px] hover:opacity-80">
                  How this helps you
                </Link>
              </li>
              <li className="whitespace-nowrap">
                <Link href="/faq" className="text-[12px] hover:opacity-80">
                  Your questions, answered
                </Link>
              </li>
              <li className="whitespace-nowrap">
                <Link href="/contact" className="text-[12px] hover:opacity-80">
                  Contact us
                </Link>
              </li>
            </ul>
          </nav>

          {/* RIGHT — Sign in */}
          <div className="shrink-0 justify-self-end">
            <Link
              href={signInUrl}
              className="inline-flex items-center justify-center rounded-full px-5 md:px-6 py-2 text-[15px] md:text-[12px] font-semibold text-white bg-[#318484] hover:bg-[#3b9492] transition-colors whitespace-nowrap"
              aria-label="Sign in"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Row 2 (mobile links) */}
        <nav className="md:hidden">
          <ul className="flex items-center justify-center gap-6 py-2 text-[#2e3159]">
            <li><Link href="/#how-this-helps-you" className="text-[16px]">How this helps you</Link></li>
            <li><Link href="/faq" className="text-[16px]">Your questions, answered</Link></li>
            <li><Link href="/contact" className="text-[16px]">Contact us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
