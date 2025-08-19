const dictionaries: Record<string, any> = {
  en: () => import("../src/dictionaries/en.json").then((m) => m.default),
  es: () => import("../src/dictionaries/es.json").then((m) => m.default),
  fr: () => import("../src/dictionaries/fr.json").then((m) => m.default),
  nl: () => import("../src/dictionaries/nl.json").then((m) => m.default),
  de: () => import("../src/dictionaries/de.json").then((m) => m.default),
};

export async function getDictionary(locale: string) {
  // Fallback to English if dictionary missing
  const loader = dictionaries[locale] ?? dictionaries["en"];
  return loader();
}