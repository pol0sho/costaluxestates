'use client';

import { useState, useEffect } from "react";
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

export default function NewBuildsClient({ realestate }: { realestate: string }) {
  const [filters, setFilters] = useState({
    location: "any",
    type: "any",
    bedrooms: "any",
    bathrooms: "any",
    priceMin: 0,
    priceMax: 3000000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch from backend when page or filters change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const params = new URLSearchParams({
        realestate,
        page: String(currentPage),
        limit: String(PROPERTIES_PER_PAGE),
        location: filters.location,
        type: filters.type,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        priceMin: String(filters.priceMin),
        priceMax: String(filters.priceMax)
      });

      const res = await fetch(`/api/public/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.properties || []);
      setTotal(data.total || 0);
      setLoading(false);
    };

    fetchData();
  }, [filters, currentPage, realestate]);

  const totalPages = Math.ceil(total / PROPERTIES_PER_PAGE);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-12 flex justify-center">
        <SearchModule
          showListingType={false}
          onFiltersChange={handleFiltersChange}
          initialFilters={filters}
          properties={[]} // No need to pass all props
        />
      </div>

      <div className="mb-8 text-center">
        <p className="text-muted-foreground">
          {loading ? "Loading..." : `${total} new build properties found`}
        </p>
      </div>

      {!loading && properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
              <PropertyCard key={`${property.source}-${property.id}`} property={property} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setCurrentPage(p => p - 1)} />
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
                      <PaginationNext onClick={() => setCurrentPage(p => p + 1)} />
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
              <h2 className="text-2xl font-bold tracking-tight">No New Builds Found</h2>
              <p className="text-muted-foreground">Please check back later for new build projects.</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
