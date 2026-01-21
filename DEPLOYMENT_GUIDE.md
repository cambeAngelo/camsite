# 🚀 Camsite Deployment Guide

## Deployment Overview

camsite is ready to deploy to production using:
- **Frontend**: Vercel (recommended)
- **Backend**: Render or Railway
- **Database**: Managed MySQL (AWS RDS, PlanetScale, or similar)

---

## 📋 Pre-Deployment Checklist

- ✅ All code tested locally
- ✅ Environment variables configured
- ✅ Database migrations completed
- ✅ Git repository created and pushed
- ✅ Security secrets set
- ✅ Domain names ready (optional)

---

## 🎨 Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click "New Project"
2. Select your GitHub repository
3. Choose "Single Monorepo" if asked about structure
4. Set Project Root to `apps/web`

### Step 3: Environment Variables
Add these in Vercel Project Settings → Environment Variables:
```
VITE_API_URL=https://your-api-domain.com/api
```

(Replace `your-api-domain.com` with your backend domain)

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build and deployment
3. Your frontend is now live!

### Subsequent Deployments
- Automatic on every push to `main` branch
- Manual redeploy available in Vercel dashboard

---

## 🔧 Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account

### Step 2: Create New Web Service
1. Click "New Web Service"
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Set Root Directory: `apps/api`

### Step 3: Configure Environment Variables
Add in Render Environment Settings:
```
NODE_ENV=production
PORT=5000

DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=camsite

JWT_SECRET=generate-a-strong-random-string-here
JWT_EXPIRES_IN=7d

MAX_UPLOAD_SIZE=5242880
UPLOAD_DIR=./uploads
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf

CLIENT_ORIGIN=https://your-frontend-domain.com
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Get your API URL from Render dashboard

### Important: Update Frontend
After backend is deployed, update frontend's `VITE_API_URL` in Vercel:
```
VITE_API_URL=https://your-api-domain-on-render.com/api
```

---

## 🗄️ Database Setup

### Option 1: AWS RDS (Recommended for Production)

1. **Create RDS Instance**
   - AWS Console → RDS → Create Database
   - MySQL Engine 8.0
   - Storage: 20GB (free tier compatible)
   - Master username: `admin`
   - Generate strong password

2. **Security Groups**
   - Allow inbound on port 3306
   - Allow from your application server IP

3. **Connect and Setup**
   ```sql
   -- Connect via MySQL Workbench or CLI
   mysql -h your-rds-endpoint.rds.amazonaws.com -u admin -p
   
   CREATE DATABASE camsite;
   USE camsite;
   source schema.sql;
   ```

4. **Get Connection String**
   ```
   DB_HOST=your-rds-endpoint.rds.amazonaws.com
   DB_USER=admin
   DB_PASSWORD=your-generated-password
   DB_NAME=camsite
   ```

### Option 2: PlanetScale (MySQL Alternative)

1. Go to https://planetscale.com
2. Create account and organization
3. Create new MySQL database
4. Get connection credentials
5. Run schema.sql via MySQL CLI with provided credentials

### Option 3: DigitalOcean Managed Database

1. Create DigitalOcean account
2. Create Managed MySQL database
3. Add trusted sources (your IP)
4. Get connection details
5. Run schema.sql

---

## 🔒 Environment Variables for Production

### Backend (.env or environment settings)
```env
# Server
NODE_ENV=production
PORT=5000

# Database (from your managed service)
DB_HOST=your-database-host.com
DB_USER=your-user
DB_PASSWORD=your-strong-password
DB_NAME=camsite

# JWT (Generate a strong secret!)
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d

# CORS
CLIENT_ORIGIN=https://your-vercel-domain.com

