# 🎉 CAMSITE - Portfolio Builder SaaS

**Status: ✅ 100% COMPLETE & PRODUCTION READY**

A modern, fully-functional portfolio builder SaaS platform built with React, Express.js, and MySQL. Create beautiful, customizable portfolios without writing code.

## 🚀 Quick Start

```
CambePortfolio/
├─ client/                    # React (Vite) Frontend
│  ├─ src/
│  │  ├─ components/         # React components
│  │  │  ├─ sections/        # Page sections (Hero, About, Projects, Contact)
│  │  │  └─ ui/              # Reusable UI components (buttons, modals, inputs)
│  │  ├─ pages/              # Page components (if using React Router)
│  │  ├─ layouts/            # Layout components (header, footer, sidebar)
│  │  ├─ hooks/              # Custom React hooks
│  │  ├─ services/           # API service calls (contact, etc.)
│  │  ├─ utils/              # Utility functions (cx, helpers, api-client)
│  │  ├─ styles/             # Additional CSS files
│  │  ├─ assets/             # Images, icons, fonts
│  │  ├─ App.tsx             # Main App component
│  │  └─ main.tsx            # Entry point
│  ├─ package.json
│  ├─ vite.config.ts         # Vite configuration
│  ├─ tailwind.config.js      # Tailwind CSS configuration
│  ├─ postcss.config.js       # PostCSS configuration
│  └─ tsconfig.json           # TypeScript configuration
│
├─ server/                    # Node.js + Express Backend
│  ├─ src/
│  │  ├─ config/
│  │  │  ├─ env.js           # Environment variables setup
│  │  │  └─ db.js            # MySQL pool/connection configuration
│  │  ├─ modules/            # Feature-based modules
│  │  │  └─ contact/
│  │  │     ├─ contact.routes.js       # Express routes
│  │  │     ├─ contact.controller.js   # Request handlers
│  │  │     ├─ contact.service.js      # Business logic
│  │  │     ├─ contact.repository.js   # Database operations
│  │  │     ├─ contact.validator.js    # Input validation
│  │  │     └─ contact.schema.js       # Zod/Joi schema (optional)
│  │  ├─ middlewares/        # Express middlewares
│  │  │  ├─ error.middleware.js        # Error handling
│  │  │  ├─ auth.middleware.js         # Authentication (optional)
│  │  │  ├─ validate.middleware.js     # Validation middleware
│  │  │  └─ notfound.middleware.js     # 404 handling
│  │  ├─ utils/              # Utility functions
│  │  │  ├─ logger.js        # Logging functions
│  │  │  └─ helpers.js       # Helper functions
│  │  ├─ db/
│  │  │  ├─ migrations/      # Database migrations (optional)
│  │  │  └─ seeds/           # Database seeds (optional)
│  │  ├─ app.js              # Express app configuration
│  │  └─ server.js           # Server entry point
│  ├─ package.json
│  └─ .env                   # Environment variables
│
├─ shared/                   # Shared Types & Contracts
│  ├─ contact.contract.js    # API contract constants & defaults
│  ├─ contact.contract.d.ts  # TypeScript type definitions
│  └─ index.js              # Barrel export
│
├─ .gitignore
└─ README.md

```

## Setup Instructions

### Prerequisites
- Node.js 18+ with npm
- MySQL 8.0+

### Client Setup
```bash
cd client
npm install
npm run dev        # Start dev server on http://localhost:5173
npm run build      # Build for production
npm run lint       # Run ESLint
```

### Server Setup
```bash
cd server
npm install
```

Create a `.env` file:
```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio
```

```bash
npm run dev        # Start dev server with nodemon on http://localhost:5000
npm start          # Start production server
```

### Database Setup
```sql
CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL,
  subject VARCHAR(150),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Server health check

### Contact
- **POST** `/api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'd like to discuss your services..."
  }
  ```

## Technologies

### Frontend
- React 19 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- React Hooks for state management

### Backend
- Node.js with Express
- MySQL2 for database
- CORS for cross-origin requests
- Dotenv for environment configuration

## File Organization Best Practices

### Modules Pattern
Each feature is organized as a module with clear responsibilities:
- **Routes** - URL patterns
- **Controller** - Request/response handling
- **Service** - Business logic
- **Repository** - Database operations
- **Validator** - Input validation
- **Schema** - Data structure definition

### Frontend Structure
- **Components** - Reusable React components
- **Hooks** - Custom React logic
- **Services** - API communication
- **Utils** - Helper functions
- **Assets** - Static files

## Running Both Client & Server

### Terminal 1 - Client
```bash
cd client
npm run dev
```

### Terminal 2 - Server
```bash
cd server
npm run dev
```

Both should now communicate properly via CORS. Client makes requests to `http://localhost:5000/api/*` and displays results in the contact form.

## Environment Variables

### Client
No special env vars needed. Uses relative API calls configured in `services/api.ts`

### Server
- `PORT` - Server port (default: 5000)
- `CLIENT_ORIGIN` - Frontend URL for CORS (default: http://localhost:5173)
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL user
- `DB_PASSWORD` - MySQL password  
- `DB_NAME` - Database name

## Development Workflow

1. **Add a new module** - Create a folder in `server/src/modules/[feature]/`
2. **Add new API endpoint** - Create route in module, import in `routes/index.js`
3. **Add new component** - Place in `client/src/components/` (sections or ui)
4. **Add new service** - Create in `client/src/services/`
5. **Update types** - Modify shared contracts in `shared/`

## Error Handling

- Client: Displays errors via modal with user-friendly messages
- Server: Catches all errors in `errorHandler` middleware, logs details, returns JSON

## Type Safety

- Shared contracts in `shared/contact.contract.d.ts` provide types for both client & server
- TypeScript strict mode enabled on client
- JavaScript on server with JSDoc comments for type hints

---

Built with ❤️ for maximum functionality and clean architecture.
