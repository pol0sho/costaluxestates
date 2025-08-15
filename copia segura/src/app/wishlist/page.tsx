'use client'
import { SearchModule } from "@/components/search-module";
import { WishlistForm } from "@/components/wishlist-form";
import { motion } from "framer-motion";

export default function WishlistPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background">
       <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center text-center bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}} data-ai-hint="dream home">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">Define Your Dream Property</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Tell us what you're looking for, and we'll help you find it.
          </p>
        </div>
      </section>
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <WishlistForm />
        </div>
      </div>
    </motion.div>
  );
}
