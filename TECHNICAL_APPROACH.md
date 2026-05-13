# GreetFlow - Technical Approach Document

## Executive Summary

GreetFlow is a full-stack web application that enables users to create personalized greeting cards by overlaying their name and profile picture on pre-designed templates. The application uses a modern MERN stack with Firebase authentication and implements a mobile-first design approach.

---

## 1. Problem-Solving Approach

### 1.1 Image Overlay Logic Implementation

**Challenge:** How to dynamically overlay user information (name and profile picture) on template images in a way that's both performant and produces high-quality shareable images.

**Solution Approach:**

#### CSS-Based Composition (Chosen Approach)
Instead of using canvas-based image manipulation, we implemented a **CSS absolute positioning strategy**:

```
Template Structure:
┌─────────────────────────────────┐
│ <div id="greeting-card">        │
│   ├─ <img> (template background)│ z-index: 0
│   ├─ <div> (gradient overlay)   │ z-index: 10
│   ├─ <span> (user name banner)  │ z-index: 20
│   ├─ <Avatar> (profile picture) │ z-index: 20
│   └─ <Badge> (FREE/PREMIUM)     │ z-index: 20
│ </div>                           │
└─────────────────────────────────┘
```

**Implementation Steps:**

1. **Render Phase:**
   - Template image loaded as background (`position: absolute`)
   - User data overlaid using CSS positioning
   - All elements rendered naturally by the browser

2. **Capture Phase:**
   - `html2canvas` library captures the composed DOM element
   - Converts to PNG blob with 2x scale for quality
   - Preserves all CSS styling and fonts

3. **Share Phase:**
   - Web Share API for native sharing (mobile)
   - Download fallback for desktop browsers
   - File named: `{userName}-greeting.png`

**Why This Approach:**
- ✅ Natural browser rendering (better text quality)
- ✅ CSS animations possible
- ✅ Easier to maintain and debug
- ✅ Responsive design support
- ✅ No complex canvas drawing logic

**Alternative Considered:**
- Canvas API direct drawing - Rejected due to text rendering quality issues and complexity

---

## 2. Tech Stack

### 2.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.6 | UI framework for component-based architecture |
| **Vite** | 8.0.12 | Build tool for fast development and optimized production builds |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework for rapid styling |
| **shadcn/ui** | Latest | Pre-built accessible UI components (Radix UI based) |
| **React Router DOM** | 7.15.0 | Client-side routing |
| **Axios** | 1.16.0 | HTTP client for API communication |
| **html2canvas** | 1.4.1 | DOM to canvas conversion for image export |
| **Firebase SDK** | 12.13.0 | Authentication services |
| **Lucide React** | 1.14.0 | Icon library |

**Key Frontend Libraries:**
```json
{
  "@radix-ui/react-avatar": "^1.1.11",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-scroll-area": "^1.2.10",
  "@radix-ui/react-toast": "^1.2.15",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.6.0",
  "tailwindcss-animate": "^1.0.7"
}
```

### 2.2 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express** | 4.18.2 | Web application framework |
| **MongoDB** | Latest | NoSQL database for flexible schema |
| **Mongoose** | 8.0.0 | MongoDB ODM for schema validation |
| **CORS** | 2.8.5 | Cross-origin resource sharing middleware |
| **dotenv** | 16.3.1 | Environment variable management |

### 2.3 Authentication & Storage

| Service | Purpose | Implementation |
|---------|---------|----------------|
| **Firebase Authentication** | User authentication | Google OAuth, Email/Password, Anonymous |
| **Base64 Encoding** | Profile picture storage | Stored directly in MongoDB (no external storage) |

### 2.4 Development Tools

- **Git** - Version control
- **npm** - Package management
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 3. Challenges & Solutions

### 3.1 Challenge: Firebase Storage Cost Concerns

**Problem:** Initial implementation used Firebase Storage for profile pictures, but concerns about potential costs arose.

**Solution:**
- Switched to **base64 encoding** for profile pictures
- Images stored directly in MongoDB as strings
- Eliminated external storage dependency
- Trade-off: Larger database size, but simpler architecture

