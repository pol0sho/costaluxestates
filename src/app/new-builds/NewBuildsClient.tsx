'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module-pages";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PROPERTIES_PER_PAGE = 16;

// ✅ API base (auto-switch between local & production)
const API_BASE = typeof window !== "undefined" && window.location.hostname.includes("localhost")
  ? "http://localhost:5000" // your local backend
  : "https://api.habigrid.com"; // your Render backend API

export default function NewBuildsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    location: "any",
    type: "any",
    bedrooms: "any",
    bathrooms: "any",
    priceMin: 0,
    priceMax: 3000000,
  });

  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Initialize filters from URL
  useEffect(() => {
    const initialFiltersFromUrl = {
      location: searchParams.get("location") || "any",
      type: searchParams.get("type") || "any",
      bedrooms: searchParams.get("bedrooms") || "any",
      bathrooms: searchParams.get("bathrooms") || "any",
      priceMin: Number(searchParams.get("priceMin") || 0),
      priceMax: Number(searchParams.get("priceMax") || 3000000),
    };
    setFilters(initialFiltersFromUrl);
  }, [searchParams]);

  // Fetch from API whenever filters or page change
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const params = new URLSearchParams({
        realestate: "costalux",
        page: currentPage.toString(),
        limit: PROPERTIES_PER_PAGE.toString(),
        ...(filters.location !== "any" ? { location: filters.location } : {}),
        ...(filters.type !== "any" ? { type: filters.type } : {}),
        ...(filters.bedrooms !== "any" ? { bedrooms: filters.bedrooms } : {}),
        ...(filters.bathrooms !== "any" ? { bathrooms: filters.bathrooms } : {}),
        ...(filters.priceMin !== 0 ? { priceMin: String(filters.priceMin) } : {}),
        ...(filters.priceMax !== 3000000 ? { priceMax: String(filters.priceMax) } : {}),
      });

      try {
        const res = await fetch(`${API_BASE}/api/public/properties?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setProperties(data.properties || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setProperties([]);
        setTotal(0);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [filters, currentPage]);

  const totalPages = Math.ceil(total / PROPERTIES_PER_PAGE);

  // Update filters + reset page + sync URL
  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (newFilters.location !== "any") params.set("location", newFilters.location);
    if (newFilters.type !== "any") params.set("type", newFilters.type);
    if (newFilters.bedrooms !== "any") params.set("bedrooms", newFilters.bedrooms);
    if (newFilters.bathrooms !== "any") params.set("bathrooms", newFilters.bathrooms);
    if (newFilters.priceMin !== 0) params.set("priceMin", String(newFilters.priceMin));
    if (newFilters.priceMax !== 3000000) params.set("priceMax", String(newFilters.priceMax));

    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

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
      if (startPage > 2) pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
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
      if (endPage < totalPages - 1) pageNumbers.push(<PaginationEllipsis key="end-ellipsis" />);
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
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-12 flex justify-center">
        <SearchModule
          showListingType={false}
          onFiltersChange={handleFiltersChange}
          initialFilters={filters}
        />
      </div>

      <div className="mb-8 text-center">
        <p className="text-muted-foreground">
          {loading ? "Loading..." : `${total} new build properties found`}
        </p>
      </div>

      {properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
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
      ) : (
        !loading && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight">
                No New Builds Found
              </h2>
              <p className="text-muted-foreground">
                Please check back later for new build projects.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
