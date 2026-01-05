'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { Bot, Send, Sparkles } from 'lucide-react';
import { callGemini, callOpenAI, callAnthropic, listAvailableAIModels, type AIResponse } from '@/lib/ai';

export default function AIPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    const modelList = await listAvailableAIModels();
    setModels(modelList);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      let result: AIResponse;

      if (selectedModel.startsWith('gemini')) {
        result = await callGemini(prompt, 'You are a helpful AI assistant for MeauxOS.');
      } else if (selectedModel.startsWith('gpt') || selectedModel.startsWith('claude')) {
        result = await callOpenAI(
          [{ role: 'user', content: prompt }],
          selectedModel
        );
      } else {
        result = await callAnthropic(prompt, 'You are a helpful AI assistant for MeauxOS.');
      }

      setResponse(result);
    } catch (error) {
      setResponse({ content: '', error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">AI & Knowledge</h2>
          </div>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="glass-card px-4 py-2"
          >
            {models.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Prompt
            </h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="input-field font-mono text-sm h-48 resize-none"
              placeholder="Enter your prompt..."
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary mt-4 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Processing...' : 'Send'}</span>
            </button>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Response</h3>
            {response ? (
              response.error ? (
                <div className="text-red-400">Error: {response.error}</div>
              ) : (
                <div className="space-y-4">
                  <div className="text-white/80 whitespace-pre-wrap">{response.content}</div>
                  {response.model && (
                    <div className="text-sm text-white/60">Model: {response.model}</div>
                  )}
                  {response.usage && (
                    <div className="text-sm text-white/60">
                      Tokens: {response.usage.prompt_tokens + response.usage.completion_tokens}
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="text-white/60">Enter a prompt to get started</div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
