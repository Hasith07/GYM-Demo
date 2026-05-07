import { create } from 'zustand';
import { EQUIPMENT, PEAK_HOURS, AI_RECOMMENDATIONS, NOTIFICATIONS, MAINTENANCE_LOGS, USER_COMPLAINTS, GYM_REQUIREMENTS } from '../utils/mockData';

// Helper to generate random numbers
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const useGymStore = create((set) => ({
  occupancy: 68,
  trend: 'increasing',

  // Real-time equipment status (seeded from mock data)
  equipment: EQUIPMENT,

  // Peak hour analytics
  peakHours: PEAK_HOURS,

  // AI Recommendations
  recommendations: AI_RECOMMENDATIONS,

  // Notifications
  notifications: NOTIFICATIONS,

  // Shared complaints and maintenance logs
  complaints: USER_COMPLAINTS || [],
  maintenanceLogs: MAINTENANCE_LOGS || [],
  requirements: GYM_REQUIREMENTS || [],
  // Current role (student | staff | admin)
  role: (() => {
    try {
      const v = localStorage.getItem('gym_role');
      return v && v !== 'null' ? v : null;
    } catch (e) {
      return null;
    }
  })(),
  setRole: (r) => set(() => {
    try {
      if (r === null) localStorage.removeItem('gym_role');
      else localStorage.setItem('gym_role', r);
    } catch (e) {}
    return { role: r };
  }),

  // Add a user complaint; if maintenance, create a maintenance log as well
  addComplaint: (complaint) => set((state) => {
    const newItem = {
      id: Date.now(),
      user: complaint.user || 'Anonymous',
      title: complaint.title,
      detail: complaint.detail,
      type: complaint.type || 'generalcomplaints',
      status: 'open',
      date: new Date().toISOString().split('T')[0],
    };

    const updated = [newItem, ...state.complaints];

    // If maintenance, also add to maintenanceLogs
    if (newItem.type === 'maintenance') {
      const mLog = {
        id: Date.now() + 1,
        equipment: newItem.title,
        issue: newItem.detail,
        status: 'pending',
        assignee: 'Unassigned',
        date: newItem.date,
      };
      return { complaints: updated, maintenanceLogs: [mLog, ...state.maintenanceLogs] };
    }

    return { complaints: updated };
  }),

  // Resolve a maintenance log by id
  resolveMaintenance: (id) => set((state) => ({
    maintenanceLogs: state.maintenanceLogs.map(m => m.id === id ? { ...m, status: 'resolved' } : m)
  })),

  // Clear all complaints and logs
  clearComplaints: () => set(() => ({ 
    complaints: [],
    maintenanceLogs: [] 
  })),

  // Simulation action to mimic live updates for occupancy/equipment
  simulateLiveUpdates: () => {
    setInterval(() => {
      set((state) => {
        // Realistic occupancy: fluctuates less often and by smaller amounts
        const shouldChangeOcc = Math.random() > 0.8;
        const occChange = shouldChangeOcc ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newOccupancy = state.occupancy + occChange;
        const boundedOccupancy = Math.max(10, Math.min(100, newOccupancy));
        
        let newTrend = state.trend;
        if (occChange > 0) newTrend = 'increasing';
        else if (occChange < 0) newTrend = 'decreasing';

        const newEquipment = state.equipment.map(eq => {
          // Equipment availability also changes less frequently
          if (Math.random() > 0.85) {
            const availChange = Math.random() > 0.5 ? 1 : -1;
            const avail = Math.max(0, Math.min(eq.total, eq.available + availChange));
            let status = 'available';
            if (avail === 0) status = 'full';
            else if (avail <= 2) status = 'high-demand';
            else if (avail <= eq.total / 2) status = 'crowded';
            return { ...eq, available: avail, status };
          }
          return eq;
        });

        return {
          occupancy: boundedOccupancy,
          trend: newTrend,
          equipment: newEquipment
        };
      });
    }, 15000); // Update every 15 seconds to be more realistic
  }
}));
