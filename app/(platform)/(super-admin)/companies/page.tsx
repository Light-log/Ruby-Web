"use client";

import { useState } from "react";
import { Badge } from "@/components/platform/shared/badge";
import { DataTable } from "@/components/platform/shared/data-table";
import { Building2, Plus, Search, Filter } from "lucide-react";

const companies = [
  { id: "1", name: "TechCorp SA", slug: "techcorp", plan: "Pro", status: "ACTIVE", users: 12, agents: 4, channels: 3, aiCalls: 4200, createdAt: "2025-01-15" },
  { id: "2", name: "Retail Plus", slug: "retail-plus", plan: "Starter", status: "TRIAL", users: 3, agents: 1, channels: 1, aiCalls: 120, createdAt: "2026-02-10" },
  { id: "3", name: "LogiSoft", slug: "logisoft", plan: "Enterprise", status: "ACTIVE", users: 45, agents: 12, channels: 5, aiCalls: 28400, createdAt: "2024-08-01" },
  { id: "4", name: "MediConsult", slug: "mediconsult", plan: "Pro", status: "SUSPENDED", users: 8, agents: 3, channels: 2, aiCalls: 0, createdAt: "2024-11-20" },
  { id: "5", name: "EduPlatform", slug: "eduplatform", plan: "Starter", status: "ACTIVE", users: 5, agents: 2, channels: 2, aiCalls: 980, createdAt: "2025-06-01" },
  { id: "6", name: "FinanceHub", slug: "financehub", plan: "Enterprise", status: "ACTIVE", users: 30, agents: 8, channels: 4, aiCalls: 15600, createdAt: "2024-03-15" },
];

type Company = typeof companies[number];

const statusVariant: Record<string, "success" | "warning" | "danger" | "info"> = {
  ACTIVE: "success",
  TRIAL: "warning",
  SUSPENDED: "danger",
  CANCELLED: "danger",
};

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="h-6 w-6 text-indigo-400" />
            Empresas
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Gestión global de tenants ({companies.length} empresas)
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
          <Plus className="h-4 w-4" />
          Nueva empresa
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar empresa..."
            className="w-full rounded-lg border border-slate-600 bg-slate-700/50 pl-9 pr-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          {["ALL", "ACTIVE", "TRIAL", "SUSPENDED", "CANCELLED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {s === "ALL" ? "Todos" : s}
            </button>
          ))}
        </div>
      </div>

      <DataTable<Company>
        keyExtractor={(row) => row.id}
        rows={filtered}
        emptyMessage="No se encontraron empresas"
        columns={[
          {
            key: "name",
            header: "Empresa",
            render: (row) => (
              <div>
                <p className="font-medium text-white">{row.name}</p>
                <p className="text-xs text-slate-400">/{row.slug}</p>
              </div>
            ),
          },
          {
            key: "plan",
            header: "Plan",
            render: (row) => <Badge variant="purple">{row.plan}</Badge>,
          },
          {
            key: "status",
            header: "Estado",
            render: (row) => (
              <Badge variant={statusVariant[row.status] ?? "default"}>{row.status}</Badge>
            ),
          },
          {
            key: "users",
            header: "Usuarios",
            className: "text-center",
            headerClassName: "text-center",
          },
          {
            key: "agents",
            header: "Agentes",
            className: "text-center",
            headerClassName: "text-center",
          },
          {
            key: "channels",
            header: "Canales",
            className: "text-center",
            headerClassName: "text-center",
          },
          {
            key: "aiCalls",
            header: "IA (mes)",
            className: "text-right",
            headerClassName: "text-right",
            render: (row) => row.aiCalls.toLocaleString(),
          },
          {
            key: "createdAt",
            header: "Creada",
            render: (row) => (
              <span className="text-slate-400 text-xs">{row.createdAt}</span>
            ),
          },
          {
            key: "actions",
            header: "",
            render: (row) => (
              <div className="flex items-center gap-3">
                <a href={`/platform/super-admin/companies/${row.slug}`} className="text-xs text-indigo-400 hover:text-indigo-300">
                  Gestionar
                </a>
                <button className="text-xs text-amber-400 hover:text-amber-300">
                  {row.status === "ACTIVE" ? "Suspender" : "Activar"}
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
