const DocsFrontend = () => {
  return (
    <div className="animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5">
        <span className="text-xs text-blue-400 font-medium tracking-wide">React & Redux Ecosystem</span>
      </div>
      <h1 className="text-3xl font-semibold text-white mb-4">The React Client</h1>
      <p className="text-white/60 mb-8 leading-relaxed">
        The frontend strictly isolates view rendering from state management and asynchronous side effects using Redux Toolkit and Axios.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium text-white mb-3">State Management (Redux Slices)</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Instead of executing <code>fetch()</code> manually inside React components, data fetching triggers Redux Thunks. 
            This forces 1-way strict data flow.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">client/src/store/slices/authSlice.js</span>
            </div>
            <pre className="p-4 text-sm font-mono text-white/70 overflow-x-auto">
{`export const loginUser = createAsyncThunk(
  'auth/login', 
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">The Axios Interceptor Queue</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            If the Express backend replies with a 401 Unauthorized (meaning the short-lived access token died), Axios freezes the request. It fires a stealth refresh token request using the secure <code>httpOnly</code> cookie, then replays the frozen request.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">client/src/api/axios.js</span>
            </div>
            <pre className="p-4 text-sm font-mono text-white/70 overflow-x-auto">
{`api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Stealth refresh occurs here...
      const newUrl = await refreshAuthLogic(); 
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocsFrontend;
