import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import Navbar  from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import { useGymStore } from '../hooks/useGymStore';

const MainLayout = () => {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const simulateLiveUpdates = useGymStore(s => s.simulateLiveUpdates);

  useEffect(() => { simulateLiveUpdates(); }, [simulateLiveUpdates]);

  return (
    <div className="flex h-screen bg-background text-text overflow-hidden font-sans">
      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-accent/5   blur-[140px] animate-pulse" />
        <div className="absolute -bottom-[15%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[120px] animate-float" />
      </div>

      <Sidebar isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex flex-col flex-1 min-w-0 relative z-10 overflow-hidden">
        <Navbar onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 pb-20 md:pb-8 scroll-smooth">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default MainLayout;
