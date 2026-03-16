"use client";

import { useState } from "react";
import { Code2, Plus, Play, Save, AlertTriangle, CheckCircle2, ChevronDown } from "lucide-react";
import { Badge } from "@/components/platform/shared/badge";

const SCRIPT_TEMPLATES = [
  { id: "1", name: "Consultar inventario CRM", language: "JAVASCRIPT", isActive: true, lastRun: "hace 5 min", executions: 1240 },
  { id: "2", name: "Validar código de descuento", language: "JAVASCRIPT", isActive: true, lastRun: "hace 1h", executions: 450 },
  { id: "3", name: "Cotizar envío externo", language: "JAVASCRIPT", isActive: false, lastRun: "hace 3 días", executions: 88 },
  { id: "4", name: "Transformar respuesta API", language: "JAVASCRIPT", isActive: true, lastRun: "hace 10 min", executions: 3200 },
];

const STARTER_CODE = `// Script: Consultar inventario
// Bindings disponibles: bindings.CRM_API_URL, bindings.CRM_TOKEN
// Input: input.productId
// Output: asignar a __output para retornar datos

const url = bindings.CRM_API_URL + '/products/' + input.productId;

// Nota: fetch está disponible en el sandbox
const response = await fetch(url, {
  headers: { 'Authorization': 'Bearer ' + bindings.CRM_TOKEN }
});

const data = await response.json();

__output.available = data.stock > 0;
__output.stock = data.stock;
__output.price = data.price;
__output.name = data.name;
`;

export default function LogicPage() {
  const [selectedScript, setSelectedScript] = useState(SCRIPT_TEMPLATES[0]);
  const [code, setCode] = useState(STARTER_CODE);
  const [activeTab, setActiveTab] = useState<"code" | "bindings" | "test">("code");
  const [testInput, setTestInput] = useState('{\n  "productId": "PROD-001"\n}');
  const [testOutput, setTestOutput] = useState<null | { success: boolean; output?: unknown; error?: string; logs?: string[]; durationMs?: number }>(null);

  async function runTest() {
    setTestOutput({ success: true, output: { available: true, stock: 42, price: 29.99, name: "Widget Pro" }, logs: ["Fetching product PROD-001...", "Response received"], durationMs: 145 });
  }

  return (
    <div className="p-8 h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="h-6 w-6 text-emerald-400" />
            Lógica & Scripts
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Escribe scripts seguros para integraciones HTTP, transformaciones y validaciones.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
          <Plus className="h-4 w-4" />
          Nuevo script
        </button>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Script List */}
        <div className="w-60 flex-shrink-0 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Scripts</p>
          {SCRIPT_TEMPLATES.map((script) => (
            <button
              key={script.id}
              onClick={() => setSelectedScript(script)}
              className={`w-full rounded-lg p-3 text-left transition-all ${
                selectedScript.id === script.id
                  ? "bg-indigo-600/20 border border-indigo-500/30"
                  : "border border-slate-700/60 hover:bg-slate-700/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-white truncate">{script.name}</p>
                <div className={`h-2 w-2 rounded-full flex-shrink-0 ${script.isActive ? "bg-emerald-400" : "bg-slate-500"}`} />
              </div>
              <p className="text-[10px] text-slate-500">{script.executions} ejecuciones</p>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col min-h-0 rounded-xl border border-slate-700/60 bg-slate-800/50 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white">{selectedScript.name}</span>
              <Badge variant="info">{selectedScript.language}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={runTest}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 transition-colors"
              >
                <Play className="h-3.5 w-3.5" />
                Ejecutar test
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors">
                <Save className="h-3.5 w-3.5" />
                Guardar
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-700/60">
            {(["code", "bindings", "test"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-indigo-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab === "code" ? "Código" : tab === "bindings" ? "Variables" : "Test"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === "code" && (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent p-4 font-mono text-sm text-slate-200 focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            )}

            {activeTab === "bindings" && (
              <div className="p-4 space-y-4">
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-300">
                    Los secretos son inyectados por referencia del vault. El admin no ve el valor real.
                    Usa <code>bindings.NOMBRE</code> en el código.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "CRM_API_URL", type: "static", value: "https://api.crm.internal" },
                    { name: "CRM_TOKEN", type: "secret", value: "vault:crm-api-token" },
                  ].map((binding) => (
                    <div key={binding.name} className="flex items-center gap-3 rounded-lg border border-slate-700/60 px-3 py-2.5">
                      <code className="text-xs text-indigo-300 flex-1">{binding.name}</code>
                      <Badge variant={binding.type === "secret" ? "warning" : "info"}>
                        {binding.type}
                      </Badge>
                      <span className="text-xs text-slate-400 font-mono">{binding.value}</span>
                      <button className="text-xs text-red-400 hover:text-red-300">Eliminar</button>
                    </div>
                  ))}
                  <button className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300">
                    <Plus className="h-3.5 w-3.5" />
                    Agregar binding
                  </button>
                </div>
              </div>
            )}

            {activeTab === "test" && (
              <div className="p-4 grid grid-cols-2 gap-4 h-full">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-slate-400">Input JSON</p>
                  <textarea
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-600 bg-slate-700/50 p-3 font-mono text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-slate-400">Output</p>
                  <div className="flex-1 rounded-lg border border-slate-600 bg-slate-900/50 p-3 font-mono text-xs overflow-auto">
                    {testOutput ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {testOutput.success ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                          )}
                          <span className={testOutput.success ? "text-emerald-400" : "text-red-400"}>
                            {testOutput.success ? "Éxito" : "Error"} · {testOutput.durationMs}ms
                          </span>
                        </div>
                        {testOutput.logs?.map((log, i) => (
                          <p key={i} className="text-slate-500 text-[10px]">{log}</p>
                        ))}
                        <pre className="text-slate-200 text-[11px]">
                          {JSON.stringify(testOutput.output ?? testOutput.error, null, 2)}
                        </pre>
                      </div>
                    ) : (
                      <p className="text-slate-500">Ejecuta el test para ver el output aquí</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Allowed operations info */}
          <div className="border-t border-slate-700/60 px-4 py-2 flex items-center gap-4 text-[10px] text-slate-500">
            <span>✅ fetch a dominios permitidos</span>
            <span>✅ JSON, crypto, Math</span>
            <span>✅ async/await</span>
            <span>🚫 fs, process, eval, shell</span>
            <span>⏱ timeout: 5s · memoria: 64MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
