'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/AppShell';
import { Palette, RefreshCw } from 'lucide-react';
import { fetchThemesFromD1, applyTheme, type Theme } from '@/lib/themes';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    setLoading(true);
    try {
      const fetchedThemes = await fetchThemesFromD1(API_BASE);
      setThemes(fetchedThemes);
    } catch (error) {
      console.error('Error loading themes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    applyTheme(theme);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Themes</h2>
          </div>
          <button
            onClick={loadThemes}
            className="glass-card px-4 py-2 flex items-center gap-2 hover:border-purple-500/50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-white/60">Loading themes from database...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleThemeSelect(theme)}
                className={`glass-card-hover p-6 cursor-pointer transition-all ${selectedTheme?.id === theme.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                style={{
                  background: theme.gradients.background,
                  color: theme.colors.text,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{theme.name}</h3>
                  {selectedTheme?.id === theme.id && (
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div
                      className="flex-1 h-12 rounded"
                      style={{ background: theme.colors.primary }}
                    />
                    <div
                      className="flex-1 h-12 rounded"
                      style={{ background: theme.colors.secondary }}
                    />
                    <div
                      className="flex-1 h-12 rounded"
                      style={{ background: theme.colors.accent }}
                    />
                  </div>
                  <div className="text-sm text-white/60">
                    {theme.slug}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
