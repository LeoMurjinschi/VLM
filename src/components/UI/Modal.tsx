import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { theme } = useTheme();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;


  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      

      <div 
        className={`absolute inset-0 backdrop-blur-sm transition-opacity ${
          theme === 'light' ? 'bg-gray-900/60' : 'bg-black/60'
        }`}
        onClick={onClose}
      ></div>


      <div className={`relative rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up ${
        theme === 'light'
          ? 'bg-white'
          : 'bg-gray-900'
      }`}>
        

        <div className={`flex justify-between items-center p-4 border-b z-10 ${
          theme === 'light'
            ? 'border-gray-100 bg-white'
            : 'border-gray-700 bg-gray-900'
        }`}>
          <h2 className={`text-lg font-extrabold ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>{title}</h2>
          <button 
            onClick={onClose} 
            className={`p-1.5 rounded-full transition-colors outline-none ${
              theme === 'light'
                ? 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                : 'text-gray-500 hover:text-red-400 hover:bg-red-950'
            }`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>


        <div className="p-5 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;