const DocsBackend = () => {
  return (
    <div className="animate-fade-in pb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-green-500/20 bg-green-500/5">
        <span className="text-xs text-green-400 font-medium tracking-wide">Express Firewall & Core</span>
      </div>
      <h1 className="text-4xl font-semibold text-white mb-6">API & Logic Layers</h1>
      <p className="text-lg text-white/50 mb-10 leading-relaxed">
        The Nexus backend is built on a modular "Vertical Slice" architecture. Every feature (like <code>auth</code> or <code>user</code>) is a self-contained module with its own routes, controller, services, and repository layers.
      </p>

      <div className="space-y-12">
        {/* Layered Flow Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">The Layered Lifecycle</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            Nexus strictly enforces the separation of concerns. This makes the backend incredibly robust and easy to unit-test.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">1. Controller</h4>
                <p className="text-xs text-white/40 leading-relaxed">The traffic cop. It parses headers, extracts body params, and handles the HTTP response. It <strong>never</strong> touches the database directly.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">2. Service</h4>
                <p className="text-xs text-white/40 leading-relaxed">The brain. It houses your actual business logic, hashing algorithms, and external integrations. It is completely unaware of HTTP or Mongoose.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">3. Repository</h4>
                <p className="text-xs text-white/40 leading-relaxed">The data vault. This is the only place where Mongoose queries are written. It provides a clean API for the Services to read/write data.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
              <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <span className="text-xs font-mono text-white/30">user.service.js Logic Example</span>
              </div>
              <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`// Clean Business Logic
class UserService {
  async registerUser(data) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new ApiError(400, 'Email taken');
    
    // Hash password & logic happens here...
    return await userRepository.create(data);
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Validation Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">Schema Validation</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            Nexus uses <strong>Zod</strong> to secure every entry point. If the <code>req.body</code> doesn't match the schema exactly, the request is terminated with a helpful validation error before it even hits your logic.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">auth.validation.js - The first line of defense</span>
            </div>
            <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password too short'),
  }),
});

// Used in router:
router.post('/login', validate(loginSchema), controller.login);`}
            </pre>
          </div>
        </section>

        {/* Error Handling Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">Centralized Error Engine</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            No more messy <code>try-catch</code> blocks. Nexus uses a custom <code>catchAsync</code> utility that redirects all failures to a single master error handler.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">Consistent API Responses</span>
            </div>
            <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`{
  "status": "error",
  "message": "User validation failed",
  "errors": { "email": ["is invalid"] },
  "stack": "Error at registerUser..." // Development only
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocsBackend;
