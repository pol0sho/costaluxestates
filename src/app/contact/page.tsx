'use client'
import { ContactForm } from "@/components/contact-form";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const ContactInfo = () => (
  <div className="bg-primary text-primary-foreground p-8 rounded-lg shadow-lg h-full flex flex-col justify-center">
    <h2 className="font-headline text-2xl font-bold mb-6">Contact Information</h2>
    <p className="mb-8 text-lg text-primary-foreground/80">
      We're here to help you find your dream home. Reach out to us through any of the channels below.
    </p>
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-accent/20 p-3 rounded-full">
          <Phone className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Phone</h3>
          <a href="tel:+34613824270" className="text-primary-foreground/80 hover:text-accent transition-colors">+34 613 824 270</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-accent/20 p-3 rounded-full">
          <Mail className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Email</h3>
          <a href="mailto:info@costaluxestates.com" className="text-primary-foreground/80 hover:text-accent transition-colors">info@costaluxestates.com</a>
        </div>
      </div>
       <div className="flex items-center gap-4 pt-4">
          <div className="bg-accent/20 p-3 rounded-full">
            <h3 className="font-semibold text-lg text-accent">Socials</h3>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
    </div>
  </div>
);


export default function ContactPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background">
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <ContactInfo />
            </motion.div>
             <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
