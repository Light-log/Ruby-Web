import type { Metadata } from "next";
import { RailsEolPage } from "@/components/sections/rails-eol";
import { ogImages } from "@/lib/seo";

const URL_ = "https://devruby.org/us/rails-8-0-end-of-life";
const title = "Rails 8.0 end of life: what to do before November 7, 2026";
const description =
  "Rails 8.0 stops receiving security patches on November 7, 2026 (bug fixes ended May 7). What that means for your app and how to plan the upgrade to 8.1.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: URL_ },
  openGraph: { title, description, url: URL_, type: "article", locale: "en_US", images: ogImages },
  twitter: { card: "summary_large_image", title, description, images: ogImages.map((i) => i.url) },
};

export const revalidate = 86400;

export default function Rails80EndOfLife() {
  return RailsEolPage({
    cycle: "8.0",
    url: URL_,
    heading: "Rails 8.0 end of life: what to do before November 7, 2026",
    lead:
      "Rails 8.0 was released on November 7, 2024. Regular bug fixes for it ended on May 7, 2026, and security patches end on November 7, 2026 — two years after release, following the Rails maintenance policy. After that date, new vulnerabilities found in 8.0 will not be fixed.",
    meaning: [
      "Until November 7, 2026, the Rails team still ships security fixes for 8.0 — but no regular bug fixes.",
      "After November 7, any new CVE affecting 8.0 stays open: no patch release, no backport.",
      "Running an unpatched framework can also surface in security questionnaires, audits, and cyber-insurance reviews.",
      "Going from 8.0 to 8.1 is a minor-version upgrade: far smaller than a major jump, and much easier to plan before the deadline than after an incident.",
    ],
    steps: [
      ["Confirm what you run", "Check the Rails and Ruby versions actually deployed (Gemfile.lock, not memory). Our free Rails Expiry Check reads the file in your browser — nothing is uploaded."],
      ["Review the 8.1 changes", "Read the 8.1 release notes and your deprecation warnings under 8.0. Fix deprecations first: a clean 8.0 app usually moves to 8.1 with little friction."],
      ["Upgrade with tests green", "Bump to the latest 8.0 patch, then to 8.1, keeping the test suite passing at each step. If coverage is thin, add tests around the paths that pay the bills before touching versions."],
    ],
    faqs: [
      ["Is Rails 8.0 unsafe after November 7, 2026?", "Not automatically, but any vulnerability discovered after that date will not be patched for 8.0. The risk grows with every new CVE, and you no longer get the fix by simply updating a patch version."],
      ["Can we skip 8.1 and wait for the next major version?", "Staying current with minor versions is cheaper than letting upgrades pile up. 8.1 is supported and receives fixes; waiting on an unsupported 8.0 means carrying known-unpatched risk in production."],
      ["We don't have time or a team for the upgrade. What are the options?", "We do incremental Rails upgrades for U.S. businesses: an assessment of the app first, then one tested step at a time. If you already have a quote from another vendor, we also give a free second opinion on that estimate."],
    ],
  });
}
