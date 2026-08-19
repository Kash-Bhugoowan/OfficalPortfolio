import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Karishma Bhugoowan — Product Designer",
  description:
    "Product Designer portfolio of Karishma Bhugoowan — crafting innovative solutions that meet real user needs and deliver business value.",
};

// viewportFit + themeColor let the page's gradient background extend under
// iOS Safari's status-bar/chrome area instead of leaving it plain white.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#f0eaf8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
