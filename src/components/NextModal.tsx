"use client";

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
} from "@floating-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect } from "react";

export default function NextModal({ children }: { children: ReactNode }) {
  const { context, refs } = useFloating();
  const { push } = useRouter();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        push("./", { scroll: false });
      }
    },
    [push],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <FloatingPortal>
      <FloatingOverlay
        className="bg-neutral-950/70 backdrop-blur-3xl"
        lockScroll
      >
        <FloatingFocusManager context={context} modal>
          <div ref={refs.setFloating}>{children}</div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
