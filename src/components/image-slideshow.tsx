'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ImageSlideshowProps = {
  images: string[];
  title: string;
  aiHints?: string[];
};

export function ImageSlideshow({ images, title, aiHints = [] }: ImageSlideshowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {/* Normal slideshow */}
      <div className="relative w-full">
        <Carousel className="w-full">
          <CarouselContent>
            {Array.isArray(images) &&
              images.map((img, index) => {
                const src = typeof img === 'string' ? img : img.url;
                return (
                  <CarouselItem key={index}>
                    <Card className="border-none rounded-lg overflow-hidden">
                      <CardContent className="flex aspect-[16/9] items-center justify-center p-0">
                        <Image
                          src={src}
                          alt={`${title} - image ${index + 1}`}
                          width={1200}
                          height={675}
                          unoptimized
                          className="w-full h-full object-cover"
                          data-ai-hint={aiHints?.join(' ') || ''}
                          priority={index === 0}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
<CarouselPrevious className="left-0 md:left-8" />
<CarouselNext className="right-0 md:right-8" />
        </Carousel>

        {/* Fullscreen button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          aria-label="View fullscreen"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close button */}
<button
  onClick={(e) => {
    e.stopPropagation();
    setIsFullscreen(false);
  }}
  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white 
             rounded-full flex items-center justify-center
             min-w-[40px] min-h-[40px]"   // ✅ mobile-friendly touch target
  aria-label="Close fullscreen"
>
  <X className="h-7 w-7" />  {/* ✅ slightly bigger */}
</button>

            {/* Fullscreen carousel */}
            <div
              className="w-full max-w-[90vw]"  // ✅ allow more width on desktop
              onClick={(e) => e.stopPropagation()}
            >
              <Carousel>
                <CarouselContent>
                  {Array.isArray(images) &&
                    images.map((img, index) => {
                      const src = typeof img === 'string' ? img : img.url;
                      return (
                        <CarouselItem key={index}>
                          <div className="flex justify-center items-center h-[90vh]"> {/* ✅ taller fullscreen */}
                            <Image
                              src={src}
                              alt={`${title} - fullscreen image ${index + 1}`}
                              width={1920}
                              height={1080}
                              unoptimized
                              className="object-contain max-h-full max-w-full"
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:left-8" /> {/* ✅ arrows safe spacing */}
                <CarouselNext className="right-2 md:right-8" />
              </Carousel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
