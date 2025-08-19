const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  nl: () => import("./dictionaries/nl.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
};

export async function getDictionary(locale: string) {
  try {
    // Log to confirm locale being passed
    console.log(`Loading dictionary for locale: ${locale}`);

    const loader = dictionaries[locale] ?? dictionaries["en"];
    
    // Log which dictionary loader is being used
    console.log(`Using loader for: ${locale === "en" ? "default (English)" : locale}`);
    
    return await loader();
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    // Fallback to English if there's an error
    return await dictionaries["en"]();
  }
}