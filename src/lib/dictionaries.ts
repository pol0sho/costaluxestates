export async function getDictionary(locale: string) {
  const supportedLocales = ['en', 'es', 'fr', 'nl', 'de'];
  const localeCode = supportedLocales.includes(locale) ? locale : 'en'; // default to 'en' if not found

  try {
    // Fetch the dictionary JSON from the public/dictionaries folder
    const response = await fetch(`/dictionaries/${localeCode}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load dictionary for ${localeCode}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return {}; // Return an empty dictionary on error or fallback
  }
}