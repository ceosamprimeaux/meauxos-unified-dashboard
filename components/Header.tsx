'use client';

import OrgSwitcher from './OrgSwitcher';
import { Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass-card m-4 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-meauxos bg-clip-text text-transparent">
          MeauxOS
        </h1>
        <OrgSwitcher />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="search"
            placeholder="Search..."
            className="input-field w-64 pl-10"
          />
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-meauxos flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
}
