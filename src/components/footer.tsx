import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export function Footer({
  dict,
  locale = "en",
}: {
  dict: {
    rights: string;
    terms: string;
    privacy: string;
    contact: string;
  };
  locale?: string;
}) {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground font-body">
              &copy; {new Date().getFullYear()} CostaLux Estates. {dict.rights}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* ✅ Localized nav */}
            <nav className="flex space-x-6">
              <Link
                href={`/${locale}/terms`}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {dict.terms}
              </Link>
              <Link
                href={`/${locale}/privacy`}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {dict.privacy}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {dict.contact}
              </Link>
            </nav>

            {/* Socials stay the same */}
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/share/1JGZSqMG5o/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/costalux_estates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}