'use client';

import AppShell from '@/components/AppShell';
import { Workflow, Play, Plus } from 'lucide-react';

export default function WorkflowsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Workflow className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Workflows</h2>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Workflow</span>
          </button>
        </div>

        <div className="glass-card p-12 text-center">
          <Workflow className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-white/60">Workflow automation coming soon</p>
        </div>
      </div>
    </AppShell>
  );
}
