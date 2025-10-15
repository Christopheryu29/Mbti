// Test script to verify Google Sheets and Cloudinary integrations
// Run this with: node test-integrations.js

import { google } from "googleapis";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("🔍 Testing Integrations...\n");

// Test 1: Cloudinary Configuration
console.log("1️⃣ Testing Cloudinary Configuration...");
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Verify configuration
  const config = cloudinary.config();
  if (config.cloud_name && config.api_key && config.api_secret) {
    console.log("✅ Cloudinary: Configuration loaded successfully");
    console.log(`   Cloud Name: ${config.cloud_name}`);
  } else {
    console.log("❌ Cloudinary: Missing configuration values");
  }
} catch (error) {
  console.log("❌ Cloudinary: Configuration failed");
  console.error("   Error:", error.message);
}

console.log("\n");

// Test 2: Google Sheets Authentication
console.log("2️⃣ Testing Google Sheets Authentication...");
try {
  const GOOGLE_CREDENTIALS = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
      process.env.GOOGLE_CLIENT_EMAIL || ""
    )}`,
  };

  // Verify required fields
  const requiredFields = [
    "project_id",
    "private_key_id",
    "private_key",
    "client_email",
    "client_id",
  ];

  const missingFields = requiredFields.filter(
    field => !GOOGLE_CREDENTIALS[field]
  );

  if (missingFields.length > 0) {
    console.log("❌ Google Auth: Missing required fields:");
    missingFields.forEach(field => console.log(`   - ${field}`));
  } else {
    console.log("✅ Google Auth: All required fields present");
    console.log(`   Project ID: ${GOOGLE_CREDENTIALS.project_id}`);
    console.log(`   Client Email: ${GOOGLE_CREDENTIALS.client_email}`);

    // Test authentication
    const auth = new google.auth.GoogleAuth({
      credentials: GOOGLE_CREDENTIALS,
      scopes: [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const authClient = await auth.getClient();
    const accessToken = await authClient.getAccessToken();

    if (accessToken.token) {
      console.log("✅ Google Auth: Successfully obtained access token");
    } else {
      console.log("❌ Google Auth: Failed to obtain access token");
    }
  }
} catch (error) {
  console.log("❌ Google Auth: Authentication failed");
  console.error("   Error:", error.message);
}

console.log("\n");

// Test 3: Google Sheets Connection
console.log("3️⃣ Testing Google Sheets Connection...");
try {
  const GOOGLE_CREDENTIALS = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
      process.env.GOOGLE_CLIENT_EMAIL || ""
    )}`,
  };

  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Try to get spreadsheet metadata
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) {
    console.log("❌ Google Sheets: GOOGLE_SHEETS_ID not set");
  } else {
    console.log(`   Spreadsheet ID: ${spreadsheetId}`);

    const response = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });

    if (response.data) {
      console.log("✅ Google Sheets: Successfully connected");
      console.log(`   Spreadsheet Title: ${response.data.properties?.title}`);
      console.log(`   Sheets: ${response.data.sheets?.map(s => s.properties?.title).join(", ")}`);
    }
  }
} catch (error) {
  console.log("❌ Google Sheets: Connection failed");
  console.error("   Error:", error.message);
  if (error.message.includes("permission")) {
    console.log("   💡 Tip: Make sure the service account email has access to the spreadsheet");
    console.log(`   💡 Share your spreadsheet with: ${process.env.GOOGLE_CLIENT_EMAIL}`);
  }
}

console.log("\n");

// Test 4: Google Drive Connection
console.log("4️⃣ Testing Google Drive Connection...");
try {
  const GOOGLE_CREDENTIALS = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
      process.env.GOOGLE_CLIENT_EMAIL || ""
    )}`,
  };

  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    console.log("❌ Google Drive: GOOGLE_DRIVE_FOLDER_ID not set");
  } else {
    console.log(`   Folder ID: ${folderId}`);

    const response = await drive.files.get({
      fileId: folderId,
      fields: "id, name, mimeType",
    });

    if (response.data) {
      console.log("✅ Google Drive: Successfully connected");
      console.log(`   Folder Name: ${response.data.name}`);
    }
  }
} catch (error) {
  console.log("❌ Google Drive: Connection failed");
  console.error("   Error:", error.message);
  if (error.message.includes("permission") || error.message.includes("404")) {
    console.log("   💡 Tip: Make sure the service account email has access to the folder");
    console.log(`   💡 Share your folder with: ${process.env.GOOGLE_CLIENT_EMAIL}`);
  }
}

console.log("\n");

// Test 5: Cloudinary Upload Test (optional - creates a test file)
console.log("5️⃣ Testing Cloudinary Upload (Test Image)...");
try {
  // Create a small test base64 image (1x1 transparent PNG)
  const testImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

  const result = await cloudinary.uploader.upload(testImage, {
    folder: "mbti-test",
    public_id: `test_${Date.now()}`,
    resource_type: "auto",
  });

  if (result.secure_url) {
    console.log("✅ Cloudinary: Upload successful");
    console.log(`   URL: ${result.secure_url}`);
    console.log(`   Public ID: ${result.public_id}`);

    // Clean up test file
    await cloudinary.uploader.destroy(result.public_id);
    console.log("   🧹 Test image cleaned up");
  }
} catch (error) {
  console.log("❌ Cloudinary: Upload failed");
  console.error("   Error:", error.message);
}

console.log("\n");
console.log("=" .repeat(60));
console.log("✨ Integration test complete!");
console.log("=" .repeat(60));
