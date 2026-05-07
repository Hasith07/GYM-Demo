import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { AI_RECOMMENDATIONS } from '../../utils/mockData';

const priorityBorder = {
  high:   'border-l-danger',
  medium: 'border-l-warning',
  low:    'border-l-blue-500',
};

const AIRecommendationPanel = () => {
  return (
    <div className="space-y-3">
      {AI_RECOMMENDATIONS.map((rec, i) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
          whileHover={{ x: 4 }}
          className={`p-4 bg-white/[0.03] border border-white/5 border-l-4 ${priorityBorder[rec.priority]} rounded-xl cursor-default`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><rec.icon size={22} className="text-accent" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm text-text">{rec.title}</h4>
                <span className="text-[10px] bg-white/10 text-muted px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {rec.tag}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{rec.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 justify-center pt-2 text-xs text-muted"
      >
        <Zap size={12} className="text-accent animate-pulse" />
        Powered by OptiGYM AI Engine
      </motion.div>
    </div>
  );
};

export default AIRecommendationPanel;
