const DocsDatabase = () => {
  return (
    <div className="animate-fade-in pb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-emerald-500/20 bg-emerald-500/5">
        <span className="text-xs text-emerald-400 font-medium tracking-wide">Mongoose & Redis Persistence</span>
      </div>
      <h1 className="text-4xl font-semibold text-white mb-6">Database & Data Persistence</h1>
      <p className="text-lg text-white/50 mb-10 leading-relaxed">
        Nexus uses a highly optimized data layer that combines the flexibility of MongoDB with the safety of Mongoose Schemas and the speed of Redis caching.
      </p>

      <div className="space-y-12">
        {/* Repository Pattern Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">The Repository Abstraction</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            In Nexus, services never talk to Mongoose models directly. They interact with <strong>Repositories</strong>. This design pattern allows you to swap your database (e.g., from MongoDB to PostgreSQL) without changing a single line of business logic in your Services.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">user.repository.js - Clean Data Access</span>
            </div>
            <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`class UserRepository {
  async findByEmail(email) {
    // Repository handles the Mongoose specifics
    return User.findOne({ email }).lean().exec();
  }

  async create(userData) {
    return User.create(userData);
  }
}

export default new UserRepository();`}
            </pre>
          </div>
        </section>

        {/* Mongoose Hooks Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">Safe Schema Transformations</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            Database models in Nexus are "self-cleaning." We use Mongoose middleares and <code>toJSON</code> transforms to ensure sensitive data (like password hashes) are stripped automatically before they reach the controller.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">Auto-Stripping Private Fields</span>
            </div>
            <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password; // Secure by default
    delete ret.__v;
    return ret;
  }
});`}
            </pre>
          </div>
        </section>

        {/* Redis Caching Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">Performance Caching (Redis)</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            The infrastructure supports optional Redis integration. The app logic is built for <strong>Graceful Degradation</strong>—if Redis is offline, the system automatically falls back to MongoDB without failing, ensuring 100% uptime.
          </p>
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center">
            <p className="text-xs text-white/40 italic italic">
              "Infrastructure should serve the app, not dictate its availability."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocsDatabase;
