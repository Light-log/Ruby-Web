"use client";

import { useState } from "react";
import { Radio, Plus, CheckCircle2, XCircle, Settings, ExternalLink } from "lucide-react";
import { Badge } from "@/components/platform/shared/badge";

const CHANNELS = [
  {
    id: "WEB_WIDGET",
    name: "Web Widget",
    description: "Chat embebido en tu sitio web. Soporta todos los bloques canónicos.",
    icon: "🌐",
    docs: "#",
    fields: [{ key: "widgetColor", label: "Color del widget", type: "color" }],
    configured: true,
    active: true,
  },
  {
    id: "WHATSAPP",
    name: "WhatsApp Business",
    description: "WhatsApp Cloud API. Soporta botones de respuesta, listas interactivas y media.",
    icon: "💬",
    docs: "#",
    fields: [
      { key: "phoneNumberId", label: "Phone Number ID", type: "text" },
      { key: "wabaId", label: "WABA ID", type: "text" },
      { key: "accessToken", label: "Access Token", type: "password" },
      { key: "verifyToken", label: "Verify Token", type: "text" },
    ],
    configured: true,
    active: true,
  },
  {
    id: "FACEBOOK_MESSENGER",
    name: "Facebook Messenger",
    description: "Messenger Platform. Soporta generic template y button template (hasta 3 botones).",
    icon: "📘",
    docs: "#",
    fields: [
      { key: "pageId", label: "Page ID", type: "text" },
      { key: "accessToken", label: "Page Access Token", type: "password" },
      { key: "verifyToken", label: "Verify Token", type: "text" },
    ],
    configured: false,
    active: false,
  },
  {
    id: "INSTAGRAM",
    name: "Instagram",
    description: "Instagram Messaging. Comparte API con Messenger. Botones y templates disponibles.",
    icon: "📸",
    docs: "#",
    fields: [
      { key: "igAccountId", label: "Instagram Account ID", type: "text" },
      { key: "accessToken", label: "Page Access Token", type: "password" },
    ],
    configured: false,
    active: false,
  },
  {
    id: "TIKTOK",
    name: "TikTok",
    description: "TikTok for Business Messaging. Solo texto por ahora.",
    icon: "🎵",
    docs: "#",
    fields: [
      { key: "appId", label: "App ID", type: "text" },
      { key: "appSecret", label: "App Secret", type: "password" },
    ],
    configured: false,
    active: false,
  },
];

type Channel = typeof CHANNELS[number];

export default function ChannelsPage() {
  const [selected, setSelected] = useState<Channel | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Radio className="h-6 w-6 text-blue-400" />
          Canales
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Conecta y configura los canales de comunicación. El motor canónico adapta
          automáticamente los mensajes a cada canal.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {CHANNELS.map((channel) => (
          <div
            key={channel.id}
            className={`rounded-xl border p-5 transition-all ${
              channel.active
                ? "border-emerald-500/30 bg-slate-800/60"
                : "border-slate-700/60 bg-slate-800/40"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{channel.icon}</span>
                <div>
                  <p className="font-medium text-white">{channel.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {channel.active ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        <span className="text-xs text-emerald-400">Activo</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 text-slate-500" />
                        <span className="text-xs text-slate-500">Inactivo</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Badge variant={channel.configured ? "success" : "warning"}>
                {channel.configured ? "Configurado" : "Sin configurar"}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mb-4">{channel.description}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelected(channel)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Configurar
              </button>
              <a
                href={channel.docs}
                className="flex items-center gap-1 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Docs
              </a>
            </div>
          </div>
        ))}
        <button className="rounded-xl border border-dashed border-slate-600 p-5 flex flex-col items-center justify-center gap-2 text-slate-500 hover:border-slate-500 hover:text-slate-400 transition-colors">
          <Plus className="h-6 w-6" />
          <span className="text-sm">Solicitar canal</span>
        </button>
      </div>

      {/* Config Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700/60 bg-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-white">
                {selected.icon} Configurar {selected.name}
              </h3>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {selected.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={fieldValues[`${selected.id}.${field.key}`] ?? ""}
                    onChange={(e) =>
                      setFieldValues((prev) => ({
                        ...prev,
                        [`${selected.id}.${field.key}`]: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                    placeholder={field.type === "password" ? "••••••••" : field.label}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
                Guardar y activar
              </button>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
