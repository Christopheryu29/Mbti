// Vercel serverless function for API routes
import express from "express";
import multer from "multer";
import { google } from "googleapis";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

// Initialize Google APIs
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
  scopes: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const drive = google.drive({ version: "v3", auth });
const sheets = google.sheets({ version: "v4", auth });

// Handle OPTIONS requests for CORS
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Endpoint to get access token for Google Drive
app.get("/google-drive/token", async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const accessToken = await authClient.getAccessToken();
    res.json({ accessToken: accessToken.token });
  } catch (error) {
    console.error("Error getting Google Drive token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

// Endpoint to get access token for Google Sheets
app.get("/google-sheets/token", async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const accessToken = await authClient.getAccessToken();
    res.json({ accessToken: accessToken.token });
  } catch (error) {
    console.error("Error getting Google Sheets token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

// Endpoint to process complete order (upload image + save to sheets)
app.post("/process-order", async (req, res) => {
  try {
    console.log("Received process-order request");
    const { name, phone, address, personalityType, template, position, paymentImage } = req.body;

    // Validate required fields
    if (!name || !phone || !address || !personalityType) {
      console.error("Missing required fields:", { name: !!name, phone: !!phone, address: !!address, personalityType: !!personalityType });
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!paymentImage) {
      console.error("No payment image provided");
      return res.status(400).json({ error: "No payment image provided" });
    }

    // Step 1: Upload image to Cloudinary
    console.log("Uploading image to Cloudinary...");
    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? "***" : "missing",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "***" : "missing",
    });

    const cloudinaryResponse = await cloudinary.uploader.upload(paymentImage, {
      folder: "mbti-payments",
      public_id: `payment_${Date.now()}`,
      resource_type: "auto",
    });

    console.log("Image uploaded successfully to Cloudinary:", cloudinaryResponse.public_id);

    // Step 2: Save data to Google Sheets
    console.log("Saving to Google Sheets...");
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID || "1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg";
    console.log("Spreadsheet ID:", spreadsheetId);

    const values = [
      [
        name,
        phone,
        address,
        personalityType,
        template,
        position || "",
        cloudinaryResponse.secure_url,
        new Date().toISOString(),
      ],
    ];

    const sheetsResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: "User Data!A:H",
      valueInputOption: "RAW",
      requestBody: {
        values: values,
      },
    });

    console.log("Data saved successfully to Google Sheets");

    res.json({
      success: true,
      fileId: cloudinaryResponse.public_id,
      webViewLink: cloudinaryResponse.secure_url,
      rowNumber: sheetsResponse.data.updates?.updatedRows || 1,
    });
  } catch (error) {
    console.error("Error processing order:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Failed to process order",
      details: error.message
    });
  }
});

export default app;
