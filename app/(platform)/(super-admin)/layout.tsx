import { SidebarNav } from "@/components/platform/shared/sidebar-nav";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Bot,
  Activity,
  Shield,
  Globe,
  Flag,
  Receipt,
  AlertCircle,
} from "lucide-react";

const navGroups = [
  {
    title: "General",
    items: [
      { href: "/platform/super-admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Tenants",
    items: [
      { href: "/platform/super-admin/companies", label: "Empresas", icon: Building2 },
      { href: "/platform/super-admin/users", label: "Usuarios", icon: Users },
      { href: "/platform/super-admin/plans", label: "Planes", icon: CreditCard },
    ],
  },
  {
    title: "IA & Seguridad",
    items: [
      { href: "/platform/super-admin/ai-providers", label: "Proveedores IA", icon: Bot },
      { href: "/platform/super-admin/allowed-domains", label: "Dominios Permitidos", icon: Globe },
      { href: "/platform/super-admin/audit", label: "Auditoría", icon: Shield },
    ],
  },
  {
    title: "Sistema",
    items: [
      { href: "/platform/super-admin/monitoring", label: "Monitoreo", icon: Activity },
      { href: "/platform/super-admin/feature-flags", label: "Feature Flags", icon: Flag },
      { href: "/platform/super-admin/billing", label: "Facturación", icon: Receipt },
      { href: "/platform/super-admin/errors", label: "Errores", icon: AlertCircle },
    ],
  },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-slate-700/60 bg-slate-800/80">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-700/60 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">Super Admin</p>
            <p className="text-[10px] text-slate-400">Control de plataforma</p>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto p-4">
          <SidebarNav groups={navGroups} />
        </div>

        {/* Footer */}
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

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
