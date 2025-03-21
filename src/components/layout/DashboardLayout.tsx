
import React, { ReactNode, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    
    // Add animated background pattern
    const createStars = () => {
      const starsContainer = document.createElement('div');
      starsContainer.classList.add('stars-container');
      starsContainer.style.position = 'fixed';
      starsContainer.style.top = '0';
      starsContainer.style.left = '0';
      starsContainer.style.width = '100%';
      starsContainer.style.height = '100%';
      starsContainer.style.zIndex = '-1';
      starsContainer.style.opacity = '0.3';
      starsContainer.style.pointerEvents = 'none';
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.position = 'absolute';
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animation = `pulse-subtle ${Math.random() * 3 + 2}s infinite ease-in-out`;
        
        starsContainer.appendChild(star);
      }
      
      // Only append if it doesn't exist yet
      if (!document.querySelector('.stars-container')) {
        document.body.appendChild(starsContainer);
      }
    };
    
    createStars();
    
    return () => {
      const starsContainer = document.querySelector('.stars-container');
      if (starsContainer) {
        document.body.removeChild(starsContainer);
      }
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-background via-background/95 to-background/90">
        <Navbar />
        <div className="flex flex-1 w-full overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto transition-all duration-500 ease-in-out animate-fade-in">
            <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 xl:px-16 max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
