'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage({ dict }: { dict: any }) {
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
              {dict.privacy.title}
            </h1>

            {/* Last Updated */}
            <p className="text-center text-muted-foreground mb-12">
              {dict.privacy.lastUpdated}: {new Date().toLocaleDateString()}
            </p>

            {/* Intro */}
            <p>{dict.privacy.intro}</p>

            {/* 1. Information Collection and Use */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              1. {dict.privacy.sections.collection.title}
            </h2>
            <p>{dict.privacy.sections.collection.body}</p>
            <h3>{dict.privacy.sections.collection.typesTitle}</h3>
            <ul>
              <li>
                <strong>{dict.privacy.sections.collection.personalTitle}:</strong>{" "}
                {dict.privacy.sections.collection.personalBody}
              </li>
              <li>
                <strong>{dict.privacy.sections.collection.usageTitle}:</strong>{" "}
                {dict.privacy.sections.collection.usageBody}
              </li>
            </ul>

            {/* 2. Use of Data */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              2. {dict.privacy.sections.use.title}
            </h2>
            <p>{dict.privacy.sections.use.body}</p>
            <ul>
              {dict.privacy.sections.use.points.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {/* 3. Legal Basis */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              3. {dict.privacy.sections.legal.title}
            </h2>
            <p>{dict.privacy.sections.legal.body}</p>

            {/* 4. Data Protection Rights */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              4. {dict.privacy.sections.rights.title}
            </h2>
            <p>{dict.privacy.sections.rights.body}</p>

            {/* 5. Security */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              5. {dict.privacy.sections.security.title}
            </h2>
            <p>{dict.privacy.sections.security.body}</p>

            {/* 6. Service Providers */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              6. {dict.privacy.sections.providers.title}
            </h2>
            <p>{dict.privacy.sections.providers.body}</p>

            {/* 7. Contact */}
            <h2 className="font-headline text-xl mt-8 mb-4">
              7. {dict.privacy.sections.contact.title}
            </h2>
            <p>
              {dict.privacy.sections.contact.body}{" "}
              <Link href="/contact">{dict.privacy.sections.contact.link}</Link>.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}