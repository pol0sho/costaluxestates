'use client';

import { useState, useEffect } from "react";
import NewBuildsClient from "./NewBuildsClient";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // ✅ spinner

const PAGE_SIZE = 16;

export default function NewBuildsPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const domainToRealestate: Record<string, string> = {
    localhost: "costalux",
    "www.costaluxestatesweb.onrender.com": "costalux",
    "costaluxestatesweb.onrender.com": "costalux",
    "www.costaluxestates.com": "costalux",
    "costaluxestates.com": "costalux",
  };
  const realestate = domainToRealestate[hostname] || "costalux";

  const fetchPage = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.habigrid.com/api/public/properties?realestate=${realestate}&listingtype=newbuild&page=${page}&limit=${PAGE_SIZE}`
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setProperties(data.properties || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to load new builds:", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

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
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
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
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : properties.length > 0 ? (
        <NewBuildsClient
          properties={properties}
          total={total}
          page={currentPage}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          realestate={realestate}
        />
      ) : (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">No New Build Properties Found</h2>
            <p className="text-muted-foreground">
              Please check back later for new build projects.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}