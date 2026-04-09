import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useTheme } from '../../hooks/useTheme';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <>
      {children}
      <style>
        {`
          :root {
            --toastify-color-success: #2563eb;
            --toastify-color-progress-success: #2563eb;
          }
        `}
      </style>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
};

export default ToastProvider;