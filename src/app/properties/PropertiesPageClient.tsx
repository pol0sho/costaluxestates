// src/app/properties/PropertiesPageClient.tsx
'use client';

import { useEffect, useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module-pages";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

const PROPERTIES_PER_PAGE = 20;

export default function PropertiesPageClient() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
            const hostname = window.location.hostname;

            const domainToRealestate: Record<string, string> = {
            "localhost": "costalux",
            "www.costaluxestatesweb.onrender.com": "costalux",
            "costaluxestatesweb.onrender.com": "costalux",
            "www.costaluxestates.com": "costalux",
            "costaluxestates.com": "costalux",
            };

            const realestate = domainToRealestate[hostname] || "costalux"; // fallback

        const res = await fetch(
          `https://api.habigrid.com/api/public/properties?realestate=${realestate}`
        );

        const data = await res.json();
        setProperties(Array.isArray(data) ? data.filter(p => p.listingtype === "resale") : []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const totalProperties = properties.length;
  const totalPages = Math.ceil(totalProperties / PROPERTIES_PER_PAGE);

  const paginatedProperties = properties.slice(
    (currentPage - 1) * PROPERTIES_PER_PAGE,
    currentPage * PROPERTIES_PER_PAGE
  );

  const renderPaginationLinks = () => {
    const pageNumbers = [];
    const visiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key="1">
          <PaginationLink href={`/properties?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/properties?page=${i}`} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<PaginationEllipsis key="end-ellipsis" />);
      }
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href={`/properties?page=${totalPages}`}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background"
    >
      <div className="container mx-auto px-4 md:px-6 py-12">
<div className="flex justify-center w-full">
  <div className="w-full max-w-5xl">
    <SearchModule showListingType={false} />
  </div>
</div>

        <div className="mb-8 text-center">
          {loading ? (
            <p className="text-muted-foreground">Loading properties...</p>
          ) : (
            <p className="text-muted-foreground">{totalProperties} properties found</p>
          )}
        </div>

        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-16">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious href={`/properties?page=${currentPage - 1}`} />
                      </PaginationItem>
                    )}
                    {renderPaginationLinks()}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext href={`/properties?page=${currentPage + 1}`} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