**Implementation:**
```javascript
// Convert image to base64
const reader = new FileReader();
reader.onloadend = () => {
  const base64String = reader.result;
  setProfilePicUrl(base64String);
};
reader.readAsDataURL(file);
```

**Configuration Change:**
```javascript
// Express payload limit increased
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
```

### 3.2 Challenge: Input Text Visibility

**Problem:** Input fields had light backgrounds with light text, making typed text invisible.

**Solution:**
- Explicitly set dark background: `bg-[#1e293b]`
- Explicitly set white text: `text-white`
- Added focus ring styling: `focus-visible:ring-teal-400`

**Before:**
```css
bg-background text-foreground  /* Both resolved to similar colors */
```

**After:**
```css
bg-[#1e293b] text-white  /* Explicit dark bg + white text */
```

### 3.3 Challenge: CSS Variable Application

**Problem:** Tailwind's `@apply` directive failed with custom CSS variables.

**Solution:**
- Replaced `@apply border-border` with direct HSL values
- Used `border-color: hsl(var(--border))` instead

**Before:**
```css
* { @apply border-border; }
```

**After:**
```css
* { border-color: hsl(var(--border)); }
```

### 3.4 Challenge: Template Overlay Not Visible

**Problem:** User name and avatar weren't appearing on template cards.

**Solution:**
- Added explicit z-index layering
- Ensured proper stacking context
- Added pointer-events-none to prevent click blocking

**Z-Index Strategy:**
```css
background-image: z-0
gradient-overlay: z-10
user-overlays: z-20
```

### 3.5 Challenge: Google Profile Picture Handling

**Problem:** Inconsistent behavior - sometimes auto-using Google photo, sometimes requiring manual upload.

**Solution:**
- Implemented conditional logic in LoginPage
- Google users with complete profiles → direct to home
- Other users → setup page for manual upload

**Logic:**
```javascript
if (user.displayName && user.photoURL) {
  // Auto-save and go to home
  await axios.post('/api/users', { ...googleData });
  navigate('/home');
} else {
  // Go to setup page
  navigate('/setup');
}
```

### 3.6 Challenge: MongoDB Data Directory Missing

**Problem:** MongoDB failed to start with "Data directory not found" error.

**Solution:**
- Created `C:\data\db` directory automatically in setup script
- Added directory creation to `setup.bat`

```batch
if not exist "C:\data\db" (
    mkdir "C:\data\db"
)
```

---

## 4. Architecture Decisions

### 4.1 Mobile-First Design

**Decision:** Constrain max-width to 430px and center on desktop.

**Rationale:**
- Greeting cards are primarily shared on mobile
- Consistent experience across devices
- Simpler responsive design
- Better focus on content

**Implementation:**
```css
max-w-[430px] mx-auto
```

### 4.2 Dark Theme with Teal/Amber Accent

**Decision:** Use dark background with teal and amber as primary colors.

**Rationale:**
- Modern aesthetic
- Better for viewing images
- Reduces eye strain
- Distinctive brand identity

**Color Palette:**
```css
--primary: 173 80% 40%;    /* Teal */
--secondary: 43 96% 56%;   /* Amber */
--background: 222 47% 7%;  /* Dark slate */
```

### 4.3 Component Library Choice (shadcn/ui)

**Decision:** Use shadcn/ui instead of Material-UI or Ant Design.

**Rationale:**
- Copy-paste components (no package bloat)
- Built on Radix UI (accessibility)
- Full customization control
- Tailwind CSS integration
- Modern design system

### 4.4 State Management

**Decision:** Use React Context for auth state, local state for UI.

**Rationale:**
- Simple application scope
- No need for Redux complexity
- Context sufficient for user data
- Local state for component-specific data

**Structure:**
```
AuthContext
├─ user (Firebase user)
├─ dbUser (MongoDB user)
├─ loading
├─ logout()
└─ refreshDbUser()
```

### 4.5 API Design

**Decision:** RESTful API with resource-based endpoints.

