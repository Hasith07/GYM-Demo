// ─── MOCK DATA ─────────────────────────────────────────────────────────────
// Single source of truth for all static/simulated data across dashboards.

export const EQUIPMENT = [
  { id: 1, name: 'Treadmills',       total: 15, available: 3, status: 'high-demand' },
  { id: 2, name: 'Squat Racks',      total: 8,  available: 0, status: 'full'        },
  { id: 3, name: 'Bench Press',      total: 10, available: 2, status: 'high-demand' },
  { id: 4, name: 'Cable Machines',   total: 6,  available: 4, status: 'available'   },
  { id: 5, name: 'Dumbbell Area',    total: 1,  available: 1, status: 'available'   },
  { id: 6, name: 'Rowing Machines',  total: 6,  available: 2, status: 'crowded'     },
  { id: 7, name: 'Leg Press',        total: 4,  available: 0, status: 'full'        },
  { id: 8, name: 'Pull-Up Stations', total: 8,  available: 6, status: 'available'   },
];

export const PEAK_HOURS = [
  { time: '6 AM',  users: 30  },
  { time: '8 AM',  users: 75  },
  { time: '10 AM', users: 55  },
  { time: '12 PM', users: 45  },
  { time: '2 PM',  users: 60  },
  { time: '4 PM',  users: 90  },
  { time: '6 PM',  users: 130 },
  { time: '8 PM',  users: 95  },
  { time: '10 PM', users: 25  },
];

export const WEEKLY_TRAFFIC = [
  { day: 'Mon', users: 320 },
  { day: 'Tue', users: 480 },
  { day: 'Wed', users: 410 },
  { day: 'Thu', users: 510 },
  { day: 'Fri', users: 390 },
  { day: 'Sat', users: 650 },
  { day: 'Sun', users: 280 },
];

export const AI_RECOMMENDATIONS = [
  {
    id: 1,
    icon: '⏰',
    title: 'Best Time to Visit',
    desc: 'Today at 10 AM, occupancy is predicted to drop to 35%. Perfect window for a peaceful workout.',
    tag: 'Timing',
    priority: 'high',
  },
  {
    id: 2,
    icon: '🏃',
    title: 'Cardio Zone Open',
    desc: 'The cardio zone is currently at 20% capacity. All treadmills and ellipticals are available.',
    tag: 'Zone',
    priority: 'medium',
  },
  {
    id: 3,
    icon: '📊',
    title: 'Crowd Prediction',
    desc: 'Expect peak crowd at 6 PM today (est. 130 users). Consider shifting your session by 2 hours.',
    tag: 'Forecast',
    priority: 'low',
  },
];

export const NOTIFICATIONS = [
  { id: 1, text: 'Treadmill #4 is under maintenance. Use #5 or #6.',    time: '10m ago',  read: false, type: 'warning' },
  { id: 2, text: 'Slot booking for 7 PM Yoga is now open.',             time: '1h ago',   read: false, type: 'info'    },
  { id: 3, text: 'Your slot at 5 PM (Weights) is confirmed.',           time: '2h ago',   read: true,  type: 'success' },
  { id: 4, text: 'Peak hour alert: Gym is 90% full right now.',         time: '3h ago',   read: true,  type: 'danger'  },
];

export const MAINTENANCE_LOGS = [
  { id: 1, equipment: 'Treadmill #4',    issue: 'Motor overheating',      status: 'in-progress', assignee: 'Raj Kumar',    date: '2026-05-06' },
  { id: 2, equipment: 'Squat Rack #2',   issue: 'Safety pin missing',     status: 'pending',     assignee: 'Priya S.',     date: '2026-05-05' },
  { id: 3, equipment: 'AC Unit Floor 2', issue: 'Not cooling properly',    status: 'resolved',    assignee: 'Amit T.',      date: '2026-05-04' },
  { id: 4, equipment: 'Leg Press #1',    issue: 'Cable fraying',           status: 'pending',     assignee: 'Unassigned',   date: '2026-05-03' },
  { id: 5, equipment: 'Shower Block A',  issue: 'Drain blocked',           status: 'resolved',    assignee: 'Kavya M.',     date: '2026-05-02' },
];

export const STAFF_TASKS = [
  { id: 1, task: 'Clean weight room mats',     zone: 'Weights',   priority: 'high',   done: false },
  { id: 2, task: 'Restock towel dispensers',   zone: 'Locker',    priority: 'medium', done: true  },
  { id: 3, task: 'Check Treadmill #4 motor',   zone: 'Cardio',    priority: 'high',   done: false },
  { id: 4, task: 'Evening floor mopping',      zone: 'All Zones', priority: 'low',    done: false },
  { id: 5, task: 'Sanitize equipment handles', zone: 'All Zones', priority: 'medium', done: true  },
];

