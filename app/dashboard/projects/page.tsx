'use client';

import AppShell from '@/components/AppShell';

const tasks = [
  { id: 1, title: 'iAutodidact App', priority: 'high', client: 'iautodidact.app' },
  { id: 2, title: 'Meauxbility.org', priority: 'urgent', client: 'meauxbility.org' },
  { id: 3, title: 'Inner Animal Media', priority: 'high', client: 'inneranimalmedia.com' },
];

export default function ProjectsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Client Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['To Do', 'In Progress', 'Review', 'Done'].map((column) => (
            <div key={column} className="glass-card p-4">
              <h3 className="font-bold mb-4">{column}</h3>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="glass-card-hover p-4">
                    <div className="font-medium mb-2">{task.title}</div>
                    <div className="text-sm text-white/60 mb-2">{task.client}</div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
