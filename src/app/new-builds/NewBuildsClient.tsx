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

export default function NewBuildsClient({ properties: initialProperties }: { properties: any[] }) {
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

  const [currentPage, setCurrentPage] = useState(1);

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

  // Apply filters in memory
  const filtered = initialProperties
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

  // Pagination rendering
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

  // Handle live filter changes and update URL
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

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Search Bar */}
      <div className="mb-12 flex justify-center">
        <SearchModule
          showListingType={false}
          onFiltersChange={handleFiltersChange}
          initialFilters={filters}
        />
      </div>

      {/* Property Count */}
      <div className="mb-8 text-center">
        <p className="text-muted-foreground">
          {totalProperties} new build properties found
        </p>
      </div>

      {/* Properties Grid */}
      {totalProperties > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
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
      )}
    </div>
  );
}
