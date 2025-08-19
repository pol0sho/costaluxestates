import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, LandPlot, Home } from 'lucide-react';
import { formatPrice } from "@/utils/formatPrice";

type Property = {
  id: number;
  ref: string;
  title: string;
  list_price: number;
  priceType?: 'from' | 'exact';
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
    dict: any;
};

export function PropertyCard({ property, dict }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.ref}`}>
      <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/60">
        <CardHeader className="p-0 relative">
          <Image
            src={property.images[0]?.url || "/no-image.png"}
            alt={property.title}
            width={400}
            height={250}
            unoptimized
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={property.aiHints?.join(' ') || ''}
          />
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 font-bold text-lg bg-background/80 backdrop-blur-sm"
          >
            {property.priceType === "from" && dict.property.from + " "}
            {formatPrice(property.list_price)}
          </Badge>
        </CardHeader>

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

        <CardFooter className="p-4 bg-secondary/50 flex justify-between text-sm flex-wrap gap-y-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center" title={dict.property.bedrooms}>
              <BedDouble className="h-5 w-5 mr-1.5 text-accent" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center" title={dict.property.bathrooms}>
              <Bath className="h-5 w-5 mr-1.5 text-accent" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center" title={dict.property.builtSize}>
              <Home className="h-5 w-5 mr-1.5 text-accent" />
              <span className="font-medium">{property.built_size}m²</span>
            </div>
            {property.plot_size > 0 && (
              <div className="flex items-center" title={dict.property.plotSize}>
                <LandPlot className="h-5 w-5 mr-1.5 text-accent" />
                <span className="font-medium">{property.plot_size}m²</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
