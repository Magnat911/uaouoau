'use client';

import { useState, useRef } from 'react';
import { Room, RoomEvent } from 'livekit-client';

export default function Home() {
  const [status, setStatus] = useState('Готов начать');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const roomRef = useRef<Room | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStartCall = async () => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    setStatus('Получение токена...');

    try {
      const tokenResponse = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identity: `user-${Date.now()}`,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get token');
      }

      const { token, url } = await tokenResponse.json();

      if (!token || !url) {
        throw new Error('Invalid token response');
      }

      setStatus('Подключение к агенту...');

      const room = new Room();
      roomRef.current = room;

      if (!audioRef.current) {
        const audio = document.createElement('audio');
        audio.autoplay = true;
        audio.style.display = 'none';
        document.body.appendChild(audio);
        audioRef.current = audio;
      }

      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === 'audio' && audioRef.current) {
          const mediaStream = new MediaStream([track.mediaStreamTrack]);
          audioRef.current.srcObject = mediaStream;
        }
      });

      room.on(RoomEvent.ParticipantConnected, (participant) => {
        console.log('Agent connected:', participant.name);
        setStatus('Агент подключился - слушаю...');
      });

      room.on(RoomEvent.Disconnected, () => {
        setIsConnected(false);
        setStatus('Отключено');
      });

      await room.connect(url, token);
      await room.localParticipant.setMicrophoneEnabled(true);

      if (!room.canPlaybackAudio) {
        await room.startAudio();
      }

      setIsConnected(true);
      setIsConnecting(false);
      setStatus('Подключено - ожидание агента...');
    } catch (error) {
      console.error('Connection error:', error);
      setStatus(`Ошибка: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsConnecting(false);

      if (roomRef.current) {
        await roomRef.current.disconnect();
        roomRef.current = null;
      }
    }
  };

  const handleEndCall = async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
    }

    if (audioRef.current && audioRef.current.parentElement) {
      audioRef.current.parentElement.removeChild(audioRef.current);
      audioRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setStatus('Готов начать');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '28rem', width: '100%' }}>
        <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            style={{ width: '3rem', height: '3rem', color: 'white' }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z" />
            <path d="M4 11a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1z" />
            <path d="M15 11a1 1 0 011-1h.01a1 1 0 110 2H16a1 1 0 01-1-1z" />
            <path d="M8 13a1 1 0 011 1v2.5a1 1 0 11-2 0V14a1 1 0 011-1z" />
            <path d="M11 13a1 1 0 011 1v2.5a1 1 0 11-2 0V14a1 1 0 011-1z" />
          </svg>
        </div>

        <button
          onClick={isConnected ? handleEndCall : handleStartCall}
          disabled={isConnecting}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.125rem',
            height: '4rem',
            fontWeight: 'bold',
            backgroundColor: isConnecting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: isConnecting ? 'not-allowed' : 'pointer',
          }}
        >
          {isConnecting
            ? 'Подключение...'
            : isConnected
              ? 'Завершить разговор'
              : 'Вызвать AI Receptionist'}
        </button>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>{status}</p>
        </div>
      </div>
    </main>
  );
}
