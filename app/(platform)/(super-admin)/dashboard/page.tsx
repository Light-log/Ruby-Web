import { StatCard } from "@/components/platform/shared/stat-card";
import { DataTable } from "@/components/platform/shared/data-table";
import { Badge } from "@/components/platform/shared/badge";
import {
  Building2,
  Users,
  MessageSquare,
  Cpu,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

// In production these come from the database via server actions
const mockStats = {
  totalCompanies: 48,
  activeCompanies: 41,
  totalUsers: 312,
  totalConversations: 18_420,
  aiCallsToday: 3_891,
  errorRate: "0.4%",
};

const recentCompanies = [
  { id: "1", name: "TechCorp SA", slug: "techcorp", plan: "Pro", status: "ACTIVE", users: 12, conversations: 1240 },
  { id: "2", name: "Retail Plus", slug: "retail-plus", plan: "Starter", status: "TRIAL", users: 3, conversations: 87 },
  { id: "3", name: "LogiSoft", slug: "logisoft", plan: "Enterprise", status: "ACTIVE", users: 45, conversations: 5630 },
  { id: "4", name: "MediConsult", slug: "mediconsult", plan: "Pro", status: "SUSPENDED", users: 8, conversations: 320 },
  { id: "5", name: "EduPlatform", slug: "eduplatform", plan: "Starter", status: "ACTIVE", users: 5, conversations: 445 },
];

const statusVariant: Record<string, "success" | "warning" | "danger" | "info"> = {
  ACTIVE: "success",
  TRIAL: "warning",
  SUSPENDED: "danger",
  CANCELLED: "danger",
};

type Company = typeof recentCompanies[number];

export default function SuperAdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Global</h1>
        <p className="mt-1 text-sm text-slate-400">
          Vista general de toda la plataforma omnicanal
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Empresas totales"
          value={mockStats.totalCompanies}
          change={`${mockStats.activeCompanies} activas`}
          trend="up"
          icon={Building2}
          iconColor="text-indigo-400"
          className="xl:col-span-1"
        />
        <StatCard
          title="Usuarios"
          value={mockStats.totalUsers}
          change="+14 este mes"
          trend="up"
          icon={Users}
          iconColor="text-emerald-400"
          className="xl:col-span-1"
        />
        <StatCard
          title="Conversaciones"
          value={mockStats.totalConversations.toLocaleString()}
          change="Último mes"
          trend="neutral"
          icon={MessageSquare}
          iconColor="text-blue-400"
          className="xl:col-span-1"
        />
        <StatCard
          title="Llamadas IA hoy"
          value={mockStats.aiCallsToday.toLocaleString()}
          change="OpenAI + Gemini"
          trend="up"
          icon={Cpu}
          iconColor="text-violet-400"
          className="xl:col-span-1"
        />
        <StatCard
          title="Tasa de error"
          value={mockStats.errorRate}
          change="Últimas 24h"
          trend="down"
          icon={AlertCircle}
          iconColor="text-amber-400"
          className="xl:col-span-1"
        />
        <StatCard
          title="Uptime"
          value="99.9%"
          change="30 días"
          trend="up"
          icon={TrendingUp}
          iconColor="text-emerald-400"
          className="xl:col-span-1"
        />
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[
          { label: "API Gateway", status: "ok", latency: "12ms" },
          { label: "OpenAI Router", status: "ok", latency: "340ms" },
          { label: "Gemini Router", status: "ok", latency: "280ms" },
          { label: "PostgreSQL", status: "ok", latency: "4ms" },
          { label: "Redis / BullMQ", status: "ok", latency: "1ms" },
          { label: "Webhook Queue", status: "degraded", latency: "–" },
        ].map((service) => (
          <div
            key={service.label}
            className="flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/50 p-4"
          >
            {service.status === "ok" ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
            ) : (
              <Clock className="h-4 w-4 flex-shrink-0 text-amber-400" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{service.label}</p>
              <p className="text-xs text-slate-400">Latencia: {service.latency}</p>
            </div>
            <Badge variant={service.status === "ok" ? "success" : "warning"}>
              {service.status === "ok" ? "OK" : "Degradado"}
            </Badge>
          </div>
        ))}
      </div>

      {/* Recent Companies */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Empresas recientes</h2>
          <a
            href="/platform/super-admin/companies"
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            Ver todas →
          </a>
        </div>
        <DataTable<Company>
          keyExtractor={(row) => row.id}
          columns={[
            { key: "name", header: "Empresa" },
            { key: "plan", header: "Plan", render: (row) => (
              <Badge variant="purple">{row.plan}</Badge>
            )},
            { key: "status", header: "Estado", render: (row) => (
              <Badge variant={statusVariant[row.status] ?? "default"}>{row.status}</Badge>
            )},
            { key: "users", header: "Usuarios", className: "text-right", headerClassName: "text-right" },
            {
              key: "conversations",
              header: "Conversaciones",
              className: "text-right",
              headerClassName: "text-right",
              render: (row) => row.conversations.toLocaleString(),
            },
            {
              key: "actions",
              header: "",
              render: (row) => (
                <a
                  href={`/platform/super-admin/companies/${row.slug}`}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Gestionar →
                </a>
              ),
            },
          ]}
          rows={recentCompanies}
        />
      </div>
    </div>
  );
}
