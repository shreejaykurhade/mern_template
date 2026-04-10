const DocsSecurity = () => {
  return (
    <div className="animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-purple-500/20 bg-purple-500/5">
        <span className="text-xs text-purple-400 font-medium tracking-wide">JWT & Roles</span>
      </div>
      <h1 className="text-3xl font-semibold text-white mb-4">Security & Context</h1>
      <p className="text-white/60 mb-8 leading-relaxed">
        The application is fortified against CSRF and XSS attacks using split JWT architecture and strict environment guard rails.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium text-white mb-3">Split JWT Rotation</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Long-lived authentication logic is handled securely out of the reach of frontend JavaScript using <code>httpOnly</code> cookies. Access tokens live briefly to mitigate capture damage.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">server/src/utils/tokens.js</span>
            </div>
            <pre className="p-4 text-sm font-mono text-white/70 overflow-x-auto">
{`// Generate Refresh Token
const refreshCookieOptions = {
  httpOnly: true, // Untouchable by JavaScript Document API
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
};

res.cookie('refreshToken', token, refreshCookieOptions);`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">Role-Based Guard Logic</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Protected routes intercept context payload strings on the user object to lock out permissions globally.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">server/src/middleware/auth.js</span>
            </div>
            <pre className="p-4 text-sm font-mono text-white/70 overflow-x-auto">
{`export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'User role unauthorized.');
    }
    next();
  };
};

// Usage
router.post('/admin', protect, authorize('admin', 'super-admin'), controller);`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocsSecurity;
