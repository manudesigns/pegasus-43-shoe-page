"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/data/reviews";

type Props = {
  average: number;
  count: number;
  reviews: Review[];
};

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-hidden="true" className="tracking-widest">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

/**
 * The reviews link that sits beside the price, plus the bottom sheet it opens.
 * The sheet is a native modal <dialog>: it traps focus, closes with Esc, and
 * returns focus to the link when closed.
 */
export default function ReviewsSheet({ average, count, reviews }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Stop the page behind the sheet from scrolling while it is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function show() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-label={`Rated ${average} out of 5, ${count} reviews. Open reviews`}
        className="flex h-11 items-center text-sm font-medium underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        {average}★ ({count} reviews)
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="reviews-title"
        onClose={() => setOpen(false)}
        // Tapping the dimmed area outside the sheet closes it.
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="sheet fixed inset-x-0 top-auto bottom-0 m-0 mx-auto flex max-h-[85dvh] w-full max-w-md flex-col rounded-t-2xl bg-white p-0 text-neutral-900 shadow-xl [&:not([open])]:hidden"
      >
        <div className="flex shrink-0 justify-center pt-2" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-neutral-300" />
        </div>

        <header className="flex shrink-0 items-center justify-between border-b border-neutral-200 pl-4 pr-1">
          <h2 id="reviews-title" className="text-xl font-bold leading-7">
            Reviews ({count})
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close reviews"
            className="flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            ×
          </button>
        </header>

        <div className="overflow-y-auto overscroll-contain px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
          <p className="flex items-center gap-2 py-4">
            <span className="text-3xl font-bold">{average.toFixed(1)}</span>
            <span className="text-lg">
              <Stars rating={Math.round(average)} />
            </span>
            <span className="sr-only">out of 5,</span>
            <span className="text-sm text-neutral-500">{count} reviews</span>
          </p>

          <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-900">
            Sample reviews for layout only. Replace with real reviews.
          </p>

          <ul className="divide-y divide-neutral-200">
            {reviews.map((r) => (
              <li key={r.id} className="py-4">
                <p className="text-sm">
                  <Stars rating={r.rating} />
                  <span className="sr-only">{r.rating} out of 5</span>
                </p>
                <h3 className="mt-1 font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-700">
                  {r.body}
                </p>
                <p className="mt-2 text-xs text-neutral-500">
                  {r.author} ·{" "}
                  {new Date(r.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
