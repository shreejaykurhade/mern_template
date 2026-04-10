# MERN Stack Template

A production-grade full-stack MERN boilerplate featuring clean architecture, secure JWT rotation, and a premium technical documentation portal.

## 🏗️ Architecture

```
template_mern/
├── .github/workflows/ci.yml     # GitHub Actions CI
├── docker-compose.yml            # Docker orchestration
├── package.json                  # Root scripts (concurrently)
│
├── server/                       # Express.js Backend
│   ├── src/
│   │   ├── config/               # DB, logger, Redis, Swagger
│   │   ├── middleware/            # Auth, error handler, rate limiter, validate, upload
│   │   ├── modules/
│   │   │   ├── auth/             # Register, login, refresh, logout, change password
│   │   │   └── user/             # CRUD, role management, profile
│   │   ├── utils/                # ApiError, ApiResponse, catchAsync, pagination, tokens
│   │   ├── __tests__/            # Jest integration tests
│   │   ├── app.js                # Express app (testable)
│   │   └── server.js             # Entry point
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
└── client/                       # React Frontend
    ├── src/
    │   ├── api/                  # Axios instance + API abstractions
    │   ├── components/
    │   │   ├── guards/           # ProtectedRoute
    │   │   ├── layout/           # Navbar, Layout
    │   │   └── ui/               # Button, Input, Loader, ErrorBoundary
    │   ├── hooks/                # useAuth
    │   ├── pages/                # Landing, Login, Register, Dashboard, NotFound
    │   ├── store/                # Redux Toolkit (auth slice)
    │   ├── utils/                # Zod validators
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── Dockerfile
    └── package.json
```

## ✨ Features

### Backend
- **Clean Architecture** — Controllers → Services → Repositories → Models
- **JWT Auth** — Access tokens (15min) + refresh tokens (7d, httpOnly cookie, auto-rotation)
- **Role-Based Access** — User/Admin roles with middleware guards
- **Input Validation** — Zod schemas on every endpoint
- **Security** — Helmet, CORS, rate limiting (global + auth-specific)
- **Logging** — Winston with file rotation + Morgan HTTP logs
- **API Docs** — Swagger UI at `/api-docs`
- **API Versioning** — All routes under `/api/v1/`
- **Pagination** — Built-in sort, filter, search, and field selection
- **Redis Caching** — Optional, graceful degradation when unavailable
- **File Upload** — Multer + Cloudinary ready
- **Health Check** — `GET /api/v1/health`
- **Testing** — Jest + Supertest integration tests
- **Error Handling** — Centralized handler for Mongoose, JWT, Multer, and custom errors

### Frontend
- **Vite + React 18** — Fast dev server with HMR
- **Redux Toolkit** — Auth state management with async thunks
- **Technical Docs Portal** — Interactive deep-dive documentation at `/docs`
- **Axios Interceptors** — Automatic token refresh with request queue
- **Tailwind CSS** — Sleek dark theme using eye-safe monochrome palette
- **Responsive** — Mobile-first design architecture

### DevOps
- **Docker Compose** — MongoDB + Redis + Backend + Frontend
- **GitHub Actions** — Lint + Test + Build CI pipeline
- **ESLint + Prettier** — Consistent code formatting
- **Husky** — Pre-commit hooks via lint-staged

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **MongoDB** (local or [Atlas](https://www.mongodb.com/atlas))
- **Redis** (optional — app works without it)

### 1. Clone & Install

```bash
cd template_mern
npm run install:all
```

### 2. Configure Environment

```bash
# Backend
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secrets

# Frontend
cp client/.env.example client/.env
```

### 3. Run Development Servers

```bash
# Start Backend
cd server && npm start

# Start Frontend
cd client && npm run dev
```

This starts both servers:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:5000/api-docs

### 4. Using Docker (Alternative)

```bash
docker-compose up --build
```

---

## 📖 API Endpoints

### Auth (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login with email/password |
| POST | `/refresh-token` | Public | Refresh access token |
| POST | `/logout` | Private | Logout user |
| GET | `/me` | Private | Get current user |
| POST | `/change-password` | Private | Change password |

### Users (`/api/v1/users`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/me` | Private | Get own profile |
| PUT | `/me` | Private | Update own profile |
| GET | `/` | Admin | List all users (paginated) |
| GET | `/:id` | Admin | Get user by ID |
| PUT | `/:id` | Admin | Update user |
| PATCH | `/:id/role` | Admin | Change user role |
| PATCH | `/:id/deactivate` | Admin | Deactivate user |
| DELETE | `/:id` | Admin | Delete user |

### Utility
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Server health check |
| GET | `/api-docs` | Swagger UI |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch --prefix server

# Coverage report
npm run test:coverage --prefix server
```

---

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both servers |
| `npm run server` | Start backend only |
| `npm run client` | Start frontend only |
| `npm run install:all` | Install all dependencies |
| `npm run build` | Build frontend for production |
| `npm run test` | Run server tests |
| `npm run lint` | Lint both projects |

---

## 🔐 Environment Variables

See `server/.env.example` and `client/.env.example` for all available options.

**Required for production:**
- `MONGO_URI` — MongoDB connection string
- `JWT_ACCESS_SECRET` — Strong random secret for access tokens
- `JWT_REFRESH_SECRET` — Different strong random secret for refresh tokens
- `CORS_ORIGIN` — Frontend URL

---

## 📝 License

MIT — Use freely for your projects.
