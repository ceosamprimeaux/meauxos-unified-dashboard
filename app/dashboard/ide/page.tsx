'use client';

import AppShell from '@/components/AppShell';
import { Terminal, Code2 } from 'lucide-react';

export default function IDEPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Terminal className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold">Integrated Development Environment</h2>
        </div>

        <div className="glass-card p-12 text-center">
          <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-white/60">IDE interface coming soon</p>
        </div>
      </div>
    </AppShell>
  );
}
