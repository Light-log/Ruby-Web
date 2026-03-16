"use client";

import { useState } from "react";
import { Bot, Key, Shield, Plus, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/platform/shared/badge";

const vaultKeys = [
  { id: "1", ref: "openai-main", provider: "OPENAI", label: "OpenAI Principal", isActive: true, lastUsed: "hace 2 min", usageCount: 48203 },
  { id: "2", ref: "gemini-main", provider: "GEMINI", label: "Gemini Principal", isActive: true, lastUsed: "hace 5 min", usageCount: 31045 },
  { id: "3", ref: "openai-backup", provider: "OPENAI", label: "OpenAI Backup", isActive: false, lastUsed: "hace 3 días", usageCount: 120 },
];

type VaultKey = typeof vaultKeys[number];

const PROVIDER_COLORS: Record<string, string> = {
  OPENAI: "text-emerald-400",
  GEMINI: "text-blue-400",
};

export default function AIProvidersPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKey, setNewKey] = useState({ provider: "OPENAI", label: "", apiKey: "", ref: "" });
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-violet-400" />
            Proveedores de IA
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Gestión segura de API keys. Las claves se almacenan cifradas y nunca se exponen.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Agregar clave
        </button>
      </div>

      {/* Add Key Form */}
      {showAddForm && (
        <div className="rounded-xl border border-indigo-500/30 bg-slate-800/60 p-6 space-y-4">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Key className="h-4 w-4 text-indigo-400" />
            Nueva API Key
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Proveedor</label>
              <select
                value={newKey.provider}
                onChange={(e) => setNewKey({ ...newKey, provider: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="OPENAI">OpenAI (Responses API)</option>
                <option value="GEMINI">Google Gemini</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Referencia interna</label>
              <input
                type="text"
                value={newKey.ref}
                onChange={(e) => setNewKey({ ...newKey, ref: e.target.value })}
                placeholder="openai-empresa-xyz"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Etiqueta</label>
              <input
                type="text"
                value={newKey.label}
                onChange={(e) => setNewKey({ ...newKey, label: e.target.value })}
                placeholder="OpenAI Principal"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">API Key</label>
              <input
                type="password"
                value={newKey.apiKey}
                onChange={(e) => setNewKey({ ...newKey, apiKey: e.target.value })}
                placeholder="sk-... / AIza..."
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
              Guardar cifrada
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2">
            <Shield className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300">
              Las claves se cifran con AES-256 antes de guardarse. Nunca se devuelven en texto plano.
              Los administradores de empresa solo ven la referencia, no el valor.
            </p>
          </div>
        </div>
      )}

      {/* Keys List */}
      <div className="space-y-4">
        {vaultKeys.map((key) => (
          <div
            key={key.id}
            className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 ${PROVIDER_COLORS[key.provider]}`}>
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{key.label}</p>
                    <Badge variant={key.isActive ? "success" : "default"}>
                      {key.isActive ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ref: <code className="text-indigo-300">{key.ref}</code>
                    {" · "}Proveedor: <span className={PROVIDER_COLORS[key.provider]}>{key.provider}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Key className="h-3 w-3 text-slate-500" />
                    <p className="text-xs text-slate-500 font-mono">
                      {showKey[key.id] ? "sk-••••••••••••••••••••••••••••••••xxxx" : "••••••••••••••••••••••••••••••••••••"}
                    </p>
                    <button
                      onClick={() => setShowKey((prev) => ({ ...prev, [key.id]: !prev[key.id] }))}
                      className="ml-1 text-slate-500 hover:text-slate-300"
                    >
                      {showKey[key.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-1">
                <p>Último uso: {key.lastUsed}</p>
                <p>Llamadas: {key.usageCount.toLocaleString()}</p>
                <div className="flex items-center justify-end gap-2 mt-2">
                  <button className="text-indigo-400 hover:text-indigo-300">Testear</button>
                  <button className="text-amber-400 hover:text-amber-300">
                    {key.isActive ? "Desactivar" : "Activar"}
                  </button>
                  <button className="text-red-400 hover:text-red-300">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Router Logic Explanation */}
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Lógica del Router IA</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            { useCase: "Clasificación de intención", model: "Modelo rápido/económico", icon: "⚡" },
            { useCase: "Generación de texto", model: "Modelo principal configurado", icon: "✍️" },
            { useCase: "Extracción estructurada", model: "Modelo de mayor adherencia", icon: "🔍" },
            { useCase: "Resumen de conversación", model: "Modelo intermedio", icon: "📝" },
            { useCase: "Sugerencias live agent", model: "Modelo rápido", icon: "💡" },
            { useCase: "Fallback automático", model: "Proveedor secundario", icon: "🔄" },
          ].map((item) => (
            <div key={item.useCase} className="flex items-center gap-3 rounded-lg bg-slate-700/30 px-3 py-2">
              <span className="text-base">{item.icon}</span>
              <div>
                <p className="text-xs font-medium text-white">{item.useCase}</p>
                <p className="text-xs text-slate-400">{item.model}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
