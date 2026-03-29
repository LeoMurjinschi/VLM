// src/components/chat/ChatSidebar.tsx
import React, { useState } from 'react';
import { ChatBubbleLeftEllipsisIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { Contact } from './types';
import ContactItem from './ContactItem';

interface ChatSidebarProps {
  contacts: Contact[];
  activeChatId: number | null;
  onSelectContact: (id: number) => void;
  isMobileVisible: boolean;
  theme: 'light' | 'dark';
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ contacts, activeChatId, onSelectContact, isMobileVisible, theme }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Logica de filtrare: caută ignorând literele mari/mici, în nume sau în rol
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-full md:w-80 lg:w-96 flex-col border-r ${
      theme === 'light' ? 'border-gray-200 bg-gray-50/50' : 'border-gray-700 bg-gray-900/20'
    } ${!isMobileVisible ? 'hidden md:flex' : 'flex h-full'}`}>
      
      <div className={`p-4 sm:p-5 border-b flex items-center gap-3 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
        <ChatBubbleLeftEllipsisIcon className={`w-7 h-7 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
        <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Messages</h2>
      </div>

      {/* Căutare Funcțională */}
      <div className="p-4 border-b border-transparent">
        <div className={`flex items-center px-4 py-2.5 rounded-xl border transition-colors ${
          theme === 'light' ? 'bg-white border-gray-200 focus-within:border-blue-400' : 'bg-gray-800 border-gray-700 focus-within:border-blue-500'
        }`}>
          <MagnifyingGlassIcon className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name or role..." 
            className={`w-full bg-transparent text-sm outline-none ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactItem 
              key={contact.id}
              contact={contact}
              isActive={activeChatId === contact.id}
              onClick={() => onSelectContact(contact.id)}
              theme={theme}
            />
          ))
        ) : (
          <div className="p-6 text-center">
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              No conversations found for "{searchQuery}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;