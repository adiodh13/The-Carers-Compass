import Container from "../components/Container";
import Image from "next/image"; // or your SVG component

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="w-full py-6">
        <Container className="flex items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo-mark.png" alt="The Carer’s Compass" width={64} height={64} priority />
            <div className="leading-tight">
              <div className="text-xl font-semibold">The Carer’s</div>
              <div className="text-xl font-semibold">Compass</div>
            </div>
          </div>

          {/* right align menu */}
          <ul className="ml-auto hidden md:flex items-center gap-10 text-[17px]">
            <li><a href="#benefits" className="hover:opacity-70 transition">How this helps you</a></li>
            <li><a href="#faq" className="hover:opacity-70 transition">Your questions, answered</a></li>
            <li><a href="#contact" className="hover:opacity-70 transition">Contact us</a></li>
          </ul>
        </Container>
      </nav>
    </header>
  );
}