export const HEATMAP_ZONES = [
  { zone: 'Free Weights',    occupancy: 87, color: '#FF4D4D' },
  { zone: 'Cardio Deck',     occupancy: 42, color: '#FFB020' },
  { zone: 'Studio A',        occupancy: 15, color: '#00FF9D' },
  { zone: 'Pull-Up Station', occupancy: 60, color: '#FFB020' },
  { zone: 'Stretching Area', occupancy: 20, color: '#00FF9D' },
  { zone: 'Leg Zone',        occupancy: 95, color: '#FF4D4D' },
];

export const ADMIN_STATS = [
  { label: 'Total Members',     value: '1,247', delta: '+4.2%',  positive: true  },
  { label: 'Active Today',      value: '247',   delta: '+12%',   positive: true  },
  { label: 'Open Issues',       value: '4',     delta: '-2',     positive: true  },
  { label: 'Avg Session (min)', value: '54',    delta: '+6 min', positive: true  },
];

// ─── USER COMPLAINTS ────────────────────────────────────────────────────────
// type: 'maintenance' → routed to staff | 'general' → admin only
export const USER_COMPLAINTS = [
  {
    id: 1,
    user: 'Rahul M.',
    title: 'Treadmill belt slipping',
    detail: 'Treadmill #7 belt keeps slipping mid-run — very dangerous.',
    type: 'maintenance',
    status: 'open',
    date: '2026-05-06',
  },
  {
    id: 2,
    user: 'Sneha K.',
    title: 'AC not working in weight room',
    detail: 'The AC has been off for 2 days in the weight zone. It is very hot.',
    type: 'maintenance',
    status: 'in-progress',
    date: '2026-05-05',
  },
  {
    id: 3,
    user: 'Arjun P.',
    title: 'Locker room lights flickering',
    detail: 'Lights in locker room B have been flickering since Monday.',
    type: 'maintenance',
    status: 'open',
    date: '2026-05-04',
  },
  {
    id: 4,
    user: 'Divya R.',
    title: 'Booking system not confirming slots',
    detail: 'I booked a slot for 6 PM but received no confirmation email.',
    type: 'general',
    status: 'open',
    date: '2026-05-06',
  },
  {
    id: 5,
    user: 'Karthik S.',
    title: 'Insufficient dumbbells',
    detail: 'The gym lacks dumbbells in the 20–30 kg range. Please procure more.',
    type: 'general',
    status: 'resolved',
    date: '2026-05-03',
  },
];

// ─── GYM REQUIREMENTS / ANNOUNCEMENTS ──────────────────────────────────────
export const GYM_REQUIREMENTS = [
  { id: 1, item: 'New Dumbbell Set (20–30 kg × 4 pairs)', status: 'pending',  priority: 'high'   },
  { id: 2, item: 'Replace Treadmill #7 belt',             status: 'approved', priority: 'high'   },
  { id: 3, item: 'Purchase 2 extra cable machines',       status: 'pending',  priority: 'medium' },
  { id: 4, item: 'Restock sanitizer dispensers',          status: 'done',     priority: 'low'    },
  { id: 5, item: 'Install cooling fan in Leg Zone',       status: 'pending',  priority: 'medium' },
];

// ─── WORKOUT FOCUS OPTIONS ──────────────────────────────────────────────────
export const WORKOUT_FOCUSES = [
  { id: 'chest',    label: 'Chest Day',       icon: '💪', equipment: ['Bench Press', 'Cable Machines', 'Dumbbell Area'] },
  { id: 'legs',     label: 'Leg Day',         icon: '🦵', equipment: ['Squat Racks', 'Leg Press', 'Cable Machines'] },
  { id: 'back',     label: 'Back & Lats',     icon: '🏋️', equipment: ['Pull-Up Stations', 'Cable Machines', 'Rowing Machines'] },
  { id: 'cardio',   label: 'Cardio',          icon: '🏃', equipment: ['Treadmills', 'Rowing Machines'] },
  { id: 'arms',     label: 'Arms',            icon: '🤜', equipment: ['Dumbbell Area', 'Cable Machines', 'Bench Press'] },
  { id: 'full',     label: 'Full Body',       icon: '⚡', equipment: ['Squat Racks', 'Bench Press', 'Pull-Up Stations', 'Cable Machines'] },
  { id: 'specific', label: 'Specific Equipment', icon: '🎯', equipment: [] },
];
