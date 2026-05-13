# GreetFlow Setup Guide

## Quick Start

### 1. Firebase Setup (Required)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable **Google** sign-in provider
   - Enable **Email/Password** sign-in provider
   - Enable **Anonymous** sign-in provider
4. Enable **Storage**:
   - Go to Storage → Get Started
   - Use test mode rules for development
5. Get your Firebase config:
   - Go to Project Settings → General
   - Scroll to "Your apps" → Web app
   - Copy the config values

### 2. MongoDB Setup (Required)

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database user password

### 3. Configure Environment Variables

**Client (.env in client/ folder):**
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Server (.env in server/ folder):**
```env
MONGODB_URI=mongodb://localhost:27017/greetflow
PORT=5000
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greetflow?retryWrites=true&w=majority
```

### 4. Seed the Database

```bash
cd server
npm run seed
```

You should see: `Seeded 12 templates successfully`

### 5. Start the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

Server will run on http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

Client will run on http://localhost:5173

### 6. Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Continue with Google" or create an account with email
3. Set up your profile (name + photo)
4. Browse and personalize greeting templates
5. Share or download your custom greetings

## Troubleshooting

### Firebase Authentication Error
- Make sure you've enabled the sign-in providers in Firebase Console
- Check that your Firebase config values are correct in client/.env
- Verify your domain is authorized in Firebase Console → Authentication → Settings → Authorized domains

### MongoDB Connection Error
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check that the database name in MONGODB_URI matches
- For Atlas: Whitelist your IP address in Network Access

### CORS Error
- Make sure the server is running on port 5000
- Check that VITE_API_URL in client/.env matches the server URL
- Verify the server has `cors` middleware enabled

### Image Upload Not Working
- Verify Firebase Storage is enabled
- Check Storage rules allow uploads
- Ensure the storage bucket name in Firebase config is correct

### Templates Not Loading
- Run the seed script: `npm run seed` in the server folder
- Check MongoDB connection
- Verify the API endpoint is accessible: http://localhost:5000/api/templates

## Development Tips

### Hot Reload
Both client and server support hot reload:
- Client: Vite automatically reloads on file changes
- Server: Use `npm run dev` (with nodemon) instead of `npm start`

### Testing Premium Features
To test premium features without payment:
1. Log in to the app
2. Make a POST request to upgrade:
```bash
curl -X PATCH http://localhost:5000/api/users/YOUR_FIREBASE_UID/premium
```

### Adding More Templates
Edit `server/seed/seedTemplates.js` and run `npm run seed` again.

### Customizing Colors
Edit the CSS variables in `client/src/index.css` to change the teal/amber theme.

## Production Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build` in client folder
2. Deploy the `client/dist` folder
3. Set environment variables in hosting platform
4. Update VITE_API_URL to your production API URL

### Backend (Heroku/Railway/Render)
1. Push server folder to hosting platform
2. Set environment variables (MONGODB_URI, PORT)
3. Ensure MongoDB Atlas is used (not local)
4. Update CORS settings to allow your frontend domain

### Firebase
1. Update authorized domains in Firebase Console
2. Update Storage CORS rules for production domain
3. Consider upgrading to Blaze plan for production usage

## Support

For issues or questions:
- Check the main README.md
- Review Firebase and MongoDB documentation
- Ensure all dependencies are installed correctly

## Next Steps

- Add more template categories
- Implement actual payment integration (Stripe/Razorpay)
- Add template favorites/bookmarks
- Create template creation tool for admins
- Add social sharing analytics
