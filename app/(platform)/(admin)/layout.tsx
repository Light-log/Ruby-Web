import { SidebarNav } from "@/components/platform/shared/sidebar-nav";
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Layers,
  Code2,
  Radio,
  Headphones,
  FlaskConical,
  Settings,
} from "lucide-react";

const navGroups = [
  {
    items: [
      { href: "/platform/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Conversaciones",
    items: [
      { href: "/platform/admin/ai-config", label: "IA Generativa", icon: Bot },
      { href: "/platform/admin/flows", label: "Flujos", icon: MessageSquare },
      { href: "/platform/admin/components", label: "Componentes", icon: Layers },
    ],
  },
  {
    title: "Automatización",
    items: [
      { href: "/platform/admin/logic", label: "Lógica & Scripts", icon: Code2 },
      { href: "/platform/admin/channels", label: "Canales", icon: Radio },
    ],
  },
  {
    title: "Live",
    items: [
      { href: "/platform/admin/live-config", label: "Config. Live", icon: Headphones },
    ],
  },
  {
    title: "Herramientas",
    items: [
      { href: "/platform/admin/sandbox", label: "Pruebas & Sandbox", icon: FlaskConical },
      { href: "/platform/admin/settings", label: "Configuración", icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-slate-700/60 bg-slate-800/80">
        <div className="flex h-16 items-center gap-3 border-b border-slate-700/60 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">Admin Panel</p>
            <p className="text-[10px] text-slate-400">Experiencia conversacional</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <SidebarNav groups={navGroups} />
        </div>

        <div className="border-t border-slate-700/60 px-4 py-3">
          <form action="/api/platform/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-400 hover:bg-slate-700/60 hover:text-white transition-colors"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
