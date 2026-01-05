// Cloudflare Streaming and SFU Integration

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export interface Stream {
  id: string;
  name: string;
  status: 'live' | 'paused' | 'ended';
  url?: string;
  thumbnail?: string;
  createdAt: string;
  viewers?: number;
}

export interface SFURoom {
  id: string;
  name: string;
  participants: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export async function createStream(name: string): Promise<Stream | null> {
  try {
    const res = await fetch(`${API_BASE}/api/streaming/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) throw new Error('Failed to create stream');
    return res.json();
  } catch (error) {
    console.error('Error creating stream:', error);
    return null;
  }
}

export async function getStreams(): Promise<Stream[]> {
  try {
    const res = await fetch(`${API_BASE}/api/streaming/streams`);
    if (!res.ok) throw new Error('Failed to fetch streams');
    return res.json();
  } catch (error) {
    console.error('Error fetching streams:', error);
    return [];
  }
}

export async function createSFURoom(name: string, participants: string[]): Promise<SFURoom | null> {
  try {
    const res = await fetch(`${API_BASE}/api/streaming/sfu/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, participants }),
    });

    if (!res.ok) throw new Error('Failed to create SFU room');
    return res.json();
  } catch (error) {
    console.error('Error creating SFU room:', error);
    return null;
  }
}

export async function getSFURooms(): Promise<SFURoom[]> {
  try {
    const res = await fetch(`${API_BASE}/api/streaming/sfu/rooms`);
    if (!res.ok) throw new Error('Failed to fetch SFU rooms');
    return res.json();
  } catch (error) {
    console.error('Error fetching SFU rooms:', error);
    return [];
  }
}

export function getStreamingToken(streamId: string): string | null {
  // This would typically come from the backend after authentication
  // For now, return null - backend will handle token generation
  return null;
}
