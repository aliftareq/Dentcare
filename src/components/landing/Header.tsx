import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Dentcare Logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="text-lg font-semibold">Dentcare</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-muted-foreground hover:text-foreground"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-foreground"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-muted-foreground hover:text-foreground"
          >
            About
          </a>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button size="sm">Sign Up</Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
};

export default Header;
