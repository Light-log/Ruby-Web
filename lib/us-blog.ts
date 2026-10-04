import type { BlogCopy } from "@/components/sections/blog-views";
import type { BlogPost } from "@/lib/blog";

/** English guides for the U.S. campaign. Same rules as the Spanish blog: no invented metrics or testimonials. */
export const usBlogCopy: BlogCopy = {
  basePath: "/us/blog",
  lang: "en",
  locale: "en-US",
  ogLocale: "en_US",
  crumbs: [
    { name: "Home", url: "https://devruby.org" },
    { name: "United States", url: "https://devruby.org/us" },
  ],
  blogName: "DEVRUBY Guides",
  indexTitle: "Practical guides for teams that run on software",
  indexDescription:
    "Practical guides on Ruby on Rails upgrades, AI workflow automation, and API integrations for U.S. businesses, written by the DEVRUBY engineering team.",
  heading: ["Practical guides for", "teams that run on software"],
  intro:
    "What we walk through with clients before a project starts: how to upgrade a Rails application safely, where AI actually removes work, and how to keep automation under control. No invented numbers or generic promises.",
  agendaHref: "/agenda?origen=us",
  t: {
    read: "Read guide",
    back: "Back to guides",
    author: "DEVRUBY engineering team",
    minRead: "min read",
    summary: "Key takeaways",
    related: "Related",
    more: "More guides",
    caseTitle: "Facing a similar situation?",
    caseText:
      "Tell us about the application, the systems involved, and the outcome you need. We will review it in a 30-minute discovery call.",
    ctaTitle: "Want to review your case with context?",
    ctaText:
      "Share the codebase, workflow, or systems involved and the result you need. We will use the call to decide a practical next step.",
    cta: "Book a discovery call",
  },
};

