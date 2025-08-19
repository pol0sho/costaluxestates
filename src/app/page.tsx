import { getDictionary } from "@/lib/dictionaries";
import HomeClient from "@/components/home-client"; // 👈 new file

export default async function Home({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale);

  return (
    <HomeClient
      locale={params.locale}
      dict={dict}
    />
  );
}