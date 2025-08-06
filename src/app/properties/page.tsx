'use client'
import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module";
import { properties } from "@/lib/placeholder-data";
import { motion } from "framer-motion";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const PROPERTIES_PER_PAGE = 20;

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

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
        pageNumbers.push(<PaginationItem key="1"><PaginationLink href={`/properties?page=1`}>1</PaginationLink></PaginationItem>);
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
        pageNumbers.push(<PaginationItem key={totalPages}><PaginationLink href={`/properties?page=${totalPages}`}>{totalPages}</PaginationLink></PaginationItem>);
    }

    return pageNumbers;
}


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-8 flex justify-center">
          <SearchModule showListingType={false}/>
        </div>

        <div className="mb-8 text-center">
            <p className="text-muted-foreground">{totalProperties} properties found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

         <div className="mt-16">
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 &&
                        <PaginationItem>
                            <PaginationPrevious href={`/properties?page=${currentPage - 1}`} />
                        </PaginationItem>
                    }
                    {renderPaginationLinks()}
                    {currentPage < totalPages &&
                        <PaginationItem>
                            <PaginationNext href={`/properties?page=${currentPage + 1}`} />
                        </PaginationItem>
                    }
                </PaginationContent>
            </Pagination>
        </div>
      </div>
    </motion.div>
  );
}
