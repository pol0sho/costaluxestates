// app/new-builds/NewBuildsClient.tsx
'use client';

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

const PROPERTIES_PER_PAGE = 16;

export default function NewBuildsClient({ properties }: { properties: any[] }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

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
          <PaginationLink href={`/new-builds?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/new-builds?page=${i}`} isActive={i === currentPage}>
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
          <PaginationLink href={`/new-builds?page=${totalPages}`}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
<div className="flex justify-center w-full">
  <div className="w-full max-w-5xl">
    <SearchModule showListingType={false} />
  </div>
</div>

      <div className="mb-8 text-center">
        <p className="text-muted-foreground">{totalProperties} new build properties found</p>
      </div>

      {totalProperties > 0 ? (
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
                      <PaginationPrevious href={`/new-builds?page=${currentPage - 1}`} />
                    </PaginationItem>
                  )}
                  {renderPaginationLinks()}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={`/new-builds?page=${currentPage + 1}`} />
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
            <h2 className="text-2xl font-bold tracking-tight">No New Builds Found</h2>
            <p className="text-muted-foreground">Please check back later for new build projects.</p>
          </div>
        </div>
      )}
    </div>
  );
}
