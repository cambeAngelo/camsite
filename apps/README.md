# camsite - Portfolio Builder SaaS

A modern, fully-functional portfolio builder SaaS platform built with React, Express.js, and MySQL.

## 📋 Project Structure

```
camsite/
├── apps/
│   ├── api/                    # Express.js backend API
│   │   ├── src/
│   │   │   ├── db/
│   │   │   │   ├── pool.js      # MySQL connection pool
│   │   │   │   └── schema.sql   # Database schema
│   │   │   ├── config/
│   │   │   │   └── env.js       # Environment configuration
│   │   │   ├── modules/
│   │   │   │   ├── auth/        # Authentication module
│   │   │   │   ├── portfolios/  # Portfolio management
│   │   │   │   ├── projects/    # Projects CRUD
│   │   │   │   ├── skills/      # Skills management
│   │   │   │   ├── experiences/ # Work experience
│   │   │   │   └── templates/   # Portfolio templates
│   │   │   ├── middlewares/
│   │   │   │   ├── auth.middleware.js    # JWT authentication
│   │   │   │   └── error.middleware.js   # Error handling
│   │   │   ├── shared/
│   │   │   │   └── auth.js      # Auth utilities
│   │   │   ├── app.js           # Express app setup
│   │   │   └── server.js        # Server entry point
│   │   ├── package.json
│   │   ├── .env.example
│   │   └── Dockerfile
│   │
│   └── web/                     # React frontend
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Home.tsx
│       │   │   ├── Login.tsx
│       │   │   ├── Register.tsx
│       │   │   ├── Dashboard.tsx
│       │   │   ├── Builder.tsx
│       │   │   ├── PortfolioPublic.tsx
│       │   │   └── Explore.tsx
│       │   ├── services/
│       │   │   └── api.js       # API client with http utilities
│       │   ├── App.tsx          # Main app with routing
│       │   ├── main.tsx         # Entry point
│       │   ├── index.css        # Global styles
│       │   └── App.css          # App styles
│       ├── index.html
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── postcss.config.js
│       ├── tailwind.config.js
│       ├── Dockerfile
│       ├── nginx.conf
│       └── .env.example
│
├── packages/
│   └── shared/
│       ├── src/
│       │   └── contracts/
│       │       └── index.js     # API contracts and constants
│       └── package.json
│
├── docker-compose.yml           # Local development setup
└── README.md                    # This file

```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Docker & Docker Compose (optional, for containerized development)

### Local Development (without Docker)

1. **Install dependencies**

```bash
# Backend
cd apps/api
npm install

# Frontend
cd apps/web
npm install
```

2. **Setup Database**

```sql
mysql -u root -p
CREATE DATABASE camsite;
USE camsite;
source apps/api/src/db/schema.sql;
```

3. **Configure environment**

```bash
# Backend
cp apps/api/.env.example apps/api/.env
# Edit .env with your database credentials

# Frontend
cp apps/web/.env.example apps/web/.env
```

4. **Start services**

```bash
# Backend (Terminal 1)
cd apps/api
npm run dev

# Frontend (Terminal 2)
cd apps/web
npm run dev
```

Backend runs on `http://localhost:5000`
Frontend runs on `http://localhost:5173`

### Local Development with Docker

```bash
docker-compose up
```

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MySQL: localhost:3306

## 🗄️ Database Schema

### Tables
- **users** - User accounts with authentication
- **portfolios** - User portfolio configurations
- **projects** - Portfolio projects/work samples
- **skills** - Technical skills
- **experiences** - Work experiences
- **templates** - Portfolio templates
- **uploads** - File uploads (images, PDFs)
- **sessions** - Active sessions tracking

## 🔐 Authentication

JWT-based authentication with Bearer tokens:

1. User registers with email/username/password
2. Password hashed with bcryptjs
3. Login returns JWT token (7-day expiration)
4. Token stored in localStorage
5. Token sent in Authorization header for protected routes

