// D1 Database MCP Connection
// Connects to MeauxOS D1 database for queries and operations

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export interface D1QueryResult {
  success: boolean;
  results?: any[];
  meta?: {
    changes: number;
    last_row_id: number;
    duration: number;
  };
  error?: string;
}

export async function executeD1Query(query: string, params?: any[]): Promise<D1QueryResult> {
  try {
    const res = await fetch(`${API_BASE}/api/d1/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, params: params || [] }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: error.message || 'Query failed' };
    }

    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message || 'Network error' };
  }
}

export async function listD1Tables(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/api/d1/tables`);
    if (!res.ok) throw new Error('Failed to list tables');
    return res.json();
  } catch (error) {
    console.error('Error listing D1 tables:', error);
    return [];
  }
}

export async function getD1TableSchema(tableName: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/api/d1/schema/${tableName}`);
    if (!res.ok) throw new Error('Failed to get schema');
    return res.json();
  } catch (error) {
    console.error('Error getting D1 schema:', error);
    return null;
  }
}

export async function getD1DatabaseInfo(): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/api/d1/info`);
    if (!res.ok) throw new Error('Failed to get database info');
    return res.json();
  } catch (error) {
    console.error('Error getting D1 info:', error);
    return null;
  }
}
