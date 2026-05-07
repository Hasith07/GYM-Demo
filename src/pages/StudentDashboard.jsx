import { useState } from 'react';
import { useGymStore } from '../hooks/useGymStore';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/common/AnimatedPage';
import GlassCard from '../components/common/GlassCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Users, Clock, Zap, AlertTriangle, CheckCircle2, Dumbbell, Send, MessageSquare, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PEAK_HOURS, EQUIPMENT, WORKOUT_FOCUSES } from '../utils/mockData';

// ─── Helpers ────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl text-sm">
      <p className="text-muted mb-1 font-medium">{label}</p>
      <p className="text-accent font-bold flex items-center gap-1">
        <Users size={13} /> {payload[0].value} users predicted
      </p>
    </div>
  );
};

const eqStatusColor = {
  available:    { dot: 'bg-accent shadow-[0_0_8px_rgba(0,255,157,0.6)]',   label: 'Available'   },
  'high-demand':{ dot: 'bg-warning shadow-[0_0_8px_rgba(255,176,32,0.6)]', label: 'High Demand' },
  full:         { dot: 'bg-danger shadow-[0_0_8px_rgba(255,77,77,0.6)]',   label: 'Full'        },
  crowded:      { dot: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]',label: 'Crowded'     },
};

// Recommend best times based on focus + PEAK_HOURS data
const getBestTimes = (focus) => {
  const quietTimes = PEAK_HOURS.filter(h => h.users < 60).map(h => h.time);
  if (!focus) return quietTimes.slice(0, 3);
  if (focus === 'cardio') return ['6 AM', '10 AM', '2 PM']; // treadmills less busy early
  if (focus === 'legs')   return ['6 AM', '10 AM', '12 PM']; // squat racks fill up at 4–6 PM
  return quietTimes.slice(0, 3);
};

