export const usServices = {
  "custom-internal-tools": {
    label: "Custom internal tools",
    title: "Custom Internal Tools for U.S. Businesses",
    description:
      "DEVRUBY LLC builds custom internal tools and web applications for U.S. businesses that need clearer operations, controlled access, and maintainable software.",
    eyebrow: "Custom software for operations",
    headline: "Build the internal tool your operation actually needs",
    intro:
      "When spreadsheets, email threads, and off-the-shelf tools no longer reflect how work gets done, a focused internal tool can bring the process into one reliable place.",
    pains: [
      "Critical work is distributed across spreadsheets, inboxes, and disconnected SaaS tools.",
      "Teams repeat the same updates to keep customers, work, or records in sync.",
      "Existing CRM or ERP software needs a workflow, portal, or operational layer it does not provide.",
    ],
    deliverables: [
      "A discovery process covering users, workflows, rules, and existing systems.",
      "A web application or internal portal with roles and access appropriate to the work.",
      "Documented APIs and integrations where they are needed.",
      "Deployment guidance and technical handoff documentation.",
    ],
    fit: "Best for service businesses and operations teams with a repeatable process that generic software no longer supports well.",
    faqs: [
      ["When is a custom internal tool the right choice?", "When your team has a repeatable process that is core to the business and standard tools are creating workarounds, duplicate data, or lost visibility. The first call is used to determine whether custom software is actually justified."],
      ["Can you work with our existing CRM or ERP?", "Yes. We review the systems, APIs, data exports, and permissions before proposing the integration approach. Technical limits are identified before the scope is committed."],
      ["Where is DEVRUBY based?", "DEVRUBY LLC is a U.S. company working remotely with businesses nationwide. Projects are run through structured calls, shared documentation, and scheduled demonstrations."],
    ],
  },
  "workflow-automation": {
    label: "Workflow automation",
    title: "Workflow Automation Services for U.S. Businesses",
    description:
      "DEVRUBY LLC designs workflow automation for U.S. businesses that want to reduce repetitive operational work while keeping the right approvals and visibility.",
    eyebrow: "Business process automation",
    headline: "Remove manual handoffs without losing control of the process",
    intro:
      "Automation works when it follows the real workflow: what starts the work, what needs approval, what data must be recorded, and what should happen when something is incomplete.",
    pains: [
      "Staff copy data between email, forms, CRM, billing tools, and spreadsheets.",
      "Work stalls because follow-ups and approvals depend on individual memory.",
      "Exceptions are hard to see until they become an operational issue.",
    ],
    deliverables: [
      "Workflow mapping, including owners, approvals, and exceptions.",
      "Automated capture, validation, notifications, and updates between approved systems.",
      "Alerts and activity records for work that requires human judgment.",
      "Clear documentation for maintaining and evolving the workflow.",
    ],
    fit: "Best for teams already running a digital process that is repeated often enough for manual work to become a constraint.",
    faqs: [
      ["Do we have to replace our current tools?", "Usually not. The goal is to preserve systems that work and connect the points where manual handoffs, duplicate data, or delays are occurring."],
      ["Will automation remove human oversight?", "No. Good automation preserves approvals and exception handling where people need to apply context. It removes repetitive work, not accountable decision-making."],
      ["What happens in the first call?", "We review the workflow, systems involved, volume, and desired outcome. You leave knowing whether automation, integration, or a custom tool is the most sensible next step."],
    ],
  },
  "api-integration-services": {
    label: "API integration services",
    title: "API Integration Services for U.S. Businesses",
    description:
      "Connect CRM, ERP, billing, customer portals, and SaaS platforms with reliable API integrations built around your operational workflow.",
    eyebrow: "API and systems integration",
    headline: "Make your business systems share the right information",
    intro:
      "Disconnected tools create contradictory records and unnecessary manual work. We define system ownership, validation rules, and error handling before moving information between platforms.",
    pains: [
      "Sales, operations, and finance see different versions of the same customer or order.",
      "Teams rely on CSV exports and imports to keep systems aligned.",
      "Existing APIs lack documentation, error handling, or clear access controls.",
    ],
    deliverables: [
      "Assessment of source and destination systems, data, permissions, and technical limits.",
      "API integrations, synchronization flows, and validation for the agreed use case.",
      "Logging and alerts that make failures visible to the right people.",
      "Technical documentation that supports future maintenance.",
    ],
    fit: "Best for businesses using multiple core systems and needing consistent data across CRM, ERP, billing, portals, or proprietary software.",
    faqs: [
      ["Can you integrate a legacy system?", "We first assess the real options: an API, data export, database access, or a safe intermediary layer. Feasibility and risk are discussed before implementation begins."],
      ["How do you handle failed syncs?", "The approach includes validation, activity logs, retries, and an exception path appropriate to the systems and business risk involved."],
      ["Can you build a new API as well?", "Yes. When a business needs its own integration surface, we can design a documented API with authentication and access boundaries suited to authorized consumers."],
    ],
  },
  "application-security-audit": {
    label: "Application security audit",
    title: "Application Security Audit Services",
    description:
      "A focused technical review of web applications, APIs, and cloud configuration to identify security risks and prioritize practical remediation.",
    eyebrow: "Application and API security review",
    headline: "Understand the technical risks in your application before they become an incident",
    intro:
      "A useful security review gives the technical team evidence, priority, and a practical remediation path. We work only within an explicitly authorized scope.",
    pains: [
      "An application has grown without a recent review of access, secrets, or public exposure.",
      "A migration, integration, or launch requires a clearer view of technical risk.",
      "The team lacks a single view of API controls, dependencies, or cloud configuration.",
    ],
    deliverables: [
      "A written scope and authorization before technical checks begin.",
      "A focused review of the agreed application, API, and/or cloud environment.",
      "A technical report with evidence, priority, and remediation guidance.",
      "A review session to help turn findings into an actionable next step.",
    ],
    fit: "Best for teams that need a focused, technical review of an existing web application, API, or cloud environment.",
    faqs: [
      ["Is this a compliance certification?", "No. This is a technical security review for an agreed scope. It does not replace legal advice, compliance certification, or formal assessments such as SOC 2, HIPAA, PCI DSS, or ISO 27001."],
      ["What do you need before starting?", "We need a description of the system, written authorization, allowed environments, and a technical contact. Nothing is tested outside the agreed scope."],
      ["Can you remediate the findings?", "Yes. After the review, we can propose a separate remediation scope for the software or infrastructure based on the findings and their priority."],
    ],
  },
  "ruby-on-rails-consulting": {
    label: "Ruby on Rails consulting",
    title: "Ruby on Rails Consulting & Development",
    description:
      "Ruby on Rails consulting and development for U.S. businesses: new Rails applications, upgrades of legacy apps, APIs, performance work, and security reviews.",
    eyebrow: "Ruby on Rails development",
    headline: "Rails engineering for applications your business depends on",
    intro:
      "Many U.S. businesses run core operations on a Rails application that has grown for years. We help build new Rails products and keep existing ones upgradeable, tested, and secure, without rewriting what still works.",
    pains: [
      "The application runs on an outdated Ruby or Rails version and every upgrade feels risky.",
      "Releases slow down because test coverage is thin and nobody wants to touch certain models.",
      "Background jobs, slow queries, or N+1 issues are hurting response times as data grows.",
    ],
    deliverables: [
      "A technical assessment of the codebase, gems, Ruby/Rails versions, tests, and deployment.",
      "Incremental Ruby and Rails upgrades with a tested path for each step.",
      "New features, APIs, and integrations built in idiomatic Rails with automated tests.",
      "Performance and security fixes backed by profiling and tools such as Brakeman and bundler-audit.",
    ],
    fit: "Best for teams that own a Rails application in production, or are starting one, and need senior help without hiring a full in-house team.",
    guide: { href: "/us/blog/rails-7-to-8-upgrade-guide", label: "Rails 7 to 8 upgrade guide: what breaks and how to plan it" },
    faqs: [
      ["Can you take over an existing Rails application?", "Yes. We start with a read-only assessment of the repository, dependencies, tests, and deployment so the first scope is based on what the code actually needs, not on assumptions."],
      ["Do you recommend rewriting old Rails apps?", "Rarely. An incremental upgrade usually preserves business rules that are hard to rediscover. A rewrite is discussed only when the assessment shows the existing code cannot be safely evolved."],
      ["Can you work alongside our developers?", "Yes. We can contribute through your repository, pull requests, and review process, and leave documentation so your team keeps ownership of the code."],
    ],
  },
  "ai-workflow-automation": {
    label: "AI workflow automation",
    title: "AI Workflow Automation Services",
    description:
      "AI workflow automation for U.S. businesses: document extraction, email triage, and data entry handled by language models with human review where it matters.",
    eyebrow: "AI-assisted process automation",
    headline: "Use AI where it removes real work, with people in control of decisions",
    intro:
      "Language models are good at reading documents, emails, and free text that rule-based automation cannot handle. We add them to existing workflows with validation, audit trails, and a human review step for anything that carries risk.",
    pains: [
      "Staff read invoices, forms, or emails just to retype the same fields into another system.",
      "Requests arrive by email in different formats and someone has to sort and route each one.",
      "A previous AI pilot produced impressive demos but no reliable process anyone uses daily.",
    ],
    deliverables: [
      "Selection of the workflow steps where AI is useful and the ones that should stay rule-based.",
      "Extraction, classification, or summarization connected to your current tools through APIs.",
      "Confidence checks, human review queues, and logs for every automated decision.",
      "An evaluation set built from your own examples to measure accuracy before and after launch.",
    ],
    fit: "Best for teams handling a steady volume of documents, emails, or requests where the information is predictable but the format is not.",
    guide: { href: "/us/blog/ai-automation-for-small-businesses", label: "AI automation for small businesses: what to automate first" },
    faqs: [
      ["Will AI make decisions without human approval?", "Only where you decide the risk is acceptable. Approvals, payments, and anything customer-facing can stay behind a review step, with the model preparing the work instead of finalizing it."],
      ["What happens to our data?", "We agree on the data flow before building: which provider processes it, under what terms, and what is stored. Sensitive fields can be masked or kept out of the model entirely."],
      ["How is this different from your workflow automation service?", "Workflow automation connects systems with fixed rules. AI workflow automation adds a model for the steps that require reading or interpreting unstructured content, and usually builds on the same integrations."],
    ],
  },
} as const;

export type USServiceSlug = keyof typeof usServices;
export const usServiceSlugs = Object.keys(usServices) as USServiceSlug[];
export const isUSServiceSlug = (value: string): value is USServiceSlug =>
  Object.hasOwn(usServices, value);
