'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "./ui/slider";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formatPrice = (value: number) => {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1000) return `€${(value / 1000)}k`;
  return `€${value}`;
};

export function SearchModule({ showListingType = true }: { showListingType?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();




const [locations, setLocations] = useState<{ resale: string[]; newbuild: string[] }>({
  resale: [],
  newbuild: []
});


useEffect(() => {
  const fetchLocations = async () => {
    try {
      const hostname = window.location.hostname;
      const domainToRealestate: Record<string, string> = {
        localhost: "costalux",
        "www.costaluxestatesweb.onrender.com": "costalux",
        "costaluxestatesweb.onrender.com": "costalux",
        "www.costaluxestates.com": "costalux",
        "costaluxestates.com": "costalux",
      };
      const realestate = domainToRealestate[hostname] || "costalux";

      const res = await fetch(
        `https://api.habigrid.com/api/public/locations?realestate=${realestate}`
      );
      if (!res.ok) throw new Error("Failed to fetch locations");

      const data = await res.json();
      setLocations({
        resale: data.resale || [],
        newbuild: data.newbuild || []
      });
    } catch (err) {
      console.error("Error loading locations:", err);
    }
  };

  fetchLocations();
}, []);


 
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "any",
    type: searchParams.get("type") || "any",
    bedrooms: searchParams.get("bedrooms") || "any",
    bathrooms: searchParams.get("bathrooms") || "any",
    priceMin: Number(searchParams.get("priceMin")) || 0,
    priceMax: Number(searchParams.get("priceMax")) || 3000000,
    listingType: searchParams.get("listingType") || "properties",
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.priceMin,
    filters.priceMax === Number.MAX_SAFE_INTEGER ? 3000000 : filters.priceMax,
  ]);

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    updateFilter("priceMin", range[0]);
    updateFilter("priceMax", range[1] === 3000000 ? Number.MAX_SAFE_INTEGER : range[1]);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filters.location !== "any") params.set("location", filters.location);
    if (filters.type !== "any") params.set("type", filters.type);
    if (filters.bedrooms !== "any") params.set("bedrooms", filters.bedrooms);
    if (filters.bathrooms !== "any") params.set("bathrooms", filters.bathrooms);
    if (filters.priceMin > 0) params.set("priceMin", filters.priceMin.toString());
    if (filters.priceMax < Number.MAX_SAFE_INTEGER)
      params.set("priceMax", filters.priceMax.toString());

    // Always reset page
    params.set("page", "1");

    // ✅ Route depends on listingType
    if (filters.listingType === "new-builds") {
      router.push(`/new-builds?${params.toString()}`);
    } else {
      router.push(`/properties?${params.toString()}`);
    }
  };

  return (
    <Card className="shadow-lg border-none bg-background/20 backdrop-blur-sm w-full max-w-7xl mx-auto">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">

          {/* Location */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-1">Location</label>
            <Select value={filters.location} onValueChange={(v) => updateFilter("location", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
<SelectContent>
  <SelectItem value="any">Any Location</SelectItem>
  {(filters.listingType === "new-builds" ? locations.newbuild : locations.resale).map((loc) => (
    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
  ))}
</SelectContent>
            </Select>
          </div>

          {/* Listing Type */}
          {showListingType && (
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-1">Listing Type</label>
              <Select value={filters.listingType} onValueChange={(v) => updateFilter("listingType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="new-builds">New Build Properties</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Property Type */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-1">Property Type</label>
            <Select value={filters.type} onValueChange={(v) => updateFilter("type", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium mb-1">Bedrooms</label>
            <Select value={filters.bedrooms} onValueChange={(v) => updateFilter("bedrooms", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {[1,2,3,4,5].map(n => <SelectItem key={n} value={n.toString()}>{n}+</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium mb-1">Bathrooms</label>
            <Select value={filters.bathrooms} onValueChange={(v) => updateFilter("bathrooms", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {[1,2,3,4,5].map(n => <SelectItem key={n} value={n.toString()}>{n}+</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-2">
            <label className="block text-sm font-medium">Price Range</label>
            <div className="flex justify-between text-xs">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{priceRange[1] === 3000000 ? `${formatPrice(priceRange[1])}+` : formatPrice(priceRange[1])}</span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={3000000}
              step={50000}
            />
          </div>

          {/* Search Button */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Button onClick={handleSearch} className="w-full">
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
