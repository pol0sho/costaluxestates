'use client';
import Link from 'next/link';
import { Languages, Menu, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-foreground/80 hover:text-foreground transition-colors font-body relative group py-2"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
  </Link>
);

const Logo = () => (
  <img
    src="/logo.png"
    alt="CostaLux Estates"
    width={180}
    height={40}
  />
);

// label → locale code map
const languages: Record<string, string> = {
  English: 'en',
  Español: 'es',
  Nederlands: 'nl',
  Français: 'fr',
  Deutsch: 'de',
};

const LanguageSwitcher = ({ currentLocale = 'en' }: { currentLocale?: string }) => {
  const router = useRouter();
  const pathname = usePathname(); // e.g. "/properties"

  const changeLanguage = async (label: string, code: string) => {
    try {
      await fetch('/api/set-language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: code }), // ✅ store locale code in DB
      });
    } catch (err) {
      console.error('Failed to save language:', err);
    }

    // build new path with locale prefix
    const newPath = `/${code}${pathname.replace(`/${currentLocale}`, '')}`;
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([label, code]) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => changeLanguage(label, code)}
            className="flex items-center justify-between"
          >
            <span>{label}</span>
            {currentLocale === code && (
              <Check className="h-4 w-4 text-blue-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function Header({ locale = 'en' }: { locale?: string }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="w-full border-b border-border/40 bg-background">
      <div className="container mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-8 text-sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/properties">Properties</NavLink>
            <NavLink href="/new-builds">New Builds</NavLink>
            <NavLink href="/buy-in-dubai">Buy in Dubai and surroundings</NavLink>
          </nav>
          <div className="h-6 border-l border-border/70 mx-4"></div>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Contact</Link>
          </Button>
          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="p-6 flex flex-col h-full">
                <Link
                  href="/"
                  className="mb-8 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Logo />
                </Link>
                <nav className="flex flex-col space-y-4 flex-grow">
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-body text-lg"
                  >
                    Home
                  </Link>
                  <Link
                    href="/properties"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-body text-lg"
                  >
                    Properties
                  </Link>
                  <Link
                    href="/new-builds"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-body text-lg"
                  >
                    New Builds
                  </Link>
                  <Link
                    href="/buy-in-dubai"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-body text-lg"
                  >
                    Buy in Dubai and surroundings
                  </Link>
                </nav>
                <div className="flex items-center justify-between">
                  <Button
                    asChild
                    className="flex-grow bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </Button>
                  <LanguageSwitcher currentLocale={locale} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
