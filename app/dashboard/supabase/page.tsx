'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Database, Play, FileText, Table } from 'lucide-react';
import { executeSupabaseQuery, listSupabaseTables, getSupabaseTableSchema, type SupabaseQueryResult } from '@/lib/supabase';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export default function SupabaseSQLPage() {
  const [query, setQuery] = useState('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' LIMIT 10;');
  const [results, setResults] = useState<SupabaseQueryResult | null>(null);
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleExecute = async () => {
    setLoading(true);
    try {
      const result = await executeSupabaseQuery(query);
      setResults(result);
    } catch (error) {
      setResults({ data: null, error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const loadTables = async () => {
    const tableList = await listSupabaseTables();
    setTables(tableList);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Supabase SQL Editor</h2>
          </div>
          <button
            onClick={loadTables}
            className="glass-card px-4 py-2 flex items-center gap-2 hover:border-purple-500/50 transition-all"
          >
            <Table className="w-4 h-4" />
            <span>Load Tables</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5" />
                <h3 className="text-lg font-semibold">PostgreSQL Query Editor</h3>
              </div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-field font-mono text-sm h-48 resize-none"
                placeholder="Enter PostgreSQL query..."
              />
              <button
                onClick={handleExecute}
                disabled={loading}
                className="btn-primary mt-4 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>{loading ? 'Executing...' : 'Execute Query'}</span>
              </button>
            </div>

            {results && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Results</h3>
                {results.error ? (
                  <div className="text-red-400">Error: {results.error}</div>
                ) : results.data && results.data.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          {Object.keys(results.data[0]).map((key) => (
                            <th key={key} className="text-left p-2 font-semibold">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.data.map((row, i) => (
                          <tr key={i} className="border-b border-white/5">
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="p-2 text-white/80">
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-white/60">No results</div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Database Tables</h3>
              {tables.length > 0 ? (
                <div className="space-y-2">
                  {tables.map((table) => (
                    <button
                      key={table}
                      onClick={() => setSelectedTable(table)}
                      className={`w-full text-left px-3 py-2 rounded hover:bg-white/5 transition-all ${selectedTable === table ? 'bg-purple-500/20 border border-purple-500/50' : ''
                        }`}
                    >
                      {table}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-white/60 text-sm">Click "Load Tables" to see available tables</div>
              )}
            </div>

            {selectedTable && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Table: {selectedTable}</h3>
                <button
                  onClick={() => setQuery(`SELECT * FROM ${selectedTable} LIMIT 10;`)}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Load sample data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
