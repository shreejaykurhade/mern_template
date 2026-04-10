import { Link } from 'react-router-dom';

const stackDetails = [
  {
    title: '1. The React Client (Frontend)',
    tech: 'React 18 + Vite + Redux Toolkit',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'The frontend is organized to strictly separate UI from network requests.',
    bullets: [
      'Components map directly to Tailwind CSS utility pipelines.',
      'Redux Toolkit handles asynchronous thunks internally. No bare fetch() in UI components.',
      'Axios Interceptors trap any 401 token expiries, halt the request loop, silently fire a token refresh against the backend cookie, and replay the stalled user requests natively.',
    ],
    code: `// Redux Thunk Example
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const { data } = await authApi.login(credentials);
  return data.data; // UI receives formatted payload automatically
});`
  },
  {
    title: '2. The Express Firewall (API Layer)',
    tech: 'Node.js + Express + Zod',
    icon: (
      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    description: 'Requests arrive at Express and pass through extreme security chokepoints before business data executes.',
    bullets: [
      'Helmet sets HTTP headers, CORS locks cross-origin execution, and rate limiting blocks DDOS vectors.',
      'Zod parses incoming JSON bodies (req.body), ensuring incorrect data schemas are rejected immediately natively throwing 400 Bad Requests.',
      'catchAsync wraps the router automatically pushing failures to a single Master Error Handler.',
    ],
    code: `// Validation Middleware
export const validate = (schema) => (req, res, next) => {
  schema.parse({ body: req.body, query: req.query, params: req.params });
  next();
};`
  },
  {
    title: '3. Security & Context Providers (Middleware)',
    tech: 'JWT + BCrypt + Express Request Context',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    description: 'Stateless secure authentication using short and long-lived tokens.',
    bullets: [
      'The backend checks for short-lived (15m) JWT Authorization headers to verify identity.',
      'If authenticated, JWT payload data (like user ID and role) gets manually attached to the req.user object.',
      'Refresh operations run purely on httpOnly cookies completely obscuring sensitive keys from window environments.',
    ],
    code: `// Auth Guard Pattern
export const protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userRepository.findById(decoded.id);
  next();
});`
  },
  {
    title: '4. The Core Logic (Controllers & Services)',
    tech: 'Monolithic Domain Layering',
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: 'This is where actual application requirements are executed natively separated by feature module.',
    bullets: [
      'Controllers do absolutely nothing but pull parameters from req and push data into res.',
      'Services hold the massive computing architectures—if passwords need hashing or complex emails need launching, it happens purely here.',
      'This strict separation radically simplifies Testing pipelines, allowing you to mock endpoints.',
    ],
    code: `// Complete abstraction from HTTP protocols
const registerUser = async (userData) => {
  if (await checkEmailExists(userData.email)) {
    throw new ApiError(400, 'Email taken');
  }
  return await userRepository.create(userData);
};`
  },
  {
    title: '5. The Database Execution (Repositories & Mongo)',
    tech: 'MongoDB + Mongoose ODM (Object Data Modeling)',
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    description: 'The foundation layer executing highly normalized Mongoose Schemas against internal and cloud databases natively.',
    bullets: [
      'Mongoose hooks run just prior to execution automatically dropping passwords from generated data queries (toJSON deletes).',
      'Repositories provide the only actual layer interacting with DB methods like Model.findOneAndUpdate().',
      'Optional Redis infrastructure caches high execution read operations natively reducing Mongo database overhead drastically.',
    ],
    code: `// Protected Document Generation
const userSchema = new mongoose.Schema({ ... });
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password; // Never push password hash back
  return obj;
};`
  }
];

const Architecture = () => {
  return (
    <div className="min-h-screen px-4 py-8 sm:py-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 animate-slide-up text-center border-b border-white/10 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5">
          <span className="text-xs text-white/70 font-medium tracking-wide uppercase">End To End Mechanics</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
          How Nexus Operates
        </h1>
        <p className="text-lg text-white/50 max-w-3xl mx-auto">
          A granular deep-dive into how React, Express, Node, and MongoDB execute sequentially behind the scenes in this production boilerplate environment.
        </p>
      </div>

      {/* End to End Pipeline Sequence UI */}
      <div className="space-y-12">
        {stackDetails.map((layer, index) => (
          <div 
            key={index} 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-slide-up relative"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            {/* Thread Connector Line */}
            {index < stackDetails.length - 1 && (
              <div className="hidden lg:block absolute left-8 top-16 bottom-[-3rem] w-px bg-white/10 z-0"></div>
            )}
            
            {/* Descriptive Context Grid */}
            <div className="lg:col-span-6 relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                  {layer.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-1">{layer.title}</h3>
                  <span className="text-sm font-medium text-white/40 tracking-wide">{layer.tech}</span>
                </div>
              </div>
              <p className="text-white/60 text-base leading-relaxed mb-6 pl-20">
                {layer.description}
              </p>
              <ul className="space-y-3 pl-20">
                {layer.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0 mt-2"></span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Context Grid */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-xl">
                <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                  <span className="ml-4 text-xs font-mono text-white/30">Code Concept Example</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code className="text-white/70">
                      {layer.code}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center pb-12">
        <Link to="/" className="btn-secondary">Return to Home</Link>
      </div>
    </div>
  );
};

export default Architecture;
