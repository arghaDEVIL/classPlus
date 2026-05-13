# GreetFlow — Custom Greetings & Wishes App

A full-stack web application for creating and sharing personalized greeting cards with custom overlays.

## Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- shadcn/ui components
- html2canvas for image capture
- Firebase Authentication & Storage
- React Router DOM

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- RESTful API

## Features

- 🔐 Multiple authentication methods (Google, Email/Password, Guest)
- 🎨 Browse greeting templates by category
- ✨ Personalized overlays with user name and profile picture
- 📱 Mobile-first responsive design (max-width: 430px)
- 🎁 Premium/Free template system
- 📤 Native share API with download fallback
- 🔥 Trending templates section
- 💎 Premium subscription flow

## Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally or MongoDB Atlas URI
- Firebase project with Authentication and Storage enabled

### Server Setup

```bash
cd server
npm install

# Edit .env with your MONGODB_URI
# MONGODB_URI=mongodb://localhost:27017/greetflow
# PORT=5000

# Seed the database with sample templates
npm run seed

# Start the server
npm start
# Server runs on http://localhost:5000
```

### Client Setup

```bash
cd client
npm install

# Edit .env with your Firebase config
# VITE_API_URL=http://localhost:5000
# VITE_FIREBASE_API_KEY=your_key
# VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# VITE_FIREBASE_PROJECT_ID=your_project_id
# VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
# VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
# VITE_FIREBASE_APP_ID=your_app_id

# Start the development server
npm run dev
# Client runs on http://localhost:5173
```

## App Flow

1. **Login** - Google / Email / Guest authentication
2. **Profile Setup** - Set display name and upload profile picture
3. **Browse Templates** - Filter by category, view trending templates
4. **Personalize** - Tap a template to preview with your name + photo overlay
5. **Share** - Use native share sheet or download as PNG

## Project Structure

```
greetflow/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Firebase config & utils
│   │   └── utils/         # Image composer utilities
│   └── ...
├── server/                # Express backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── seed/             # Database seeding
│   └── server.js
└── README.md
```

## API Endpoints

### Users
- `POST /api/users` - Create or update user
- `GET /api/users/:uid` - Get user by Firebase UID
- `PATCH /api/users/:uid/premium` - Upgrade to premium

### Templates
- `GET /api/templates/trending` - Get 5 trending templates
- `GET /api/templates?category=X&page=1&limit=20` - Get templates with filters

## Design System

**Colors:**
- Primary: Teal (#0D9488)
- Secondary: Amber (#F59E0B)
- Background: Dark slate
- Brand gradient: Teal → Amber

**Typography:**
- Display: Playfair Display (headings)
- Body: DM Sans

**Components:**
- All UI components use shadcn/ui
- Mobile-first with max-width: 430px
- Dark theme with teal/amber accents

## Notes

- The greeting card overlay uses CSS absolute positioning for natural browser rendering
- html2canvas captures the composed card for sharing/download
- Premium templates show an upsell modal for free users
- All loading states use Skeleton components
- All notifications use toast system
- No pink or purple colors - teal and amber only

## License

MIT
