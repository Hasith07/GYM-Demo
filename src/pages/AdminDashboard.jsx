import { motion } from 'framer-motion';
import { Users, AlertTriangle, Activity, Clock, BarChart2, Wrench } from 'lucide-react';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import AnimatedPage from '../components/common/AnimatedPage';
import GlassCard     from '../components/common/GlassCard';
import StatCard       from '../components/common/StatCard';
import HeatmapCard    from '../components/dashboard/HeatmapCard';
import { ADMIN_STATS, WEEKLY_TRAFFIC, MAINTENANCE_LOGS } from '../utils/mockData';

// ─── Custom tooltip ────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-xl text-sm">
      <p className="text-muted mb-1">{label}</p>
      <p className="text-accent font-bold">{payload[0].value} users</p>
    </div>
  );
};

const statusStyle = {
  'in-progress': { bg: 'bg-warning/10',  text: 'text-warning',  label: 'In Progress' },
  'pending':     { bg: 'bg-danger/10',   text: 'text-danger',   label: 'Pending'     },
  'resolved':    { bg: 'bg-accent/10',   text: 'text-accent',   label: 'Resolved'    },
};

const AdminDashboard = () => {
  return (
    <AnimatedPage className="space-y-6 max-w-7xl mx-auto pb-20 md:pb-0">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted mt-1">Full gym analytics, member management, and maintenance overview.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {ADMIN_STATS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} positive={s.positive}
            icon={[Users, Activity, AlertTriangle, Clock][i]}
            accentColor={['#00FF9D', '#4CC9F0', '#FF4D4D', '#FFB020'][i]}
            delay={i * 0.1}
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Weekly traffic */}
        <GlassCard delay={0.2} className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-5 flex items-center gap-2">
            <BarChart2 size={18} className="text-accent" /> Weekly Member Traffic
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={WEEKLY_TRAFFIC} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="users" radius={[6, 6, 0, 0]} animationDuration={1200}>
                {WEEKLY_TRAFFIC.map((_, i) => (
                  <rect key={i} fill={i === 5 ? '#00FF9D' : '#00FF9D44'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Heatmap */}
        <GlassCard delay={0.35} className="p-6">
          <h3 className="font-semibold mb-5 flex items-center gap-2">
            <Activity size={18} className="text-blue-400" /> Zone Occupancy
          </h3>
          <HeatmapCard />
        </GlassCard>
      </div>

      {/* Maintenance Logs */}
      <GlassCard delay={0.45} className="p-6">
        <h3 className="font-semibold mb-5 flex items-center gap-2">
          <Wrench size={18} className="text-warning" /> Maintenance Log
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-white/5">
                <th className="pb-3 pr-6 font-semibold">Equipment</th>
                <th className="pb-3 pr-6 font-semibold">Issue</th>
                <th className="pb-3 pr-6 font-semibold">Assignee</th>
                <th className="pb-3 pr-6 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {MAINTENANCE_LOGS.map((log, i) => {
                const s = statusStyle[log.status];
                return (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 pr-6 font-medium text-text">{log.equipment}</td>
                    <td className="py-3 pr-6 text-muted">{log.issue}</td>
                    <td className="py-3 pr-6 text-muted">{log.assignee}</td>
                    <td className="py-3 pr-6 text-muted">{log.date}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </AnimatedPage>
  );
};

export default AdminDashboard;
