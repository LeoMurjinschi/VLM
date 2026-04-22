// src/components/chat/ContactItem.tsx
import React from 'react';
import type { Contact } from './types';
import { SpeakerXMarkIcon } from '@heroicons/react/24/outline';

interface ContactItemProps {
  contact: Contact;
  isActive: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
  isMuted?: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isActive, onClick, theme, isMuted }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b ${
        theme === 'light' ? 'border-gray-100' : 'border-gray-800'
      } ${
        isActive 
          ? (theme === 'light' ? 'bg-[#16a34a]/5' : 'bg-[#16a34a]/10') 
          : (theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-[#222222]')
      }`}
    >
      {/* Avatar (Fără status online) */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
        theme === 'light' ? 'bg-[#16a34a]/10 text-green-700' : 'bg-[#16a34a]/20 text-green-400'
      }`}>
        {contact.initials}
      </div>
      
      {/* Detalii Contact */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <h3 className={`font-bold text-sm truncate flex items-center gap-1 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
            {contact.name}
            {isMuted && <SpeakerXMarkIcon className="w-3 h-3 text-gray-400" title="Notifications muted" />}
          </h3>
          <span className={`text-[10px] font-bold whitespace-nowrap ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
            {contact.time}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className={`text-xs truncate mr-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            {contact.lastMessage}
          </p>
          {contact.unread > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#16a34a] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;