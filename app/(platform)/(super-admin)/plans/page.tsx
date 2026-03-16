"use client";

import { useState } from "react";
import { CreditCard, Plus, Check, X } from "lucide-react";
import { Badge } from "@/components/platform/shared/badge";

const plans = [
  {
    id: "1",
    name: "Starter",
    price: 29,
    interval: "monthly",
    companies: 4,
    features: {
      maxUsers: 5, maxAgents: 2, maxChannels: 2, maxBots: 1,
      maxConversations: 1000, maxMessages: 10000, aiCallsPerMonth: 500,
      hasLiveChat: true, hasAI: true, hasCustomCode: false,
      hasWebhooks: false, hasAnalytics: false, hasMultiChannel: false,
    },
  },
  {
    id: "2",
    name: "Pro",
    price: 99,
    interval: "monthly",
    companies: 18,
    features: {
      maxUsers: 20, maxAgents: 8, maxChannels: 4, maxBots: 5,
      maxConversations: 10000, maxMessages: 100000, aiCallsPerMonth: 5000,
      hasLiveChat: true, hasAI: true, hasCustomCode: true,
      hasWebhooks: true, hasAnalytics: true, hasMultiChannel: true,
    },
  },
  {
    id: "3",
    name: "Enterprise",
    price: 349,
    interval: "monthly",
    companies: 7,
    features: {
      maxUsers: 200, maxAgents: 50, maxChannels: 10, maxBots: 20,
      maxConversations: 100000, maxMessages: 1000000, aiCallsPerMonth: 50000,
      hasLiveChat: true, hasAI: true, hasCustomCode: true,
      hasWebhooks: true, hasAnalytics: true, hasMultiChannel: true,
    },
  },
];

type Plan = typeof plans[number];

export default function PlansPage() {
  const [selected, setSelected] = useState<Plan | null>(null);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-indigo-400" />
            Planes
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Define los límites y features disponibles por tier
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
          <Plus className="h-4 w-4" />
          Nuevo plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan)}
            className={`cursor-pointer rounded-xl border p-6 transition-all ${
              selected?.id === plan.id
                ? "border-indigo-500 bg-indigo-600/10"
                : "border-slate-700/60 bg-slate-800/50 hover:border-slate-600"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <Badge variant="info">{plan.companies} empresas</Badge>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-bold text-white">${plan.price}</span>
              <span className="text-sm text-slate-400">/{plan.interval}</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Usuarios</span><span className="font-medium">{plan.features.maxUsers}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Agentes</span><span className="font-medium">{plan.features.maxAgents}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Canales</span><span className="font-medium">{plan.features.maxChannels}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Conversaciones/mes</span>
                <span className="font-medium">{plan.features.maxConversations.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Llamadas IA/mes</span>
                <span className="font-medium">{plan.features.aiCallsPerMonth.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-1.5">
              {[
                ["Live chat", plan.features.hasLiveChat],
                ["IA generativa", plan.features.hasAI],
                ["Scripts personalizados", plan.features.hasCustomCode],
                ["Webhooks", plan.features.hasWebhooks],
                ["Analítica avanzada", plan.features.hasAnalytics],
                ["Multi-canal", plan.features.hasMultiChannel],
              ].map(([label, enabled]) => (
                <div key={String(label)} className="flex items-center gap-2 text-xs">
                  {enabled ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
                  )}
                  <span className={enabled ? "text-slate-200" : "text-slate-500"}>
                    {String(label)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors">
                Editar
              </button>
              <button className="flex-1 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors">
                Duplicar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