// ─── Component ───────────────────────────────────────────────────────────────
const StudentDashboard = () => {
  const { occupancy, trend, equipment } = useGymStore();

  // Workout planner state
  const [selectedTime, setSelectedTime]   = useState('');
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [suggestion, setSuggestion]       = useState(null);

  // Complaint state (uses shared store)
  const [complaint, setComplaint] = useState({ title: '', detail: '', type: 'generalcomplaints' });
  const [submitted, setSubmitted] = useState(false);
  const addComplaint = useGymStore(state => state.addComplaint);
  const clearComplaints = useGymStore(state => state.clearComplaints);
  const complaints = useGymStore(state => state.complaints);
  const navigate = useNavigate();

  const occColor = occupancy > 80 ? 'text-danger' : occupancy > 60 ? 'text-warning' : 'text-accent';

  const handlePlan = () => {
    const focus   = WORKOUT_FOCUSES.find(f => f.id === selectedFocus);
    const eqList  = focus?.equipment ?? [];
    const selectedHourData = PEAK_HOURS.find(h => h.time === selectedTime);
    const usersAtTime = selectedHourData?.users ?? 0;

    // find availability for each piece of equipment
    const eqAvailability = eqList.map(name => {
      const found = EQUIPMENT.find(e => e.name === name);
      if (found) {
         let simulatedAvailable = found.total;
         if (usersAtTime > 80) simulatedAvailable = Math.max(0, Math.floor(found.total * 0.2));
         else if (usersAtTime > 50) simulatedAvailable = Math.max(0, Math.floor(found.total * 0.5));
         else simulatedAvailable = Math.max(0, Math.floor(found.total * 0.8));
         
         let status = 'available';
         if (simulatedAvailable === 0) status = 'full';
         else if (simulatedAvailable <= 2) status = 'high-demand';
         else if (simulatedAvailable <= found.total / 2) status = 'crowded';
         
         return { name: found.name, available: simulatedAvailable, total: found.total, status };
      }
      return null;
    }).filter(Boolean);

    let recommendationText = '';
    if (usersAtTime > 80) {
      recommendationText = `${selectedTime} is usually very busy. Expect high wait times for ${focus?.label} equipment. Consider going earlier or later.`;
    } else if (usersAtTime > 50) {
      recommendationText = `${selectedTime} has moderate traffic. ${focus?.label} equipment should be reasonably available.`;
    } else {
      recommendationText = `${selectedTime} is a great time! ${focus?.label} equipment will be mostly free.`;
    }

    setSuggestion({ selectedTime, eqAvailability, focus, recommendationText, times: [selectedTime] });
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!complaint.title.trim() || !complaint.detail.trim()) return;
    addComplaint({ user: 'You', ...complaint });
    const isMaintenance = complaint.type === 'maintenance';
    setComplaint({ title: '', detail: '', type: 'generalcomplaints' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <AnimatedPage className="space-y-6 max-w-7xl mx-auto pb-20 md:pb-0">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gym User Dashboard</h1>
        <p className="text-muted mt-1">Plan your workout, check equipment, and raise complaints.</p>
      </div>

      {/* Occupancy + AI suggestion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlassCard delay={0.1} className="p-6 relative group overflow-hidden">
          <div className="absolute -bottom-6 -right-6 text-white/[0.04] group-hover:text-white/[0.07] transition-colors pointer-events-none">
            <Activity size={110} />
          </div>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-2">Live Occupancy</p>
            <p className={`text-6xl font-black font-mono transition-colors duration-700 ${occColor}`}>{occupancy}%</p>
            <div className="mt-3 text-sm flex items-center gap-1.5">
              {trend === 'increasing'
                ? <><AlertTriangle size={14} className="text-warning" /><span className="text-warning">Filling up</span></>
                : <><CheckCircle2 size={14} className="text-accent" /><span className="text-accent">Clearing up</span></>}
            </div>
            <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${occupancy}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${occupancy > 80 ? '#FF4D4D' : occupancy > 60 ? '#FFB020' : '#00FF9D'}, transparent)` }}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={0.2} className="p-6 md:col-span-2 border-l-4 border-l-accent">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Zap size={16} className="text-accent animate-pulse" />
            </div>
            <div>
              <p className="font-semibold text-white">Smart Suggestion</p>
              <p className="text-xs text-muted">Updated just now</p>
            </div>
          </div>
          <p className="text-text/80 leading-relaxed">
            The gym is currently at <span className={`font-bold ${occColor}`}>{occupancy}%</span> capacity.&nbsp;
            {occupancy > 75
              ? 'Heavy crowd detected — consider visiting after 9 PM for a peaceful session.'
              : 'Good time to work out! Occupancy is moderate. Equipment wait times are low.'}
          </p>
        </GlassCard>
      </div>

      {/* ─── Workout Planner ─────────────────────────────────────────────── */}
      <GlassCard delay={0.25} className="p-6">
        <h3 className="font-semibold mb-5 flex items-center gap-2">
          <Clock size={18} className="text-accent" /> Plan Your Workout
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time selection */}
          <div>
            <p className="text-sm text-muted mb-3 font-medium">When do you want to visit?</p>
            <div className="grid grid-cols-3 gap-2">
              {PEAK_HOURS.map(({ time, users }) => {
                const busy = users > 100 ? 'text-danger' : users > 70 ? 'text-warning' : 'text-accent';
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-2 rounded-xl border text-sm text-center transition-all ${
                      isSelected
                        ? 'border-accent bg-accent/15 text-accent'
                        : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <p className="font-medium text-white text-xs">{time}</p>
                    <p className={`text-[10px] font-semibold ${isSelected ? 'text-accent' : busy}`}>{users} users</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focus selection */}
          <div>
            <p className="text-sm text-muted mb-3 font-medium">What do you want to train?</p>
            <div className="grid grid-cols-2 gap-2">
              {WORKOUT_FOCUSES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFocus(f.id)}
                  className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-sm transition-all ${
                    selectedFocus === f.id
                      ? 'border-accent bg-accent/15 text-accent'
                      : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className={selectedFocus === f.id ? 'text-accent' : 'text-muted'}><f.icon size={16} /></span>
                  <span className={`text-xs font-medium ${selectedFocus === f.id ? 'text-accent' : 'text-text'}`}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handlePlan}
          disabled={!selectedTime || !selectedFocus}
          className="mt-5 btn-primary flex items-center gap-2 text-sm py-2.5 px-6 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Zap size={15} /> Get Recommendations
        </button>

        {/* Suggestion result */}
        <AnimatePresence>
          {suggestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 p-4 rounded-2xl border border-accent/20 bg-accent/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={16} className="text-accent" />
                <p className="text-sm font-semibold text-accent">
                  Recommended for {suggestion.focus?.label} at {suggestion.selectedTime}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted mb-2 font-medium uppercase tracking-wide">AI Recommendation</p>
                  <p className="text-sm text-text leading-relaxed">{suggestion.recommendationText}</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-2 font-medium uppercase tracking-wide">Equipment Availability</p>
                  <div className="space-y-1.5">
                    {suggestion.eqAvailability.length === 0 && (
                      <p className="text-xs text-muted">Choose a specific focus to see equipment.</p>
                    )}
                    {suggestion.eqAvailability.map(eq => {
                      const s = eqStatusColor[eq.status] ?? eqStatusColor.available;
                      return (
                        <div key={eq.name} className="flex items-center justify-between text-xs">
                          <span className="text-text">{eq.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted">{eq.available}/{eq.total} free</span>
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>

      {/* Chart + Equipment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <GlassCard delay={0.3} className="p-6 lg:col-span-2 flex flex-col min-h-[320px]">
          <h3 className="font-semibold mb-5 flex items-center gap-2">
            <Activity size={18} className="text-accent" /> Today's Traffic Forecast
          </h3>
          <div className="flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PEAK_HOURS} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00FF9D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00FF9D" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="users" stroke="#00FF9D" strokeWidth={3}
                  fillOpacity={1} fill="url(#gradUsers)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard delay={0.4} className="p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold flex items-center gap-2">
              <Dumbbell size={18} className="text-blue-400" /> Equipment
            </h3>
            <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold">Live</span>
          </div>
          <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
            {equipment.map((eq, i) => {
              const s = eqStatusColor[eq.status] ?? eqStatusColor.available;
              return (
                <motion.div
                  key={eq.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{eq.name}</p>
                    <p className="text-xs text-muted">{eq.available}/{eq.total} free</p>
                  </div>
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${s.dot}`} title={s.label} />
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* ─── Complaint Box ───────────────────────────────────────────────── */}
      <GlassCard delay={0.5} className="p-6">
        <h3 className="font-semibold mb-5 flex items-center gap-2">
          <MessageSquare size={18} className="text-warning" /> Raise a Complaint
        </h3>
        <form onSubmit={handleComplaintSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted font-medium mb-1.5 block uppercase tracking-wide">Issue Title</label>
              <input
                type="text"
                value={complaint.title}
                onChange={e => setComplaint(p => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Treadmill belt slipping"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-muted font-medium mb-1.5 block uppercase tracking-wide">Type</label>
              <select
                value={complaint.type}
                onChange={e => setComplaint(p => ({ ...p, type: e.target.value }))}
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent/50 transition-all"
              >
                <option value="generalcomplaints">General Complaints</option>
                <option value="maintenance">Maintenance Issue</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-muted font-medium mb-1.5 block uppercase tracking-wide">Description</label>
            <textarea
              rows={3}
              value={complaint.detail}
              onChange={e => setComplaint(p => ({ ...p, detail: e.target.value }))}
              placeholder="Describe the issue in detail..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all resize-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="btn-primary flex items-center gap-2 text-sm py-2.5 px-6">
              <Send size={14} /> Submit Complaint
            </button>
            <AnimatePresence>
              {submitted && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-accent flex items-center gap-1"
                >
                  <CheckCircle2 size={14} /> Complaint registered successfully!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {complaint.type === 'maintenance' && (
            <p className="text-xs text-warning flex items-center gap-1">
              <AlertTriangle size={12} /> Maintenance complaints are automatically routed to the staff team.
            </p>
          )}
        </form>

        {/* Previous complaints */}
        {complaints && complaints.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-muted uppercase font-semibold tracking-wide">Your Submissions</p>
              <button 
                onClick={clearComplaints}
                className="p-1.5 text-muted hover:text-accent transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1.5 text-[10px] font-semibold"
                title="Clear all complaints"
              >
                <RotateCw size={12} /> REFRESH
              </button>
            </div>
            {complaints.map(c => (
              <div key={c.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm">
                <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${c.type === 'maintenance' ? 'bg-warning' : 'bg-accent'}`} />
                <div>
                  <p className="font-medium text-text">{c.title} <span className="text-xs text-muted">by {c.user}</span></p>
                  <p className="text-xs text-muted mt-0.5">{c.detail}</p>
                </div>
                <span className="ml-auto text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">Submitted</span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

    </AnimatedPage>
  );
};

export default StudentDashboard;
