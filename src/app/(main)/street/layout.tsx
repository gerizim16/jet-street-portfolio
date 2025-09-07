import { ReactNode } from "react";

import AnimatePresenceClient from "@/components/animation/AnimatePresenceClient";

export default function StreetLayout({
  children,
  imagePreview,
}: {
  children: ReactNode;
  imagePreview: ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <AnimatePresenceClient>{imagePreview}</AnimatePresenceClient>
    </div>
  );
}
