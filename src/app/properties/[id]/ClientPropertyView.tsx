'use client';
import { notFound } from "next/navigation";
import { ImageSlideshow } from "@/components/image-slideshow";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BedDouble, Bath, MapPin, Home, Ruler, LandPlot, Calendar, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { formatPrice } from "@/utils/formatPrice";

type FeatureProps = {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
};

const FeatureItem = ({ icon: Icon, label, value }: FeatureProps) => (
  <div className="flex items-start p-3 rounded-lg transition-colors hover:bg-secondary/50">
    <Icon className="h-6 w-6 mr-4 mt-1 text-accent flex-shrink-0" />
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

export default function ClientPropertyView({ property }: { property: any }) {
  if (!property) {
    notFound();
  }

  // Transform images: sort by order and map to URLs only
  const imageUrls = Array.isArray(property.images)
    ? property.images
        .slice() // copy to avoid mutating original array
        .sort((a, b) => a.order - b.order)
        .map((img) => img.url)
    : [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary font-body"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <ImageSlideshow images={imageUrls} title={property.title} aiHints={property.aiHints} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h1 className="font-headline text-2xl md:text-3xl font-bold">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="h-5 w-5 mr-2 text-accent" />
                      <span>{property.town}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-2 md:mt-0">
                    <Badge className="text-2xl font-bold bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 border-2 py-2 px-4">
                      {property.priceType === 'from' && 'From '}
                      {formatPrice(property.list_price)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-6">
                  <h2 className="font-headline text-xl font-bold mb-4">Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                    <FeatureItem icon={Home} label="Property Type" value={property.property_type} />
                    <FeatureItem icon={BedDouble} label="Bedrooms" value={property.bedrooms} />
                    <FeatureItem icon={Bath} label="Bathrooms" value={property.bathrooms} />
                    <FeatureItem icon={Ruler} label="Size (m²)" value={property.built_size} />
                    <FeatureItem icon={LandPlot} label="Plot Size (m²)" value={property.plot_size > 0 ? property.plot_size : 'N/A'} />
                    <FeatureItem icon={Calendar} label="Build Year" value={property.buildYear} />
                    <FeatureItem icon={Sun} label="Terrace" value={property.terrace ? 'Yes' : 'No'} />
                    <FeatureItem icon={MapPin} label="Town" value={property.town} />
                    <FeatureItem icon={MapPin} label="Area" value={property.province} />
                  </div>
                </div>
                <Separator className="my-8" />
                <div className="mt-6 text-foreground/90 leading-relaxed">
                  <h2 className="font-headline text-xl font-bold mb-4">Description</h2>
                  <p>
                    {Array.isArray(property.description)
                      ? property.description.find((d: any) => d.lang === "en")?.description || "No description available"
                      : property.description || "No description available"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm
                title="Interested in this property?"
                description={`Contact us for more information about this property (Ref: ${property.ref})`}
                buttonText="Send Inquiry"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}