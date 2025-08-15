'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // ✅ Add this
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

const PROPERTIES_PER_PAGE = 20;

export default function PropertiesPageClient() {
  const searchParams = useSearchParams(); // ✅
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    location: "any",
    type: "any",
    bedrooms: "any",
    bathrooms: "any",
    priceMin: 0,
    priceMax: 3000000,
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // ✅ When URL changes, update filters from params
    const newFilters = {
      location: searchParams.get("location") || "any",
      type: searchParams.get("type") || "any",
      bedrooms: searchParams.get("bedrooms") || "any",
      bathrooms: searchParams.get("bathrooms") || "any",
      priceMin: Number(searchParams.get("priceMin") || 0),
      priceMax: Number(searchParams.get("priceMax") || 3000000),
    };
    setFilters(newFilters);
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchProperties = async () => {
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
        const res = await fetch(
          `https://api.habigrid.com/api/public/properties?realestate=${realestate}`
        );
        const data = await res.json();

        setProperties(
          Array.isArray(data)
            ? data.filter((p) => p.listingtype?.toLowerCase() === "resale")
            : []
        );
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ✅ Apply filters in-memory
  const filtered = properties
    .filter(
      (p) =>
        filters.location === "any" ||
        p.town?.toLowerCase() === filters.location.toLowerCase()
    )
    .filter(
      (p) =>
        filters.type === "any" ||
        p.property_type?.toLowerCase() === filters.type.toLowerCase()
    )
    .filter(
      (p) =>
        filters.bedrooms === "any" ||
        Number(p.bedrooms) >= Number(filters.bedrooms)
    )
    .filter(
      (p) =>
        filters.bathrooms === "any" ||
        Number(p.bathrooms) >= Number(filters.bathrooms)
    )
    .filter(
      (p) =>
        Number(p.list_price) >= filters.priceMin &&
        Number(p.list_price) <= filters.priceMax
    );

  const totalProperties = filtered.length;
  const totalPages = Math.ceil(totalProperties / PROPERTIES_PER_PAGE);

  const paginatedProperties = filtered.slice(
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
          <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={i === currentPage}
          >
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
          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PaginationLink>
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
        <div className="mb-8 flex justify-center">
          <SearchModule showListingType={false} />
        </div>

        <div className="mb-8 text-center">
          {loading ? (
            <p className="text-muted-foreground">Loading properties...</p>
          ) : (
            <p className="text-muted-foreground">
              {totalProperties} properties found
            </p>
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
                        <PaginationPrevious
                          onClick={() => setCurrentPage((p) => p - 1)}
                        />
                      </PaginationItem>
                    )}
                    {renderPaginationLinks()}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((p) => p + 1)}
                        />
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