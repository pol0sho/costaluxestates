'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type ImageSlideshowProps = {
  images: string[];
  title: string;
  aiHints?: string[]; // <-- make optional to prevent build error
};

export function ImageSlideshow({ images, title, aiHints = [] }: ImageSlideshowProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.isArray(images) && images.map((src, index) => (
          <CarouselItem key={index}>
            <Card className="border-none rounded-lg overflow-hidden">
              <CardContent className="flex aspect-[16/9] items-center justify-center p-0">
                <Image
                  src={src}
                  alt={`${title} - image ${index + 1}`}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  data-ai-hint={aiHints?.join(' ') || ''}
                  priority={index === 0}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
