"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module-pages";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";

const PROPERTIES_PER_PAGE = 16;

export default function PropertiesPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "any",
    type: searchParams.get("type") || "any",
    bedrooms: searchParams.get("bedrooms") || "any",
    bathrooms: searchParams.get("bathrooms") || "any",
    priceMin: Number(searchParams.get("priceMin")) || 0,
    priceMax: Number(searchParams.get("priceMax")) || 3000000,
  });

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRealestateFromHost = () => {
    if (typeof window === "undefined") return "costalux";
    const hostname = window.location.hostname;
    const map: Record<string, string> = {
      localhost: "costalux",
      "www.costaluxestatesweb.onrender.com": "costalux",
      "costaluxestatesweb.onrender.com": "costalux",
      "www.costaluxestates.com": "costalux",
      "costaluxestates.com": "costalux",
    };
    return map[hostname] || "costalux";
  };

  // 🔁 Fetch properties (resale only)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const API_BASE =
        typeof window !== "undefined" && window.location.hostname.includes("localhost")
          ? "http://localhost:5000"
          : "https://api.habigrid.com";

      const params = new URLSearchParams({
        realestate: getRealestateFromHost(),
        page: String(currentPage),
        limit: String(PROPERTIES_PER_PAGE),
        location: filters.location,
        type: filters.type,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        priceMin: String(filters.priceMin),
        priceMax: String(filters.priceMax),
        listingtype: "resale", // ✅ force resale only
      });

      try {
        const res = await fetch(`${API_BASE}/api/public/properties?${params.toString()}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();

        setProperties(Array.isArray(data?.properties) ? data.properties : []);
        setTotal(Number(data?.total || 0));
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPage]);

  const totalPages = Math.ceil(total / PROPERTIES_PER_PAGE);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (newFilters.location !== "any") params.set("location", newFilters.location);
    if (newFilters.type !== "any") params.set("type", newFilters.type);
    if (newFilters.bedrooms !== "any") params.set("bedrooms", newFilters.bedrooms);
    if (newFilters.bathrooms !== "any") params.set("bathrooms", newFilters.bathrooms);
    if (newFilters.priceMin > 0) params.set("priceMin", String(newFilters.priceMin));
    if (newFilters.priceMax < 3000000) params.set("priceMax", String(newFilters.priceMax));
    params.set("page", "1");

    router.replace(`/properties?${params.toString()}`);
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

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={`${property.source ?? "prop"}-${property.id}`}
                property={property}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center overflow-x-auto">
              <Pagination>
                <PaginationContent className="flex flex-nowrap justify-center gap-2 whitespace-nowrap">
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (page === 1 || page === totalPages) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .map((page, idx, arr) => {
                      const prev = arr[idx - 1];
                      if (prev && page - prev > 1) {
                        return (
                          <PaginationItem key={`ellipsis-${page}`}>
                            <span className="px-3 text-muted-foreground select-none">…</span>
                          </PaginationItem>
                        );
                      }
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={page === currentPage}
                            className={`px-4 py-2 rounded-md cursor-pointer select-none ${
                              page === currentPage
                                ? "bg-[hsl(var(--accent))] text-white font-bold"
                                : "hover:bg-muted"
                            }`}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">No Resale Properties Found</h2>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
