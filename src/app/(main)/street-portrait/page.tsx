import { defineQuery } from "next-sanity";

import Gallery from "@/components/Gallery";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Street() {
  const portraitPortfolioQuery = defineQuery(
    '*[_type == "portrait-portfolio"][0].images[]{_key, asset->{ url, metadata { lqip } }}',
  );

  const images = await sanityFetch({
    query: portraitPortfolioQuery,
    tags: ["portrait-portfolio"],
  });

  return <Gallery images={images!} />;
}
