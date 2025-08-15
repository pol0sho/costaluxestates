'use client'
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background">
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="prose prose-lg mx-auto">
                <h1 className="font-headline text-3xl md:text-4xl font-bold text-center mb-2">Privacy Policy</h1>
                <p className="text-center text-muted-foreground mb-12">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>
                <p>Costaluxestates ("us", "we", or "our") operates the costaluxestates.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We are committed to protecting your privacy in compliance with the General Data Protection Regulation (GDPR).</p>

                <h2 className="font-headline text-xl mt-8 mb-4">1. Information Collection and Use</h2>
                <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                <h3>Types of Data Collected:</h3>
                <ul>
                    <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: email address, name, phone number, and property preferences (e.g., via our contact or wishlist forms).</li>
                    <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
                </ul>

                <h2 className="font-headline text-xl mt-8 mb-4">2. Use of Data</h2>
                <p>Costaluxestates uses the collected data for various purposes:</p>
                <ul>
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about properties that match your criteria</li>
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To gather analysis or valuable information so that we can improve our Service</li>
                    <li>To monitor the usage of our Service</li>
                    <li>To detect, prevent and address technical issues</li>
                </ul>

                <h2 className="font-headline text-xl mt-8 mb-4">3. Legal Basis for Processing Personal Data Under GDPR</h2>
                <p>If you are from the European Economic Area (EEA), Costaluxestates' legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it. We process your Personal Data because we need to perform a contract with you, you have given us permission to do so, the processing is in our legitimate interests and it's not overridden by your rights, or to comply with the law.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">4. Your Data Protection Rights Under GDPR</h2>
                <p>If you are a resident of the EEA, you have certain data protection rights. Costaluxestates aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. You have the right to access, update, or delete the information we have on you. You also have the right to data portability, the right to object, and the right of restriction.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">5. Data Security</h2>
                <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                
                <h2 className="font-headline text-xl mt-8 mb-4">6. Service Providers</h2>
                <p>We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

                <h2 className="font-headline text-xl mt-8 mb-4">7. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us through our <Link href="/contact">contact page</Link>.</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
