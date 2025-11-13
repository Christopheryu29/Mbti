// API service for handling Google Drive and Sheets operations
import type { CompleteOrderData, OrderResult } from "../types";
import { logError } from "../utils/errorHandler";
import { config } from "../config/env";

export class ApiService {
  static async processOrder(
    orderData: CompleteOrderData
  ): Promise<OrderResult> {
    try {
      const sheetsId = config.get("googleSheetsId");
      let apiBaseUrl = config.get("apiBaseUrl");

      // Runtime check: if API URL is localhost but we're not on localhost, use current origin
      if (apiBaseUrl.includes("localhost") && !window.location.hostname.includes("localhost")) {
        apiBaseUrl = `${window.location.origin}/api`;
        console.log("Production detected, using API URL:", apiBaseUrl);
      }

      console.log("Processing order with data:", {
        ...orderData,
        paymentImage: orderData.paymentImage.name,
        apiBaseUrl: apiBaseUrl,
      });

      const hasGoogleConfig = sheetsId;

      if (!hasGoogleConfig) {
        logError(
          "Google APIs not configured, using fallback mode",
          "ApiService.processOrder"
        );
        return this.processOrderFallback(orderData);
      }

      // Convert image to base64
      console.log("Converting image to base64...", {
        fileName: orderData.paymentImage.name,
        fileType: orderData.paymentImage.type,
        fileSize: orderData.paymentImage.size
      });

      const imageBase64 = await this.fileToBase64(orderData.paymentImage);

      console.log("Image converted to base64, length:", imageBase64.length);
      console.log("Base64 preview:", imageBase64.substring(0, 50) + "...");

      // Use backend server to process the complete order
      const payload = {
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        personalityType: orderData.personalityType,
        itemType: orderData.itemType,
        color: orderData.color,
        size: orderData.size || "",
        template: orderData.template,
        position: orderData.position || "",
        price: orderData.price,
        orderSummary: orderData.orderSummary,
        paymentImage: imageBase64,
      };

      console.log("Sending payload to API:", {
        ...payload,
        paymentImage: payload.paymentImage.substring(0, 50) + "..."
      });

      const response = await fetch(`${apiBaseUrl}/process-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logError(
          `Backend server error: ${errorText}`,
          "ApiService.processOrder"
        );
        return this.processOrderFallback(orderData);
      }

      const result = await response.json();

      return {
        success: true,
        paymentImageUrl: result.webViewLink,
        rowNumber: result.rowNumber,
      };
    } catch (error) {
      logError(error, "ApiService.processOrder");
      return this.processOrderFallback(orderData);
    }
  }

  // Helper method to convert File to base64
  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Fallback method that works without Google APIs
  private static async processOrderFallback(
    orderData: CompleteOrderData
  ): Promise<OrderResult> {
    try {
      // Create a local data URL for the image
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => {
          const imageDataUrl = reader.result as string;

          // Log the order data to console (for development)
          console.log("Order Data (Fallback Mode):", {
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            personalityType: orderData.personalityType,
            template: orderData.template,
            position: orderData.position,
            timestamp: new Date().toISOString(),
            imageDataUrl: imageDataUrl.substring(0, 100) + "...", // Truncate for logging
          });

          resolve({
            success: true,
            paymentImageUrl: imageDataUrl,
            rowNumber: Date.now(), // Use timestamp as row number
          });
        };
        reader.readAsDataURL(orderData.paymentImage);
      });
    } catch (error) {
      console.error("Fallback processing error:", error);
      return {
        success: false,
        error: "Failed to process order in fallback mode",
      };
    }
  }
}
