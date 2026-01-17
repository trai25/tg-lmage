import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ScrollToTop from '@/components/ScrollToTop';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto md:p-6 gap-6 relative">
      {/* Sidebar - Desktop Sticky / Mobile Fixed Bottom (handled in component) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-24 md:pb-0 px-4 md:px-0">
        
        {/* Header */}
        <div className="mb-6 sticky top-0 z-30 bg-gray-100/80 backdrop-blur-sm py-2">
          <Header />
        </div>

        {/* The Paper Sheet (Content) */}
        <div className="paper-card rounded-sm p-4 md:p-8 md:rotate-slight-1 transition-transform origin-top-left bg-white min-h-[80vh]">
           {/* Tape Decoration */}
           <div className="tape-top hidden md:block"></div>
           
           <div className="relative z-10 h-full">
             <Outlet />
           </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-8 mb-4 text-center font-hand text-gray-400 text-sm">
          <p className="rotate-slight-n1">
            Doodle Diary &copy; 2026 · Handcrafted by Old Wang
          </p>
        </footer>
      </main>

      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
