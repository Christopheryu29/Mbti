# How to Run the MBTI Project

## Quick Start (Easiest Way)

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend Server:**
```bash
node server-example.mjs
```

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```

### Option 2: Using npm Scripts (Recommended for Development)

I'll create convenient npm scripts for you to run both servers easily.

---

## Detailed Setup Guide

### Prerequisites
- Node.js installed (v18 or higher recommended)
- npm installed
- All dependencies installed (`npm install`)

### Step 1: Start the Backend Server

Open a terminal and run:
```bash
node server-example.mjs
```

You should see:
```
Server running on port 3001
Google Sheets ID: 1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg
Cloudinary configured: Yes
```

**What it does:**
- Runs on `http://localhost:3001`
- Handles image uploads to Cloudinary
- Saves data to Google Sheets
- Provides API endpoints for the frontend

### Step 2: Start the Frontend Server

Open a **new terminal** (keep the backend running) and run:
```bash
npm run dev
```

You should see:
```
VITE v7.1.9  ready in 235 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**What it does:**
- Runs on `http://localhost:5173`
- Serves the React application
- Hot reloads on code changes

### Step 3: Open the Application

Open your browser and go to:
```
http://localhost:5173/
```

You should see the landing page with the MBTI patch image!

---

## Using npm Scripts (Coming Soon)

I'll add convenient scripts to your `package.json` so you can run both servers with simple commands.

---

## Troubleshooting

### Backend Issues

**Problem:** Port 3001 already in use
```bash
# Solution: Kill the process using port 3001
lsof -ti:3001 | xargs kill -9

# Then restart the backend
node server-example.mjs
```

**Problem:** Cloudinary or Google Sheets errors
- Check your `.env` file has all required variables
- Verify service-account.json exists
- Check the SETUP_GUIDE.md for configuration steps

### Frontend Issues

**Problem:** Port 5173 already in use
```bash
# Solution: Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Then restart the frontend
npm run dev
```

**Problem:** White screen or errors
- Check browser console (F12) for errors
- Make sure backend is running on port 3001
- Clear browser cache and reload

---

## Development Workflow

### Starting Development
```bash
# Terminal 1: Start backend
node server-example.mjs

# Terminal 2: Start frontend
npm run dev

# Open browser to http://localhost:5173/
```

### Stopping the Servers
- Press `Ctrl + C` in each terminal to stop the servers

### Restarting After Changes

**Backend changes:**
- Stop backend (Ctrl + C)
- Restart: `node server-example.mjs`

**Frontend changes:**
- No restart needed! Vite hot-reloads automatically
- Just save your files and see changes instantly

---

## Production Build

### Build the Frontend
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

---

## Environment Variables

Make sure your `.env` file contains:

```env
# Google Configuration
VITE_GOOGLE_DRIVE_FOLDER_ID=your_folder_id
VITE_GOOGLE_SHEETS_ID=1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg
VITE_API_BASE_URL=http://localhost:3001/api

# Backend Configuration
GOOGLE_PROJECT_ID=mbti-474907
GOOGLE_CLIENT_EMAIL=your_service_account_email
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3001
```

---

## Port Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend API | 3001 | http://localhost:3001/api |

---

## Common Commands

```bash
# Install dependencies
npm install

# Run frontend only (for testing without backend)
npm run dev

# Run backend only
node server-example.mjs

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Check for available updates
npm outdated
```

---

## Next Steps

After starting the servers:

1. ✅ Navigate to http://localhost:5173/
2. ✅ Click on the landing image to start
3. ✅ Go through the MBTI flow
4. ✅ Test image upload and payment
5. ✅ Check Google Sheets for saved data

---

## Tips

💡 **Keep both terminals open** - You need both servers running simultaneously

💡 **Hot reload** - Frontend changes appear instantly, no restart needed

💡 **Check console** - Backend logs show in Terminal 1, Frontend logs in browser console (F12)

💡 **Fallback mode** - If backend is down, app works in fallback mode (no Google Sheets/Cloudinary)

---

## Getting Help

If you encounter issues:

1. Check both terminal outputs for error messages
2. Check browser console (F12) for frontend errors
3. Verify all environment variables are set correctly
4. Ensure ports 3001 and 5173 are not in use
5. Try restarting both servers

For setup issues, see:
- `SETUP_GUIDE.md` - Initial setup instructions
- `GOOGLE_SETUP_INSTRUCTIONS.md` - Google API setup
- `CLOUDINARY_SETUP.md` - Cloudinary setup
