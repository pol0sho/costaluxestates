'use client';

import { useEffect, useState, useCallback } from "react";
import NewBuildsClient from "./NewBuildsClient";
import { motion } from "framer-motion";

const PAGE_SIZE = 40;

export default function NewBuildsPage() {
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPages = useCallback(async () => {
    try {
      const hostname = window.location.hostname;
      const domainToRealestate: Record<string, string> = {
        localhost: "costalux",
        "www.costaluxestatesweb.onrender.com": "costalux",
        "costaluxestatesweb.onrender.com": "costalux",
        "www.costaluxestates.com": "costalux",
        "costaluxestates.com": "costalux",
      };
      const realestate = domainToRealestate[hostname] || "costalux";

      let pageNum = 1;
      let hasMore = true;
      let allResults: any[] = [];

      while (hasMore) {
        const res = await fetch(
          `https://api.habigrid.com/api/public/properties?realestate=${realestate}&includeImages=true&page=${pageNum}&limit=${PAGE_SIZE}`
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        let props: any[] = [];
        if (Array.isArray(data)) {
          props = data;
        } else if (Array.isArray(data.properties)) {
          props = data.properties;
        } else if (Array.isArray(data.data)) {
          props = data.data;
        }

        // stop when API returns less than PAGE_SIZE
        if (props.length < PAGE_SIZE) {
          hasMore = false;
        }

        // filter for new builds
        const newBuilds = props.filter((p) => {
          const lt = (p.listingtype || "").toLowerCase().replace(/\s|_/g, "");
          return lt.includes("newbuild");
        });

        allResults = [...allResults, ...newBuilds];
        pageNum++;
      }

      setAllProperties(allResults);
    } catch (err) {
      console.error("Failed to load new builds:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPages();
  }, [fetchAllPages]);

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

      {loading ? (
        <p className="text-center py-8">Loading...</p>
      ) : (
        <NewBuildsClient properties={allProperties} />
      )}
    </motion.div>
  );
}