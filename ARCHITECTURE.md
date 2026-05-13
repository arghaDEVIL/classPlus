# GreetFlow Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:5173                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Pages: Login → Setup → Home → Profile                 │ │
│  │  Components: TemplateCard, PersonalizationSheet, etc.  │ │
│  │  Context: AuthContext (Firebase user + MongoDB user)   │ │
│  │  Utils: imageComposer (html2canvas)                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
           │                              │
           │ REST API                     │ Firebase SDK
           │ (axios)                      │
           ▼                              ▼
┌──────────────────────┐      ┌──────────────────────┐
│  EXPRESS BACKEND     │      │  FIREBASE SERVICES   │
│  localhost:5000      │      │                      │
│  ┌────────────────┐  │      │  ┌────────────────┐ │
│  │ Routes:        │  │      │  │ Authentication │ │
│  │ - /api/users   │  │      │  │ - Google       │ │
│  │ - /api/templates│ │      │  │ - Email/Pass   │ │
│  └────────────────┘  │      │  │ - Anonymous    │ │
│  ┌────────────────┐  │      │  └────────────────┘ │
│  │ Models:        │  │      │  ┌────────────────┐ │
│  │ - User         │  │      │  │ Storage        │ │
│  │ - Template     │  │      │  │ - Profile pics │ │
│  └────────────────┘  │      │  └────────────────┘ │
└──────────────────────┘      └──────────────────────┘
           │
           │ Mongoose ODM
           ▼
┌──────────────────────┐
│  MONGODB DATABASE    │
│  greetflow           │
│  ┌────────────────┐  │
│  │ Collections:   │  │
│  │ - users        │  │
│  │ - templates    │  │
│  └────────────────┘  │
└──────────────────────┘
```

## Data Flow

### 1. Authentication Flow

```
User Action → Firebase Auth → Frontend receives user
                                      ↓
                              POST /api/users
                                      ↓
                              MongoDB stores user
                                      ↓
                              AuthContext updates
                                      ↓
                              Navigate to /home
```

### 2. Template Browsing Flow

```
HomePage loads → GET /api/templates/trending
                 GET /api/templates?category=X
                        ↓
                 MongoDB queries
                        ↓
                 Returns template array
                        ↓
                 TemplateCard renders with user overlay
```

### 3. Greeting Creation Flow

```
User clicks template → PersonalizationSheet opens
                              ↓
                 GreetingCardPreview renders
                 (CSS overlay: avatar + name)
                              ↓
                 User clicks "Share"
                              ↓
                 html2canvas captures element
                              ↓
                 Converts to PNG blob
                              ↓
                 Web Share API or download
```

### 4. Premium Upgrade Flow

```
User clicks premium template → PremiumDialog opens
                                      ↓
                              User clicks "Subscribe"
                                      ↓
                        PATCH /api/users/:uid/premium
                                      ↓
                              MongoDB updates isPremium
                                      ↓
                              AuthContext refreshes
                                      ↓
                              All templates unlocked
```

## Component Architecture

### Frontend Component Tree

```
App.jsx
├── AuthProvider (Context)
│   └── BrowserRouter
│       ├── Routes
│       │   ├── /login → LoginPage
│       │   │   ├── Card
│       │   │   ├── Button (Google)
│       │   │   ├── Input (Email/Password)
│       │   │   └── Button (Guest)
│       │   │
│       │   ├── /setup → SetupPage
│       │   │   ├── Card
│       │   │   ├── Avatar (upload)
│       │   │   ├── Input (name)
│       │   │   └── Button (save)
│       │   │
│       │   ├── /home → HomePage
│       │   │   ├── Header
│       │   │   │   ├── Logo
│       │   │   │   └── Avatar (profile link)
│       │   │   ├── CategoryFilter
│       │   │   │   ├── Button[] (categories)
│       │   │   │   └── DropdownMenu (more)
│       │   │   ├── Trending Section
│       │   │   │   └── ScrollArea
│       │   │   │       └── TemplateCard[] (compact)
│       │   │   ├── Main Grid
│       │   │   │   └── TemplateCard[] (full)
│       │   │   ├── PersonalizationSheet
│       │   │   │   ├── GreetingCardPreview
│       │   │   │   └── Button (share)
│       │   │   ├── PremiumDialog
│       │   │   │   ├── Benefits list
│       │   │   │   └── Button (subscribe)
│       │   │   └── BottomNav
│       │   │
│       │   └── /profile → ProfilePage
│       │       ├── Header (back button)
│       │       ├── Card
│       │       │   ├── Avatar
│       │       │   ├── Name/Email
│       │       │   ├── Badge (premium/free)
│       │       │   ├── Menu items
│       │       │   └── Button (logout)
│       │       └── BottomNav
│       │
│       └── Toaster (global)
```

## State Management

### AuthContext State

```javascript
{
  user: FirebaseUser | null,        // Firebase auth user
  dbUser: MongoUser | null,         // MongoDB user document
  loading: boolean,                 // Initial auth check
  logout: () => Promise<void>,      // Sign out function
  refreshDbUser: () => Promise<void> // Refresh MongoDB user
}
```

### HomePage State

```javascript
{
  activeCategory: string,           // Selected category
  templates: Template[],            // Filtered templates
  trendingTemplates: Template[],    // Trending templates
  loading: boolean,                 // Loading state
  selectedTemplate: Template | null, // For PersonalizationSheet
  premiumTemplate: Template | null   // For PremiumDialog
}
```

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  uid: String (unique),      // Firebase UID
  name: String,              // Display name
  email: String,             // Email address
  profilePicUrl: String,     // Firebase Storage URL
  isPremium: Boolean,        // Premium status
  createdAt: Date,
  updatedAt: Date
}
```

