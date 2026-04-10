import { useAuth } from '../hooks/useAuth';

const statCards = [
  {
    label: 'Role',
    getValue: (user) => user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1),
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-primary-500 to-purple-500',
  },
  {
    label: 'Status',
    getValue: (user) => user?.isActive ? 'Active' : 'Inactive',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-500',
  },
  {
    label: 'Member Since',
    getValue: (user) =>
      user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })
        : '—',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
  },
  {
    label: 'Last Login',
    getValue: (user) =>
      user?.lastLogin
        ? new Date(user.lastLogin).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'Just now',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-500',
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-white">
          Welcome back,{' '}
          <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
        </h1>
        <p className="mt-2 text-white/40">Here's an overview of your account.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <div
            key={card.label}
            className="glass-card p-5 animate-slide-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/40">{card.label}</span>
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.color} bg-opacity-10 flex items-center justify-center text-white/80`}>
                {card.icon}
              </div>
            </div>
            <p className="text-xl font-semibold text-white">{card.getValue(user)}</p>
          </div>
        ))}
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-semibold text-white mb-6">Profile Information</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
              <span className="text-sm text-white/40">Full Name</span>
              <span className="text-sm text-white font-medium">{user?.name}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
              <span className="text-sm text-white/40">Email</span>
              <span className="text-sm text-white font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
              <span className="text-sm text-white/40">Role</span>
              <span className="text-sm px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 font-medium capitalize">
                {user?.role}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-white/40">Account ID</span>
              <span className="text-sm text-white/60 font-mono">{user?._id}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">API Docs</p>
                <p className="text-xs text-white/30">Swagger UI</p>
              </div>
            </a>

            <a
              href={`${import.meta.env.VITE_API_URL || '/api/v1'}/health`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Health Check</p>
                <p className="text-xs text-white/30">Server status</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white/50">Settings</p>
                <p className="text-xs text-white/20">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
