// Example Node.js server for handling Google API authentication
// This is a basic example - you'll need to implement proper error handling and security

const express = require("express");
const multer = require("multer");
const { google } = require("googleapis");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

// Google API credentials (you'll need to set these up)
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
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
};

const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;

// Initialize Google APIs
const auth = new google.auth.GoogleAuth({
  credentials: GOOGLE_CREDENTIALS,
  scopes: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const drive = google.drive({ version: "v3", auth });
const sheets = google.sheets({ version: "v4", auth });

// API endpoint to get access token
app.get("/api/google-drive/token", async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const accessToken = await authClient.getAccessToken();
    res.json({ accessToken: accessToken.token });
  } catch (error) {
    console.error("Error getting access token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

app.get("/api/google-sheets/token", async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const accessToken = await authClient.getAccessToken();
    res.json({ accessToken: accessToken.token });
  } catch (error) {
    console.error("Error getting access token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

// API endpoint to process complete order
app.post(
  "/api/process-order",
  upload.single("paymentImage"),
  async (req, res) => {
    try {
      const { name, phone, address, personalityType, template, position } =
        req.body;
      const paymentImage = req.file;

      if (!paymentImage) {
        return res
          .status(400)
          .json({ success: false, error: "No payment image provided" });
      }

      // Step 1: Upload image to Google Drive
      const fileMetadata = {
        name: `payment_${Date.now()}_${paymentImage.originalname}`,
        parents: [GOOGLE_DRIVE_FOLDER_ID],
      };

      const media = {
        mimeType: paymentImage.mimetype,
        body: require("fs").createReadStream(paymentImage.path),
      };

      const driveResponse = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id,webViewLink",
      });

      // Step 2: Save data to Google Sheets
      const values = [
        [
          name,
          phone,
          address,
          personalityType,
          template,
          position || "",
          driveResponse.data.webViewLink,
          new Date().toISOString(),
        ],
      ];

      const sheetsResponse = await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_ID,
        range: "User Data!A:H",
        valueInputOption: "USER_ENTERED",
        resource: { values },
      });

      // Clean up uploaded file
      require("fs").unlinkSync(paymentImage.path);

      res.json({
        success: true,
        paymentImageUrl: driveResponse.data.webViewLink,
        rowNumber: sheetsResponse.data.updates?.updatedRange
          ? parseInt(
              sheetsResponse.data.updates.updatedRange.match(/A(\d+):/)?.[1] ||
                "0"
            )
          : undefined,
      });
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Unknown error occurred",
      });
    }
  }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
