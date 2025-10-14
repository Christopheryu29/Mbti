# MBTI Project - Google Integration Setup Guide

## Quick Setup for Your Project

Your Google Sheets is already configured at: https://docs.google.com/spreadsheets/d/1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google Drive API
   - Google Sheets API

### Step 2: Create a Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name it "mbti-project-service"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### Step 3: Generate Service Account Key

1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file

### Step 4: Set up Google Drive Folder

1. Create a folder in Google Drive for payment images
2. Right-click the folder > "Share"
3. Add your service account email (from the JSON file) with "Editor" permissions
4. Copy the folder ID from the URL (the string after `/folders/`)

### Step 5: Share Google Sheets

1. Open your Google Sheets: https://docs.google.com/spreadsheets/d/1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg
2. Click "Share" button
3. Add your service account email with "Editor" permissions

### Step 6: Configure Environment Variables

Create a `.env` file in your project root:

```env
# Replace with your actual Google Drive folder ID
VITE_GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id_here
```

### Step 7: Set up Backend Server (Optional)

If you want to use the backend server for authentication:

1. Copy your service account JSON file to the project root as `service-account.json`
2. Install backend dependencies: `npm install express multer googleapis`
3. Run the server: `node server-example.js`

### Testing the Integration

1. Start your React app: `npm run dev`
2. Complete the MBTI test flow
3. Upload a payment image
4. Check the console logs to see the integration status
5. Check your Google Sheets to see if data was saved

### Fallback Mode

If Google APIs are not configured, the app will automatically use fallback mode:

- Images are converted to data URLs
- Data is logged to the console
- The app continues to work normally

### Troubleshooting

- Check browser console for error messages
- Verify your service account has the correct permissions
- Ensure your Google Cloud project has the required APIs enabled
- Make sure your `.env` file is in the project root
