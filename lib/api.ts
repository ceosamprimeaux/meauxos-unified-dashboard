// API Client for MeauxCloudServices Cloud Run Backend
// Connects to: https://meauxcloudservices-xxx.run.app

// Get API URL from environment or use Cloud Run URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export async function fetchOrganizations() {
  const res = await fetch(`${API_BASE}/api/organizations`);
  if (!res.ok) throw new Error('Failed to fetch organizations');
  return res.json();
}

export async function fetchTeams() {
  const res = await fetch(`${API_BASE}/api/teams`);
  if (!res.ok) throw new Error('Failed to fetch teams');
  return res.json();
}

export async function fetchKanbanTasks() {
  const res = await fetch(`${API_BASE}/api/kanban/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(task: any) {
  const res = await fetch(`${API_BASE}/api/kanban/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function fetchDashboardStats() {
  const res = await fetch(`${API_BASE}/api/dashboard/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(project: any) {
  const res = await fetch(`${API_BASE}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}
