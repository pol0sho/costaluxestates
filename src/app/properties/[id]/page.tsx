import { fetchProperties } from "@/lib/fetch-properties";
import PropertyDetailClient from "./PropertyDetailClient";

export async function generateStaticParams() {
  const realestate = "costalux"; 
  const properties = await fetchProperties(realestate);

  return properties.map((p: any) => ({
    id: p.id.toString(),
  }));
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const realestate = "costalux"; // TODO: make dynamic
  const properties = await fetchProperties(realestate);
  const property = properties.find((p: any) => p.id.toString() === params.id);

  if (!property) return <div>Property not found</div>;

  return <PropertyDetailClient property={property} />;
}