'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Cloud,
  Users,
  Bot,
  Workflow,
  Palette,
  Settings,
  Database,
  Code,
  MessageSquare,
  Mail,
  Video,
  FileText,
  Terminal,
  Zap
} from 'lucide-react';

interface NavItem {
  Icon: any;
  label: string;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { Icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { Icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
  { Icon: Cloud, label: 'Cloudflare', href: '/dashboard/cloudflare' },
  { Icon: Users, label: 'Teams', href: '/dashboard/teams' },
  { Icon: Bot, label: 'AI & Knowledge', href: '/dashboard/ai' },
  { Icon: Workflow, label: 'Workflows', href: '/dashboard/workflows' },
  { Icon: Database, label: 'D1 Database', href: '/dashboard/d1' },
  { Icon: Code, label: 'Supabase SQL', href: '/dashboard/supabase' },
  { Icon: MessageSquare, label: 'Chat', href: '/dashboard/chat' },
  { Icon: Mail, label: 'Email', href: '/dashboard/email' },
  { Icon: Video, label: 'Streaming', href: '/dashboard/streaming' },
  { Icon: FileText, label: 'Documents', href: '/dashboard/documents' },
  { Icon: Terminal, label: 'IDE', href: '/dashboard/ide' },
  { Icon: Zap, label: 'MCP Tools', href: '/dashboard/mcp' },
  { Icon: Palette, label: 'Themes', href: '/dashboard/themes' },
  { Icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-card m-4 p-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.Icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${pathname === item.href
                  ? 'bg-purple-500/20 border border-purple-500/50'
                  : 'hover:bg-white/5'
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs bg-purple-500/20 px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
