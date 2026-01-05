'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/AppShell';
import { FolderKanban, Users, Rocket, CheckCircle2, Circle } from 'lucide-react';

// API URL - will be set via environment variable in Cloudflare Pages
const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    teams: 0,
    deployments: 0,
    successRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/dashboard/stats`)
      .then(res => res.json())
      .then(data => {
        setStats({
          projects: data.projects || 0,
          teams: data.teams || 0,
          deployments: data.deployments || 0,
          successRate: data.successRate || 0
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  const statCards = [
    { label: 'Active Projects', value: stats.projects, Icon: FolderKanban },
    { label: 'Team Members', value: stats.teams, Icon: Users },
    { label: 'Deployments', value: stats.deployments, Icon: Rocket },
    { label: 'Success Rate', value: `${stats.successRate}%`, Icon: CheckCircle2 },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.Icon;
            return (
              <div key={stat.label} className="glass-card-hover p-6">
                <Icon className="w-8 h-8 mb-2 text-purple-400" />
                <div className="text-3xl font-bold mb-1">
                  {loading ? '...' : stat.value}
                </div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                <div className="flex-1">
                  <div className="font-medium">Deployment successful</div>
                  <div className="text-sm text-white/50">meauxos-api.workers.dev</div>
                </div>
                <div className="text-sm text-white/50">2 min ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
