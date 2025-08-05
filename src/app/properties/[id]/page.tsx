import { fetchProperties } from "@/lib/fetch-properties";
import ClientPropertyWrapper from "./ClientPropertyWrapper";

export const dynamic = "force"; // or remove this line

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const realestate = "costalux";

  try {
    const properties = await fetchProperties(realestate);
    const property = properties.find((p: any) => p.id.toString() === params.id);

    if (!property) return <div>Property not found</div>;

    return <ClientPropertyWrapper property={property} />;
  } catch (err) {
    console.error("Failed to load property:", err);
    return <div>Error loading property.</div>;
  }
}