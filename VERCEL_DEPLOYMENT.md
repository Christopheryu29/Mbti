# Vercel Deployment Guide for MBTI Project

## Prerequisites
1. Vercel account (free tier available)
2. GitHub repository with your code
3. Environment variables configured

## Step 1: Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

## Step 2: Environment Variables Setup
You need to set up these environment variables in Vercel:

### Google Cloud Service Account
- `GOOGLE_PROJECT_ID` - Your Google Cloud project ID
- `GOOGLE_PRIVATE_KEY_ID` - Private key ID from service account
- `GOOGLE_PRIVATE_KEY` - Private key (with \n for newlines)
- `GOOGLE_CLIENT_EMAIL` - Service account email
- `GOOGLE_CLIENT_ID` - Client ID from service account
- `GOOGLE_SHEETS_ID` - Your Google Sheets ID

### Cloudinary
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite project
5. Add environment variables in the dashboard
6. Click "Deploy"

### Option B: Deploy via CLI
```bash
# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 4: Configure Environment Variables in Vercel
1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add all the required environment variables listed above
5. Redeploy your project

## Project Structure
```
├── api/
│   └── index.js          # Serverless API functions
├── src/                  # React frontend
├── public/               # Static assets
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies and scripts
```

## How It Works
- **Frontend**: Vite builds your React app and serves it as static files
- **Backend**: API routes in `/api` folder become serverless functions
- **Database**: Google Sheets integration for data storage
- **File Storage**: Cloudinary for image uploads

## API Endpoints
- `GET /api/google-drive/token` - Get Google Drive access token
- `GET /api/google-sheets/token` - Get Google Sheets access token
- `POST /api/process-order` - Process complete order (upload + save to sheets)

## Troubleshooting
1. **Build Errors**: Check that all dependencies are in package.json
2. **API Errors**: Verify environment variables are set correctly
3. **CORS Issues**: The API includes CORS headers for all origins
4. **File Upload Issues**: Ensure Cloudinary credentials are correct

## Local Development
```bash
# Start frontend
npm run dev:frontend

# Start backend (for local testing)
npm run dev:backend
```

## Production URLs
- Frontend: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api/...`
