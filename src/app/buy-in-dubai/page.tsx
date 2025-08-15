
'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const benefits = [
    { title: "High Return on Investment", text: "Dubai's property market is known for its strong rental yields and potential for capital appreciation, making it a lucrative option for investors." },
    { title: "Tax-Free Environment", text: "Enjoy the benefits of zero income tax on rental returns and no annual property taxes, maximizing your investment's profitability." },
    { title: "UAE Golden Visa", text: "Property investment can be a direct pathway to securing a long-term residency visa, offering stability and access to the UAE's world-class services." },
    { title: "Unmatched Lifestyle & Safety", text: "Experience a luxurious lifestyle in one of the world's safest cities, with unparalleled amenities, entertainment, and a multicultural environment." },
    { title: "Stable Economy & Pro-Investor Policies", text: "The UAE's robust economy and government initiatives to protect investors create a secure and transparent real estate market." },
    { title: "Global Hub Location", text: "Strategically located at the crossroads of Europe, Asia, and Africa, Dubai offers excellent global connectivity for business and travel." }
]

const BenefitCard = ({ title, text, icon: Icon }: { title: string, text: string, icon: React.ElementType }) => (
    <div className="flex items-start gap-4">
        <Icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
        <div>
            <h4 className="font-headline font-semibold text-lg mb-1">{title}</h4>
            <p className="text-muted-foreground">{text}</p>
        </div>
    </div>
)

export default function BuyInDubaiPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background">
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="prose prose-lg mx-auto">
                <h3 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">Your Gateway to Luxury Real Estate in Dubai</h3>

                <div className="my-12 flex justify-center">
                    <Image src="https://placehold.co/800x400.png" alt="Dubai Skyline" width={800} height={400} className="rounded-lg shadow-md" data-ai-hint="Dubai skyline" />
                </div>
                
                <p>Welcome to Dubai, a global metropolis where futuristic vision meets unparalleled luxury. As one of the world's most dynamic real estate markets, Dubai offers a unique combination of tax-free returns, a world-class lifestyle, and exceptional investment opportunities. Whether you're seeking a high-yield rental property, a luxury holiday home, or a secure long-term investment, Dubai's property market is your gateway to success.</p>

                <h2 className="font-headline text-2xl mt-12 mb-6">Why Invest in Dubai Property?</h2>
                <div className="grid md:grid-cols-2 gap-8 not-prose">
                    {benefits.map(benefit => <BenefitCard key={benefit.title} title={benefit.title} text={benefit.text} icon={CheckCircle} />)}
                </div>


                <h2 className="font-headline text-2xl mt-12 mb-6">The Purchasing Process</h2>
                
                <p>Buying property in Dubai is a straightforward and transparent process, designed to be accessible for international investors. Here are the typical steps:</p>
                <ol>
                    <li><strong>Initial Agreement:</strong> Once you've chosen a property, a Memorandum of Understanding (MOU) or reservation agreement is signed, and a deposit is paid.</li>
                    <li><strong>No Objection Certificate (NOC):</strong> The developer issues an NOC to legally transfer ownership. This is a standard procedure to ensure there are no outstanding dues on the property.</li>
                    <li><strong>Property Registration:</strong> The final step is to register the property with the Dubai Land Department (DLD). Both buyer and seller (or their legal representatives) must be present to sign the contract and complete the transfer.</li>
                    <li><strong>Title Deed Issuance:</strong> Upon completion, the DLD issues the new Title Deed in the buyer's name, confirming legal ownership.</li>
                </ol>

                <div className="my-12 flex justify-center">
                     <Image src="https://placehold.co/800x400.png" alt="Real estate agent shaking hands with client" width={800} height={400} className="rounded-lg shadow-md" data-ai-hint="handshake deal" />
                </div>
                
                <h2 className="font-headline text-2xl mt-12 mb-6">Associated Costs</h2>
                <p>While Dubai is tax-friendly, there are some standard fees associated with a property purchase:</p>
                
                <ul>
                    <li><strong>Dubai Land Department (DLD) Fee:</strong> 4% of the property's purchase price.</li>
                    <li><strong>Registration Fees:</strong> A nominal administrative fee paid to the DLD.</li>
                    <li><strong>Real Estate Agency Fee:</strong> Typically 2% of the purchase price.</li>
                    <li><strong>Developer Fees:</strong> For new-build properties, developers may charge an administration fee for issuing the NOC.</li>
                </ul>
                
                <p className="mt-8"><em>Our expert team is here to guide you through every step of your Dubai property journey. We provide comprehensive support, from property selection to legalities, ensuring a seamless and rewarding investment experience. <a href="/contact">Contact us today</a> to explore exclusive opportunities in Dubai.</em></p>
              
            </div>
        </div>
      </div>
    </motion.div>
  );
}
