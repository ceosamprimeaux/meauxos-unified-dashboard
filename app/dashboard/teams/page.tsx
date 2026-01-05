'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { Users, UserPlus, Mail } from 'lucide-react';
import { fetchTeams } from '@/lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const teamList = await fetchTeams();
      setTeams(teamList);
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Teams</h2>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Add Team</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-white/60">Loading teams...</div>
        ) : teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div key={team.id} className="glass-card-hover p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: team.color || '#6366f1' }}
                  >
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                    <div className="text-sm text-white/60">{team.members?.length || 0} members</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-white/60">No teams yet. Create your first team to get started.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
