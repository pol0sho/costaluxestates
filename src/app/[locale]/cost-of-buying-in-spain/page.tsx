'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { getDictionary } from "../../../lib/dictionaries";

export default async function CostOfBuyingInSpainPage({ params }: { params: { lang: string } }) {
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
              {dict.costOfBuying.title}
            </h3>

            <div className="my-12">
              <Image 
                src="https://www.idiliqhotels.com/wp-content/uploads/2023/07/costa-del-sol-spain-beach-family-holidays-1920.webp" 
                alt="A sunny beach on the Costa del Sol" 
                width={800} height={400} 
                className="rounded-lg shadow-md"
              />
            </div>

            <p dangerouslySetInnerHTML={{ __html: dict.costOfBuying.intro1 }} />
            <p dangerouslySetInnerHTML={{ __html: dict.costOfBuying.intro2 }} />
            <p>{dict.costOfBuying.listIntro}</p>

            <ul>
              <li>{dict.costOfBuying.list.vat}</li>
              <li>{dict.costOfBuying.list.itp}</li>
              <li>{dict.costOfBuying.list.ajd}</li>
              <li>{dict.costOfBuying.list.lawyer}</li>
              <li>{dict.costOfBuying.list.notary}</li>
              <li>{dict.costOfBuying.list.registry}</li>
            </ul>

            <h2 className="font-headline text-2xl mt-12 mb-6">
              {dict.costOfBuying.detailsTitle}
            </h2>

            <h3 className="font-headline text-xl mt-8 mb-4">
              {dict.costOfBuying.vatTitle}
            </h3>
            <p>{dict.costOfBuying.vatBody}</p>

            <h3 className="font-headline text-xl mt-8 mb-4">
              {dict.costOfBuying.itpTitle}
            </h3>
            <p>{dict.costOfBuying.itpBody}</p>

            <h3 className="font-headline text-xl mt-8 mb-4">
              {dict.costOfBuying.ajdTitle}
            </h3>
            <p>{dict.costOfBuying.ajdBody}</p>

            <h3 className="font-headline text-xl mt-8 mb-4">
              {dict.costOfBuying.lawyerTitle}
            </h3>
            <p>{dict.costOfBuying.lawyerBody1}</p>
            <p>{dict.costOfBuying.lawyerBody2}</p>
            <p>{dict.costOfBuying.lawyerBody3}</p>

            <h3 className="font-headline text-xl mt-8 mb-4">
              {dict.costOfBuying.notaryTitle}
            </h3>
            <p>{dict.costOfBuying.notaryBody}</p>

            <h3 className="font-headline text-xl mt-8 mb-4">
              {dict.costOfBuying.registryTitle}
            </h3>
            <p>{dict.costOfBuying.registryBody}</p>

            <div className="my-12">
              <Image 
                src="https://www.theolivepress.es/wp-content/uploads/2023/05/rental-AdobeStock_480022420-1-scaled.jpeg" 
                alt="papers and documents and a key laid on a table" 
                width={800} height={400} 
                className="rounded-lg shadow-md" 
              />
            </div>

            <h2 className="font-headline text-2xl mt-12 mb-6">
              {dict.costOfBuying.mortgageTitle}
            </h2>
            <p>{dict.costOfBuying.mortgageBody}</p>

            <h4 className="font-headline text-lg mt-6 mb-2">
              {dict.costOfBuying.valuationTitle}
            </h4>
            <p>{dict.costOfBuying.valuationBody1}</p>
            <p>{dict.costOfBuying.valuationBody2}</p>

            <h4 className="font-headline text-lg mt-6 mb-2">
              {dict.costOfBuying.paymentFeesTitle}
            </h4>
            <p>{dict.costOfBuying.paymentFeesBody}</p>

            <p className="mt-8 italic">
              {dict.costOfBuying.closingNote}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
