# 🚀 Get Started with GreetFlow

## Super Quick Start (3 Steps!)

### 1️⃣ Run Setup (First Time Only)

```bash
setup.bat
```

This installs everything and sets up the database.

### 2️⃣ Enable Firebase Features

Go to [Firebase Console](https://console.firebase.google.com/project/classplus-d039b)

**Enable Authentication:**
- Click **Authentication** → **Sign-in method**
- Enable: **Google**, **Email/Password**, **Anonymous**

**Enable Storage:**
- Click **Storage** → **Get Started**
- Choose **Test mode**

### 3️⃣ Start the App

```bash
start.bat
```

Then open: **http://localhost:5173**

---

## That's It! 🎉

Your GreetFlow app is now running!

### What You Can Do:

✅ Sign in with Google or create an account  
✅ Set up your profile with name and photo  
✅ Browse greeting templates by category  
✅ Create personalized greetings with your overlay  
✅ Share or download your custom greetings  
✅ Try premium templates (mock subscription)  

---

## Need Help?

- **MongoDB not starting?** → See WINDOWS_SETUP.md
- **Firebase errors?** → Check Firebase Console settings
- **Port conflicts?** → See troubleshooting in WINDOWS_SETUP.md
- **Detailed setup?** → Read SETUP_GUIDE.md

---

## Project Structure

```
greetflow/
├── client/          # React frontend (Vite)
├── server/          # Express backend
├── setup.bat        # First-time setup ← Run this first!
├── start.bat        # Start the app ← Run this to launch
└── GET_STARTED.md   # This file
```

---

## Quick Commands

```bash
# First time setup
setup.bat

# Start application
start.bat

# Reset database
cd server && npm run seed

# Stop MongoDB
taskkill /IM mongod.exe /F
```

---

## Firebase Project Info

Your project is already configured:

- **Project ID:** classplus-d039b
- **Config:** Already in `client/.env` ✅
- **Console:** https://console.firebase.google.com/project/classplus-d039b

Just enable Authentication and Storage!

---

## URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **MongoDB:** mongodb://localhost:27017/greetflow

---

**Ready to build amazing greetings!** 🎨✨
