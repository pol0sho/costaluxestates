import NewBuildsPageClient from "./NewBuildsPageClient";
import { getDictionary } from "@/lib/dictionaries";

export default async function NewBuildsPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang);

  return <NewBuildsPageClient dict={dict} />;
}