'use client';

import { useEffect, useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module";
import { motion } from "framer-motion";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const realestate = window.location.hostname.split('.')[0]; // e.g. costalux
        const res = await fetch(`/api/public/properties?realestate=${realestate}`);
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error("Failed to load properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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
            {loading ? "Loading..." : `${properties.length} properties found`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