**Endpoints:**
```
POST   /api/users              # Create/update user
GET    /api/users/:uid         # Get user
PATCH  /api/users/:uid/premium # Upgrade to premium
GET    /api/templates/trending # Get trending
GET    /api/templates          # Get all with filters
```

---

## 5. Future Improvements & Scalability

### 5.1 Performance Optimizations

**Current Limitations:**
- No caching layer
- No CDN for template images
- No image optimization
- Single server instance

**Proposed Improvements:**

1. **Redis Caching**
   ```
   Cache Strategy:
   - Template list: 1 hour TTL
   - User data: 15 minutes TTL
   - Trending templates: 30 minutes TTL
   ```

2. **CDN Integration**
   - CloudFront or Cloudflare for template images
   - Reduce server load
   - Faster global delivery

3. **Image Optimization**
   - Compress template images (WebP format)
   - Lazy loading for template grid
   - Progressive image loading

4. **Database Indexing**
   ```javascript
   // Add indexes for common queries
   userSchema.index({ uid: 1 });
   templateSchema.index({ category: 1, isFree: 1 });
   templateSchema.index({ createdAt: -1 });
   ```

### 5.2 Scalability Considerations

**Horizontal Scaling:**
```
Load Balancer
    ├─ API Server 1
    ├─ API Server 2
    └─ API Server 3
         ↓
    MongoDB Cluster
    (Primary + Replicas)
```

**Microservices Architecture (Future):**
```
API Gateway
    ├─ Auth Service (Firebase)
    ├─ User Service (MongoDB)
    ├─ Template Service (MongoDB)
    └─ Image Processing Service (Queue-based)
```

**Queue System for Heavy Operations:**
- Bull/BullMQ for job queues
- Background processing for image generation
- Email notifications (future feature)

### 5.3 Feature Enhancements

**Short-term (1-3 months):**
- [ ] Template search functionality
- [ ] User favorites/bookmarks
- [ ] Template categories expansion
- [ ] Social sharing analytics
- [ ] User-generated templates

**Medium-term (3-6 months):**
- [ ] Real payment integration (Stripe/Razorpay)
- [ ] Admin dashboard for template management
- [ ] Template creation tool
- [ ] Advanced personalization (text editing, stickers)
- [ ] Template ratings and reviews

**Long-term (6-12 months):**
- [ ] AI-powered template recommendations
- [ ] Video greeting cards
- [ ] Collaborative greeting creation
- [ ] White-label solution for businesses
- [ ] Mobile app (React Native)

### 5.4 Security Enhancements

**Current State:**
- Firebase handles authentication
- No rate limiting
- No input sanitization
- No CSRF protection

**Proposed Improvements:**

1. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

2. **Input Validation**
   ```javascript
   const { body, validationResult } = require('express-validator');
   
   app.post('/api/users',
     body('name').trim().isLength({ min: 1, max: 30 }),
     body('email').isEmail(),
     (req, res) => { /* ... */ }
   );
   ```

3. **Helmet.js for Security Headers**
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

4. **MongoDB Injection Prevention**
   - Already using Mongoose (provides protection)
   - Add additional sanitization for user inputs

### 5.5 Monitoring & Analytics

**Proposed Tools:**
- **Sentry** - Error tracking
- **Google Analytics** - User behavior
- **LogRocket** - Session replay
- **Prometheus + Grafana** - Server metrics

**Key Metrics to Track:**
- Template view/click rates
- Share/download conversion
- User retention
- API response times
- Error rates
- Premium conversion rate

---

## 6. Deployment Strategy

### 6.1 Current Setup (Development)

```
Local Development:
- Frontend: http://localhost:5173 (Vite dev server)
- Backend: http://localhost:5000 (Express)
- Database: mongodb://localhost:27017/greetflow
```

### 6.2 Proposed Production Setup

**Frontend (Vercel/Netlify):**
```
Build Command: npm run build
Output Directory: dist
Environment Variables:
  - VITE_API_URL=https://api.greetflow.com
  - VITE_FIREBASE_* (all Firebase config)
```

