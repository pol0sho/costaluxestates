// src/app/[locale]/properties/[ref]/page.tsx
import PropertyDetailPage from "./PropertyDetailPage";
import { getDictionary } from "@/lib/dictionaries";

export default async function PropertyDetailWrapper({ params }: { params: { locale: string; ref: string } }) {
  const dict = await getDictionary(params.locale);

  return <PropertyDetailPage dict={dict} params={{ ref: params.ref }} />;
}