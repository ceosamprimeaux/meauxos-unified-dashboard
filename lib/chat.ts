// Multichat System - Group chats, private conversations
// Uses Cloudflare Durable Objects for real-time chat

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  avatar?: string;
  content: string;
  timestamp: string;
  type?: 'text' | 'file' | 'system';
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'group' | 'private' | 'channel';
  members: string[];
  createdBy: string;
  createdAt: string;
  lastMessage?: ChatMessage;
  unreadCount?: number;
}

export async function getChatRooms(): Promise<ChatRoom[]> {
  try {
    const res = await fetch(`${API_BASE}/api/chat/rooms`);
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return res.json();
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    return [];
  }
}

export async function createChatRoom(
  name: string,
  type: 'group' | 'private' | 'channel',
  members: string[]
): Promise<ChatRoom | null> {
  try {
    const res = await fetch(`${API_BASE}/api/chat/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, members }),
    });

    if (!res.ok) throw new Error('Failed to create room');
    return res.json();
  } catch (error) {
    console.error('Error creating chat room:', error);
    return null;
  }
}

export async function getChatMessages(roomId: string, limit = 50): Promise<ChatMessage[]> {
  try {
    const res = await fetch(`${API_BASE}/api/chat/rooms/${roomId}/messages?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function sendChatMessage(
  roomId: string,
  content: string,
  type: 'text' | 'file' = 'text'
): Promise<ChatMessage | null> {
  try {
    const res = await fetch(`${API_BASE}/api/chat/rooms/${roomId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, type }),
    });

    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
}

// WebSocket connection for real-time chat
export function connectChatWebSocket(roomId: string, onMessage: (message: ChatMessage) => void): WebSocket | null {
  try {
    const wsUrl = API_BASE.replace('https://', 'wss://').replace('http://', 'ws://');
    const ws = new WebSocket(`${wsUrl}/api/chat/ws?room=${roomId}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return ws;
  } catch (error) {
    console.error('Error connecting WebSocket:', error);
    return null;
  }
}
