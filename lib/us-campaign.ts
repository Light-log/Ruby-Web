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
    title: "Application Security Audit Services for U.S. Businesses",
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
} as const;

export type USServiceSlug = keyof typeof usServices;
export const usServiceSlugs = Object.keys(usServices) as USServiceSlug[];
export const isUSServiceSlug = (value: string): value is USServiceSlug => value in usServices;
