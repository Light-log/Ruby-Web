"use client";

import { useState } from "react";
import { MessageSquare, Plus, Play, Edit, Copy, Trash2, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/platform/shared/badge";

const FLOWS = [
  { id: "1", name: "Flujo de bienvenida", description: "Saludo inicial y menú principal", isDefault: true, isActive: true, version: 3, nodeCount: 12, publishedAt: "2026-03-10", conversations: 1840 },
  { id: "2", name: "Soporte técnico", description: "Diagnóstico y escalada a agente", isDefault: false, isActive: true, version: 2, nodeCount: 8, publishedAt: "2026-02-28", conversations: 420 },
  { id: "3", name: "Ventas y cotización", description: "Consulta de productos y precios", isDefault: false, isActive: false, version: 1, nodeCount: 15, publishedAt: null, conversations: 0 },
  { id: "4", name: "Post-venta", description: "Seguimiento de pedidos y satisfacción", isDefault: false, isActive: true, version: 1, nodeCount: 6, publishedAt: "2026-01-15", conversations: 230 },
];

const NODE_TYPES = [
  { type: "MESSAGE", label: "Mensaje", color: "bg-blue-500/20 text-blue-300", description: "Envía un bloque canónico (texto, botones, carrusel)" },
  { type: "QUESTION", label: "Pregunta", color: "bg-violet-500/20 text-violet-300", description: "Espera respuesta y la guarda en variable" },
  { type: "CONDITION", label: "Condición", color: "bg-amber-500/20 text-amber-300", description: "Rama el flujo según expresión lógica" },
  { type: "AI_GENERATE", label: "IA Generativa", color: "bg-indigo-500/20 text-indigo-300", description: "Genera texto o extrae datos con IA" },
  { type: "HTTP_REQUEST", label: "Llamada HTTP", color: "bg-emerald-500/20 text-emerald-300", description: "Consulta API externa usando credenciales seguras" },
  { type: "SCRIPT", label: "Script", color: "bg-pink-500/20 text-pink-300", description: "Ejecuta lógica personalizada en sandbox" },
  { type: "HANDOFF", label: "Transferir", color: "bg-red-500/20 text-red-300", description: "Transfiere la conversación a agente humano" },
  { type: "END", label: "Fin", color: "bg-slate-500/20 text-slate-300", description: "Termina el flujo y opcionalmente cierra la conversación" },
];

type Flow = typeof FLOWS[number];

export default function FlowsPage() {
  const [selected, setSelected] = useState<Flow | null>(null);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-indigo-400" />
            Flujos
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Diseña la lógica conversacional del bot con nodos visuales
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
          <Plus className="h-4 w-4" />
          Nuevo flujo
        </button>
      </div>

      {/* Node types reference */}
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Tipos de nodo disponibles</p>
        <div className="flex flex-wrap gap-2">
          {NODE_TYPES.map((node) => (
            <div key={node.type} className="group relative">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium cursor-default ${node.color}`}>
                {node.label}
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-48 rounded-lg bg-slate-900 border border-slate-700 p-2 text-xs text-slate-300 shadow-xl">
                {node.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flows list */}
      <div className="space-y-3">
        {FLOWS.map((flow) => (
          <div
            key={flow.id}
            className={`rounded-xl border p-5 transition-all ${
              selected?.id === flow.id
                ? "border-indigo-500/40 bg-indigo-600/5"
                : "border-slate-700/60 bg-slate-800/50 hover:border-slate-600"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-white">{flow.name}</h3>
                  {flow.isDefault && <Badge variant="info">Por defecto</Badge>}
                  {flow.isActive ? (
                    <Badge variant="success">Activo</Badge>
                  ) : (
                    <Badge variant="warning">Borrador</Badge>
                  )}
                  <Badge variant="default">v{flow.version}</Badge>
                </div>
                <p className="text-sm text-slate-400">{flow.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span>{flow.nodeCount} nodos</span>
                  <span>{flow.conversations.toLocaleString()} conversaciones</span>
                  {flow.publishedAt ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      Publicado: {flow.publishedAt}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-amber-400" />
                      Sin publicar
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => setSelected(flow)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Editar
                </button>
                <button className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                {!flow.isActive && (
                  <button className="flex items-center gap-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 px-3 py-1.5 text-xs text-emerald-300 hover:bg-emerald-600/30 transition-colors">
                    <Play className="h-3.5 w-3.5" />
                    Publicar
                  </button>
                )}
                {!flow.isDefault && (
                  <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flow editor placeholder */}
      {selected && (
        <div className="rounded-xl border border-indigo-500/30 bg-slate-900/80 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Editor visual: {selected.name}</h2>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white text-sm">
              Cerrar
            </button>
          </div>
          <div className="h-64 rounded-xl border border-dashed border-slate-600 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Editor visual de flujos (React Flow)</p>
              <p className="text-xs mt-1">Conectar con react-flow-renderer en implementación final</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