### Template Collection

```javascript
{
  _id: ObjectId,
  title: String,             // Template name
  category: String,          // Category enum
  imageUrl: String,          // Template image URL
  isFree: Boolean,           // Free/Premium flag
  tags: String[],            // Search tags
  createdAt: Date,
  updatedAt: Date
}
```

## API Design

### RESTful Endpoints

```
POST   /api/users
Body:  { uid, name, email, profilePicUrl }
Response: User document

GET    /api/users/:uid
Response: User document

PATCH  /api/users/:uid/premium
Response: Updated user document

GET    /api/templates/trending
Response: Template[] (5 most recent free)

GET    /api/templates?category=X&page=1&limit=20
Response: { templates: Template[], total: number, page: number }
```

## Security Considerations

### Frontend
- Firebase handles authentication
- Protected routes check auth state
- Environment variables for sensitive config
- CORS configured for API calls

### Backend
- CORS middleware enabled
- MongoDB connection string in .env
- No authentication middleware (relies on Firebase)
- Input validation on routes

### Firebase
- Authentication providers configured
- Storage rules for profile uploads
- Authorized domains whitelist

## Performance Optimizations

### Frontend
- Vite for fast builds and HMR
- React lazy loading (can be added)
- Image optimization with html2canvas
- Skeleton loaders for better UX

### Backend
- MongoDB indexing on uid field
- Pagination for template queries
- Efficient Mongoose queries
- Connection pooling

## Deployment Architecture

### Production Setup

```
┌─────────────────┐
│   Vercel/Netlify│  ← Frontend (static)
│   CDN           │
└─────────────────┘
        │
        │ HTTPS
        ▼
┌─────────────────┐
│ Heroku/Railway  │  ← Backend API
│ Express Server  │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ MongoDB Atlas   │  ← Database (cloud)
└─────────────────┘

┌─────────────────┐
│ Firebase        │  ← Auth + Storage
└─────────────────┘
```

## Technology Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 3
- **UI Components:** shadcn/ui (Radix UI)
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **Image Capture:** html2canvas
- **Icons:** Lucide React
- **Auth:** Firebase SDK

### Backend
- **Runtime:** Node.js
- **Framework:** Express 4
- **Database:** MongoDB
- **ODM:** Mongoose 8
- **Middleware:** CORS, body-parser
- **Environment:** dotenv

### DevOps
- **Version Control:** Git
- **Package Manager:** npm
- **Development:** nodemon (backend)
- **Build:** Vite (frontend)

## File Upload Flow

```
User selects image → FileReader reads file
                            ↓
                    Firebase Storage upload
                    ref: profiles/{uid}
                            ↓
                    Get download URL
                            ↓
                    Update state
                            ↓
                    POST /api/users with URL
                            ↓
                    MongoDB stores URL
```

## Image Composition Strategy

### Why CSS Over Canvas?

```
Traditional Approach:
User data + Template → Canvas API → Composite image

GreetFlow Approach:
User data + Template → CSS Overlay → html2canvas → PNG

Benefits:
✅ Natural browser rendering
✅ Better text quality
✅ Easier to maintain
✅ Responsive design
✅ CSS animations possible
```

### Overlay Structure

```html
<div id="greeting-card">
  <img src="template.jpg" />           <!-- Base layer -->
  <div class="gradient-overlay" />     <!-- Top gradient -->
  <span class="name-banner">Name</span> <!-- Name overlay -->
  <Avatar />                           <!-- Profile picture -->
</div>
```

## Scalability Considerations

### Current Limitations
- No caching layer
- No CDN for templates
- No image optimization
- Single server instance

### Future Improvements
- Redis for caching
- CloudFront/Cloudflare CDN
- Image optimization service
- Load balancer for API
- Microservices architecture
- Queue system for heavy operations

---

**Architecture Version:** 1.0
**Last Updated:** May 13, 2026
