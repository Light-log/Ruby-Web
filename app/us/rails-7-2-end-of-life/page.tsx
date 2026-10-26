import type { Metadata } from "next";
import { RailsEolPage } from "@/components/sections/rails-eol";
import { ogImages } from "@/lib/seo";

const URL_ = "https://devruby.org/us/rails-7-2-end-of-life";
const title = "Rails 7.2 end of life: it no longer gets security patches";
const description =
  "Rails 7.2 stopped receiving security patches on August 9, 2026. What that means for apps still on 7.2 and how to plan the upgrade path to 8.1.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: URL_ },
  openGraph: { title, description, url: URL_, type: "article", locale: "en_US", images: ogImages },
  twitter: { card: "summary_large_image", title, description, images: ogImages.map((i) => i.url) },
};

export const revalidate = 86400;

export default function Rails72EndOfLife() {
  return RailsEolPage({
    cycle: "7.2",
    url: URL_,
    heading: "Rails 7.2 end of life: it no longer gets security patches",
    lead:
      "Rails 7.2 reached the end of its support window: regular bug fixes ended on August 9, 2025, and security patches ended on August 9, 2026. Any vulnerability found in 7.2 from now on will not be fixed — apps still running it are carrying open risk today, not at some future date.",
    meaning: [
      "7.2 receives no fixes of any kind anymore: no bug fixes, no security patches, no backports.",
      "Every new CVE that affects 7.2 stays exploitable until you upgrade; there is no patch release to apply.",
      "An end-of-life framework is a common red flag in security questionnaires, customer audits, and cyber-insurance reviews.",
      "The supported path is 8.1. Rails 8.0 stops getting security patches on November 7, 2026, so an upgrade landing on 8.0 only buys a few weeks.",
    ],
    steps: [
      ["Confirm what you run", "Check the Rails and Ruby versions actually deployed (Gemfile.lock, not memory). Our free Rails Expiry Check reads the file in your browser — nothing is uploaded."],
      ["Clear deprecations on 7.2", "Bump to the latest 7.2 patch and fix every deprecation warning. That work is what makes the jump to 8.0 — and then 8.1 — predictable instead of risky."],
      ["Upgrade one minor at a time", "Go 7.2 → 8.0 → 8.1 with the test suite passing at each step, checking gem compatibility before each jump. If coverage is thin, add tests around the paths that pay the bills first."],
    ],
    faqs: [
      ["We're on Rails 7.2 and nothing is broken. Why move?", "Nothing being broken is not the same as nothing being vulnerable. Since August 9, 2026, new security issues in 7.2 go unpatched, and the gap between your version and the supported ones only gets more expensive to close."],
      ["Should we stop at 8.0 or go straight to 8.1?", "Plan the path to land on 8.1. 8.0 loses security patches on November 7, 2026, so stopping there leaves you in the same situation within weeks. The 8.0 step is still useful as an intermediate, tested stop."],
      ["We don't have time or a team for the upgrade. What are the options?", "We do incremental Rails upgrades for U.S. businesses: an assessment of the app first, then one tested step at a time. If you already have a quote from another vendor, we also give a free second opinion on that estimate."],
    ],
  });
}
