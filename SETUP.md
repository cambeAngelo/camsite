# SETUP GUIDE - Cambe Portfolio

This guide will help you set up and run the fully refactored Cambe Portfolio application.

## Prerequisites

- **Node.js** 18+ and npm
- **MySQL** 8.0+ (running locally or remote)
- **Git** (optional, for version control)

## Quick Start

### 1. Database Setup

Create the MySQL database and tables:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL,
  subject VARCHAR(150),
  message LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your database credentials
echo "PORT=5000
CLIENT_ORIGIN=http://localhost:5173
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio" > .env

# Test the connection (optional)
npm run dev

# Keep this terminal open - server runs on http://localhost:5000
```

**Server will be ready at:** `http://localhost:5000`

### 3. Client Setup (New Terminal)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Client runs on http://localhost:5173
```

**Client will be ready at:** `http://localhost:5173`

Now you should be able to access the application at `http://localhost:5173` and submit contact forms!

## Testing the Application

### 1. Check Server Health
```bash
curl http://localhost:5000/api/health
# Expected response: { "ok": true }
```

### 2. Test Database Connection
```bash
curl http://localhost:5000/api/db-check
# Expected response: { "ok": true, "now": "2024-..." }
```

### 3. Test Contact Form
1. Open http://localhost:5173 in browser
2. Fill in the contact form
3. Click "Send message"
4. Confirm in the modal
5. Should see success message

### 4. Verify Database
```bash
mysql -u root -p portfolio
SELECT * FROM contact_messages;
```

## Project Structure Overview

```
CambePortfolio/
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── components/   # React components (ui, sections)
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks (useContactForm)
│   │   ├── services/     # API services
│   │   ├── utils/        # Helper functions
│   │   ├── App.tsx       # Main component
│   │   └── main.tsx      # Entry point
│   └── package.json
│
├── server/               # Node.js + Express backend
│   ├── src/
│   │   ├── modules/      # Feature modules (contact/)
│   │   ├── config/       # Configuration (env, db)
│   │   ├── middlewares/  # Express middlewares
│   │   ├── utils/        # Helper functions
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # Server entry point
│   ├── package.json
│   └── .env
│
├── shared/               # Shared types and contracts
│   ├── contact.contract.js      # API contract constants
│   ├── contact.contract.d.ts    # TypeScript definitions
│   └── index.js
│
└── README.md             # Full documentation
```

## Available Scripts

### Client
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Server
```bash
npm run dev       # Start with nodemon (auto-reload)
npm start         # Start production server
```

## API Endpoints

### Health Checks
- `GET /api/health` - Server status
- `GET /api/db-check` - Database connection status

### Contact API
- `POST /api/contact` - Submit contact form

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to work with you..."
}
```

**Success response (201):**
```json
{
  "ok": true,
  "message": "Message received",
  "id": 1
}
```

**Error response (400/500):**
```json
{
  "ok": false,
  "errors": ["Name must be 2–100 characters"],
  "error": "Internal server error"
}
```

## Validation Rules

| Field | Rules | Notes |
|-------|-------|-------|
| name | 2-100 chars | Required |
| email | Valid email, max 190 chars | Required |
| subject | Max 150 chars | Optional |
| message | Min 10 chars | Required |

## Troubleshooting

### Client won't connect to server
1. Check server is running on `http://localhost:5000`
2. Check `CLIENT_ORIGIN` in server `.env` matches client URL
3. Check CORS is enabled in server (should be by default)

### Database connection fails
1. Verify MySQL is running
2. Check credentials in `.env` file
3. Verify database exists: `CREATE DATABASE portfolio;`
4. Test connection: `npm run dev` should show success in console

### Port already in use
```bash
# Find process using port 5000
lsof -i :5000

# Find process using port 5173
lsof -i :5173

# Kill process
kill -9 <PID>
```

### Modules not found errors
1. Ensure all files are in correct locations
2. Check import statements use `.js` extensions
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Development Workflow

### Adding a New Feature

1. **Create module in server:**
   ```
   server/src/modules/[feature]/
   ├── [feature].routes.js
   ├── [feature].controller.js
   ├── [feature].service.js
   ├── [feature].repository.js
   ├── [feature].validator.js
   └── [feature].schema.js
   ```

2. **Import routes in server:**
   Edit `server/src/routes/index.js` to include new module routes

3. **Create client service:**
   Add API call in `client/src/services/[feature].service.ts`

4. **Create components:**
   Add React components in `client/src/components/sections/` or `client/src/components/ui/`

5. **Update shared types:**
   Add TypeScript definitions in `shared/contact.contract.d.ts`

## Environment Variables

### Server (.env)
```env
# Server port
PORT=5000

# Frontend CORS origin
CLIENT_ORIGIN=http://localhost:5173

# Database credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=portfolio
```

### Client
Uses relative API paths configured in `src/services/api.ts`. No env vars needed.

## Production Deployment

### Client
```bash
npm run build
# Deploy dist/ folder to hosting (Vercel, Netlify, etc.)
```

### Server
```bash
# Set environment variables on hosting
PORT=5000
CLIENT_ORIGIN=https://your-domain.com
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-password
DB_NAME=portfolio

# Start server
npm start
```

## Support

For issues or questions:
1. Check the main [README.md](./README.md)
2. Review error messages carefully
3. Check server logs: `npm run dev`
4. Verify database tables exist

---

**Last Updated:** January 2025
**Application Status:** Production Ready ✓
