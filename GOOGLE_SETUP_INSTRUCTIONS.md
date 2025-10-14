# Google Drive & Sheets Integration Setup

This guide will help you set up Google Drive for image uploads and Google Sheets for storing user data.

## Prerequisites

1. A Google Cloud Platform account
2. A Google Drive account
3. A Google Sheets document

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your Project ID

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Enable the following APIs:
   - Google Drive API
   - Google Sheets API

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"
6. Click on the created service account
7. Go to the "Keys" tab
8. Click "Add Key" > "Create New Key" > "JSON"
9. Download the JSON file and keep it secure

## Step 4: Set up Google Drive

1. Create a folder in Google Drive where you want to store payment images
2. Right-click on the folder and select "Share"
3. Add your service account email (from the JSON file) with "Editor" permissions
4. Copy the folder ID from the URL (the long string after `/folders/`)

## Step 5: Set up Google Sheets

✅ **Your Google Sheets is already configured!**

Your spreadsheet is set up at: https://docs.google.com/spreadsheets/d/1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg

The headers are already in place:

- **A**: Name
- **B**: Phone
- **C**: Address
- **D**: Personality Type
- **E**: Template
- **F**: Position
- **G**: Payment Image URL
- **H**: Timestamp

**Next steps:**

1. Share the sheet with your service account email with "Editor" permissions
2. The spreadsheet ID is already hardcoded in the application

## Step 6: Configure Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Google API Configuration (Vite format)
VITE_GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id_here

# Google Sheets ID is already configured in the code
# VITE_GOOGLE_SHEETS_ID=1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg

# Server Configuration (for backend)
GOOGLE_PROJECT_ID=your_google_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id_here
GOOGLE_SHEETS_ID=your_google_sheets_id_here
PORT=3001
```

## Step 7: Install Backend Dependencies

If you're using the backend server example:

```bash
npm install express multer googleapis
```

## Step 8: Security Considerations

1. **Never commit your service account JSON file to version control**
2. **Use environment variables for all sensitive data**
3. **Consider using a backend server instead of direct API calls from the frontend**
4. **Implement proper error handling and validation**
5. **Add rate limiting and authentication if needed**

## Step 9: Testing

1. Start your backend server (if using one)
2. Test the image upload functionality
3. Check that data is being saved to Google Sheets
4. Verify that images are uploaded to Google Drive

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**: Check that the service account has proper permissions
2. **404 Not Found**: Verify that the folder/sheet IDs are correct
3. **Authentication Error**: Ensure the service account JSON is properly configured
4. **CORS Issues**: Make sure your backend server is running and accessible

### Debug Steps:

1. Check the browser console for errors
2. Verify environment variables are loaded correctly
3. Test API endpoints individually
4. Check Google Cloud Console for API usage and errors

## Alternative: Using Backend Server

For production use, it's recommended to use a backend server instead of direct API calls from the frontend. The `server-example.js` file provides a basic Express.js server that handles:

- Google API authentication
- Image upload to Google Drive
- Data storage to Google Sheets
- Proper error handling

This approach is more secure and provides better control over the API interactions.
