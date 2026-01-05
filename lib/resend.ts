// Resend Email Integration

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: string;
    contentType?: string;
  }>;
}

export interface EmailResponse {
  id: string;
  success: boolean;
  error?: string;
}

export async function sendEmail(options: EmailOptions): Promise<EmailResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });

    if (!res.ok) {
      const error = await res.json();
      return { id: '', success: false, error: error.message || 'Failed to send email' };
    }

    return await res.json();
  } catch (error: any) {
    return { id: '', success: false, error: error.message || 'Network error' };
  }
}

export async function getEmailTemplates(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/api/email/templates`);
    if (!res.ok) throw new Error('Failed to fetch templates');
    return res.json();
  } catch (error) {
    console.error('Error fetching email templates:', error);
    return [];
  }
}

export async function sendTemplateEmail(
  templateId: string,
  to: string | string[],
  variables?: Record<string, any>
): Promise<EmailResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/email/template/${templateId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, variables }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { id: '', success: false, error: error.message || 'Failed to send template email' };
    }

    return await res.json();
  } catch (error: any) {
    return { id: '', success: false, error: error.message || 'Network error' };
  }
}
