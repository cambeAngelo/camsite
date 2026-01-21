# QUICK REFERENCE GUIDE

## Start Development Immediately

### Terminal 1: Server
```bash
cd server
npm install
echo "PORT=5000
CLIENT_ORIGIN=http://localhost:5173
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio" > .env
npm run dev
```

### Terminal 2: Client  
```bash
cd client
npm install
npm run dev
```

### Browser
```
Open: http://localhost:5173
```

---

## Database Setup (One-Time)

```sql
mysql -u root -p

CREATE DATABASE portfolio;
USE portfolio;

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL,
  subject VARCHAR(150),
  message LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```

---

## Project Structure Map

```
src/                          Root TypeScript/JavaScript
├── components/               React Components
│   ├── sections/            Page sections (Contact, etc)
│   └── ui/                  Reusable UI (modals, buttons)
├── pages/                    Page components (for routing)
├── layouts/                  Layout wrappers
├── hooks/                    Custom React hooks
├── services/                 API services
├── utils/                    Helper functions
├── styles/                   CSS files
├── assets/                   Images, icons
├── App.tsx                   Main component
└── main.tsx                  Entry point

(Same structure pattern for both client and server)
```

---

## API Endpoints

```
GET  /api/health              → Server is alive
GET  /api/db-check            → Database connection OK
POST /api/contact             → Submit contact form
```

---

## Common Commands

### Development
```bash
# Client
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Build for production
npm run lint      # Run ESLint

# Server
npm run dev       # Start with auto-reload (http://localhost:5000)
npm start         # Start production
```

### Testing
```bash
# Server health
curl http://localhost:5000/api/health

# Database connection
curl http://localhost:5000/api/db-check

# Contact submission
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Hello"
  }'
```

---

## File Locations for Quick Access

### Frontend Files
| File | Path |
|------|------|
| Main App | `client/src/App.tsx` |
| Entry | `client/src/main.tsx` |
| Contact Form | `client/src/components/sections/ContactForm.tsx` |
| Modals | `client/src/components/ui/` |
| Hooks | `client/src/hooks/useContactForm.ts` |
| Services | `client/src/services/` |
| Config | `client/tsconfig.json`, `vite.config.ts` |

### Backend Files
| File | Path |
|------|------|
| Server Start | `server/src/server.js` |
| App Setup | `server/src/app.js` |
| DB Config | `server/src/config/db.js` |
| Routes | `server/src/routes/index.js` |
| Contact Module | `server/src/modules/contact/` |
| Middlewares | `server/src/middlewares/` |
| Config | `server/.env`, `server/package.json` |

### Database
| Item | Command |
|------|---------|
| Connect | `mysql -u root -p` |
| Use DB | `USE portfolio;` |
| Show messages | `SELECT * FROM contact_messages;` |
| Clear table | `DELETE FROM contact_messages;` |

---

## Error Checklist

**Client won't load?**
- [ ] Is server running on port 5000?
- [ ] Is CORS enabled? (should be)
- [ ] Check browser console for errors
- [ ] Check terminal for build errors

**Contact form fails to send?**
- [ ] Is server running?
- [ ] Check .env credentials
- [ ] Is MySQL running?
- [ ] Check network tab for API error
- [ ] Check server console for errors

**Database errors?**
- [ ] Is MySQL running?
- [ ] Check DB credentials in .env
- [ ] Verify database exists: `CREATE DATABASE portfolio;`
- [ ] Verify table exists: `DESC contact_messages;`

---

## Key Files to Know

**Essential Client Files:**
1. `client/src/App.tsx` - Main app component
2. `client/src/components/sections/ContactForm.tsx` - Form UI
3. `client/src/hooks/useContactForm.ts` - Form logic
4. `client/src/services/contact.service.ts` - API integration

**Essential Server Files:**
1. `server/src/server.js` - Start here
2. `server/src/app.js` - Express config
3. `server/src/modules/contact/` - Contact feature
4. `server/src/config/db.js` - Database pool

**Important Config:**
1. `server/.env` - Database credentials
2. `client/vite.config.ts` - Build config
3. `server/package.json` - Dependencies
4. `client/package.json` - Dependencies

---

## Deployment Checklist

**Before Deploying:**
- [ ] Update `.env` with production database
- [ ] Update `CLIENT_ORIGIN` to production URL
- [ ] Run `npm run build` on client
- [ ] Test all endpoints
- [ ] Verify database backups
- [ ] Check error logs

**Deploy Steps:**
1. Build client: `npm run build`
2. Deploy `dist/` folder to hosting
3. Deploy server with env variables
4. Set up MySQL database on hosting
5. Configure domain & SSL
6. Test all features

---

## Debugging Tips

### Client Debugging
```javascript
// Add to component
console.log("Component mounted");

// Check form state
const { form, status } = useContactForm();
console.log("Form:", form);
console.log("Status:", status);
```

### Server Debugging
```bash
# Start with verbose logging
npm run dev

# Check routes
curl http://localhost:5000/api/health

# Check database
mysql -u root -p portfolio
SHOW TABLES;
DESC contact_messages;
```

---

## Performance Tips

**Client:**
- Build optimizes automatically
- CSS is minified with Tailwind
- Components code-split by Vite

**Server:**
- Database has indexes on email and created_at
- Connection pooling enabled (max 10)
- Middleware stack efficient

---

## Documentation Links

| Document | Purpose |
|----------|---------|
| README.md | Full project documentation |
| SETUP.md | Setup and deployment guide |
| RESTRUCTURING_SUMMARY.md | What was changed and why |
| PROJECT_STATUS.md | Current project status |
| DETAILED_CHANGES_LOG.md | Line-by-line changes |
| QUICK_REFERENCE.md | This file - quick access |

---

## Support Resources

**Inside Project:**
- Check `README.md` for full documentation
- Check `SETUP.md` for setup issues
- Check `server/` or `client/` package.json for available scripts

**Online:**
- React docs: https://react.dev
- Vite docs: https://vitejs.dev
- Express docs: https://expressjs.com
- MySQL docs: https://dev.mysql.com

---

## Remember

✅ **Client:** http://localhost:5173  
✅ **Server:** http://localhost:5000  
✅ **Database:** localhost (or configured host)  
✅ **Status:** Production Ready  

Happy coding! 🚀
