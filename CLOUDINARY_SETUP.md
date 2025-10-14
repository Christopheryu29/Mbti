# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image uploads in your MBTI project.

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Click "Sign Up For Free"
3. Create your account with email and password
4. Verify your email address

## Step 2: Get Your Cloudinary Credentials

1. After logging in, you'll see your **Dashboard**
2. Note down these three values:
   - **Cloud Name** (e.g., `my-cloud-name`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

## Step 3: Configure Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Sheets Configuration (already configured)
GOOGLE_SHEETS_ID=1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg
```

## Step 4: Test the Integration

1. Start your backend server:

   ```bash
   node server-example.mjs
   ```

2. Start your frontend:

   ```bash
   npm run dev
   ```

3. Go to your app and complete the MBTI test flow
4. Upload an image on the payment page
5. Check your Google Sheets - you should see the Cloudinary URL in the "Payment Image URL" column

## How It Works

1. **User uploads image** → Frontend sends to backend
2. **Backend uploads to Cloudinary** → Gets secure URL
3. **Backend saves to Google Sheets** → Stores Cloudinary URL
4. **User sees success** → Image is accessible via Cloudinary URL

## Benefits of Cloudinary

- ✅ **No storage quota issues** (unlike Google Drive service accounts)
- ✅ **Automatic image optimization** and resizing
- ✅ **CDN delivery** for fast image loading
- ✅ **Secure URLs** for image access
- ✅ **Free tier** with generous limits

## Troubleshooting

### Error: "Cloudinary not configured"

- Make sure your `.env` file has the correct Cloudinary credentials
- Restart your backend server after adding environment variables

### Error: "Invalid credentials"

- Double-check your Cloud Name, API Key, and API Secret
- Make sure there are no extra spaces or quotes in your `.env` file

### Images not showing in Google Sheets

- Check that the Cloudinary URL is being saved correctly
- Verify the Google Sheets API is working (check server logs)

## Free Tier Limits

Cloudinary's free tier includes:

- 25 GB storage
- 25 GB bandwidth per month
- 25,000 transformations per month

This should be more than enough for your MBTI project!
