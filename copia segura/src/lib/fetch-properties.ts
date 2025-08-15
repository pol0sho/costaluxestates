export async function fetchProperties(realestate: string) {
  const res = await fetch(
    `https://api.habigrid.com/api/public/properties?realestate=${realestate}`,
    { cache: "no-store" } // force runtime fetch every request
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Failed to fetch properties: ${res.status} - ${errorText}`);
    throw new Error(`Failed to fetch properties: ${res.status}`);
  }

  try {
    const data = await res.json();

    // Optional debug logs
    console.log("Fetched properties:", data);
    console.log("Type of properties:", typeof data);
    console.log("Is array?", Array.isArray(data));

    return data;
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    throw new Error("Invalid JSON response");
  }
}