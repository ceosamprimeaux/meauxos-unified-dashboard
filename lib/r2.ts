// R2 Storage Integration
// Connects to gcloud R2 bucket for remote storage and serving

const R2_BUCKET = 'gcloud';
const R2_ACCOUNT_ID = 'ede6590ac0d2fb7daf155b35653457b2';
const R2_PUBLIC_URL = 'https://pub-2a171cf5917c4c7d8dead29f57b462c2.r2.dev';
const R2_S3_API = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET}`;

export interface R2File {
  key: string;
  size: number;
  etag: string;
  uploaded: string;
  httpMetadata?: {
    contentType?: string;
  };
}

export async function listR2Files(prefix?: string): Promise<R2File[]> {
  try {
    const res = await fetch(`/api/r2/list${prefix ? `?prefix=${prefix}` : ''}`);
    if (!res.ok) throw new Error('Failed to list R2 files');
    return res.json();
  } catch (error) {
    console.error('Error listing R2 files:', error);
    return [];
  }
}

export async function uploadToR2(file: File, key: string): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', key);

    const res = await fetch('/api/r2/upload', {
      method: 'POST',
      body: formData,
    });

    return res.ok;
  } catch (error) {
    console.error('Error uploading to R2:', error);
    return false;
  }
}

export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/r2/delete?key=${encodeURIComponent(key)}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (error) {
    console.error('Error deleting from R2:', error);
    return false;
  }
}

export function getR2PublicUrl(key: string): string {
  return `${R2_PUBLIC_URL}/${key}`;
}

export function getR2S3Url(key: string): string {
  return `${R2_S3_API}/${key}`;
}
