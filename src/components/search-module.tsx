
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BedDouble, Bath, Home, Search, MapPin, Euro, LayoutGrid } from "lucide-react"
import { Slider } from "./ui/slider"
import React from "react"

const formatPrice = (value: number) => {
    if (value >= 1000000) {
        return `€${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `€${(value / 1000)}k`;
    }
    return `€${value}`;
};


export function SearchModule({ showListingType = true }: { showListingType?: boolean }) {
  const [priceRange, setPriceRange] = React.useState([0, 3000000])

  return (
    <Card className="shadow-lg border-none bg-background/20 backdrop-blur-sm w-full max-w-7xl mx-auto">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end justify-center">
          <div className="lg:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-white text-foreground mb-1 font-body">Location</label>
            <Select>
              <SelectTrigger id="location" className="font-body">
                <SelectValue placeholder={
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Any</span>
                  </div>
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Location</SelectItem>
                <SelectItem value="estepona">Estepona</SelectItem>
                <SelectItem value="san-pedro">San Pedro</SelectItem>
                <SelectItem value="marbella">Marbella</SelectItem>
                <SelectItem value="fuengirola">Fuengirola</SelectItem>
                <SelectItem value="benalmadena">Benalmadena</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {showListingType && (
            <div className="lg:col-span-2">
              <label htmlFor="listing-type" className="block text-sm font-medium text-white text-foreground mb-1 font-body">Listing Type</label>
               <Select defaultValue="properties">
                <SelectTrigger id="listing-type" className="font-body">
                  <SelectValue placeholder={
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                      <span>Properties</span>
                    </div>
                  } />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="new-builds">New Build Properties</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="lg:col-span-2">
            <label htmlFor="type" className="block text-sm font-medium text-white text-foreground mb-1 font-body">Property Type</label>
             <Select>
              <SelectTrigger id="type" className="font-body">
                <SelectValue placeholder={
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>Any</span>
                  </div>
                } />
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
           <div className="lg:col-span-1">
            <label htmlFor="bedrooms" className="block text-sm font-medium text-white text-foreground mb-1 font-body">Bedrooms</label>
            <Select>
              <SelectTrigger id="bedrooms" className="font-body">
                 <SelectValue placeholder={
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                    <span>Any</span>
                  </div>
                } />
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
           <div className="lg:col-span-1">
            <label htmlFor="bathrooms" className="block text-sm font-medium text-white text-foreground mb-1 font-body">Bathrooms</label>
            <Select>
              <SelectTrigger id="bathrooms" className="font-body">
                 <SelectValue placeholder={
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span>Any</span>
                  </div>
                } />
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
          <div className="sm:col-span-2 lg:col-span-2 space-y-2 pb-1">
             <label className="block text-sm font-medium text-white text-foreground mb-1 font-body">Price Range</label>
             <div className="flex justify-between text-xs text-foreground font-body">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{priceRange[1] === 3000000 ? `${formatPrice(priceRange[1])}+` : formatPrice(priceRange[1])}</span>
             </div>
             <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={3000000}
                step={50000}
                className="[&>span>span]:bg-accent [&>span>span]:border-accent-foreground"
             />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <Button size="lg" className="w-full text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105">
                <Search className="mr-2 h-5 w-5" />
                Search properties
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
