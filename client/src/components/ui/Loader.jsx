const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-2 border-white/10 border-t-primary-500 rounded-full animate-spin`}
      />
    </div>
  );
};

export const FullPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-950">
    <div className="text-center animate-fade-in">
      <Loader size="xl" className="mb-4" />
      <p className="text-white/40 text-sm">Loading...</p>
    </div>
  </div>
);

export default Loader;
