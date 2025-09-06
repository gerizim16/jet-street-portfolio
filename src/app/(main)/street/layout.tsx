import { ReactNode } from "react";

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
      {imagePreview}
    </div>
  );
}
