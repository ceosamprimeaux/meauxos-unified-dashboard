'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { FileText, Upload, Search } from 'lucide-react';
import { listR2Files, uploadToR2, deleteFromR2, getR2PublicUrl, type R2File } from '@/lib/r2';

export default function DocumentsPage() {
  const [files, setFiles] = useState<R2File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const fileList = await listR2Files('documents/');
      setFiles(fileList);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Documents</h2>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-white/60">Loading documents from R2...</div>
        ) : files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div key={file.key} className="glass-card-hover p-4">
                <FileText className="w-8 h-8 mb-2" />
                <div className="font-medium truncate">{file.key.split('/').pop()}</div>
                <div className="text-sm text-white/60">
                  {(file.size / 1024).toFixed(2)} KB
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-white/60">No documents yet. Upload files to R2 storage.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
