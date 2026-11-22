import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nike Pegasus 43",
  description: "Nike Pegasus 43, Black/White-Volt. Pick your size.",
};

// Next.js sets the viewport meta tag (width=device-width, initial-scale=1)
// by default, so the page fits the phone width without pinching and zoom
// stays available.

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
