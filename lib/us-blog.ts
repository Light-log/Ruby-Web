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
  agendaHref: "/us/agenda",
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

const posts: BlogPost[] = [
  {
    slug: "rails-7-to-8-upgrade-guide",
    title: "Rails 7 to 8 Upgrade Guide: What Breaks and How to Plan the Upgrade",
    seoTitle: "Rails 7 to 8 Upgrade Guide: What Breaks",
    description:
      "How to upgrade a production app from Rails 7 to Rails 8: the version path, the Ruby requirement, the changes that actually break code, and a safe rollout plan.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-30",
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
      { href: "/us/rails-8-0-end-of-life", label: "Rails 8.0 end of life (November 7, 2026): what to do now" },
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/application-security-audit", label: "Application security audit" },
      { href: "/us/agenda", label: "Book a 30-minute discovery call" },
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
      { href: "/us/agenda", label: "Book a 30-minute discovery call" },
    ],
  },
  {
    slug: "rails-8-0-to-8-1-upgrade",
    title: "Upgrading from Rails 8.0 to 8.1: What Changes and What to Check",
    seoTitle: "Rails 8.1 Upgrade Guide: Moving from 8.0",
    description:
      "Rails 8.0 lost security patches on November 7, 2026. What changes when you move a production app to 8.1: removed behaviors, deprecations and a checklist.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-04",
    updatedAt: "2026-11-10",
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
      { href: "/us/rails-8-0-end-of-life", label: "Rails 8.0 end of life (November 7, 2026): what to do now" },
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/blog/rails-7-to-8-upgrade-guide", label: "Rails 7 to 8 upgrade guide" },
      { href: "/us/agenda", label: "Book a 30-minute discovery call" },
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
      { href: "/us/agenda", label: "Book a 30-minute discovery call" },
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
      { href: "/us/agenda", label: "Book a 30-minute discovery call" },
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
      { href: "/us/agenda", label: "Book a 30-minute discovery call" },
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
      { href: "/us/agenda", label: "Book a 30-minute discovery call" },
    ],
  },
  {
    slug: "ruby-on-rails-vs-node-vs-django",
    title: "Ruby on Rails vs Node.js vs Django for Business Apps in 2026",
    seoTitle: "Rails vs Node.js vs Django for Business Apps",
    description:
      "How to choose between Ruby on Rails, Node.js and Django for a business app in 2026: where each fits, the real trade-offs and the questions that decide.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-12",
    readingMinutes: 7,
    intro:
      "Rails, Node.js or Django? We hear the question in almost every discovery call for a new internal tool, SaaS or API. All three are mature and run serious products, so the honest answer depends less on benchmarks than on the kind of application you are building and on who will maintain it in two years. This guide compares them for business software, not for hello-world demos.",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Choose Rails when the product is a data-heavy business application, such as admin panels, internal tools, a B2B SaaS or an API, and you value shipping quickly on well-known conventions. Choose Node.js when your team already lives in JavaScript or TypeScript, or the product leans on real-time features. Choose Django when the application sits close to data analysis or machine learning in Python.",
          "Any of the three is a defensible choice. A badly maintained app hurts more than picking the second-best framework.",
        ],
      },
      {
        heading: "Ruby on Rails: conventions and speed for business apps",
        paragraphs: [
          "Rails makes many decisions for you: project structure, database access with Active Record, background jobs, email, file storage and security defaults. For applications built around forms, records, roles and workflows, that means less glue code and faster delivery. With Hotwire, many interactive screens can be built without a separate JavaScript front end.",
          "The trade-offs: the Rails talent pool is smaller than JavaScript's, and the framework rewards teams that follow its conventions. Performance is rarely the bottleneck for business apps, and recent Ruby versions include the YJIT just-in-time compiler.",
        ],
      },
      {
        heading: "Node.js: one language and a huge ecosystem",
        paragraphs: [
          "Node.js lets one team use JavaScript or TypeScript on both the front end and the back end, which simplifies hiring and sharing code. Its ecosystem is the largest of the three, and its event-driven model is a natural fit for real-time features such as chat, live dashboards or many simultaneous connections.",
          "The cost is choice. Node.js is a runtime, not a full framework, so you assemble the stack yourself: framework, ORM, background jobs, authentication and structure. Frameworks such as NestJS or a full-stack setup with Next.js reduce that, but architecture decisions still weigh more on the team.",
        ],
      },
      {
        heading: "Django: Python and an admin out of the box",
        paragraphs: [
          "Django shares Rails' batteries-included philosophy and adds an automatically generated admin interface that is genuinely useful for back-office work. Its biggest advantage is Python: when the product needs data analysis, reporting or machine learning, keeping everything in one language avoids an extra service.",
          "For typical CRUD-heavy business applications, Django and Rails deliver at a similar pace; the choice often comes down to which language the team and the surrounding systems already use.",
        ],
      },
      {
        heading: "The questions that actually decide",
        paragraphs: [
          "Before comparing frameworks, answer these with the people who will own the system.",
        ],
        list: [
          "Who will maintain the code in two years, and which language do they know?",
          "Is the product mostly forms, records and workflows, mostly real-time, or mostly data and models?",
          "Which systems must it integrate with, and do they have good libraries in each language?",
          "Can you hire or contract for that stack where you operate?",
          "Is there an existing application, and would a rewrite be justified at all?",
        ],
        ordered: true,
      },
    ],
    takeaways: [
      "Rails: fastest path for data-heavy business apps, admin panels and APIs.",
      "Node.js: one language across the stack and strong real-time support, with more decisions to make.",
      "Django: Rails-like productivity plus Python for data and machine learning.",
      "Pick by maintainers, product type and integrations, not by trend.",
    ],
    related: [
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/custom-internal-tools", label: "Custom internal tools" },
      { href: "/us/agenda", label: "Book a 30-minute discovery call" },
    ],
  },
  {
    slug: "ruby-3-2-end-of-life",
    title: "Ruby 3.2 End of Life: How to Upgrade a Rails App to Ruby 3.4",
    seoTitle: "Ruby 3.2 End of Life: Upgrade to Ruby 3.4",
    description:
      "Ruby 3.2 stopped receiving security fixes on March 31, 2026. What that means for a Rails app, whether to target Ruby 3.4 or 4.0, what breaks and a safe upgrade order.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-27",
    updatedAt: "2026-10-27",
    readingMinutes: 7,
    intro:
      "Ruby 3.2 reached end of life on March 31, 2026. Your Rails app keeps running, but any new vulnerability in the interpreter or its default libraries will not be fixed for that version. If the app also runs Rails 8.0, which loses security patches on November 7, 2026, it is a good moment to plan both upgrades, one after the other. This guide explains which Ruby to target, what tends to break and in what order to do the work.",
    sections: [
      {
        heading: "What end of life means for Ruby 3.2",
        paragraphs: [
          "Each Ruby release is maintained for a little over three years: bug fixes first, then security fixes only. After its end-of-life date, the Ruby core team stops releasing patches for it. For Ruby 3.2 that date was March 31, 2026, according to endoflife.date.",
          "Nothing breaks on that day. The risk is gradual: hosting images, gems and tooling slowly drop support, and when a security issue is published, the fix lands in newer versions only. The longer an app stays on an unsupported Ruby, the larger the jump becomes.",
        ],
        list: [
          "Ruby 3.2: end of life on March 31, 2026.",
          "Ruby 3.3: supported until March 31, 2027.",
          "Ruby 3.4: supported until March 31, 2028.",
          "Ruby 4.0: supported until March 31, 2029.",
        ],
      },
      {
        heading: "Ruby 3.4 or Ruby 4.0?",
        paragraphs: [
          "For most production Rails apps on 3.2 today, Ruby 3.4 is the sensible target. It has been out since December 2024, gems have had time to catch up, and it is supported until March 2028. Skipping 3.3 is fine: the Ruby team announces incompatibilities a version ahead, so going straight to 3.4 just means reading both sets of release notes.",
          "Ruby 4.0, released in December 2025, buys one more year of support but removes more: the CGI library is gone from the default gems except cgi/escape, several old Ractor methods were removed, and Net::HTTP no longer adds a default Content-Type header to requests. Its new ZJIT compiler is not recommended for production yet. Choose 4.0 when your critical gems already declare support for it; otherwise move to 3.4 now and plan 4.0 as a separate, smaller step.",
        ],
      },
      {
        heading: "What breaks between Ruby 3.2 and 3.4",
        paragraphs: [
          "These are the items from the official Ruby 3.3 and 3.4 release notes that most often surface in Rails applications.",
        ],
        list: [
          "Gems moved out of the default set: base64, bigdecimal, csv, drb, mutex_m, observer, getoptlong, nkf, syslog, abbrev, resolv-replace and rinda are now bundled gems. If your code or a gem requires them without declaring them, add them to the Gemfile. Ruby 3.3 already warns about this, but bootsnap hides the warning, so run once with DISABLE_BOOTSNAP=1.",
          "Mutating a string literal in a file without a frozen_string_literal comment now emits a deprecation warning when deprecation warnings are enabled. It is not an error yet, but it shows where code will break in a future version.",
          "Calling it with no arguments inside a block without parameters now refers to the block's first parameter. Test code that calls a method named it inside blocks deserves a look.",
          "Hash#inspect output changed to {user: 1} and {\"user\" => 1}, and error messages now open quotes with a single quote instead of a backtick. Tests that compare inspected hashes or exact error messages will fail.",
          "Smaller changes: Net::HTTP constants deprecated since 2012 were removed, Timeout.timeout rejects negative values, and the default URI parser now follows RFC 3986.",
        ],
      },
      {
        heading: "Upgrade Ruby first, then Rails",
        paragraphs: [
          "The official Rails upgrade guide recommends upgrading Ruby and Rails separately, Ruby first. Rails 8.0 and 8.1 require Ruby 3.2 or newer, so a Rails 8.0 app on Ruby 3.2 can move to Ruby 3.4 without touching Rails, deploy, and then upgrade Rails to 8.1 as a second project.",
          "Keeping the two changes apart matters in production: if something breaks, you know which upgrade caused it, and each deploy can be rolled back on its own. If you are on Rails 7.2, which already lost security support on August 9, 2026, check that your exact Rails version supports the target Ruby before you start, and follow our Rails 7 to 8 guide afterwards.",
        ],
      },
      {
        heading: "A short upgrade checklist",
        paragraphs: [
          "For a typical Rails app moving from Ruby 3.2 to 3.4, the work fits in these steps.",
        ],
        list: [
          "Check the current Ruby and Rails versions in Gemfile.lock and their support dates.",
          "Run the suite once on 3.2 with DISABLE_BOOTSNAP=1 and deprecation warnings enabled, and fix what they report.",
          "Add the bundled gems your app needs to the Gemfile and update gems that pin older Ruby versions.",
          "Switch .ruby-version, the Dockerfile and CI to Ruby 3.4, then run bundle install and the full test suite.",
          "Fix tests that depend on Hash#inspect output or exact error messages.",
          "Deploy Ruby alone, watch error tracking for a few days, then plan the Rails upgrade.",
        ],
        ordered: true,
      },
    ],
    takeaways: [
      "Ruby 3.2 has had no security fixes since March 31, 2026; Ruby 3.4 is supported until March 31, 2028.",
      "Target Ruby 3.4 now; move to 4.0 once your critical gems support it.",
      "Declare the gems that left the default set and run once without bootsnap to see the warnings.",
      "Upgrade Ruby first, deploy it alone, then upgrade Rails.",
    ],
    related: [
      { href: "/us/rails-expiry-check", label: "Check your Rails and Ruby support dates" },
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/blog/rails-8-0-to-8-1-upgrade", label: "Rails 8.0 to 8.1 upgrade guide" },
    ],
  },
  {
    slug: "is-rails-more-secure-than-php",
    title: "Is Rails More Secure Than PHP? What the 2025 Vulnerability Data Actually Shows",
    seoTitle: "Is Rails More Secure Than PHP? The 2025 Data",
    description:
      "Rails vs PHP and WordPress security: what Patchstack's 2025 data shows, which protections Rails turns on by default and why the advantage ends when your version loses support.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-10-27",
    updatedAt: "2026-10-27",
    readingMinutes: 6,
    intro:
      "Is Rails more secure than PHP? Counting CVEs per language does not answer it: the counts depend on how products are named, and PHP covers everything from Laravel apps to plugins written in an afternoon. A better question is where vulnerabilities actually come from. The 2025 data from the WordPress ecosystem gives a clear answer, and it explains why a well-maintained Rails app starts from a stronger position.",
    sections: [
      {
        heading: "Where PHP vulnerabilities come from",
        image: { src: "/blog/is-rails-more-secure-than-php/01.webp", alt: "3D model of a house whose façade is a grid of twelve doors, all standing open, one for each plugin", width: 1600, height: 900 },
        paragraphs: [
          "Patchstack's State of WordPress Security in 2026 report counted 11,334 new vulnerabilities in the WordPress ecosystem in 2025, 42% more than in 2024. Of those, 91% were in plugins and 9% in themes. WordPress core had only 6, all low priority.",
          "Two more figures from the same report show why this matters: 46% of the vulnerabilities had no fix from the developer when they became public, and the weighted median time to the first exploit was 5 hours. A typical WordPress site runs many plugins from different authors, and each one is a door that someone else has to keep locked.",
          "The language is not the problem. Laravel, for example, ships with CSRF protection and escaped template output, much like Rails. The difference is between an application built on one framework with secure defaults and a site assembled from many third-party plugins.",
        ],
      },
      {
        heading: "What Rails protects by default",
        image: { src: "/blog/is-rails-more-secure-than-php/02.webp", alt: "3D model of a reinforced steel door with its bolts locked, in front of a wall of open doors", width: 1600, height: 900 },
        paragraphs: [
          "Rails makes the safe option the default for the most common web attacks. These come from the official Rails guides.",
        ],
        list: [
          "CSRF: forgery protection is on by default in new Rails applications, and every form generated by Rails includes a security token.",
          "XSS: values printed in ERB views with <%= %> are escaped automatically; inserting raw HTML requires an explicit raw or html_safe.",
          "SQL injection: finders such as Model.find(id) escape input automatically, as do hash conditions like where(email: value). The risk returns when code builds SQL strings by hand.",
          "Mass assignment: with strong parameters, request parameters cannot be used to create or update records until each attribute is explicitly permitted.",
          "Secrets: credentials live in an encrypted file, config/credentials.yml.enc, and log filters for passwords, secrets and tokens are added by default.",
          "Passwords: has_secure_password and the Rails 8 authentication generator store bcrypt hashes, never plain text.",
        ],
      },
      {
        heading: "What Rails does not do for you",
        paragraphs: [
          "Defaults reduce mistakes; they do not remove them. String interpolation inside where(), a careless html_safe, an authorization check missing from one controller, or a gem with a known vulnerability can open the same holes as in any other stack. Tools such as Brakeman for static analysis and bundler-audit or Dependabot for gem advisories catch many of these before they ship.",
          "Gems are Rails' equivalent of plugins. What differs is how many you depend on and who maintains them, so review the Gemfile with the same care you would give a list of WordPress plugins.",
        ],
      },
      {
        heading: "The advantage ends when your version loses support",
        paragraphs: [
          "Every protection above assumes the framework still receives security patches. When a Rails version reaches end of life, new vulnerabilities in it are no longer fixed upstream, and the app is in the same position as a site running an abandoned plugin. Rails 7.2 lost security support on August 9, 2026, and Rails 8.0 loses it on November 7, 2026.",
          "Before comparing frameworks, check the one you already run. Our free Rails Expiry Check reads your Gemfile.lock in the browser and shows the exact support dates for your Rails and Ruby versions.",
        ],
      },
    ],
    takeaways: [
      "Counting CVEs per language is not a fair comparison; look at where vulnerabilities come from.",
      "In 2025, 91% of the 11,334 new WordPress-ecosystem vulnerabilities were in plugins, per Patchstack.",
      "Rails turns on CSRF protection, output escaping, safe finders and strong parameters by default.",
      "That advantage only lasts while your Rails and Ruby versions still receive security patches.",
    ],
    related: [
      { href: "/us/rails-expiry-check", label: "Free Rails Expiry Check" },
      { href: "/us/ruby-on-rails-consulting", label: "Ruby on Rails consulting and development" },
      { href: "/us/blog/rails-8-authentication-vs-devise", label: "Rails 8 authentication vs Devise" },
    ],
  },
  {
    // Datos y método: Ruby-Sociales-y-Marketing/resultados/2026-11-02-informe-rails/
    slug: "rails-version-report-november-2026",
    title: "Rails Version Report: 2 in 3 Active Rails Repos Will Run an Unsupported Version After November 7",
    seoTitle: "Rails Version Report: Unsupported Rails in 2026",
    description:
      "We read the Gemfile.lock of 395 active public Rails repositories. 47% already run a Rails version without security patches; when Rails 8.0 support ends on November 7, 2026, it becomes 66%.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-11-02",
    updatedAt: "2026-11-02",
    readingMinutes: 6,
    intro:
      "Rails 8.0 stops receiving security patches on November 7, 2026. To see what that means in practice, we looked at which Rails version 395 active public repositories actually lock in their Gemfile.lock. Almost half are already on a version that gets no security fixes, and Rails 8.0 is the second most used series in the sample, so on November 7 that share jumps to two in three. Below are the numbers, how we got them and what they do not tell you.",
    sections: [
      {
        heading: "The short version",
        paragraphs: [
          "All figures are from public GitHub repositories with Ruby as their main language, at least 5 stars and a push in the last 12 months, read on November 2, 2026.",
        ],
        list: [
          "47% of the repositories (185 of 395) lock a Rails version that no longer receives security patches: 7.2 or older.",
          "Rails 8.0 is the second most used series, with 19% of the sample (75 repositories).",
          "After November 7, 2026, the unsupported share rises to 66% (260 of 395).",
          "Among repositories with 50 or more stars, the share goes from 40% today to 55% after November 7.",
          "Being on a supported series is not the whole story: only 8 of the 75 Rails 8.0 repositories were on the latest 8.0 release (8.0.5.1), and 31 of 132 on the latest 8.1 release (8.1.4).",
        ],
      },
      {
        heading: "Which Rails versions active repositories run",
        paragraphs: [
          "Support dates are from endoflife.date. Rails 8.1 receives security fixes until October 10, 2027; Rails 7.2 lost them on August 9, 2026.",
        ],
        list: [
          "Rails 8.2 (pre-release): 3 repositories (1%).",
          "Rails 8.1: 132 (33%). Supported.",
          "Rails 8.0: 75 (19%). Supported until November 7, 2026.",
          "Rails 7.2: 44 (11%). No security patches since August 9, 2026.",
          "Rails 7.1: 38 (10%). No security patches since October 1, 2025.",
          "Rails 7.0: 27 (7%). No security patches since April 1, 2025.",
          "Rails 6.1: 30 (8%). No security patches since October 1, 2024.",
          "Rails 6.0 and older: 46 (12%), some going back to Rails 2.3.",
        ],
      },
      {
        heading: "What changes on November 7",
        paragraphs: [
          "Nothing breaks on the day. The app keeps running, but the next security issue found in Action Pack, Active Record or any other Rails component will be fixed in 8.1 and newer only. From then on, an 8.0 app has two options when an advisory is published: upgrade under pressure or carry the risk.",
          "The good news is that 8.0 is the cheapest series to move. The jump to 8.1 is a minor upgrade with a short list of deprecations, and it buys support until October 2027. Apps on 7.2 or older have a longer path, because Rails recommends upgrading one minor version at a time.",
        ],
      },
      {
        heading: "How we measured it",
        paragraphs: [
          "We used GitHub's repository search for public, non-fork, non-archived repositories with Ruby as the main language, at least 5 stars and a push between November 2025 and November 2, 2026. To spread the sample across the year, we searched in twelve 30-day windows and kept up to 300 results from each, 3,578 repositories in total.",
          "For each one we downloaded the Gemfile.lock from its default branch and read the exact Rails version it locks. 395 repositories had Rails in the lock file; the rest were gems, scripts or apps without a lock file. We then compared each version with its official support dates. We do not publish the names of the repositories: the point is the pattern, not any one project.",
        ],
      },
      {
        heading: "What this data does not tell you",
        paragraphs: [
          "Public repositories are not the same as production apps. The sample leans towards open source projects, gems that lock Rails only to run their tests, demos and side projects, and it leaves out private company code entirely. A recent push does not mean the code is deployed anywhere.",
          "With 395 repositories, the margin of error is about 5 percentage points either way. Treat the figures as a signal of how common unsupported Rails is, not as a census. If anything, private apps with no one assigned to upgrades are likely to lag further behind than public code that someone is actively pushing to.",
        ],
      },
      {
        heading: "If your app is in the 66%",
        paragraphs: [],
        ordered: true,
        list: [
          "Check the exact Rails and Ruby versions in your Gemfile.lock and their support dates.",
          "Whatever the series, move to its latest patch release now: it is the smallest change and it includes the security fixes already published.",
          "If you are on Rails 8.0, plan the move to 8.1 before your next feature cycle; it is usually a short project.",
          "If you are on 7.2 or older, map the path one minor version at a time and upgrade Ruby separately, before or after Rails.",
          "Assign someone to check support dates twice a year. Most apps fall behind because no one owns the upgrade, not because it is hard.",
        ],
      },
    ],
    takeaways: [
      "47% of 395 active public Rails repositories already lock a Rails version without security patches.",
      "Rails 8.0 is 19% of the sample; after November 7, 2026, the unsupported share reaches 66%.",
      "Few repositories run the latest patch of their series, even on supported versions.",
      "Rails 8.0 to 8.1 is the cheapest upgrade on the list and adds support until October 2027.",
    ],
    related: [
      { href: "/us/rails-expiry-check", label: "Free Rails Expiry Check" },
      { href: "/us/rails-8-0-end-of-life", label: "Rails 8.0 end of life: what to do now" },
      { href: "/us/blog/rails-8-0-to-8-1-upgrade", label: "Rails 8.0 to 8.1 upgrade guide" },
    ],
  },
  {
    slug: "rails-security-release-november-2026",
    title: "Rails Security Release, November 4, 2026: 21 Advisories and No Fix for Rails 7.2",
    seoTitle: "Rails Security Release Nov 2026: 21 Advisories",
    description:
      "Rails 8.1.4.1 and 8.0.5.2 fix 21 vulnerabilities, one critical in Active Storage. Who is affected, what to upgrade, and what to do on Rails 7.2 or older.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-10",
    readingMinutes: 7,
    intro:
      "On November 4, 2026 the Rails team released Rails 8.1.4.1 and 8.0.5.2, two security releases that fix 21 vulnerabilities: one critical, four high, thirteen medium and three low. The critical one lets an unauthenticated attacker write, and in some setups read, files on the server through an image upload. Only the 8.1 and 8.0 series get the fix. Rails 7.2 and every older version are unsupported and will not be patched, and Rails 8.0 itself loses security support three days later, on November 7. This guide explains which advisories matter most, how to tell whether your app is exposed, and what to do on each version.",
    sections: [
      {
        heading: "What was released",
        paragraphs: [
          "The official announcement on rubyonrails.org lists 21 GitHub security advisories. Most affect both 8.1 and 8.0; a few, such as the RemoteIp spoofing issue, exist only in 8.1. The Rails team strongly recommends upgrading as soon as possible and says that users of older versions should move to at least the 8.0 series.",
          "These are the five advisories rated critical or high:",
        ],
        list: [
          "Critical, GHSA-f3w6-w445-fwh9: possible arbitrary file write and read in Active Storage image analysis through ImageMagick. Attaching an upload is enough; no variant or preview is needed.",
          "High, GHSA-v924-7rp8-4mxh: possible arbitrary file read and remote code execution in Active Storage video previews, analysis and image processing, because the external tools choose a decoder from the uploaded file extension.",
          "High, GHSA-wm3x-v3qw-4jh3: Strong Parameters bypass when the return value of Parameters#each_key is passed to mass assignment, an incomplete fix of CVE-2020-8164.",
          "High, GHSA-2gff-2mmg-m73p (8.1 only): request.remote_ip can be spoofed with a Forwarded header when the proxy does not strip it, which can bypass IP-based rate limits and access rules.",
          "High, GHSA-8474-xrp6-wh69: denial of service through safe_constantize, reachable by unauthenticated clients of the default Action Cable endpoint.",
        ],
      },
      {
        heading: "The critical one: Active Storage and ImageMagick",
        paragraphs: [
          "ImageMagick picks how to read a file from its content, and some of its coders act on other files named inside the image. Active Storage did not restrict them, and its ImageMagick analyzer runs as soon as a file is attached. A crafted upload can therefore write files on the server and, if attachments are stored with the Disk service, read files the application can read, such as secret_key_base and credentials for other systems.",
          "According to the advisory, an application is affected when all three conditions hold: it uses ImageMagick for Active Storage (config.active_storage.variant_processor = :mini_magick, the default for apps on load_defaults 6.1 or earlier), its ImageMagick security policy does not already deny the coders involved (the policies packaged by Debian and Ubuntu do not), and it accepts uploads from untrusted users.",
          "Apps that use libvips are not exposed to this advisory, but they can still be exposed to the video and audio one, because Active Storage analyzes video and audio attachments on upload by default.",
        ],
      },
      {
        heading: "Is your app affected?",
        paragraphs: ["Answer these in order. Each one takes a minute with the repository open."],
        list: [
          "Which Rails version does Gemfile.lock pin? Anything below 8.0.5.2, or 8.1 below 8.1.4.1, is missing these fixes. On 7.2 or older there is no fixed version to install.",
          "Does the app use Active Storage with uploads from users you do not control: avatars, documents, attachments in a form?",
          "Which variant processor does it use? Look for config.active_storage.variant_processor in config/application.rb or config/environments/production.rb. If it is missing, check config.load_defaults: 6.1 or earlier means ImageMagick; 7.0 or later means libvips.",
          "Are attachments stored with the Disk service (config/storage.yml)? Combined with ImageMagick, that is the case in which the advisory asks you to rotate secrets.",
          "Does the app mount Action Cable and accept connections without authentication? That is the path to the safe_constantize denial of service.",
        ],
        ordered: true,
      },
      {
        heading: "If you are on Rails 8.0 or 8.1",
        paragraphs: [
          "Upgrade to 8.1.4.1 or 8.0.5.2 and deploy. These are patch releases, so they should not need code changes, with three exceptions worth checking before you deploy.",
          "If you are on 8.0, plan the move to 8.1 right after this patch: 8.0.5.2 is the last security release of the 8.0 series, which reached end of life on November 7, 2026.",
        ],
        list: [
          "An app with variant_processor = :mini_magick needs mini_magick 5.1 or newer. With an older mini_magick the app raises an exception during boot, so update it in the same change.",
          "The fixed releases ship an ImageMagick policy that denies Ghostscript. An app that renders PDF or PostScript through ImageMagick must re-allow the gs delegate and the coders it uses in the host's policy.xml.",
          "Action View now requires rails-html-sanitizer 1.7.2 or later. Sanitized HTML is serialized slightly differently, so tests that compare it as a string may fail.",
          "If the app used ImageMagick with the Disk service and accepted uploads from strangers, change secret_key_base, the master key, the values in credentials.yml.enc, storage and database credentials, and third-party tokens. Upgrading closes the hole but does not undo a leak that already happened.",
        ],
      },
      {
        heading: "If you are on Rails 7.2 or older",
        paragraphs: [
          "There is no fixed version for you. Rails 7.2 lost security support on August 9, 2026, and the Rails team does not backport these patches. The realistic plan is to reduce exposure now and schedule the upgrade.",
        ],
        list: [
          "Copy the rules of the policy shipped in the fixed releases, activestorage/lib/active_storage/image_magick/policy.xml, into ImageMagick's system policy, for example /etc/ImageMagick-7/policy.xml. At a minimum, deny the MSL coder, the Ghostscript coders and the gs delegate. This also protects ImageMagick calls outside Active Storage.",
          "If you do not need video or audio analysis, consider limiting which content types users can upload until you upgrade.",
          "If you do not use Action Cable, remove the endpoint with config.action_cable.mount_path = nil; if you do, reject unauthenticated connections in ApplicationCable::Connection.",
          "Search the code for each_key and make sure its return value never reaches new, update or assign_attributes.",
          "Plan the upgrade one minor version at a time toward 8.1, which is supported until October 2027. Going to 8.0 now would leave you unsupported again in three days.",
        ],
      },
      {
        heading: "What we saw in 395 active public Rails repositories",
        paragraphs: [
          "On November 4 we re-read the Gemfile.lock and configuration of the 395 active public repositories from our Rails Version Report, a few hours after the release. These are public projects, the default branch is not necessarily what runs in production, and we cannot see whether they accept uploads or harden ImageMagick, so treat the numbers as an order of magnitude, not an audit.",
        ],
        list: [
          "7 of 395 (1.8%) already locked a fixed version a few hours after the release.",
          "185 of 395 (46.8%) are on Rails 7.2 or older, a series that will not receive these fixes at all.",
          "19 of 395 (4.8%) are configured to use ImageMagick for Active Storage, the first condition of the critical advisory. 13 of those 19 are on Rails 7.2 or older.",
          "11 of those 19 lock mini_magick older than 5.1, so the patched Rails would fail to boot until mini_magick is updated too.",
        ],
      },
    ],
    takeaways: [
      "Rails 8.1.4.1 and 8.0.5.2, released November 4, 2026, fix 21 vulnerabilities, one of them critical.",
      "The critical issue needs ImageMagick for Active Storage plus uploads from untrusted users; apps on load_defaults 6.1 or earlier use ImageMagick by default.",
      "Rails 7.2 and older get no fix: harden ImageMagick's policy now and plan the upgrade to 8.1.",
      "On 8.0, apply 8.0.5.2 and upgrade to 8.1: 8.0 lost security support on November 7, 2026.",
    ],
    related: [
      { href: "/us/rails-expiry-check", label: "Free Rails Expiry Check" },
      { href: "/us/blog/rails-version-report-november-2026", label: "Rails Version Report: 2 in 3 repos unsupported after November 7" },
      { href: "/us/blog/rails-7-to-8-upgrade-guide", label: "Rails 7 to 8 upgrade guide" },
    ],
  },
  {
    slug: "rails-8-0-end-of-life-what-to-do",
    title: "Rails 8.0 Reached Official End of Life: What It Means and How to Move to 8.1",
    seoTitle: "Rails 8.0 End of Life: Migration & Next Steps",
    description:
      "Rails 8.0 security patches ended on November 7, 2026. What that means after the November 4 vulnerabilities, how to audit exposure, and how to upgrade to 8.1.",
    eyebrow: "Ruby on Rails",
    publishedAt: "2026-11-14",
    updatedAt: "2026-11-14",
    readingMinutes: 7,
    intro:
      "On November 7, 2026, Rails 8.0 reached official end of life (EOL), exactly two years after its release. Under the Rails maintenance policy, 8.0 had already stopped receiving bug fixes in May 2026; as of November 7, security patches have ceased entirely. This transition arrived right after the November 4 security wave, which dropped 21 advisories across the ecosystem. If your production application is running Rails 8.0 or older, here is what official EOL means for your security posture and the exact roadmap to move safely to Rails 8.1.",
    sections: [
      {
        heading: "The maintenance policy: where Rails versions stand today",
        paragraphs: [
          "The Rails core team maintains each major or minor release series under a strict timeline: normal bug fixes for 18 months, followed by security patches for an additional 6 months, giving each series a total lifespan of two years. Once a series reaches its second anniversary, it receives no further patches of any severity.",
          "As of November 14, 2026, the status of recent Rails releases is:",
        ],
        list: [
          "Rails 8.1: fully supported. Receives active bug fixes and all security patches.",
          "Rails 8.0: end of life as of November 7, 2026. Its final release was 8.0.5.2 on November 4, 2026.",
          "Rails 7.2: end of life since August 2026. Received zero patches during the November 4 security advisory cycle.",
          "Rails 7.1 and older: completely unmaintained and vulnerable to multiple known CVEs.",
        ],
      },
      {
        heading: "Why running 8.0 post-EOL is dangerous after the November 4 release",
        paragraphs: [
          "The November 4 release was an eye-opener: 21 GitHub security advisories were published simultaneously, including a critical vulnerability in Active Storage image analysis via ImageMagick (GHSA-f3w6-w445-fwh9) that allows arbitrary file reads and writes on unpatched servers.",
          "While Rails 8.0 did receive a last-minute patch (8.0.5.2) on November 4, any vulnerability discovered from November 8 onward will never be backported to 8.0. If a new zero-day surfaces in Action Pack, Active Record, or Action View, 8.0 applications will remain permanently unpatched.",
          "Beyond technical exposure, running an unmaintained framework creates immediate governance friction. Cyber insurance policies increasingly exclude breach damages originating from end-of-life software, and SOC 2 or ISO 27001 auditors routinely flag Gemfile dependencies that have crossed vendor EOL dates.",
        ],
      },
      {
        heading: "Audit your application: 3-step checklist before touching code",
        paragraphs: [
          "Before planning a sprint, verify your true production dependency tree rather than relying on development memory:",
        ],
        list: [
          "Check Gemfile.lock, not Gemfile: confirm whether rails is pinned below 8.0.5.2, and note your bundled Ruby version. Rails 8.1 requires Ruby 3.2 or newer, with Ruby 3.3 or 3.4 strongly recommended.",
          "Verify the November 4 baseline: if you are still on 8.0.x below 8.0.5.2, patch to 8.0.5.2 first. It is always safer to resolve known security holes before executing a minor version transition.",
          "Audit deprecation warnings: run your test suite with deprecation logging enabled (config.active_support.deprecation = :log or :raise in test). Deprecations in 8.0 become hard errors in 8.1.",
        ],
        ordered: true,
      },
      {
        heading: "The upgrade path: from 8.0 to 8.1 with zero downtime",
        paragraphs: [
          "Upgrading from Rails 8.0 to 8.1 is an incremental minor release, not an architectural overhaul. In a well-tested application, the migration can be executed in a few focused steps:",
          "1. Update the dependency: update your Gemfile to gem \x27rails\x27, \x27~> 8.1.4.1\x27 and run bundle update rails. Verify that dependent gems (like devise, sidekiq, or mini_magick) resolve cleanly.",
          "2. Run the update task: execute bin/rails app:update to generate framework defaults. Review interactive diffs in config/environments/ and initializers carefully, accepting new security headers and session options.",
          "3. Adopt new defaults gradually: keep config.load_defaults 8.0 in config/application.rb initially. Once all staging tests pass and the release is live, enable individual 8.1 flags in config/initializers/new_framework_defaults_8_1.rb before finally flipping load_defaults to 8.1.",
        ],
      },
      {
        heading: "When your team cannot pause feature delivery",
        paragraphs: [
          "Most engineering teams want to stay on supported versions, but roadmaps, customer deadlines, and backlog pressure push framework upgrades to \x27next quarter\x27. The danger is that deferred upgrades compound: moving from 8.0 to 8.1 takes days, but waiting until you must jump from 8.0 to 9.0 turns into a multi-month rescue project with elevated production risk.",
          "At DEVRUBY, we perform scoped, incremental Rails upgrades for businesses with active production workloads. We assess the application repository, identify gem incompatibilities up front, and guarantee green test suites before any code lands in your main branch.",
        ],
      },
    ],
    takeaways: [
      "Rails 8.0 reached official end of life on November 7, 2026; no new security patches will be released for it.",
      "The last supported patch for 8.0 is 8.0.5.2; every version prior to it is exposed to the November 4 CVEs.",
      "Upgrading from 8.0 to 8.1 is a minor, non-breaking upgrade that should be scheduled immediately.",
      "Running EOL frameworks creates security blindspots, insurance liabilities, and compliance audit failures.",
    ],
    related: [
      { href: "/us/rails-expiry-check", label: "Free Rails Expiry Check" },
      { href: "/us/ruby-on-rails-consulting", label: "Rails consulting, upgrades & rescue services" },
      { href: "/us/blog/rails-security-release-november-2026", label: "Rails Security Release Nov 2026: 21 advisories" },
      { href: "/us/blog/rails-8-0-to-8-1-upgrade", label: "Rails 8.0 to 8.1 upgrade guide" },
    ],
  },
];

// Las guías de Rails traen tráfico de Google pero nadie pasa a nada (GA4, oct-2026): Expiry Check bajo la intro.
// `ref` por artículo para ver en /api/uso cuál convierte. Texto revisado el 10/11/2026 (8.0 ya sin soporte).
export const usBlogPosts: BlogPost[] = posts.map((post) =>
  post.eyebrow === "Ruby on Rails"
    ? {
        ...post,
        cta: {
          href: `/us/rails-expiry-check?ref=blog-${post.slug}`,
          label: "Rails 8.0 stopped getting security patches on November 7, 2026. Is your app affected? Check your Gemfile.lock in 10 seconds: free, and the file never leaves your browser.",
        },
      }
    : post,
);

export const usBlogSlugs = usBlogPosts.map((post) => post.slug);

export function getUSBlogPost(slug: string): BlogPost | undefined {
  return usBlogPosts.find((post) => post.slug === slug);
}
