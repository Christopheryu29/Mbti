// Google Drive API service for uploading images
export interface UploadResult {
  success: boolean;
  fileId?: string;
  webViewLink?: string;
  error?: string;
}

export class GoogleDriveService {
  private static readonly FOLDER_ID = import.meta.env
    .VITE_GOOGLE_DRIVE_FOLDER_ID;
  private static readonly API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  static async uploadImage(file: File): Promise<UploadResult> {
    try {
      console.log("GoogleDriveService: Attempting to upload image:", file.name);
      console.log("GoogleDriveService: Using folder ID:", this.FOLDER_ID);

      // First, get access token
      const accessToken = await this.getAccessToken();
      if (!accessToken) {
        console.log(
          "GoogleDriveService: No access token available, using fallback"
        );
        return { success: false, error: "Failed to get access token" };
      }

      // Create metadata for the file
      const metadata = {
        name: `payment_${Date.now()}_${file.name}`,
        parents: [this.FOLDER_ID || ""],
      };

      // Create FormData for multipart upload
      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", file);

      // Upload to Google Drive
      const response = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();

      return {
        success: true,
        fileId: result.id,
        webViewLink: result.webViewLink,
      };
    } catch (error) {
      console.error("Google Drive upload error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  private static async getAccessToken(): Promise<string | null> {
    try {
      // Check if we have the required environment variables
      if (!this.FOLDER_ID) {
        console.warn("Google Drive folder ID not configured");
        return null;
      }

      // For development, you might want to use a server endpoint
      console.log(
        "Making request to:",
        "http://localhost:3001/api/google-drive/token"
      );
      const response = await fetch(
        "http://localhost:3001/api/google-drive/token"
      );
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (response.ok) {
        const data = await response.json();
        console.log("Access token received:", data.accessToken ? "Yes" : "No");
        return data.accessToken;
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
      }

      // If no backend server, return null (will trigger fallback)
      console.warn(
        "No backend server available for Google Drive authentication"
      );
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  }
}
