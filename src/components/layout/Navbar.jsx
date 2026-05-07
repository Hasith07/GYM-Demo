import { useState } from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGymStore } from '../../hooks/useGymStore';

const Navbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = useGymStore((state) => state.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-20 px-6 flex items-center justify-between sticky top-0 z-30 bg-background/50 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center relative">
          <Search size={18} className="absolute left-3 text-muted" />
          <input 
            type="text" 
            placeholder="Search gym resources..." 
            className="bg-card/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-text focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-muted hover:text-white rounded-full hover:bg-white/5 transition-colors relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_rgba(0,255,157,0.8)]" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-card border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                  <h3 className="font-semibold text-text">Notifications</h3>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-md">{unreadCount} New</span>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                      <p className={`text-sm ${notif.read ? 'text-muted' : 'text-text font-medium'}`}>{notif.text}</p>
                      <span className="text-xs text-muted mt-1 block">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-blue-500 p-[2px]" aria-hidden>
            <div className="w-full h-full bg-card rounded-full flex items-center justify-center border border-transparent">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
