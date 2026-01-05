'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/AppShell';
import { Palette, Save, RefreshCw } from 'lucide-react';
import { fetchThemesFromD1, applyTheme, getStoredTheme, type Theme } from '@/lib/themes';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export default function SettingsPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThemes();
    const stored = getStoredTheme();
    if (stored) setSelectedTheme(stored);
  }, []);

  const loadThemes = async () => {
    setLoading(true);
    try {
      const fetchedThemes = await fetchThemesFromD1(API_BASE);
      setThemes(fetchedThemes);
      if (fetchedThemes.length > 0 && !selectedTheme) {
        setSelectedTheme(fetchedThemes[0]);
      }
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
          <h2 className="text-3xl font-bold">Settings</h2>
          <button
            onClick={loadThemes}
            className="glass-card px-4 py-2 flex items-center gap-2 hover:border-purple-500/50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Themes</span>
          </button>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold">Theme Customization</h3>
          </div>

          {loading ? (
            <div className="text-center py-8 text-white/60">Loading themes...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedTheme?.id === theme.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/20'
                    }`}
                  style={{
                    background: theme.gradients.background,
                    color: theme.colors.text,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{theme.name}</h4>
                    {selectedTheme?.id === theme.id && (
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded"
                      style={{ background: theme.colors.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded"
                      style={{ background: theme.colors.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded"
                      style={{ background: theme.colors.accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTheme && (
            <div className="mt-6 p-4 rounded-lg border border-white/10">
              <h4 className="font-semibold mb-3">Current Theme: {selectedTheme.name}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-white/60 mb-1">Primary</div>
                  <div
                    className="w-full h-8 rounded"
                    style={{ background: selectedTheme.colors.primary }}
                  />
                </div>
                <div>
                  <div className="text-white/60 mb-1">Secondary</div>
                  <div
                    className="w-full h-8 rounded"
                    style={{ background: selectedTheme.colors.secondary }}
                  />
                </div>
                <div>
                  <div className="text-white/60 mb-1">Accent</div>
                  <div
                    className="w-full h-8 rounded"
                    style={{ background: selectedTheme.colors.accent }}
                  />
                </div>
                <div>
                  <div className="text-white/60 mb-1">Background</div>
                  <div
                    className="w-full h-8 rounded"
                    style={{ background: selectedTheme.colors.background }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