export const usBlogPosts: BlogPost[] = [
  {
    slug: "rails-7-to-8-upgrade-guide",
    title: "Rails 7 to 8 Upgrade Guide: What Breaks and How to Plan the Upgrade",
    seoTitle: "Rails 7 to 8 Upgrade Guide: What Breaks",
    description:
      "How to upgrade a production app from Rails 7 to Rails 8: the version path, the Ruby requirement, the changes that actually break code, and a safe rollout plan.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readingMinutes: 8,
    intro:
      "Rails 8 is mostly an additive release: new defaults such as Propshaft, the Solid Queue, Solid Cache and Solid Cable trio, Kamal 2 and an authentication generator are aimed at new applications, and none of them is mandatory for an existing one. What makes an upgrade from Rails 7 risky is everything that was deprecated along the way and is now gone. This guide covers the path we follow for production applications and the changes that tend to break real code.",
    sections: [
      {
        heading: "Go one minor version at a time",
        paragraphs: [
          "The official guidance is to upgrade one minor version at a time, and it matters in practice: each release turns the previous release's deprecation warnings into removals. If the application is on Rails 7.0, the path is 7.0 to 7.1, then 7.2, then 8.0, and optionally 8.1. Skipping a step means fixing the deprecations of two releases at once without the warnings that would have pointed to them.",
          "Rails 8 requires Ruby 3.2 or newer, and Rails 7.2 already requires Ruby 3.1. Upgrade Ruby as its own step, deploy it, and only then move Rails. Mixing both changes in one release makes any regression harder to trace. If you move to Ruby 3.4, add gems such as csv explicitly to the Gemfile, because they are no longer default gems.",
        ],
      },
      {
        heading: "Prepare before touching the Rails version",
        paragraphs: [
          "Most of the work happens on the current version, before the Gemfile changes.",
        ],
        list: [
          "Make deprecations fail the test suite (config.active_support.deprecation = :raise in the test environment) and fix every warning.",
          "Check the gems that depend on Rails (authentication, admin, background jobs, file uploads) and confirm each one supports the target version.",
          "Raise test coverage on the areas you are least confident about, especially money, permissions, and background jobs.",
          "Consider dual booting with a tool such as the next_rails gem, so the suite runs against both versions while the branch is in progress.",
        ],
      },
      {
        heading: "The changes that actually break code",
        paragraphs: [
          "Release notes list dozens of items. These are the ones we see most often in existing applications.",
        ],
        list: [
          "Enum keyword arguments are removed: enum status: { active: 0 } must become enum :status, { active: 0 }, and options such as _prefix become prefix.",
          "ActiveRecord::ConnectionAdapters::ConnectionPool#connection is removed; code that grabs a raw connection should use with_connection or lease_connection.",
          "Time#to_time now always preserves the receiver's time zone, and the legacy config.active_support.to_time_preserves_timezone = false option is gone. Check any code that relied on conversion to system local time.",
          "Custom console extensions through Rails::ConsoleMethods are removed; move helpers to a module loaded from a console block in the environment configuration.",
          "Rails.application.secrets was already removed in 7.2; anything still reading it must move to encrypted credentials or environment variables.",
        ],
      },
      {
        heading: "Run the framework update deliberately",
        paragraphs: [
          "After bumping the version, run bin/rails app:update and review every file it proposes to change instead of accepting all of them. Keep config.load_defaults on the previous version at first, and enable the new defaults one by one from the generated new_framework_defaults_8_0.rb file, deploying in between. Only when all of them are active should load_defaults move to 8.0.",
          "Existing applications keep working with Sprockets, Redis, and Sidekiq. If you use Sprockets, make sure sprockets-rails is declared explicitly in the Gemfile. Migrating to Propshaft or the Solid stack is a separate project with its own benefits, not a requirement of the upgrade.",
        ],
      },
      {
        heading: "If you continue to Rails 8.1",
        paragraphs: [
          "Rails 8.1 dumps table columns in schema.rb in alphabetical order, which produces a large but harmless diff the first time a migration runs. Regenerate the schema right after upgrading and commit it on its own so code reviews stay readable. Also review query string handling in any code that parses unusual parameter names, since parsing of keys with leading brackets changed.",
        ],
      },
    ],
    takeaways: [
      "Upgrade one minor version at a time, and upgrade Ruby in its own release first.",
      "Make deprecations raise in tests and fix them before changing the Rails version.",
      "Expect enum syntax, connection pool access, to_time behavior, and console extensions to break.",
      "Propshaft and the Solid stack are optional for existing apps; enable new defaults gradually.",
    ],
    related: [
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/application-security-audit", label: "Application security audit" },
      { href: "/agenda?origen=us", label: "Book a 30-minute discovery call" },
    ],
  },
  {
    slug: "ai-automation-for-small-businesses",
    title: "AI Automation for Small Businesses: What to Automate First and What to Leave to People",
    seoTitle: "AI Automation for Small Businesses: Start Here",
    description:
      "How small businesses can choose their first AI automation: where language models remove real work, where simple rules work better, and how to stay in control.",
    eyebrow: "AI workflow automation",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readingMinutes: 7,
    intro:
      "Small businesses are told that AI agents will run their operations. In practice, the projects that work are narrower: a model that reads documents or emails nobody wants to retype, connected to the tools the team already uses, with a person approving anything that carries risk. This guide explains how we choose the first workflow to automate and what has to be in place before it goes live.",
    sections: [
      {
        heading: "Start with rules, not models",
        paragraphs: [
          "If the data already arrives in a fixed format, such as a web form, a CSV export, or an API, a regular integration with fixed rules is cheaper, faster, and easier to audit than a language model. Many automation projects never need AI at all.",
          "AI earns its place when the information is predictable but the format is not: invoices from many vendors, customer emails written in a hundred different ways, scanned forms, or long call notes. Those are the steps where someone on your team currently reads and types.",
        ],
      },
      {
        heading: "Good first candidates",
        paragraphs: [
          "These tasks combine a clear payoff with risk you can control, as long as the output is validated before it reaches the system of record.",
        ],
        list: [
          "Document intake: extracting vendor, dates, totals, and line items from invoices or purchase orders.",
          "Email and request triage: classifying incoming messages and routing them to the right person with a priority.",
          "Summaries: turning long threads, tickets, or call notes into the fields your CRM actually needs.",
          "Draft replies: the model prepares a response from your own policies and a person reviews and sends it.",
        ],
      },
      {
        heading: "What should stay with people",
        paragraphs: [
          "Approving payments, changing prices or contract terms, and sending anything with legal or financial consequences should not depend on a model without review. The useful question is not whether AI can do it, but what a mistake costs and who would notice it.",
          "The pattern that works is AI prepares, a person confirms. The time savings are still large because nobody searches or retypes, while accountability stays where it was.",
        ],
      },
      {
        heading: "What has to be in place before launch",
        paragraphs: [
          "A pilot that works on five hand-picked examples proves very little. These are the minimum controls we put in place before an AI step handles real work.",
        ],
        list: [
          "An evaluation set of real examples, including the unusual ones, to measure accuracy before launch and after any change of model or instructions.",
          "Validation rules outside the model, such as totals that must add up or customers that must already exist.",
          "A review queue for low-confidence results instead of writing them straight into the CRM or accounting system.",
          "A log of what went in, what the model returned, and who approved it.",
          "An agreed data flow: which AI provider processes the data, under which terms, and which fields are masked or never sent.",
        ],
        ordered: true,
      },
      {
        heading: "A realistic first project",
        paragraphs: [
          "Pick one workflow with steady volume and a known cost of error, collect a month of real examples, and measure. Connect the AI step to your current tools through their APIs rather than replacing them. When the numbers hold up, expand to the next workflow; when they do not, you have learned it cheaply.",
        ],
      },
    ],
    takeaways: [
      "If the data has a fixed format, use rules; save AI for documents and free text.",
      "Good first projects are document intake, triage, summaries, and draft replies.",
      "Payments, pricing, and legal communications keep a human approval step.",
      "Measure on real examples, validate outside the model, and log every decision.",
    ],
    related: [
      { href: "/us/ai-workflow-automation", label: "AI workflow automation services" },
      { href: "/us/workflow-automation", label: "Workflow automation services" },
      { href: "/agenda?origen=us", label: "Book a 30-minute discovery call" },
    ],
  },
  {
    slug: "rails-8-0-to-8-1-upgrade",
    title: "Upgrading from Rails 8.0 to 8.1: What Changes and What to Check",
    seoTitle: "Rails 8.0 to 8.1 Upgrade: What to Check",
    description:
      "What changes when you upgrade a production app from Rails 8.0 to 8.1: removed behaviors, new deprecations, features to adopt later, and a checklist.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    readingMinutes: 6,
    intro:
      "Rails 8.1, released in October 2025, is a smaller step than the jump from 7.2 to 8.0, but it still removes a few behaviors that real applications rely on. If your app is already on 8.0 with a clean deprecation log, the upgrade is usually a short project. This guide separates what you need to fix now from what you can adopt later.",
    sections: [
      {
        heading: "Start from a clean 8.0",
        paragraphs: [
          "Upgrade from 8.0, not from an older version, and make sure the test suite runs without deprecation warnings before changing the Gemfile. Rails 8.1 turns several 8.0 deprecations into removals, so any warning you ignore today is a failure tomorrow. If you are still on Rails 7, follow our Rails 7 to 8 guide first.",
        ],
      },
      {
        heading: "Changes that can break existing code",
        paragraphs: [
          "These are the items from the official release notes that most often affect production applications.",
        ],
        list: [
          "Parameter parsing: the deprecated skipping of leading brackets in parameter names is removed, so keys like [foo] are no longer silently rewritten. Check any integration that sends unusual query strings.",
          "Semicolons are no longer accepted as query string separators. Old clients or webhooks that build URLs with ; between parameters need fixing.",
          "Routes defined with multiple paths in a single declaration are no longer supported; split them into separate route definitions.",
          "Finder methods that depend on record order now warn when called without an explicit order, so add order clauses where results must be deterministic.",
          "schema.rb now lists table columns in alphabetical order. The first migration after upgrading produces a large but harmless diff: regenerate and commit it on its own.",
        ],
      },
      {
        heading: "New features you can adopt later",
        paragraphs: [
          "None of these are required to finish the upgrade. Plan them as separate improvements once the app is stable on 8.1.",
        ],
        list: [
          "Active Job continuations: include ActiveJob::Continuable and split long jobs into steps that resume from the last completed step after a restart or deploy.",
          "Structured event reporting with Rails.event, which gives a single, taggable stream of application events for logging and observability.",
          "Local CI: bin/ci runs the steps defined in config/ci.rb, useful for small teams that want the same checks locally and in CI.",
          "Deprecated associations: mark an association with deprecated: true to find every place that still uses it before removing it.",
          "Markdown responses with format.md and render markdown:, plus registry-free deployments with Kamal 2.8 or newer.",
        ],
      },
      {
        heading: "A short upgrade checklist",
        paragraphs: [
          "For most applications already on 8.0, the work fits in a few steps.",
        ],
        list: [
          "Confirm the deprecation log is empty on 8.0 and that critical gems support 8.1.",
          "Bump Rails, run bin/rails app:update, and review each proposed change instead of accepting all of them.",
          "Regenerate schema.rb and commit the reordering separately from code changes.",
          "Run the full suite plus a manual pass over integrations that build URLs or parse unusual parameters.",
          "Deploy, watch error tracking for a few days, and only then switch config.load_defaults to 8.1.",
        ],
        ordered: true,
      },
    ],
    takeaways: [
      "Upgrade from a clean 8.0 with no deprecation warnings.",
      "Check parameter parsing, semicolon query strings, multi-path routes, and implicit ordering.",
      "Commit the alphabetical schema.rb diff on its own.",
      "Adopt job continuations, Rails.event, and bin/ci after the upgrade, not during it.",
    ],
    related: [
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/blog/rails-7-to-8-upgrade-guide", label: "Rails 7 to 8 upgrade guide" },
      { href: "/agenda?origen=us", label: "Book a 30-minute discovery call" },
    ],
  },
];

export const usBlogSlugs = usBlogPosts.map((post) => post.slug);

export function getUSBlogPost(slug: string): BlogPost | undefined {
  return usBlogPosts.find((post) => post.slug === slug);
}
