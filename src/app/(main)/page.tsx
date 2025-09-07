import { defineQuery } from "next-sanity";

import MotionDiv from "@/components/animation/MotionDiv";
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
    <div className="relative h-screen w-screen overflow-hidden">
      <MotionDiv
        animate={{ borderRadius: 0, opacity: 1, scale: 1 }}
        className="relative size-full overflow-clip"
        initial={{ borderRadius: 128, opacity: 0, scale: 0.9 }}
        transition={{ bounce: 0, type: "spring" }}
      >
        <SanityImage
          fill
          image={image!}
          priority
          quality={100}
          sizes="
          (max-aspect-ratio: 16/9) 180vh,
          100vw
        "
        />
      </MotionDiv>
    </div>
  );
}
