import { fetchProperties } from "@/lib/fetch-properties";
import PropertyDetailClient from "./PropertyDetailClient";

// This tells Next.js: "I want to statically export this"
export const dynamic = "force-static";

// Generate all /properties/[id] pages at build time
export async function generateStaticParams() {
  const realestate = "costalux";
  try {
    const properties = await fetchProperties(realestate);
    return properties.map((p: any) => ({ id: p.id.toString() }));
  } catch (err) {
    console.error("Failed to fetch properties in generateStaticParams:", err);
    return []; // Don't crash the build
  }
}

// Render the property detail page
export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const realestate = "costalux";

  try {
    const properties = await fetchProperties(realestate);
    const property = properties.find((p: any) => p.id.toString() === params.id);

    if (!property) return <div>Property not found</div>;

    return <PropertyDetailClient property={property} />;
  } catch (err) {
    console.error("Failed to load property:", err);
    return <div>Error loading property.</div>;
  }
}