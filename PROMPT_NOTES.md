# Prompt notes

## Request (2026-11-22)

> Build a Next.js shoe page with Tailwind CSS from my page plan in this folder and nike_pegasus_size_stock.json.
>
> Rules:
> - Fit a 375-pixel phone screen with no pinching and no sideways scrolling.
> - Use the first-screen order from my page plan.
> - Show price $140 and colorway Black/White-Volt once, above the sizes.
> - Show all 26 sizes in display_order as a grid of large tap buttons, labelled with size_label, like M 9 / W 10.5.
> - Grey out the sold-out sizes M 3.5, M 10, M 15.5 and M 16, and make them not tappable.
> - Add a small "Only a few left" note on every size whose stock_status is low_stock.
> - Put the photo in a fixed-size box so the sizes never jump while it loads.
>
> Hand back a working Next.js page with Tailwind CSS that I can run locally and open at phone size. Also save this request in a file called PROMPT_NOTES.md.

## How the build follows it

- **Data:** `nike_pegasus_size_stock.json` did not exist in the folder. It was created at `src/data/nike_pegasus_size_stock.json` as a copy of `../Pegasus 43 size and stock list.json`.
- **Page order** (from `../Pegasus 43 phone page plan.docx`): photo box, name/colorway/price, sizes, tech copy, reviews.
- **Size buttons:** labelled with `size_label`, so they are 3 columns of about 109 x 56 px instead of the plan's 44 x 44 px (a 44 px button can't fit "M 10.5 / W 12"). The plan already notes this trade-off.
- **Sold out:** real `disabled` buttons (not tappable), greyed, dashed border, struck-through label and a "Sold out" line, so they read as sold out without colour.
- **Low stock:** "Only a few left" under the label on M 4, 9, 9.5, 11 and 15.
- **Photo:** square box with its height reserved before load (now `src/components/ProductCarousel.tsx`). Photos are dummy images copied from `../Images dummy/` into `public/images/` (style IR1228-001, not HV7521-001).
- **Placeholders:** the data file has no tech copy or reviews. Reviews use 4 stars from 128 reviews.

## Follow-up requests

> add the other 3 images as a swipeable carousel. Also move the reviews to the right side of the price. review should be shown as a clickable link and nothing more, when user clicks on it. a new page of reviews open as a bottom sheet

- **Carousel** (`src/components/ProductCarousel.tsx`): 4 photos (side, outsole, pair, close-up) in the same fixed 375 x 375 box, swiped with CSS scroll-snap. Dots sit on top of the photo as 24 x 24 tap targets, so the box height never changes.
- **Reviews link** (`src/components/ReviewsSheet.tsx`): "4★ (128 reviews)" on the right of the price row, 44 px tall. The old reviews section below the tech copy was removed.
- **Bottom sheet:** a native modal `<dialog>` that slides up, up to 85% of the screen height, and scrolls inside. It closes with the × button, Esc or a tap on the dimmed area, and focus returns to the link.
- **Sample reviews:** `src/data/reviews.ts` holds placeholder reviews, labelled as samples in the sheet. Replace them with real reviews.
