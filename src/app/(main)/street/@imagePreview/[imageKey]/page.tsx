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
    `*[_type == "portfolio"][0].images[_key == "${imageKey}"][0]{asset->{ url, metadata { lqip, dimensions } }}`,
  );

  const image = await sanityFetch({
    query: imagePreviewQuery,
    tags: ["portfolio"],
  });

  return (
    <NextModal>
      <div className="absolute inset-0 max-h-screen max-w-screen">
        <div
          className="relative mx-auto max-h-full max-w-full"
          style={{
            aspectRatio: image.asset.metadata.dimensions.aspectRatio,
          }}
        >
          <SanityImage
            className="object-contain"
            fill
            image={image.asset}
            priority
            quality={100}
          />
        </div>
      </div>
    </NextModal>
  );
}
