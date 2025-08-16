'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Slider } from "./ui/slider"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const formatPrice = (value: number) => {
  if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `€${(value / 1000)}k`
  return `€${value}`
}

export function SearchModule({ showListingType = true }: { showListingType?: boolean }) {
  const router = useRouter()

  const [priceRange, setPriceRange] = useState([0, 3000000])
  const [locations, setLocations] = useState<string[]>([])
  const [location, setLocation] = useState("any")
  const [listingType, setListingType] = useState("properties")
  const [propertyType, setPropertyType] = useState("any")
  const [bedrooms, setBedrooms] = useState("any")
  const [bathrooms, setBathrooms] = useState("any")

  const [allProperties, setAllProperties] = useState<any[]>([])
  const [filteredCount, setFilteredCount] = useState(0)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const hostname = window.location.hostname
        const domainToRealestate: Record<string, string> = {
          "localhost": "costalux",
          "www.costaluxestatesweb.onrender.com": "costalux",
          "costaluxestatesweb.onrender.com": "costalux",
          "www.costaluxestates.com": "costalux",
          "costaluxestates.com": "costalux",
        }
        const realestate = domainToRealestate[hostname] || "costalux"

        const res = await fetch(`https://api.habigrid.com/api/public/properties?realestate=${realestate}`)
        const data = await res.json()

        setAllProperties(Array.isArray(data) ? data : [])

        const uniqueLocations = Array.from(
          new Set(
            data
              .map((p: any) => p.town?.trim())
              .filter((town: string | undefined) => !!town)
          )
        ).sort()

        setLocations(uniqueLocations)
      } catch (err) {
        console.error("Error fetching properties:", err)
      }
    }

    fetchProperties()
  }, [])


  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const locFromUrl = params.get("location");
  if (locFromUrl) {
    setLocation(locFromUrl); // exact casing from URL
  }
  const typeFromUrl = params.get("type");
  if (typeFromUrl) {
    setPropertyType(typeFromUrl);
  }
  const bedsFromUrl = params.get("bedrooms");
  if (bedsFromUrl) {
    setBedrooms(bedsFromUrl);
  }
  const bathsFromUrl = params.get("bathrooms");
  if (bathsFromUrl) {
    setBathrooms(bathsFromUrl);
  }
  const priceMin = params.get("priceMin");
  const priceMax = params.get("priceMax");
  if (priceMin && priceMax) {
    setPriceRange([Number(priceMin), Number(priceMax)]);
  }
}, []);

  useEffect(() => {
    const count = allProperties
      .filter(p => {
        if (location !== "any" && p.town?.toLowerCase() !== location.toLowerCase()) return false
        if (propertyType !== "any" && p.property_type?.toLowerCase() !== propertyType.toLowerCase()) return false
        if (bedrooms !== "any" && Number(p.bedrooms) < Number(bedrooms)) return false
        if (bathrooms !== "any" && Number(p.bathrooms) < Number(bathrooms)) return false
        if (Number(p.list_price) < priceRange[0] || Number(p.list_price) > priceRange[1]) return false
        if (showListingType && listingType === "new-builds" && p.listingtype?.toLowerCase() !== "newbuild") return false
        if (showListingType && listingType === "properties" && p.listingtype?.toLowerCase() !== "resale") return false
        return true
      }).length

    setFilteredCount(count)
  }, [allProperties, location, propertyType, bedrooms, bathrooms, priceRange, listingType, showListingType])

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (location !== "any") params.set("location", location)
    if (propertyType !== "any") params.set("type", propertyType)
    if (bedrooms !== "any") params.set("bedrooms", bedrooms)
    if (bathrooms !== "any") params.set("bathrooms", bathrooms)

    params.set("priceMin", priceRange[0].toString())
    params.set("priceMax", priceRange[1].toString())

    if (listingType === "new-builds") {
      router.push(`/new-builds?${params.toString()}`)
    } else {
      router.push(`/properties?${params.toString()}`)
    }
  }

  return (
    <Card className="shadow-lg border-none bg-background/20 backdrop-blur-sm w-full max-w-7xl mx-auto">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end justify-center">

          {/* Location dropdown */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1 font-body">Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location" className="font-body">
                <SelectValue placeholder="Any" />
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
              <label className="block text-sm font-medium text-foreground mb-1 font-body">Listing Type</label>
              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger id="listing-type" className="font-body">
                  <SelectValue placeholder="Properties" />
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
            <label className="block text-sm font-medium text-foreground mb-1 font-body">Property Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="type" className="font-body">
                <SelectValue placeholder="Any" />
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
            <label className="block text-sm font-medium text-foreground mb-1 font-body">Bedrooms</label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger id="bedrooms" className="font-body">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {[1, 2, 3, 4, 5].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n}+</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-foreground mb-1 font-body">Bathrooms</label>
            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger id="bathrooms" className="font-body">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {[1, 2, 3, 4, 5].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n}+</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-2 pb-1">
            <label className="block text-sm font-medium text-foreground mb-1 font-body">Price Range</label>
            <div className="flex justify-between text-xs text-foreground font-body">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{priceRange[1] === 20000000 ? `${formatPrice(priceRange[1])}+` : formatPrice(priceRange[1])}</span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={20000000}
              step={50000}
              className="[&>span>span]:bg-accent [&>span>span]:border-accent-foreground"
            />
          </div>

          {/* Search Button */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Button
              onClick={handleSearch}
              size="lg"
              className="w-full text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
