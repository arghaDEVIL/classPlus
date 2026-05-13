# GreetFlow Quick Reference

## 🚀 Quick Start Commands

```bash
# First time setup
cd server && npm install && npm run seed
cd ../client && npm install

# Start application (2 terminals)
# Terminal 1:
cd server && npm start

# Terminal 2:
cd client && npm run dev
```

## 🌐 URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Docs:** See routes below

## 📡 API Endpoints

### Users
```
POST   /api/users              Create/update user
GET    /api/users/:uid         Get user by Firebase UID
PATCH  /api/users/:uid/premium Upgrade to premium
```

### Templates
```
GET    /api/templates/trending Get 5 trending templates
GET    /api/templates          Get all templates
       ?category=Birthday      Filter by category
       &page=1&limit=20        Pagination
```

## 🎨 Categories

- All
- Shayari
- Birthday
- Festival
- Joke
- Love
- Motivational
- Updesh

## 🔑 Environment Variables

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/greetflow
PORT=5000
```

## 📁 Key Files

### Frontend
```
client/src/
├── pages/
│   ├── LoginPage.jsx       # Authentication
│   ├── SetupPage.jsx       # Profile setup
│   ├── HomePage.jsx        # Main feed
│   └── ProfilePage.jsx     # User profile
├── components/
│   ├── TemplateCard.jsx    # Template display
│   ├── GreetingCardPreview.jsx  # Preview
│   ├── PersonalizationSheet.jsx # Customization
│   └── PremiumDialog.jsx   # Upgrade modal
├── context/
│   └── AuthContext.jsx     # Auth state
└── lib/
    └── firebase.js         # Firebase config
```

### Backend
```
server/
├── models/
│   ├── User.js            # User schema
│   └── Template.js        # Template schema
├── routes/
│   ├── users.js           # User routes
│   └── templates.js       # Template routes
└── seed/
    └── seedTemplates.js   # Database seeding
```

## 🎨 Design Tokens

### Colors
```css
--primary: #0D9488        /* Teal */
--secondary: #F59E0B      /* Amber */
--background: #0F172A     /* Dark slate */
--card: #1E293B           /* Card background */
```

### Fonts
```css
font-display: 'Playfair Display', serif
font-sans: 'DM Sans', sans-serif
```

### Gradients
```css
bg-brand-gradient: linear-gradient(135deg, #0D9488 0%, #F59E0B 100%)
```

## 🔧 Common Tasks

### Add New Template
```javascript
// Edit server/seed/seedTemplates.js
{
  title: 'New Template',
  category: 'Birthday',
  imageUrl: 'https://picsum.photos/seed/new1/400/600',
  isFree: true,
  tags: ['birthday', 'celebration']
}
// Run: npm run seed
```

### Test Premium Features
```bash
# Get user UID from Firebase Console or app
curl -X PATCH http://localhost:5000/api/users/YOUR_UID/premium
```

### Reset Database
```bash
cd server
npm run seed  # Deletes all and reseeds
```

### Build for Production
```bash
cd client
npm run build
# Output in client/dist/
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Not Running
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas connection string
```

### Clear Browser Cache
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### Firebase Auth Error
- Check Firebase Console → Authentication → Sign-in method
- Verify all providers are enabled
- Check authorized domains

## 📦 Package Scripts

### Client
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server
```bash
npm start        # Start server
npm run dev      # Start with nodemon
npm run seed     # Seed database
```

## 🔐 Authentication Flow

1. User clicks login method
2. Firebase handles authentication
3. Frontend gets Firebase user
4. POST to /api/users creates/updates MongoDB user
5. AuthContext provides user state
6. Protected routes check authentication

## 📤 Share Flow

1. User selects template
2. PersonalizationSheet opens
3. GreetingCardPreview renders with overlay
4. html2canvas captures element
5. Web Share API or download fallback
6. PNG file shared/downloaded

## 🎯 Component Hierarchy

```
App
├── AuthProvider
│   ├── LoginPage
│   ├── SetupPage
│   ├── HomePage
│   │   ├── CategoryFilter
│   │   ├── TemplateCard (multiple)
│   │   ├── PersonalizationSheet
│   │   │   └── GreetingCardPreview
│   │   ├── PremiumDialog
│   │   └── BottomNav
│   └── ProfilePage
│       └── BottomNav
└── Toaster
```

## 💡 Tips

- Use React DevTools to inspect component state
- Check Network tab for API calls
- Firebase Console shows auth users
- MongoDB Compass for database inspection
- Use `console.log` in components for debugging

## 📚 Documentation Links

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Firebase](https://firebase.google.com/docs)
- [MongoDB](https://docs.mongodb.com)
- [Express](https://expressjs.com)

---

**Last Updated:** May 13, 2026
