const dictionaries: Record<string, any> = {
  en: () => import("../public/dictionaries/en.json"),
  es: () => import("../public/dictionaries/es.json"),
  fr: () => import("../public/dictionaries/fr.json"),
  nl: () => import("../public/dictionaries/nl.json"),
  de: () => import("../public/dictionaries/de.json"),
};

export async function getDictionary(locale: string) {
  const supportedLocales = ['en', 'es', 'fr', 'nl', 'de'];
  const localeCode = supportedLocales.includes(locale) ? locale : 'en'; // default to 'en' if not found

  try {
    const dictionary = await dictionaries[localeCode]();
    return dictionary.default || {}; // Return dictionary data
  } catch (error) {
    console.error(`Error loading dictionary for ${localeCode}:`, error);
    return {}; // Return an empty dictionary on error or fallback
  }
}