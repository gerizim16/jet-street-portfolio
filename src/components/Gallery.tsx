"use client";
import { motion, stagger } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";

import SanityImage from "@/components/SanityImage";

export default function Gallery({
  images,
}: {
  images: {
    _key: string;
    asset: null | {
      metadata: null | {
        lqip: null | string;
      };
      url: null | string;
    };
  }[];
}) {
  const { imageKey } = useParams() as { imageKey?: string };

  return (
    <motion.div
      animate="animate"
      className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-4 px-4 pt-28"
      initial="initial"
      layout
      transition={{ delayChildren: stagger(0.03) }}
    >
      {images!.map(
        (image) =>
          image &&
          (image._key === imageKey ? (
            <div key={image._key} />
          ) : (
            <motion.div
              key={image._key}
              layoutId={image._key}
              variants={{ animate: { opacity: 1 }, initial: { opacity: 0 } }}
            >
              <Link
                className="relative block aspect-video w-full"
                href={`/street/${image._key}`}
                prefetch
                scroll={false}
              >
                <SanityImage fill image={image.asset!} sizes="700px" />
              </Link>
            </motion.div>
          )),
      )}
    </motion.div>
  );
}
