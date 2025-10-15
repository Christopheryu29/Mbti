# Vercel Deployment Guide - Google Sheets & Cloudinary Integration

## ✅ What I Fixed

1. **Updated `vercel.json`** - Now properly routes API calls to your serverless function
2. **Fixed `apiService.ts`** - Converts images to base64 before sending to backend (matching your API's expected format)
3. **Verified API endpoint** - Your `api/index.js` is correctly set up for Vercel serverless functions

---

## 🔧 Environment Variables You Need to Add in Vercel

Go to your Vercel project → **Settings** → **Environment Variables** and add these **10 variables**:

### Google Sheets Integration (7 variables)

| Variable Name | Value |
|--------------|-------|
| `GOOGLE_PROJECT_ID` | `mbti-474907` |
| `GOOGLE_PRIVATE_KEY_ID` | `22a786cc740700f11ec7a418aae02f6fb19e7382` |
| `GOOGLE_PRIVATE_KEY` | `"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCY+kHpFW0hLMSd\nYtGDRlYalkVZI+GM597vMT242NtoDZpPk7GdYqCVtAYi0QBnVXccoWOPolxUFn7E\nU3/R1v/MQEByG5d7FT8SAABeGhCK5SnT/Q/x/sqvjCiBglkc0fq2QZuPX2fVDu+P\n9m3kElsKt5pBYA+UzZtbz2gwRsp1VOT/hhpr/Gycwr1lSPmwfdzRd4wu2mYxnxCN\nyf8hgxNWmlgx5Ml2fMpBMxlx7u2WgVO6P0R7PgA8h5kS+Bo+qcTZxo+M50APFJrH\n6J9jnqwcDw8HGQiEXrfD4ftSIkLqmdZQ4LxJTzvmyJ5RI4KsaSOqPytHOclJH8bW\nff0ExFcjAgMBAAECggEAAs1TAEdPYofUvVtEcPB46r5KvvghZdsja/cwDIF1SxCD\nLrqBGXlTvDfI05qCg3+SrzrWUQ7v2jxyySKCj1skTt8vzIwxX2SXCs9mqHn7+anJ\ndRUDJH0IicaNyzsIaiMmpEiGNQk0X7gcvXaDz+8mmYcT84SuHjqaqYzPqrTc71dM\nryURdbg+OLDCw85GlMbxNiA/Uh+qglZ+2BCNBegU+CM0gbwxn1zEJQ/HRoaL11KR\nPLqFpq4tzGzCs+bLdUgHaqiDYkOz3nYWAU1GgfEuL0n6TfuLESz0R7p+mDh3Qf9h\nItjIzR5YdqsuKXfTFYHKkP6+hAopOPWafURtJy/3uQKBgQDI8MUu0X+U2k3fbHCB\nX74EE2/Q9cGQ7chms9gS/Ax0dll/V7UzfvXi9e8zGqz5Shl/OKERr5qv6JbKhNBd\nm4avn/uYUPKTiarZjFQWGpz2XfJZ2QnBSw/Vw9q6zyLF9J+tYCqpRQ7GLMJ1cfSA\nDznkBwRu8QVtm1IAbkn2ZZ8cKwKBgQDC5RCyk9mMgHkql2LbjRzlL9yGbZox7MEg\naxK8vxoHBa8WUPG9DhL0hRljtnuLx95nwWBFyA6YZ0bxszrYXoL9jiB09uhErb6y\nNrja+3ayLEhhjvGy1OAayUb4zYsekbEl3YsL7QyWe70IJWOyzzISJw4fFJC5mgY5\nvdxaTR0c6QKBgQDG0mVo8+X3FSJkZdnUSTWstsa2zdRfYMgfxuePsVFpkwjvFYu3\njnIhxhKOUGDCsW0VEqVc6JJ4Z/18GXpKhO75q6S4i6/aCCfC5jT1QhP5Oe/osvYS\nCgF7FDXDDd1sXaX5WOQdZLU/pV4r8ztn0qkHVWIvm9AxKbQztOz+HoMWzQKBgQCJ\nuGK3PmEhtvtoTHfQG4SKs+qKl9K5assCRIeGFyimQ674/xQD+3kLjy5k1uOw3/ja\nqryEMx2VNo3caEGx+f9oe1GWNY/mUDyMJL02CTJUL5SqU9+Z9nGym/7p/B1N6bgb\nwNTsBYO6pw/qPLmZ9m40g6Kn9dlbPmsdzHt02D81WQKBgDBNEV7DDo5lwDheKtse\n/zewohXY6QG3Hs8umoK1vTKNB1FCPiDuEON9/lnyyefQJhCwu08vUwbQ++1oloU4\nDEX92Uo2s5kb4+VLsZfldKYTk5tNbhS743CRS7Dq/Ymoku7SdfA5gs48Xl5Rbh9C\neX9xoT6Uhi41AGKqCcs/xc/Q\n-----END PRIVATE KEY-----\n"` |
| `GOOGLE_CLIENT_EMAIL` | `mbti-639@mbti-474907.iam.gserviceaccount.com` |
| `GOOGLE_CLIENT_ID` | `105607352963372394142` |
| `GOOGLE_DRIVE_FOLDER_ID` | `1G71uhD_D1y4w4Z-z8vQ52cKRA5-i8rQk` |
| `GOOGLE_SHEETS_ID` | `1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg` |

**IMPORTANT for `GOOGLE_PRIVATE_KEY`:**
- Copy the ENTIRE value including the quotes: `"-----BEGIN...`
- Keep all the `\n` characters (they represent newlines)
- This is critical for authentication to work

### Cloudinary Integration (3 variables)

| Variable Name | Value |
|--------------|-------|
| `CLOUDINARY_CLOUD_NAME` | `dvolqj20y` |
| `CLOUDINARY_API_KEY` | `887373549317632` |
| `CLOUDINARY_API_SECRET` | `aSUx8RJ5A7rihn2SiYbj5Y_if3I` |

---

## 🚀 How to Add Variables in Vercel

1. Open your project in Vercel Dashboard
2. Click **Settings** tab
3. Click **Environment Variables** in the left sidebar
4. For each variable:
   - Enter the **Key** (e.g., `GOOGLE_PROJECT_ID`)
   - Enter the **Value** (copy from table above)
   - Select environments: ✅ **Production**, ✅ **Preview**, ✅ **Development**
   - Click **Save**
5. Repeat for all 10 variables

---

## 📋 What Will Happen After Setup

Once you've added all environment variables and deployed:

1. **User submits payment image** → Frontend converts to base64
2. **Frontend sends data to `/api/process-order`** → Your Vercel serverless function
3. **Backend uploads image to Cloudinary** → Returns secure URL
4. **Backend saves order to Google Sheets** → Appends row with all data
5. **Frontend receives confirmation** → Shows success message

### Data Saved to Google Sheets:
- Name
- Phone
- Address
- Personality Type
- Template
- Position
- **Payment Image URL** (from Cloudinary)
- Timestamp

---

## 🧪 Testing After Deployment

Run this command to test your integrations locally:
```bash
node test-integrations.js
```

This will verify:
- ✅ Cloudinary configuration
- ✅ Google Sheets authentication
- ✅ Google Sheets connection
- ✅ Google Drive connection (optional)
- ✅ Cloudinary upload test

---

## ⚠️ Known Issues

**Google Drive folder not accessible:**
- The folder ID `1G71uhD_D1y4w4Z-z8vQ52cKRA5-i8rQk` returned "File not found"
- **Solution:** Share the folder with `mbti-639@mbti-474907.iam.gserviceaccount.com`
- **Note:** This doesn't affect your app since you're using Cloudinary for images

---

## 📝 API Endpoints Available

Your deployed app will have these endpoints:

- `POST /api/process-order` - Main endpoint (uploads to Cloudinary + saves to Sheets)
- `GET /api/google-drive/token` - Get Drive access token
- `GET /api/google-sheets/token` - Get Sheets access token

---

## 🔗 Files Modified

- ✅ `vercel.json` - Updated API routing
- ✅ `src/services/apiService.ts` - Added base64 conversion for images
- ✅ `api/index.js` - Already configured correctly

---

## 📞 Support

If you encounter issues after deployment:

1. Check Vercel function logs: **Deployments** → Click deployment → **Functions** tab
2. Verify all 10 environment variables are set
3. Make sure `GOOGLE_PRIVATE_KEY` includes quotes and `\n` characters
4. Run `node test-integrations.js` locally to verify credentials work

---

## ✨ Ready to Deploy!

After adding all environment variables:
1. Commit your changes: `git add . && git commit -m "Configure Vercel deployment"`
2. Push to GitHub: `git push`
3. Vercel will auto-deploy
4. Test your app by submitting an order
5. Check your Google Sheet for the new entry!
