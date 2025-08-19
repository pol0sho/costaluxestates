"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Bath, LandPlot, Home } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import React from "react";
import { formatPrice } from "@/utils/formatPrice";

type Property = {
  id: number;
  ref: string;
  title: string;
  list_price: string;
  priceType?: "from" | "exact";
  town: string;
  province: string;
  bedrooms: number;
  bathrooms: number;
  built_size: number;
  plot_size: number;
  images: { url: string; order: number }[];
  aiHints: string[];
};

type PropertyCardProps = {
  property: Property;
  dict: any; // ✅ translations injected
};

export function FeaturedPropertyCard({ property, dict }: PropertyCardProps) {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/60">
      {/* ---------- Header with carousel ---------- */}
      <CardHeader className="p-0 relative">
        <Carousel
          className="w-full"
          onMouseEnter={(e) =>
            e.currentTarget.querySelector(".carousel-nav")?.classList.remove("opacity-0")
          }
          onMouseLeave={(e) =>
            e.currentTarget.querySelector(".carousel-nav")?.classList.add("opacity-0")
          }
          opts={{ loop: true }}
        >
          <CarouselContent>
            {property.images
              .sort((a, b) => a.order - b.order)
              .map((img, index) => (
                <CarouselItem key={index}>
                  <Link href={`/properties/${property.ref}`}>
                    <Image
                      src={img?.url || "/no-image.png"}
                      alt={property.title}
                      width={400}
                      height={250}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={property.aiHints?.join(" ") || ""}
                      priority={index === 0}
                      unoptimized
                    />
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>

          {/* ---------- Carousel nav arrows ---------- */}
          <div
            className="carousel-nav absolute inset-x-0 bottom-1/2 flex justify-between px-2 opacity-0 transition-opacity duration-300"
            onClick={stopPropagation}
          >
            <CarouselPrevious className="static -translate-x-0 -translate-y-0 bg-background/50 hover:bg-background/80" />
            <CarouselNext className="static -translate-x-0 -translate-y-0 bg-background/50 hover:bg-background/80" />
          </div>
        </Carousel>

        {/* ---------- Price Badge ---------- */}
        <Link href={`/properties/${property.ref}`}>
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 font-bold text-lg bg-background/80 backdrop-blur-sm cursor-pointer"
          >
            {property.priceType === "from" && `${dict.propertyCard.from} `}
            {formatPrice(property.list_price)}
          </Badge>
        </Link>
      </CardHeader>

      {/* ---------- Content ---------- */}
      <Link href={`/properties/${property.ref}`} className="flex flex-col flex-grow">
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline text-xl font-semibold mb-1 truncate">
            {property.title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <Home className="h-4 w-4 mr-1 text-accent" />
            <span>
              {property.town}, {property.province}
            </span>
          </div>
        </CardContent>

        {/* ---------- Footer ---------- */}
        <CardFooter className="p-4 bg-secondary/50 flex justify-between text-sm flex-wrap gap-y-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center" title={dict.propertyCard.bedrooms}>
              <BedDouble className="h-5 w-5 mr-1.5 text-accent" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center" title={dict.propertyCard.bathrooms}>
              <Bath className="h-5 w-5 mr-1.5 text-accent" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center" title={dict.propertyCard.builtSize}>
              <Home className="h-5 w-5 mr-1.5 text-accent" />
              <span className="font-medium">{property.built_size}m²</span>
            </div>
            {property.plot_size > 0 && (
              <div className="flex items-center" title={dict.propertyCard.plotSize}>
                <LandPlot className="h-5 w-5 mr-1.5 text-accent" />
                <span className="font-medium">{property.plot_size}m²</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
