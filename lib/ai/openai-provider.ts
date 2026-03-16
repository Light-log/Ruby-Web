// ─── OpenAI Provider ──────────────────────────────────────────────────────────
// Uses the Responses API (recommended for new projects) which supports
// state, tools, and function calling natively.
// Reference: https://platform.openai.com/docs/api-reference/responses

import OpenAI from "openai";
import type {
  IAIProvider,
  AIProviderConfig,
  AIProviderName,
  NormalizedPrompt,
  IntentInput,
  ExtractionInput,
  SummaryInput,
  AIResult,
  IntentResult,
  ExtractionResult,
  SummaryResult,
} from "./types";

export class OpenAIProvider implements IAIProvider {
  readonly name: AIProviderName = "openai";
  private client: OpenAI;
  private config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.client = new OpenAI({ apiKey: config.apiKey });
  }

  async generateText(input: NormalizedPrompt): Promise<AIResult> {
    const model = input.tools?.length
      ? (this.config.modelsByUseCase?.generation ?? this.config.primaryModel)
      : (this.config.modelsByUseCase?.generation ?? this.config.primaryModel);

    // Build input array for Responses API
    const inputMessages = input.messages.map((m) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    }));

    const tools = input.tools?.map((t) => ({
      type: "function" as const,
      name: t.name,
      description: t.description,
      parameters: t.parameters,
      strict: false,
    }));

    const response = await this.client.responses.create({
      model,
      input: inputMessages,
      instructions: input.system,
      temperature: input.temperature ?? 0.7,
      max_output_tokens: input.maxTokens ?? 1024,
      ...(tools?.length ? { tools } : {}),
    });

    const text =
      response.output
        ?.filter((o) => o.type === "message")
        .map((o) => (o as { type: "message"; content: Array<{ type: string; text: string }> }).content?.map((c) => c.text).join("") ?? "")
        .join("") ?? "";

    const toolCalls =
      response.output
        ?.filter((o) => o.type === "function_call")
        .map((o) => {
          const fc = o as { type: "function_call"; call_id: string; name: string; arguments: string };
          return {
            id: fc.call_id,
            name: fc.name,
            arguments: JSON.parse(fc.arguments || "{}"),
          };
        }) ?? [];

    return {
      text,
      provider: "openai",
      model,
      toolCalls: toolCalls.length ? toolCalls : undefined,
      usage: response.usage
        ? {
            promptTokens: response.usage.input_tokens,
            completionTokens: response.usage.output_tokens,
            totalTokens: response.usage.total_tokens,
          }
        : undefined,
    };
  }

  async classifyIntent(input: IntentInput): Promise<IntentResult> {
    const model =
      this.config.modelsByUseCase?.classification ?? this.config.primaryModel;

    const prompt = `You are an intent classifier. Given the user text, classify it as one of these intents: ${input.availableIntents.join(", ")}.
Return JSON: { "intent": "<intent>", "confidence": <0-1>, "entities": {} }
User text: "${input.text}"`;

    const response = await this.client.responses.create({
      model,
      input: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_output_tokens: 200,
    });

    const rawText =
      response.output
        ?.filter((o) => o.type === "message")
        .map((o) => (o as { type: "message"; content: Array<{ type: string; text: string }> }).content?.map((c) => c.text).join(""))
        .join("") ?? "{}";

    try {
      const cleaned = rawText.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(cleaned) as IntentResult;
    } catch {
      return { intent: input.availableIntents[0] ?? "unknown", confidence: 0 };
    }
  }

  async summarizeConversation(input: SummaryInput): Promise<SummaryResult> {
    const model =
      this.config.modelsByUseCase?.summarization ?? this.config.primaryModel;

    const transcript = input.messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `Summarize this conversation and extract key points.
Return JSON: { "summary": "<brief summary>", "keyPoints": ["point1", "point2"] }
Max summary length: ${input.maxLength ?? 200} characters.

Conversation:
${transcript}`;

    const response = await this.client.responses.create({
      model,
      input: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_output_tokens: 400,
    });

    const rawText =
      response.output
        ?.filter((o) => o.type === "message")
        .map((o) => (o as { type: "message"; content: Array<{ type: string; text: string }> }).content?.map((c) => c.text).join(""))
        .join("") ?? "{}";

    try {
      const cleaned = rawText.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(cleaned) as SummaryResult;
    } catch {
      return { summary: rawText.slice(0, 200), keyPoints: [] };
    }
  }

  async extractStructuredData(input: ExtractionInput): Promise<ExtractionResult> {
    const model =
      this.config.modelsByUseCase?.extraction ?? this.config.primaryModel;

    const schema = input.fields
      .map((f) => `- ${f.name} (${f.type}${f.required ? ", required" : ""}): ${f.description ?? ""}`)
      .join("\n");

    const prompt = `Extract the following fields from the text. Return only JSON.
Fields:
${schema}

Text: "${input.text}"

Return: { "fields": { "<field>": <value or null> }, "confidence": <0-1> }`;

    const response = await this.client.responses.create({
      model,
      input: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_output_tokens: 500,
    });

    const rawText =
      response.output
        ?.filter((o) => o.type === "message")
        .map((o) => (o as { type: "message"; content: Array<{ type: string; text: string }> }).content?.map((c) => c.text).join(""))
        .join("") ?? "{}";

    try {
      const cleaned = rawText.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(cleaned) as ExtractionResult;
    } catch {
      return { fields: {}, confidence: 0 };
    }
  }
}
