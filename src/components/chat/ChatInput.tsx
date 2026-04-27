// src/components/chat/ChatInput.tsx
import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  theme: 'light' | 'dark';
  isAdmin?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, theme, isAdmin = false }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className={`p-4 border-t ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
      <form onSubmit={handleSubmit} className={`flex items-end gap-2 p-1.5 rounded-2xl border transition-all duration-200 ${
        theme === 'light' 
          ? `bg-gray-50 border-gray-200 focus-within:border-${isAdmin ? '[#8b5cf6]' : 'green-400'}` 
          : `bg-[#222222] border-gray-800 focus-within:border-${isAdmin ? '[#8b5cf6]' : '[#16a34a]'}`
      }`}>
        <textarea 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => { 
            if (e.key === 'Enter' && !e.shiftKey) { 
              e.preventDefault(); 
              handleSubmit(e); 
            } 
          }}
          placeholder="Type a message..." 
          className="flex-1 bg-transparent px-3 py-2.5 max-h-32 outline-none text-sm resize-none text-gray-900 dark:text-white scrollbar-hide"
          rows={1}
        />
        <button 
          type="submit"
          disabled={!newMessage.trim()}
          className={`shrink-0 p-3 rounded-xl transition-colors ${
            newMessage.trim() 
              ? (isAdmin ? 'bg-[#8b5cf6] hover:bg-violet-600 shadow-md text-white' : 'bg-[#16a34a] hover:bg-green-700 shadow-md text-white')
              : (theme === 'light' ? 'bg-gray-200 text-gray-400' : 'bg-[#222222] text-gray-500')
          }`}
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;