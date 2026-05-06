import { create } from 'zustand';

// Helper to generate random numbers
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const useGymStore = create((set) => ({
  occupancy: 68,
  trend: 'increasing',
  
  // Real-time equipment status
  equipment: [
    { id: 1, name: 'Treadmills', total: 15, available: 3, status: 'high-demand' },
    { id: 2, name: 'Squat Racks', total: 8, available: 0, status: 'full' },
    { id: 3, name: 'Bench Press', total: 10, available: 2, status: 'high-demand' },
    { id: 4, name: 'Cable Machines', total: 6, available: 4, status: 'available' },
    { id: 5, name: 'Dumbbell Area', total: 1, available: 1, status: 'crowded' }
  ],

  // Peak hour analytics data
  peakHours: [
    { time: '6 AM', users: 30 },
    { time: '9 AM', users: 80 },
    { time: '12 PM', users: 45 },
    { time: '3 PM', users: 60 },
    { time: '6 PM', users: 120 },
    { time: '9 PM', users: 85 },
    { time: '11 PM', users: 20 },
  ],

  // AI Recommendations
  recommendations: [
    { id: 1, title: 'Optimal Workout Time', desc: 'Wait 45 minutes for the Squat Racks to free up. Occupancy is dropping.', type: 'timing' },
    { id: 2, title: 'Zone Suggestion', desc: 'The Cardio zone is currently 80% empty. Great time for a run!', type: 'zone' }
  ],

  // Notifications
  notifications: [
    { id: 1, text: 'Treadmill #4 is under maintenance.', time: '10m ago', read: false },
    { id: 2, text: 'New yoga class starts in 30 mins.', time: '1h ago', read: true }
  ],

  // Simulation action to mimic live updates
  simulateLiveUpdates: () => {
    setInterval(() => {
      set((state) => {
        const newOccupancy = state.occupancy + random(-2, 2);
        const boundedOccupancy = Math.max(10, Math.min(100, newOccupancy));
        
        const newEquipment = state.equipment.map(eq => {
          if (Math.random() > 0.7) {
            const avail = Math.max(0, Math.min(eq.total, eq.available + random(-1, 1)));
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
          trend: newOccupancy > state.occupancy ? 'increasing' : 'decreasing',
          equipment: newEquipment
        };
      });
    }, 5000); // Update every 5 seconds
  }
}));
