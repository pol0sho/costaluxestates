export const dynamic = "force-dynamic";
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
import { Suspense } from "react";

// API constants
const PROPERTIES_PER_PAGE = 16;
const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.habigrid.com";

function getRealestateFromHost(hostname: string): string {
  const map: Record<string, string> = {
    "localhost": "costalux",
    "www.costaluxestatesweb.onrender.com": "costalux",
    "costaluxestatesweb.onrender.com": "costalux",
    "www.costaluxestates.com": "costalux",
    "costaluxestates.com": "costalux",
  };
  return map[hostname] || "costalux";
}

// 🔁 Fetch data on the server
async function fetchProperties(searchParams: Record<string, string | undefined>, host: string) {
  const params = new URLSearchParams({
    realestate: getRealestateFromHost(host),
    page: searchParams.page ?? "1",
    limit: String(PROPERTIES_PER_PAGE),
    location: searchParams.location ?? "any",
    type: searchParams.type ?? "any",
    bedrooms: searchParams.bedrooms ?? "any",
    bathrooms: searchParams.bathrooms ?? "any",
    priceMin: searchParams.priceMin ?? "0",
    priceMax: searchParams.priceMax ?? "3000000",
    listingtype: "resale",
  });

  const res = await fetch(`${API_BASE}/api/public/properties?${params.toString()}`, {
    // ✅ cache busting disabled to always get fresh (tune as needed)
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch properties: ${res.status}`);

  return res.json();
}

// ✅ Server Component
export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const host =
    typeof window === "undefined" && process.env.NEXT_PUBLIC_VERCEL_URL
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : "localhost";

  const data = await fetchProperties(searchParams, host);
  const properties = Array.isArray(data?.properties) ? data.properties : [];
  const total = Number(data?.total || 0);
  const currentPage = Number(searchParams.page ?? 1);
  const totalPages = Math.ceil(total / PROPERTIES_PER_PAGE);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Filters */}
      <div className="mb-12 flex justify-center">
        {/* ⬇️ SearchModule stays client-side, but we pass filters as props */}
        <SearchModule
          showListingType={false}
          onFiltersChange={() => {}}
          initialFilters={{
            location: searchParams.location ?? "any",
            type: searchParams.type ?? "any",
            bedrooms: searchParams.bedrooms ?? "any",
            bathrooms: searchParams.bathrooms ?? "any",
            priceMin: Number(searchParams.priceMin ?? 0),
            priceMax: Number(searchParams.priceMax ?? 3000000),
          }}
        />
      </div>

      {/* Properties grid */}
      {properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property: any) => (
              <PropertyCard
                key={`${property.source ?? "prop"}-${property.id}`}
                property={property}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center overflow-x-auto">
              <Pagination>
                <PaginationContent className="flex flex-nowrap justify-center gap-2 whitespace-nowrap">
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={`/properties?${new URLSearchParams({
                          ...searchParams,
                          page: String(currentPage - 1),
                        })}`}
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
                            href={`/properties?${new URLSearchParams({
                              ...searchParams,
                              page: String(page),
                            })}`}
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
                        href={`/properties?${new URLSearchParams({
                          ...searchParams,
                          page: String(currentPage + 1),
                        })}`}
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