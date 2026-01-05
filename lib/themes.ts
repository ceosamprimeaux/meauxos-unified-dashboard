// Theme system - fetches from D1 database
// Clay.global inspired design with MeauxOS brand guidelines

export interface Theme {
  id: string;
  name: string;
  slug: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
  };
  effects: {
    glass: string;
    clay: string;
    shadow: string;
  };
}

// Default themes (will be enhanced with D1 data)
export const defaultThemes: Theme[] = [
  {
    id: 'light-indigo',
    name: 'Light Indigo',
    slug: 'light-indigo',
    colors: {
      primary: '#6366f1',
      secondary: '#818cf8',
      accent: '#a5b4fc',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
      secondary: 'linear-gradient(135deg, #818cf8 0%, #a5b4fc 100%)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    },
    effects: {
      glass: 'rgba(255, 255, 255, 0.7)',
      clay: 'rgba(99, 102, 241, 0.08)',
      shadow: '0 4px 6px -1px rgba(99, 102, 241, 0.1), 0 2px 4px -1px rgba(99, 102, 241, 0.06)',
    },
  },
  {
    id: 'meauxos-platform',
    name: 'MeauxOS Platform',
    slug: 'meauxos-platform',
    colors: {
      primary: '#4AECDC',
      secondary: '#8B5CF6',
      accent: '#F59E0B',
      background: '#0a0e27',
      surface: '#1a1f3a',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.1)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #4AECDC 0%, #8B5CF6 100%)',
      secondary: 'linear-gradient(135deg, #8B5CF6 0%, #F59E0B 100%)',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    },
    effects: {
      glass: 'rgba(255, 255, 255, 0.05)',
      clay: 'rgba(74, 236, 220, 0.1)',
      shadow: '0 20px 60px rgba(74, 236, 220, 0.15)',
    },
  },
  {
    id: 'inner-animal',
    name: 'Inner Animal Media',
    slug: 'inner-animal',
    colors: {
      primary: '#F59E0B',
      secondary: '#10B981',
      accent: '#EC4899',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.1)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #F59E0B 0%, #10B981 100%)',
      secondary: 'linear-gradient(135deg, #10B981 0%, #EC4899 100%)',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    },
    effects: {
      glass: 'rgba(255, 255, 255, 0.05)',
      clay: 'rgba(245, 158, 11, 0.1)',
      shadow: '0 20px 60px rgba(245, 158, 11, 0.15)',
    },
  },
];

export async function fetchThemesFromD1(apiBase: string): Promise<Theme[]> {
  try {
    const res = await fetch(`${apiBase}/api/themes`);
    if (!res.ok) throw new Error('Failed to fetch themes');
    const themes = await res.json();
    return themes.length > 0 ? themes : defaultThemes;
  } catch (error) {
    console.error('Error fetching themes:', error);
    return defaultThemes;
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--gradient-primary', theme.gradients.primary);
  root.style.setProperty('--gradient-secondary', theme.gradients.secondary);
  root.style.setProperty('--gradient-background', theme.gradients.background);
  root.style.setProperty('--effect-glass', theme.effects.glass);
  root.style.setProperty('--effect-clay', theme.effects.clay);
  root.style.setProperty('--effect-shadow', theme.effects.shadow);

  // Store in localStorage
  localStorage.setItem('meauxos-theme', JSON.stringify(theme));
}

export function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem('meauxos-theme');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
