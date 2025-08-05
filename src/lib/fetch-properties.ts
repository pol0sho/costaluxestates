export async function fetchProperties(realestate: string) {
  const res = await fetch(`https://api.habigrid.com/api/public/properties?realestate=${realestate}`, {
    cache: "no-store",
  });

  const text = await res.text(); // <-- get raw response

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", text);
    throw new Error("Invalid JSON response");
  }
}