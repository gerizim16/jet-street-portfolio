import { defineQuery } from "next-sanity";

import SanityImage from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Main() {
  const homeQuery = defineQuery(
    '*[_type == "home"][0].image.asset->{ url, metadata { lqip }}',
  );

  const image = await sanityFetch({
    query: homeQuery,
    tags: ["home"],
  });

  return (
    <div className="relative h-screen max-h-screen w-full">
      <SanityImage fill image={image!} priority quality={100} />
    </div>
  );
}
