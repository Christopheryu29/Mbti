// Google Sheets API service for storing user data
export interface UserData {
  name: string;
  phone: string;
  address: string;
  personalityType: string;
  template: string;
  position?: string;
  paymentImageUrl?: string;
  timestamp: string;
}

export interface SheetsResult {
  success: boolean;
  rowNumber?: number;
  error?: string;
}

export class GoogleSheetsService {
  private static readonly SPREADSHEET_ID =
    import.meta.env.VITE_GOOGLE_SHEETS_ID ||
    "1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg";
  private static readonly SHEET_NAME = "User Data"; // or your sheet name

  static async saveUserData(userData: UserData): Promise<SheetsResult> {
    try {
      console.log(
        "GoogleSheetsService: Attempting to save user data:",
        userData
      );
      console.log(
        "GoogleSheetsService: Using spreadsheet ID:",
        this.SPREADSHEET_ID
      );

      const accessToken = await this.getAccessToken();
      if (!accessToken) {
        console.log(
          "GoogleSheetsService: No access token available, using fallback"
        );
        return { success: false, error: "Failed to get access token" };
      }

      // Prepare the data row
      const values = [
        [
          userData.name,
          userData.phone,
          userData.address,
          userData.personalityType,
          userData.template,
          userData.position || "",
          userData.paymentImageUrl || "",
          userData.timestamp,
        ],
      ];

      // Append data to Google Sheets
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${this.SHEET_NAME}!A:H:append?valueInputOption=USER_ENTERED`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: values,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Sheets API error: ${response.statusText}`);
      }

      const result = await response.json();

      return {
        success: true,
        rowNumber: result.updates?.updatedRange
          ? parseInt(result.updates.updatedRange.match(/A(\d+):/)?.[1] || "0")
          : undefined,
      };
    } catch (error) {
      console.error("Google Sheets save error:", error);
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
      if (!this.SPREADSHEET_ID) {
        console.warn("Google Sheets ID not configured");
        return null;
      }

      // For development, you might want to use a server endpoint
      const response = await fetch(
        "http://localhost:3001/api/google-sheets/token"
      );
      if (response.ok) {
        const data = await response.json();
        return data.accessToken;
      }

      // If no backend server, return null (will trigger fallback)
      console.warn(
        "No backend server available for Google Sheets authentication"
      );
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  }
}
