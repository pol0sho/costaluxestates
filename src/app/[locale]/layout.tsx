import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/lib/dictionaries";

const SUPPORTED_LOCALES = ["en", "es", "nl", "fr", "de"];
const DEFAULT_LOCALE = "en";
const BASE_URL = "https://www.costaluxestates.com";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ✅ Lazy-load only the needed dictionary
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://api.habigrid.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.habigrid.com" />

        {/* ✅ SEO: hreflang */}
        {SUPPORTED_LOCALES.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`${BASE_URL}/${loc}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${BASE_URL}/${DEFAULT_LOCALE}`}
        />
      </head>
      <body className="font-body antialiased">
        <div className="flex min-h-screen flex-col">
          {/* ✅ Pass translations into header/footer */}
          <Header locale={locale} dict={dict.header} />
          <main className="flex-grow">{children}</main>
          <Footer dict={dict.footer} />
        </div>
      </body>
    </html>
  );
}
