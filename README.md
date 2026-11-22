# Pegasus 43 shoe page

A phone product page for the Nike Pegasus 43 (Black/White-Volt, style HV7521-001), built with Next.js and Tailwind CSS. It is designed for a 375 px wide phone screen: no pinching, no sideways scrolling, and nothing on the page jumps while photos load or when a size is picked.

This is a learning project, not an official Nike page.

## What's on the page

1. **Photo carousel.** Four photos in a fixed 375 × 375 box. Swipe between them or tap the dots.
2. **Name, colorway and price.** "$140" with a **4★ (128 reviews)** link on the right. The link opens the reviews in a bottom sheet that closes with the × button, Esc, or a tap outside it.
3. **Size grid.** All 26 sizes in `display_order`, in 3 columns, labelled like "M 9 / W 10.5".
   - Sold-out sizes (M 3.5, M 10, M 15.5, M 16) are greyed out, struck through and can't be tapped.
   - Low-stock sizes (M 4, M 9, M 9.5, M 11, M 15) show "Only a few left".
4. **Tech copy.**

## Run it locally

You need [Node.js](https://nodejs.org) 20.9 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The product photos are not included in this repo, so the carousel shows placeholders until you add your own (see [`public/images/README.md`](public/images/README.md)). To see it at phone size, open your browser's developer tools (F12), turn on device view and set the width to 375.

To view it on a phone, connect the phone to the same Wi-Fi and open the "Network" address that `npm run dev` prints, such as `http://192.168.1.11:3000`.

For a production build:

```bash
npm run build
npm start
```

## Project layout

| Path | What it is |
|---|---|
| `src/app/page.tsx` | The page: puts the parts together in order |
| `src/components/ProductCarousel.tsx` | Swipeable photo carousel |
| `src/components/ReviewsSheet.tsx` | Reviews link and the bottom sheet it opens |
| `src/components/SizeGrid.tsx` | Size buttons, sold-out and low-stock states |
| `src/data/nike_pegasus_size_stock.json` | Size and stock data (26 sizes) |
| `src/data/product.ts` | Reads the stock data and sorts it by `display_order` |
| `src/data/reviews.ts` | Review summary and sample reviews |
| `public/images/` | Product photos (not in the repo: add your own) |
| `PROMPT_NOTES.md` | The original requests and how the build follows them |

## Changing the data

- **Stock:** edit `src/data/nike_pegasus_size_stock.json`. The name, colorway and price come from the first size in the file. Set `in_stock` to `false` (or `stock_status` to `"sold_out"`) to disable a size, and set `stock_status` to `"low_stock"` to show "Only a few left".
- **Photos:** put the files in `public/images/` with the names listed in [`public/images/README.md`](public/images/README.md), or change the `slides` array in `src/app/page.tsx`. Square images about 750 × 750 px or larger look sharpest. Git ignores everything in that folder, so photos you add stay on your computer.
- **Reviews:** edit `src/data/reviews.ts`.

## Placeholders

- **Photos** are not included. The carousel shows a placeholder for each missing photo.
- **Reviews** in the bottom sheet are sample text, labelled as samples on the page. The 4.0 rating and 128 count come from the page plan.
- **Tech copy** is placeholder text.
