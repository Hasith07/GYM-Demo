import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGymStore } from '../hooks/useGymStore';
import { Dumbbell, ShieldCheck, Wrench, ChevronRight } from 'lucide-react';

const roles = [
  {
    id: 'student',
    label: 'Gym User',
    icon: Dumbbell,
    color: '#00FF9D',
    colorDim: 'rgba(0,255,157,0.08)',
    border: 'rgba(0,255,157,0.25)',
    path: '/dashboard/student',
    desc: 'Plan your workout, check equipment availability, and raise complaints.',
  },
  {
    id: 'staff',
    label: 'Staff',
    icon: Wrench,
    color: '#FFB020',
    colorDim: 'rgba(255,176,32,0.08)',
    border: 'rgba(255,176,32,0.25)',
    path: '/dashboard/staff',
    desc: 'Manage tasks, monitor equipment, and handle maintenance requests.',
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    color: '#4CC9F0',
    colorDim: 'rgba(76,201,240,0.08)',
    border: 'rgba(76,201,240,0.25)',
    path: '/dashboard/admin',
    desc: 'View gym analytics, manage requirements, and review user complaints.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const setRole = useGymStore(state => state.setRole);

  return (
    <div className="min-h-screen bg-background text-text font-sans flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-accent/5 blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-blue-600/5 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
              <Dumbbell size={22} className="text-accent" />
            </div>
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400">
              OptiGYM
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Welcome Back
          </h1>
          <p className="text-muted text-base md:text-lg">
            Select your role to continue to your dashboard
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roles.map(({ id, label, icon: Icon, color, colorDim, border, path, desc }, i) => (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: `0 24px 48px -16px ${color}30` }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setRole(id); navigate(path); }}
              className="group relative text-left rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 border"
              style={{
                background: colorDim,
                borderColor: border,
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: color }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${color}18` }}
              >
                <Icon size={24} style={{ color }} />
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold text-white mb-1">{label}</p>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>

              <div
                className="flex items-center gap-1 text-sm font-semibold mt-1"
                style={{ color }}
              >
                Enter Dashboard <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-muted text-xs mt-12"
        >
          OptiGYM · Smart Gym Optimization · College Edition 2026
        </motion.p>
      </div>
    </div>
  );
};

export default LandingPage;
