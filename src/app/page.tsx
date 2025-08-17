'use client';

import { useEffect, useState, useRef } from "react";
import { FeaturedPropertyCard } from "@/components/featured-property-card";
import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, VolumeX, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense } from "react";

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
  images: string[];
};



const AnimatedSection = ({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const animationClasses = {
    up: "translate-y-10",
    left: "-translate-x-10",
    right: "translate-x-10",
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${animationClasses[direction]}`
      }`}
    >
      {children}
    </div>
  );
};

const Scroller = ({ children }: { children: React.ReactNode }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const childrenArray = Array.from(scroller.children);
      childrenArray.forEach((child) => {
        const clone = child.cloneNode(true);
        (clone as HTMLElement).setAttribute("aria-hidden", "true");
        scroller.appendChild(clone);
      });
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
      <div
        ref={scrollerRef}
        className="flex min-w-max flex-nowrap gap-4 scroller"
      >
        {children}
      </div>
    </div>
  );
};

export default function Home() {
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
          `https://api.habigrid.com/api/public/properties?realestate=${realestate}&limit=10&page=1&latestOnly=true`
        ),
        fetch(
          `https://api.habigrid.com/api/public/properties/featured?realestate=${realestate}`
        ),
      ]);

      const latestData = await latestRes.json();
      const featuredData = await featuredRes.json();

      const latest = Array.isArray(latestData.properties)
        ? latestData.properties
        : [];

      // ✅ Normalize images here
      const featured = Array.isArray(featuredData.properties)
        ? featuredData.properties.map((p: any) => ({
            ...p,
            images: Array.isArray(p.images)
              ? p.images.map((img: any) => img.url)
              : [],
          }))
        : [];

      setProperties(latest);
      setFeaturedProperties(featured);
    } catch (e) {
      console.error("Failed to fetch properties:", e);
      setProperties([]);
      setFeaturedProperties([]);
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
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="absolute z-10 bottom-4 right-4 text-white hover:bg-white/20 hover:text-white"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6" />
          ) : (
            <Volume2 className="h-6 w-6" />
          )}
        </Button>
        <div className="relative z-10 container mx-auto px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="font-body text-2xl md:text-3xl font-bold mb-4">
              Welcome to CostaLux Estates
            </h1>
            <p className="text-lg md:text-xl max-w-5xl mx-auto mb-8">
              Your trusted partner for exclusive real estate on the Costa del
              Sol. <br />
              Whether you're looking for a luxury villa, a charming apartment,
              or an investment opportunity, we guide you every step of the way
              -- with integrity, dedication, and local expertise. <br /> <br />
              We speak 5 languages (English, Spanish, Dutch, French and German)
              to make sure you feel at home from the very first conversation.
            </p>
          </motion.div>
        </div>
        <div className="relative z-10 container mx-auto px-4 mt-8 w-full">
          <Suspense fallback={<div>Loading search...</div>}>
          <SearchModule showListingType={true} />
          </Suspense>
        </div>
      </section>

{/* Featured Properties */}
<AnimatedSection className="pt-12 md:pt-16 bg-secondary">
  <div className="container mx-auto px-4 md:px-6">
    <div className="text-center mb-12">
      <h2 className="font-headline text-2xl md:text-2xl font-bold">
        Featured Properties
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProperties.slice(0, 3).map((property, i) => (
        <AnimatedSection
          key={property.id}
          className="transition-all duration-500"
          style={{ transitionDelay: `${i * 150}ms` } as React.CSSProperties}
        >
          <FeaturedPropertyCard property={property} />
        </AnimatedSection>
      ))}
    </div>
  </div>
</AnimatedSection>

      {/* Latest Properties */}
      <AnimatedSection direction="right" className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-2xl md:text-2xl font-bold">
              Latest Properties
            </h2>
          </div>
          <Scroller>
            {properties.slice(0, 10).map((property) => (
              <div key={property.id} className="w-[350px]">
                <PropertyCard property={property} />
              </div>
            ))}
          </Scroller>
        </div>
      </AnimatedSection>

      {/* New Build Projects */}
      <section className="pb-12 md:pb-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection direction="left">
            <div
              className="relative rounded-lg overflow-hidden bg-cover bg-center p-8 md:p-12 min-h-[400px] flex items-center"
              style={{
                backgroundImage:
                  "url('https://media-feed.resales-online.com/live/ShowFeedImage.asp?SecId=cuzsrpzyg6rxh6z&Id=P1&ImgId=X1009636&z=1753335295')",
              }}
              data-ai-hint="modern architecture sketch"
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 md:w-1/2 text-white">
                <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">
                  Discover New Build Projects
                </h2>
                <p className="mb-4">
                  We offer exclusive access to the latest and most prestigious
                  new build projects on the Costa del Sol. Explore modern
                  designs, state-of-the-art amenities, and prime locations.
                </p>
                <p className="mb-6">
                  From contemporary villas to luxury apartment complexes, let us
                  help you find your perfect, brand-new home in the sun.
                </p>
                <Link href="/new-builds">
                  <Button
                    size="lg"
                    className="text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105"
                  >
                    See all New Builds
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
}