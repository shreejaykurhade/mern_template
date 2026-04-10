const DocsBackend = () => {
  return (
    <div className="animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-green-500/20 bg-green-500/5">
        <span className="text-xs text-green-400 font-medium tracking-wide">Express Firewall & Core</span>
      </div>
      <h1 className="text-3xl font-semibold text-white mb-4">API Layer & Controllers</h1>
      <p className="text-white/60 mb-8 leading-relaxed">
        The Node.js Express layer utilizes extreme modularity to decouple HTTP logic from underlying business services.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium text-white mb-3">Zod Schema Validation</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Before an incoming request ever hits the Controller logic, the payload is explicitly mapped against strict Zod type configurations. Invalid setups trigger instant 400 responses.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">server/src/middleware/validate.js</span>
            </div>
            <pre className="p-4 text-sm font-mono text-white/70 overflow-x-auto">
{`const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    next(new ApiError(400, "Validation Error", error.errors));
  }
};`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">CatchAsync & ApiError Standardization</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            All API route controllers are wrapped in a higher-order exception catcher. This pushes native throw commands natively down to the centralized error responder.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">server/src/utils/catchAsync.js</span>
            </div>
            <pre className="p-4 text-sm font-mono text-white/70 overflow-x-auto">
{`export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

// Inside Controller:
export const register = catchAsync(async (req, res) => {
  if (exists) throw new ApiError(400, "User exists");
});`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocsBackend;
