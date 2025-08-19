'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";  // Import the useRouter hook
import { notFound } from "next/navigation";
import { ImageSlideshow } from "@/components/image-slideshow";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BedDouble, Bath, MapPin, Home, Ruler, LandPlot, Calendar, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";

type Property = {
  id: number;
  title: string;
  location: string;
  list_price: number;
  priceType?: string;
  bedrooms: number;
  bathrooms: number;
  built_size: number;
  plot_size: number;
  buildYear?: string;
  terrace?: boolean;
  property_type?: string;
  town?: string;
  province?: string;
  description?: { lang: string; description: string }[];
  images: { url: string }[];
  aiHints?: string[];
  ref: string;
  promotion_video?: string | null;
};

const FeatureItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) => (
  <div className="flex items-start p-3 rounded-lg transition-colors hover:bg-secondary/50">
    <Icon className="h-6 w-6 mr-4 mt-1 text-accent flex-shrink-0" />
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

export default function PropertyDetailPage({ params, dict }: { params: { ref: string }, dict: any }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useRouter(); // Extract current locale from URL

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const hostname = window.location.hostname;
        const domainToRealestate: Record<string, string> = {
          "localhost": "costalux",
          "www.costaluxestatesweb.onrender.com": "costalux",
          "costaluxestatesweb.onrender.com": "costalux",
          "www.costaluxestates.com": "costalux",
          "costaluxestates.com": "costalux",
        };
        const realestate = domainToRealestate[hostname] || "costalux";

        const res = await fetch(
          `https://api.habigrid.com/api/public/properties/${params.ref}?realestate=${realestate}`
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (!data) {
          notFound();
        } else {
          setProperty(data);
        }
      } catch (err) {
        console.error("Failed to load property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.ref]);

  if (loading) {
    return <div className="text-center py-12">{dict.property.loading}</div>;
  }

  if (!property) {
    return <div className="text-center py-12 text-red-500">{dict.property.notFound}</div>;
  }

  // Determine the dynamic language-specific URL
  const languageLink = `/${locale === "es" ? "es" : "en"}/cost-of-buying-in-spain`; // Example for English and Spanish URLs

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary font-body"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">

        {/* Promotion Video */}
        {property.promotion_video && (
          <div className="mb-8 aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={property.promotion_video.includes("youtube.com") || property.promotion_video.includes("youtu.be")
                ? property.promotion_video.replace("watch?v=", "embed/")
                : property.promotion_video}
              title={dict.property.promotionVideo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Images */}
        <div className="mb-8">
          <ImageSlideshow
            images={Array.isArray(property.images) ? property.images.map((img) => img.url) : []}
            title={property.title}
            aiHints={property.aiHints}
          />
        </div>

        {/* Property Info */}
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
                      {property.priceType === 'from' && dict.property.from + " "}
                      {property.list_price
                        ? `€${Number(property.list_price).toLocaleString('de-DE')}`
                        : dict.property.noPrice}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-6">
                  <h2 className="font-headline text-xl font-bold mb-4">{dict.property.features}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                    <FeatureItem icon={Ruler} label={dict.property.size} value={property.built_size} />
                    <FeatureItem icon={BedDouble} label={dict.property.bedrooms} value={property.bedrooms} />
                    <FeatureItem icon={Bath} label={dict.property.bathrooms} value={property.bathrooms} />
                    <FeatureItem icon={Home} label={dict.property.type} value={property.property_type} />
                    <FeatureItem icon={LandPlot} label={dict.property.plotSize} value={property.plot_size > 0 ? property.plot_size : 'N/A'} />
                    <FeatureItem icon={Calendar} label={dict.property.buildYear} value={property.buildYear ?? 'N/A'} />
                    <FeatureItem icon={Sun} label={dict.property.terrace} value={property.terrace ? dict.common.yes : dict.common.no} />
                    <FeatureItem icon={MapPin} label={dict.property.town} value={property.town} />
                    <FeatureItem icon={MapPin} label={dict.property.area} value={property.province} />
                  </div>
                </div>

                <Separator className="my-8" />

                <div className="mt-6 text-foreground/90 leading-relaxed">
                  <h2 className="font-headline text-xl font-bold mb-4">{dict.property.description}</h2>
                  <p>
                    {Array.isArray(property.description)
                      ? property.description.find((d) => d.lang === "en")?.description || dict.property.noEnglishDesc
                      : dict.property.noDescription}
                  </p>

                  <div className="mt-6">
                    <a
                      href={languageLink}  {/* Dynamically set the language URL */}
                      className="text-primary font-semibold underline hover:text-primary/80"
                    >
                      {dict.property.learnMore}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm 
                dict={dict}
                propertyRef={property.ref}
                propertyTitle={property.title}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
