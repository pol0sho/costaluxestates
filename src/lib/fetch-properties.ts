export async function fetchProperties(realestate: string) {
  const res = await fetch(`https://api.habigrid.com/api/public/properties?realestate=${realestate}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Non-OK response:", res.status, text);
    throw new Error("Failed to fetch properties");
  }

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Invalid JSON response from API:", text);
    throw new Error("Invalid JSON response");
  }
}