"use client";

import { useState } from "react";
import { Bot, Save, AlertCircle, ChevronDown } from "lucide-react";

const PROVIDERS = [
  { value: "OPENAI", label: "OpenAI (Responses API)" },
  { value: "GEMINI", label: "Google Gemini" },
];

const OPENAI_MODELS = [
  { value: "gpt-4o", label: "GPT-4o (principal)" },
  { value: "gpt-4o-mini", label: "GPT-4o mini (rápido/económico)" },
  { value: "gpt-4.1", label: "GPT-4.1" },
  { value: "gpt-4.1-mini", label: "GPT-4.1 mini" },
  { value: "o3", label: "o3 (razonamiento avanzado)" },
  { value: "o4-mini", label: "o4-mini (razonamiento rápido)" },
];

const GEMINI_MODELS = [
  { value: "gemini-2.5-pro-preview", label: "Gemini 2.5 Pro (preview)" },
  { value: "gemini-2.5-flash-preview", label: "Gemini 2.5 Flash (rápido)" },
  { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash (estable)" },
];

const TONES = [
  { value: "professional", label: "Profesional" },
  { value: "friendly", label: "Amigable" },
  { value: "formal", label: "Formal" },
  { value: "neutral", label: "Neutral" },
];

const THINKING_LEVELS = [
  { value: "none", label: "Sin razonamiento" },
  { value: "low", label: "Bajo" },
  { value: "medium", label: "Medio" },
  { value: "high", label: "Alto (más lento)" },
];

export default function AIConfigPage() {
  const [config, setConfig] = useState({
    primaryProvider: "OPENAI",
    primaryApiKeyRef: "openai-main",
    primaryModel: "gpt-4o",
    fallbackProvider: "GEMINI",
    fallbackApiKeyRef: "gemini-main",
    fallbackModel: "gemini-2.0-flash",
    classificationModel: "gpt-4o-mini",
    generationModel: "gpt-4o",
    extractionModel: "gpt-4o",
    summarizationModel: "gpt-4o-mini",
    suggestionModel: "gpt-4o-mini",
    systemPrompt: "Eres un asistente virtual de TechCorp SA. Sé amable, conciso y útil. Responde en el idioma del usuario.",
    tone: "friendly",
    language: "es",
    temperature: 0.7,
    maxTokens: 1024,
    thinkingLevel: "none",
  });

  const getModels = (provider: string) =>
    provider === "OPENAI" ? OPENAI_MODELS : GEMINI_MODELS;

  function handleSave() {
    alert("Configuración guardada (conectar con API en producción)");
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-violet-400" />
            IA Generativa
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Configura el motor dual OpenAI/Gemini para esta empresa
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          <Save className="h-4 w-4" />
          Guardar configuración
        </button>
      </div>

      {/* Primary Provider */}
      <Section title="Proveedor Principal">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Proveedor">
            <Select
              value={config.primaryProvider}
              onChange={(v) => setConfig({ ...config, primaryProvider: v })}
              options={PROVIDERS}
            />
          </Field>
          <Field label="API Key (referencia del vault)">
            <input
              type="text"
              value={config.primaryApiKeyRef}
              onChange={(e) => setConfig({ ...config, primaryApiKeyRef: e.target.value })}
              className={inputClass}
              placeholder="openai-main"
            />
          </Field>
          <Field label="Modelo principal">
            <Select
              value={config.primaryModel}
              onChange={(v) => setConfig({ ...config, primaryModel: v })}
              options={getModels(config.primaryProvider)}
            />
          </Field>
        </div>
      </Section>

      {/* Fallback Provider */}
      <Section title="Proveedor Fallback">
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2">
          <AlertCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-300">
            Si el proveedor principal falla, el router cambiará automáticamente al fallback.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Proveedor fallback">
            <Select
              value={config.fallbackProvider}
              onChange={(v) => setConfig({ ...config, fallbackProvider: v })}
              options={PROVIDERS}
            />
          </Field>
          <Field label="API Key fallback (referencia)">
            <input
              type="text"
              value={config.fallbackApiKeyRef}
              onChange={(e) => setConfig({ ...config, fallbackApiKeyRef: e.target.value })}
              className={inputClass}
              placeholder="gemini-main"
            />
          </Field>
          <Field label="Modelo fallback">
            <Select
              value={config.fallbackModel}
              onChange={(v) => setConfig({ ...config, fallbackModel: v })}
              options={getModels(config.fallbackProvider)}
            />
          </Field>
        </div>
      </Section>

      {/* Per-Use-Case Models */}
      <Section title="Modelos por caso de uso">
        <p className="text-xs text-slate-400 mb-4">
          Optimiza costo y velocidad asignando modelos específicos a cada tarea.
          Vacío = usa el modelo principal.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "classificationModel", label: "Clasificación de intención", hint: "Modelo rápido/económico" },
            { key: "generationModel", label: "Generación de texto", hint: "Modelo principal" },
            { key: "extractionModel", label: "Extracción estructurada", hint: "Máxima adherencia" },
            { key: "summarizationModel", label: "Resumen de conversación", hint: "Modelo intermedio" },
            { key: "suggestionModel", label: "Sugerencias para agente", hint: "Modelo rápido" },
          ].map((item) => (
            <Field key={item.key} label={item.label} hint={item.hint}>
              <Select
                value={String((config as Record<string, unknown>)[item.key] ?? "")}
                onChange={(v) => setConfig({ ...config, [item.key]: v })}
                options={[
                  { value: "", label: "Usar modelo principal" },
                  ...getModels(config.primaryProvider),
                ]}
              />
            </Field>
          ))}
        </div>
      </Section>

      {/* Prompt & Settings */}
      <Section title="Prompt base y configuración">
        <div className="space-y-4">
          <Field label="Prompt de sistema">
            <textarea
              value={config.systemPrompt}
              onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
              rows={4}
              className={inputClass + " resize-y"}
              placeholder="Instrucciones base para la IA..."
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Tono">
              <Select
                value={config.tone}
                onChange={(v) => setConfig({ ...config, tone: v })}
                options={TONES}
              />
            </Field>
            <Field label="Idioma por defecto">
              <Select
                value={config.language}
                onChange={(v) => setConfig({ ...config, language: v })}
                options={[
                  { value: "es", label: "Español" },
                  { value: "en", label: "English" },
                  { value: "pt", label: "Português" },
                ]}
              />
            </Field>
            <Field label="Nivel de razonamiento (Gemini)">
              <Select
                value={config.thinkingLevel}
                onChange={(v) => setConfig({ ...config, thinkingLevel: v })}
                options={THINKING_LEVELS}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label={`Temperatura: ${config.temperature}`}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={config.temperature}
                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full accent-indigo-500 mt-1"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Conservador</span><span>Creativo</span>
              </div>
            </Field>
            <Field label="Máximo de tokens">
              <input
                type="number"
                value={config.maxTokens}
                onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                className={inputClass}
                min={256}
                max={8192}
                step={256}
              />
            </Field>
          </div>
        </div>
      </Section>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-6">
      <h2 className="text-base font-semibold text-white mb-5">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      {hint && <p className="text-xs text-slate-500 mb-1">{hint}</p>}
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass + " appearance-none pr-8"}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
    </div>
  );
}