**Backend (Railway/Render/Heroku):**
```
Start Command: npm start
Environment Variables:
  - MONGODB_URI=mongodb+srv://...
  - PORT=5000
  - NODE_ENV=production
```

**Database (MongoDB Atlas):**
```
Cluster: M0 (Free tier) → M10 (Production)
Region: Closest to API server
Backup: Automated daily backups
```

### 6.3 CI/CD Pipeline (Future)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: cd client && npm install && npm run build
      - uses: vercel/action@v1
  
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: cd server && npm install
      - uses: railway/action@v1
```

---

## 7. Code Quality & Best Practices

### 7.1 Implemented Practices

✅ **Component-Based Architecture**
- Reusable UI components
- Separation of concerns
- Single responsibility principle

✅ **Environment Variables**
- Sensitive data in .env files
- Different configs for dev/prod

✅ **Error Handling**
- Try-catch blocks in async functions
- User-friendly error messages via toast

✅ **Responsive Design**
- Mobile-first approach
- Tailwind responsive utilities

✅ **Git Version Control**
- Meaningful commit messages
- .gitignore for sensitive files

### 7.2 Areas for Improvement

⚠️ **Testing**
- No unit tests currently
- No integration tests
- No E2E tests

**Proposed:**
```javascript
// Jest + React Testing Library
describe('TemplateCard', () => {
  it('renders user name overlay', () => {
    render(<TemplateCard template={mockTemplate} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

⚠️ **Code Documentation**
- Limited inline comments
- No JSDoc annotations

**Proposed:**
```javascript
/**
 * Converts a DOM element to a PNG blob for sharing
 * @param {string} elementId - ID of the element to capture
 * @returns {Promise<Blob>} PNG image blob
 */
async function captureGreetingCard(elementId) { /* ... */ }
```

⚠️ **TypeScript**
- Currently using JavaScript
- No type safety

**Proposed Migration:**
```typescript
interface Template {
  _id: string;
  title: string;
  category: Category;
  imageUrl: string;
  isFree: boolean;
  tags: string[];
}
```

---

## 8. Lessons Learned

### 8.1 Technical Insights

1. **CSS > Canvas for UI Composition**
   - Browser rendering is more reliable than manual canvas drawing
   - Better text quality and easier debugging

2. **Base64 Trade-offs**
   - Simpler architecture but larger database
   - Acceptable for small-scale applications
   - Would need CDN for large scale

3. **Explicit Styling > CSS Variables**
   - When debugging, explicit values are clearer
   - CSS variables can cause unexpected inheritance issues

4. **Mobile-First Constraints**
   - Limiting max-width simplifies responsive design
   - Better focus on core experience

### 8.2 Development Process

1. **Iterative Problem Solving**
   - Started with Firebase Storage → Switched to base64
   - Adjusted based on requirements and constraints

2. **User Feedback Integration**
   - Google login flow adjusted based on UX feedback
   - Photo upload made mandatory for non-Google users

3. **Documentation Importance**
   - Comprehensive docs (8 markdown files) aid onboarding
   - Setup scripts reduce friction for new developers

---

## 9. Conclusion

GreetFlow demonstrates a modern full-stack application built with industry-standard tools and practices. The CSS-based image overlay approach provides a clean, maintainable solution for dynamic content composition. While the current implementation is optimized for development and small-scale deployment, the architecture is designed with clear paths for scaling and feature enhancement.

**Key Achievements:**
- ✅ Functional MVP with core features
- ✅ Clean, maintainable codebase
- ✅ Mobile-first responsive design
- ✅ Multiple authentication methods
- ✅ Comprehensive documentation
- ✅ Easy setup and deployment

**Next Steps:**
1. Implement testing suite
2. Add monitoring and analytics
3. Optimize for production deployment
4. Gather user feedback
5. Iterate on features

---

**Document Version:** 1.0  
**Last Updated:** May 13, 2026  
**Author:** Development Team  
**Project:** GreetFlow - Custom Greetings & Wishes Application
