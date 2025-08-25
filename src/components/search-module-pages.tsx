'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "./ui/slider";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const formatPrice = (value: number) => {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `€${value / 1_000}k`;
  return `€${value}`;
};

type Filters = {
  location: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  priceMin: number;
  priceMax: number;
};

export function SearchModule({
  showListingType = true,
  onFiltersChange,
  initialFilters,
  properties,
}: {
  showListingType?: boolean;
  onFiltersChange?: (filters: Filters) => void;
  initialFilters?: Filters;
  properties: any[];
}) {
  const pathname = usePathname();
  const isNewBuildsPage = pathname?.startsWith("/new-builds");

  const [filters, setFilters] = useState<Filters>({
    location: "any",
    type: "any",
    bedrooms: "any",
    bathrooms: "any",
    priceMin: 300_000,
    priceMax: 3_000_000,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([300_000, 3_000_000]);

  // ✅ NEW: property types from API
  const [propertyTypes, setPropertyTypes] = useState<{ resale: string[]; newbuild: string[] }>({
    resale: [],
    newbuild: [],
  });

  // ✅ Locations from API
  const [locations, setLocations] = useState<{ resale: string[]; newbuild: string[] }>({
    resale: [],
    newbuild: [],
  });

  // 1) Load initial filters
  useEffect(() => {
    if (initialFilters) {
      const safeMin = Math.max(initialFilters.priceMin, 300_000);
      const safeMax = initialFilters.priceMax || 3_000_000;

      setFilters({
        ...initialFilters,
        priceMin: safeMin,
        priceMax: safeMax,
      });

      setPriceRange([safeMin, safeMax]);
    }
  }, [initialFilters]);

  // 2) Fetch locations + property types
  useEffect(() => {
    const fetchFilters = async () => {
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

        // Fetch both in parallel
        const [locRes, typeRes] = await Promise.all([
          fetch(`https://api.habigrid.com/api/public/locations?realestate=${realestate}`),
          fetch(`https://api.habigrid.com/api/public/property-types?realestate=${realestate}`),
        ]);

        const [locData, typeData] = await Promise.all([locRes.json(), typeRes.json()]);

        setLocations({
          resale: locData.resale || [],
          newbuild: locData.newbuild || [],
        });

        setPropertyTypes({
          resale: typeData.resale || [],
          newbuild: typeData.newbuild || [],
        });
      } catch (err) {
        console.error("Error loading filters:", err);
      }
    };

    fetchFilters();
  }, []);

  // 3) Fallback locations from properties if API empty
  const fallbackLocations = useMemo(() => {
    if (!Array.isArray(properties) || properties.length === 0) return [];
    const towns = properties.map((p) => (p.town ?? "").trim()).filter((t) => t.length > 0);

    return Array.from(new Map(towns.map((t) => [t.toLowerCase(), t])).values()).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [properties]);

  // 4) Decide active lists
  const activeLocations: string[] = useMemo(() => {
    const list = isNewBuildsPage ? locations.newbuild : locations.resale;
    return list && list.length > 0 ? list : fallbackLocations;
  }, [isNewBuildsPage, locations, fallbackLocations]);

  const activeTypes: string[] = useMemo(() => {
    return isNewBuildsPage ? propertyTypes.newbuild : propertyTypes.resale;
  }, [isNewBuildsPage, propertyTypes]);

  // Handlers
  const handlePriceChange = (range: [number, number]) => {
    const safeRange: [number, number] = [Math.max(range[0], 300_000), range[1]];
    setPriceRange(safeRange);
    const updated = { ...filters, priceMin: safeRange[0], priceMax: safeRange[1] };
    setFilters(updated);
    onFiltersChange?.(updated);
  };

  const handleChange = (key: keyof Filters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFiltersChange?.(updated);
  };

  return (
    <Card className="shadow-lg border-none bg-background/20 backdrop-blur-sm w-full max-w-7xl mx-auto">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end justify-center">
          {/* Location */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-1">Location</label>
            <Select value={filters.location} onValueChange={(val) => handleChange("location", val)}>
              <SelectTrigger id="location">
                <SelectValue>{filters.location === "any" ? "Any Location" : filters.location}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Location</SelectItem>
                {activeLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-1">Property Type</label>
            <Select value={filters.type} onValueChange={(val) => handleChange("type", val)}>
              <SelectTrigger id="type">
                <SelectValue>{filters.type === "any" ? "Any" : filters.type}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {activeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div className="lg:col-span-1">
            <label htmlFor="bedrooms" className="block text-sm font-medium text-foreground mb-1 font-body">
              Bedrooms
            </label>
            <Select
              value={filters.bedrooms}
              onValueChange={(val) => handleChange("bedrooms", val)}
            >
              <SelectTrigger id="bedrooms" className="font-body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms */}
          <div className="lg:col-span-1">
            <label htmlFor="bathrooms" className="block text-sm font-medium text-foreground mb-1 font-body">
              Bathrooms
            </label>
            <Select
              value={filters.bathrooms}
              onValueChange={(val) => handleChange("bathrooms", val)}
            >
              <SelectTrigger id="bathrooms" className="font-body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-2 pb-1">
            <label className="block text-sm font-medium text-foreground mb-1 font-body">
              Price Range
            </label>
            <div className="flex justify-between text-xs text-foreground font-body">
              <span>{formatPrice(priceRange[0])}</span>
              <span>
                {priceRange[1] === 3_000_000 ? `${formatPrice(priceRange[1])}+` : formatPrice(priceRange[1])}
              </span>
            </div>
<Slider
  value={priceRange}
  onValueChange={handlePriceChange}
  min={300_000}          // ✅ lower bound 300k
  max={3_000_000}
  step={50_000}
  className="[&>span>span]:bg-accent [&>span>span]:border-accent-foreground"
/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
