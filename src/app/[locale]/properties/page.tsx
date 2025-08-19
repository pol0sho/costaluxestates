import { Suspense } from "react";
import PropertiesPageClient from "./PropertiesPageClient";
import { getDictionary } from "@/lib/dictionaries";

export default async function PropertiesPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);

  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          {dict.properties.loading || "Loading properties..."}
        </div>
      }
    >
      <PropertiesPageClient dict={dict} />
    </Suspense>
  );
}