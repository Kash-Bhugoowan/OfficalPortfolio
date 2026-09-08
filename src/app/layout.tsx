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
        {/*
          Every mount/scroll-in animation on this site (PageTransition, the
          per-section Framer Motion reveals, the sticky project cards) ships
          its hidden state as an inline opacity:0 style on the server, and
          only a client-side effect ever flips it to visible. Without JS
          that effect never runs, so content stays invisible forever. This
          block only takes effect when scripting is disabled, forcing any
          such element back to visible.

          A few elements aren't "not yet revealed" but a deliberately
          hidden alternate state (a JS-only hover glow, one half of a
          click-to-toggle cross-fade) — the generic rule above would wrongly
          force those on too. The class overrides below come after it in
          source order so they win the specificity tie and carve out the
          correct exception for each. See dp-hover-glow/dp-diagram-face/
          dp-photo-face in DesignPhilosophy.tsx.
        */}
        <noscript>
          <style>{`[style*="opacity:0;"],[style$="opacity:0"]{opacity:1!important;transform:none!important}.dp-hover-glow,.dp-diagram-face{opacity:0!important}.dp-photo-face{opacity:1!important}`}</style>
        </noscript>
        <RouteTransitionController />
        {children}
      </body>
    </html>
  );
}
