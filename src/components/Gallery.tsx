"use client";
import { motion, stagger } from "motion/react";
import Link from "next/link";

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
  return (
    <motion.div
      animate="animate"
      className="grid gap-2 pt-28 sm:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] sm:gap-4 sm:px-4"
      initial="initial"
      transition={{ delayChildren: stagger(0.03) }}
    >
      {images!.map(
        (image) =>
          image && (
            <motion.div
              key={image._key}
              variants={{ animate: { opacity: 1 }, initial: { opacity: 0 } }}
            >
              <Link
                className="relative block aspect-video w-full"
                href={`/street/${image._key}`}
                scroll={false}
              >
                <SanityImage fill image={image.asset!} sizes="700px" />
              </Link>
            </motion.div>
          ),
      )}
    </motion.div>
  );
}
