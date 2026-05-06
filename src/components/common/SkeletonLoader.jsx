const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent`;

export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-card/60 border border-white/5 rounded-2xl ${shimmer} ${className}`} />
);

export const SkeletonText = ({ className = '' }) => (
  <div className={`bg-white/5 rounded-md ${shimmer} ${className}`} />
);

export const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {[...Array(4)].map((_, i) => <SkeletonCard key={i} className="h-32" />)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <SkeletonCard className="h-80 lg:col-span-2" />
      <SkeletonCard className="h-80" />
    </div>
  </div>
);

export default SkeletonCard;
