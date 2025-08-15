// app/new-builds/page.tsx
'use client';

import { useEffect, useState } from "react";
import NewBuildsClient from "./NewBuildsClient";
import { motion } from "framer-motion";

export default function NewBuildsPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const realestate = "costalux";
      try {
        const res = await fetch(`https://api.habigrid.com/api/public/properties?realestate=${realestate}`);
        const data = await res.json();
        const newBuilds = data.filter((p: any) => p.listingtype?.toLowerCase() === "newbuild");
        setProperties(newBuilds);
      } catch (err) {
        console.error("Failed to load new builds:", err);
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
<section
  className="relative h-[30vh] min-h-[250px] flex items-center justify-center text-center bg-cover bg-center"
  style={{ backgroundImage: "url('/newbuildpage.jpg')" }}
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
              We offer exclusive access to the latest and most prestigious new build projects on the Costa del Sol.
            </p>
          </motion.div>
        </div>
      </section>

      {!loading && <NewBuildsClient properties={properties} />}
    </motion.div>
  );
}