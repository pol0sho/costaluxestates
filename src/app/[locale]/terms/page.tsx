'use client'
import { motion } from "framer-motion";

export default function TermsPage({ dict }: { dict: any }) {
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
            {/* Title */}
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-center mb-2">
              {dict.terms.title}
            </h1>

            {/* Last Updated */}
            <p className="text-center text-muted-foreground mb-12">
              {dict.terms.lastUpdated}: {new Date().toLocaleDateString()}
            </p>

            {/* Intro */}
            <p>{dict.terms.intro}</p>

            {/* 1. Definitions */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              1. {dict.terms.sections.definitions.title}
            </h2>
            <p>{dict.terms.sections.definitions.body}</p>

            {/* 2. Use of the Website */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              2. {dict.terms.sections.use.title}
            </h2>
            <p>{dict.terms.sections.use.body}</p>

            {/* 3. Property Listings */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              3. {dict.terms.sections.listings.title}
            </h2>
            <p>{dict.terms.sections.listings.body}</p>

            {/* 4. Intellectual Property */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              4. {dict.terms.sections.ip.title}
            </h2>
            <p>{dict.terms.sections.ip.body}</p>

            {/* 5. User Accounts */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              5. {dict.terms.sections.accounts.title}
            </h2>
            <p>{dict.terms.sections.accounts.body}</p>

            {/* 6. Limitation of Liability */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              6. {dict.terms.sections.liability.title}
            </h2>
            <p>{dict.terms.sections.liability.body}</p>

            {/* 7. Governing Law */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              7. {dict.terms.sections.law.title}
            </h2>
            <p>{dict.terms.sections.law.body}</p>

            {/* 8. Changes to Terms */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              8. {dict.terms.sections.changes.title}
            </h2>
            <p>{dict.terms.sections.changes.body}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
