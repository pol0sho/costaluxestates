"use client";

import Link from "next/link";
import { Languages, Menu, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Helper: prepend locale to hrefs
const localizeHref = (href: string, locale: string) =>
  `/${locale}${href === "/" ? "" : href}`;

const NavLink = ({
  href,
  locale,
  children,
}: {
  href: string;
  locale: string;
  children: React.ReactNode;
}) => (
  <Link
    href={localizeHref(href, locale)}
    className="text-foreground/80 hover:text-foreground transition-colors font-body relative group py-2"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
  </Link>
);

const Logo = ({ locale }: { locale: string }) => (
  <Link href={`/${locale}`} className="mr-6 flex items-center space-x-2">
    <img src="/logo.png" alt="CostaLux Estates" width={180} height={40} />
  </Link>
);

// label → locale code map
const languages: Record<string, string> = {
  English: "en",
  Español: "es",
  Nederlands: "nl",
  Français: "fr",
  Deutsch: "de",
};

const LanguageSwitcher = ({
  currentLocale = "en",
}: {
  currentLocale?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname(); // e.g. "/en/properties"

  const changeLanguage = async (code: string) => {
    try {
      await fetch("/api/set-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: code }),
      });
    } catch (err) {
      console.error("Failed to save language:", err);
    }

    // Swap locale in path safely
    const segments = pathname.split("/");
    segments[1] = code; // replace /en → /es
    let newPath = segments.join("/");
    if (!newPath) newPath = `/${code}`;
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
            onSelect={() => changeLanguage(code)}
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

// ✅ Header now receives dict with translated labels
export function Header({
  locale = "en",
  dict,
}: {
  locale?: string;
  dict: {
    home: string;
    properties: string;
    newBuilds: string;
    buyInDubai: string;
    contact: string;
  };
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="w-full border-b border-border/40 bg-background">
      <div className="container mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6">
        <Logo locale={locale} />

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-8 text-sm">
            <NavLink href="/" locale={locale}>{dict.home}</NavLink>
            <NavLink href="/properties" locale={locale}>{dict.properties}</NavLink>
            <NavLink href="/new-builds" locale={locale}>{dict.newBuilds}</NavLink>
            <NavLink href="/buy-in-dubai" locale={locale}>{dict.buyInDubai}</NavLink>
          </nav>
          <div className="h-6 border-l border-border/70 mx-4"></div>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href={`/${locale}/contact`}>{dict.contact}</Link>
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
                <Logo locale={locale} />
                <nav className="flex flex-col space-y-4 flex-grow">
                  <Link href={`/${locale}`} onClick={() => setIsMenuOpen(false)} className="font-body text-lg">{dict.home}</Link>
                  <Link href={`/${locale}/properties`} onClick={() => setIsMenuOpen(false)} className="font-body text-lg">{dict.properties}</Link>
                  <Link href={`/${locale}/new-builds`} onClick={() => setIsMenuOpen(false)} className="font-body text-lg">{dict.newBuilds}</Link>
                  <Link href={`/${locale}/buy-in-dubai`} onClick={() => setIsMenuOpen(false)} className="font-body text-lg">{dict.buyInDubai}</Link>
                </nav>
                <div className="flex items-center justify-between">
                  <Button asChild className="flex-grow bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={`/${locale}/contact`} onClick={() => setIsMenuOpen(false)}>{dict.contact}</Link>
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
