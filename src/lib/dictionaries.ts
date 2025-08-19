import "server-only";

export async function getDictionary(locale: string) {
  try {
    return (await import(`../dictionaries/${locale}.json`)).default;
  } catch (e) {
    return (await import(`../dictionaries/en.json`)).default;
  }
}