
'use client';
import Link from 'next/link';
import { Languages, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-foreground/80 hover:text-foreground transition-colors font-body relative group py-2">
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
const LanguageSwitcher = () => {
  const [language, setLanguage] = React.useState("English");

  const changeLanguage = async (lang: string) => {
    setLanguage(lang);

    try {
      await fetch("/api/set-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: lang }),
      });
    } catch (err) {
      console.error("Failed to save language:", err);
    }

    // 🔹 redirect to the proper language route if you use Next.js i18n routing
    window.location.href = `/${lang.toLowerCase()}`;
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
        <DropdownMenuItem onSelect={() => changeLanguage("English")}>
          {/* 🇬🇧 flag icon */}
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage("Español")}>
          {/* 🇪🇸 flag icon */}
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage("Nederlands")}>
          Nederlands
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage("Français")}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage("Deutsch")}>
          Deutsch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="w-full border-b border-border/40 bg-background">
      <div className="container mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>
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
          <LanguageSwitcher />
        </div>

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
                <Link href="/" className="mb-8 flex items-center" onClick={() => setIsMenuOpen(false)}>
                   <Logo />
                </Link>
                <nav className="flex flex-col space-y-4 flex-grow">
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-body text-lg">Home</Link>
                  <Link href="/properties" onClick={() => setIsMenuOpen(false)} className="font-body text-lg">Properties</Link>
                  <Link href="/new-builds" onClick={() => setIsMenuOpen(false)} className="font-body text-lg">New Builds</Link>
                  <Link href="/buy-in-dubai" onClick={() => setIsMenuOpen(false)} className="font-body text-lg">Buy in Dubai and surroundings</Link>
                </nav>
                 <div className="flex items-center justify-between">
                    <Button asChild className="flex-grow bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    </Button>
                    <LanguageSwitcher />
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
