'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const orgs = [
  { 
    id: 'org_meauxos', 
    name: 'MeauxOS Platform', 
    plan: 'Enterprise', 
    gradient: 'linear-gradient(135deg, #4AECDC 0%, #8B5CF6 100%)' 
  },
  { 
    id: 'org_inneranimal', 
    name: 'Inner Animal Media', 
    plan: 'Enterprise', 
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #10B981 100%)' 
  },
  { 
    id: 'org_meauxbility', 
    name: 'Meauxbility Foundation', 
    plan: 'Enterprise', 
    gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)' 
  },
  { 
    id: 'org_southernpets', 
    name: 'Southern Pets', 
    plan: 'Pro', 
    gradient: 'linear-gradient(135deg, #4AECDC 0%, #8B5CF6 100%)' 
  },
];

export default function OrgSwitcher() {
  const [selectedOrg, setSelectedOrg] = useState(orgs[0]);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card px-4 py-2 flex items-center gap-2 hover:border-purple-500/50 transition-all"
      >
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ background: selectedOrg.gradient }}
        />
        <span className="font-medium">{selectedOrg.name}</span>
        <span className="text-xs text-white/50">{selectedOrg.plan}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 w-64 glass-card p-2 z-50">
          {orgs.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                setSelectedOrg(org);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-all"
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ background: org.gradient }}
              />
              <div className="flex-1 text-left">
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-white/50">{org.plan}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
