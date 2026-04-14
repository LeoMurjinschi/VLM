import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (

    <div className="w-full flex-1 flex flex-col p-4 sm:p-6 lg:p-8 font-sans relative">
      
     
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col bg-transparent">
        {children}
      </div>
      
    </div>
  );
};

export default PageLayout;