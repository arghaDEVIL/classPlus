# GreetFlow Setup Checklist

Use this checklist to ensure everything is configured correctly before running the application.

## ✅ Prerequisites

- [ ] Node.js 18+ installed
- [ ] MongoDB installed and running (or MongoDB Atlas account)
- [ ] Firebase project created
- [ ] Git installed (optional)

## 🔥 Firebase Configuration

- [ ] Firebase project created at https://console.firebase.google.com/
- [ ] Authentication enabled:
  - [ ] Google sign-in provider enabled
  - [ ] Email/Password sign-in provider enabled
  - [ ] Anonymous sign-in provider enabled
- [ ] Storage enabled with test mode rules
- [ ] Firebase config values copied to `client/.env`
- [ ] Authorized domains added (localhost for development)

## 💾 MongoDB Configuration

Choose one option:

### Option A: Local MongoDB
- [ ] MongoDB installed
- [ ] MongoDB running (`mongod` command)
- [ ] Connection string in `server/.env`: `mongodb://localhost:27017/greetflow`

### Option B: MongoDB Atlas
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP address whitelisted (or 0.0.0.0/0 for development)
- [ ] Connection string copied to `server/.env`

## 📦 Dependencies

### Server
- [ ] Navigate to `server/` folder
- [ ] Run `npm install`
- [ ] All dependencies installed successfully

### Client
- [ ] Navigate to `client/` folder
- [ ] Run `npm install`
- [ ] All dependencies installed successfully

## 🌱 Database Seeding

- [ ] Navigate to `server/` folder
- [ ] Run `npm run seed`
- [ ] See "Seeded 12 templates successfully" message

## 🔐 Environment Variables

### Client (.env in client/ folder)
- [ ] `VITE_API_URL` set to `http://localhost:5000`
- [ ] `VITE_FIREBASE_API_KEY` set
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` set
- [ ] `VITE_FIREBASE_PROJECT_ID` set
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` set
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` set
- [ ] `VITE_FIREBASE_APP_ID` set

### Server (.env in server/ folder)
- [ ] `MONGODB_URI` set
- [ ] `PORT` set to `5000`

## 🚀 Running the Application

### Manual Start
- [ ] Terminal 1: `cd server && npm start`
- [ ] Backend running on http://localhost:5000
- [ ] Terminal 2: `cd client && npm run dev`
- [ ] Frontend running on http://localhost:5173

### Quick Start (Windows)
- [ ] Run `start.bat`
- [ ] Both servers start automatically

### Quick Start (Mac/Linux)
- [ ] Make script executable: `chmod +x start.sh`
- [ ] Run `./start.sh`
- [ ] Both servers start automatically

## 🧪 Testing

- [ ] Open http://localhost:5173 in browser
- [ ] Login page loads correctly
- [ ] Can sign in with Google
- [ ] Can create account with email/password
- [ ] Can continue as guest
- [ ] Profile setup page works
- [ ] Can upload profile picture
- [ ] Home page loads with templates
- [ ] Can filter by category
- [ ] Trending section displays
- [ ] Can click on free template
- [ ] Personalization sheet opens
- [ ] Can share/download greeting
- [ ] Premium templates show upgrade dialog
- [ ] Profile page displays user info
- [ ] Can log out successfully

## 🐛 Troubleshooting

### Backend won't start
- [ ] MongoDB is running
- [ ] Port 5000 is not in use
- [ ] Environment variables are correct
- [ ] Dependencies are installed

### Frontend won't start
- [ ] Port 5173 is not in use
- [ ] Dependencies are installed
- [ ] Vite config is correct

### Authentication fails
- [ ] Firebase config is correct
- [ ] Sign-in providers are enabled
- [ ] Domain is authorized in Firebase

### Templates don't load
- [ ] Backend is running
- [ ] Database is seeded
- [ ] API URL is correct in client/.env
- [ ] CORS is enabled on backend

### Image upload fails
- [ ] Firebase Storage is enabled
- [ ] Storage rules allow uploads
- [ ] Storage bucket name is correct

## 📝 Notes

- Default backend port: 5000
- Default frontend port: 5173
- Database name: greetflow
- Sample templates: 12 (5 free, 7 premium)

## ✨ Ready to Go!

Once all items are checked, your GreetFlow application is ready to use!

### Quick Commands Reference

```bash
# Seed database
cd server && npm run seed

# Start backend
cd server && npm start

# Start frontend
cd client && npm run dev

# Build for production
cd client && npm run build
```

### Default Test User Flow

1. Click "Continue with Google" or create account
2. Set display name and upload photo
3. Browse templates on home page
4. Click a free template
5. Share or download your personalized greeting
6. Try clicking a premium template to see upgrade flow

---

**Need Help?** Check SETUP_GUIDE.md for detailed instructions.
