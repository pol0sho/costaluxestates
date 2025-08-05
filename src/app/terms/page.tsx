'use client'
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background">
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="prose prose-lg mx-auto">
                <h1 className="font-headline text-3xl md:text-4xl font-bold text-center mb-2">Terms & Conditions</h1>
                 <p className="text-center text-muted-foreground mb-12">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>
                <p>Welcome to Costaluxestates. These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Costaluxestates if you do not agree to all of the terms and conditions stated on this page.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">1. Definitions</h2>
                <p>"The Company", "Ourselves", "We", "Our" and "Us", refers to Costaluxestates. "Party", "Parties", or "Us", refers to both the Client and ourselves. "Website" refers to costaluxestates.com.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">2. Use of the Website</h2>
                <p>You agree to use this Website for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">3. Property Listings</h2>
                <p>The property information on this website is provided by us or third parties and is for guidance only. We do not guarantee the accuracy of any information on the site. Property details do not form part of any contract. It is the user's responsibility to verify all information before making any decisions based on it.</p>
                
                <h2 className="font-headline text-xl mt-8 mb-4">4. Intellectual Property</h2>
                <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">5. User Accounts and Content</h2>
                <p>If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. Any content you provide, such as in wishlists or contact forms, must be accurate and not misleading. By submitting content, you grant us a non-exclusive, royalty-free license to use, reproduce, and distribute it in connection with our service.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">6. Limitation of Liability</h2>
                <p>To the fullest extent permitted by Spanish law, Costaluxestates will not be liable for any indirect or consequential loss or damage whatever arising out of or in connection with the use of the Website. We do not guarantee that the website will be secure or free from bugs or viruses.</p>
                
                <h2 className="font-headline text-xl mt-8 mb-4">7. Governing Law</h2>
                <p>These terms and conditions shall be governed by and construed in accordance with the law of Spain and you hereby submit to the exclusive jurisdiction of the Spanish courts.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">8. Changes to Terms</h2>
                <p>We reserve the right to change these terms and conditions at any time. We will post any changes on this page. Your continued use of this site after any change in this policy will constitute your acceptance of such change.</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
