import { defineQuery } from "next-sanity";

import NextModal from "@/components/NextModal";
import SanityImage from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/lib/client";

export async function generateStaticParams() {
  const imageKeysQuery = defineQuery(
    '*[_type == "portfolio"][0].images[]._key',
  );

  const keys = await sanityFetch({
    query: imageKeysQuery,
    tags: ["portfolio"],
  });

  return keys.map((key: string) => ({
    imageKey: key,
  }));
}

export default async function OpenedImagePreview({
  params,
}: {
  params: Promise<{ imageKey: string }>;
}) {
  const { imageKey } = await params;

  const imagePreviewQuery = defineQuery(
    `*[_type == "portfolio"][0].images[_key == "${imageKey}"][0]{asset->{ url, metadata { lqip } }}`,
  );

  const image = await sanityFetch({
    query: imagePreviewQuery,
    tags: ["portfolio"],
  });

  return (
    <NextModal>
      <div className="absolute inset-0">
        <SanityImage
          className="object-contain p-8"
          fill
          image={image.asset}
          priority
          quality={100}
        />
      </div>
    </NextModal>
  );
}
