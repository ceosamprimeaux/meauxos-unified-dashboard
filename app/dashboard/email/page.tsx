'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Mail, Send, FileText, Plus } from 'lucide-react';
import { sendEmail, getEmailTemplates, sendTemplateEmail, type EmailOptions, type EmailResponse } from '@/lib/resend';

export default function EmailPage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<EmailResponse | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);

  const handleSend = async () => {
    if (!to || !subject) return;

    setSending(true);
    try {
      const response = await sendEmail({
        to,
        subject,
        html: html || undefined,
      });
      setResult(response);
    } catch (error) {
      setResult({ id: '', success: false, error: String(error) });
    } finally {
      setSending(false);
    }
  };

  const loadTemplates = async () => {
    const templateList = await getEmailTemplates();
    setTemplates(templateList);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Email Management</h2>
          </div>
          <button
            onClick={loadTemplates}
            className="glass-card px-4 py-2 flex items-center gap-2 hover:border-purple-500/50 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Load Templates</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Compose Email</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <input
                    type="email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="input-field"
                    placeholder="recipient@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-field"
                    placeholder="Email subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message (HTML)</label>
                  <textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    className="input-field font-mono text-sm h-48 resize-none"
                    placeholder="<html>...</html>"
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="btn-primary flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{sending ? 'Sending...' : 'Send Email'}</span>
                </button>
              </div>
            </div>

            {result && (
              <div className={`glass-card p-6 ${result.success ? 'border-green-500/50' : 'border-red-500/50'}`}>
                {result.success ? (
                  <div>
                    <div className="text-green-400 font-semibold mb-2">Email sent successfully!</div>
                    <div className="text-sm text-white/60">Email ID: {result.id}</div>
                  </div>
                ) : (
                  <div className="text-red-400">Error: {result.error}</div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Templates</h3>
              {templates.length > 0 ? (
                <div className="space-y-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      className="w-full text-left px-3 py-2 rounded hover:bg-white/5 transition-all"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-white/60 text-sm">No templates available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
