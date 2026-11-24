import ProductCarousel, { type Slide } from "@/components/ProductCarousel";
import ReviewsSheet from "@/components/ReviewsSheet";
import SizeGrid from "@/components/SizeGrid";
import { formatPrice, product, sizes } from "@/data/product";
import { reviewSummary, reviews } from "@/data/reviews";

const name = `${product.name} in ${product.colorway}`;
const slides: Slide[] = [
  { src: "/images/pegasus-43-side.avif", alt: `${name}, side view` },
  { src: "/images/pegasus-43-sole.avif", alt: `${name}, outsole` },
  { src: "/images/pegasus-43-pair.avif", alt: `${name}, pair from the front` },
  { src: "/images/pegasus-43-detail.avif", alt: `${name}, close-up of the heel and midsole` },
];

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-md pb-8">
      {/* 1. Swipeable photos in a fixed-size box */}
      <ProductCarousel slides={slides} />

      {/* 2. Name, colorway, then price with the reviews link on its right */}
      <section className="px-4 pt-5">
        <h1 className="text-2xl font-bold leading-[30px]">{product.name}</h1>
        <p className="mt-1 text-base leading-6 text-neutral-500">
          {product.colorway}
        </p>
        <div className="mt-1 flex items-center justify-between gap-4">
          {/* Fixed 28 px height: the price line can't grow if text or a font arrives late. */}
          <p data-testid="price" className="h-7 text-xl font-bold leading-7">
            {formatPrice(product.price)}
          </p>
          <ReviewsSheet
            average={reviewSummary.average}
            count={reviewSummary.count}
            reviews={reviews}
          />
        </div>
      </section>

      {/* 3. Sizes */}
      <SizeGrid sizes={sizes} />

      {/* 4. Tech copy (placeholder: not in the data file) */}
      <section aria-labelledby="tech-heading" className="mt-8 px-4">
        <h2 id="tech-heading" className="text-xl font-bold leading-7">
          Tech
        </h2>
        <p className="mt-2 text-base leading-6">
          Placeholder tech copy. Replace with the product&apos;s own text about
          cushioning, upper and outsole.
        </p>
      </section>
    </main>
  );
}
