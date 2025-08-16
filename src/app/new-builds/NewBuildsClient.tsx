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

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      const town = (p.town || p.location || "").toLowerCase();
      const type = (p.property_type || p.type || "").toLowerCase();
      const price = Number(p.list_price ?? p.price ?? 0);
      const beds = Number(p.bedrooms ?? 0);
      const baths = Number(p.bathrooms ?? 0);

      if (filters.location !== "any" && town !== filters.location.toLowerCase()) return false;

      if (filters.type !== "any") {
        const filterType = filters.type.toLowerCase();
        // match exact or partial (so "apartment" matches "Top Floor Apartment")
        if (!type.includes(filterType)) return false;
      }

      if (filters.bedrooms !== "any" && beds < Number(filters.bedrooms)) return false;
      if (filters.bathrooms !== "any" && baths < Number(filters.bathrooms)) return false;
      if (price < filters.priceMin) return false;
      if (price > filters.priceMax) return false;

      return true;
    });
  }, [allProperties, filters]);

  const totalPages = Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * PROPERTIES_PER_PAGE;
    return filteredProperties.slice(start, start + PROPERTIES_PER_PAGE);
  }, [filteredProperties, currentPage]);

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
