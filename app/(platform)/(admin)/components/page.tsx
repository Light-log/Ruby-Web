"use client";

import { useState } from "react";
import { Layers, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/platform/shared/badge";
import type { CanonicalBlock } from "@/lib/canonical/types";

const BLOCK_TYPES = [
  { type: "TEXT", label: "Texto", icon: "📝", description: "Mensaje de texto plano o markdown" },
  { type: "BUTTONS", label: "Botones", icon: "🔘", description: "Texto + hasta 3 botones de acción" },
  { type: "QUICK_REPLIES", label: "Respuestas rápidas", icon: "⚡", description: "Opciones rápidas tipo chips" },
  { type: "CARD", label: "Card", icon: "🃏", description: "Imagen + título + descripción + acciones" },
  { type: "CARD_LIST", label: "Carrusel de cards", icon: "🎠", description: "Lista de cards deslizables" },
  { type: "FORM", label: "Formulario", icon: "📋", description: "Campos de captura de datos" },
  { type: "IMAGE", label: "Imagen", icon: "🖼️", description: "Imagen con pie de foto opcional" },
  { type: "LIST_PICKER", label: "Lista interactiva", icon: "📑", description: "Lista con secciones (WhatsApp)" },
] as const;

const SAVED_BLOCKS = [
  {
    id: "1",
    name: "Menú principal",
    type: "BUTTONS" as const,
    tags: ["menu", "inicio"],
    content: {
      type: "BUTTONS" as const,
      text: "¡Hola! ¿En qué puedo ayudarte?",
      buttons: [
        { type: "postback" as const, label: "Soporte técnico", value: "soporte" },
        { type: "postback" as const, label: "Ventas", value: "ventas" },
        { type: "postback" as const, label: "Hablar con agente", value: "agente" },
      ],
    } as CanonicalBlock,
  },
  {
    id: "2",
    name: "Cards de planes",
    type: "CARD_LIST" as const,
    tags: ["ventas", "planes"],
    content: {
      type: "CARD_LIST" as const,
      title: "Nuestros planes",
      items: [
        { title: "Plan Starter", description: "Ideal para equipos pequeños", imageUrl: "https://example.com/starter.jpg", actions: [{ type: "url" as const, label: "Ver más", value: "https://example.com/starter" }] },
        { title: "Plan Pro", description: "Para empresas en crecimiento", imageUrl: "https://example.com/pro.jpg", actions: [{ type: "url" as const, label: "Ver más", value: "https://example.com/pro" }] },
      ],
    } as CanonicalBlock,
  },
];

const typeVariant: Record<string, "info" | "success" | "warning" | "purple"> = {
  TEXT: "info",
  BUTTONS: "success",
  QUICK_REPLIES: "warning",
  CARD: "purple",
  CARD_LIST: "purple",
  FORM: "info",
  IMAGE: "info",
  LIST_PICKER: "warning",
};

type SavedBlock = typeof SAVED_BLOCKS[number];

export default function ComponentsPage() {
  const [previewBlock, setPreviewBlock] = useState<SavedBlock | null>(null);
  const [activeTab, setActiveTab] = useState<string>("TEXT");

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="h-6 w-6 text-violet-400" />
            Componentes
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Crea bloques canónicos reutilizables. El motor renderiza automáticamente por canal.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
          <Plus className="h-4 w-4" />
          Nuevo componente
        </button>
      </div>

      {/* Block type selector */}
      <div className="flex flex-wrap gap-2">
        {BLOCK_TYPES.map((bt) => (
          <button
            key={bt.type}
            onClick={() => setActiveTab(bt.type)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
              activeTab === bt.type
                ? "border-indigo-500 bg-indigo-600/20 text-white"
                : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:text-white"
            }`}
          >
            <span>{bt.icon}</span>
            {bt.label}
          </button>
        ))}
      </div>

      {/* Block preview area */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
          <h3 className="text-sm font-semibold text-white mb-4">
            Editor: {BLOCK_TYPES.find(b => b.type === activeTab)?.icon}{" "}
            {BLOCK_TYPES.find(b => b.type === activeTab)?.label}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {BLOCK_TYPES.find(b => b.type === activeTab)?.description}
          </p>
          {/* Simplified form for TEXT block */}
          {activeTab === "TEXT" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Texto</label>
                <textarea rows={3} className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white resize-y focus:border-indigo-500 focus:outline-none" placeholder="Escribe el mensaje..." />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Formato</label>
                <select className="rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white focus:outline-none">
                  <option value="plain">Texto plano</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>
            </div>
          )}
          {activeTab === "BUTTONS" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Texto del mensaje</label>
                <textarea rows={2} className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white resize-y focus:border-indigo-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2">Botones (máx. 3)</label>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input placeholder={`Etiqueta ${i}`} className="flex-1 rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-1.5 text-xs text-white focus:outline-none" />
                    <select className="rounded-lg border border-slate-600 bg-slate-700/50 px-2 py-1.5 text-xs text-white focus:outline-none">
                      <option>postback</option>
                      <option>url</option>
                      <option>phone</option>
                    </select>
                    <input placeholder="valor" className="flex-1 rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-1.5 text-xs text-white focus:outline-none" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-500 transition-colors">Guardar componente</button>
            <button className="rounded-lg border border-slate-600 px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 transition-colors">Vista previa</button>
          </div>
        </div>

        {/* Channel preview */}
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Vista previa por canal</h3>
          <div className="flex gap-2 mb-4">
            {["Web", "WhatsApp", "Messenger"].map((ch) => (
              <button key={ch} className="rounded-md px-2.5 py-1 text-[10px] font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors">{ch}</button>
            ))}
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 min-h-32 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="rounded-2xl rounded-tl-sm bg-indigo-600 px-4 py-3 text-sm text-white">
                ¡Hola! ¿En qué puedo ayudarte?
              </div>
              <div className="flex gap-2 mt-2">
                {["Soporte", "Ventas", "Agente"].map((btn) => (
                  <button key={btn} className="flex-1 rounded-full border border-indigo-500 px-2 py-1 text-[10px] text-indigo-300 hover:bg-indigo-500/20">
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 text-center">Web Widget – renderizado completo</p>
        </div>
      </div>

      {/* Saved components */}
      <div>
        <h2 className="text-base font-semibold text-white mb-3">Componentes guardados</h2>
        <div className="space-y-2">
          {SAVED_BLOCKS.map((block) => (
            <div key={block.id} className="flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{block.name}</p>
                  <Badge variant={typeVariant[block.type] ?? "default"}>{block.type}</Badge>
                </div>
                <div className="flex gap-1 mt-1">
                  {block.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-700 px-2 py-0.5 text-[10px] text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPreviewBlock(block)} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </button>
                <button className="text-xs text-slate-400 hover:text-white">Editar</button>
                <button className="text-xs text-red-400 hover:text-red-300">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
