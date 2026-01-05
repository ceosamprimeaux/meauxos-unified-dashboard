'use client';

import { useState, useEffect, useRef } from 'react';
import AppShell from '@/components/AppShell';
import { MessageSquare, Send, Users, Plus } from 'lucide-react';
import { getChatRooms, createChatRoom, getChatMessages, sendChatMessage, connectChatWebSocket, type ChatRoom, type ChatMessage } from '@/lib/chat';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ||
  'https://meauxcloudservices-365932368784.europe-west1.run.app';

export default function ChatPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom);
      const socket = connectChatWebSocket(selectedRoom, (message) => {
        setMessages(prev => [...prev, message]);
      });
      setWs(socket);
      return () => {
        socket?.close();
      };
    }
  }, [selectedRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadRooms = async () => {
    const roomList = await getChatRooms();
    setRooms(roomList);
    if (roomList.length > 0 && !selectedRoom) {
      setSelectedRoom(roomList[0].id);
    }
  };

  const loadMessages = async (roomId: string) => {
    const messageList = await getChatMessages(roomId);
    setMessages(messageList.reverse());
  };

  const handleSend = async () => {
    if (!selectedRoom || !newMessage.trim()) return;

    const message = await sendChatMessage(selectedRoom, newMessage);
    if (message) {
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <AppShell>
      <div className="flex h-full gap-6">
        <div className="w-64 glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              Rooms
            </h3>
            <button className="p-1 rounded hover:bg-white/5">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`w-full text-left px-3 py-2 rounded transition-all ${selectedRoom === room.id
                    ? 'bg-purple-500/20 border border-purple-500/50'
                    : 'hover:bg-white/5'
                  }`}
              >
                <div className="font-medium">{room.name}</div>
                <div className="text-xs text-white/50">{room.type}</div>
                {room.unreadCount && room.unreadCount > 0 && (
                  <div className="text-xs bg-purple-500/20 px-2 py-0.5 rounded mt-1 inline-block">
                    {room.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col glass-card p-6">
          {selectedRoom ? (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      {msg.userName[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{msg.userName}</span>
                        <span className="text-xs text-white/50">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-white/80">{msg.content}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="input-field flex-1"
                />
                <button onClick={handleSend} className="btn-primary flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-white/60">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a room to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
