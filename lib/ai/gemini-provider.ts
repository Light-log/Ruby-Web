// ─── Gemini Provider ───────────────────────────────────────────────────────────
// Uses generateContent from the Google Generative AI SDK.
// Model IDs should be stored in config (not hardcoded) because Google
// deprecates preview models frequently (e.g. gemini-3.1-pro-preview was
// shut down March 9, 2026). Use stable model aliases where possible.
// Reference: https://ai.google.dev/api/generate-content

import { GoogleGenerativeAI, type GenerateContentRequest } from "@google/generative-ai";
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

// Map our thinking levels to Gemini budget tokens
const THINKING_BUDGET: Record<string, number> = {
  none: 0,
  low: 512,
  medium: 2048,
  high: 8192,
};

export class GeminiProvider implements IAIProvider {
  readonly name: AIProviderName = "gemini";
  private client: GoogleGenerativeAI;
  private config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.client = new GoogleGenerativeAI(config.apiKey);
  }

  private buildRequest(
    input: NormalizedPrompt,
    systemOverride?: string
  ): { modelId: string; request: GenerateContentRequest } {
    const modelId =
      this.config.modelsByUseCase?.generation ?? this.config.primaryModel;

    const systemInstruction =
      systemOverride ?? input.system ?? undefined;

    // Separate history from last user message
    const history = input.messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : ("user" as "user" | "model"),
      parts: [{ text: m.content }],
    }));

    const lastMessage = input.messages[input.messages.length - 1];

    const request: GenerateContentRequest = {
      contents: [
        ...history,
        {
          role: "user" as const,
          parts: [{ text: lastMessage?.content ?? "" }],
        },
      ],
      ...(systemInstruction
        ? { systemInstruction: { role: "system", parts: [{ text: systemInstruction }] } }
        : {}),
      generationConfig: {
        temperature: input.temperature ?? 0.7,
        maxOutputTokens: input.maxTokens ?? 1024,
        ...(input.thinkingLevel && input.thinkingLevel !== "none"
          ? { thinkingConfig: { thinkingBudget: THINKING_BUDGET[input.thinkingLevel] } }
          : {}),
      },
    };

    return { modelId, request };
  }

  async generateText(input: NormalizedPrompt): Promise<AIResult> {
    const { modelId, request } = this.buildRequest(input);
    const model = this.client.getGenerativeModel({ model: modelId });
    const result = await model.generateContent(request);
    const response = result.response;
    const text = response.text();

    return {
      text,
      provider: "gemini",
      model: modelId,
      usage: response.usageMetadata
        ? {
            promptTokens: response.usageMetadata.promptTokenCount ?? 0,
            completionTokens: response.usageMetadata.candidatesTokenCount ?? 0,
            totalTokens: response.usageMetadata.totalTokenCount ?? 0,
          }
        : undefined,
    };
  }

  async classifyIntent(input: IntentInput): Promise<IntentResult> {
    const modelId =
      this.config.modelsByUseCase?.classification ?? this.config.primaryModel;

    const prompt = `You are an intent classifier. Given the user text, classify it as one of these intents: ${input.availableIntents.join(", ")}.
Return only JSON (no markdown): { "intent": "<intent>", "confidence": <0-1>, "entities": {} }
User text: "${input.text}"`;

    const model = this.client.getGenerativeModel({ model: modelId });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 200 },
    });

    const rawText = result.response.text();
    try {
      const cleaned = rawText.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(cleaned) as IntentResult;
    } catch {
      return { intent: input.availableIntents[0] ?? "unknown", confidence: 0 };
    }
  }

  async summarizeConversation(input: SummaryInput): Promise<SummaryResult> {
    const modelId =
      this.config.modelsByUseCase?.summarization ?? this.config.primaryModel;

    const transcript = input.messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `Summarize this conversation and extract key points.
Return only JSON (no markdown): { "summary": "<brief summary>", "keyPoints": ["point1", "point2"] }
Max summary length: ${input.maxLength ?? 200} characters.

Conversation:
${transcript}`;

    const model = this.client.getGenerativeModel({ model: modelId });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 400 },
    });

    const rawText = result.response.text();
    try {
      const cleaned = rawText.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(cleaned) as SummaryResult;
    } catch {
      return { summary: rawText.slice(0, 200), keyPoints: [] };
    }
  }

  async extractStructuredData(input: ExtractionInput): Promise<ExtractionResult> {
    const modelId =
      this.config.modelsByUseCase?.extraction ?? this.config.primaryModel;

    const schema = input.fields
      .map((f) => `- ${f.name} (${f.type}${f.required ? ", required" : ""}): ${f.description ?? ""}`)
      .join("\n");

    const prompt = `Extract the following fields from the text. Return only JSON (no markdown).
Fields:
${schema}

Text: "${input.text}"

Return: { "fields": { "<field>": <value or null> }, "confidence": <0-1> }`;

    const model = this.client.getGenerativeModel({ model: modelId });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 500 },
    });

    const rawText = result.response.text();
    try {
      const cleaned = rawText.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(cleaned) as ExtractionResult;
    } catch {
      return { fields: {}, confidence: 0 };
    }
  }
}
