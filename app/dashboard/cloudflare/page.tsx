'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { Cloud, Server, Database, Folder } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export default function CloudflarePage() {
  const [resources, setResources] = useState<any>({
    workers: 0,
    pages: 0,
    r2: 0,
    d1: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cloudflare/resources`);
      if (res.ok) {
        const data = await res.json();
        setResources(data);
      }
    } catch (error) {
      console.error('Error loading Cloudflare resources:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Cloud className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold">Cloudflare Resources</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card-hover p-6">
            <Server className="w-8 h-8 mb-2 text-purple-400" />
            <div className="text-3xl font-bold mb-1">{resources.workers || 0}</div>
            <div className="text-white/60">Workers</div>
          </div>

          <div className="glass-card-hover p-6">
            <Cloud className="w-8 h-8 mb-2 text-purple-400" />
            <div className="text-3xl font-bold mb-1">{resources.pages || 0}</div>
            <div className="text-white/60">Pages</div>
          </div>

          <div className="glass-card-hover p-6">
            <Folder className="w-8 h-8 mb-2 text-purple-400" />
            <div className="text-3xl font-bold mb-1">{resources.r2 || 0}</div>
            <div className="text-white/60">R2 Buckets</div>
          </div>

          <div className="glass-card-hover p-6">
            <Database className="w-8 h-8 mb-2 text-purple-400" />
            <div className="text-3xl font-bold mb-1">{resources.d1 || 0}</div>
            <div className="text-white/60">D1 Databases</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
