# GreetFlow - Windows Setup Guide

## Quick Setup (Recommended)

### 1. Run the Setup Script

```bash
setup.bat
```

This will automatically:
- ✅ Create MongoDB data directory (C:\data\db)
- ✅ Check MongoDB installation
- ✅ Start MongoDB server
- ✅ Install server dependencies
- ✅ Seed the database
- ✅ Install client dependencies

### 2. Configure Firebase

The Firebase config is already in `client/.env`. You just need to:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **classplus-d039b**
3. Enable **Authentication**:
   - Click Authentication → Sign-in method
   - Enable **Google** provider
   - Enable **Email/Password** provider
   - Enable **Anonymous** provider
4. Enable **Storage**:
   - Click Storage → Get Started
   - Use test mode for development

### 3. Start the Application

```bash
start.bat
```

This will:
- ✅ Start MongoDB (if not running)
- ✅ Start backend server (port 5000)
- ✅ Start frontend dev server (port 5173)

### 4. Open in Browser

Navigate to: **http://localhost:5173**

---

## Manual Setup (Alternative)

### Step 1: Create MongoDB Directory

```bash
mkdir C:\data\db
```

### Step 2: Start MongoDB

Open a new terminal and run:
```bash
mongod
```

Keep this terminal open.

### Step 3: Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### Step 4: Seed Database

```bash
cd server
npm run seed
```

You should see: `Seeded 12 templates successfully`

### Step 5: Start Backend

Open a new terminal:
```bash
cd server
npm start
```

Server runs on: http://localhost:5000

### Step 6: Start Frontend

Open another terminal:
```bash
cd client
npm run dev
```

Frontend runs on: http://localhost:5173

---

## Troubleshooting

### MongoDB Error: "Data directory not found"

**Solution:**
```bash
mkdir C:\data\db
```

Then restart MongoDB.

### MongoDB Error: "Address already in use"

MongoDB is already running. Check with:
```bash
tasklist | findstr mongod
```

To stop it:
```bash
taskkill /IM mongod.exe /F
```

### Port 5000 Already in Use

**Find what's using the port:**
```bash
netstat -ano | findstr :5000
```

**Kill the process:**
```bash
taskkill /PID <PID> /F
```

### Port 5173 Already in Use

**Find what's using the port:**
```bash
netstat -ano | findstr :5173
```

**Kill the process:**
```bash
taskkill /PID <PID> /F
```

### Firebase Authentication Not Working

1. Check Firebase Console → Authentication → Sign-in method
2. Ensure providers are enabled
3. Check that localhost is in authorized domains
4. Verify .env file has correct Firebase config

### Templates Not Loading

1. Ensure MongoDB is running
2. Check that database was seeded: `cd server && npm run seed`
3. Verify backend is running on port 5000
4. Check browser console for errors

---

## Firebase Configuration Checklist

Your Firebase project: **classplus-d039b**

### Authentication Setup

1. Go to: https://console.firebase.google.com/project/classplus-d039b/authentication
2. Click **Sign-in method** tab
3. Enable these providers:

   **Google:**
   - Click Google → Enable
   - Add support email
   - Save

   **Email/Password:**
   - Click Email/Password → Enable
   - Save

   **Anonymous:**
   - Click Anonymous → Enable
   - Save

### Storage Setup

1. Go to: https://console.firebase.google.com/project/classplus-d039b/storage
2. Click **Get Started**
3. Choose **Start in test mode** (for development)
4. Click **Next** → **Done**

### Verify Authorized Domains

1. Go to Authentication → Settings → Authorized domains
2. Ensure these are listed:
   - localhost
   - classplus-d039b.firebaseapp.com

---

## Testing the Application

### 1. Login Flow

- Open http://localhost:5173
- Click "Continue with Google"
- Sign in with your Google account
- Should redirect to profile setup

### 2. Profile Setup

- Enter your name
- Upload a profile picture
- Click "Save & Continue"
- Should redirect to home page

### 3. Browse Templates

- See trending templates at top
- Filter by category
- Click on a free template
- Personalization sheet opens

### 4. Share Greeting

- Click "Share Greeting" button
- Choose share method or download
- PNG file is created with your overlay

### 5. Premium Flow

- Click on a premium template (with lock icon)
- Premium dialog opens
- Click "Subscribe Now"
- Premium status activated
- All templates unlocked

---

## Quick Commands

```bash
# Setup everything
setup.bat

# Start application
start.bat

# Seed database
cd server && npm run seed

# Start backend only
cd server && npm start

# Start frontend only
cd client && npm run dev

# Build for production
cd client && npm run build
```

---

## Environment Variables

### Client (.env in client/ folder)

Already configured ✅:
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=AIzaSyAb5fjwVlA18a-wfa5Xhg66pynyrBwbmRY
VITE_FIREBASE_AUTH_DOMAIN=classplus-d039b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=classplus-d039b
VITE_FIREBASE_STORAGE_BUCKET=classplus-d039b.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=888562579286
VITE_FIREBASE_APP_ID=1:888562579286:web:9ebce8ace4b463f03a88f7
```

### Server (.env in server/ folder)

Already configured ✅:
```env
MONGODB_URI=mongodb://localhost:27017/greetflow
PORT=5000
```

---

## Next Steps After Setup

1. ✅ Run `setup.bat` to complete first-time setup
2. ✅ Enable Firebase Authentication providers
3. ✅ Enable Firebase Storage
4. ✅ Run `start.bat` to launch the app
5. ✅ Open http://localhost:5173 and test!

---

**Need Help?** Check the main README.md or SETUP_GUIDE.md for more details.
