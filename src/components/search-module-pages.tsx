'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BedDouble, Bath, Home, MapPin, LayoutGrid } from "lucide-react"
import { Slider } from "./ui/slider"
import React, { useEffect, useState } from "react"

const formatPrice = (value: number) => {
  if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `€${(value / 1000)}k`
  return `€${value}`
}

export function SearchModule({
  showListingType = true,
  onFiltersChange,
  initialFilters
}: {
  showListingType?: boolean
  onFiltersChange?: (filters: any) => void
  initialFilters?: {
    location: string
    type: string
    bedrooms: string
    bathrooms: string
    priceMin: number
    priceMax: number
  }
}) {
  const [filters, setFilters] = useState({
    location: "any",
    type: "any",
    bedrooms: "any",
    bathrooms: "any",
    priceMin: 0,
    priceMax: 3000000,
  })
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000])
  const [locations, setLocations] = useState<string[]>([])

  // ✅ Load initial filters from props (URL state)
useEffect(() => {
  if (initialFilters) {
    setFilters((prev) => ({
      ...prev,
      ...initialFilters
    }))
    setPriceRange([initialFilters.priceMin, initialFilters.priceMax])
  }
}, [])

  // ✅ Fetch distinct towns from DB
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const hostname = window.location.hostname
        const domainToRealestate: Record<string, string> = {
          localhost: "costalux",
          "www.costaluxestatesweb.onrender.com": "costalux",
          "costaluxestatesweb.onrender.com": "costalux",
          "www.costaluxestates.com": "costalux",
          "costaluxestates.com": "costalux",
        }
        const realestate = domainToRealestate[hostname] || "costalux"

        const res = await fetch(
          `https://api.habigrid.com/api/public/properties/locations?realestate=${realestate}`
        )
        const data = await res.json()
        if (Array.isArray(data)) {
          setLocations(data.sort((a, b) => a.localeCompare(b))) // alphabetical
        }
      } catch (err) {
        console.error("Failed to fetch locations:", err)
      }
    }

    fetchLocations()
  }, [])

  // ✅ Price slider change
  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range)
    const updated = { ...filters, priceMin: range[0], priceMax: range[1] }
    setFilters(updated)
    onFiltersChange?.(updated)
  }

  // ✅ Dropdown changes
  const handleChange = (key: keyof typeof filters, value: string) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    onFiltersChange?.(updated)
  }

  return (
    <Card className="shadow-lg border-none bg-background/20 backdrop-blur-sm w-full max-w-7xl mx-auto">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end justify-center">
          
{/* Location Dropdown */}
<div className="lg:col-span-2">
  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1 font-body">
    Location
  </label>
  <Select
    value={filters.location}
    onValueChange={(val) => handleChange("location", val)}
  >
    <SelectTrigger id="location" className="font-body">
      <SelectValue>
        {filters.location === "any" ? "Any Location" : filters.location}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="any">Any Location</SelectItem>
      {locations.map((loc) => (
        <SelectItem key={loc} value={loc}>
          {loc}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
          {/* Listing Type */}
          {showListingType && (
            <div className="lg:col-span-2">
              <label htmlFor="listing-type" className="block text-sm font-medium text-foreground mb-1 font-body">
                Listing Type
              </label>
              <Select defaultValue="properties">
                <SelectTrigger id="listing-type" className="font-body">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="new-builds">New Build Properties</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Property Type */}
          <div className="lg:col-span-2">
            <label htmlFor="type" className="block text-sm font-medium text-foreground mb-1 font-body">
              Property Type
            </label>
            <Select
              value={filters.type}
              onValueChange={(val) => handleChange("type", val)}
            >
              <SelectTrigger id="type" className="font-body">
                <SelectValue />
              </SelectTrigger>
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
            <label className="block text-sm font-medium text-foreground mb-1 font-body">Price Range</label>
            <div className="flex justify-between text-xs text-foreground font-body">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{priceRange[1] === 3000000 ? `${formatPrice(priceRange[1])}+` : formatPrice(priceRange[1])}</span>
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
  )
}