"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function NavButton({
  children,
  className,
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link
      className={twMerge("group relative block", className)}
      href={href}
      {...props}
    >
      <div className="invisible px-4 py-2">{children}</div>
      <div
        className={twMerge(
          "absolute inset-0 mx-auto flex flex-col justify-center text-center transition-all group-hover:font-bold",
          [`./${segment}`, `/${segment}`, segment].includes(href.toString()) &&
            "font-bold",
        )}
      >
        {children}
      </div>
    </Link>
  );
}
