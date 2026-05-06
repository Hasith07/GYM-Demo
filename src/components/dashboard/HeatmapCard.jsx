import { motion } from 'framer-motion';
import { HEATMAP_ZONES } from '../../utils/mockData';

const HeatmapCard = () => {
  return (
    <div className="space-y-3">
      {HEATMAP_ZONES.map((zone, i) => (
        <motion.div
          key={zone.zone}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
          className="group"
        >
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-text/80">{zone.zone}</span>
            <span className="text-xs font-bold font-mono" style={{ color: zone.color }}>
              {zone.occupancy}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${zone.occupancy}%` }}
              transition={{ duration: 0.8, delay: 0.15 * i, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${zone.color}88, ${zone.color})`,
                boxShadow: `0 0 8px ${zone.color}60`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeatmapCard;
