"use client"; // 👈 required for hooks

import { useEffect, useState, useRef, Suspense } from "react";
import { FeaturedPropertyCard } from "@/components/featured-property-card";
import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, VolumeX, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

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
  aiHints?: string[];
  images: { url: string; order: number }[];
};

export default function HomeClient({ dict, locale }: { dict: any; locale: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const realestate = "costalux";
        const [latestRes, featuredRes] = await Promise.all([
          fetch(
            `https://api.habigrid.com/api/public/properties?realestate=costalux&limit=10&page=1&latestOnly=true&imageLimit=3`
          ),
          fetch(
            `https://api.habigrid.com/api/public/properties/featured?realestate=${realestate}`
          ),
        ]);
        const latestData = await latestRes.json();
        const featuredData = await featuredRes.json();
        setProperties(latestData.properties || []);
        setFeaturedProperties(featuredData.properties || []);
      } catch (e) {
        console.error("Failed to fetch properties:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-body overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden py-16 sm:py-24">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          >
            <source src="/background-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/40" />

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="absolute z-10 bottom-4 right-4 text-white hover:bg-white/20 hover:text-white"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>

        <div className="relative z-10 container mx-auto px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="font-body text-2xl md:text-3xl font-bold mb-4">
              {dict.page.home.heroTitle}
            </h1>
            <p className="text-lg md:text-xl max-w-5xl mx-auto mb-8">
              {dict.page.home.heroSubtitle}
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 container mx-auto px-4 mt-8 w-full">
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchModule showListingType={true} dict={dict} />
          </Suspense>
        </div>
      </section>

      {/* Featured */}
      <section className="pt-12 md:pt-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-2xl md:text-2xl font-bold">
              {dict.page.home.featuredTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 3).map((property) => (
              <FeaturedPropertyCard key={property.id} property={property} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-2xl md:text-2xl font-bold">
              {dict.page.home.latestTitle}
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {properties.slice(0, 10).map((property) => (
              <div key={property.id} className="w-[350px]">
                <PropertyCard property={property} dict={dict} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New builds */}
      <section className="pb-12 md:pb-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="relative rounded-lg overflow-hidden bg-cover bg-center p-8 md:p-12 min-h-[400px] flex items-center"
            style={{
              backgroundImage:
                "url('https://media-feed.resales-online.com/live/ShowFeedImage.asp?SecId=cuzsrpzyg6rxh6z&Id=P1&ImgId=X1009636&z=1753335295')",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 md:w-1/2 text-white">
              <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">
                {dict.page.home.newBuildsTitle}
              </h2>
              <p className="mb-4">{dict.page.home.newBuildsSubtitle}</p>
              <p className="mb-6">{dict.page.home.newBuildsSubtitle2}</p>
              <Link href={`/${locale}/new-builds`}>
                <Button
                  size="lg"
                  className="text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105"
                >
                  {dict.page.home.newBuildsCta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
