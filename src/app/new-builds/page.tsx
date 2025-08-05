'use client'

import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module";
import { properties } from "@/lib/placeholder-data";
import { motion } from "framer-motion";

export default function NewBuildsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background"
    >
      <section
        className="relative h-[30vh] min-h-[250px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://placehold.co/1200x500.png')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Discover New Build Projects
            </h1>
            <p className="mb-6 text-lg">
              We offer exclusive access to the latest and most prestigious new build projects on the Costa del Sol. Explore modern designs, state-of-the-art amenities, and prime locations.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-12 flex justify-center">
          <SearchModule showListingType={false} />
        </div>

        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            {properties.length} new build properties found
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