'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { Video, Radio, Users } from 'lucide-react';
import { getStreams, createStream, getSFURooms, createSFURoom, type Stream, type SFURoom } from '@/lib/streaming';

export default function StreamingPage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [sfuRooms, setSFURooms] = useState<SFURoom[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStreams();
    loadSFURooms();
  }, []);

  const loadStreams = async () => {
    const streamList = await getStreams();
    setStreams(streamList);
  };

  const loadSFURooms = async () => {
    const roomList = await getSFURooms();
    setSFURooms(roomList);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Cloudflare Streaming & SFU</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Streams
              </h3>
              <button className="btn-primary text-sm">Create Stream</button>
            </div>
            {streams.length > 0 ? (
              <div className="space-y-3">
                {streams.map((stream) => (
                  <div key={stream.id} className="p-4 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{stream.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${stream.status === 'live' ? 'bg-green-500/20 text-green-400' :
                          stream.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                        }`}>
                        {stream.status}
                      </span>
                    </div>
                    {stream.viewers && (
                      <div className="text-sm text-white/60">{stream.viewers} viewers</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white/60 text-center py-8">No streams yet</div>
            )}
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Radio className="w-5 h-5" />
                SFU Rooms
              </h3>
              <button className="btn-primary text-sm">Create Room</button>
            </div>
            {sfuRooms.length > 0 ? (
              <div className="space-y-3">
                {sfuRooms.map((room) => (
                  <div key={room.id} className="p-4 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{room.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${room.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                        {room.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Users className="w-4 h-4" />
                      <span>{room.participants.length} participants</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white/60 text-center py-8">No SFU rooms yet</div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
