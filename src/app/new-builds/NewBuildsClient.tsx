'use client';

import { useState, useEffect, useMemo } from "react";
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

export default function NewBuildsClient({ properties }: { properties: any[] }) {
  const allProperties = properties || [];

  const [filters, setFilters] = useState({
    location: "any",
    type: "any",
    bedrooms: "any",
    bathrooms: "any",
    priceMin: 0,
    priceMax: 3000000,
  });

  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Filter properties in-memory
  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      if (filters.location !== "any" && p.town !== filters.location) return false;
      if (filters.type !== "any" && (p.type || "").toLowerCase() !== filters.type.toLowerCase()) return false;
      if (filters.bedrooms !== "any" && Number(p.bedrooms || 0) < Number(filters.bedrooms)) return false;
      if (filters.bathrooms !== "any" && Number(p.bathrooms || 0) < Number(filters.bathrooms)) return false;
      if (Number(p.price || 0) < filters.priceMin) return false;
      if (Number(p.price || 0) > filters.priceMax) return false;
      return true;
    });
  }, [allProperties, filters]);

  // ✅ Pagination in-memory
  const totalPages = Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * PROPERTIES_PER_PAGE;
    return filteredProperties.slice(start, start + PROPERTIES_PER_PAGE);
  }, [filteredProperties, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
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
          {`${filteredProperties.length} new build properties found`}
        </p>
      </div>

      {paginatedProperties.length > 0 ? (
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
