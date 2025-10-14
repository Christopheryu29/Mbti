# Quick Start Guide

## 🚀 Running the Project (Currently Running)

**Good news!** Both servers are already running. Your app is live at:
👉 **http://localhost:5173/**

### Current Status
✅ Backend server running on port 3001
✅ Frontend server running on port 5173
✅ Application ready to use

---

## 🔄 To Restart the Servers

If you need to restart, follow these steps:

### Method 1: Using npm Scripts (Recommended)

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

### Method 2: Direct Commands

**Terminal 1 - Backend:**
```bash
node server-example.mjs
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 📝 Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend (Vite) |
| `npm run dev:frontend` | Start frontend (alias) |
| `npm run dev:backend` | Start backend (Express) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm start` | Start backend (alias) |

---

## 🛑 Stopping the Servers

Press **Ctrl + C** in each terminal window to stop the servers.

---

## 🔧 Troubleshooting

### Backend won't start (Port 3001 in use)
```bash
lsof -ti:3001 | xargs kill -9
npm run dev:backend
```

### Frontend won't start (Port 5173 in use)
```bash
lsof -ti:5173 | xargs kill -9
npm run dev:frontend
```

### White screen in browser
1. Check browser console (F12) for errors
2. Make sure backend is running (port 3001)
3. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

---

## 📍 URLs to Remember

- **Frontend:** http://localhost:5173/
- **Backend API:** http://localhost:3001/api
- **Backend Health:** http://localhost:3001/

---

## 💡 Development Tips

✨ **Hot Reload:** Frontend changes appear instantly - just save!
✨ **Backend Changes:** Restart backend server after code changes
✨ **Check Logs:** Terminal 1 = Backend, Terminal 2 = Frontend, Browser Console = Client
✨ **Both Required:** Keep both servers running for full functionality

---

## 📚 More Documentation

- **RUN_GUIDE.md** - Detailed running instructions
- **ARCHITECTURE.md** - Code architecture overview
- **SETUP_GUIDE.md** - Initial setup guide
- **IMPROVEMENTS_SUMMARY.md** - Recent improvements

---

## ✅ Testing the Application

1. Open http://localhost:5173/ in your browser
2. Click on the landing page image to start
3. Go through the flow:
   - Enter your name
   - Enter phone number
   - Enter address
   - Take MBTI test or select type
   - Design your shirt
   - Upload payment image
   - Select delivery date
4. Check Google Sheets to see saved data

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Start everything (run in separate terminals)
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2

# Stop servers
Ctrl + C               # In each terminal

# Restart after changes
# Backend: Ctrl+C, then npm run dev:backend
# Frontend: Just save your files (auto-reload)

# Kill stuck processes
lsof -ti:3001 | xargs kill -9  # Kill backend
lsof -ti:5173 | xargs kill -9  # Kill frontend
```

---

**Happy coding! 🎉**
