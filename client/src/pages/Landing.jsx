import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'JWT Authentication',
    description: 'Access + refresh token flow with automatic rotation, httpOnly cookies, and role-based access control.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: 'MongoDB + Redis',
    description: 'Mongoose ODM with repository pattern, optional Redis caching with graceful degradation.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Security First',
    description: 'Helmet, CORS, rate limiting, input validation with Zod, and centralized error handling.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Clean Architecture',
    description: 'Feature-based modules with controllers, services, repositories, and validation layers.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'React + Redux',
    description: 'Vite-powered React with Redux Toolkit, React Hook Form, protected routes, and error boundaries.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    title: 'DevOps Ready',
    description: 'Docker Compose, GitHub Actions CI, ESLint, Prettier, and Husky pre-commit hooks.',
  },
];

const techStack = [
  'React 18', 'Redux Toolkit', 'Tailwind CSS', 'Vite',
  'Node.js', 'Express', 'MongoDB', 'Mongoose',
  'JWT', 'Redis', 'Docker', 'Jest',
];

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/5 animate-fade-in">
            <span className="text-xs text-white/70 font-medium tracking-wide uppercase">Foundation 1.0</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-balance text-white animate-slide-up">
            Ship faster.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Build better.</span>
          </h1>

          <p className="mt-8 text-lg text-white/50 max-w-xl mx-auto text-balance animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A production-ready foundation with scalable system design patterns, clean architecture, and enterprise-grade implementation baked right in.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="bg-white text-black px-8 py-3.5 rounded-lg font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center"
              id="cta-get-started"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/architecture"
              className="btn-secondary px-8 py-3.5"
              id="cta-architecture"
            >
              Arch & Design Patterns
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Everything you need. <span className="bg-gradient-to-r from-neutral-300 to-neutral-600 bg-clip-text text-transparent">Nothing you don't.</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            Advanced system design patterns and production-ready implementations baked in from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass-card-hover p-6 animate-slide-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Tech Stack</h2>
          <p className="text-white/40">Battle-tested technologies for production use</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 text-sm font-medium text-white/60 bg-white/[0.03] border border-white/[0.06] rounded-full hover:bg-white/[0.06] hover:text-white/80 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-white/30">
            Nexus Framework v1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
