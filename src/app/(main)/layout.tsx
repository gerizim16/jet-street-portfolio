import Color from "color";
import { groq } from "next-sanity";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/client";

import NavButton from "./components/NavButton";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    title,
    titleColor: { hex },
  } = await sanityFetch({
    query: groq`*[_type == "home"][0]`,
    tags: ["home"],
  });

  return (
    <>
      <header
        className="fixed top-0 right-0 left-0 z-10 p-4 font-sans backdrop-blur-sm"
        style={{ backgroundColor: Color(hex).isDark() ? "#fff8" : "#0008", color: hex }}
      >
        <div className="mx-auto flex max-w-7xl items-stretch gap-4">
          <Link className="block uppercase text-center" href="/">
            <h1 className="text-3xl font-bold">{title}</h1>
            <h2 className="font-semibold">Street Photography</h2>
          </Link>
          <div className="grow" />
          <nav className="flex items-stretch">
            <NavButton href="/street">Street</NavButton>
            <NavButton href="/street-portrait">Street Portrait</NavButton>
            <NavButton href="/about">About</NavButton>
          </nav>
        </div>
      </header>
      <main className="relative font-sans">{children}</main>
    </>
  );
}
