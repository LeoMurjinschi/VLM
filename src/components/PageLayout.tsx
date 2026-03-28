import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex-1 flex flex-col min-h-[calc(100vh-4rem)] lg:min-h-screen p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      {/* Containerul care centrează conținutul și rezolvă spațiul din dreapta */}
      <div className=" w-full mx-auto flex-1 flex flex-col bg-transparent">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;