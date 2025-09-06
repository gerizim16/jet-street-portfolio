import { defineQuery } from "next-sanity";
import Link from "next/link";

import SanityImage from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Street() {
  const portfolioQuery = defineQuery(
    '*[_type == "portfolio"][0].images[]{_key, asset->{ url, metadata { lqip } }}',
  );

  const images = await sanityFetch({
    query: portfolioQuery,
    tags: ["portfolio"],
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-4 px-4 pt-28">
      {images!.map(
        (image) =>
          image && (
            <Link
              className="relative block aspect-video w-full"
              href={`/street/${image._key}`}
              key={image._key}
            >
              <SanityImage fill image={image.asset!} sizes="700px" />
            </Link>
          ),
      )}
    </div>
  );
}
