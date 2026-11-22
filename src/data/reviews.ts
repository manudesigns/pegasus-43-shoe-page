// SAMPLE DATA ONLY. The stock file has no reviews. The 4.0 rating and 128
// count come from the page plan; the review texts below are placeholders to
// show the layout. Replace them with real reviews before going live.

export type Review = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  author: string;
  date: string; // ISO date
};

export const reviewSummary = { average: 4, count: 128 };

export const reviews: Review[] = [
  {
    id: "r1",
    rating: 5,
    title: "Sample review title",
    body: "Placeholder review text. A real review would describe comfort, fit and how the shoe held up over the first few weeks of runs.",
    author: "Sample reviewer",
    date: "2026-11-02",
  },
  {
    id: "r2",
    rating: 4,
    title: "Sample review title",
    body: "Placeholder review text. A real review might say the shoe runs slightly small and suggest going up half a size.",
    author: "Sample reviewer",
    date: "2026-10-28",
  },
  {
    id: "r3",
    rating: 4,
    title: "Sample review title",
    body: "Placeholder review text.",
    author: "Sample reviewer",
    date: "2026-10-19",
  },
  {
    id: "r4",
    rating: 3,
    title: "Sample review title",
    body: "Placeholder review text. A longer review would wrap onto several lines here so the sheet can be checked with more content than fits on one screen.",
    author: "Sample reviewer",
    date: "2026-10-11",
  },
  {
    id: "r5",
    rating: 5,
    title: "Sample review title",
    body: "Placeholder review text.",
    author: "Sample reviewer",
    date: "2026-10-03",
  },
];
