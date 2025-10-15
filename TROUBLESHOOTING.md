# Troubleshooting Guide - Why Data Isn't Posting

## ✅ What I Just Fixed

### Issue 1: API URL Not Configured for Production
**Problem:** Frontend was hardcoded to use `http://localhost:3001/api` even on Vercel
**Solution:** Updated `src/config/env.ts` to auto-detect the correct API URL based on environment

### Issue 2: Wrong API Endpoint Paths
**Problem:** API routes had `/api` prefix when they shouldn't (Vercel routing adds it automatically)
**Solution:** Changed routes from `/api/process-order` to `/process-order` in `api/index.js`

### Issue 3: Missing CORS Preflight
**Problem:** Browser might send OPTIONS request before POST
**Solution:** Added OPTIONS handler for CORS preflight requests

### Issue 4: No Error Logging
**Problem:** Hard to debug when things fail
**Solution:** Added comprehensive console logging throughout the API

---

## 🔍 How to Debug on Vercel

### 1. Check Function Logs
1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** → Select latest deployment
3. Click **Functions** tab
4. Click on `/api/index` to see logs
5. Look for error messages

### 2. Check Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Verify ALL 10 variables are set:
   - ✅ GOOGLE_PROJECT_ID
   - ✅ GOOGLE_PRIVATE_KEY_ID
   - ✅ GOOGLE_PRIVATE_KEY (with quotes and \n)
   - ✅ GOOGLE_CLIENT_EMAIL
   - ✅ GOOGLE_CLIENT_ID
   - ✅ GOOGLE_DRIVE_FOLDER_ID
   - ✅ GOOGLE_SHEETS_ID
   - ✅ CLOUDINARY_CLOUD_NAME
   - ✅ CLOUDINARY_API_KEY
   - ✅ CLOUDINARY_API_SECRET

### 3. Test API Endpoint Directly
After deployment, test your API using curl:

```bash
# Replace YOUR_DOMAIN with your Vercel domain
curl -X POST https://YOUR_DOMAIN.vercel.app/api/process-order \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "1234567890",
    "address": "123 Test St",
    "personalityType": "INTJ",
    "template": "middle",
    "position": "",
    "paymentImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  }'
```

Expected response:
```json
{
  "success": true,
  "fileId": "mbti-payments/payment_1234567890",
  "webViewLink": "https://res.cloudinary.com/...",
  "rowNumber": 1
}
```

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to get access token"
**Cause:** Google credentials not properly configured
**Solution:**
1. Check `GOOGLE_PRIVATE_KEY` has quotes and `\n` characters
2. Verify service account email has access to the Google Sheet
3. Share your Google Sheet with: `mbti-639@mbti-474907.iam.gserviceaccount.com`

### Issue: "Cloudinary upload failed"
**Cause:** Cloudinary credentials missing or incorrect
**Solution:**
1. Verify all 3 Cloudinary variables are set correctly
2. Check Cloudinary dashboard for API limits

### Issue: "File not found" for Google Sheets
**Cause:** Service account doesn't have access to the sheet
**Solution:**
1. Open your Google Sheet
2. Click "Share"
3. Add `mbti-639@mbti-474907.iam.gserviceaccount.com` with Editor access

### Issue: API returns 404
**Cause:** Vercel routing not configured correctly
**Solution:**
1. Make sure `vercel.json` exists with correct rewrites
2. Redeploy after making changes

### Issue: CORS errors in browser console
**Cause:** API not allowing cross-origin requests
**Solution:** Already fixed - API now handles CORS properly

---

## 🧪 Testing Checklist

Before testing on production:

1. ✅ All 10 environment variables added to Vercel
2. ✅ Google Sheet shared with service account email
3. ✅ Cloudinary account has available uploads
4. ✅ Code committed and pushed to GitHub
5. ✅ Vercel deployed successfully
6. ✅ No build errors in Vercel logs

---

## 📊 Expected Flow

When a user submits a payment:

1. **Frontend** (`Payment.tsx`)
   - User selects image
   - Clicks "NEXT"
   - Shows "Preparing order data..."

2. **API Service** (`apiService.ts`)
   - Converts image to base64
   - POSTs to `https://yourdomain.vercel.app/api/process-order`
   - Shows "Processing order..."

3. **Vercel Function** (`api/index.js`)
   - Receives POST request
   - Validates data
   - Uploads to Cloudinary → Gets URL
   - Saves to Google Sheets → Gets row number
   - Returns success response

4. **Frontend** (`Payment.tsx`)
   - Receives success
   - Shows "Order processed successfully!"
   - Navigates to success page

---

## 🔧 What Changed in Code

### File: `src/config/env.ts`
```typescript
// Auto-detects API URL:
// - Production: uses https://yourdomain.vercel.app/api
// - Development: uses http://localhost:3001/api
```

### File: `api/index.js`
- ✅ Removed `/api` prefix from routes
- ✅ Added OPTIONS handler for CORS
- ✅ Added detailed logging
- ✅ Added better error messages

### File: `src/services/apiService.ts`
- ✅ Already converts images to base64 (previously fixed)

---

## 📞 Still Not Working?

If it's still not working after these fixes:

1. **Check Vercel Function Logs** (most important!)
   - Go to Deployments → Functions → `/api/index`
   - Look for the error messages I added

2. **Check Browser Console**
   - Open DevTools (F12)
   - Look for network errors or failed requests

3. **Test Locally First**
   ```bash
   # Terminal 1: Start backend
   node server-example.mjs

   # Terminal 2: Start frontend
   npm run dev

   # Test the upload - should work locally if env vars are set
   ```

4. **Verify the test script**
   ```bash
   node test-integrations.js
   ```
   All tests should pass except Google Drive

---

## 📝 Next Steps

1. **Commit these changes:**
   ```bash
   git add .
   git commit -m "Fix API routing and add debugging"
   git push
   ```

2. **Wait for Vercel to deploy** (auto-deploys on push)

3. **Check deployment logs** for any errors

4. **Test the upload** on your deployed site

5. **Check Vercel Function logs** to see what's happening

6. **Verify data appears** in your Google Sheet

---

## ✨ Summary

The main issues were:
1. ❌ API URL was pointing to localhost in production
2. ❌ API routes had wrong paths for Vercel
3. ❌ Missing CORS preflight handling

All fixed now! After deploying, check the Vercel Function logs to see exactly what's happening.
