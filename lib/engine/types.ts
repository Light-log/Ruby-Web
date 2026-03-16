// ─── Bot / Flow Engine – Types ────────────────────────────────────────────────

import type { CanonicalBlock } from "../canonical/types";

export type FlowNodeType =
  | "MESSAGE"
  | "QUESTION"
  | "BUTTONS"
  | "CAROUSEL"
  | "FORM"
  | "CONDITION"
  | "HTTP_REQUEST"
  | "SCRIPT"
  | "AI_GENERATE"
  | "HANDOFF"
  | "END";

// ─── Node Configs (one per type) ──────────────────────────────────────────────

export interface MessageNodeConfig {
  block: CanonicalBlock;
  delay?: number; // ms before sending
}

export interface QuestionNodeConfig {
  text: string;
  variableName: string; // Store answer in this context variable
  validation?: {
    type: "text" | "email" | "phone" | "number";
    errorMessage?: string;
  };
}

export interface ButtonsNodeConfig {
  text: string;
  buttons: Array<{
    label: string;
    value: string;
    nextNodeId: string;
  }>;
  timeout?: number; // ms before default branch
  defaultNextNodeId?: string;
}

export interface CarouselNodeConfig {
  items: Array<{
    title: string;
    description?: string;
    imageUrl?: string;
    actions: Array<{ label: string; value: string; nextNodeId: string }>;
  }>;
}

export interface FormNodeConfig {
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "email" | "phone" | "number" | "select" | "date";
    required?: boolean;
    options?: Array<{ label: string; value: string }>;
  }>;
  successNextNodeId?: string;
}

export interface ConditionNodeConfig {
  conditions: Array<{
    expression: string; // e.g. "context.age > 18"
    nextNodeId: string;
  }>;
  defaultNextNodeId?: string;
}

export interface HttpRequestNodeConfig {
  credentialId: string; // References HttpCredential
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  pathTemplate: string; // e.g. "/orders/{{context.orderId}}"
  bodyTemplate?: string; // JSON template with {{variable}} placeholders
  headers?: Record<string, string>;
  responseMapping?: Record<string, string>; // contextVar: jsonPath
  successNextNodeId?: string;
  errorNextNodeId?: string;
}

export interface ScriptNodeConfig {
  scriptId: string;
  version?: number; // Uses latest published if omitted
  inputMapping?: Record<string, string>; // scriptVar: contextPath
  outputMapping?: Record<string, string>; // contextVar: outputPath
  successNextNodeId?: string;
  errorNextNodeId?: string;
}

export interface AIGenerateNodeConfig {
  promptTemplate: string; // Template with {{context.var}} placeholders
  useCase: "generation" | "extraction" | "classification";
  outputVariable: string; // Where to store AI result in context
  extractionFields?: Array<{
    name: string;
    type: "string" | "number" | "boolean";
    description?: string;
  }>;
  successNextNodeId?: string;
}

export interface HandoffNodeConfig {
  queueId?: string;
  assignToUserId?: string;
  message?: string; // Message to show user while waiting
  botPauseAfterHandoff?: boolean;
}

export interface EndNodeConfig {
  message?: string;
  closeConversation?: boolean;
  triggerBotResume?: boolean;
  botResumeAfterMs?: number;
}

export type NodeConfig =
  | MessageNodeConfig
  | QuestionNodeConfig
  | ButtonsNodeConfig
  | CarouselNodeConfig
  | FormNodeConfig
  | ConditionNodeConfig
  | HttpRequestNodeConfig
  | ScriptNodeConfig
  | AIGenerateNodeConfig
  | HandoffNodeConfig
  | EndNodeConfig;

// ─── Flow Node ────────────────────────────────────────────────────────────────

export interface FlowNode {
  id: string;
  type: FlowNodeType;
  label?: string;
  config: NodeConfig;
  position: { x: number; y: number };
  edges: Array<{
    condition?: string;
    targetNodeId: string;
    label?: string;
  }>;
}

// ─── Flow Definition ──────────────────────────────────────────────────────────

export interface FlowDefinition {
  id: string;
  companyId: string;
  name: string;
  version: number;
  startNodeId: string;
  nodes: FlowNode[];
}

// ─── Execution Context ────────────────────────────────────────────────────────

export interface FlowContext {
  conversationId: string;
  contactId?: string;
  channelType: string;
  recipientId: string;
  variables: Record<string, unknown>;
  currentNodeId: string;
  visitedNodeIds: string[];
  startedAt: Date;
}

// ─── Engine Result ────────────────────────────────────────────────────────────

export type FlowStepResult =
  | { type: "CONTINUE"; nextNodeId: string; context: FlowContext }
  | { type: "WAIT_FOR_INPUT"; variableName: string; context: FlowContext }
  | { type: "HANDOFF"; queueId?: string; context: FlowContext }
  | { type: "END"; context: FlowContext }
  | { type: "ERROR"; error: string; context: FlowContext };
