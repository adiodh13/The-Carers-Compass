// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full overflow-x-clip">
      <div className="mx-auto w-full max-w-[900px] px-4 sm:px-6">
        {/* Allow wrapping on small screens to prevent overflow */}
        <div className="flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-2 py-3">
          {/* Title + Tagline */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="min-w-0 text-[22px] md:text-[24px] font-semibold text-[#2e3159]"
            >
              The Carer’s Compass
            </Link>
            <span className="text-[13px] md:text-[14px] text-gray-600">
              Made by Carers, for Carers
            </span>
          </div>

          {/* Actions */}
          <div className="min-w-0 w-full md:w-auto mt-2 md:mt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Link
              href="/note-from-the-creator"
              className="inline-flex items-center justify-center rounded-full px-5 py-2 text-[15px] md:text-[12px] font-semibold text-white bg-[#318484] hover:bg-[#3b9492] transition-colors w-full sm:w-auto text-center"
            >
              A Note from the Creator
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
