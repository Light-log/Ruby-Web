import { StatCard } from "@/components/platform/shared/stat-card";
import { Badge } from "@/components/platform/shared/badge";
import {
  MessageSquare,
  Users,
  Cpu,
  CheckCircle2,
  Clock,
  TrendingUp,
  Bot,
  Headphones,
} from "lucide-react";

const recentConversations = [
  { id: "1", contact: "María López", channel: "WhatsApp", status: "LIVE", agent: "Carlos G.", lastMessage: "¿Tienen envío gratuito?", ago: "2 min" },
  { id: "2", contact: "Juan Pérez", channel: "Web Widget", status: "BOT", agent: "—", lastMessage: "Necesito soporte técnico", ago: "5 min" },
  { id: "3", contact: "Ana Torres", channel: "Messenger", status: "WAITING", agent: "—", lastMessage: "Hola, buenos días", ago: "8 min" },
  { id: "4", contact: "Luis Ramos", channel: "Instagram", status: "RESOLVED", agent: "Marta V.", lastMessage: "Gracias por la ayuda", ago: "15 min" },
  { id: "5", contact: "Sandra Gómez", channel: "WhatsApp", status: "BOT", agent: "—", lastMessage: "¿Cuál es el precio?", ago: "22 min" },
];

type Conversation = typeof recentConversations[number];

const statusVariant: Record<string, "success" | "warning" | "info" | "default" | "danger"> = {
  LIVE: "success",
  WAITING: "warning",
  BOT: "info",
  RESOLVED: "default",
  ABANDONED: "danger",
};

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">TechCorp SA · Experiencia conversacional</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Conversaciones hoy" value="284" change="+18% vs ayer" trend="up" icon={MessageSquare} iconColor="text-blue-400" />
        <StatCard title="En vivo ahora" value="12" change="3 en espera" trend="neutral" icon={Headphones} iconColor="text-emerald-400" />
        <StatCard title="Bot activo" value="94%" change="Resolución autónoma" trend="up" icon={Bot} iconColor="text-violet-400" />
        <StatCard title="Llamadas IA hoy" value="1,240" change="de 5,000 del plan" trend="neutral" icon={Cpu} iconColor="text-amber-400" />
      </div>

      {/* Channel breakdown */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Conversaciones por canal (hoy)</h3>
          <div className="space-y-3">
            {[
              { channel: "WhatsApp", count: 124, color: "bg-emerald-500" },
              { channel: "Web Widget", count: 89, color: "bg-blue-500" },
              { channel: "Facebook Messenger", count: 45, color: "bg-indigo-500" },
              { channel: "Instagram", count: 26, color: "bg-violet-500" },
            ].map((item) => (
              <div key={item.channel} className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${item.color} flex-shrink-0`} />
                <span className="text-sm text-slate-300 flex-1">{item.channel}</span>
                <span className="text-sm font-medium text-white">{item.count}</span>
                <div className="w-24 h-1.5 rounded-full bg-slate-700">
                  <div
                    className={`h-1.5 rounded-full ${item.color}`}
                    style={{ width: `${(item.count / 124) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Estado del bot</h3>
          <div className="space-y-3">
            {[
              { label: "Resuelto por bot", count: 267, icon: CheckCircle2, color: "text-emerald-400" },
              { label: "Transferido a agente", count: 12, icon: Users, color: "text-blue-400" },
              { label: "En espera de agente", count: 3, icon: Clock, color: "text-amber-400" },
              { label: "Fallback a texto", count: 2, icon: TrendingUp, color: "text-slate-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 flex-shrink-0 ${item.color}`} />
                <span className="text-sm text-slate-300 flex-1">{item.label}</span>
                <span className="text-sm font-medium text-white">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent conversations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Conversaciones recientes</h2>
          <a href="/platform/agent/inbox" className="text-sm text-indigo-400 hover:text-indigo-300">
            Ir al inbox →
          </a>
        </div>
        <div className="space-y-2">
          {recentConversations.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-3 hover:border-slate-600 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600/20 text-sm font-medium text-indigo-300 flex-shrink-0">
                {conv.contact[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{conv.contact}</p>
                  <span className="text-xs text-slate-500">{conv.channel}</span>
                </div>
                <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge variant={statusVariant[conv.status] ?? "default"}>{conv.status}</Badge>
                <span className="text-xs text-slate-500">{conv.ago}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
