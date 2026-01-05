// AI Agents Integration (Google Gemini, OpenAI, Anthropic, etc.)

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
  };
  error?: string;
}

export async function callGemini(
  prompt: string,
  systemContext?: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<AIResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemContext,
        ...options,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { content: '', error: error.message || 'AI request failed' };
    }

    return await res.json();
  } catch (error: any) {
    return { content: '', error: error.message || 'Network error' };
  }
}

export async function callOpenAI(
  messages: AIMessage[],
  model: string = 'gpt-4',
  options?: { temperature?: number; maxTokens?: number }
): Promise<AIResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/openai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, model, ...options }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { content: '', error: error.message || 'AI request failed' };
    }

    return await res.json();
  } catch (error: any) {
    return { content: '', error: error.message || 'Network error' };
  }
}

export async function callAnthropic(
  prompt: string,
  systemContext?: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<AIResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/anthropic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemContext, ...options }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { content: '', error: error.message || 'AI request failed' };
    }

    return await res.json();
  } catch (error: any) {
    return { content: '', error: error.message || 'Network error' };
  }
}

export async function listAvailableAIModels(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/models`);
    if (!res.ok) throw new Error('Failed to list models');
    return res.json();
  } catch (error) {
    console.error('Error listing AI models:', error);
    return [];
  }
}
