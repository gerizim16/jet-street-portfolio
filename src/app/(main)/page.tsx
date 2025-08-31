import { groq } from "next-sanity";

import SanityImage from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Main() {
  const url = await sanityFetch({
    query: groq`*[_type == "home"][0].image.asset->url`,
    tags: ["home"],
  });

  return (
    <div className="relative h-screen max-h-screen w-full">
      <SanityImage fill priority quality={100} url={url} />
    </div>
  );
}
