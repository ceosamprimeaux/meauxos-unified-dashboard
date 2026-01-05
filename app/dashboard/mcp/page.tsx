'use client';

import AppShell from '@/components/AppShell';
import { Zap, Plug } from 'lucide-react';

export default function MCPPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold">MCP Tools</h2>
        </div>

        <div className="glass-card p-12 text-center">
          <Plug className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-white/60">MCP tools interface coming soon</p>
        </div>
      </div>
    </AppShell>
  );
}
