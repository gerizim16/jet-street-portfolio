"use client";

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
} from "@floating-ui/react";
import { ReactNode } from "react";

export default function NextModal({ children }: { children: ReactNode }) {
  const { context, refs } = useFloating();

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
