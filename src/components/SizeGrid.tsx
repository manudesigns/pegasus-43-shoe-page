"use client";

import { useState } from "react";
import type { SizeStock } from "@/data/product";

export default function SizeGrid({ sizes }: { sizes: SizeStock[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section aria-labelledby="size-heading" className="mt-6 px-4">
      <h2 id="size-heading" className="text-base font-semibold leading-6">
        Select size
      </h2>

      <div
        role="group"
        aria-labelledby="size-heading"
        className="mt-3 grid grid-cols-3 gap-2"
      >
        {sizes.map((s) => {
          const soldOut = !s.in_stock || s.stock_status === "sold_out";
          const fewLeft = !soldOut && s.stock_status === "low_stock";
          const isSelected = selected === s.sku;

          return (
            <button
              key={s.sku}
              type="button"
              disabled={soldOut}
              aria-pressed={soldOut ? undefined : isSelected}
              onClick={() => setSelected(s.sku)}
              className={[
                // Every button is the same fixed height, so the grid never shifts.
                "flex h-14 min-w-0 flex-col items-center justify-center rounded-md border px-1 text-center",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                soldOut
                  ? "cursor-not-allowed border-dashed border-neutral-300 bg-neutral-100 text-neutral-400"
                  : "border-neutral-300 bg-white text-neutral-900 active:bg-neutral-100 hover:border-neutral-900",
                // Selected ring is drawn inside the border so the button size never changes.
                isSelected ? "border-neutral-900 shadow-[inset_0_0_0_1px_#171717]" : "",
              ].join(" ")}
            >
              <span
                className={`whitespace-nowrap text-sm font-medium leading-5 ${
                  soldOut ? "line-through" : ""
                }`}
              >
                {s.size_label}
              </span>
              {soldOut && (
                <span className="text-[11px] leading-4">Sold out</span>
              )}
              {fewLeft && (
                <span className="text-[11px] font-medium leading-4 text-orange-700">
                  Only a few left
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
