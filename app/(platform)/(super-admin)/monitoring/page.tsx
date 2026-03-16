import { Activity, AlertCircle, CheckCircle2, Clock, Cpu, Database, Server, Zap } from "lucide-react";
import { Badge } from "@/components/platform/shared/badge";
import { StatCard } from "@/components/platform/shared/stat-card";

const SERVICES = [
  { name: "API Gateway", status: "ok", latency: "12ms", uptime: "99.98%", requests: "2,340/min" },
  { name: "OpenAI Responses API", status: "ok", latency: "340ms", uptime: "99.9%", requests: "48/min" },
  { name: "Gemini API", status: "ok", latency: "280ms", uptime: "99.85%", requests: "31/min" },
  { name: "PostgreSQL", status: "ok", latency: "4ms", uptime: "99.99%", requests: "15,200/min" },
  { name: "Redis / BullMQ", status: "ok", latency: "1ms", uptime: "99.99%", requests: "8,100/min" },
  { name: "WebSocket Server", status: "ok", latency: "2ms", uptime: "99.97%", requests: "340 conns" },
  { name: "Webhook Queue", status: "degraded", latency: "1,200ms", uptime: "98.2%", requests: "12/min" },
  { name: "Script Runtime JS", status: "ok", latency: "145ms", uptime: "99.9%", requests: "89/min" },
];

const RECENT_ERRORS = [
  { id: "1", time: "14:32:01", level: "ERROR", service: "OpenAI Router", message: "Rate limit exceeded for company 'retail-plus', falling back to Gemini", resolved: true },
  { id: "2", time: "14:28:45", level: "WARN", service: "Webhook Queue", message: "Processing delay > 1000ms for 3 webhooks", resolved: false },
  { id: "3", time: "14:15:12", level: "ERROR", service: "WhatsApp Channel", message: "Token expired for company 'mediconsult' (suspended)", resolved: true },
  { id: "4", time: "13:44:09", level: "WARN", service: "Script Runtime", message: "Script 'cotizar-envio' exceeded 80% memory limit", resolved: false },
];

export default function MonitoringPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="h-6 w-6 text-emerald-400" />
          Monitoreo en tiempo real
        </h1>
        <p className="mt-1 text-sm text-slate-400">Estado de todos los servicios de la plataforma</p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Requests/min" value="2,340" change="+5% vs promedio" trend="up" icon={Zap} iconColor="text-blue-400" />
        <StatCard title="Latencia p95" value="420ms" change="Bajo lo normal" trend="up" icon={Clock} iconColor="text-emerald-400" />
        <StatCard title="Error rate" value="0.4%" change="Webhook queue degradado" trend="down" icon={AlertCircle} iconColor="text-amber-400" />
        <StatCard title="Uptime global" value="99.9%" change="Último 30 días" trend="neutral" icon={Server} iconColor="text-violet-400" />
      </div>

      {/* Services grid */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Estado de servicios</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-800/50 p-4"
            >
              <div>
                {service.status === "ok" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : service.status === "degraded" ? (
                  <Clock className="h-5 w-5 text-amber-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{service.name}</p>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
                  <span>Latencia: {service.latency}</span>
                  <span>Uptime: {service.uptime}</span>
                  <span>{service.requests}</span>
                </div>
              </div>
              <Badge
                variant={
                  service.status === "ok" ? "success" : service.status === "degraded" ? "warning" : "danger"
                }
              >
                {service.status === "ok" ? "OK" : service.status === "degraded" ? "Degradado" : "Error"}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Recent errors */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Errores recientes</h2>
        <div className="space-y-2">
          {RECENT_ERRORS.map((error) => (
            <div
              key={error.id}
              className="flex items-start gap-3 rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-3"
            >
              <div className={`mt-0.5 flex-shrink-0 h-2 w-2 rounded-full ${error.level === "ERROR" ? "bg-red-400" : "bg-amber-400"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <code className="text-[10px] text-slate-500 font-mono">{error.time}</code>
                  <Badge variant={error.level === "ERROR" ? "danger" : "warning"}>{error.level}</Badge>
                  <span className="text-xs text-slate-400">{error.service}</span>
                </div>
                <p className="text-xs text-slate-200 mt-0.5 truncate">{error.message}</p>
              </div>
              {error.resolved ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <button className="text-xs text-amber-400 hover:text-amber-300 flex-shrink-0">Investigar</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure info */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { title: "PostgreSQL", icon: Database, stats: [["Tamaño DB", "4.2 GB"], ["Conexiones activas", "18/100"], ["Queries/min", "15,200"], ["Índices más usados", "conversations.companyId"]] },
          { title: "Redis / BullMQ", icon: Server, stats: [["Memoria usada", "512 MB / 2 GB"], ["Keys activas", "48,200"], ["Jobs en cola", "12"], ["Jobs fallidos (24h)", "3"]] },
          { title: "CPU / Memoria", icon: Cpu, stats: [["CPU promedio", "34%"], ["Memoria usada", "6.2 / 16 GB"], ["Disco", "48 / 200 GB"], ["Pods activos", "4"]] },
        ].map((panel) => (
          <div key={panel.title} className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <panel.icon className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">{panel.title}</h3>
            </div>
            <div className="space-y-2">
              {panel.stats.map(([label, value]) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-slate-400">{label}</span>
                  <span className="text-slate-200 font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
