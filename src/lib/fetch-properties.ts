export async function fetchProperties(realestate: string) {
  const res = await fetch(`https://api.habigrid.com/api/public/properties?realestate=${realestate}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}