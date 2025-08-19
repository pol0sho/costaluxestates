"use client";

import { useState, useEffect } from "react";
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

const PROPERTIES_PER_PAGE = 16;

export default function NewBuildsClient({
  realestate,
  dict,
}: {
  realestate: string;
  dict: any;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Initialize filters from URL
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "any",
    type: searchParams.get("type") || "any",
    bedrooms: searchParams.get("bedrooms") || "any",
    bathrooms: searchParams.get("bathrooms") || "any",
    priceMin: Number(searchParams.get("priceMin")) || 0,
    priceMax: Number(searchParams.get("priceMax")) || 3000000,
  });

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Refetch when filters, page, or realestate changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const API_BASE =
        typeof window !== "undefined" &&
        window.location.hostname.includes("localhost")
          ? "http://localhost:5000"
          : "https://api.habigrid.com";

      const params = new URLSearchParams({
        realestate,
        page: String(currentPage),
        limit: String(PROPERTIES_PER_PAGE),
        location: filters.location,
        type: filters.type,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        priceMin: String(filters.priceMin),
        priceMax: String(filters.priceMax),
        listingtype: "newbuild", // 👈 force only new builds
      });

      try {
        const res = await fetch(
          `${API_BASE}/api/public/properties?${params.toString()}`
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        setProperties(data.properties || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPage, realestate]);

  const totalPages = Math.ceil(total / PROPERTIES_PER_PAGE);

  // ✅ Sync filters → URL
  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (newFilters.location !== "any")
      params.set("location", newFilters.location);
    if (newFilters.type !== "any") params.set("type", newFilters.type);
    if (newFilters.bedrooms !== "any")
      params.set("bedrooms", newFilters.bedrooms);
    if (newFilters.bathrooms !== "any")
      params.set("bathrooms", newFilters.bathrooms);
    if (newFilters.priceMin > 0)
      params.set("priceMin", String(newFilters.priceMin));
    if (newFilters.priceMax < 3000000)
      params.set("priceMax", String(newFilters.priceMax));
    params.set("page", "1");

    router.replace(`/new-builds?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-12 flex justify-center">
        <SearchModule
          showListingType={false}
          onFiltersChange={handleFiltersChange}
          initialFilters={filters} // ✅ pre-fill from URL
        />
      </div>

      {!loading && properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={`${property.source}-${property.id}`}
                property={property}
              />
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

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={i + 1 === currentPage}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

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
                {dict.newBuildsClient.empty.title}
              </h2>
              <p className="text-muted-foreground">
                {dict.newBuildsClient.empty.subtitle}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
