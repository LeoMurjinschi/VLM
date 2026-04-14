// src/pages/Messages.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import PageLayout from '../components/PageLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatSidebar from '../components/chat/ChatSideBar';
import ChatInput from '../components/chat/ChatInput';
import type { Contact, ChatMessage } from '../components/chat/types';
import { ArrowLeftIcon, EllipsisVerticalIcon, ChatBubbleLeftEllipsisIcon, TrashIcon, NoSymbolIcon, SpeakerWaveIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

// Am șters "online" din aceste date
const CONTACTS: Contact[] = [
  { id: 1, name: 'Mishanea SRL', role: 'Donor', initials: 'RC', lastMessage: 'We have 5 more boxes ready.', time: '10:15 AM', unread: 2 },
  { id: 2, name: 'Andrei M.', role: 'Volunteer (Van)', initials: 'AM', lastMessage: 'I will be there in 10 mins.', time: '09:30 AM', unread: 0 },
  { id: 3, name: 'Panaderia Central', role: 'Donor', initials: 'PC', lastMessage: 'See you tomorrow!', time: 'Yesterday', unread: 0 },
  { id: 4, name: 'FoodShare Support', role: 'System', initials: 'FS', lastMessage: 'Your ticket has been resolved.', time: 'Oct 24', unread: 0 },
];

const INITIAL_MESSAGES: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, senderId: 1, text: 'Zdarova, ai vre-o 5 litri de piva?', time: '10:00 AM' },
    { id: 2, senderId: 'me', text: 'Cum bai voi beti fara mine?', time: '10:05 AM' },
    { id: 3, senderId: 1, text: 'Pai hai vina si tuu', time: '10:06 AM' },
    { id: 4, senderId: 1, text: 'In caminul 2, ma suni cand ajungi', time: '10:15 AM' },
  ],
  2: [
    { id: 1, senderId: 2, text: 'Hey, I picked up the bakery items.', time: '09:20 AM' },
    { id: 2, senderId: 'me', text: 'Awesome, head straight to the shelter please.', time: '09:25 AM' },
    { id: 3, senderId: 2, text: 'I will be there in 10 mins.', time: '09:30 AM' },
  ]
};

