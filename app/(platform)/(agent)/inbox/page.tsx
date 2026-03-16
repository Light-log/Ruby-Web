"use client";

import { useState } from "react";
import { Badge } from "@/components/platform/shared/badge";
import {
  Search,
  Send,
  Bot,
  User,
  Phone,
  Clock,
  Tag,
  FileText,
  PauseCircle,
  PlayCircle,
  ArrowRightLeft,
  CheckCircle2,
  Paperclip,
  MessageSquare,
} from "lucide-react";

const CONVERSATIONS = [
  {
    id: "1",
    contact: "María López",
    channel: "WhatsApp",
    channelIcon: "💬",
    status: "LIVE",
    lastMessage: "¿Tienen envío gratuito para el interior?",
    ago: "2 min",
    unread: 2,
    avatar: "ML",
    phone: "+58 414 1234567",
    assignedTo: "Carlos G.",
  },
  {
    id: "2",
    contact: "Juan Pérez",
    channel: "Web Widget",
    channelIcon: "🌐",
    status: "WAITING",
    lastMessage: "Necesito soporte urgente",
    ago: "5 min",
    unread: 1,
    avatar: "JP",
    phone: null,
    assignedTo: null,
  },
  {
    id: "3",
    contact: "Ana Torres",
    channel: "Messenger",
    channelIcon: "📘",
    status: "LIVE",
    lastMessage: "Muchas gracias por la información",
    ago: "12 min",
    unread: 0,
    avatar: "AT",
    phone: null,
    assignedTo: "Marta V.",
  },
  {
    id: "4",
    contact: "Pedro Silva",
    channel: "Instagram",
    channelIcon: "📸",
    status: "WAITING",
    lastMessage: "Quiero hacer un pedido",
    ago: "20 min",
    unread: 3,
    avatar: "PS",
    phone: null,
    assignedTo: null,
  },
];

const MESSAGES: Record<string, Array<{ id: string; role: "bot" | "user" | "agent"; content: string; time: string }>> = {
  "1": [
    { id: "m1", role: "bot", content: "¡Hola! 👋 Soy el asistente de TechCorp. ¿En qué puedo ayudarte?", time: "14:30" },
    { id: "m2", role: "user", content: "Hola, quiero saber sobre sus planes de envío", time: "14:31" },
    { id: "m3", role: "bot", content: "Claro, con gusto te ayudo. Tenemos envíos a todo el país. Los pedidos superiores a $50 tienen envío gratuito a las principales ciudades.", time: "14:31" },
    { id: "m4", role: "user", content: "¿Tienen envío gratuito para el interior?", time: "14:33" },
    { id: "m5", role: "agent", content: "Hola María, te confirmo que sí hacemos envíos al interior. El costo varía según la zona. ¿Me puedes indicar tu ciudad?", time: "14:34" },
  ],
  "2": [
    { id: "m1", role: "bot", content: "¡Hola! ¿Cómo puedo ayudarte hoy?", time: "14:28" },
    { id: "m2", role: "user", content: "Necesito soporte urgente", time: "14:29" },
    { id: "m3", role: "bot", content: "Entendido. Voy a conectarte con un agente ahora mismo.", time: "14:29" },
  ],
};

type Conversation = typeof CONVERSATIONS[number];
type StatusVariant = "success" | "warning" | "info" | "default";

const statusVariant: Record<string, StatusVariant> = {
  LIVE: "success",
  WAITING: "warning",
  BOT: "info",
  RESOLVED: "default",
};

