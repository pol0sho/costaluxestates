
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
    src="/logo.jpg"
    alt="CostaLux Estates"
    width={180}
    height={40}
  />
);
const LanguageSwitcher = () => {
    const [language, setLanguage] = React.useState('English');
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setLanguage('English')}>
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><path d="M0 0h5v3H0z" fill="#012169"/><path d="m0 0 5 3M5 0 0 3" stroke="#fff" stroke-width=".6"/><path d="m0 0 5 3M5 0 0 3" stroke="#C8102E" stroke-width=".4" clip-path="url(#c)"/><path d="M2.5 0v3M0 1.5h5" stroke="#fff" stroke-width="1"/><path d="M2.5 0v3M0 1.5h5" stroke="#C8102E" stroke-width=".6"/><defs><clipPath id="c"><path d="M2.5 1.5v1.5h2.5V3H0V1.5zM0 0h2.5v1.5H0z"/></clipPath></defs></svg>
                    English
                </DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => setLanguage('Español')}>
                     <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 50"><path fill="#c60b1e" d="M0 0h75v50H0z"/><path fill="#ffc400" d="M0 12.5h75v25H0z"/><g transform="translate(26.25 20) scale(.025)"><g fill="none" stroke="#c60b1e" stroke-width="100"><path d="M125 0v350"/><path d="M375 0v350"/></g><path d="M0 150h500" stroke="#c60b1e" stroke-width="100"/><path d="M0 250h500" stroke="#ad1519" stroke-width="100"/><path d="M0 125a250 25 0 01500 0" fill="#c60b1e"/><path d="M0 150v100a250 25 0 00500 0V150" fill="#ffc400"/><path d="M250 50a100 100 0 010 200 75 75 0 01-19-148 75 75 0 0119-2 75 75 0 0119 2 75 75 0 01-19 148" fill="#ffc400" stroke="#c60b1e" stroke-width="30"/><path d="M250 250a100 100 0 010-200" fill="none" stroke="#757575" stroke-width="30"/><path d="M225 325a25 25 0 1150 0" fill="#c60b1e"/><path d="M250 50v-25a25 25 0 110-50 25 25 0 110 50" fill="#c60b1e"/></g></svg>
                    Español
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage('Nederlands')}>
                     <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6"><path fill="#21468B" d="M0 0h9v6H0z"/><path fill="#fff" d="M0 0h9v4H0z"/><path fill="#AE1C28" d="M0 0h9v2H0z"/></svg>
                    Nederlands
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage('Français')}>
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><path fill="#fff" d="M0 0h900v600H0z"/><path fill="#002654" d="M0 0h300v600H0z"/><path fill="#ed2939" d="M600 0h300v600H600z"/></svg>
                    Français
                </DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => setLanguage('Deutsch')}>
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><path d="M0 0h5v3H0z"/><path fill="#D00" d="M0 1h5v2H0z"/><path fill="#FFCE00" d="M0 2h5v1H0z"/></svg>
                    Deutsch
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


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