const Messages: React.FC = () => {
  const { theme } = useTheme();
  const [activeChatId, setActiveChatId] = useState<number | null>(1);
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const [messages, setMessages] = useState<Record<number, ChatMessage[]>>(INITIAL_MESSAGES);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeContact = CONTACTS.find(c => c.id === activeChatId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mutedContacts, setMutedContacts] = useState<number[]>([]);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isMuted = activeChatId ? mutedContacts.includes(activeChatId) : false;

  const toggleMute = () => {
    if (!activeChatId) return;
    if (isMuted) {
      setMutedContacts(prev => prev.filter(id => id !== activeChatId));
      toast.info(`Unmuted ${activeContact?.name}`);
    } else {
      setMutedContacts(prev => [...prev, activeChatId]);
      toast.info(`Muted notifications for ${activeContact?.name}`);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChatId]);

  const handleSelectContact = (id: number) => {
    setActiveChatId(id);
    setIsMobileListVisible(false);
  };

  const handleSendMessage = (text: string) => {
    if (!activeChatId) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      senderId: 'me',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));
  };

  return (
    <PageLayout>
      <div className={`w-full max-w-6xl mx-auto h-[calc(100vh-100px)] flex flex-col md:flex-row rounded-3xl overflow-hidden border shadow-sm ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-gray-800'
      }`}>
        
        <ChatSidebar 
          contacts={CONTACTS}
          activeChatId={activeChatId}
          onSelectContact={handleSelectContact}
          isMobileVisible={isMobileListVisible}
          theme={theme as 'light' | 'dark'}
          mutedContacts={mutedContacts}
        />

        <div className={`flex-1 flex-col h-full ${isMobileListVisible ? 'hidden md:flex' : 'flex'}`}>
          {activeContact ? (
            <>
              {/* Header Chat Activ */}
              <div className={`p-4 border-b flex items-center justify-between shrink-0 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-gray-800'}`}>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsMobileListVisible(true)} className={`md:hidden p-2 -ml-2 rounded-lg ${theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-[#222222]'}`}>
                    <ArrowLeftIcon className="w-5 h-5" />
                  </button>
                  {/* Am scos bulina verde de aici */}
                  <div className={`w-10 h-10 rounded-full items-center justify-center font-bold text-sm shrink-0 hidden sm:flex ${theme === 'light' ? 'bg-[#16a34a]/10 text-green-700' : 'bg-[#16a34a]/20 text-green-400'}`}>
                    {activeContact.initials}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{activeContact.name}</h3>
                    <p className={`text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{activeContact.role}</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-1 sm:gap-2" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-full transition-colors ${
                      isMenuOpen ? (theme === 'light' ? 'bg-gray-100' : 'bg-[#222222]') : ''
                    } ${theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-[#222222]'}`}
                  >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>

                  {isMenuOpen && (
                    <div className={`absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-xl border overflow-hidden z-20 transition-all ${
                      theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-gray-800'
                    }`}>
                      <div className="py-2">
                        <button 
                          onClick={toggleMute}
                          className={`w-full px-4 py-2 text-left text-sm font-bold flex items-center gap-2 transition-colors ${
                            theme === 'light' ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-200 hover:bg-[#222222]'
                          }`}
                        >
                          {isMuted ? <SpeakerWaveIcon className="w-4 h-4" /> : <NoSymbolIcon className="w-4 h-4" />}
                          {isMuted ? 'Unmute Contact' : 'Mute Contact'}
                        </button>
                        <button 
                          onClick={() => {
                            setIsMenuOpen(false);
                            const basePath = user?.role === 'donor' ? '/donor' : '/receiver';
                            navigate(`${basePath}/settings`, { state: { activeTab: 'support' } });
                          }}
                          className={`w-full px-4 py-2 text-left text-sm font-bold flex items-center gap-2 transition-colors ${
                            theme === 'light' ? 'text-orange-600 hover:bg-orange-50' : 'text-orange-400 hover:bg-orange-900/20'
                          }`}
                        >
                          <ExclamationCircleIcon className="w-4 h-4" />
                          Report User
                        </button>
                        <button 
                          onClick={() => {
                            setIsMenuOpen(false);
                            if (activeChatId) {
                               setMessages(prev => ({ ...prev, [activeChatId]: [] }));
                               toast.success('Chat cleared');
                            }
                          }}
                          className={`w-full px-4 py-2 text-left text-sm font-bold flex items-center gap-2 transition-colors ${
                            theme === 'light' ? 'text-red-600 hover:bg-red-50' : 'text-red-400 hover:bg-red-900/20'
                          }`}
                        >
                          <TrashIcon className="w-4 h-4" />
                          Clear Chat
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={`flex-1 p-4 sm:p-6 overflow-y-auto ${theme === 'light' ? 'bg-gray-50/50' : 'bg-black/20'}`}>
                <div className="flex flex-col gap-4">
                  {(messages[activeContact.id] || []).map((msg, index) => {
                    const isMe = msg.senderId === 'me';
                    return (
                      <div key={index} className={`flex flex-col max-w-[80%] sm:max-w-[70%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                          isMe 
                            ? 'bg-[#16a34a] text-white rounded-br-sm' 
                            : (theme === 'light' ? 'bg-white text-gray-800 rounded-bl-sm border border-gray-100' : 'bg-[#222222] text-gray-100 rounded-bl-sm border border-gray-800')
                        }`}>
                          {msg.text}
                        </div>
                        <span className={`text-[10px] font-bold mt-1 px-1 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {msg.time}
                        </span>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <ChatInput onSendMessage={handleSendMessage} theme={theme as 'light' | 'dark'} />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ChatBubbleLeftEllipsisIcon className={`w-16 h-16 mb-4 opacity-20 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Your Messages</h3>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Messages;