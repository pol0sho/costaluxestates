'use client';

import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module";
import { motion } from "framer-motion";
console.log("PropertyCard:", PropertyCard);
console.log("SearchModule:", SearchModule);

export const dynamic = "force-dynamic";

export default async function PropertiesPage({ params }: { params: { realestate: string } }) {
  const realestate = params?.realestate || "costalux";

  let properties: any[] = [];

  try {
    const res = await fetch(`https://api.habigrid.com/api/public/properties?realestate=${realestate}`, {
        cache: 'no-store' 
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      properties = data;
    } else {
      console.error("Expected an array but got:", data);
    }
  } catch (err) {
    console.error("Failed to fetch properties:", err);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background"
    >
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-8 flex justify-center">
          <SearchModule showListingType={false} />
        </div>

        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            {properties.length > 0
              ? `${properties.length} properties found`
              : "No properties found"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {properties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}