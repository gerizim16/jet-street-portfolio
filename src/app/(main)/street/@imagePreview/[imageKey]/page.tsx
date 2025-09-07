import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import MotionDiv from "@/components/animation/MotionDiv";
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
    `{
      "image": *[_type == "portfolio"][0].images[_key == "${imageKey}"][0]{asset->{ url, metadata { lqip, dimensions } }},
      "imageKeys": *[_type == "portfolio"][0].images[]._key,  
    }`,
  );

  const {
    image,
    imageKeys,
  }: {
    image: {
      asset: {
        metadata: {
          dimensions: {
            aspectRatio: number;
          };
          lqip: string;
        };
        url: string;
      };
    };
    imageKeys: string[];
  } = await sanityFetch({
    query: imagePreviewQuery,
    tags: ["portfolio"],
  });

  const currentIndex = imageKeys.findIndex((key) => key === imageKey);
  const prevAvailable = currentIndex > 0;
  const nextAvailable = currentIndex < imageKeys.length - 1;

  return (
    <NextModal>
      <div className="absolute inset-0 max-h-screen max-w-screen">
        <div
          className="relative mx-auto grid h-full max-h-screen max-w-full place-items-center"
          style={{
            aspectRatio: image.asset.metadata.dimensions.aspectRatio,
          }}
        >
          <MotionDiv
            animate={{ opacity: 1 }}
            className="relative max-h-full w-full max-w-screen"
            initial={{ opacity: 0 }}
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
          </MotionDiv>
        </div>
        {prevAvailable && (
          <ChevronButton
            direction="left"
            imageKey={imageKeys[currentIndex - 1]}
          />
        )}
        {nextAvailable && (
          <ChevronButton
            direction="right"
            imageKey={imageKeys[currentIndex + 1]}
          />
        )}
        <Link
          className="absolute top-0 right-0 block p-4 transition-transform hover:scale-90"
          href="/street"
        >
          <X size={32} />
        </Link>
      </div>
    </NextModal>
  );
}

function ChevronButton({
  direction,
  imageKey,
}: {
  direction: "left" | "right";
  imageKey: string;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <div
      className={twMerge(
        "absolute top-0 bottom-0 opacity-0 transition hover:opacity-100",
        direction === "left" ? "left-0" : "right-0",
        direction === "left" ? "right-2/3" : "left-2/3",
      )}
    >
      <Link
        className={twMerge(
          "flex h-full w-2/3 cursor-pointer items-center transition-transform",
          direction === "right" && "ml-auto",
          direction === "left" ? "hover:translate-x-3" : "hover:-translate-x-3",
        )}
        href={`/street/${imageKey}`}
        replace
        scroll={false}
      >
        <Icon
          className={twMerge(
            "drop-shadow-md",
            direction === "right" && "ml-auto",
          )}
          size={56}
        />
      </Link>
    </div>
  );
}
