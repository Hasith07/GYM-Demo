import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, AlertTriangle, Wrench, ClipboardList } from 'lucide-react';
import AnimatedPage from '../components/common/AnimatedPage';
import GlassCard     from '../components/common/GlassCard';
import StatCard       from '../components/common/StatCard';
import { STAFF_TASKS, MAINTENANCE_LOGS, EQUIPMENT } from '../utils/mockData';

const priorityStyle = {
  high:   { bg: 'bg-danger/10',  text: 'text-danger',  label: 'High'   },
  medium: { bg: 'bg-warning/10', text: 'text-warning', label: 'Medium' },
  low:    { bg: 'bg-blue-500/10',text: 'text-blue-400',label: 'Low'    },
};

const eqStatusColor = {
  available:   '#00FF9D',
  'high-demand':'#FFB020',
  full:        '#FF4D4D',
  crowded:     '#4CC9F0',
};

const StaffDashboard = () => {
  const [tasks, setTasks] = useState(STAFF_TASKS);

  const toggleTask = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const done   = tasks.filter(t => t.done).length;
  const total  = tasks.length;
  const pct    = Math.round((done / total) * 100);

  return (
    <AnimatedPage className="space-y-6 max-w-7xl mx-auto pb-20 md:pb-0">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Staff Dashboard</h1>
        <p className="text-muted mt-1">Task tracking, equipment monitoring, and maintenance management.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <StatCard label="Tasks Completed"  value={`${done}/${total}`} delta={`${pct}% done`} positive icon={ClipboardList} accentColor="#00FF9D" delay={0.1} />
        <StatCard label="Pending Repairs"  value={MAINTENANCE_LOGS.filter(l => l.status === 'pending').length} delta="Need attention" positive={false} icon={Wrench} accentColor="#FF4D4D" delay={0.2} />
        <StatCard label="Equipment Online" value={`${EQUIPMENT.filter(e => e.available > 0).length}/${EQUIPMENT.length}`} delta="Tracked live" positive icon={AlertTriangle} accentColor="#4CC9F0" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Task Checklist */}
        <GlassCard delay={0.3} className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold flex items-center gap-2">
              <ClipboardList size={18} className="text-accent" /> Today's Tasks
            </h3>
            <span className="text-sm font-mono text-accent">{pct}%</span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-accent rounded-full"
            />
          </div>

          <div className="space-y-3">
            {tasks.map((task, i) => {
              const p = priorityStyle[task.priority];
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border border-white/5 cursor-pointer transition-all hover:bg-white/5 ${task.done ? 'opacity-50' : ''}`}
                >
                  {task.done
                    ? <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                    : <Circle size={20} className="text-muted mt-0.5 flex-shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.done ? 'line-through text-muted' : 'text-text'}`}>
                      {task.task}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{task.zone}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${p.bg} ${p.text}`}>
                    {p.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Equipment Monitor */}
        <GlassCard delay={0.4} className="p-6">
          <h3 className="font-semibold mb-5 flex items-center gap-2">
            <Wrench size={18} className="text-warning" /> Equipment Status Monitor
          </h3>
          <div className="space-y-3 overflow-y-auto max-h-[400px] pr-1 custom-scrollbar">
            {EQUIPMENT.map((eq, i) => {
              const color = eqStatusColor[eq.status] ?? '#6B7280';
              const avPct = Math.round((eq.available / eq.total) * 100);
              return (
                <motion.div
                  key={eq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  className="p-3 bg-white/[0.03] border border-white/5 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{eq.name}</span>
                    <span className="text-xs font-mono" style={{ color }}>
                      {eq.available}/{eq.total} free
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${avPct}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.07 }}
                      className="h-full rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}60` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Open Maintenance Requests */}
      <GlassCard delay={0.5} className="p-6">
        <h3 className="font-semibold mb-5 flex items-center gap-2">
          <AlertTriangle size={18} className="text-danger" /> Open Maintenance Requests
        </h3>
        <div className="space-y-3">
          {MAINTENANCE_LOGS.filter(l => l.status !== 'resolved').map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-text">{log.equipment}</p>
                <p className="text-xs text-muted mt-0.5">{log.issue} · {log.assignee}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${log.status === 'in-progress' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'}`}>
                {log.status === 'in-progress' ? 'In Progress' : 'Pending'}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>

    </AnimatedPage>
  );
};

export default StaffDashboard;
