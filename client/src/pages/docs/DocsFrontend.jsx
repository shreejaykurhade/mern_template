import { Link } from 'react-router-dom';

const DocsFrontend = () => {
  return (
    <div className="animate-fade-in pb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5">
        <span className="text-xs text-blue-400 font-medium tracking-wide">React & Redux Ecosystem</span>
      </div>
      <h1 className="text-4xl font-semibold text-white mb-6">The React Client</h1>
      <p className="text-lg text-white/50 mb-10 leading-relaxed">
        The Nexus frontend is built for performance and maintainability, utilizing React 18 with Vite for near-instant HMR and Redux Toolkit for centralized state orchestration.
      </p>

      <div className="space-y-12">
        {/* State Flow Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">How State Flows</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            Data fetching in Nexus is decoupled from React components. UI elements never call APIs directly; instead, they dispatch **Asynchronous Thunks**. This pattern ensures that loading, success, and error states are handled globally and predictably.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">1. Dispatching Action</h4>
                <p className="text-xs text-white/40">The component calls <code>dispatch(loginUser(credentials))</code>.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">2. Thunk Execution</h4>
                <p className="text-xs text-white/40">The Thunk triggers the Axios call and handles the Promise resolution/rejection.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">3. State Update</h4>
                <p className="text-xs text-white/40">Reducers catch the pending/fulfilled/rejected actions to update the global store.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
              <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <span className="text-xs font-mono text-white/30">authSlice.js Implementation</span>
              </div>
              <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`export const loginUser = createAsyncThunk(
  'auth/login', 
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login(credentials);
      return data.data; // Success: payload
    } catch (error) {
      return rejectWithValue(error.response.data); // Error
    }
  }
);`}
              </pre>
            </div>
          </div>
        </section>

        {/* Global Interceptor Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">The Authentication Shield</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            Nexus uses a secure Axios interceptor to manage JWT lifecycles. If a request returns a 401 status, the interceptor automatically queues any outgoing requests and attempts to refresh the access token via a hidden HTTP-only cookie.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/30">axios.js - The logic behind smooth sessions</span>
            </div>
            <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto">
{`api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401 Unauthorized but not yet retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshToken()).unwrap();
        return api(originalRequest); // Re-run original request
      } catch (refreshError) {
        store.dispatch(logout()); // Session dead
      }
    }
    return Promise.reject(error);
  }
);`}
            </pre>
          </div>
        </section>

        {/* Design System Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
            </div>
            <h2 className="text-2xl font-medium text-white">Atomic Design System</h2>
          </div>
          <p className="text-white/40 mb-6 leading-relaxed">
            Every UI element in Nexus is an atomic component. This makes scaling the interface as simple as composing existing bricks.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="p-4 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 font-medium">
              Reusable <code>&lt;Input /&gt;</code> with error handling
            </li>
            <li className="p-4 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 font-medium">
              Animated <code>&lt;Button /&gt;</code> with loading states
            </li>
            <li className="p-4 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 font-medium">
              Glassmorphic <code>&lt;Card /&gt;</code> design primitives
            </li>
            <li className="p-4 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 font-medium">
              Global <code>&lt;Loader /&gt;</code> for seamless transitions
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DocsFrontend;
