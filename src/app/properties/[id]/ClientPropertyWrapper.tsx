'use client';

import dynamic from 'next/dynamic';

// Use dynamic import inside a client boundary
const ClientPropertyView = dynamic(() => import("./ClientPropertyView"), {
  ssr: false,
});

export default function ClientPropertyWrapper({ property }: { property: any }) {
  return <ClientPropertyView property={property} />;
}