import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import { ComponentProps } from "react";

import { urlFor } from "@/sanity/lib/image";

interface SanityImageProps
  extends Pick<
    ComponentProps<typeof Image>,
    "fill" | "priority" | "quality" | "sizes"
  > {
  alt?: string;
  url: string;
}

export default function SanityImage({
  alt,
  fill,
  quality,
  sizes,
  url,
  ...props
}: SanityImageProps) {
  if (!url) return null;

  const dimensions = getImageDimensions(url);
  return (
    <Image
      alt={
        alt ?? "An image without an alt, whoopsAn image without an alt, whoops"
      }
      blurDataURL={urlFor(url).width(24).height(24).blur(10).url()}
      className={fill ? "object-cover" : undefined}
      placeholder="blur"
      quality={quality ?? 80}
      sizes={sizes ?? "100vw"}
      src={urlFor(url).url()}
      {...(fill
        ? { fill: true }
        : { height: dimensions.height, width: dimensions.width })}
      {...props}
    />
  );
}
