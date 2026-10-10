"use client";

import { useEffect } from "react";

/** Calm, theme-neutral tile instead of the browser's broken-image symbol. */
const placeholder = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#80808033"/></svg>',
)}`;

function showPlaceholder(image: HTMLImageElement) {
  // Images with their own retry or fallback (`data-own-fallback`) must see the failure, not a successful placeholder load.
  if (image.hasAttribute("data-own-fallback")) return;
  // Guard by source, not by element: React may give the same element a new image later.
  if (image.getAttribute("src") === placeholder) return;
  image.dataset.imageFallback = "true";
  image.removeAttribute("srcset");
  image.src = placeholder;
}

/** Game images come from external hosts; one that fails keeps its layout box but shows a quiet tile. Mounted once in the root layout. */
export function ImageFallback() {
  useEffect(() => {
    // Images that failed before hydration fired their error event already.
    for (const image of document.images) {
      const failed = image.complete && image.naturalWidth === 0 && image.currentSrc !== "";
      // SVGs without intrinsic size also report a width of 0.
      if (failed && !/\.svg(\?|$)/.test(image.currentSrc)) showPlaceholder(image);
    }

    const onError = (event: Event) => {
      if (event.target instanceof HTMLImageElement) showPlaceholder(event.target);
    };
    document.addEventListener("error", onError, true);
    return () => document.removeEventListener("error", onError, true);
  }, []);

  return null;
}
