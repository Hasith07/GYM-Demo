import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, LayoutDashboard, Settings, Users, Wrench, Menu, X, Dumbbell } from 'lucide-react';

const Sidebar = ({ isMobileOpen, setMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: 'Student View', path: '/dashboard/student', icon: Activity },
    { name: 'Admin Portal', path: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Staff Panel', path: '/dashboard/staff', icon: Wrench },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card/90 backdrop-blur-2xl border-r border-white/5 relative z-50">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
            <Dumbbell size={20} />
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400"
            >
              GymOS
            </motion.span>
          )}
        </div>
        
        {/* Desktop Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="hidden md:block text-muted hover:text-accent transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Mobile Close Toggle */}
        <button 
          onClick={() => setMobileOpen(false)} 
          className="md:hidden text-muted hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                  isActive ? 'text-accent bg-accent/10' : 'text-muted hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r-full" 
                    />
                  )}
                  <Icon size={20} className={isActive ? 'text-accent' : 'group-hover:text-white'} />
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="font-medium whitespace-nowrap">{item.name}</span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-muted hover:text-white hover:bg-white/5 transition-all">
          <Settings size={20} />
          {(!isCollapsed || isMobileOpen) && <span>Settings</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        animate={{ width: isCollapsed ? '80px' : '280px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:block h-screen sticky top-0 flex-shrink-0"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-50 md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
