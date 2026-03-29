// src/components/chat/ChatInput.tsx
import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  theme: 'light' | 'dark';
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, theme }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className={`p-4 border-t ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
      <form onSubmit={handleSubmit} className={`flex items-end gap-2 p-1.5 rounded-2xl border ${theme === 'light' ? 'bg-gray-50 border-gray-200 focus-within:border-blue-400' : 'bg-gray-900/50 border-gray-700 focus-within:border-blue-500'}`}>
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
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
              : (theme === 'light' ? 'bg-gray-200 text-gray-400' : 'bg-gray-700 text-gray-500')
          }`}
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;