
'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function CostOfBuyingInSpainPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background">
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="prose prose-lg mx-auto">
                <h3 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">Purchase costs for property in Spain</h3>

                <div className="my-12">
                    <Image src="https://www.idiliqhotels.com/wp-content/uploads/2023/07/costa-del-sol-spain-beach-family-holidays-1920.webp" alt="A sunny beach on the Costa del Sol" width={800} height={400} className="rounded-lg shadow-md" data-ai-hint="beach Costa del Sol" />
                </div>

                
                <p>The costs of purchasing a property in Spain vary depending on whether you are buying a brand new or an existing property. If it is a brand new property from the developer, you will have to pay VAT. If it is a resale property, you will have to pay ITP. Both cannot be applied at the same time. The costs also vary depending on the type of property, region, purchase price, payment terms, etc.</p>

                <br></br><p>The purchase costs of Spanish property typically range from <strong>9 to 14% of the sale price</strong>. Depending on the property a buyer purchases and the region, prices can vary significantly, as we mentioned earlier.</p>
                
                <p>Below are all the costs and taxes listed in detail:</p><br></br>
                <ul>
                    <li>VAT (IVA) in Spain</li>
                    <li>Transfer tax (ITP)</li>
                    <li>Stamp duty or Legal Documentation Tax (AJD)</li>
                    <li>Lawyer's fees</li>
                    <li>Notary fees</li>
                    <li>Land registry</li>
                </ul>


                <h2 className="font-headline text-2xl mt-12 mb-6">Detailed explanation of costs and fees</h2>
                
                <h3 className="font-headline text-xl mt-8 mb-4">1. VAT (IVA) in Spain</h3>
                <p>A brand new property is one that has never been sold before; in this situation, it is usually sold directly by the developer. If it is brand new, the tax is VAT. With the exception of the Canary Islands, all regions of Spain apply 10% VAT on the purchase of a brand new home. On the purchase of land and commercial properties, VAT is 21%. Parking spaces with separate title deeds are subject to 21% VAT, as they are considered commercial property. <em>(Impuesto sobre el Valor Añadido)</em></p>

                <h3 className="font-headline text-xl mt-8 mb-4">2. Transfer tax (ITP)</h3>
                <p>If you buy a second-hand home, you will have to pay ITP tax. This is usually between 7% and 10%. It can vary depending on the value of the property or the autonomous region. <em>(Impuesto sobre Transmisiones Patrimoniales)</em></p>

                <h3 className="font-headline text-xl mt-8 mb-4">3. Stamp duty or Legal Documentation Tax (AJD)</h3>
                <p>This is a tax you pay on all documents that must be notarised. The cost can vary between 1.2% and 1.5%. This may vary depending on the autonomous region. It is applied to the sale of land and brand new properties or when a mortgage is used for second-hand properties. If you buy a second-hand property without a bank loan, this tax is not applied. <em>(Actos Jurídicos Documentados)</em></p>

                <h3 className="font-headline text-xl mt-8 mb-4">4. Solicitor's fees</h3>
                <p>Solicitors usually charge 1% + VAT. Although working with a solicitor for the purchase of property in Spain is not legally required, we strongly recommend it to ensure that the process runs smoothly.</p>
                <p>Especially if you work with a real estate company with corporate lawyers specialising in the real estate sector, your entire process will be extremely comfortable and easy, as they will explain all the essential steps and help you prepare documents.</p>
                <p>In addition, you can give them power of attorney so that they can act on your behalf and you do not have to be present during the purchase process.</p>
                
                <h3 className="font-headline text-xl mt-8 mb-4">5. Notary fees</h3>
                <p>When drawing up a purchase agreement at the Land Registry, the agreement must be signed before a notary. This usually costs around €1,000-€1,500.</p>
                
                <h3 className="font-headline text-xl mt-8 mb-4">6. Land Registry</h3>
                <p>A title deed registration usually costs around €750. This may vary depending on the purchase price of the property.</p>

                <div className="my-12">
                     <Image src="https://www.theolivepress.es/wp-content/uploads/2023/05/rental-AdobeStock_480022420-1-scaled.jpeg" alt="papers and documents and a key laid on a table" width={800} height={400} className="rounded-lg shadow-md" data-ai-hint="documents keys" />
                </div>
                
                <h2 className="font-headline text-2xl mt-12 mb-6">Obtaining a mortgage for Spanish property</h2>
                <p>In addition to all the above-mentioned costs for buying a house in Spain, taking out a mortgage also entails some additional mortgage costs. Notary fees will also increase.</p>
                
                <h4 className="font-headline text-lg mt-6 mb-2">Valuation</h4>
                <p>The costs are determined by the valuation agency and the purchase price. This is usually between €350 and €600.</p>
                <p>A property valuation is a must in order to obtain a mortgage in Spain. The valuation report must be drawn up by a registered valuation company. The actual value of the property is determined by the report and a certain portion of this value is used to calculate the mortgage amount.</p>
                
                <h4 className="font-headline text-lg mt-6 mb-2">Payment fees</h4>
                <p>Depending on the bank, this can vary from 0% to 1%.</p>
                
                <p className="mt-8"><em>The above-mentioned costs for purchasing property in Spain are averages. You can obtain the exact prices from TEKCE professionals. You can contact us now or visit our nearest office for more information.</em></p>
              
            </div>
        </div>
      </div>
    </motion.div>
  );
}
