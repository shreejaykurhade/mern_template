const DocsDatabase = () => {
  return (
    <div className="animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-emerald-500/20 bg-emerald-500/5">
        <span className="text-xs text-emerald-400 font-medium tracking-wide">Mongoose & Redis</span>
      </div>
      <h1 className="text-3xl font-semibold text-white mb-4">Database Execution</h1>
      <p className="text-white/60 mb-8 leading-relaxed">
        The application communicates through abstracted repository layers ensuring strict schema models control all I/O execution.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium text-white mb-3">Mongoose Hooks & Transformations</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Mongoose Schema definitions control data validation automatically and hook directly into standard events to strip sensitive schema fields before they can be sent.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">server/src/modules/user/user.model.js</span>
            </div>
            <pre className="p-4 text-sm font-mono text-white/70 overflow-x-auto">
{`userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  
  // NEVER push hashes through API boundaries statically
  delete obj.password; 
  delete obj.__v;
  
  return obj;
};`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">The Repository Abstraction</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Services don't execute logic. Repositories handle the exact native language of the database (Mongoose). Swapping ORMs requires edits only to the Respository.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">server/src/modules/user/user.repository.js</span>
            </div>
            <pre className="p-4 text-sm font-mono text-white/70 overflow-x-auto">
{`class UserRepository {
  async findById(id) {
    return User.findById(id).lean().exec();
  }
  
  async create(userData) {
    return User.create(userData);
  }
}

export default new UserRepository();`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocsDatabase;
