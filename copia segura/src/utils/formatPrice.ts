export function formatPrice(raw: string | number, locale = "de-DE") {
  if (typeof raw === "number") {
    return `€${raw.toLocaleString(locale)}`;
  }

  if (typeof raw === "string") {
    // Remove thousand separators like "450.000" => "450000"
    const cleaned = raw.replace(/\./g, "");
    const num = Number(cleaned);
    if (!isNaN(num)) {
      return `€${num.toLocaleString(locale)}`;
    }
  }

  return "Price not available";
}