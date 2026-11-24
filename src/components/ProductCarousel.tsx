"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type Slide = { src: string; alt: string };

/**
 * Swipeable photo carousel in a fixed square box (375 x 375 on a 375 px
 * phone). The box reserves its space before any image loads, and the dots sit
 * on top of the photo, so nothing below the carousel ever moves.
 */
export default function ProductCarousel({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // Photos aren't in the repo, so a fresh clone has none until they're added.
  // A missing photo shows a placeholder instead of a broken image.
  const [missing, setMissing] = useState<Set<string>>(new Set());

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  }

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Product photos"
      className="relative aspect-square w-full overflow-hidden bg-[#f0f0f0]"
      // Inline too, so the square box is reserved even before any CSS applies.
      style={{ aspectRatio: "1 / 1" }}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className="relative h-full w-full shrink-0 snap-center snap-always"
          >
            {missing.has(slide.src) ? (
              <div
                role="img"
                data-testid={i === 0 ? "main-photo" : undefined}
                aria-label={`${slide.alt} (photo not added yet)`}
                className="flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-neutral-500"
              >
                <svg width="140" height="64" viewBox="0 0 140 64" aria-hidden="true">
                  <path
                    d="M6 46c18 0 30-8 40-22 4-6 10-8 16-4l14 10c10 6 26 8 44 8 8 0 14 4 14 10v4H10c-4 0-6-2-6-6z"
                    fill="#d4d4d4"
                  />
                  <rect x="4" y="54" width="132" height="6" rx="3" fill="#c4c4c4" />
                </svg>
                Photo {i + 1} goes here
              </div>
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                // Next 16: `preload` replaces the deprecated `priority`. It adds a
                // <link rel="preload"> in <head> for the first (LCP) photo only.
                preload={i === 0}
                data-testid={i === 0 ? "main-photo" : undefined}
                sizes="(max-width: 448px) 100vw, 448px"
                className="object-contain"
                draggable={false}
                onError={() =>
                  setMissing((prev) => new Set(prev).add(slide.src))
                }
              />
            )}
          </div>
        ))}
      </div>

      {/* Dots: 24 x 24 tap targets drawn over the photo */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show photo ${i + 1} of ${slides.length}`}
            aria-current={i === index ? "true" : undefined}
            className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                i === index ? "w-4 bg-neutral-900" : "w-2 bg-neutral-400"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
