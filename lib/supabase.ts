// Supabase SQL Editor and Query Interface

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export interface SupabaseQueryResult {
  data: any[] | null;
  error: any | null;
  count?: number;
}

export async function executeSupabaseQuery(query: string, params?: any[]): Promise<SupabaseQueryResult> {
  try {
    const res = await fetch(`${API_BASE}/api/supabase/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, params: params || [] }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { data: null, error: error.message || 'Query failed' };
    }

    return await res.json();
  } catch (error: any) {
    return { data: null, error: error.message || 'Network error' };
  }
}

export async function listSupabaseTables(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/api/supabase/tables`);
    if (!res.ok) throw new Error('Failed to list tables');
    return res.json();
  } catch (error) {
    console.error('Error listing Supabase tables:', error);
    return [];
  }
}

export async function getSupabaseTableSchema(tableName: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/api/supabase/schema/${tableName}`);
    if (!res.ok) throw new Error('Failed to get schema');
    return res.json();
  } catch (error) {
    console.error('Error getting Supabase schema:', error);
    return null;
  }
}