# Upload
MAX_UPLOAD_SIZE=5242880
UPLOAD_DIR=./uploads
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
```

### Frontend (.env or Vercel variables)
```env
VITE_API_URL=https://your-render-backend.com/api
```

---

## 📊 Monitoring & Maintenance

### Monitor Backend (Render)
- Dashboard shows CPU, memory, logs
- Alerts for errors (optional)
- Automatic restarts on crash

### Monitor Frontend (Vercel)
- Analytics in Vercel dashboard
- Performance metrics
- Build logs

### Monitor Database
- Use managed service console
- Set up automated backups
- Monitor storage and connections

---

## 🔄 Deployment Workflow

### Making Updates

1. **Local Development**
   ```bash
   git checkout -b feature-name
   # Make changes
   npm run dev  # Test locally
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin feature-name
   # Create Pull Request
   # Get approval
   # Merge to main
   ```

3. **Automatic Deployment**
   - Frontend deploys automatically on Vercel (1-2 min)
   - Backend deploys automatically on Render (2-5 min)

4. **Verify Production**
   - Visit frontend URL
   - Test login/register
   - Check API in browser DevTools

---

## 🐛 Troubleshooting Deployments

### Frontend Build Fails
- Check Node version (>= 18)
- Verify all imports have `.js` extensions
- Check `vite.config.ts` configuration
- Review build logs in Vercel

### Backend Won't Start
- Check database connection
- Verify all environment variables
- Check logs in Render dashboard
- Ensure npm dependencies installed

### Database Connection Error
- Verify credentials are correct
- Check firewall/security groups
- Ensure database exists
- Verify schema is loaded

### API 500 Errors
- Check backend logs
- Verify database connection
- Check environment variables
- Review error middleware output

---

## 📈 Scaling Considerations

As you grow:

1. **Database**
   - Monitor storage usage
   - Set up automatic backups
   - Consider read replicas for scaling

2. **Backend**
   - Monitor CPU/memory
   - Implement caching (Redis optional)
   - Use database connection pooling

3. **Frontend**
   - Use CDN (built-in with Vercel)
   - Optimize images
   - Monitor bundle size

---

## 🔐 Security Checklist for Production

- ✅ Strong JWT_SECRET (min 32 characters)
- ✅ HTTPS enforced (automatic on Vercel/Render)
- ✅ Database credentials in environment variables (not in code)
- ✅ Firewall rules on database
- ✅ CORS origin set to your domain only
- ✅ Backups enabled on database
- ✅ Monitoring and alerts configured
- ✅ Rate limiting considered (add in future)

---

## 💾 Backup Strategy

1. **Database Backups**
   - Automated daily backups (24-30 day retention)
   - Test restore procedure monthly

2. **Code Backups**
   - Git repository is your backup
   - Multiple branches available
   - Can rollback to any commit

3. **File Uploads**
   - Store in cloud storage (S3, future enhancement)
   - Replicate across regions

---

## 🚨 Incident Response

### Frontend Down
1. Check Vercel dashboard
2. Check build logs
3. Rollback previous deployment if needed
4. Contact Vercel support if issue persists

### Backend Down
1. Check Render dashboard
2. Check application logs
3. Restart service
4. Check database connection
5. Check environment variables

### Database Down
1. Check managed service console
2. Check storage limits
3. Restore from backup if corrupted
4. Contact database provider support

---

## 📱 Post-Deployment

### Share Your Site
```
Frontend: https://your-vercel-domain.com
Public Portfolio: https://your-domain.com/p/username
Explorer: https://your-domain.com/explore
```

### Analytics Setup (Optional)
- Add Google Analytics to frontend
- Enable Vercel Analytics
- Monitor Render metrics

### Domain Setup (Optional)
1. Purchase domain (Namecheap, GoDaddy, etc)
2. Connect to Vercel for frontend
3. Add custom domain in Render for backend
4. Setup SSL certificates (automatic)

---

## 🎓 Next Steps After Deployment

1. Test all features in production
2. Set up monitoring and alerts
3. Plan backup schedule
4. Document deployment process
5. Train team on deployment
6. Monitor metrics daily first week
7. Celebrate 🎉

---

## 📞 Support Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MySQL Docs: https://dev.mysql.com/doc/
- Express.js Docs: https://expressjs.com/
- React Docs: https://react.dev/

---

**Your camsite is production-ready!**

Deploy with confidence knowing all components are tested, secure, and scalable.
