export async function getDictionary(locale: string) {
  try {
    switch (locale) {
      case "es":
        return (await import("../dictionaries/es.json")).default;
      case "fr":
        return (await import("../dictionaries/fr.json")).default;
      case "de":
        return (await import("../dictionaries/de.json")).default;
      case "nl":
        return (await import("../dictionaries/nl.json")).default;
      default:
        return (await import("../dictionaries/en.json")).default;
    }
  } catch (err) {
    console.error("Error loading dictionary:", err);
    return (await import("../dictionaries/en.json")).default;
  }
}