// ─── AI Provider Router ────────────────────────────────────────────────────────
// Detects available API keys, selects the right provider per use-case,
// applies fallback on failure, and exposes a single normalized interface
// to the rest of the system.

import { OpenAIProvider } from "./openai-provider";
import { GeminiProvider } from "./gemini-provider";
import type {
  IAIProvider,
  AIRouterConfig,
  AIUseCase,
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

export class AIProviderRouter {
  private primary: IAIProvider;
  private fallback?: IAIProvider;
  private config: AIRouterConfig;

  constructor(config: AIRouterConfig) {
    this.config = config;
    this.primary = this.buildProvider(config.primary.provider, config.primary.config);
    if (config.fallback) {
      this.fallback = this.buildProvider(config.fallback.provider, config.fallback.config);
    }
  }

  private buildProvider(name: AIProviderName, cfg: AIRouterConfig["primary"]["config"]): IAIProvider {
    if (name === "openai") return new OpenAIProvider(cfg);
    if (name === "gemini") return new GeminiProvider(cfg);
    throw new Error(`Unknown AI provider: ${name}`);
  }

  /** Select provider based on use-case routing rules */
  private selectProvider(useCase: AIUseCase): IAIProvider {
    // Route to the provider that has a model configured for this use-case
    // Currently both providers support all use-cases; future routing can
    // prefer one provider for specific tasks (e.g. tools-heavy → OpenAI).
    return this.primary;
  }

  private async withFallback<T>(
    useCase: AIUseCase,
    fn: (provider: IAIProvider) => Promise<T>
  ): Promise<T> {
    const provider = this.selectProvider(useCase);
    try {
      return await fn(provider);
    } catch (primaryError) {
      if (!this.fallback) throw primaryError;
      console.warn(
        `[AIRouter] Primary provider ${provider.name} failed for ${useCase}. Falling back.`,
        primaryError
      );
      try {
        return await fn(this.fallback);
      } catch (fallbackError) {
        console.error("[AIRouter] Fallback provider also failed.", fallbackError);
        throw fallbackError;
      }
    }
  }

  async generateText(input: NormalizedPrompt): Promise<AIResult> {
    return this.withFallback("generation", (p) => p.generateText(input));
  }

  async classifyIntent(input: IntentInput): Promise<IntentResult> {
    return this.withFallback("classification", (p) => p.classifyIntent(input));
  }

  async summarizeConversation(input: SummaryInput): Promise<SummaryResult> {
    return this.withFallback("summarization", (p) => p.summarizeConversation(input));
  }

  async extractStructuredData(input: ExtractionInput): Promise<ExtractionResult> {
    return this.withFallback("extraction", (p) => p.extractStructuredData(input));
  }

  get primaryProviderName(): AIProviderName {
    return this.primary.name;
  }

  get fallbackProviderName(): AIProviderName | undefined {
    return this.fallback?.name;
  }
}

// ─── Factory: build router from company AI config ─────────────────────────────

export interface CompanyAIConfigInput {
  primaryProvider: "OPENAI" | "GEMINI";
  primaryModel: string;
  primaryApiKey: string; // Already decrypted from vault

  fallbackProvider?: "OPENAI" | "GEMINI";
  fallbackModel?: string;
  fallbackApiKey?: string;

  classificationModel?: string;
  generationModel?: string;
  extractionModel?: string;
  summarizationModel?: string;
  suggestionModel?: string;

  temperature?: number;
  maxTokens?: number;
  thinkingLevel?: "none" | "low" | "medium" | "high";
}

export function buildRouterFromConfig(cfg: CompanyAIConfigInput): AIProviderRouter {
  const toPrimary = (provider: "OPENAI" | "GEMINI"): AIProviderName =>
    provider === "OPENAI" ? "openai" : "gemini";

  const modelsByUseCase = {
    classification: cfg.classificationModel,
    generation: cfg.generationModel,
    extraction: cfg.extractionModel,
    summarization: cfg.summarizationModel,
    suggestion: cfg.suggestionModel,
  };

  const routerConfig: AIRouterConfig = {
    primary: {
      provider: toPrimary(cfg.primaryProvider),
      config: {
        apiKey: cfg.primaryApiKey,
        primaryModel: cfg.primaryModel,
        modelsByUseCase,
      },
    },
    defaultTemperature: cfg.temperature,
    defaultMaxTokens: cfg.maxTokens,
    defaultThinkingLevel: cfg.thinkingLevel,
  };

  if (cfg.fallbackProvider && cfg.fallbackModel && cfg.fallbackApiKey) {
    routerConfig.fallback = {
      provider: toPrimary(cfg.fallbackProvider),
      config: {
        apiKey: cfg.fallbackApiKey,
        primaryModel: cfg.fallbackModel,
        modelsByUseCase,
      },
    };
  }

  return new AIProviderRouter(routerConfig);
}
