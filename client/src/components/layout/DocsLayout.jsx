import { Link, Outlet, useLocation } from 'react-router-dom';

const sidebarLinks = [
  { name: 'Architecture Overview', path: '/docs' },
  { name: 'React & Frontend', path: '/docs/frontend' },
  { name: 'Express & API Layer', path: '/docs/backend' },
  { name: 'Security & Context', path: '/docs/security' },
  { name: 'Database & Models', path: '/docs/database' },
];

const DocsLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-16 flex max-w-7xl mx-auto">
      {/* Sidebar Desktop */}
      <aside className="w-64 fixed top-16 bottom-0 overflow-y-auto border-r border-white/10 hidden md:block px-4 py-8">
        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 px-3">Documentation</h4>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive 
                  ? 'bg-blue-500/10 text-blue-400 font-medium' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64">
        <div className="px-4 py-8 sm:px-8 max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DocsLayout;
