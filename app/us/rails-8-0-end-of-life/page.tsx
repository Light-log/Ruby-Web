import type { Metadata } from "next";
import { RailsEolPage } from "@/components/sections/rails-eol";
import { ogImages } from "@/lib/seo";

const URL_ = "https://devruby.org/us/rails-8-0-end-of-life";
const title = "Rails 8.0 end of life (November 7, 2026): what to do now";
const description =
  "Rails 8.0 stopped receiving security patches on November 7, 2026 (bug fixes ended May 7). The last 8.0 release is 8.0.5.2. What that means for your app and how to move to 8.1.";

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
    heading: "Rails 8.0 end of life (November 7, 2026): what to do now",
    lead:
      "Rails 8.0 was released on November 7, 2024. Regular bug fixes for it ended on May 7, 2026, and security patches ended on November 7, 2026 — two years after release, following the Rails maintenance policy. The last release of the series is 8.0.5.2 (November 4, 2026). New vulnerabilities found in 8.0 from now on will not be fixed.",
    meaning: [
      "Since November 7, 2026, the Rails team ships no fixes of any kind for 8.0: bug fixes stopped in May, security patches stopped in November.",
      "Any new CVE affecting 8.0 now stays open: no patch release, no backport. If you are on 8.0, make sure you at least run 8.0.5.2, which closed 21 advisories on November 4.",
      "Running an unpatched framework can also surface in security questionnaires, audits, and cyber-insurance reviews.",
      "Going from 8.0 to 8.1 is a minor-version upgrade: far smaller than a major jump, and much easier to plan now than after an incident.",
    ],
    steps: [
      ["Confirm what you run", "Check the Rails and Ruby versions actually deployed (Gemfile.lock, not memory). Our free Rails Expiry Check reads the file in your browser — nothing is uploaded."],
      ["Review the 8.1 changes", "Read the 8.1 release notes and your deprecation warnings under 8.0. Fix deprecations first: a clean 8.0 app usually moves to 8.1 with little friction."],
      ["Upgrade with tests green", "Bump to 8.0.5.2 (the last 8.0 patch), then to the latest 8.1, keeping the test suite passing at each step. If coverage is thin, add tests around the paths that pay the bills before touching versions."],
    ],
    faqs: [
      ["Is Rails 8.0 unsafe now that support ended on November 7, 2026?", "Not automatically, but any vulnerability discovered from now on will not be patched for 8.0. The risk grows with every new CVE, and you no longer get the fix by simply updating a patch version."],
      ["Can we skip 8.1 and wait for the next major version?", "Staying current with minor versions is cheaper than letting upgrades pile up. 8.1 is supported and receives fixes; waiting on an unsupported 8.0 means carrying known-unpatched risk in production."],
      ["We don't have time or a team for the upgrade. What are the options?", "We do incremental Rails upgrades for U.S. businesses: an assessment of the app first, then one tested step at a time. If you already have a quote from another vendor, we also give a free second opinion on that estimate."],
    ],
  });
}
