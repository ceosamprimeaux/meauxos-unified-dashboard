'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDraggable } from '@dnd-kit/core';
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

export default function DraggableSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width, setWidth] = useState(256);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: 'sidebar',
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <aside
      ref={setNodeRef}
      style={style}
      className={`glass-card m-4 p-4 transition-all duration-300 ${isCollapsed ? 'w-16' : ''}`}
      style={{ width: isCollapsed ? 64 : width }}
    >
      <div className="flex items-center justify-between mb-4">
        {!isCollapsed && (
          <h2 className="text-lg font-bold bg-gradient-meauxos bg-clip-text text-transparent">
            MeauxOS
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-white/5"
          {...listeners}
          {...attributes}
        >
          <div className="w-4 h-4 border-t-2 border-r-2 border-white/30 transform rotate-45" />
        </button>
      </div>

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
                } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs bg-purple-500/20 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="text-xs text-white/50 px-4">
            Resize by dragging
          </div>
        </div>
      )}
    </aside>
  );
}
