import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ScrollToTop from '@/components/ScrollToTop';

const MainLayout = () => {
  return (
    <div className="min-h-screen p-2 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 pb-20 md:pb-8">
      {/* Spine / Navigation */}
      <Sidebar />

      {/* Main Page Area */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        {/* Top Scribbles (Header) */}
        <Header />

        {/* The Paper Sheet */}
        <div className="paper-card flex-1 p-4 md:p-8 mt-6 rounded-sm rotate-slight-1 transition-transform duration-500">
           {/* The Tape Holding the Paper */}
           <div className="tape-top"></div>
           
           <div className="relative z-10">
             <Outlet />
           </div>
        </div>
        
        {/* Footer Note */}
        <footer className="mt-8 text-center font-hand text-gray-400 text-lg -rotate-1">
          Made with <span className="text-marker-pink">♥</span> by Old Wang
        </footer>
      </main>

      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
