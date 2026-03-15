import { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { UserAvatar } from './UserAvatar';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

interface ChatProps {
  room: any;
  isOpen: boolean;
  onClose: () => void;
  onNewMessage: () => void;
}

export function Chat({ room, isOpen, onClose, onNewMessage }: ChatProps) {
  const { socket } = useSocket();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(room.messages?.length || 0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, room.messages]);

  useEffect(() => {
    if (room.messages?.length > prevMessagesLength.current && !isOpen) {
      onNewMessage();
    }
    prevMessagesLength.current = room.messages?.length || 0;
  }, [room.messages, isOpen, onNewMessage]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !socket || !room) return;

    socket.emit('sendMessage', { roomId: room.id, text: inputText.trim() });
    setInputText('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="chat-container"
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '32px',
        width: '350px',
        height: '500px',
        background: 'white',
        border: 'var(--line-thickness) solid var(--border-color)',
        boxShadow: '8px 8px 0px var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1100,
        overflow: 'hidden',
        animation: 'chat-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Header */}
      <div style={{ 
        padding: '16px 20px', 
        background: 'var(--text-main)', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 'var(--line-thickness) solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MessageCircle size={18} />
          <span style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Room Chat</span>
        </div>
        <button 
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#F8F8F8' }}>
        {room.messages?.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.4, gap: '12px', textAlign: 'center' }}>
            <MessageCircle size={48} />
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>No messages yet.<br/>Say hello!</p>
          </div>
        ) : (
          room.messages?.map((msg: Message) => {
            const isMe = msg.senderId === socket?.id;
            return (
              <div 
                key={msg.id} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                  <div style={{ transform: 'scale(0.8)', transformOrigin: isMe ? 'right center' : 'left center', margin: isMe ? '0 0 0 -4px' : '0 -4px 0 0' }}>
                    <UserAvatar name={msg.senderName} size={24} />
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {isMe ? 'You' : msg.senderName}
                  </span>
                </div>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '2px',
                  background: 'white',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  border: '1px solid var(--border-color)',
                  wordBreak: 'break-word',
                  boxShadow: '3px 3px 0px var(--border-color)',
                  position: 'relative'
                }}>
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form 
        onSubmit={handleSend}
        style={{ 
          padding: '16px', 
          background: 'white', 
          borderTop: 'var(--line-thickness) solid var(--border-color)',
          display: 'flex',
          gap: '10px'
        }}
      >
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '10px 14px',
            border: '1px solid var(--border-color)',
            fontSize: '0.9rem',
            fontFamily: "'Jost', sans-serif",
            outline: 'none'
          }}
        />
        <button 
          type="submit"
          disabled={!inputText.trim()}
          style={{
            background: 'var(--text-main)',
            color: 'white',
            border: 'none',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: inputText.trim() ? 'pointer' : 'default',
            opacity: inputText.trim() ? 1 : 0.5
          }}
        >
          <Send size={18} />
        </button>
      </form>

      <style>{`
        @keyframes chat-slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .chat-container ::-webkit-scrollbar {
          width: 6px;
        }
        .chat-container ::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-container ::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
