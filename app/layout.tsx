// app/layout.tsx
import "./globals.css";
import { Lora } from "next/font/google";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import { AuthProvider } from "@/components/AuthProvider"; // 👈 import your auth.tsx

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "The Carer’s Compass",
  description:
    "A free, step-by-step guide to help you steady yourself, support your loved one, and find clarity in the weeks ahead.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 // ...
return (
  <html lang="en" suppressHydrationWarning>
    <body className={lora.className} suppressHydrationWarning>
      <AuthProvider>
        <Navbar />
        <Container>{children}</Container>
      </AuthProvider>
    </body>
  </html>
)
}