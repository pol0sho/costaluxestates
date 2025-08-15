// src/app/properties/page.tsx
'use client';

import { Suspense } from "react";
import PropertiesPageClient from "./PropertiesPageClient";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading properties...</div>}>
      <PropertiesPageClient />
    </Suspense>
  );
}