Protected routes check token in `Authorization: Bearer <token>`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Get JWT token
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/me` - Update profile (protected)

### Portfolios
- `GET /api/portfolios` - Get my portfolio (protected)
- `GET /api/portfolios/:slug` - Get public portfolio
- `PUT /api/portfolios` - Update portfolio (protected)

### Projects
- `GET /api/projects/portfolio/:portfolioId` - Get projects
- `GET /api/projects` - Get my projects (protected)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:projectId` - Update project (protected)
- `DELETE /api/projects/:projectId` - Delete project (protected)

### Skills
- `GET /api/skills` - Get my skills (protected)
- `POST /api/skills` - Create skill (protected)
- `PUT /api/skills/:skillId` - Update skill (protected)
- `DELETE /api/skills/:skillId` - Delete skill (protected)

### Experiences
- `GET /api/experiences` - Get my experiences (protected)
- `POST /api/experiences` - Create experience (protected)
- `PUT /api/experiences/:experienceId` - Update experience (protected)
- `DELETE /api/experiences/:experienceId` - Delete experience (protected)

### Templates
- `GET /api/templates` - Get all public templates
- `GET /api/templates/:id` - Get template by ID
- `GET /api/templates/slug/:slug` - Get template by slug

## 🎨 Frontend Pages

- **Home** (`/`) - Landing page with feature overview
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration
- **Dashboard** (`/dashboard`) - Creator dashboard (protected)
- **Builder** (`/builder`) - Portfolio builder/editor (protected)
- **Explore** (`/explore`) - Browse public portfolios
- **Portfolio Public** (`/p/:slug`) - Public portfolio view

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MySQL 8.0
- **Authentication**: JWT + bcryptjs
- **CORS**: cors middleware

### Frontend
- **Framework**: React 18
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP**: Fetch API with custom http wrapper

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (production frontend)

## 🔄 API Response Format

All API responses follow consistent format:

```json
{
  "ok": true,
  "data": { /* response data */ }
}
```

Error responses:
```json
{
  "ok": false,
  "error": "Error message"
}
```

## 🚢 Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set environment: `VITE_API_URL=https://your-api-domain.com/api`
3. Deploy automatically on push to main

### Backend (Render)

1. Connect GitHub repository to Render
2. Set environment variables:
   - `NODE_ENV=production`
   - `DB_HOST` (your MySQL host)
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `JWT_SECRET` (strong secret)
3. Deploy automatically on push to main

## 📝 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=camsite

JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

MAX_UPLOAD_SIZE=5242880
UPLOAD_DIR=./uploads
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

Run API health check:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"ok":true,"timestamp":"2024-01-01T12:00:00.000Z"}
```

## 📊 File Limits

- Maximum upload: 5MB
- Supported formats: JPEG, PNG, WebP, PDF

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS protection
- Input validation
- SQL injection prevention with parameterized queries
- Owner verification for sensitive operations
- Automatic token expiration (7 days)

## 📚 Development Tips

### Adding a new API endpoint:

1. Create repository function in `modules/{feature}/{feature}.repository.js`
2. Create controller function in `modules/{feature}/{feature}.controller.js`
3. Define routes in `modules/{feature}/{feature}.routes.js`
4. Import and register routes in `app.js`

### Database migrations:

Edit `schema.sql` and run against database:
```bash
mysql -u root -p camsite < apps/api/src/db/schema.sql
```

## 🐛 Debugging

Check backend logs:
```bash
npm run dev  # Shows all console output
```

Check frontend in browser DevTools:
- Inspect Network tab for API calls
- Check Application → Storage → Local Storage for JWT token

## 📞 Support

For issues or questions, check:
1. `.env` configuration
2. Database connection
3. API endpoint paths
4. JWT token validity
5. CORS settings

## 📄 License

MIT License - feel free to use for personal or commercial projects

---

**Built with ❤️ for creators**
