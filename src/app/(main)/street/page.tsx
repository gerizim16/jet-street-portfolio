import { groq } from "next-sanity";

import SanityImage from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Street() {
  const images = await sanityFetch({
    query: groq`*[_type == "portfolio"].images[].asset->{url, _id}`,
    tags: ["home"],
  }).then((images: { _id: string; url: string }[]) => images.filter((i) => i));

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(700px,1fr))] gap-4 px-4 pt-28">
      {images.map(({ _id, url }) => (
        <div className="relative aspect-video w-full" key={_id}>
          <SanityImage fill url={url} />
        </div>
      ))}
    </div>
  );
}
