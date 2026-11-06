// app/layout.tsx
import "./globals.css";
import { Instrument_Serif, Newsreader } from "next/font/google";
import SkipNav from "@/components/SkipNav";
import SunBackdrop from "@/components/SunBackdrop";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata = {
  title: "The Carer’s Compass",
  description:
    "A free, step-by-step guide, made by carers for carers, to help you steady yourself, support your loved one, and find clarity in the weeks ahead.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <SkipNav />
        <SunBackdrop />
        {children}
      </body>
    </html>
  );
}
