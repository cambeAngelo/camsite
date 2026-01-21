# Camsite - Quick Setup Guide

## ✅ What's Included

Your camsite portfolio builder is **100% complete** with all features working:

### ✨ Backend (Express API)
- ✅ Authentication (register, login, JWT)
- ✅ Portfolio management (CRUD + publish)
- ✅ Projects management
- ✅ Skills management
- ✅ Work experiences
- ✅ Portfolio templates
- ✅ Database with 8 tables
- ✅ Error handling middleware
- ✅ JWT authorization

### 🎨 Frontend (React + Vite)
- ✅ Home page with feature overview
- ✅ User registration
- ✅ User login
- ✅ Creator dashboard
- ✅ Portfolio builder
- ✅ Public portfolio view
- ✅ Portfolio explorer
- ✅ Protected routes
- ✅ API integration

### 🗄️ Database
- ✅ MySQL schema with 8 tables
- ✅ Proper relationships and constraints
- ✅ Indexes for performance

### 🐳 DevOps
- ✅ Docker configuration
- ✅ Docker Compose for local dev
- ✅ Production Dockerfiles

---

## 🚀 Getting Started

### Option 1: Docker (Recommended for Windows)

1. **Install Docker Desktop** (if not already installed)
   - Download from https://www.docker.com/products/docker-desktop

2. **Start the application**
```powershell
cd c:\Users\PC\Desktop\CambePortfolio
docker-compose up
```

3. **Access the app**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - Database: localhost:3306

### Option 2: Manual Setup

#### Step 1: Install MySQL
- Download MySQL Server 8.0 from https://dev.mysql.com/downloads/mysql/
- During installation, remember your password

#### Step 2: Create Database
```cmd
mysql -u root -p
```
Then in MySQL shell:
```sql
CREATE DATABASE camsite;
USE camsite;
source C:\Users\PC\Desktop\CambePortfolio\apps\api\src\db\schema.sql
```

#### Step 3: Setup Backend

```powershell
cd C:\Users\PC\Desktop\CambePortfolio\apps\api
cp .env.example .env
```

Edit `.env` with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
```

Install and run:
```powershell
npm install
npm run dev
```

#### Step 4: Setup Frontend

```powershell
cd C:\Users\PC\Desktop\CambePortfolio\apps\web
npm install
npm run dev
```

---

## 🎯 Testing the App

### 1. Create Account
- Go to http://localhost:5173/register
- Fill in email, username, password
- Click "Create Account"

### 2. Build Portfolio
- Click "Dashboard" in navigation
- Click "Create Portfolio"
- Click "Edit Portfolio" button
- Customize title, theme, colors
- Publish when ready

### 3. Add Projects
- In Dashboard, click "+ Add Project"
- Fill in project details
- See projects in your portfolio

### 4. View Public Portfolio
- From dashboard, click "View Portfolio" button
- Get shareable link: `http://localhost:5173/p/your-username`

### 5. Explore Portfolios
- Go to http://localhost:5173/explore
- Browse public portfolios

---

## 📝 Default Credentials (Development)

After creating your account:
- Frontend URL: `http://localhost:5173`
- Backend URL: `http://localhost:5000`
- Database: `camsite`

---

## 🔧 Important Files to Know

### Backend
- **Server**: `apps/api/src/server.js`
- **Routes**: `apps/api/src/modules/*/**.routes.js`
- **Database**: `apps/api/src/db/pool.js`
- **Auth**: `apps/api/src/modules/auth/`

### Frontend
- **Pages**: `apps/web/src/pages/`
- **API Client**: `apps/web/src/services/api.js`
- **Routing**: `apps/web/src/App.tsx`
- **Styles**: Tailwind CSS (configured in `tailwind.config.js`)

---

## 🚀 Deployment

### Deploy Backend (Render)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables from `.env`
4. Deploy

### Deploy Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set `VITE_API_URL` to your backend URL
4. Deploy

---

## ✋ Troubleshooting

### Port 5173 already in use?
```powershell
# Find process using port 5173
netstat -ano | findstr :5173
# Kill process (replace PID with the number shown)
taskkill /PID <PID> /F
```

### MySQL connection failed?
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database `camsite` exists
- Run schema.sql again

### API not responding?
- Check backend is running: `npm run dev` in `apps/api`
- Check port 5000 is not in use
- Check `.env` file exists

### Frontend won't load?
- Check Vite is running: `npm run dev` in `apps/web`
- Clear browser cache (Ctrl+Shift+Delete)
- Check API_URL in environment

---

## 📚 Project Structure

```
camsite/
├── apps/
│   ├── api/          # Express backend (port 5000)
│   └── web/          # React frontend (port 5173)
├── packages/
│   └── shared/       # Shared utilities & types
└── docker-compose.yml
```

---

## 🎓 Next Steps

1. ✅ **Customization**: Edit themes, colors in builder
2. ✅ **Content**: Add your projects, skills, experiences
3. ✅ **Publish**: Make portfolio public
4. ✅ **Share**: Share unique portfolio URL
5. ✅ **Deploy**: Push to Vercel/Render for production

---

## 🆘 Quick Fixes

### Clear JWT Token (if stuck on login)
In browser console:
```javascript
localStorage.removeItem('token');
```

### Reset Database
```sql
DROP DATABASE camsite;
CREATE DATABASE camsite;
USE camsite;
source C:\Users\PC\Desktop\CambePortfolio\apps\api\src\db\schema.sql
```

### Restart Everything
```powershell
docker-compose down
docker-compose up --build
```

---

## 📞 Need Help?

1. Check all `.env` files are properly configured
2. Verify MySQL is running
3. Check terminal output for error messages
4. Ensure all ports (5000, 5173, 3306) are available

---

**Your camsite is ready to go! 🎉**

Start with Docker Compose for fastest setup:
```powershell
docker-compose up
```

Then visit http://localhost:5173 to begin!