export default function InboxPage() {
  const [selected, setSelected] = useState<Conversation>(CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [botPaused, setBotPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "notes" | "info">("chat");

  const messages = MESSAGES[selected.id] ?? [];

  function handleSend() {
    if (!message.trim()) return;
    // In production: POST to /api/platform/conversations/:id/messages
    setMessage("");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Conversation list */}
      <aside className="flex w-72 flex-shrink-0 flex-col border-r border-slate-700/60 bg-slate-800/80">
        <div className="border-b border-slate-700/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-5 w-5 text-indigo-400" />
            <h2 className="font-semibold text-white text-sm">Bandeja Omnicanal</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar conversación..."
              className="w-full rounded-lg border border-slate-600 bg-slate-700/50 pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-1 mt-3">
            {["Todos", "En vivo", "Espera"].map((filter) => (
              <button
                key={filter}
                className="rounded-md px-2 py-1 text-[10px] font-medium bg-slate-700/60 text-slate-300 hover:bg-slate-700"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelected(conv)}
              className={`w-full border-b border-slate-700/40 p-4 text-left transition-colors ${
                selected.id === conv.id ? "bg-indigo-600/10 border-l-2 border-l-indigo-500" : "hover:bg-slate-700/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600/30 text-xs font-bold text-indigo-300 flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 text-[10px]">{conv.channelIcon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-white truncate">{conv.contact}</p>
                    <span className="text-[10px] text-slate-500 flex-shrink-0 ml-2">{conv.ago}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant={statusVariant[conv.status] ?? "default"}>{conv.status}</Badge>
                    {conv.unread > 0 && (
                      <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 bg-slate-800/60 px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600/30 text-sm font-bold text-indigo-300">
              {selected.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{selected.contact}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{selected.channelIcon} {selected.channel}</span>
                {selected.phone && (
                  <span className="text-xs text-slate-500">· {selected.phone}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBotPaused(!botPaused)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                botPaused
                  ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                  : "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {botPaused ? (
                <><PlayCircle className="h-3.5 w-3.5" /> Reanudar bot</>
              ) : (
                <><PauseCircle className="h-3.5 w-3.5" /> Pausar bot</>
              )}
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-slate-700/60 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors">
              <ArrowRightLeft className="h-3.5 w-3.5" />
              Transferir
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 px-3 py-1.5 text-xs hover:bg-emerald-600/30 transition-colors">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Resolver
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700/60 bg-slate-800/40">
          {(["chat", "notes", "info"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-indigo-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "chat" ? "Chat" : tab === "notes" ? "Notas internas" : "Info contacto"}
            </button>
          ))}
        </div>

        {activeTab === "chat" && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-600 text-[10px] font-bold text-slate-200">
                      {selected.avatar}
                    </div>
                  )}
                  <div
                    className={`max-w-sm rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "rounded-tl-sm bg-slate-700 text-slate-100"
                        : msg.role === "bot"
                        ? "rounded-tr-sm bg-indigo-600/90 text-white"
                        : "rounded-tr-sm bg-emerald-700/80 text-white"
                    }`}
                  >
                    {msg.role !== "user" && (
                      <div className="flex items-center gap-1 mb-1">
                        {msg.role === "bot" ? (
                          <><Bot className="h-3 w-3 opacity-70" /><span className="text-[10px] opacity-70">Bot</span></>
                        ) : (
                          <><User className="h-3 w-3 opacity-70" /><span className="text-[10px] opacity-70">Agente</span></>
                        )}
                      </div>
                    )}
                    <p>{msg.content}</p>
                    <p className="mt-1 text-right text-[10px] opacity-50">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-slate-700/60 bg-slate-800/60 p-4">
              {botPaused && (
                <div className="mb-2 flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-1.5">
                  <PauseCircle className="h-3.5 w-3.5 text-amber-400" />
                  <p className="text-xs text-amber-300">Bot pausado. Tus mensajes van directamente al contacto.</p>
                </div>
              )}
              <div className="flex items-end gap-3">
                <button className="text-slate-400 hover:text-slate-300">
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Escribe un mensaje... (Enter para enviar, Shift+Enter nueva línea)"
                  rows={1}
                  className="flex-1 rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "notes" && (
          <div className="flex-1 p-5">
            <p className="text-xs text-slate-400 mb-3">Notas internas (no visibles para el contacto)</p>
            <textarea
              placeholder="Escribe una nota interna..."
              rows={4}
              className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none resize-y"
            />
            <button className="mt-2 rounded-lg bg-slate-700 px-4 py-2 text-xs text-white hover:bg-slate-600 transition-colors">
              Guardar nota
            </button>
          </div>
        )}

        {activeTab === "info" && (
          <div className="flex-1 p-5 space-y-4">
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-white">Información del contacto</h3>
              {[
                { label: "Nombre", value: selected.contact, icon: User },
                { label: "Canal", value: selected.channel, icon: MessageSquare },
                { label: "Teléfono", value: selected.phone ?? "—", icon: Phone },
                { label: "Primera conversación", value: "hace 2 semanas", icon: Clock },
                { label: "Total conversaciones", value: "8", icon: MessageSquare },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  <span className="text-xs text-slate-400 w-32">{item.label}</span>
                  <span className="text-xs text-white">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {["cliente-vip", "soporte", "envíos"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1 rounded-full bg-slate-700 px-2.5 py-1 text-xs text-slate-300">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
                <button className="rounded-full border border-dashed border-slate-600 px-2.5 py-1 text-xs text-slate-500 hover:border-slate-500">
                  + Agregar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
