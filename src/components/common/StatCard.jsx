import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, delta, positive, icon: Icon, accentColor = '#00FF9D', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: `0 12px 30px -10px ${accentColor}30` }}
      className="bg-card/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Background glow */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ background: accentColor }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-muted text-xs uppercase tracking-widest font-semibold mb-2">{label}</p>
          <p className="text-4xl font-bold font-mono text-text">{value}</p>
          {delta && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${positive ? 'text-accent' : 'text-danger'}`}>
              {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              <span>{delta} vs yesterday</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/5"
            style={{ background: `${accentColor}15`, color: accentColor }}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
