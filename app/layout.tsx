// app/layout.tsx
import "./globals.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "The Carer’s Compass",
  description:
    "A free, task-oriented guide to help you steady yourself, support your loved one, and find clarity in the weeks ahead.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={lora.className}>{children}</body>
    </html>
  );
}
