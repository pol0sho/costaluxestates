import { getDictionary } from "@/lib/dictionaries";
import { FeaturedPropertyCard } from "@/components/featured-property-card";
import { PropertyCard } from "@/components/property-card";
import { SearchModule } from "@/components/search-module";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// server component
export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);

  // ✅ dict.page.home.* is now available
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-body overflow-x-hidden"
    >
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[500px] flex flex-col items-center justify-center text-center py-16 sm:py-24">
        <div className="relative z-10 container mx-auto px-4 text-white">
          <h1 className="font-body text-2xl md:text-3xl font-bold mb-4">
            {dict.page.home.heroTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-5xl mx-auto mb-8">
            {dict.page.home.heroSubtitle}
          </p>
        </div>
        <div className="relative z-10 container mx-auto px-4 mt-8 w-full">
          <SearchModule showListingType={true} />
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
            {/* You’ll still fetch your properties here (client or server) */}
            {/* <FeaturedPropertyCard property={...}/> */}
          </div>
        </div>
      </section>

      {/* New Builds */}
      <section className="pb-12 md:pb-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-lg bg-cover bg-center p-8 md:p-12 min-h-[400px] flex items-center"
               style={{ backgroundImage: "url('/some-image.jpg')" }}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 md:w-1/2 text-white">
              <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">
                {dict.page.home.newBuildsTitle}
              </h2>
              <p className="mb-4">{dict.page.home.newBuildsSubtitle}</p>
              <p className="mb-6">{dict.page.home.newBuildsSubtitle2}</p>
              <Link href={`/${params.locale}/new-builds`}>
                <Button size="lg" className="bg-accent hover:bg-accent/90">
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
