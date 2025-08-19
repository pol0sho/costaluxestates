'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "./ui/slider";
import React, { useEffect, useState } from "react";

const formatPrice = (value: number) => {
  if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `€${(value / 1000)}k`;
  return `€${value}`;
};

export function SearchModule({
  showListingType = true,
  onFiltersChange,
  initialFilters,
  properties,
  dict, // ✅ added
}: {
  showListingType?: boolean;
  onFiltersChange?: (filters: any) => void;
  initialFilters?: {
    location: string;
    type: string;
    bedrooms: string;
    bathrooms: string;
    priceMin: number;
    priceMax: number;
  };
  properties: any[];
  dict: any; // ✅ added
}) {
  const [filters, setFilters] = useState({
    location: "any",
    type: "any",
    bedrooms: "any",
    bathrooms: "any",
    priceMin: 0,
    priceMax: 3000000,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [locations, setLocations] = useState<string[]>([]);

  // ✅ Load initial filters from props
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
      setPriceRange([initialFilters.priceMin, initialFilters.priceMax]);
    }
  }, [initialFilters]);

  // ✅ Get unique locations from the already-loaded properties
  useEffect(() => {
    if (Array.isArray(properties) && properties.length > 0) {
      const towns = properties
        .map((p) => (p.town ?? "").trim())
        .filter((t) => t.length > 0);

      const unique = Array.from(
        new Map(towns.map((t) => [t.toLowerCase(), t])).values()
      ).sort((a, b) => a.localeCompare(b));

      setLocations(unique);
    }
  }, [properties]);

const handlePriceChange = (range: [number, number]) => {
  setPriceRange(range);
  const updated = { ...filters, priceMin: range[0], priceMax: range[1] }; // 👈 keep max as 3,000,000
  setFilters(updated);
  onFiltersChange?.(updated);
};

  const handleChange = (key: keyof typeof filters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFiltersChange?.(updated);
  };

  return (
    <Card className="shadow-lg border-none bg-background/20 backdrop-blur-sm w-full max-w-7xl mx-auto">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end justify-center">

{/* Location Dropdown */}
<div className="lg:col-span-2">
  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1 font-body">
    {dict.search2.location.label}
  </label>
  <Select
    value={filters.location}
    onValueChange={(val) => handleChange("location", val)}
  >
    <SelectTrigger id="location" className="font-body">
      <SelectValue>
        {filters.location === "any" ? dict.search2.anyLocation : filters.location}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="any">{dict.search2.anyLocation}</SelectItem>
      {locations.map((loc) => (
        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

{/* Listing Type */}
{showListingType && (
  <div className="lg:col-span-2">
    <label htmlFor="listing-type" className="block text-sm font-medium text-foreground mb-1 font-body">
      {dict.search2.listingType.label}
    </label>
    <Select defaultValue="properties">
      <SelectTrigger id="listing-type" className="font-body">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="properties">{dict.search2.listingType.properties}</SelectItem>
        <SelectItem value="new-builds">{dict.search2.listingType.newBuilds}</SelectItem>
      </SelectContent>
    </Select>
  </div>
)}

{/* Property Type */}
<div className="lg:col-span-2">
  <label htmlFor="type" className="block text-sm font-medium text-foreground mb-1 font-body">
    {dict.search2.type.label}
  </label>
  <Select
    value={filters.type}
    onValueChange={(val) => handleChange("type", val)}
  >
    <SelectTrigger id="type" className="font-body">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="any">{dict.search2.type.any}</SelectItem>
      <SelectItem value="villa">{dict.search2.type.villa}</SelectItem>
      <SelectItem value="apartment">{dict.search2.type.apartment}</SelectItem>
      <SelectItem value="townhouse">{dict.search2.type.townhouse}</SelectItem>
      <SelectItem value="penthouse">{dict.search2.type.penthouse}</SelectItem>
    </SelectContent>
  </Select>
</div>

{/* Bedrooms */}
<div className="lg:col-span-1">
  <label htmlFor="bedrooms" className="block text-sm font-medium text-foreground mb-1 font-body">
    {dict.search2.bedrooms.label}
  </label>
  <Select
    value={filters.bedrooms}
    onValueChange={(val) => handleChange("bedrooms", val)}
  >
    <SelectTrigger id="bedrooms" className="font-body">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="any">{dict.search2.any}</SelectItem>
      {[1,2,3,4,5].map((n) => (
        <SelectItem key={n} value={n.toString()}>{n}+</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

{/* Bathrooms */}
<div className="lg:col-span-1">
  <label htmlFor="bathrooms" className="block text-sm font-medium text-foreground mb-1 font-body">
    {dict.search2.bathrooms.label}
  </label>
  <Select
    value={filters.bathrooms}
    onValueChange={(val) => handleChange("bathrooms", val)}
  >
    <SelectTrigger id="bathrooms" className="font-body">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="any">{dict.search2.any}</SelectItem>
      {[1,2,3,4,5].map((n) => (
        <SelectItem key={n} value={n.toString()}>{n}+</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

{/* Price Range */}
<div className="sm:col-span-2 lg:col-span-2 space-y-2 pb-1">
  <label className="block text-sm font-medium text-foreground mb-1 font-body">
    {dict.search2.priceRange.label}
  </label>
  <div className="flex justify-between text-xs text-foreground font-body">
    <span>{formatPrice(priceRange[0])}</span>
    <span>
      {priceRange[1] === 3000000
        ? `${formatPrice(priceRange[1])}+`
        : formatPrice(priceRange[1])}
    </span>
  </div>
  <Slider
    value={priceRange}
    onValueChange={handlePriceChange}
    min={0}
    max={3000000}
    step={50000}
    className="[&>span>span]:bg-accent [&>span>span]:border-accent-foreground"
  />
</div>
        </div>
      </CardContent>
    </Card>
  );
}
