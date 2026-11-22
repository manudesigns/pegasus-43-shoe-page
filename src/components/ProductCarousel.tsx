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
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-contain"
              draggable={false}
            />
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
