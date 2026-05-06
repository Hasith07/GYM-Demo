import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0, hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -5, boxShadow: '0 10px 30px -10px rgba(0, 255, 157, 0.2)' } : {}}
      className={`bg-card/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-lg overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
