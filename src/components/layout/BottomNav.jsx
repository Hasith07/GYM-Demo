import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Wrench } from 'lucide-react';

const tabs = [
  { label: 'Student',  path: '/dashboard/student', icon: Activity        },
  { label: 'Admin',    path: '/dashboard/admin',   icon: LayoutDashboard },
  { label: 'Staff',    path: '/dashboard/staff',   icon: Wrench          },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-card/90 backdrop-blur-xl border-t border-white/5 safe-area-pb">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive ? 'text-accent' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={`text-[10px] font-semibold ${isActive ? 'text-accent' : 'text-muted'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
