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
  {
    slug: "rails-6-to-7-upgrade-guide",
    title: "Rails 6.1 to 7 Upgrade Guide: Zeitwerk, Cookie Rotation and the Path to 7.2",
    seoTitle: "Rails 6 to 7 Upgrade Guide",
    description:
      "How to upgrade a production app from Rails 6.1 to 7.0, 7.1 and 7.2: Ruby versions, Zeitwerk, SHA256 cookie rotation, cache keys and the changes that break code.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readingMinutes: 8,
    intro:
      "Many business applications still run on Rails 6.1, which no longer receives security fixes. Getting to a supported version means passing through 7.0, 7.1 and 7.2, and the first of those steps contains the changes that most often break production: the autoloader, the digest used for cookies and cache keys, and the JavaScript tooling. This guide covers what to prepare and the mistakes that log users out or empty caches.",
    sections: [
      {
        heading: "The version path and Ruby requirements",
        paragraphs: [
          "Upgrade one minor version at a time: 6.1 to 7.0, then 7.1, then 7.2. Rails 7.0 and 7.1 require Ruby 2.7.0 or newer, and Rails 7.2 requires Ruby 3.1.0 or newer, so plan a Ruby upgrade before the last step and deploy it on its own.",
          "Before touching the Gemfile, make deprecation warnings fail the test suite on 6.1 and fix them. Every warning you leave behind becomes an error a version later.",
        ],
      },
      {
        heading: "Zeitwerk is mandatory",
        paragraphs: [
          "Rails 7.0 removes the classic autoloader: applications must run in zeitwerk mode, and the config.autoloader setter no longer exists. Apps that already switched in 6.x usually have nothing to do. Apps still on classic mode should switch first, on 6.1, and run bin/rails zeitwerk:check until it passes.",
          "The usual problems are file names that do not match the constant they define, acronyms such as API or HTML that need inflection rules, and code in lib that relied on loose naming. Fix them while still on 6.1, where the change is isolated.",
        ],
      },
      {
        heading: "SHA256 for cookies and cache keys",
        paragraphs: [
          "Rails 7.0 changes the default digest of the key generator from SHA1 to SHA256. That key generator signs and encrypts cookies, so enabling the new default without preparation invalidates existing sessions and logs every user out.",
          "The official approach is a cookie rotator: keep reading cookies created with SHA1 while writing new ones with SHA256, and remove the rotator after the old cookies have expired. The digest used by ActiveSupport::Digest also moves to SHA256, which changes cache keys and ETags, so expect a cold cache right after the switch and schedule it outside peak hours.",
        ],
      },
      {
        heading: "Other changes that bite",
        paragraphs: [
          "These are smaller, but they show up in real applications.",
        ],
        list: [
          "button_to now renders a patch form when you pass a persisted Active Record object; check buttons that expected a POST.",
          "request.content_type now returns the full header including the charset; use media_type when you only need the MIME type.",
          "Sprockets becomes optional: declare sprockets-rails explicitly if your asset pipeline depends on it.",
          "Webpacker is retired; existing apps can keep it during the upgrade, but plan the move to jsbundling-rails or importmap-rails as a separate project.",
        ],
      },
      {
        heading: "A safe rollout",
        paragraphs: [
          "Keep config.load_defaults on the old version, upgrade the framework, and enable the new defaults one at a time from the generated new_framework_defaults file, deploying between changes. Treat the cookie digest and cache digest as their own deploys with monitoring. Once the app is stable on 7.2, the next step is our Rails 7 to 8 guide.",
        ],
      },
    ],
    takeaways: [
      "Go 6.1 → 7.0 → 7.1 → 7.2, and upgrade Ruby to 3.1+ before 7.2.",
      "Switch to Zeitwerk on 6.1 and run bin/rails zeitwerk:check.",
      "Rotate cookies before adopting SHA256 or every user gets logged out.",
      "Expect cache keys to change and enable new defaults one by one.",
    ],
    related: [
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/blog/rails-7-to-8-upgrade-guide", label: "Rails 7 to 8 upgrade guide" },
      { href: "/agenda?origen=us", label: "Book a 30-minute discovery call" },
    ],
  },
  {
    slug: "solid-queue-vs-sidekiq",
    title: "Solid Queue vs Sidekiq: Should Your Rails App Migrate, and How",
    seoTitle: "Solid Queue vs Sidekiq: Should You Migrate?",
    description:
      "Solid Queue vs Sidekiq for Rails background jobs: how each works, when a database-backed queue is enough, and how to migrate gradually without breaking jobs.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readingMinutes: 7,
    intro:
      "Rails 8 made Solid Queue the default Active Job backend, and many teams now ask whether they should drop Sidekiq and Redis. The answer depends less on benchmarks than on your job volume, the Sidekiq features you use and how much infrastructure you want to run. This guide compares both and explains a migration that can be done queue by queue.",
    sections: [
      {
        heading: "How each one works",
        paragraphs: [
          "Sidekiq stores jobs in Redis and processes them with threads. It is mature, very fast, and has a large ecosystem; some features, such as batches and advanced rate limiting, are part of its paid Pro and Enterprise editions.",
          "Solid Queue stores jobs in your relational database: MySQL, PostgreSQL, SQLite or MariaDB. It uses FOR UPDATE SKIP LOCKED where available so workers do not block each other, and it includes concurrency controls, recurring tasks defined in config/recurring.yml, and a dashboard through Mission Control Jobs. In Rails 8 it is configured by default with a separate queue database.",
        ],
      },
      {
        heading: "When Solid Queue is enough",
        paragraphs: [
          "For most business applications, background jobs are emails, exports, webhooks, imports and scheduled maintenance. At that volume a database-backed queue performs well and removes Redis from the stack: one less service to host, monitor, back up and secure.",
        ],
        list: [
          "Your job volume is moderate and latency of a second or two is acceptable.",
          "You use Sidekiq only through Active Job, without Sidekiq-specific APIs.",
          "You want recurring jobs and concurrency limits without extra gems or paid tiers.",
          "Your team prefers fewer moving parts over maximum throughput.",
        ],
      },
      {
        heading: "When to keep Sidekiq",
        paragraphs: [
          "Keep Sidekiq if you process very high job volumes, rely on Pro or Enterprise features, or call Sidekiq directly through Sidekiq::Job classes and sidekiq_options. Moving those workloads to the database adds write load to it, so measure before switching rather than migrating because it is the new default.",
        ],
      },
      {
        heading: "A gradual migration",
        paragraphs: [
          "Active Job lets you set the adapter per job class, which makes an incremental migration possible.",
        ],
        list: [
          "Convert jobs that use Sidekiq APIs directly into Active Job classes first.",
          "Run bin/rails solid_queue:install, review config/queue.yml and decide between a separate queue database or a single one.",
          "Start the workers with bin/jobs or the Puma plugin (plugin :solid_queue) in a staging environment.",
          "Move low-risk jobs first by setting self.queue_adapter = :solid_queue on those classes, and watch them in Mission Control Jobs.",
          "Move recurring jobs to config/recurring.yml, then the rest, and remove Sidekiq and Redis only when no jobs remain in their queues.",
        ],
        ordered: true,
      },
    ],
    takeaways: [
      "Solid Queue removes Redis and covers typical business workloads.",
      "Keep Sidekiq for very high volume or paid Pro/Enterprise features.",
      "Convert direct Sidekiq jobs to Active Job before migrating.",
      "Migrate per job class and retire Redis only when its queues are empty.",
    ],
    related: [
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/blog/rails-7-to-8-upgrade-guide", label: "Rails 7 to 8 upgrade guide" },
      { href: "/agenda?origen=us", label: "Book a 30-minute discovery call" },
    ],
  },
  {
    slug: "rails-n-plus-one-queries",
    title: "Rails N+1 Queries: How to Detect Them and Fix Them for Good",
    seoTitle: "Rails N+1 Queries: Detect and Fix Them",
    description:
      "What N+1 queries are in Rails, how to detect them with logs, Bullet, Prosopite and strict_loading, and when to use includes, preload or eager_load to fix them.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readingMinutes: 6,
    intro:
      "N+1 queries are the most common reason a Rails page that was fast in development becomes slow in production. They are easy to introduce and easy to miss, because each individual query is fast. This guide shows how to find them systematically and how to choose the right fix.",
    sections: [
      {
        heading: "What an N+1 query is",
        paragraphs: [
          "An N+1 happens when code loads a list of records with one query and then runs one more query for each record to fetch an association. A page that lists 50 orders and shows each customer name runs 51 queries instead of 2. With 10 rows nobody notices; with 1,000 rows the page times out.",
        ],
      },
      {
        heading: "How to detect them",
        paragraphs: [
          "Combine several signals instead of relying on one.",
        ],
        list: [
          "Development logs: repeated identical SELECT statements with different ids are the classic pattern.",
          "Bullet: a gem that warns in development when a page triggers N+1 queries or loads associations it never uses.",
          "Prosopite: detects N+1 patterns from the queries actually executed, with fewer false positives in complex code.",
          "strict_loading: mark a relation, a model or the whole app with strict loading so lazy-loading an association raises an error in tests.",
          "Production monitoring: an APM that shows queries per request points to the endpoints worth fixing first.",
        ],
      },
      {
        heading: "Choosing the fix",
        paragraphs: [
          "Rails offers three ways to load associations in advance, and the right one depends on what you do with the data.",
        ],
        list: [
          "preload runs a separate query per association; it is the safest default when you only display associated data.",
          "eager_load uses a single query with LEFT OUTER JOIN; use it when you filter or order by columns of the association.",
          "includes lets Rails choose between the two, and switches to eager_load when you reference the association in conditions.",
        ],
      },
      {
        heading: "Keeping them from coming back",
        paragraphs: [
          "Fixing today's N+1s is half the job. Enable strict_loading in the test suite or on the models that matter, keep Bullet or Prosopite active in development and CI, and add a request spec that asserts a maximum number of queries for the heaviest pages. Counter caches help for counts, and serializers or view components should receive already-loaded data instead of querying on their own.",
        ],
      },
    ],
    takeaways: [
      "Each query is fast; the cost is their number, so measure queries per request.",
      "Use logs, Bullet or Prosopite, and strict_loading in tests to find them.",
      "preload to display, eager_load to filter or sort, includes when unsure.",
      "Guard the heaviest pages with tests that limit query counts.",
    ],
    related: [
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/application-security-audit", label: "Application security audit" },
      { href: "/agenda?origen=us", label: "Book a 30-minute discovery call" },
    ],
  },
  {
    slug: "rails-8-authentication-vs-devise",
    title: "Rails 8 Authentication Generator vs Devise: Which One Should You Use?",
    seoTitle: "Rails 8 Authentication vs Devise",
    description:
      "What the Rails 8 authentication generator creates, what it leaves out, and when Devise is still the better choice for a production Rails application.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
    readingMinutes: 6,
    intro:
      "Rails 8 added a built-in authentication generator, and new projects now face a choice that used to be automatic: generate the code or install Devise. Both are valid. The difference is how much you want to own and how many features you need on day one.",
    sections: [
      {
        heading: "What the Rails 8 generator creates",
        paragraphs: [
          "Running bin/rails generate authentication adds a User model with has_secure_password, a Session model and a Current model, a SessionsController and a PasswordsController, a PasswordsMailer for password resets, an Authentication concern included in ApplicationController, the login and reset views, migrations for users and sessions, and the bcrypt gem.",
          "It does not include sign-up. The official guide is explicit that you implement your own registration flow, views and routes.",
        ],
      },
      {
        heading: "What Devise adds",
        paragraphs: [
          "Devise is a mature engine with modules you enable as needed: registrations, email confirmation, account locking after failed attempts, session timeouts, remember-me, sign-in tracking and integration with OmniAuth for social and SSO logins. It also has a large ecosystem of extensions, for example for two-factor authentication.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Consider who maintains the code and which requirements are already on the table.",
        ],
        list: [
          "Choose the generator for internal tools and small products where login and password reset are enough, and where you prefer readable code in your own repository over a dependency.",
          "Choose Devise when you need confirmation emails, account locking, OmniAuth or SSO from the start, or when the team already knows it well.",
          "For existing apps on Devise, there is rarely a business reason to migrate; the risk of breaking login usually outweighs the benefit.",
        ],
      },
      {
        heading: "Security either way",
        paragraphs: [
          "Neither option is secure by default without review. Rate-limit login and password reset endpoints, make reset tokens expire, avoid revealing whether an email exists, log authentication events and add two-factor authentication for administrative accounts. A focused security review of the login flow is one of the cheapest ways to reduce risk in a Rails application.",
        ],
      },
    ],
    takeaways: [
      "The Rails 8 generator gives you login, sessions and password reset, but not sign-up.",
      "Devise brings registrations, confirmation, locking and OmniAuth out of the box.",
      "Generator for small apps you want to own; Devise for richer requirements.",
      "Review rate limits, token expiry and 2FA whichever you choose.",
    ],
    related: [
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/application-security-audit", label: "Application security audit" },
      { href: "/agenda?origen=us", label: "Book a 30-minute discovery call" },
    ],
  },
];

export const usBlogSlugs = usBlogPosts.map((post) => post.slug);

export function getUSBlogPost(slug: string): BlogPost | undefined {
  return usBlogPosts.find((post) => post.slug === slug);
}
