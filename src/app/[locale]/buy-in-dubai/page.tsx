'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";

const BenefitCard = ({ title, text, icon: Icon }: { title: string, text: string, icon: React.ElementType }) => (
  <div className="flex items-start gap-4">
    <Icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
    <div>
      <h4 className="font-headline font-semibold text-lg mb-1">{title}</h4>
      <p className="text-muted-foreground">{text}</p>
    </div>
  </div>
);

export default async function BuyInDubaiPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background"
    >
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            
            <h3 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">
              {dict.buyInDubai.title}
            </h3>

            <div className="my-12 flex justify-center">
              <Image 
                src="/dubai.jpg" 
                alt="Buy in Dubai and surroundings" 
                width={800} height={400} 
                className="rounded-lg shadow-md" 
              />
            </div>
            
            <p>{dict.buyInDubai.intro}</p>

            <h2 className="font-headline text-2xl mt-12 mb-6">
              {dict.buyInDubai.whyTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 not-prose">
              {dict.buyInDubai.benefits.map((benefit: any) => (
                <BenefitCard key={benefit.title} title={benefit.title} text={benefit.text} icon={CheckCircle} />
              ))}
            </div>

            <h2 className="font-headline text-2xl mt-12 mb-6">
              {dict.buyInDubai.processTitle}
            </h2>
            <p>{dict.buyInDubai.processIntro}</p>
            <ol>
              {dict.buyInDubai.processSteps.map((step: any, idx: number) => (
                <li key={idx}>
                  <strong>{step.title}:</strong> {step.text}
                </li>
              ))}
            </ol>

            <div className="my-12 flex justify-center">
              <Image 
                src="/dubai2.jpg" 
                alt="Buy in Dubai and surroundings" 
                width={800} height={400} 
                className="rounded-lg shadow-md" 
              />
            </div>

            <h2 className="font-headline text-2xl mt-12 mb-6">
              {dict.buyInDubai.costsTitle}
            </h2>
            <p>{dict.buyInDubai.costsIntro}</p>
            <ul>
              {dict.buyInDubai.costsList.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <p className="mt-8 italic">
              {dict.buyInDubai.closingNote} <a href="/contact">Contact us today</a>.
            </p>

          </div>
        </div>
      </div>
    </motion.div>
  );
}