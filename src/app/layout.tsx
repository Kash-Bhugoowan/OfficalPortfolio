import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import RouteTransitionController from "@/components/RouteTransitionController";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} scroll-auto antialiased md:scroll-smooth`}
    >
      <body className="flex min-h-dvh flex-col">
        <RouteTransitionController />
        {children}
      </body>
    </html>
  );
}
