const DocsSecurity = () => {
  return (
    <div className="animate-fade-in pb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-purple-500/20 bg-purple-500/5">
        <span className="text-xs text-purple-400 font-medium tracking-wide">JWT & Roles</span>
      </div>
      <h1 className="text-4xl font-semibold text-white mb-6">Security & Auth Context</h1>
      <p className="text-lg text-white/50 mb-10 leading-relaxed">
        Nexus implements an enterprise-grade authentication system that prioritizes data safety, session longevity, and fine-grained permissions.
      </p>

      <div className="space-y-12">
        {/* Token System Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">The Split-Token Shield</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            Unlike simple JWT setups that store vulnerable tokens in <code>localStorage</code>, Nexus uses a dual-token rotation architecture to stop session hijacking.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <h4 className="text-sm font-semibold text-white">Access Token (JWT)</h4>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                Short-lived (15 minutes). Sent in the <code>Authorization: Bearer</code> header. Used to authenticate individual API requests.
              </p>
            </div>
            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <h4 className="text-sm font-semibold text-white">Refresh Token (Cookie)</h4>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                Long-lived (7 days). Stored in a <strong>HTTP-Only Secure Cookie</strong>. It is invisible to JavaScript, making it immune to XSS attacks.
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">Secure Cookie Setting (Backend)</span>
            </div>
            <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`// Untouchable by frontend scripts
res.cookie('refreshToken', token, {
  httpOnly: true, // Prevents XSS theft
  secure: true,   // Requires HTTPS
  sameSite: 'strict', // Prevents CSRF
  path: '/api/v1/auth/refresh', // Restricted scope
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});`}
            </pre>
          </div>
        </section>

        {/* RBAC Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">Role-Based Access Control</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            Nexus builds a custom request context after authentication. You can lock entire API subreddits to specific roles like <code>admin</code> or <code>editor</code> with a simple middleware chain.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">Enforcing Permissions</span>
            </div>
            <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`// Secure Router Chain
router.use(protect); // Ensure user is logged in

router.route('/users')
  .get(authorize('admin'), userController.getAllUsers)
  .post(authorize('admin', 'manager'), userController.createUser);`}
            </pre>
          </div>
        </section>

        {/* Infrastructure Safety Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">Infra Guard Rails</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            The backend includes standardized security headers via <strong>Helmet</strong> and intelligent <strong>Rate Limiting</strong> to prevent brute-force attacks on sensitive endpoints like login and registration.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">CORS Whitelisting</span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">XSS Sanitization</span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">HPP Injection Defense</span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">Bcrypt Password Hashing</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocsSecurity;
